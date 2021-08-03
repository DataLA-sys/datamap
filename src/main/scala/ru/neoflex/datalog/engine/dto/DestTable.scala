package ru.neoflex.datalog.engine.dto
case class Field(name: String, sources: List[Field] = List(), fieldPlanType: String)
case class DestTable(name: String, sources: List[String], sourceFile: String, layer: String, fields: List[Field] = List())
