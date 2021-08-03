import { Dataset, Field } from "./dataset"
import { Tool, ToolAction } from "./toolAction"

export class ProjectFileDir {
  project: string = ""
  name: string = ""
  childDirs?: ProjectFileDir[]
  isFile: boolean = false
  fileContent: string = ""
}

export class Topology {
  tools!: Tool[]
  actions: ToolAction[] = []
  datasets!: Dataset[]
  projectFiles?: ProjectFileDir[]
  fields?: Field[] 
}
