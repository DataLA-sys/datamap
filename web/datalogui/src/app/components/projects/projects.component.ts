import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/classes/project';
import { EventService } from 'src/app/services/events.service';
import { ProjectService } from 'src/app/services/project.service';
import { TemplateService } from 'src/app/services/template.service';
import { environment } from 'src/environments/environment';

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
    if(clearAll === true) {
      this.eventService.emitClearAllEvent()
    }    
    if(!project.data && !environment.singleHtml) {
      this.templateService.renderTemplate(project.template, JSON.stringify(project.templateParams))
        .subscribe((s: any) => {
          project.data = s
          this.eventService.emitProjectEvent(project);
        })        
    } else {
      this.eventService.emitProjectEvent(project);
    }    
  }

  object2str(value: any): string {
    return JSON.stringify(value)
  }

  ngOnInit(): void {
  }

}
