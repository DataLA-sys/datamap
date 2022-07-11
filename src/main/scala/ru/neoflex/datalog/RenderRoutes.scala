package ru.neoflex.datalog

import akka.actor.typed.{ActorRef, ActorSystem}
import akka.actor.typed.scaladsl.AskPattern._
import akka.http.scaladsl.model.HttpMethods._
import akka.http.scaladsl.model.StatusCodes.{InternalServerError, PermanentRedirect}
import akka.http.scaladsl.model.{HttpResponse, StatusCodes}
import akka.http.scaladsl.model.headers.{`Access-Control-Allow-Credentials`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Origin`}
import akka.http.scaladsl.server.Directives.{complete, _}
import akka.http.scaladsl.server.{Directive0, ExceptionHandler, Route}
import akka.pattern.StatusReply
import akka.util.Timeout
import ru.neoflex.datalog.actors.RenderActor.{RenderTemplate, RenderTemplateFromBody, RenderedMessage}
import ru.neoflex.datalog.actors.{ProjectDataActor, RenderActor, SourceFilesActor, SystemUtilActor}
import org.json4s.DefaultFormats
import org.json4s.JsonAST.{JArray, JString}
import org.json4s.jackson.JsonMethods
import ru.neoflex.datalog.actors.ProjectDataActor.{CompleteDataCommandMessage, FindProjectStatCommand, GetProjectStatCommand, ProjectStatMessage, RemoveLostDataFilesCommand, SaveProjectStatCommand}
import ru.neoflex.datalog.actors.SourceFilesActor.{CompleteFileCommandMessage, FileContentMessage, GetFileContentCommand}
import ru.neoflex.datalog.actors.SystemUtilActor.{CommandOutResult, GetOutCommand, RunCommand, RunCommandNoWait, RunCommandResult, SystemCommandResultMessage}
import ru.neoflex.datalog.engine.TemplateFile

import scala.concurrent.{ExecutionContextExecutor, Future}
import spray.json.DefaultJsonProtocol._
import spray.json.RootJsonFormat

import java.io.{File, PrintWriter}
import java.net.URLDecoder
import scala.io.Codec
import scala.io.Source.fromFile
import scala.util.Success

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
                  (implicit val system: ActorSystem[_]) extends CORSHandler  {

  import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
  private implicit val timeout: Timeout = Timeout.create(system.settings.config.getDuration("my-app.routes.ask-timeout"))
  private val commandsFile: String = system.settings.config.getString("my-app.system.commandsFile")
  implicit val ec: ExecutionContextExecutor = system.executionContext
  implicit val jobFormat: RootJsonFormat[TemplateFile] = jsonFormat2(TemplateFile)
  implicit val formats: DefaultFormats.type = DefaultFormats
  private val temlatesDir = system.settings.config.getString("my-app.system.templatesFolder")

  def assets: Route = {
    def redirectSingleSlash =
      pathSingleSlash {
        get {
          redirect("index.html", PermanentRedirect)
        }
      }
    getFromResourceDirectory("web") ~ redirectSingleSlash
  }

  implicit def exceptionHandler: ExceptionHandler =
    ExceptionHandler {
      case e: Throwable =>
        extractUri { uri =>
          system.log.error(s"Request to $uri could not be handled normally", e)
          complete(HttpResponse(InternalServerError, entity = e.getMessage))
        }
    }

  def renderRoutes(): Route = Route.seal({
    concat(
      get {
        concat(
          corsHandler(
            path("renderTemplate") {
              parameters("fileName".as[String], "params".as[String]) { (fileName, params) =>
                onComplete(renderActor.askWithStatus(RenderTemplate(temlatesDir + fileName, Some(params),
                  _: ActorRef[StatusReply[RenderedMessage]]))) {
                  case Success(value: RenderActor.RenderedTemplate) => complete(Future(value.value))
                }
              }
            }
          ),
          path("projectFile") {
            val source = fromFile(projectFile)
            val s = source.getLines.mkString
            source.close()
            complete(s)
          },
          path("commandFile") {
            val source = fromFile(commandsFile)
            val s = source.getLines.mkString
            source.close()
            complete(s)
          },
          path("sourceFileContent") {
            parameters("fileName".as[String]) { fileName =>
              onComplete(sourceFilesActor
                .askWithStatus(GetFileContentCommand(URLDecoder.decode(fileName, "UTF8"), _: ActorRef[StatusReply[CompleteFileCommandMessage]]))) {
                  case Success(FileContentMessage(value, _)) => complete(value)
                }
            }
          },
          path("projectStat") {
            parameters("project".as[String], "propsName".as[String]) { (project, propsName) =>
              complete(
                projectDataActor
                  .ask(GetProjectStatCommand(project, propsName, _: ActorRef[CompleteDataCommandMessage]))
                  .map {
                    case ProjectStatMessage(value, _) => Future(value)
                  })
            }
          },
          path("loadTemplate") {
            parameters("template".as[String]) { template =>
              val s = fromFile(temlatesDir + template)
              val ss = s.mkString
              s.close()
              complete(ss)
            }
          },
          path("runit") {
            parameters("sh".as[String], "nowait".withDefault(false)) { (sh, nowait) =>
              system.log.info("run: " + sh)
              if(nowait) complete(
                systemUtilActor
                  .ask(RunCommandNoWait(sh, _: ActorRef[SystemCommandResultMessage]))
                  .map{
                    case RunCommandResult(value, _) => Future(value)
                  }) else complete(
                systemUtilActor
                  .ask(RunCommand(sh, _: ActorRef[SystemCommandResultMessage]))
                  .map {
                    case RunCommandResult(value, _) => Future(value)
                  })
            }
          },
          path("sysout") {
            parameters("runid".as[String]) { runId =>
              complete(
                systemUtilActor
                  .ask(GetOutCommand(runId, _: ActorRef[SystemCommandResultMessage]))
                  .map {
                    case CommandOutResult(commandId, stdOut, _) =>
                      Future(stdOut)
                  })
            }
          },
          path("hello") {
            complete("Hello! I am alive!")
          }
        )
      },
      post {
        concat(
          corsHandler(
            path("renderTemplateBody") {
              parameters("templateName".as[String],
                "params".as[String]) { (templateName, params) =>
                  entity(as[String]) { body =>
                    onComplete(renderActor.askWithStatus(RenderTemplateFromBody(body,
                      temlatesDir + "fakeName" + templateName, Some(params),
                      _: ActorRef[StatusReply[RenderedMessage]]))) {
                      case Success(value: RenderActor.RenderedTemplate) => complete(Future(value.value))
                    }
                  }
              }
            }
          ),
          path("projectFile") {
            entity(as[String]) { ent => {
              new PrintWriter(projectFile) { write(ent); close() }
              complete("saved!")
            }
            }
          },
          path("commandFile") {
            entity(as[String]) { ent => {
              new PrintWriter(commandsFile) { write(ent); close() }
              complete("saved!")
            }
            }
          },
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
          },
          path("find") {
            entity(as[String]) { query =>
              complete(
                projectDataActor
                  .ask(FindProjectStatCommand(query, _: ActorRef[CompleteDataCommandMessage]))
                  .map {
                    case ProjectStatMessage(value, _) => Future(value)
                  })
            }
          },
          path("saveTemplate") {
            entity(as[TemplateFile]) { templateFile => {
              new PrintWriter(temlatesDir + templateFile.fileName) {write(templateFile.templateContent); close()}
              complete("Saved!")
            }
            }
          },
          path("removeLostDataFiles") {
            onComplete(projectDataActor.askWithStatus(RemoveLostDataFilesCommand(projectFile,
              _: ActorRef[StatusReply[CompleteDataCommandMessage]]))) {
              case  Success(_: CompleteDataCommandMessage) => complete("Complete")
            }
          }
        )
      },
      assets
    )
  })
}
