import { Component, OnInit } from '@angular/core';
import { EventService } from "../../services/events.service";
import { Node } from "../../classes/node";

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {

  selected: Node | undefined;
  selectedNodeProjects: (string | undefined)[] | undefined
  projects: string[] = []
  selectedProject: string = "";

  constructor(private eventService: EventService) { 
    eventService.nodeSelectedEvent$.subscribe(value => {
      this.selected = value;
      this.eventService.emitGetGetSelectedNodeProjectEvent(value);
    })
    eventService.returnSelectedNodeProjectEvent$.subscribe(value => this.selectedNodeProjects = value)
    eventService.receiveProjectstEvent$.subscribe(value => this.projects = value)
  }

  ngOnInit(): void {
  }

  zoomToFit() {
    this.eventService.emitZoomToFitEvent();
  }

  projectSelected(project: string) {
    this.eventService.emitProjectSelectedEvent(project)
  }

  clear() {
    this.eventService.emitClearAllEvent()
  }

}
