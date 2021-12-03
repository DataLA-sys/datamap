package ru.neoflex.datalog.engine

import reflect.io._
import Path._
import org.json4s._
import org.json4s.JsonDSL._
import org.json4s.jackson.JsonMethods._

import scala.collection.mutable.ListBuffer
import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.io.Codec
import scala.io.Source.fromFile


/** Returns a parsed mango query
 * Supported only $or, $elemMatch, $fields.
 * Only one level query tree supported.
 * Example:
 * {
      "selector": {
        "$or": [
          {"domain": {"$exists": false}},
          {"domain": {"$ne": true}}
        ],
        "datasets": {
            "$elemMatch": {
              "name": "datasetName"
            }
        }
      },
      "fields": ["name", "datasets"],
      "limit": 1000
    }
 *
 *
 *  @param  resultFields   ex: ListBuffer(name, datasets)
 *  @param  query   ex: Map(datasets -> Map($elemMatch -> Map(name -> datasetName)))
 *  @param  orElements   ex: List(Map(domain -> Map($exists -> false)), Map(domain -> Map($ne -> true)))
 */
case class MangoQuery(resultFields: List[String], query: Map[String, Map[String, String]], orElements: List[Map[String, Map[String, Boolean]]])

object JsonProcessor {

  implicit val formats = DefaultFormats
  implicit val codec = Codec("UTF8")

  def getFileText(fileName: String): String = {
    val source = fromFile(fileName)(codec)
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

  def matchFile(path: String, mangoQuery: MangoQuery, propsName: String = ""): Option[JObject]  = {
    if(propsName != "") {
      if(!path.contains(propsName)) {
        return Option.empty
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

    if(!matched && mangoQuery.orElements.length > 0) return Option.empty;

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
      var res: JObject = ("file" -> path.toFile.name)
      mangoQuery.resultFields.foreach(s => res = res ~ (s, parsed \ s))
      return Some(res)
    }

    Option.empty
  }

  def matchDir(folder: String, mangoQuery: MangoQuery, propsName: String = ""): String = {
    var resS = ""
    folder.toDirectory.deepList(-1).filter(_.isFile)
      .foreach(file => {
        matchFile(file.path, mangoQuery, propsName).map(o => {
          resS = resS + (if(resS == "") "" else ",") + compact(o)
        })
      })
    "{\"docs\": [" + resS +"]}"
  }
}