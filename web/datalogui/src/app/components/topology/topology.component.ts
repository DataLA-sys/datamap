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
  y: number = 1000;
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
    eventService.filterByProjectEvent$.subscribe(value => {
      if(this.data) {
        this.getData(this.data, undefined, undefined, value)
      }
    })        
    eventService.clearTableFilterEvent$.subscribe(value => {
      if(this.data) {
        this.getData(this.data)
      }
    })
    eventService.clearProjectFilterEvent$.subscribe(value => {
      if(this.data) {
        this.getData(this.data)
      }
    })
  }

  viewModeChanged() {
    if(this.data) {
      this.getData(this.data)
    }
  }  

  setViewMode(value: string) {
    this.viewMode = value
    if(this.data) {
      this.getData(this.data)
    }
  }

  zoomToFit() {
    this.zoomToFit$.next(true)
  }
  
  centerGraph() {
    this.center$.next(true);
  }

  clustersOnOff() {
    this.showClusters = !this.showClusters
  }

  checkCluster(layer: string, nodeName: string, clusters: any[], tablesId: KeyValuePair[]) {
    let cluster: any = clusters.find((c: any) => c.label == layer)
    if(!cluster) {
      cluster = {id: layer, label: layer, childNodeIds: new Set()}
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
    cluster.childNodeIds.add(tablesId.find(k => k.key == nodeName)?.value)
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
    this.projectService.normaizeTree(inodes, data.datasets || [], 0);
    inodes.forEach(d => this.projectService.normalizeDataset(inodes, d));    
    if(project !== "") {
      let io = this.projectService.getProjectsInputOutput(inodes, project)
      this.inOut.push(io)
      this.projectService.normaizeTree(this.inOut, this.inOut, 0);
      this.inOut.forEach(d => this.projectService.normalizeDataset(this.inOut, d));
    }
  }

  getData(data: Topology, filterByTableIn: string | undefined = undefined, filterByTableUsage: string | undefined = undefined, filterByProject: string | undefined = undefined) {
    this.eventService.emitSpinnerEvent(true)
    this.cd.detectChanges();
    this.data = data;
    this.selected = undefined;
    
    let inodes: TopologyNode[] = this.getNodes();
    this.projectService.normaizeTree(inodes, this.getNodes(), 0);
    inodes.forEach(d => this.projectService.normalizeDataset(inodes, d));
    inodes = inodes.filter(d => (filterByProject == undefined) || d.project == filterByProject)
    
    if(this.currentProject !== "") {
      this.projectService.saveProjectStat({"name": this.currentProject, "datasets": inodes}, this.currentProject, "normalizedTree")
    }

    let filteredTables = filterByTableIn ? this.projectService.getInDatasets(filterByTableIn, inodes) : (filterByTableUsage ? this.projectService.getUsageDatasets(filterByTableUsage, inodes) : [])

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
      let inlinks = d.in.map(l => {
        return {"id": ""+ ++linkid,"source": tablesId.find(k => k.key == l.name)?.value, "target": tablesId.find(k => k.key == d.name)?.value}
      });
      links = links.concat(inlinks);
    })

    this.nodes = inodes
      .filter(d => filteredTables.length == 0 || filteredTables.indexOf(d.name) > -1)
      .map(d => {
        this.checkCluster(d.layer, d.name, clusters, tablesId)
        d.in.forEach(l => this.checkCluster(l.layer, l.name, clusters, tablesId))
        return new Node(
          tablesId.find(k => k.key == d.name)?.value || "notfoundid", d.name, 
          new NodeData("#a95963", d)
        )
      }
    )

    this.links = links.filter(l => this.nodes.filter(n => n.id == l.source).length > 0 && this.nodes.filter(n => n.id == l.target).length > 0)
    this.clusters = clusters.filter(c => this.nodes.find(n=>n.data?.dataset.layer === c.label));
    this.eventService.emitTableListEvent(this.nodes.map(n => n.data?.dataset));
    this.eventService.emitSpinnerEvent(false)
  }

  ngOnInit(): void {

  }

}
