import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventService } from "../../services/events.service";
import 'material-icons/iconfont/material-icons.css';
import { Project } from 'src/app/classes/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit   {

  currentProject: string | undefined;
  projects: string[] = []
  virtualProjects: Project[] = []
  viewMode = "datasets"
  
  @Output()
  onDrawerToggle = new EventEmitter<boolean>();
  
  toggleDrawer() {
      this.onDrawerToggle.emit(true);
  };

  constructor(private eventService: EventService, private projectServie: ProjectService) { 
    eventService.nodeSelectedEvent$.subscribe(value => {
      this.eventService.emitGetGetSelectedNodeProjectEvent(value);
    })

    this.eventService.projectEvent$.subscribe(value => {
      this.currentProject = value.name;
      if(!this.projects.includes(value.name)) {
        this.projects.push(value.name);
        if(value.virtual === true) {
          let found = this.virtualProjects.find(v => v.name === value.name)
          if(!found) {
            this.virtualProjects.push(value)
            if(this.virtualProjects.length == 10) {
              this.virtualProjects.shift()
            }            
          } else {
            this.virtualProjects[this.virtualProjects.indexOf(found)] = value
          }          
        }
      }
      if(this.projects.length == 10) {
        this.projects.shift()
      }
    })

    this.eventService.clearAllEvent$.subscribe(value => {
      this.currentProject = undefined;
    })
  }

  ngOnInit(): void {
  }

  wideLayout() {
    this.eventService.emitWideLayoutEvent(true);
  }

  narrowLayout() {
    this.eventService.emitNarrowLayoutEvent(true);
  }  

  clear() {
    this.projects = []
    this.virtualProjects = [];
    this.eventService.emitClearAllEvent()
  }

  loadProject(project: string | undefined) {
    if(project) {
      let virtual = this.virtualProjects.find(v => v.name === project)
      if(virtual) {
        this.projectServie.buildDatasetVirtualProject(project)
      } else {
        this.eventService.emitProjectNameEvent(project)
      }      
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
