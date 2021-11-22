import java.lang.Thread.sleep
import java.util.Calendar
import scala.concurrent.{Future, blocking}
implicit val ex = scala.concurrent.ExecutionContext.global

println("111111")

val f: Future[Boolean] = Future {
  blocking {
    println("AAAAAAAA" + Calendar.getInstance().getTime())
    sleep(3000)
    println("BBBB" + Calendar.getInstance().getTime() )
    true
  }
}

println("CCC" + Calendar.getInstance().getTime())
f.map(v=>println(v))