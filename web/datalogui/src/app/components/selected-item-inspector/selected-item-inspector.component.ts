import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/events.service';
import { Node } from "../../classes/node";

@Component({
  selector: 'selected-item-inspector',
  templateUrl: './selected-item-inspector.component.html',
  styleUrls: ['./selected-item-inspector.component.css']
})
export class SelectedItemInspectorComponent implements OnInit {

  selected: Node | undefined;
  selectedNodeProject: string | undefined;  

  constructor(private eventService: EventService) {
    eventService.nodeSelectedEvent$.subscribe(value => {
      this.selected = value;
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

  loadProject(project: string | undefined) {
    if(project) {
      this.eventService.emitProjectNameEvent(project)
    }    
  }  

  ngOnInit(): void {
  }

}
