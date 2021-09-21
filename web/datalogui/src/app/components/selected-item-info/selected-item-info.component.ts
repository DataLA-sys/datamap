import { Component, OnInit } from '@angular/core';
import { Field, TopologyNode } from 'src/app/classes/dataset';
import { EventService } from 'src/app/services/events.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SourceFilesService } from 'src/app/services/files.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'selected-item-info',
  templateUrl: './selected-item-info.component.html',
  styleUrls: ['./selected-item-info.component.css']
})
export class SelectedItemInfoComponent implements OnInit {

  selected: any;
  data: any = {};

  selectedNodeProject: string | undefined;
  currentProject: string | undefined;  
  currentProjectStat: TopologyNode | undefined;

  treeControl = new NestedTreeControl<Field>(node => node.sources);

  dataSource = new MatTreeNestedDataSource<Field>();

  constructor(private eventService: EventService, private sourceFilesService: SourceFilesService, 
    private projectService: ProjectService) {
    eventService.nodeSelectedEvent$.subscribe(value => {
      this.selected = value;
      this.dataSource.data = this.selected?.data?.dataset?.fields;
      this.eventService.emitGetGetSelectedNodeProjectEvent(value);
    })
    eventService.returnSelectedNodeProjectEvent$.subscribe(value => {
      this.selectedNodeProject = value
    })
    this.eventService.clearAllEvent$.subscribe(value => {
      this.selected = undefined;
      this.selectedNodeProject = undefined;
      this.data = {};
    })
    this.eventService.projectEvent$.subscribe(value => {
      this.currentProject = value.name;
    })
    this.eventService.projectStatEvent$.subscribe(value => {
      this.currentProjectStat = value || [];      
    })    
  }

  hasChild = (_: number, node: Field) => !!node.sources && node.sources.length > 0;

  loadProject(project: string | undefined) {
    if(project) {
      this.eventService.emitProjectNameEvent(project)
    }    
  }

  filterByTableIn(tableName: string | undefined) {
    if(tableName) {
      this.eventService.emitFilterByTableInEvent(tableName);
    }    
  }
  filterByTableUsage(tableName: string | undefined) {
    if(tableName) {
      this.eventService.emitFilterByTableUsageEvent(tableName);
    }    
  }

  clearTableFilter() {
    this.eventService.emitClearTableFilterEvent();
  }

  getType() {
      return this.selected?.data?.dataset?.datasetType;
  }

  getSource() {
    return this.selected?.data?.dataset?.sourceFile;    
  }

  getAction() {
    return this.selected?.data?.dataset?.action;    
  }

  getSourceFile() {
    this.sourceFilesService.getSourceFileContent(this.selected.data?.dataset?.sourceFile)    
      .subscribe(
        fileContent => {
          alert(fileContent)
        },
        error => alert(error.message)
      )
  }

  getProjects() {
    return this.projectService.getAllDatasetProjects(this.selected?.data?.dataset?.name)
    .subscribe(      
      (projects: any) => {
        this.data.useInProjects = projects.docs
      }
    )
  }  

  ngOnInit(): void {
  }

  selectTable(value: string|undefined) {
    this.eventService.emitTableSelectedEvent(value)
  }  

}
