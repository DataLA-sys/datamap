package ru.neoflex.datalog.actors

import akka.actor.typed.{ActorRef, Behavior, SupervisorStrategy}
import akka.actor.typed.scaladsl.Behaviors
import org.fusesource.scalate.TemplateEngine
import org.json4s._
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization
import ru.neoflex.datalog.domain.Topology

object RenderActor {
  def apply(): Behavior[RenderCommand] = Behaviors.supervise(render).onFailure(SupervisorStrategy.restart)

  trait RenderCommand
  case class RenderTemplate(template: String, params: Option[String], replyTo: ActorRef[RenderedMessage]) extends RenderCommand
  trait RenderedMessage
  case class RenderedTemplate(value: String, from: ActorRef[RenderCommand]) extends RenderedMessage

  val engine = new TemplateEngine
  implicit val formats = DefaultFormats

  def justRender(template: String, params: Option[String]): Topology = {
    val s: String = engine.layout(template, Map("params" -> params))
    val data = parse(s)
    data.extract[Topology]
  }

  val render: Behavior[RenderCommand] = Behaviors.receive { (context, message) =>
    message match {
      case message: RenderTemplate => {
        var s: String = ""
        try {
          val topology = justRender(message.template, message.params)
          s = Serialization.write(topology)
        } catch {
          case e: Throwable => {
            s = e.getMessage + "\r\n"
            s = s + e.getStackTrace().map(f => f.toString + "\r\n").mkString
            System.err.print(s)
          }
        }
        message.replyTo ! RenderedTemplate(s, context.self)
        Behaviors.same
      }
    }
  }
}
