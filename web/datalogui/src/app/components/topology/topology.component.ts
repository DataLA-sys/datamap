import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { EventService } from "../../services/events.service";
import { ProjectFileDir, Topology } from "../../classes/topology";
import { Node, NodeData } from "../../classes/node";
import { Dataset, TopologyNode, Named } from '../../classes/dataset';
import { Subject } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

interface KeyValuePair {
  key: string;
  value: string;
}

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.css']
})
export class TopologyComponent implements OnInit {

  x: number = 1400;
  y: number = 800;
  dim: [number, number] = [this.x, this.y];
  inodes: Dataset[] = []
  
  clusters: any[] = []
  nodes: Node[] = []
  links: any[] = []
  selectedTable: string = ""
  error: any;
  selected: Node | undefined;
  data: Topology | undefined;
  showMiniMap: boolean = false;
  showClusters: boolean = true;
  viewMode: string = "datasets";
  inOut: TopologyNode[] = []

  getNodeProject(node: Node): string | undefined {
    return node.data?.dataset.project;
  }

  getTables(): string[] {
    let res: string[] = []
    if(this.nodes) {
      res = this.nodes.map(n => n.data?.dataset.name||"")
    }
    return res;    
  }

  zoomToFit$: Subject<boolean> = new Subject();
  panToNode$: Subject<any> = new Subject();
  center$: Subject<boolean> = new Subject();
  currentProject = "";

  constructor(
    private eventService: EventService, 
    private projectService: ProjectService, 
    public cd: ChangeDetectorRef) { 
    eventService.zoomToFitEvent$.subscribe(value => this.zoomToFit());
    eventService.centerTopologyEvent$.subscribe(value => this.center$.next(true));

    eventService.getSelectedNodeProjectEvent$.subscribe(node => 
      eventService.emitReturnSelectedNodeProjectEvent(this.getNodeProject(node)));

    eventService.clearAllEvent$.subscribe(value => this.clear())
    eventService.joinDataEvent$.subscribe(value => {
      this.calculateInOut(value.name, value.data || new Topology())
      this.addData(value)
    })
    eventService.projectEvent$.subscribe(value => {
      this.currentProject = value.name
      this.addData(value.data || new Topology())
      this.calculateInOut(value.name, value.data || new Topology())

    })
    eventService.tableSelectedEvent$.subscribe(value => {       
      let found = this.nodes.find(node => node.data?.dataset?.name === value);
      if(found) {
        this.nodeClick(found)
        this.panToNode$.next(found?.id)
      }
    })
    eventService.filterByTableInEvent$.subscribe(value => {
      if(this.data) {
        this.getData(this.data, value)
      }
    })
    eventService.filterByTableUsageEvent$.subscribe(value => {
      if(this.data) {
        this.getData(this.data, undefined, value)
      }
    })    
    eventService.clearTableFilterEvent$.subscribe(value => {
      if(this.data) {
        this.getData(this.data)
      }
    })
    eventService.toggleClustersEvent$.subscribe(value => {
      this.showClusters = !this.showClusters
    })
    eventService.toggleViewEvent$.subscribe(value => {
      this.viewMode = value
      if(this.data) {
        this.getData(this.data)
      }      
    })    
  }

  zoomToFit() {
    this.zoomToFit$.next(true)
  }  

  checkCluster(layer: string, nodeName: string, clusters: any[], tablesId: KeyValuePair[]) {
    let cluster: any = clusters.find((c: any) => c.label == layer)
    if(!cluster) {
      cluster = {id: layer, label: layer, childNodeIds: []}
      if(cluster.label == "Hive"){
        cluster.data = {image: "assets/Apache_Hive_logo.svg"}
      }
      if(cluster.label == "Oracle"){
        cluster.data = {image: "assets/oracle-2.svg"}
      }      
      if(cluster.label == "DataMart"){
        cluster.data = {image: "assets/datamart.png"}
      }      
      clusters.push(cluster)
    }
    cluster.childNodeIds.push(tablesId.find(k => k.key == nodeName)?.value)
  }
  
  findFileContent(dirs: ProjectFileDir[] | undefined, project: string | undefined, fileName: string | undefined): ProjectFileDir | undefined {
    let found: ProjectFileDir | undefined = undefined
    if(dirs) {
      found = dirs.find(d => d.project == project && d.isFile == true && d.name == fileName)
      if(!found) {
        for(let d of dirs) {
          found = this.findFileContent(d.childDirs, project, fileName)
          if(found) {
            break
          }        
        }
      }    
    }
    return found
  }

  nodeClick(node: Node) {
    this.selected = node
    this.eventService.emitNodeSelectedEvent(node)
    this.cd.detectChanges()
  }

  checkIfSelected(node: Node) {
    return node.id == this.selected?.id
  }

  clear() {
    this.currentProject = ""
    let t = new Topology()
    t.datasets = []
    this.inOut = []
    this.getData(t)
  }

  addData(data: Topology) {
    let t = new Topology()
    t.datasets = (this.data?.datasets || []).concat(data.datasets || [])
    t.actions = (this.data?.actions || []).concat(data.actions || [])
    this.getData(t)
  }

