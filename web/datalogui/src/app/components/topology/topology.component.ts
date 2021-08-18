import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { EventService } from "../../services/events.service";
import { ProjectFileDir, Topology } from "../../classes/topology";
import { Node, NodeData } from "../../classes/node";
import { Dataset, TopologyNode, Named } from '../../classes/dataset';
import { Subject } from 'rxjs';

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
  showActions: boolean = false;

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

  constructor(
    private eventService: EventService, 
    public cd: ChangeDetectorRef) { 
    eventService.zoomToFitEvent$.subscribe(value => this.zoomToFit());
    eventService.centerTopologyEvent$.subscribe(value => this.center$.next(true));

    eventService.getSelectedNodeProjectEvent$.subscribe(node => 
      eventService.emitReturnSelectedNodeProjectEvent(this.getNodeProject(node)));

    eventService.clearAllEvent$.subscribe(value => this.clear())
    eventService.joinDataEvent$.subscribe(value => this.addData(value))
    eventService.projectEvent$.subscribe(value => this.addData(value.data || new Topology()))
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
    eventService.clearTableFilterEvent$.subscribe(value => {
      if(this.data) {
        this.getData(this.data)
      }
    })
    eventService.toggleClustersEvent$.subscribe(value => {
      this.showClusters = !this.showClusters
    })
    eventService.toggleActionsEvent$.subscribe(value => {
      this.showActions = !this.showActions
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
    let t = new Topology()
    t.datasets = []
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

  normalizeDataset(normalised: Dataset[], dataset: Dataset) {
    dataset.out.forEach(out => {
      let mainDs = normalised.find(d => d.name == out.name);
      if(mainDs) {
        if(!mainDs.in.find(i => i.name == dataset.name)) {
          mainDs.in.push(dataset);
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
      let found: Dataset | undefined = normalised.find(n => n.name == dd.name);      
      if(found == undefined) {
        normalised.push(dd);
        this.normaizeTree(normalised, dd.in.concat(dd.out), level + 1);
      } else {
        let prev = found.in.length + found.out.length
        found.in = this.concatNamed(found.in, dd.in);
        found.out = this.concatNamed(found.out, dd.out);
        if(dd instanceof Dataset) {
          found.fields = this.concatNamed(found.fields || [], (dd as Dataset).fields || []);
        }        
        if((prev != found.in.length + found.out.length) || level === 0) {
          this.normaizeTree(normalised, dd.in.concat(dd.out), level + 1);
        }          
      }            
    })
  }

  getData(data: Topology, filterByTableIn: string | undefined = undefined) {
    this.data = data;
    this.selected = undefined;
    
    let inodes: TopologyNode[] = this.showActions ? data.actions : data.datasets;
    this.normaizeTree(inodes, this.showActions ? data.actions : data.datasets, 0);
    inodes.forEach(d => this.normalizeDataset(inodes, d));

    let filteredTables = filterByTableIn ? this.getInDatasets(filterByTableIn, inodes) : []
    if(filterByTableIn) {
      if(filteredTables.indexOf(filterByTableIn) == -1) {
        filteredTables.push(filterByTableIn)
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
