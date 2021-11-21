package ru.neoflex.datalog

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import ru.neoflex.datalog.actors.{ProjectDataActor, RenderActor, SourceFilesActor, SystemUtilActor, SystemUtilRunnerActor}

import scala.util.Failure
import scala.util.Success

//#main-class
object DatalogApp {
  //#start-http-server
  private def startHttpServer(routes: Route)(implicit system: ActorSystem[_]): Unit = {
    // Akka HTTP still needs a classic ActorSystem to start
    import system.executionContext
    val hostPort = system.settings.config.getInt("my-app.system.port")

    val futureBinding = Http().newServerAt("0.0.0.0", hostPort).bind(routes)
    futureBinding.onComplete {
      case Success(binding) =>
        val address = binding.localAddress
        system.log.info("Server online at http://{}:{}/", address.getHostString, address.getPort)
      case Failure(ex) =>
        system.log.error("Failed to bind HTTP endpoint, terminating system", ex)
        system.terminate()
    }
  }
  //#start-http-server
  def main(args: Array[String]): Unit = {
      val rootBehavior = Behaviors.setup[Nothing] { context =>
        val projectsFileName = {
          if(args.length > 0) {
            args(0)
          } else ""
        }

        val systemUtilConfigFileName = {
          if(args.length > 1) {
            args(1)
          } else ""
        }

        val renderActor = context.spawn(RenderActor(), "RenderActor")
        val filesActor = context.spawn(SourceFilesActor(), "SourceFilesActor")
        val projectDataActor = context.spawn(ProjectDataActor(), "ProjectDataActor")
        val systemUtilRunnerActor = context.spawn(SystemUtilRunnerActor(systemUtilConfigFileName), "SystemUtilRunnerActor")
        val systemUtilActor = context.spawn(SystemUtilActor(systemUtilConfigFileName, systemUtilRunnerActor), "SystemUtilActor")

        val routes = new RenderRoutes(renderActor, filesActor,
          projectDataActor, systemUtilActor)(projectsFileName)(systemUtilConfigFileName)(context.system)
        startHttpServer(routes.renderRoutes())(context.system)

        Behaviors.empty
    }
    val system = ActorSystem[Nothing](rootBehavior, "DatalogAkkaHttpServer")
  }
}
//#main-class
