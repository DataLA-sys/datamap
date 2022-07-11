package ru.neoflex.datalog.actors

import akka.actor.Status.Failure
import akka.actor.typed.{ActorRef, Behavior, SupervisorStrategy}
import akka.actor.typed.scaladsl.Behaviors
import akka.pattern.StatusReply
import org.fusesource.scalate.{TemplateEngine, TemplateSource}
import org.json4s._
import org.json4s.jackson.JsonMethods._
import org.json4s.jackson.Serialization
import ru.neoflex.datalog.domain.Topology

import java.io.{File, PrintWriter}

object RenderActor {
  def apply(): Behavior[RenderCommand] = Behaviors.supervise(render).onFailure(SupervisorStrategy.restart)

  trait RenderCommand
  case class RenderTemplate(template: String, params: Option[String], replyTo: ActorRef[StatusReply[RenderedMessage]]) extends RenderCommand
  case class RenderTemplateFromBody(templateBody: String, templateName: String, params: Option[String], replyTo: ActorRef[StatusReply[RenderedMessage]]) extends RenderCommand
  trait RenderedMessage
  case class RenderedTemplate(value: String, from: ActorRef[RenderCommand]) extends RenderedMessage

  val engine = new TemplateEngine
  implicit val formats = DefaultFormats

  def justRender(template: String, params: Option[String]): Topology = {
    val s: String = engine.layout(template, Map("params" -> params))
    val data = parse(s)
    data.extract[Topology]
  }

  def justRenderFromBody(templateBody: String, templateName: String, params: Option[String]): Topology = {
    new PrintWriter(templateName) { write(templateBody); close() }
    val s: String = engine.layout(TemplateSource.fromText(templateName, templateBody), Map("params" -> params))
    new File(templateName).delete()
    val data = parse(s)
    data.extract[Topology]
  }

  val render: Behavior[RenderCommand] = Behaviors.receive { (context, message) =>
    message match {
      case message: RenderTemplate => {
        try {
          message.replyTo ! StatusReply.success(RenderedTemplate(Serialization.write(justRender(message.template, message.params)), context.self))
        } catch {
          case e: Throwable => {
            message.replyTo ! StatusReply.error(e)
          }
        }
        Behaviors.same
      }
      case message: RenderTemplateFromBody =>{
        try {
          message.replyTo ! StatusReply.success(RenderedTemplate(Serialization.write(justRenderFromBody(message.templateBody, message.templateName, message.params)), context.self))
        } catch {
          case e: Throwable => {
            message.replyTo ! StatusReply.error(e)
          }
        }
        Behaviors.same
      }
    }
  }
}
