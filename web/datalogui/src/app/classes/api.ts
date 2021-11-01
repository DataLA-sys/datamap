import { Dataset } from "./dataset";

export class ProjectData {
  name: string = "";
  datasets: Dataset[] = [];
}

export class SearchApiResponse {
  docs: any[] = []
}

export class ProjectsDataResponse extends SearchApiResponse {
  docs: ProjectData[] = [];
}