  getInDatasets(tableName: String, tables: TopologyNode[]): string[] {
    let intables: string[] = tables.find(d => d.name == tableName)?.in?.map(d => d.name) || []
    let res: string[]  = []
    intables.forEach(t => res = res.concat(this.getInDatasets(t, tables) || []))
    return res.concat(intables)
  }

  getUsageDatasets(tableName: string, tables: TopologyNode[]): string[] {
    let usageTables: string[] = tables.filter(d => (d.in || []).map(i => i.name).concat((d.out || []).map(i => i.name)).includes(tableName)).map(i => i.name)
    return usageTables
  }  

  normalizeDataset(normalised: Dataset[], dataset: Dataset) {
    dataset.out.forEach(out => {
      let mainDs = normalised.find(d => d.name == out.name);
      if(mainDs) {
        if(!mainDs.in.find(i => i.name == dataset.name)) {
          //mainDs.in.push(dataset);
          mainDs.in.push(JSON.parse(JSON.stringify(dataset)))
        }
      }
    })
  }

  concatNamed<T extends Named>(list1: T[], list2: T[]): T[] {
    list2.forEach(d2 => {
      if(list1.find(d1  => d1.name == d2.name) == undefined) {
        list1.push(d2);
      }
    })
    return list1;
  }

  normaizeTree(normalised: TopologyNode[],  datasets: TopologyNode[], level: number) {
    datasets.forEach(dd => {
      let found: TopologyNode | undefined = normalised.find(n => n.name == dd.name);      
      if(found == undefined) {
        //normalised.push(dd);
        normalised.push(JSON.parse(JSON.stringify(dd)));
        this.normaizeTree(normalised, dd.in.concat(dd.out), level + 1);
      } else {
        let prev = found.in.length + found.out.length
        found.in = this.concatNamed(found.in, dd.in);
        found.out = this.concatNamed(found.out, dd.out);
        if(dd instanceof Dataset && found instanceof Dataset ) {
          found.fields = this.concatNamed(found.fields || [], (dd as Dataset).fields || []);
        }        
        if((prev != found.in.length + found.out.length) || level === 0) {
          this.normaizeTree(normalised, dd.in.concat(dd.out), level + 1);
        }          
      }            
    })
  }

  private getNodes(): TopologyNode[] {
    if(this.viewMode === "actions") {
      return this.data?.actions || []
    }
    if(this.viewMode === "inout" && this.inOut) {
      return this.inOut
    }
    return this.data?.datasets || []
  }

  private calculateInOut(project: string, data: Topology) {
    //this.inOut = []
    let inodes: TopologyNode[] = data.datasets || [];
    this.normaizeTree(inodes, data.datasets || [], 0);
    inodes.forEach(d => this.normalizeDataset(inodes, d));    
    if(project !== "") {
      let io = this.projectService.getProjectsInputOutput(inodes, project)
      this.inOut.push(io)
      this.normaizeTree(this.inOut, this.inOut, 0);
      this.inOut.forEach(d => this.normalizeDataset(this.inOut, d));
      this.eventService.emitProjectStatEvent(io)
    }
  }

  getData(data: Topology, filterByTableIn: string | undefined = undefined, filterByTableUsage: string | undefined = undefined) {
    this.data = data;
    this.selected = undefined;
    
    let inodes: TopologyNode[] = this.getNodes();
    this.normaizeTree(inodes, this.getNodes(), 0);
    inodes.forEach(d => this.normalizeDataset(inodes, d));
    
    if(this.currentProject !== "") {
      this.projectService.saveProjectStat({"name": this.currentProject, "datasets": inodes}, this.currentProject, "normalizedTree")
    }

    let filteredTables = filterByTableIn ? this.getInDatasets(filterByTableIn, inodes) : (filterByTableUsage ? this.getUsageDatasets(filterByTableUsage, inodes) : [])

    if(filterByTableIn) {
      if(filteredTables.indexOf(filterByTableIn) == -1) {
        filteredTables.push(filterByTableIn)
      }
    } else {
      if(filterByTableUsage) {
        if(filteredTables.indexOf(filterByTableUsage) == -1) {
          filteredTables.push(filterByTableUsage)
        }
      }      
    }

    let did: number = 0
    let tablesId: KeyValuePair[] = inodes.map(d =>  {return { key: d.name, value: "" + ++did }} )
    
    let linkid: number = 0
    let links: any[] = []
    let clusters: any[] = []

    inodes.forEach(d => {
      this.checkCluster(d.layer, d.name, clusters, tablesId)            
      let inlinks = d.in.map(l => { 
        this.checkCluster(l.layer, l.name, clusters, tablesId);
        return {"id": ""+ ++linkid,"source": tablesId.find(k => k.key == l.name)?.value, "target": tablesId.find(k => k.key == d.name)?.value}
      });
      links = links.concat(inlinks);
    })

    this.nodes = inodes
      .filter(d => filteredTables.length == 0 || filteredTables.indexOf(d.name) > -1)
      .map(d => new Node(
        tablesId.find(k => k.key == d.name)?.value || "notfoundid", d.name, 
        new NodeData("#a95963", d)
      )
    )

    this.links = links.filter(l => this.nodes.filter(n => n.id == l.source).length > 0 && this.nodes.filter(n => n.id == l.target).length > 0)
    this.clusters = clusters;
    this.eventService.emitTableListEvent(this.nodes.map(n => n.data?.dataset));
  }

  ngOnInit(): void {

  }

}
