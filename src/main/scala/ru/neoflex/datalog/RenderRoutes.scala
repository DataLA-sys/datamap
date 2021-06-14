package ru.neoflex.datalog

import akka.actor.typed.{ActorRef, ActorSystem}
import akka.actor.typed.scaladsl.AskPattern._
import akka.http.scaladsl.model.HttpMethods._
import akka.http.scaladsl.model.StatusCodes.PermanentRedirect
import akka.http.scaladsl.model.{HttpResponse, StatusCodes}
import akka.http.scaladsl.model.headers.{`Access-Control-Allow-Credentials`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Origin`}
import akka.http.scaladsl.server.Directives.{complete, _}
import akka.http.scaladsl.server.{Directive0, Route}
import akka.util.Timeout
import ru.neoflex.datalog.actors.RenderActor.RenderTemplate
import org.json4s.DefaultFormats
import ru.neoflex.datalog.actors.RenderActor
import ru.neoflex.datalog.engine.TemplateFile

import scala.concurrent.Future
import scala.concurrent.duration.DurationInt
import spray.json.DefaultJsonProtocol._

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

class RenderRoutes(renderActor: ActorRef[RenderActor.RenderCommand])
                  (projectFile: String)
                  (implicit val system: ActorSystem[_]) extends CORSHandler  {

  import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
  implicit val timeout: Timeout = 33.seconds
  implicit val ec = system.executionContext
  implicit val jobFormat = jsonFormat2(TemplateFile)
  implicit val formats = DefaultFormats

  def assets = {
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
              val m = renderActor.ask(RenderTemplate(fileName, Some(params), _))
              val s = m.flatMap(s => {
                s match {
                  case RenderActor.RenderedTemplate(value, _) => {
                    Future(value)
                  }
                }
              })
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
      assets
    )
  }
}
