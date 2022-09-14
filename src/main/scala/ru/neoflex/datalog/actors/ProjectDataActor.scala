package ru.neoflex.datalog.actors

import akka.Done
import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, ActorSystem, Behavior, SupervisorStrategy}

import scala.io.Source.fromFile
import akka.http.scaladsl.client.RequestBuilding.{Get, Put}
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.{ContentTypes, HttpEntity, HttpMethods, HttpRequest, HttpResponse}
import akka.http.scaladsl.model.headers.BasicHttpCredentials
import akka.pattern.StatusReply
import akka.stream.scaladsl.{Sink, Source}
import akka.util.ByteString
import org.json4s.JsonAST.{JArray, JString}

import scala.concurrent.{ExecutionContextExecutor, Future}
import scala.util.{Failure, Success, Try}
import scala.io.Source.fromFile
import org.json4s._
import org.json4s.jackson.JsonMethods
import org.json4s.jackson.JsonMethods._
import ru.neoflex.datalog.engine.JsonProcessor

import java.io.{File, PrintWriter}

object ProjectDataActor {
  def apply(): Behavior[DataCommand] = Behaviors.supervise(process).onFailure(SupervisorStrategy.restart)

  trait DataCommand
  case class GetProjectStatCommand(project: String, propsName: String, replyTo: ActorRef[CompleteDataCommandMessage]) extends DataCommand
  case class FindProjectStatCommand(query: String, replyTo: ActorRef[CompleteDataCommandMessage]) extends DataCommand
  case class SaveProjectStatCommand(project: String, propsName: String, data: String, replyTo: ActorRef[CompleteDataCommandMessage]) extends DataCommand
  case class RemoveLostDataFilesCommand(projectFile: String, replyTo: ActorRef[StatusReply[CompleteDataCommandMessage]]) extends DataCommand
  trait CompleteDataCommandMessage
  case class ProjectStatMessage(value: String, from: ActorRef[DataCommand]) extends CompleteDataCommandMessage
  case class CompleteDataMessage(from: ActorRef[DataCommand]) extends CompleteDataCommandMessage

  implicit val formats = DefaultFormats

  def getFileText(fileName: String): String = {
    val source = fromFile(fileName)
    try {
      source.getLines().mkString("\n")
    } catch {
      case e: Exception => e.getMessage + "\n" + e.getStackTrace.mkString("\n")
    } finally {
      source.close()
    }
  }

  def getDoc(system: ActorSystem[Nothing], project: String, propsName: String): Future[HttpResponse] = {
    implicit val executionContext = system.executionContext
    val res = Http(system).singleRequest(
      Get(getProjectUri(system, project, propsName))
        .addCredentials(getCred(system)))
    res
  }

  def findDocs(system: ActorSystem[Nothing], query: String): Future[HttpResponse] = {
    implicit val executionContext = system.executionContext

    val r = HttpRequest(
      method = HttpMethods.POST,
      uri = getDBUri(system) + "/_find",
      entity = HttpEntity(ContentTypes.`application/json`, query)
    )

    val res = Http(system).singleRequest(r.addCredentials(getCred(system)))
    res
  }

  private def getDBUri(system: ActorSystem[Nothing]): String = {
    "http://" +
      system.settings.config.getString("my-app.db.host") + ":" +
      system.settings.config.getInt("my-app.db.port") + "/" +
      system.settings.config.getString("my-app.db.database")
  }

  private def getProjectUri(system: ActorSystem[Nothing], project: String, propsName: String): String = {
    getDBUri(system) + "/" +
      project.replace(" ", "_").toLowerCase + "." + propsName
  }

  private def getCred(system: ActorSystem[Nothing]): BasicHttpCredentials = {
    BasicHttpCredentials(
      system.settings.config.getString("my-app.db.user"),
      system.settings.config.getString("my-app.db.password"))
  }

  def checkDBAvailable(system: ActorSystem[Nothing]): Future[Boolean] = {
    implicit val executionContext = system.executionContext

    val checkUrl = "http://" +
      system.settings.config.getString("my-app.db.host") + ":" +
      system.settings.config.getInt("my-app.db.port")

    Http(system).singleRequest(Get(checkUrl))
      .flatMap(r => streamGetStr(system, r.entity.dataBytes)
        .flatMap(f => Future(f.contains("Welcome"))))
  }

  def streamGetStr(system: ActorSystem[Nothing], source: Source[ByteString, _]): Future[String] = {
    implicit val actorSystem = system
    val sinkFold: Sink[ByteString, Future[String]] = Sink.fold("") { case (acc, str) =>
      acc + str.decodeString("UTF8")
    }
    source.runWith(sinkFold)
  }

  def saveProjectData(system: ActorSystem[Nothing], project: String, propsName: String, data: String): Unit = {
    implicit val executionContext = system.executionContext

    Http(system).singleRequest(
      Put(getProjectUri(system, project, propsName), data)
        .addCredentials(getCred(system)))
      .onComplete {
        case Success(res) => println(res)
        case Failure(_)   => sys.error("something wrong")
      }
  }

  def findProjectsProps(system: ActorSystem[Nothing], query: String): Future[String] = {
    DataService.getService(system).findProjectsProps(system, query)
  }

