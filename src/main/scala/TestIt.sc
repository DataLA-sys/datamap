import org.json4s._
import org.json4s.jackson.JsonMethods._
implicit val formats = DefaultFormats

val params: Option[String] = Some(s"""{"a": "1"}""")
params.map(s => {
  val v = parse(s)
  print((v \\ "a").extract[String])
})