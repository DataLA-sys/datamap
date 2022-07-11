import { DatasetAdditionalProps } from "./dataset";
import { Topology } from "./topology";

export class Project {
  name!: string;
  template!: string;
  templateParams?: any;
  data?: Topology;
  enable?: boolean = true;
  domain?: boolean = false;
  virtual?: boolean = false;
  additionalData?: DatasetAdditionalProps[] = [];
  constructor (name: string = "", template: string = "", templateParams: any = undefined, domain?: boolean) {
    this.name = name
    this.template = template
    this.templateParams = templateParams
    this.domain = domain
  };
}

export class ProjectAdditionalProperties {
  datasetsAdditionalProps?: DatasetAdditionalProps[] = [];
}