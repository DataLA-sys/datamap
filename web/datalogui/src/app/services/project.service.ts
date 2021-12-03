import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../classes/project';
import { TemplateService } from './template.service';
import { environment } from 'src/environments/environment';
import { EventService } from './events.service';
import { Dataset, Named, TopologyNode } from '../classes/dataset';
import { Topology } from '../classes/topology';
import { DomainProjectLinksSearchResult } from '../classes/domain';
import { NodeType } from '../classes/node';
import { ProjectsDataResponse, SearchApiResponse } from '../classes/api';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  domainData?: Project[] = undefined;

  currentProject?: Project = undefined;

  queries = {
    allDatasetProjectNames: {
      "selector": {
        "$or": [
          {"domain": {"$exists": false}},
          {"domain": {"$ne": true}}
        ],
        "datasets": {
            "$elemMatch": {
              "name": "datasetName"
            }
        }
      },
      "fields": ["name"],
      "limit": 1000
    },
    allDatasetProjectsData: {
      "selector": {
        "$or": [
          {"domain": {"$exists": false}},
          {"domain": {"$ne": true}}
        ],
        "datasets": {
            "$elemMatch": {
              "name": "datasetName"
            }
        }
      },
      "fields": ["name", "datasets"],
      "limit": 1000
    },    
    allLinksToDomainProject: {
      "selector": {
        "domainLinks": {
            "$elemMatch": {
              "domainProject": "domainProject"
            }
        }
      },
      "fields": [
        "name",
        "domainLinks"
      ],
      "limit": 1000
    } 
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

  private processProjectData(project: Project): Observable<Project> {
    if(project.domain == true) {
      return this.getLinksToDomainProject(project.name)
        .pipe(
            map((links: DomainProjectLinksSearchResult) =>  {
              links.docs?.forEach(doc =>  {
                doc.domainLinks?.forEach(link => {
                  let found = project.data?.datasets.find(d=>d.name == link.domainItem);
                  if(found) {
                    let linked = new Dataset();
                    linked.name = link.dataset || "";
                    linked.project = doc.name || "";
                    linked.datasetType = NodeType.linked;
                    linked.in = []
                    linked.out = []
                    if(link.linkType == "in") {
                      if(!found.in) {
                        found.in = []
                      }
                      found.in.push(linked)
                      linked.layer = "in"
                    }
                    if(link.linkType == "out") {
                      if(!found.out) {
                        found.out = []
                      }
                      found.out.push(linked)
                      linked.layer = "out"
                    }                    
                  }
                })
              })
              return project;
            }));
    }
    return of(project);
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
          this.processProjectData(project).subscribe(p => {
            this.eventService.emitProjectEvent(p);
            this.eventService.emitSpinnerEvent(false)
          })
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
      ioNode.layer = node.layer
      return ioNode
    }
    let result = new Dataset()
    result.name = project
    result.nodeType = NodeType.project
    result.project = project
    result.datasetType = NodeType.project
    result.layer = project
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
    
    this.getProject(project).subscribe(p=>{
      if(p) {
        projectStat.domain = p.domain
        let params = new HttpParams()
        .set('project', project)
        .set('propsName', propsName)
  
        this.http.post<any>("/projectStat", projectStat, {params})
          .subscribe(s => console.log(s));
      }
    })
  }

  loadProjectStat(project: string, propsName: string) {
    let params = new HttpParams()
      .set('project', project)
      .set('propsName', propsName)
    return this.http.get("/projectStat", { params })
  }

  getProjectData(project: Project) {
    return this.loadProjectStat(project.name, "normalizedTree").pipe(map(s=>{        
      if(project) {
        if(!project.data) {
          project.data = new Topology();                         
        }
        project.data.datasets = (s as any).datasets;
      }
      return project;
    }))
  }  

  getAllDatasetProjects(datasetName: string): Observable<SearchApiResponse> {
    let q = JSON.parse(JSON.stringify(this.queries.allDatasetProjectNames))
    q.selector.datasets.$elemMatch.name = datasetName
    return this.search(q) as Observable<SearchApiResponse>
  }

  getInDatasets(tableName: string, tables: TopologyNode[], visited: string[] | undefined = undefined, pname: string = "in"): string[] {
    if(!visited) {
      visited = []
    }
    if(visited.indexOf(tableName) !== -1) {
      return [];
    }
    visited.push(tableName)
    let table: any = tables.find(d => d.name == tableName)
    if(table) {
      let io: Dataset[] | undefined = table[pname]
      let intables: string[] = io?.map(d => d.name) || []
      let res: string[]  = []
      intables.forEach(t => res = res.concat(this.getInDatasets(t, tables, visited, pname) || []))
      return Array.from(new Set(res.concat(intables)))
    } else {
      return []
    }
  }

  getUsageDatasets(tableName: string, tables: TopologyNode[]): string[] {
    let usageTables: string[] = tables.filter(d => (d.in || []).map(i => i.name).concat((d.out || []).map(i => i.name)).includes(tableName)).map(i => i.name)
    return usageTables
  }  

  buildDatasetVirtualProject(datasetName: string) {
    this.eventService.emitClearAllEvent()
    
    let q = JSON.parse(JSON.stringify(this.queries.allDatasetProjectsData))
    q.selector.datasets.$elemMatch.name = datasetName    
    let resp = (this.search(q) as Observable<ProjectsDataResponse>)
      .subscribe(res => {
        let project = new Project()
        project.data = new Topology()
        project.data.datasets = []
        let normalized: TopologyNode[] = []
        project.name = datasetName
        project.virtual = true;

        res.docs.forEach(pd => {
          /***********************************/
/*          let pdd = pd.datasets.find(d=>d.name==datasetName)
          if(pdd) {
            let found = normalized.find(n=>n.name==datasetName)
            if(!found) {
              normalized.push(pdd)
            } else {
              //Неправильно! уже тут надо конструировать!
              found.in = this.concatNamed(found.in, pdd.in);
              found.out = this.concatNamed(found.out, pdd.out);      
            }
            found = normalized.find(n=>n.name==datasetName)
            console.log(found)
            let allin = this.getInDatasets(datasetName, pd.datasets)
            let allout = this.getInDatasets(datasetName, pd.datasets, undefined, "out")    
            console.log(allin)
            console.log(allout)
          }
*/          
          /***********************************/


          pd.datasets.forEach(pdd=>{
            let found = normalized.find(n=>n.name==pdd.name)
            if(!found) {
              normalized.push(pdd)
            } else {
              found.in = this.concatNamed(found.in, pdd.in);
              found.in.forEach(d=>d.out=[])
              found.out = this.concatNamed(found.out, pdd.out);
              found.out.forEach(d=>d.in=[])
            }
          })
        })
        let allin = this.getInDatasets(datasetName, normalized)
        let allout = this.getInDatasets(datasetName, normalized, undefined, "out")
        let namesToExclude: string[] = []
        project.data.datasets = normalized
          .filter(d=>d.name==datasetName || allin.indexOf(d.name) != -1 || allout.indexOf(d.name) != -1)
          .map(d=>{
            if(allin.indexOf(d.name) !== -1 && d.name !== datasetName) {
              namesToExclude = namesToExclude.concat(d.out.map(dd=>dd.name))
              d.out=[]
              d.in=d.in.filter(i=>i.name==datasetName || allin.indexOf(i.name)!=-1)
            }
            if(allout.indexOf(d.name) !== -1 && d.name !== datasetName) {
              namesToExclude = namesToExclude.concat(d.in.map(dd=>dd.name))
              d.in=[]
              d.out=d.out.filter(i=>i.name==datasetName || allout.indexOf(i.name)!=-1)
            }
            return d
          })
        project.data.datasets = project.data.datasets
          .filter(d=>namesToExclude.indexOf(d.name) == -1 || d.name == datasetName)
          .filter(d=>(d.out.length>0||d.in.length>0))
        this.eventService.emitProjectEvent(project)
      })
  }

  concatNamed<T extends Named>(list1: T[], list2: T[]): T[] {
    list2.forEach(d2 => {
      if(list1.find(d1  => d1.name == d2.name) == undefined) {
        list1.push(JSON.parse(JSON.stringify(d2)));
      }
    })
    return list1;
  }  

  normaizeTree(normalised: TopologyNode[],  datasets: TopologyNode[], level: number) {
    datasets.forEach(dd => {
      let found: TopologyNode | undefined = normalised.find(n => n.name == dd.name);      
      if(found == undefined) {
        normalised.push(JSON.parse(JSON.stringify(dd)));
        this.normaizeTree(normalised, dd.in.concat(dd.out), level + 1);
      } else {
        let prev = found.in.length + found.out.length
        found.in = this.concatNamed(found.in, dd.in);
        found.out = this.concatNamed(found.out, dd.out);
        if(dd instanceof Dataset && found instanceof Dataset) {
          found.fields = this.concatNamed(found.fields || [], (dd as Dataset).fields || []);
        }        
        if((prev != found.in.length + found.out.length) || level === 0) {
          this.normaizeTree(normalised, dd.in.concat(dd.out), level + 1);
        }          
      }            
    })
  }  

  normalizeDataset(normalised: Dataset[], dataset: Dataset) {
    dataset.out.forEach(out => {
      let mainDs = normalised.find(d => d.name == out.name);
      if(mainDs) {
        if(!mainDs.in.find(i => i.name == dataset.name)) {
          mainDs.in.push(JSON.parse(JSON.stringify(dataset)))
        }
      } else {
        throw "Not found main ds"
      }
      out.in = []
      out.out = []
    })
    dataset.in.forEach(inds => {
      let mainDs = normalised.find(d => d.name == inds.name);
      if(mainDs) {
        if(!mainDs.out.find(i => i.name == dataset.name)) {
          mainDs.out.push(JSON.parse(JSON.stringify(dataset)))
        }
      } else {
        throw "Not found main ds"
      }
      inds.in = []
      inds.out = []
    })    
  }  

  getLinksToDomainProject(domainProject: string) { 
    let q = JSON.parse(JSON.stringify(this.queries.allLinksToDomainProject))    
    q.selector.domainLinks.$elemMatch.domainProject = domainProject
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

  getDomainData() {
    if(!this.domainData) {
       this.getProjects().subscribe(data => {
              this.domainData = data.filter(p=>p.domain == true);
              /*this.domainData.forEach(project => 
                this.templateService.renderTemplate(project.template, JSON.stringify(project.templateParams))
                  .subscribe((s: any) => project.data = s)
              );*/
              this.eventService.emitDomainListEvent(this.domainData);
        });
    } else {
      this.eventService.emitDomainListEvent(this.domainData);
    }
  }

}
