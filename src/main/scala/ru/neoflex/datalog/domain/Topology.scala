package ru.neoflex.datalog.domain

case class ProjectFileDir(project: String, name: String,
                          childDirs: List[ProjectFileDir] = List(), isFile: Boolean = false, fileContent: String = "")
case class Topology(tools: List[Tool] = List(), actions: Option[List[ToolAction]], datasets: List[Table] = List(),
                    projectFiles: List[ProjectFileDir] = List())