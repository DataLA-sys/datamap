package ru.neoflex.datalog.actors


import akka.actor.typed.scaladsl.Behaviors
import akka.actor.typed.{ActorRef, ActorSystem, Behavior, SupervisorStrategy}
import akka.util.Timeout
import org.json4s._
import org.json4s.jackson.JsonMethods._
import ru.neoflex.datalog.domain.Topology

import java.io.{BufferedReader, File, InputStreamReader}
import java.nio.file.Paths
import scala.collection.mutable.ListBuffer
import scala.concurrent.duration.DurationInt
import scala.io.Source._

object SystemUtilRunnerActor {
  def apply(configFile: String): Behavior[SystemRunnerCommand] = Behaviors.supervise(render).onFailure(SupervisorStrategy.restart)
  var commandsOutput = Map[String, (String, ListBuffer[String])]()

  implicit val formats = DefaultFormats
  sealed trait SystemRunnerCommand
  case class RunCommand(shCommand: String, runId: String) extends SystemRunnerCommand
  case class GetOutCommand(commandRunId: String, replyTo: ActorRef[SystemRunnerResultMessage]) extends SystemRunnerCommand
  sealed trait SystemRunnerResultMessage
  case class CommandOutResult(commandRunId: String, stdOut: String) extends SystemRunnerResultMessage

  def runSh(runId: String, shCommand: String, system: ActorSystem[Nothing]): String = {
    system.log.info("runner: " + shCommand)
    println(shCommand)
    val p = new ProcessBuilder(shCommand.split(' ').toArray:_*)
    try  {
      val p2 = p.start()
      val br = new BufferedReader(new InputStreamReader(p2.getInputStream()))

      val strBuffer = new ListBuffer[String]()

      commandsOutput += (runId -> (shCommand, strBuffer))

      var line:String = ""
      while ({line = br.readLine();  line!= null}) {
        strBuffer += line
        println(line)
      }
      println("Success run")
    }  catch {
      case e: Throwable => {
        println("Error")
        val strBuffer = new ListBuffer[String]()
        strBuffer += e.getMessage
        strBuffer ++= e.getStackTrace.toList.map(l=>l.toString)
        system.log.error(strBuffer.mkString("\n"))
        commandsOutput += (runId -> (shCommand, strBuffer))
      }
      case _ => println("Some error")
    }

    runId
  }

  val render: Behavior[SystemRunnerCommand] = Behaviors.receive { (context, message) => {
      implicit val timeout: Timeout = 190.seconds
      message match {
        case RunCommand(runId: String, shCommand: String) => {
          runSh(runId, shCommand, context.system)
          Behaviors.same
        }
        case GetOutCommand(commandRunId, replyTo) => {
          commandsOutput.get(commandRunId).map(o => replyTo ! CommandOutResult(commandRunId, o._2.mkString))
          Behaviors.same
        }
      }
    }
  }
}
