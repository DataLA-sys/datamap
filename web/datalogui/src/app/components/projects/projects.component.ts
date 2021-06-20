import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/classes/project';
import { EventService } from 'src/app/services/events.service';
import { ProjectService } from 'src/app/services/project.service';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects?: Project[]
  
  constructor(private projectService: ProjectService, private templateService: TemplateService, private eventService: EventService) { 
    projectService.getProjects().subscribe(value => {
      this.projects = value;
    })
  }

  loadProject(project: Project, clearAll: boolean = true) {
    this.eventService.emitSpinnerEvent(true);
    this.projectService.loadProject(project, clearAll);
    this.eventService.emitSpinnerEvent(false);
  }

  object2str(value: any): string {
    return JSON.stringify(value)
  }

  ngOnInit(): void {
  }

}
