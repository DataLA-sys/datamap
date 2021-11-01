package ru.neoflex.datalog.actors

import akka.actor.typed.{ActorRef, Behavior, SupervisorStrategy}
import akka.actor.typed.scaladsl.Behaviors
import akka.util.Timeout
import org.json4s._
import org.json4s.jackson.JsonMethods._
import ru.neoflex.datalog.domain.{ Topology}
import java.io.File
import java.nio.file.Paths
import scala.concurrent.duration.DurationInt
import scala.io.Source._

object JsonActor {
  def apply(): Behavior[ParseItCommand] = Behaviors.supervise(render).onFailure(SupervisorStrategy.restart)

  implicit val formats = DefaultFormats
  sealed trait ParseItCommand
  case class ParseTopology(json: JValue, replyTo: ActorRef[ParsedResultMessage]) extends ParseItCommand
  case class LoadJsonConfig(jsonFile: String, configType: String, replyTo: ActorRef[ParsedResultMessage]) extends ParseItCommand
  sealed trait ParsedResultMessage
  case class ParsedTopology(topology: Topology, from: ActorRef[ParseTopology]) extends ParsedResultMessage
  case class LoadedJsonConfig(configData: JValue, configType: String, fileShortName: String, from: ActorRef[ParseTopology]) extends ParsedResultMessage

  def deserializeJson(json: String): Topology = {
    val data = parse(json)
    data.extract[Topology]
  }

  def deserializeJson(json: JValue): Topology = {
    val data = json
    val r: Topology = data.extract[Topology]
    r
  }

  private def getListOfFiles(dir: String):List[File] = {
    val d = new File(dir)
    if (d.exists && d.isDirectory) {
      d.listFiles.filter(_.isFile).toList
    } else {
      List[File]()
    }
  }

  def loadJsonFile(path: String): JValue = {
    val jsonString = fromFile(path).getLines.mkString
    parse(jsonString)
  }

  val render: Behavior[ParseItCommand] = Behaviors.receive { (context, message) => {
      implicit val timeout: Timeout = 190.seconds
      message match {
        case ParseTopology(json: JValue, replyTo) => {
          replyTo ! ParsedTopology(deserializeJson(json), context.self)
          Behaviors.same
        }
        case LoadJsonConfig(jsonFile, configType, replyTo) => {
          replyTo ! LoadedJsonConfig(loadJsonFile(jsonFile), configType, Paths.get(jsonFile).getFileName.toString, context.self)
          Behaviors.same
        }
      }
    }
  }
}
