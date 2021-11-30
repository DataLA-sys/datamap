import { Topology } from "./topology";

export class Project {
  name!: string;
  template!: string;
  templateParams?: string;
  data?: Topology;
  enable?: boolean = true;
  domain?: boolean = false;
  virtual?: boolean = false;
}
