package ru.neoflex.datalog

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import ru.neoflex.datalog.actors.RenderActor
import scala.util.Failure
import scala.util.Success

//#main-class
object DatalogApp {
  //#start-http-server
  private def startHttpServer(routes: Route)(implicit system: ActorSystem[_]): Unit = {
    // Akka HTTP still needs a classic ActorSystem to start
    import system.executionContext
    val hostPort = system.settings.config.getInt("my-app.system.port")

    val futureBinding = Http().newServerAt("localhost", hostPort).bind(routes)
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
        var pname = ""
        if(args.length > 0) {
          pname = args(0)
        }
        val renderActor = context.spawn(RenderActor(), "RenderActor")

        val routes = new RenderRoutes(renderActor)(pname)(context.system)
        startHttpServer(routes.renderRoutes())(context.system)

        Behaviors.empty
    }
    val system = ActorSystem[Nothing](rootBehavior, "HelloAkkaHttpServer")
  }
}
//#main-class
