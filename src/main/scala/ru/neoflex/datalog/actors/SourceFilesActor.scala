package ru.neoflex.datalog.actors

import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, Behavior, SupervisorStrategy}
import akka.pattern.StatusReply
import org.json4s._

import scala.io.Source.fromFile

object SourceFilesActor {
  def apply(): Behavior[FileCommand] = Behaviors.supervise(process).onFailure(SupervisorStrategy.restart)

  trait FileCommand
  case class GetFileContentCommand(fileName: String, replyTo: ActorRef[StatusReply[CompleteFileCommandMessage]]) extends FileCommand
  trait CompleteFileCommandMessage
  case class FileContentMessage(value: String, from: ActorRef[FileCommand]) extends CompleteFileCommandMessage

  implicit val formats = DefaultFormats

  def getFileText(fileName: String): String = {
    val source = fromFile(fileName)
    try {
      source.mkString
    } finally {
      source.close()
    }
  }

  val process: Behavior[FileCommand] = Behaviors.receive { (context, message) =>
    message match {
      case message: GetFileContentCommand => {
        try {
          message.replyTo ! StatusReply.success(FileContentMessage(getFileText(message.fileName), context.self))
        } catch {
          case e: Throwable => message.replyTo ! StatusReply.error(e)
        }
        Behaviors.same
      }
    }
  }
}