  object DataService {
    trait ProjectPros {
      def getProjectProps(system: ActorSystem[Nothing], project: String, propsName: String): Future[String] = {
        //implicit val executionContext: ExecutionContextExecutor = system.executionContext
        val dataFolder = system.settings.config.getString("my-app.system.dataFolder")
        val fileName = dataFolder + project + "." + propsName + ".json"
        Future(getFileText(fileName))
      }
      def findProjectsProps(system: ActorSystem[Nothing], query: String): Future[String] = {
        //implicit val executionContext: ExecutionContextExecutor = system.executionContext
        val q = JsonProcessor.parseMangoQuery(query)
        val dataFolder = system.settings.config.getString("my-app.system.dataFolder")
        Future(JsonProcessor.matchDir(dataFolder, q))
      }
    }
    trait DbProjectPros extends ProjectPros {
      override def getProjectProps(system: ActorSystem[Nothing], project: String, propsName: String): Future[String] = {
//        implicit val executionContext: ExecutionContextExecutor = system.executionContext
        checkDBAvailable(system).flatMap({
          case true => getDoc(system, project, propsName).flatMap(res => streamGetStr(system, res.entity.dataBytes))
          case false => Future.failed(new Exception("Database unavailable!"))
        })
      }
      override def findProjectsProps(system: ActorSystem[Nothing], query: String): Future[String] = {
        //implicit val executionContext: ExecutionContextExecutor = system.executionContext
        checkDBAvailable(system).flatMap(av =>
          if(av) {
            findDocs(system, query).flatMap(res => streamGetStr(system, res.entity.dataBytes))
          } else {
            Future.failed(new Exception("Database unavailable!"))
          }
        )
      }
    }
    object NoDb extends ProjectPros
    object WithDb extends DbProjectPros
    implicit var executionContext: ExecutionContextExecutor = null

    def getService(system: ActorSystem[Nothing]): ProjectPros = {
      executionContext = system.executionContext
      system.settings.config.getBoolean("my-app.db.useDB") match {
        case true => WithDb
        case false => NoDb
      }
    }
  }

  def getProjectProps(system: ActorSystem[Nothing], project: String, propsName: String): Future[String] = {
    DataService.getService(system).getProjectProps(system, project, propsName)
  }

  def save(system: ActorSystem[Nothing], project: String, propsName: String, data: String): Unit = {
    val useDB = system.settings.config.getBoolean("my-app.db.useDB")
    if(useDB) {
      implicit val executionContext: ExecutionContextExecutor = system.executionContext
      implicit val actorSystem: ActorSystem[Nothing] = system

      checkDBAvailable(system)
        .onComplete {
          case Success(av) =>
            if(av) {
              getDoc(system, project, propsName).onComplete{
                case Success(res) =>
                  streamGetStr(system, res.entity.dataBytes)
                    .flatMap(f => {
                      if(f.contains("not_found")) {
                        saveProjectData(system, project, propsName, data)
                      } else {
                        val oldVal = parse(f)
                        val id = (oldVal \ "_id").extract[String]
                        val rev = (oldVal \ "_rev").extract[String]
                        val newVal = parse(data)
                        val oldClear = oldVal removeField {
                          case JField("_id", _) => true
                          case JField("_rev", _) => true
                          case _ => false
                        }
                        if(oldClear != newVal) {
                          val newVal2 = newVal merge JObject("_rev" -> JString(rev))
                          val saveStr = compact(render(newVal2))
                          saveProjectData(system, project, propsName, saveStr)
                        }
                      }
                      Future(Done)
                    })
                case Failure(_) => sys.error("something wrong")
              }
            }
          case Failure(_) => sys.error("CouchDb unavailable")
        }
    } else {
      val fileName = project + "." + propsName + ".json"
      val dataFolder = system.settings.config.getString("my-app.system.dataFolder")
      new PrintWriter(dataFolder + fileName) {write(data); close()}
    }

  }

  val process: Behavior[DataCommand] = Behaviors.receive { (context, message) =>
    implicit val executionContext: ExecutionContextExecutor = context.system.executionContext
    message match {
      case message: GetProjectStatCommand =>
        getProjectProps(context.system, message.project, message.propsName).onComplete {
          case Success(value) => message.replyTo ! ProjectStatMessage(value, context.self)
          case _ => message.replyTo ! ProjectStatMessage("Cant read!", context.self)
        }
        Behaviors.same
      case message: FindProjectStatCommand =>
        findProjectsProps(context.system, message.query).onComplete {
          case Success(value) => message.replyTo ! ProjectStatMessage(value, context.self)
          case _ => message.replyTo ! ProjectStatMessage("Cant read!", context.self)
        }
        Behaviors.same
      case message: SaveProjectStatCommand =>
        save(context.system, message.project, message.propsName, message.data)
        message.replyTo ! ProjectStatMessage(message.data, context.self)
        Behaviors.same
      case message: RemoveLostDataFilesCommand =>
        val res = Try[Boolean] {
          val projects = fromFile(message.projectFile)
          try {
            val JArray(names: List[JString]) = JsonMethods.parse(projects.mkString) \ "name"
            val d = new File(context.system.settings.config.getString("my-app.system.dataFolder"))
            if (d.exists && d.isDirectory) {
              d.listFiles.filter(_.isFile).filter(f =>
                names.filter(a => a.extract[String] == f.getName.replace(".json", "")
                  .split('.').dropRight(1).mkString(".")).length == 0).foreach(f => f.delete())
            }
            true
          } finally {
            projects.close()
          }
        }
        res match {
          case Success(_) => message.replyTo ! StatusReply.success(CompleteDataMessage(context.self))
          case Failure(exception) => message.replyTo ! StatusReply.error(exception)
        }
        Behaviors.same
      case _ => Behaviors.same
    }
  }
}
