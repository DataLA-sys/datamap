import reflect.io._
import Path._
import org.json4s.{reflect, _}
import org.json4s.JsonDSL._
import org.json4s.jackson.JsonMethods._
import ru.neoflex.datalog.engine.MangoQuery

import scala.collection.mutable.ListBuffer
import scala.io.Source.fromFile

val mangoQuery = """{
                   |      "selector": {
                   |        "$or": [
                   |          {"domain": {"$exists": false}},
                   |          {"domain": {"$ne": true}}
                   |        ],
                   |        "in": {
                   |            "$elemMatch": {
                   |              "name":"source_db.imbr_request_comp"
                   |            }
                   |        }
                   |      },
                   |      "fields": ["name"],
                   |      "limit": 1000
                   |    }""".stripMargin
val mangoQuery2 = """{
                    |      "selector": {
                    |        "$or": [
                    |          {"domain": {"$exists": false}},
                    |          {"domain": {"$ne": true}}
                    |        ],
                    |        "datasets": {
                    |            "$elemMatch": {
                    |              "name": "targetdb1.table1"
                    |            }
                    |        }
                    |      },
                    |      "fields": ["name"],
                    |      "limit": 1000
                    |    }""".stripMargin
val mangoQuery3 = """{
                    |      "selector": {
                    |        "domainLinks": {
                    |            "$elemMatch": {
                    |              "domainProject": "Client Products"
                    |            }
                    |        }
                    |      },
                    |      "fields": [
                    |        "name",
                    |        "domainLinks"
                    |      ],
                    |      "limit": 1000
                    |    }""".stripMargin

val fileName = "C:\\projects\\sbtprojects\\datalog\\data\\BKI.projectStat.json"

object JsonProcessor {

  def getFileText(fileName: String): String = {
    val source = fromFile(fileName)
    var text = ""
    try {
      text = source.getLines().mkString
    } finally {
      source.close()
    }
    text
  }

  def parseMangoQuery(mangoQuery: String): MangoQuery = {
    val qj = parse(mangoQuery)

    val fieldsj = qj findField {
      case JField("fields", j) => true
      case _ => false
    }
    //ListBuffer(name, datasets)
    val fields = ListBuffer[String]()
    fieldsj.map(f => fields ++= f._2.values.asInstanceOf[List[String]])

    val queryj = qj filterField {
      case JField(_, j) => if(j \ "$elemMatch" != JNothing) true else false
      case _ => false
    }
    //Map(datasets -> Map($elemMatch -> Map(name -> datasetName)))
    var query = Map[String, Map[String, String]]()
    queryj.foreach(f=>query += (f._1 -> f._2.values.asInstanceOf[Map[String, String]]))

    val orElementsJ = qj \ "selector" \ "$or"

    //.values.asInstanceOf[List[Map[String, Map[String, Boolean]]]]
    //List(Map(domain -> Map($exists -> false)), Map(domain -> Map($ne -> true)))
    MangoQuery(fields.toList, query, if(orElementsJ == JNothing) List() else orElementsJ.values.asInstanceOf[List[Map[String, Map[String, Boolean]]]])
  }

  implicit val formats = DefaultFormats

  def matchFile(path: String, mangoQuery: MangoQuery, propsName: String = ""): String  = {
    if(propsName != "") {
      if(!path.contains(propsName)) {
        return "";
      }
    }
    val jsonString = getFileText(path)
    val parsed = parse(jsonString)

    var matched = false;
    mangoQuery.orElements.foreach(o => {
      val field  = o.keySet.toList.head
      val condition = o.values.toList.head.keySet.toList.head
      val conditionValue = o.values.toList.head.values.toList.head
      val found = parsed \ field
      if(condition == "$exists") {
        matched = if(conditionValue) found != JNothing else found == JNothing
      }
      if(condition == "$ne" && found != JNothing) {
        found match {
          case JBool(value) => matched = matched || value != conditionValue
        }
      }
    })

    if(!matched && mangoQuery.orElements.length > 0) return matched.toString;

    mangoQuery.query.foreach(q => {
      val q2 = q._2.asInstanceOf[Map[String, Map[String, String]]]
      val found = parsed \ q._1 \ q2.values.head.keySet.head
      if(found != JNothing) {
        val f = found.extract[List[String]].filter( v => v == q2.values.head.values.head)
        matched = f.length > 0
      } else {
        matched = false
      }
    })

    if(matched) {
      var res: JObject = ("search" -> "result")
      mangoQuery.resultFields.foreach(s => res = res ~ (s, parsed \ s))
      return  compact(res)
    }

    matched.toString
  }

  def matchDir(folder: String, mangoQuery: MangoQuery, propsName: String = ""): Unit = {
    folder.toDirectory.deepList(-1).filter(_.isFile)
      .foreach(file => {
        println(file.path)
        println(matchFile(file.path, mangoQuery, propsName))
      })
  }
}

val q = JsonProcessor.parseMangoQuery(mangoQuery3)

val folder = "C:\\projects\\sbtprojects\\datalog\\data"

JsonProcessor.matchDir(folder, q)
//val s = matchFile(fileName, q, "projectStat")
//s