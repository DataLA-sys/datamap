package ru.neoflex.datalog.engine

import org.apache.spark.sql.catalyst.analysis.{UnresolvedAttribute, UnresolvedRelation, UnresolvedSubqueryColumnAliases}
import org.apache.spark.sql.catalyst.expressions.{Alias, CaseWhen, ScalarSubquery}
import org.apache.spark.sql.catalyst.parser.CatalystSqlParser
import org.apache.spark.sql.catalyst.plans.logical.{InsertIntoStatement, Join, LogicalPlan, Project, SubqueryAlias, With}
import ru.neoflex.datalog.engine.dto.{DestTable, Field}

import java.io.File
import java.nio.file.{FileSystems, PathMatcher}
import scala.collection.mutable.ListBuffer
import scala.io.Codec
import scala.io.Source.fromFile
import scala.util.control.Breaks.{break, breakable}

case class TemplateFile(fileName: String, templateContent: String)

object Parser {

  implicit val codec = Codec("UTF-8")

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

  def sqlTokens(dir: String, sourcePrefix: String, layer: String): List[DestTable] = {
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
        tables += DestTable(destTable, sources.toList.distinct, fn, layer)
      }
      source.close()
    })
    tables.toList
  }

  def getInTables(logical: LogicalPlan) : Seq[String] ={
    val tables = scala.collection.mutable.LinkedHashSet.empty[String]
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

  def getOutTables(logical: LogicalPlan) : Seq[String] ={
    val tables = scala.collection.mutable.LinkedHashSet.empty[String]
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

  def getFieldsFromScript(logical: LogicalPlan) : List[Field] = {
    try {
      getFields(logical)
    } catch {
      case e: Exception => {
        e.printStackTrace()
        List[Field](Field(name ="Error While Processing", fieldPlanType = "error"))
      }
    }
  }

  def processSqlScript(sql: String,
                       sourceFile: String,
                       tables: ListBuffer[DestTable],
                       testTable: String => Boolean = (s => true),
                       layer: String = "",
                       defaultOut: Seq[String] = Seq()
                      ): Unit = {
    val logical: LogicalPlan = CatalystSqlParser.parsePlan(sql)
    val outTables = Parser.getOutTables(logical) ++ defaultOut
    var inTables = Parser.getInTables(logical)
    outTables.foreach(destTable => {
      if(testTable(destTable)) {
        tables.find(f => f.name == destTable).map(ft => {
          inTables = inTables ++ ft.sources
          tables -= ft
        })
        val tableFields = getFieldsFromScript(logical).filter(f => f.fieldPlanType == "MainProject")
        tables += DestTable(destTable, inTables.toList.filter(testTable).distinct, sourceFile, layer, fields = tableFields)
      }
    })
  }

  def processSqlFolder(folder: String,
                       sourceFilePrefix: String,
                       tables: ListBuffer[DestTable],
                       replacement: Seq[(String, String)] = Seq.empty,
                       testTable: String => Boolean = (s => true),
                       layer: String = "",
                       filesFilter: String = "*.*",
                       fields: ListBuffer[Field] = null
                      ): Unit = {
    object SqlScriptLineProcessor2 extends SqlScriptLineProcessor {
      override def processLine(line: String): String = {
        var sl = super.processLine(line)
        replacement.foreach(value => sl = sl.replace(value._1, value._2))
        sl
      }
    }

    val matcher = FileSystems.getDefault.getPathMatcher("glob:*" + filesFilter);

    getListOfFiles(folder)
      .filter(file => matcher.matches(file.toPath))
      .foreach(file => {
      val sqlScript = getFileText(file.getAbsolutePath, SqlScriptLineProcessor2)
      sqlScript.split(';').filter(_.trim.nonEmpty).foreach(sql =>
        {
          if(!(sql.toUpperCase().contains("INSERT") || sql.toUpperCase().contains("CREATE")) && sql.toUpperCase().contains("SELECT")) {
            val defaultOut = Seq("db." + file.getName.replaceFirst("[.][^.]+$", ""))
            processSqlScript(sql, sourceFilePrefix + file.getName, tables, testTable, layer, defaultOut = defaultOut)
          } else {
            processSqlScript(sql, sourceFilePrefix + file.getName, tables, testTable, layer)
          }

        }
      )
    })
  }

  private def buildFieldsFromSources(fields: Seq[String], sources: List[Field], fieldType: String): List[Field] = {
    val newInsertCols = ListBuffer[Field]()
    fields.zipWithIndex.foreach(y => {
        if(sources.size > y._2) {
          val projectField = sources(y._2)
          newInsertCols += Field(y._1, List(projectField), fieldPlanType = fieldType)
        }
      }
    )
    newInsertCols.toList
  }

  private def getF(l: LogicalPlan, fieldType: String): ListBuffer[Field] = {
    val fields = ListBuffer[Field]()
    l.foreach {
      case pp: Project => fields ++= getProjectFields(pp, fieldType)
      case t: SubqueryAlias => fields ++= getF(t.child, "SubqueryAlias").
        toList.map(f => Field(f.name, f.sources, f.fieldPlanType))
      case pp: Join => fields ++= getF(pp.right, "Join") ++= getF(pp.left, "Join")
      case p => //println("unsupported in getF -> " + p.toJSON)

    }
    fields
  }

  private def namePartsToName(nameParts: Seq[String]): String = {
    if(nameParts.size == 2) {
      findTableNameFromAlias(nameParts.head) + "." + nameParts(1)
    } else {
      nameParts.mkString(".")
    }
  }

  private def getSourcesFromAlias(alias: Alias): List[Field] = {
    val fieldSources = new ListBuffer[Field]()
    alias.foreach {
      case cc: UnresolvedAttribute => fieldSources += Field(namePartsToName(cc.nameParts), fieldPlanType = "Alias")
      case cc: ScalarSubquery => fieldSources ++= getF(l = cc.plan, fieldType = "ScalarSubquery").toList
      //case cc: Alias => fieldSources ++= getSourcesFromAlias(cc)
      case cc => //println("unresolved in getSourcesFromAlias: " + cc.toJSON)
    }
    fieldSources.toList
  }

  private def getProjectFields(project: Project, fieldType: String): ListBuffer[Field] = {

    val fields = ListBuffer[Field]()
    project.projectList.foreach(f = {
      case pp: UnresolvedAttribute => fields += Field(namePartsToName(pp.nameParts), fieldPlanType = fieldType)
      case pp: Alias => {
        val fieldSources = getSourcesFromAlias(pp)
        if (fieldSources.nonEmpty) {
          fields += Field(pp.name, fieldSources.toList, fieldType)
        }
      }
      case pp: CaseWhen =>
        val fieldSources = new ListBuffer[Field]();
        pp.children.foreach {
          case cc: UnresolvedAttribute => fieldSources += Field(cc.nameParts.mkString("."), fieldPlanType = "CaseWhen")
          case _ =>
        }
        fields += Field("CASE" + pp.name, fieldSources.toList, "CaseWhen")
      case pp: ScalarSubquery => fields ++= getF(pp.plan, "ScalarSubquery")
      case p => //println("unsupported in getProjectFields -> " + p.toJSON)
    })
    fields
  }

  private def findTableNameFromAlias(alias: String): String = {
    var res = alias
    plan.foreach {
      case s: SubqueryAlias =>
        if (s.alias.toUpperCase == alias.toUpperCase) {
          res = findTableNames(s).mkString(".")
        }
      case _ =>
    }
    res
  }

  var plan: LogicalPlan = null
  def getFields(logical: LogicalPlan): List[Field] = {
    plan = logical
    var i: Int = 0
    val allFields: ListBuffer[Field] = ListBuffer()
    while(logical(i) != null) {
      val lg = logical(i)
      lg match {
        case t: With => t.cteRelations.foreach(f => {
          val subQueryCols =
            f._2.find(a => a.isInstanceOf[UnresolvedSubqueryColumnAliases])
              .getOrElse(UnresolvedSubqueryColumnAliases(Seq("NotFound"), t))
              .asInstanceOf[UnresolvedSubqueryColumnAliases].outputColumnNames
          if(subQueryCols.nonEmpty) {
            allFields ++=
              buildFieldsFromSources(subQueryCols.map(f._1 + "." + _), getF(f._2, "Attribute").toList, "With")
          }
        })
        case t: SubqueryAlias => allFields ++= getF(t.child, "SubqueryAlias").
          toList.map(f => Field(f.name, f.sources, f.fieldPlanType))
        case t: InsertIntoStatement =>  {
          val tn = findTableNames(t.table).mkString(".")
          allFields ++= buildFieldsFromSources(t.userSpecifiedCols.map(tn + "." + _), getF(t, "Attribute").toList, "InsertIntoStatement")
        }
        case t: Project => allFields ++= getProjectFields(t, "MainProject").toList
        case t: Join => allFields ++= getF(t, "Join").toList
        case _ => //println("unsupported in getFields -> " + lg.toJSON)
      }
      i += 1
    }
    allFields.toList
  }

  private def findTableNames(logical: LogicalPlan): List[String] = {
    val tableNames = ListBuffer[String]()
    logical.foreach {
      case ll: UnresolvedRelation => tableNames += ll.multipartIdentifier.mkString(".")
      case _ =>
    }
    tableNames.toList
  }
}
