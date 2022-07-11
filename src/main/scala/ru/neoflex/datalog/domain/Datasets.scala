package ru.neoflex.datalog.domain

import ru.neoflex.datalog.engine.dto.Field

case class Table(override val name: String,
                 override val in: List[Table] = List(),
                 override val out: List[Table] = List(),
                 override val project: String = "",
                 override val layer: String = "",
                 datasetType: String = "Table",
                 pathToData: Option[String] = None,
                 sourceFile: Option[String] = None,
                 sourceFileContent: Option[String] = None,
                 action: Option[String] = None,
                 fields: List[Field] = List(),
                 description: String = ""
                ) extends Node