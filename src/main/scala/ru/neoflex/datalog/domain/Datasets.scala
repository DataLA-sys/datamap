package ru.neoflex.datalog.domain

case class Table(override val name: String,
                 override val in: List[Table] = List(),
                 override val out: List[Table] = List(),
                 override val project: String = "",
                 override val layer: String = "",
                 datasetType: String = "Table",
                 pathToData: Option[String] = None,
                 sourceFile: Option[String] = None,
                 sourceFileContent: Option[String] = None,
                 action: Option[String] = None
                ) extends Node