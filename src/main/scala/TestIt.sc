import org.json4s.{DefaultFormats, JValue}
import org.json4s.JsonAST.{JArray, JField, JObject, JString, JValue}
import org.json4s.jackson.{JsonMethods, Serialization}
import org.json4s.scalap.scalasig.NoSymbol.parent
import ru.neoflex.datalog.engine.Parser.getListOfFiles

import java.io.File
import java.nio.file.FileSystems
import scala.io.Source.fromFile

List("a.b").flatMap(s => s.split('.'))//.foreach(println)
