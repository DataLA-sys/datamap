package ru.neoflex.datalog.engine

import org.apache.spark.sql.catalyst.analysis.{UnresolvedAttribute, UnresolvedRelation, UnresolvedSubqueryColumnAliases}
import org.apache.spark.sql.catalyst.expressions.{Alias, CaseWhen, ScalarSubquery}
import org.apache.spark.sql.catalyst.parser.CatalystSqlParser
import org.apache.spark.sql.catalyst.plans.logical.{InsertIntoStatement, Join, LogicalPlan, Project, SubqueryAlias, With}
import ru.neoflex.datalog.engine.dto.{DestTable, Field}

import scala.collection.mutable.ListBuffer
import scala.io.Codec
import scala.io.Source.fromFile
import scala.util.control.Breaks.{break, breakable}
import reflect.io._
import Path._

case class TemplateFile(fileName: String, templateContent: String)

object Parser {

  implicit val codec: Codec = Codec("UTF-8")

  def getFileText(fileName: String,
                  lineProcessor: LineProcessor): String = {
    val source = fromFile(fileName)
    var text = ""
    try {
      text = source.getLines().map(s => lineProcessor.processLine(s)).filter(!_.trim.startsWith("--")).mkString("\n")
    } finally {
      source.close()
    }
    text
  }

