import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { EventService } from "../../services/events.service";
import { ProjectFileDir, Topology } from "../../classes/topology";
import { Node, NodeData } from "../../classes/node";
import { Dataset } from '../../classes/dataset';
import { Subject } from 'rxjs';
import { jsPDF } from 'jspdf'
import 'svg2pdf.js'
import { Svg2pdfOptions } from 'svg2pdf.js';

//var saveSvgAsPng = import("save-svg-as-png")

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

  @ViewChild('editor') editor: any;
  text: string = "<test><order>PO001</order>\r\n<messgeID>1124</messageID></test>";
  x: number = 1400;
  y: number = 800;
  dim: [number, number] = [this.x, this.y];
  
  setEditorContent(event: any) {
    // console.log(event, typeof event);
    console.log("");
  }

  saveGraph() {
    const doc = new jsPDF()

    const svgatt = document.getElementsByTagName("svg")
    const o: Svg2pdfOptions = {x: 0, y: 0, width: 6500, height: 5500, loadExternalStyleSheets: true}

    const element = svgatt[0]
    if(element) {
      doc.svg(element, o)
        .then(() => {
          doc.save('myPDF.pdf')
        })
    }
  }

  clusters: any[] = []
  nodes: Node[] = []
  links: any[] = []
  projects: string[] = []
  selectedProject: string = ""
  selectedTable: string = ""
  error: any;
  selected: Node | undefined;
  data: Topology | undefined;
  showMiniMap: boolean = false;  
  codeValue: any = "<a>aa</a>"

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

    eventService.saveTopologyEvent$.subscribe(value => this.saveGraph());
    eventService.getSelectedNodeProjectEvent$.subscribe(node => 
      eventService.emitReturnSelectedNodeProjectEvent(this.getNodeProject(node)));
    
    eventService.projectSelectedEvent$.subscribe(value => {
      if(this.data) {
        this.getData(this.data, value)          
      }
    })

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
    this.getData(t)
  }

  getData(data: Topology, project: any = null) {
    this.data = data;
    this.selected = undefined;
    console.log(data);
    
    let inodes: Dataset[] = []
    inodes = inodes.concat(data.datasets)
    data.datasets.forEach(dd => {
      dd.in.concat(dd.out).forEach(i => {
        if(inodes.filter(n => n.name == i.name).length == 0) {
          inodes.push(i);
        }
      })
    })
    let p: string[] = inodes.map(n=>n.project ? n.project : "Empty")
    this.projects = ["", ...new Set(p)];
    this.eventService.emitReceiveProjectsEvent(this.projects)
    this.selectedProject = this.projects.length > 0 ? this.projects[0] : ""

    let did: number = 0
    let tablesId: KeyValuePair[] = inodes.map(d =>  {return { key: d.name, value: "" + ++did }} )
    
    let linkid: number = 0
    let links: any[] = []
    let clusters: any[] = []
    data.datasets.forEach(d => {
      if(project == null || project == "" || project == d.project) {
        this.checkCluster(d.layer, d.name, clusters, tablesId)
      }
      
      let inlinks = d.in.map(l => { 
        if(project == null || project == "" || project == l.project) {
          this.checkCluster(l.layer, l.name, clusters, tablesId);
        }
        return {"id": ""+ ++linkid,"source": tablesId.find(k => k.key == l.name)?.value, "target": tablesId.find(k => k.key == d.name)?.value}
      });
      links = links.concat(inlinks);
      let outlinks = d.out.map(l => { 
        if(project == null || project == "" || project == l.project) {
          this.checkCluster(l.layer, l.name, clusters, tablesId);
        }
        return {"id": ""+ ++linkid, "source": tablesId.find(k => k.key == d.name)?.value, "target": tablesId.find(k => k.key == l.name)?.value}
      });
      links = links.concat(outlinks);      
    })

    this.nodes = inodes.filter(d => {
      return (project == null || project == "") 
      || d.project == project 
      || data.datasets.find(fd => fd.name == d.name && fd.project == project) != null
      || (data.datasets.find(f => f.in.filter(td => td.name == d.name && td.project == project).length > 0) != null) 
      || (data.datasets.find(f => f.out.filter(td => td.name == d.name && td.project == project).length > 0) != null)
      || this.checkIfLinkInProject(d, links, data, tablesId, project);
    })
      .map(d => new Node(
        tablesId.find(k => k.key == d.name)?.value || "notfoundid", d.name, 
        new NodeData("#a95963", d)
      ))
    this.links = links.filter(l => this.nodes.filter(n => n.id == l.source || n.id == l.target).length > 0)
    this.clusters = clusters;
    this.eventService.emitTableListEvent(this.getTables())
  }

  checkIfLinkInProject(dataset: Dataset, links: any[], data: Topology, tablesId: any[], project: string) {
    let did = tablesId.find(t => t.key == dataset.name).value
    let dlinks = links.filter(l => l.source == did || l.target == did)
    return dlinks.filter(link => {
      let sname = tablesId.find(k => k.value == link.source)?.key;
      let tname = tablesId.find(k => k.value == link.target)?.key;
      let s = data.datasets.filter(d => d.name == sname && d.project == project);
      let t = data.datasets.filter(d => d.name == tname && d.project == project);
      return s.length > 0 || t.length > 0;
    }).length > 0

  }

  ngOnInit(): void {

  }

}
