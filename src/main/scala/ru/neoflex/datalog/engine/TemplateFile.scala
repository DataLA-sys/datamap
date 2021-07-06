package ru.neoflex.datalog.engine

import org.apache.spark.sql.catalyst.analysis.UnresolvedRelation
import org.apache.spark.sql.catalyst.parser.CatalystSqlParser
import org.apache.spark.sql.catalyst.plans.logical.{InsertIntoStatement, LogicalPlan}
import ru.neoflex.datalog.engine.dto.DestTable

import java.io.File
import scala.collection.mutable.ListBuffer
import scala.io.Source.fromFile
import scala.util.control.Breaks.{break, breakable}

case class TemplateFile(fileName: String, templateContent: String)

object Parser {

  def getFileText(fileName: String,
                  lineProcessor: LineProcessor) = {
    val source = fromFile(fileName)
    var text = ""
    try {
      text = source.getLines().map(s => lineProcessor.processLine(s)).mkString("\n")
    } finally {
      source.close()
    }
    text
  }

  def getListOfFiles(dir: String):List[File] = {
    val d = new File(dir)
    if (d.exists && d.isDirectory) {
      d.listFiles.filter(_.isFile).toList
    } else {
      List[File]()
    }
  }

  def sqlTokens(dir: String, sourcePrefix: String): List[DestTable] = {
    val files = getListOfFiles(dir)
    val tables = ListBuffer[DestTable]()
    files.foreach(file => {
      val fn = sourcePrefix + file.getName()
      val source = fromFile(file.getAbsolutePath())
      val lines = source.getLines()
      var destTable = ""
      val sources = ListBuffer[String]()

      lines.foreach(s => {
        val insTokens = List("insert into", "insert overwrite")
        val fromTokens = List("from odpp", " join ")
        breakable {insTokens.foreach(insToken => {
          if(s.contains(insToken)) {
            destTable = s.replace(insToken, "").replace("table", "").trim.split(' ')(0)
            break
          }
        }
        )}
        fromTokens.foreach(token => {
          if(s.contains(token)) {
            val source = s.split(" on ")(0).split(' ').find(w => w.contains('.'))
            source.map(w => {
              if(!sources.exists(item => item == w)) {
                sources += w
              }
            })
          }
        })
      })
      if(destTable.contains(".")) {
        tables.find(f => f.name == destTable).map(ft => {
          sources ++= ft.sources;
          tables -= ft
        })
        tables += DestTable(destTable, sources.toList.distinct, fn)
      }
      source.close()
    })
    tables.toList
  }

  def getInTables(sql: String) : Seq[String] ={
    val tables = scala.collection.mutable.LinkedHashSet.empty[String]

    val s: CatalystSqlParser = CatalystSqlParser
    val logical: LogicalPlan = s.parsePlan(sql)
    var i = 0
    while (true) {
      if (logical(i) == null) {
        return tables.toSeq
      } else if (logical(i).isInstanceOf[UnresolvedRelation]) {
        val tableIdentifier = logical(i).asInstanceOf[UnresolvedRelation].tableName
        tables += tableIdentifier.toLowerCase()
      }
      i = i + 1
    }
    tables.toSeq
  }

  def getOutTables(sql: String) : Seq[String] ={
    val tables = scala.collection.mutable.LinkedHashSet.empty[String]
    val s: CatalystSqlParser = CatalystSqlParser
    val logical: LogicalPlan = s.parsePlan(sql)
    var i = 0
    while (true) {
      if (logical(i) == null) {
        return tables.toSeq
      } else if (logical(i).isInstanceOf[InsertIntoStatement]) {
        val tableIdentifier = logical(i).asInstanceOf[InsertIntoStatement]
        tables += tableIdentifier.table.asInstanceOf[UnresolvedRelation].tableName
      }
      i = i + 1
    }
    tables.toSeq
  }

  def processSqlScript(sql: String,
                       sourceFile: String,
                       tables: ListBuffer[DestTable],
                       testTable: String => Boolean = (s => true)
                      ) = {
    val outTables = Parser.getOutTables(sql)
    var inTables = Parser.getInTables(sql)
    outTables.foreach(destTable => {
      if(testTable(destTable)) {
        tables.find(f => f.name == destTable).map(ft => {
          inTables = inTables ++ ft.sources
          tables -= ft
        })
        tables += DestTable(destTable, inTables.toList.filter(testTable).distinct, sourceFile)
      }
    })
  }

  def processSqlFolder(folder: String,
                       sourceFilePrefix: String,
                       tables: ListBuffer[DestTable],
                       replacement: Seq[(String, String)] = Seq.empty,
                       testTable: String => Boolean = (s => true)
                      ) = {
    object SqlScriptLineProcessor2 extends SqlScriptLineProcessor {
      override def processLine(line: String): String = {
        var sl = super.processLine(line)
        replacement.foreach(value => sl = sl.replace(value._1, value._2))
        sl
      }
    }
    getListOfFiles(folder).foreach(file => {
      val sqlScript = getFileText(file.getAbsolutePath(), SqlScriptLineProcessor2)
      sqlScript.split(';').filter(_.trim.nonEmpty).foreach(sql => {
        processSqlScript(sql, sourceFilePrefix + file.getName(), tables, testTable)
      })
    })
  }
}
