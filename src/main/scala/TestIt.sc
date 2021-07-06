import org.json4s.DefaultFormats
import org.json4s.JsonAST.{JField, JObject, JString}
import org.json4s.jackson.{JsonMethods, Serialization}
import org.json4s.jackson.JsonMethods.compact

import scala.io.Source.fromFile
import ru.neoflex.datalog.engine.Parser

import scala.collection.mutable.ListBuffer
import scala.io.Source.fromFile

case class Table(name: Option[String],
                 sql: String = "",
                 schema: String = "",
                 xml_name: String = "",
                 sql_block: String = "",
                 blocks: List[String] = List())

val projectFolder = "C:/projects/temp/alfabank/SBRM_LOG"
val confFile = projectFolder + "/oozie_workflows/reg/wf_reg_sbrm_deriveddata_daily/conf/parser_conf.json"

val data = JsonMethods.parse(fromFile(confFile).getLines.mkString)

val v = data
val tables = v \ "tables"

case class PTable(name: String, in: List[String] = List())

val ptables = ListBuffer[PTable]()

implicit val formats = DefaultFormats
val list = tables.values.asInstanceOf[Map[String, Map[String, _]]]
var mainTable = ""
val sqlt = v \ "tables" \ "*" \ "sql"
println(sqlt)

val ts = for {
  JObject(table) <- data
  JField("sql", JString(name)) <- table
  //JField("age", JInt(age)) <- child
  //if age > 4
} yield (table)

//ts
table