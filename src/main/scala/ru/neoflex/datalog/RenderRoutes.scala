package ru.neoflex.datalog

import akka.actor.typed.{ActorRef, ActorSystem}
import akka.actor.typed.scaladsl.AskPattern._
import akka.http.scaladsl.model.HttpMethods._
import akka.http.scaladsl.model.StatusCodes.PermanentRedirect
import akka.http.scaladsl.model.{HttpResponse, StatusCodes}
import akka.http.scaladsl.model.headers.{`Access-Control-Allow-Credentials`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Origin`}
import akka.http.scaladsl.server.Directives.{complete, _}
import akka.http.scaladsl.server.directives.RouteDirectives
import akka.http.scaladsl.server.{Directive0, Route}
import akka.util.Timeout
import ru.neoflex.datalog.actors.RenderActor.{RenderTemplate, RenderedMessage}
import ru.neoflex.datalog.actors.{ProjectDataActor, RenderActor, SourceFilesActor, SystemUtilActor}
import org.json4s.DefaultFormats
import ru.neoflex.datalog.actors.ProjectDataActor.{CompleteDataCommandMessage, FindProjectStatCommand, GetProjectStatCommand, ProjectStatMessage, SaveProjectStatCommand}
import ru.neoflex.datalog.actors.SourceFilesActor.{CompleteFileCommandMessage, FileContentMessage, GetFileContentCommand}
import ru.neoflex.datalog.actors.SystemUtilActor.{CommandOutResult, GetOutCommand, RunCommand, RunCommandNoWait, RunCommandResult, SystemCommandResultMessage}
import ru.neoflex.datalog.engine.TemplateFile

import scala.concurrent.{ExecutionContextExecutor, Future}
import spray.json.DefaultJsonProtocol._
import spray.json.RootJsonFormat

import java.io.{FileNotFoundException, PrintWriter}
import java.nio.file.{Files, Paths}
import scala.io.Source.fromFile

trait CORSHandler{

  private val corsResponseHeaders = List(
    `Access-Control-Allow-Origin`.*,
    `Access-Control-Allow-Credentials`(true),
    `Access-Control-Allow-Headers`("Authorization",
      "Content-Type", "X-Requested-With")
  )

  //this directive adds access control headers to normal responses
  private def addAccessControlHeaders: Directive0 = {
    respondWithHeaders(corsResponseHeaders)
  }

  //this handles preflight OPTIONS requests.
  private def preflightRequestHandler: Route = options {
    complete(HttpResponse(StatusCodes.OK).
      withHeaders(`Access-Control-Allow-Methods`(OPTIONS, POST, PUT, GET, DELETE)))
  }

  // Wrap the Route with this method to enable adding of CORS headers
  def corsHandler(r: Route): Route = addAccessControlHeaders {
    preflightRequestHandler ~ r
  }

  // Helper method to add CORS headers to HttpResponse
  // preventing duplication of CORS headers across code
  def addCORSHeaders(response: HttpResponse):HttpResponse =
    response.withHeaders(corsResponseHeaders)

}

class RenderRoutes(renderActor: ActorRef[RenderActor.RenderCommand],
                   sourceFilesActor: ActorRef[SourceFilesActor.FileCommand],
                   projectDataActor: ActorRef[ProjectDataActor.DataCommand],
                   systemUtilActor: ActorRef[SystemUtilActor.SystemCommand]
                  )
                  (projectFile: String)
                  (systemUtilsConfigFile: String)
                  (implicit val system: ActorSystem[_]) extends CORSHandler  {

  import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
  private implicit val timeout: Timeout = Timeout.create(system.settings.config.getDuration("my-app.routes.ask-timeout"))
  private val commandsFile: String = system.settings.config.getString("my-app.system.commandsFile")
  implicit val ec: ExecutionContextExecutor = system.executionContext
  implicit val jobFormat: RootJsonFormat[TemplateFile] = jsonFormat2(TemplateFile)
  implicit val formats: DefaultFormats.type = DefaultFormats

  def assets: Route = {
    def redirectSingleSlash =
      pathSingleSlash {
        get {
          redirect("index.html", PermanentRedirect)
        }
      }
    getFromResourceDirectory("web") ~ redirectSingleSlash
  }

  def renderRoutes(): Route = {
    concat(
      get {
        corsHandler(
          path("renderTemplate") {
            parameters("fileName".as[String], "params".as[String]) { (fileName, params) =>
              val m = renderActor.ask(RenderTemplate(fileName, Some(params), _: ActorRef[RenderedMessage]))
              val s = m.flatMap {
                case RenderActor.RenderedTemplate(value, _) =>
                  Future(value)
              }
              complete(s)
            }
          }
        )
      },
      get {
        path("projectFile") {
          if(Files.exists(Paths.get(projectFile))) {
            val source = fromFile(projectFile)
            val s = source.getLines.mkString
            source.close()
            complete(s)
          } else {
            println(s"Not found $projectFile")
            complete(s"""{"message": "project file $projectFile not found"}""")
          }
        }
      },
      get {
        path("commandFile") {
          if(Files.exists(Paths.get(commandsFile))) {
            val source = fromFile(commandsFile)
            val s = source.getLines.mkString
            source.close()
            complete(s)
          } else {
            println(s"Not found $commandsFile")
            complete(s"""{"message": "command file $commandsFile not found"}""")
          }
        }
      },
      post {
        path("commandFile") {
          if(Files.exists(Paths.get(commandsFile))) {
            entity(as[String]) { ent => {
                new PrintWriter(commandsFile) { write(ent); close() }
                complete("saved!")
              }
            }
          } else {
            failWith(new FileNotFoundException(commandsFile))
          }
        }
      },
      get {
        path("sourceFileContent") {
          parameters("fileName".as[String]) { (fileName) =>
            complete(
              sourceFilesActor
                .ask(GetFileContentCommand(fileName, _: ActorRef[CompleteFileCommandMessage]))
                .map{
                  case FileContentMessage(value, _) =>
                    Future(value)
                })
          }
        }
      },
      post {
        path("projectStat") {
          parameters("project".as[String], "propsName".as[String]) { (project, propsName) =>
            entity(as[String]) { ent =>
              complete(
                projectDataActor
                  .ask(SaveProjectStatCommand(project, propsName, ent, _: ActorRef[CompleteDataCommandMessage]))
                  .map{
                    case ProjectStatMessage(value, _) =>
                      Future(value)
                  })
            }
          }
        }
      },
      get {
        path("projectStat") {
          parameters("project".as[String], "propsName".as[String]) { (project, propsName) =>
            complete(
              projectDataActor
                .ask(GetProjectStatCommand(project, propsName, _: ActorRef[CompleteDataCommandMessage]))
                .map {
                  case ProjectStatMessage(value, _) => Future(value)
                })
          }
        }
      },
      post {
        path("find") {
          entity(as[String]) { query =>
            complete(
              projectDataActor
                .ask(FindProjectStatCommand(query, _: ActorRef[CompleteDataCommandMessage]))
                .map {
                  case ProjectStatMessage(value, _) => Future(value)
                })
          }
        }
      },
      post {
        path("template") {
          entity(as[TemplateFile]) { tfile => {
            println(tfile)
            complete("Job added")
          }
        }
          /*val operationPerformed: Future[JobRepository.Response] =
            buildJobRepository.ask(JobRepository.AddJob(job, _))
          onSuccess(operationPerformed) {
            case JobRepository.OK         => complete("Job added")
            case JobRepository.KO(reason) => complete(StatusCodes.InternalServerError -> reason)
          }*/
        }
      },
      get {
        path("runit") {
          parameters("sh".as[String], "nowait".withDefault((false))) { (sh, nowait) =>
            system.log.info("run: " + sh)
            println(sh)
            if(nowait) {
              complete(
                systemUtilActor
                  .ask(RunCommandNoWait(sh, _: ActorRef[SystemCommandResultMessage]))
                  .map{
                    case RunCommandResult(value, _) => Future(value)
                    case _ => Future("Some error")
                  })
            } else {
              complete(
                systemUtilActor
                  .ask(RunCommand(sh, _: ActorRef[SystemCommandResultMessage]))
                  .map{
                    case RunCommandResult(value, _) => Future(value)
                  })
            }
          }
        }
      },
      get {
        path("sysout") {
          parameters("runid".as[String]) { (runId) =>
            complete(
              systemUtilActor
                .ask(GetOutCommand(runId, _: ActorRef[SystemCommandResultMessage]))
                .map{
                  case CommandOutResult(commandId, stdOut, _) =>
                    Future(stdOut)
                })
          }
        }
      },
      get {
        path("hello") {
          complete("Hello! I am alive!")
        }
      },
      assets
    )
  }
}
