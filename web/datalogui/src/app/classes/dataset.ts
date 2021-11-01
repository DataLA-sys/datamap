import { NodeType } from "./node";

export class Named {
  name!: string;
}

export class TopologyNode extends Named {  
  nodeType?: NodeType;
  in!: Dataset[];
  out!: Dataset[];
  layer!: string;
  project?: string;
}

export class Field  extends Named {
  name!: string;
  tableName?: string;
  sources?: Field[];
  fieldPlanType: String = "Empty";
}

export class Dataset extends TopologyNode {  
  datasetType?: NodeType;
  pathToData?: string;
  sourceFile?: string;
  action?: string;
  fields?: Field[];
}
