package ru.neoflex.datalog.actors

import akka.actor.typed.scaladsl.AskPattern.{Askable, schedulerFromActorSystem}
import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, Behavior, SupervisorStrategy}
import akka.util.Timeout

import scala.concurrent.ExecutionContextExecutor
import scala.concurrent.duration.DurationInt
import scala.util.{Failure, Success}

object SystemUtilActor {
  def apply(configFile: String, runner: ActorRef[SystemUtilRunnerActor.SystemRunnerCommand]): Behavior[SystemCommand] = {
    Behaviors.supervise(render(runner)).onFailure(SupervisorStrategy.restart)
  }
  trait SystemCommand
  case class RunCommand(shCommand: String, replyTo: ActorRef[SystemCommandResultMessage]) extends SystemCommand
  case class GetOutCommand(commandRunId: String, replyTo: ActorRef[SystemCommandResultMessage]) extends SystemCommand
  trait SystemCommandResultMessage
  case class RunCommandResult(commandRunId: String, from: ActorRef[SystemCommand]) extends SystemCommandResultMessage
  case class CommandOutResult(commandRunId: String, stdOut: String, from: ActorRef[SystemCommand]) extends SystemCommandResultMessage

  def render(runner: ActorRef[SystemUtilRunnerActor.SystemRunnerCommand]): Behavior[SystemCommand] = Behaviors.receive { (context, message) => {
      implicit val timeout: Timeout = 190.seconds
      implicit val scheduler: akka.actor.typed.Scheduler = context.system.scheduler
      implicit val ec: ExecutionContextExecutor = context.system.executionContext
      message match {
        case RunCommand(shCommand: String, replyTo) => {
          val runId = java.util.UUID.randomUUID().toString
          runner ! SystemUtilRunnerActor.RunCommand(runId, shCommand)
          replyTo ! RunCommandResult(runId, context.self)
          Behaviors.same
        }
        case GetOutCommand(commandRunId, replyTo) => {
          runner
            .ask(SystemUtilRunnerActor.GetOutCommand(commandRunId, _: ActorRef[SystemUtilRunnerActor.SystemRunnerResultMessage]))
            .map {
              case SystemUtilRunnerActor.CommandOutResult(commandRunId, stdOut) => replyTo ! CommandOutResult(commandRunId, stdOut, context.self)
            }


/*          {
            case Success(SystemUtilRunnerActor.CommandOutResult(commandRunId, stdOut)) => replyTo ! CommandOutResult(commandRunId, stdOut, context.self)
            case Failure(_) => replyTo ! CommandOutResult(commandRunId, "Fail to find!", context.self)
          }*/
          Behaviors.same
        }
      }
    }
  }
}
