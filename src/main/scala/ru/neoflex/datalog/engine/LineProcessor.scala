package ru.neoflex.datalog.engine

trait LineProcessor {
  def processLine(line: String): String
}

class SqlScriptLineProcessor extends LineProcessor {
  override def processLine(line: String): String = {
    var sout = line
    if(line.indexOf("--") > -1) {
      if(line.indexOf(';') > line.indexOf("--")) {
        sout = line.replace(";", "")
      }
    }
    sout//.replace("DATE'", "'").replace("DATE '", "'")
  }
}

object SqlScriptLineProcessor {}