  def sqlTokens(dir: String, sourcePrefix: String, layer: String): List[DestTable] = {
    val tables = ListBuffer[DestTable]()
    dir.toDirectory.files.foreach(file => {
      val fn = sourcePrefix + file.name
      val source = fromFile(file.path)
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
              if(!sources.contains(w)) {
                sources += w
              }
            })
          }
        })
      })
      if(destTable.contains(".")) {
        tables.find(f => f.name == destTable).map(ft => {
          sources ++= ft.sources
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
      case e: Exception =>
        e.printStackTrace()
        List[Field](Field(name ="Error While Processing", tableName = "", fieldPlanType = "error"))
    }
  }

  def processSqlScript(sql: String,
                       sourceFile: String,
                       tables: ListBuffer[DestTable],
                       testTable: String => Boolean = _ => true,
                       layer: String = "",
                       defaultOut: Seq[String] = Seq()
                      ): Unit = {
    val logical: LogicalPlan = CatalystSqlParser.parsePlan(sql)
    val outTables = Parser.getOutTables(logical) ++ defaultOut
    var inTables = Parser.getInTables(logical)
    def distinctFields(tableFields: List[Field]): List[Field] = {
      val distinctTableFields = new ListBuffer[Field]()
      tableFields.foreach(field => {
        val found = distinctTableFields.find(f => f.name.toUpperCase() == field.name.toUpperCase()).getOrElse(null)
        if(found == null) {
          distinctTableFields += field
        } else {
          val newField = Field(field.name, field.tableName, (field.sources ++ found.sources).distinct, field.fieldPlanType)
          distinctTableFields -= found
          distinctTableFields += newField
        }
      })
      distinctTableFields.toList
    }
    outTables.foreach(destTable => {
      if(testTable(destTable)) {
        var tableFields = List[Field]()// getFieldsFromScript(logical).filter(f => f.fieldPlanType == "MainProject")
        tables.find(f => f.name == destTable).map(ft => {
          inTables = inTables ++ ft.sources
          tableFields = tableFields ++ ft.fields
          tables -= ft
        })
        tables += DestTable(destTable, inTables.toList.filter(testTable).distinct, sourceFile, layer,
          fields = distinctFields(tableFields))
      }
    })
  }

  def processSqlFolder(folder: String,
                       sourceFilePrefix: String,
                       tables: ListBuffer[DestTable],
                       replacement: Seq[(String, String)] = Seq.empty,
                       testTable: String => Boolean = _ => true,
                       layer: String = "",
                       filesFilter: String = """.*\.*""",
                       deep: Int = 1
                      ): Unit = {
    object SqlScriptLineProcessor2 extends SqlScriptLineProcessor {
      override def processLine(line: String): String = {
        var sl = super.processLine(line)
        replacement.foreach(value => sl = sl.replaceAll(value._1, value._2))
        sl
      }
    }

    println(folder)
    println(filesFilter)
    folder.toDirectory.deepList(deep).filter(_.isFile).filter(p=>p.path matches filesFilter)
      .foreach(file => {
        try {
          println(file.path)
          val sqlScript = getFileText(file.path, SqlScriptLineProcessor2)
          sqlScript.split(';').filter(_.trim.nonEmpty).filter(!_.toUpperCase().contains("ALTER ")).foreach(sql =>
          {
            if(!(sql.toUpperCase().contains("INSERT") || sql.toUpperCase().contains("CREATE")) && sql.toUpperCase().contains("SELECT")) {
              val defaultOut = Seq("db." + file.name.replaceFirst("[.][^.]+$", ""))
              processSqlScript(sql, file.path.replace("\\","/"), tables, testTable, layer, defaultOut = defaultOut)
            } else {
              processSqlScript(sql, file.path.replace("\\","/"), tables, testTable, layer)
            }
          })
        } catch {
          case e:  Throwable => e.printStackTrace()
        }
    })
  }

  private def buildFieldsFromSources(fields: Seq[String], sources: List[Field], fieldType: String): List[Field] = {
    val newInsertCols = ListBuffer[Field]()
    fields.zipWithIndex.foreach(y => {
        if(sources.size > y._2) {
          val projectField = sources(y._2)
          newInsertCols += Field(y._1, "", List(projectField), fieldPlanType = fieldType)
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
        toList.map(f => Field(f.name, t.alias, f.sources, f.fieldPlanType))
      case pp: Join => fields ++= getF(pp.right, "Join") ++= getF(pp.left, "Join")
      case _ =>
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

  private def getSourcesFromAlias(alias: Alias, project: Project): List[Field] = {
    val fieldSources = new ListBuffer[Field]()
    alias.foreach {
      case cc: UnresolvedAttribute => fieldSources += {
        var tableAlias = ""
        var tableName = ""
        val aliases = ListBuffer[(String, String)]()
        project.foreach {
          case s: SubqueryAlias =>
            tableAlias = s.alias
          case s: UnresolvedRelation =>
            tableName = namePartsToName(s.multipartIdentifier)
            aliases += ((tableName, tableAlias))
          case _ =>
        }
        val firstItem = aliases.find(a => a._2 == cc.nameParts.head).getOrElse((cc.nameParts.head, cc.nameParts.head))._1
        val nameParts = Seq(firstItem) ++ cc.nameParts.tail
        Field(namePartsToName(nameParts), alias.name, fieldPlanType = "Alias")
      }
      case cc: ScalarSubquery => fieldSources ++= getF(l = cc.plan, fieldType = "ScalarSubquery").toList
      //case cc: Alias => fieldSources ++= getSourcesFromAlias(cc)
      case _ =>
    }
    fieldSources.toList
  }

  private def getProjectFields(project: Project, fieldType: String): ListBuffer[Field] = {

    val fields = ListBuffer[Field]()
    project.projectList.foreach(f = {
      case pp: UnresolvedAttribute => fields += Field(namePartsToName(pp.nameParts), findTableNames(project).mkString("."), fieldPlanType = fieldType)
      case pp: Alias =>
        val fieldSources = getSourcesFromAlias(pp, project)
        if (fieldSources.nonEmpty) {
          fields += Field(pp.name, pp.name, fieldSources, fieldType)
        }
      case pp: CaseWhen =>
        val fieldSources = new ListBuffer[Field]()
        pp.children.foreach {
          case cc: UnresolvedAttribute => fieldSources += Field(cc.nameParts.mkString("."), pp.name, fieldPlanType = "CaseWhen")
          case _ =>
        }
        fields += Field("CASE" + pp.name, pp.name, fieldSources.toList, "CaseWhen")
      case pp: ScalarSubquery => fields ++= getF(pp.plan, "ScalarSubquery")
      case _ =>
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
    def addFields(allFields: ListBuffer[Field], newFields: List[Field]): Unit = {
      newFields.foreach(newField => {
        val found = allFields.find(f => f.name == newField.name).orNull
        if(found != null) {
          val toAdd = Field(found.name, found.tableName, (found.sources ++ newField.sources).distinct, found.fieldPlanType)
          allFields -= found
          allFields += toAdd
        } else {
          allFields += newField
        }
      })
    }
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
            addFields(allFields,
              buildFieldsFromSources(subQueryCols.map(f._1 + "." + _), getF(f._2, "Attribute").toList, "With"))
          }
        })
        case t: SubqueryAlias => addFields(allFields, getF(t.child, "SubqueryAlias").
          toList.map(f => Field(f.name, t.alias, f.sources, f.fieldPlanType)))
        case t: InsertIntoStatement =>
          val tn = findTableNames(t.table).mkString(".")
          addFields(allFields, buildFieldsFromSources(t.userSpecifiedCols.map(tn + "." + _), getF(t, "Attribute").toList, "InsertIntoStatement"))
        case t: Project => addFields(allFields, getProjectFields(t, "MainProject").toList)
        case t: Join => addFields(allFields, getF(t, "Join").toList)
        case _ =>
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
