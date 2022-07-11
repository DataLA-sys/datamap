import org.json4s.DefaultFormats
import org.json4s.JsonAST.{JArray, JString}
import org.json4s.jackson.JsonMethods

import java.io.File
import scala.io.Codec
import scala.io.Source.fromFile

implicit val formats = DefaultFormats
implicit val codec = Codec("UTF8")
val projects = fromFile("c:/projects/sbtprojects/datalog/web/datalogui/projects.json")
try {
  val prsed = JsonMethods.parse(projects.mkString)
  val JArray(sss: List[JString]) = (prsed \ "name")
  val d = new File("c:/projects/sbtprojects/datalog/data/")
  if (d.exists && d.isDirectory) {
    d.listFiles.filter(_.isFile).foreach(f => {
      val s = f.getName.replace(".json", "").
        split('.').dropRight(1).mkString(".")
      println(s)
      println(sss.filter(a => a.extract[String] == s).length)
    })
  }
} finally {
  projects.close()
}
//pri

