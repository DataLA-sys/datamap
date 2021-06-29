import org.json4s._
import org.json4s.jackson.JsonMethods._

import scala.collection.mutable.ListBuffer
import org.apache.spark.sql.catalyst.parser.CatalystSqlParser
import org.apache.spark.sql.catalyst.plans.logical.{InsertIntoStatement, LogicalPlan}

import scala.xml.XML
implicit val formats = DefaultFormats
import org.apache.spark.sql.catalyst.analysis.UnresolvedRelation

val pathToWorkflowXml = "C:/a/workflow.xml"

val xml = XML.loadFile(pathToWorkflowXml)
val elist = (xml \\ "action").filter(a =>  (a \ "@name").toString().contains("wf_export_imbr_imbr_cre") )
val etables = for {
  a <- elist
  p <- (a \\ "sub-workflow" \\ "configuration" \\ "property")
  if !(p \\ "name").find(n => n.text == "table_name").isEmpty //.map(_.text) == "table_name"
} yield ((a \ "@name").toString().replace("wf_export_imbr_", ""), (p \ "value").map(_.text))