import { Component, OnInit } from '@angular/core';
import { Field } from 'src/app/classes/dataset';
import { EventService } from 'src/app/services/events.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SourceFilesService } from 'src/app/services/files.service';

@Component({
  selector: 'selected-item-inspector',
  templateUrl: './selected-item-inspector.component.html',
  styleUrls: ['./selected-item-inspector.component.css']
})
export class SelectedItemInspectorComponent implements OnInit {

  selected: any;
  selectedNodeProject: string | undefined;   

  treeControl = new NestedTreeControl<Field>(node => node.sources);

  dataSource = new MatTreeNestedDataSource<Field>();

  constructor(private eventService: EventService, private sourceFilesService: SourceFilesService) {
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

  ngOnInit(): void {
  }

}
