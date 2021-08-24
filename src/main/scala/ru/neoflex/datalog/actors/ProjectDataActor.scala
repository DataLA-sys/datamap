package ru.neoflex.datalog.actors

import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, Behavior, SupervisorStrategy}
import org.json4s._

import java.io.PrintWriter
import scala.io.Source.fromFile

object ProjectDataActor {
  def apply(): Behavior[DataCommand] = Behaviors.supervise(process).onFailure(SupervisorStrategy.restart)

  trait DataCommand
  case class GetProjectStatCommand(project: String, replyTo: ActorRef[CompleteDataCommandMessage]) extends DataCommand
  case class SaveProjectStatCommand(project: String, data: String, replyTo: ActorRef[CompleteDataCommandMessage]) extends DataCommand
  trait CompleteDataCommandMessage
  case class ProjectStatMessage(value: String, from: ActorRef[DataCommand]) extends CompleteDataCommandMessage

  implicit val formats = DefaultFormats

  def getFileText(fileName: String): String = {
    try {
      val source = fromFile(fileName)
      try {
        source.getLines().mkString("\n")
      } finally {
        source.close()
      }
    } catch {
      case e: Exception => e.getMessage + "\n" + e.getStackTrace.mkString("\n")
    }
  }

  val process: Behavior[DataCommand] = Behaviors.receive { (context, message) =>
    message match {
      case message: GetProjectStatCommand =>
        val dataFolder = context.system.settings.config.getString("my-app.system.dataFolder")
        val fileName = dataFolder + message.project + ".projectStat.json"
        message.replyTo ! ProjectStatMessage(getFileText(fileName), context.self)
        Behaviors.same
      case message: SaveProjectStatCommand =>
        val dataFolder = context.system.settings.config.getString("my-app.system.dataFolder")
        val fileName = dataFolder + message.project + ".projectStat.json"
        new PrintWriter(fileName) { write(message.data); close }
        message.replyTo ! ProjectStatMessage(message.data, context.self)
        Behaviors.same
      case _ => Behaviors.same
    }
  }
}
