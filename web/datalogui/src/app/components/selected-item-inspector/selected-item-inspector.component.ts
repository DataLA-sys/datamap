import { Component, OnInit } from '@angular/core';
import { Field, Named, TopologyNode } from 'src/app/classes/dataset';
import { EventService } from 'src/app/services/events.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SourceFilesService } from 'src/app/services/files.service';
import { ProjectService } from 'src/app/services/project.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DomainLinkComponentComponent } from '../domain-link-component/domain-link-component.component';

class Data {
  useInProjects: Named[] | undefined = undefined
}

@Component({
  selector: 'selected-item-inspector',
  templateUrl: './selected-item-inspector.component.html',
  styleUrls: ['./selected-item-inspector.component.css']
})
export class SelectedItemInspectorComponent implements OnInit {

  selected: any;
  selectedNodeProject: string | undefined;
  currentProject: string | undefined;
  data: Data = new Data();

  treeControl = new NestedTreeControl<Field>(node => node.sources);

  dataSource = new MatTreeNestedDataSource<Field>();

  constructor(private _bottomSheet: MatBottomSheet, private eventService: EventService, private sourceFilesService: SourceFilesService, 
    private projectService: ProjectService) {
    eventService.nodeSelectedEvent$.subscribe(value => {
      this.selected = value;
      this.getProjects();
      this.dataSource.data = this.selected?.data?.dataset?.fields;
      this.eventService.emitGetGetSelectedNodeProjectEvent(value);
    })
    eventService.returnSelectedNodeProjectEvent$.subscribe(value => {
      this.selectedNodeProject = value
    })
    this.eventService.clearAllEvent$.subscribe(value => {
      this.selected = undefined;
      this.data = new Data();
      this.selectedNodeProject = undefined;
    })
    this.eventService.projectEvent$.subscribe(value => {
      this.currentProject = value.name;
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
  filterByProject(project: string | undefined) {
    if(project) {
      this.eventService.emitFilterByProjectEvent(project);
    }    
  }  
  clearProjectFilter() {
    this.eventService.emitClearProjectFilterEvent();
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

  getSourceAsArray() {
    return this.selected?.data?.dataset?.sourceFile?.split(";");
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

  ngOnInit(): void {
  }

  selectTable(value: string|undefined) {
    this.eventService.emitTableSelectedEvent(value)
  }  

  getProjects() {
    return this.projectService.getAllDatasetProjects(this.selected?.data?.dataset?.name)
    .subscribe(      
      (projects: any) => {
        this.data.useInProjects = projects.docs
      }
    )
  }

  getAdditionalProject(): string | undefined {
    if(this.selected?.data?.dataset?.project && this.data.useInProjects) {
      if(this.selected?.data?.dataset?.project != "") {
        if(!this.data.useInProjects.find(p => p.name === this.selected.data.dataset.project)) {
          return this.selected?.data?.dataset?.project
        }
      }
    }
    return undefined
  }
  
  openBottomSheet(): void {
    this._bottomSheet.open(DomainLinkComponentComponent, {
      data: { currentProject: this.currentProject, currentItem:  this.selected?.data?.dataset?.name },
    });
  }
  
  loadDatasetVirtualProject(datasetName: string | undefined) {
    if(datasetName) {
      this.projectService.buildDatasetVirtualProject(datasetName)
    }
  }  

}
