package ru.neoflex.datalog.engine

import org.apache.spark.sql.catalyst.analysis.UnresolvedRelation
import org.apache.spark.sql.catalyst.parser.CatalystSqlParser
import org.apache.spark.sql.catalyst.plans.logical.{InsertIntoStatement, LogicalPlan}

import java.io.File
import scala.collection.mutable.ListBuffer
import scala.io.Source.fromFile
import scala.util.control.Breaks.{break, breakable}

case class TemplateFile(fileName: String, templateContent: String)

case class DestTable(name: String, sources: List[String], sourceFile: String)

object Parser {

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

}
