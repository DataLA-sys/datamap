import org.json4s._
import org.json4s.jackson.JsonMethods._

val json1 = """{"a": 1, "m": ["a", "b"]}"""
val json2 = """{"id": 1, "a": 1,"m": ["a", "b"]}"""
val jo1 = parse(json1)
val jo2 = parse(json2)
val jo3 = jo2 removeField {
  case JField("id", _) => true
  case _ => false
}

println(jo1 == jo2)
println(jo1 == jo3)
println(compact(jo2 \ "id"))