import { Dataset, TopologyNode } from './dataset'

export enum NodeType {
  Table = "Table",
  SH = "SH",
  project = "project",
  file = "file",
  component = "component",
  linked = "Linked"
}

export class NodeData {
  image: string = "assets/dataset.ico";
  color: string = "#a95963";
  dataset!: TopologyNode
  constructor(color: string,  dataset: TopologyNode) {
    this.image = this.getImage(dataset);
    this.color = color
    this.dataset = dataset
  }

  private getImage(dataset: any): string {
    if(dataset.datasetType == "Table") {
      return "assets/dataset.ico";
    }
    if(dataset.datasetType == "SH") {
      return "assets/sh.jpg";
    }
    if(dataset.datasetType == "project") {
      return "assets/project.png";
    }
    if(dataset.datasetType == "file") {
      return "assets/file.png";
    }
    if(dataset.datasetType == "Error") {
      return "assets/error-icon-32.png";
    }
    if(dataset.datasetType == NodeType.linked) {
      return "assets/linkedTable.png";
    }        
    return "assets/component.png";
  }
}

export class Node {
  id: string;
  label: string;
  data?: NodeData;
  constructor(id: string, label: string, data?: NodeData) {
    this.id = id
    this.label = label
    this.data = data
  }
}
