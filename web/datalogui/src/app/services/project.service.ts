import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../classes/project';
import { TemplateService } from './template.service';
import { environment } from 'src/environments/environment';
import { EventService } from './events.service';
import { Dataset, TopologyNode } from '../classes/dataset';

@Injectable({
  providedIn: 'root'
})
export class ProjectService { 

  currentProject?: Project = undefined;
  allDatasetProjectNames = {
    "selector": {
       "datasets": {
          "$elemMatch": {
             "name": "datasetName"
          }
       }
    },
    "fields": ["name"]
 }
  
  constructor(private http: HttpClient, private templateService: TemplateService, private eventService: EventService) { 
    eventService.projectNameEvent$.subscribe(value => {

      this.getProject(value).subscribe(p =>{
        if(p) {
          this.loadProject(p)
        }          
      })
    })
  }

  getProjects(): Observable<Project[]> {    
    return this.http.get<Project[]>("/projectFile")  
  }

  getProject(name: string): Observable<Project | undefined> {
    let p: Observable<Project | undefined> = this.getProjects()
      .pipe(map((projects: Project[]) => projects.find(project => project.name === name)));
    return p;
  }

  loadProject(project: Project, clearAll: boolean = true) {
    this.currentProject = project;
    if(clearAll === true) {
      this.eventService.emitClearAllEvent()
    }
    if(!project.data && !environment.singleHtml) {
      this.eventService.emitSpinnerEvent(true)
      this.templateService.renderTemplate(project.template, JSON.stringify(project.templateParams))
        .subscribe((s: any) => {
          project.data = s
          this.eventService.emitProjectEvent(project);
          this.eventService.emitSpinnerEvent(false)
        })        
    } else {
      this.eventService.emitProjectEvent(project);
    }
  }
  
  getProjectsInputOutput(normalisedTopologyTree: TopologyNode[], project: string): TopologyNode {
    let newNode = function(node: any) {
      let ioNode = new Dataset()
      ioNode.name = node.name
      ioNode.nodeType = node.nodeType
      ioNode.project = project
      ioNode.out = []
      ioNode.in = []
      ioNode.datasetType = node.datasetType;
      return ioNode
    }
    let result = new Dataset()
    result.name = project
    result.nodeType = "project"
    result.project = project
    result.datasetType = "project"
    let inNodes: TopologyNode[] = []
    let outNodes:  TopologyNode[] = []
    normalisedTopologyTree.forEach(node => {
      if(node.in.length === 0) {
        inNodes.push(newNode(node))
      }
      if(node.out.length === 0) {
        let nextDs = normalisedTopologyTree.find(d => d.in.find(i => i.name === node.name) != undefined)
        if(!nextDs) {
          outNodes.push(newNode(node))
        }
      }
    })
    result.in = inNodes
    result.out = outNodes
    this.saveProjectStat(result, project, "inout")
    return result
  }

  saveProjectStat(projectStat: any, project: string, propsName: string) {
    let params = new HttpParams()
      .set('project', project)
      .set('propsName', propsName)

    this.http.post<any>("/projectStat", projectStat, {params})
      .subscribe(s => console.log(s));
  }

  loadProjectStat(project: string, propsName: string) {
    let params = new HttpParams()
      .set('project', project)
      .set('propsName', propsName)
    return this.http.get("/projectStat", { params })    
  }

  getAllDatasetProjects(datasetName: string) {
    let q = JSON.parse(JSON.stringify(this.allDatasetProjectNames))
    q.selector.datasets.$elemMatch.name = datasetName
    return this.search(q)
  }

  search(query: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };    
    return this.http.post("/find", query, httpOptions)
  }  
}
