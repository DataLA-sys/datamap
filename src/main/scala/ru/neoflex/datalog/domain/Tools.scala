package ru.neoflex.datalog.domain

case class Tool(name: String)
case class ToolAction(
  override val name: String,
  override val project: String = "",
  override val layer: String = "",
  tool: Option[String],
  override val in: List[ToolAction] = List(),
  override val out: List[ToolAction] = List()) extends Node