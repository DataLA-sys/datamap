export class TopologyNode {  
  name!: string;
  nodeType?: string;
  in!: Dataset[];
  out!: Dataset[];
  layer!: string;
  project?: string;  
}

export class Field {
  name!: string;
  sources?: Field[];
  fieldPlanType: String = "Empty";
}

export class Dataset extends TopologyNode {  
  datasetType?: string;
  pathToData?: string;
  sourceFile?: string;
  action?: string;
  fields?: Field[];
}
