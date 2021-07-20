import scala.io.Source.fromFile
import scala.xml._
import ru.neoflex.datalog.engine.Parser

import scala.collection.mutable.ListBuffer

val path = "C:/projects/temp/alfabank/cr_ow_qa/"

case class QaTable(targetName: String, files: String, inTables: List[String])

def getText(path: String): String ={
  val source = fromFile(path)
  try {
    source.getLines.mkString("\r\n")
  } finally {
    source.close()
  }
}

val qatables = new ListBuffer[QaTable]()

Seq(
  path + "/oozie_workflows/atom/wf_deriveddata_qa_ow_prod_data/",
  path + "/oozie_workflows/atom/wf_deriveddata_qa_connector_data/"
).foreach(folder => {
  val xml = XML.loadFile(folder + "/workflow.xml")

  val sqoopArgs = xml \\ "sqoop" \\ "arg"
  val inTables = sqoopArgs
    .find(x => x.text == "--query")
    .flatMap(x => {
      Some(
        Parser
          .getInTables(sqoopArgs(sqoopArgs.indexOf(x) + 1)
            .text.replace("\"", "")
            .replace("$CONDITIONS", "1=1")
            .replace("${", "")
            .replace("}", "")))
    }).toList.flatten
  val targetFolder = sqoopArgs
    .find(x => x.text == "--target-dir")
    .flatMap(x => Some(sqoopArgs(sqoopArgs.indexOf(x) + 1).text))

  val hive2script = (xml \\ "hive2" \ "script").text

  val outTables = Parser.getOutTables(getText(folder + hive2script)
    .replace("$CONDITIONS", "1=1")
    .replace("${", "")
    .replace("}", "")
    .replace("SET ", "--SET "))

  targetFolder.map(x => {
    qatables += QaTable(outTables.head, x, inTables )
    None
  })
})

qatables
