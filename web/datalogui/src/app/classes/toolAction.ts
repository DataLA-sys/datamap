import { TopologyNode } from "./dataset";

export class Tool {
  name!: string;  
}

export class ToolAction extends TopologyNode {
  tool!: string;
}
