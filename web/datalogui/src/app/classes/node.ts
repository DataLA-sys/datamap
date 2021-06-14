import { Dataset } from './dataset'

export class NodeData {
  image: string = "assets/dataset.ico";
  color: string = "#a95963";
  dataset!: Dataset
  constructor(image: string,  color: string,  dataset: Dataset) {
    this.image = image
    this.color = color
    this.dataset = dataset
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
