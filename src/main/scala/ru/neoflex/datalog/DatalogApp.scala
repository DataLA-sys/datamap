package ru.neoflex.datalog

import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.Behaviors
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Route
import ru.neoflex.datalog.actors.{OwConfigToTopologyActor, RenderActor}
import scala.util.Failure
import scala.util.Success

//#main-class
object DatalogApp {
  //#start-http-server
  private def startHttpServer(routes: Route)(implicit system: ActorSystem[_]): Unit = {
    // Akka HTTP still needs a classic ActorSystem to start
    import system.executionContext

    val futureBinding = Http().newServerAt("localhost", 8080).bind(routes)
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
        val renderActor = context.spawn(RenderActor(), "RenderActor")
        val owConfigToTopologyActor = context.spawn(OwConfigToTopologyActor(), "owConfigToTopologyActor")

        val routes = new RenderRoutes(owConfigToTopologyActor)(renderActor)(context.system)
        startHttpServer(routes.renderRoutes)(context.system)

        Behaviors.empty
    }
    val system = ActorSystem[Nothing](rootBehavior, "HelloAkkaHttpServer")
  }
}
//#main-class