import { Component, OnInit } from '@angular/core';
import { EventService } from "../../services/events.service";
import 'material-icons/iconfont/material-icons.css';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {

  currentProject: string | undefined;
  projects: string[] = []

  constructor(private eventService: EventService) { 
    eventService.nodeSelectedEvent$.subscribe(value => {
      this.eventService.emitGetGetSelectedNodeProjectEvent(value);
    })

    this.eventService.projectEvent$.subscribe(value => {
      this.currentProject = value.name;
      if(!this.projects.includes(value.name)) {
        this.projects.push(value.name);
      }
      if(this.projects.length == 6) {
        this.projects.shift()
      }
    })

    this.eventService.clearAllEvent$.subscribe(value => {
      this.currentProject = undefined;
    })
  }

  ngOnInit(): void {
  }
  zoomToFit() {
    this.eventService.emitZoomToFitEvent();
  }

  centerGraph() {
    this.eventService.emitCenterTopologyEvent();
  }

  clustersOnOff() {
    this.eventService.emitToggleClustersEvent();
  }  

  actionsOnOff() {
    this.eventService.emitToggleActionsEvent();
  }

  clear() {
    this.projects = []
    this.eventService.emitClearAllEvent()
  }

  loadProject(project: string | undefined) {
    if(project) {
      this.eventService.emitProjectNameEvent(project)
    }    
  }

  nextProject(): string | undefined {
    if(this.currentProject) {
      let selected = this.projects.indexOf(this.currentProject)
      if(selected + 1 < this.projects.length) {
        return this.projects[selected + 1];
      }
    }
    return undefined;
  }

  prevProject(): string | undefined {
    if(this.currentProject) {
      let selected = this.projects.indexOf(this.currentProject)
      if(selected > 0) {
        return this.projects[selected - 1];
      }
    }
    return undefined;
  }  
}
