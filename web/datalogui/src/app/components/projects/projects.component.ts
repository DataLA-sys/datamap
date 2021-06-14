import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/classes/project';
import { EventService } from 'src/app/services/events.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects?: Project[]
  constructor(private projectService: ProjectService, private eventService: EventService) { 
    projectService.getProjects().subscribe(value => {
      this.projects = value;
    })
  }

  loadProject(project: Project) {
    this.eventService.emitClearAllEvent()
    this.eventService.emitProjectEvent(project);
  }

  ngOnInit(): void {
  }

}
