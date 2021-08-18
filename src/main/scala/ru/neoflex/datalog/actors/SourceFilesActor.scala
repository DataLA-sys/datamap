package ru.neoflex.datalog.actors

import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, Behavior, SupervisorStrategy}
import org.json4s._

import scala.io.Source.fromFile

object SourceFilesActor {
  def apply(): Behavior[FileCommand] = Behaviors.supervise(process).onFailure(SupervisorStrategy.restart)

  trait FileCommand
  case class GetFileContentCommand(fileName: String, replyTo: ActorRef[CompleteFileCommandMessage]) extends FileCommand
  trait CompleteFileCommandMessage
  case class FileContentMessage(value: String, from: ActorRef[FileCommand]) extends CompleteFileCommandMessage

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

  val process: Behavior[FileCommand] = Behaviors.receive { (context, message) =>
    message match {
      case message: GetFileContentCommand => {
        message.replyTo ! FileContentMessage(getFileText(message.fileName), context.self)
        Behaviors.same
      }
    }
  }
}
