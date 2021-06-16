import org.json4s._
import org.json4s.jackson.JsonMethods._

import scala.collection.mutable.ListBuffer
implicit val formats = DefaultFormats


val s = ".saass /WD/aaa.sh -sss"
val l = ListBuffer[String]()
s.split(' ').foreach(str => {
    str.indexOf(".sh") match {
      case x: Int if x > -1 => l += str
      case _ =>
  }
})

l.toList
