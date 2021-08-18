import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../classes/project';
import { TemplateService } from './template.service';
import { environment } from 'src/environments/environment';
import { EventService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService { 

  currentProject?: Project = undefined;
  
  constructor(private http: HttpClient, private templateService: TemplateService, private eventService: EventService) { 
    eventService.projectNameEvent$.subscribe(value => {

      this.getProject(value).subscribe(p =>{
        if(p) {
          this.loadProject(p)
        }          
      })
    })
  }

  getProjects(): Observable<Project[]> {    
    return this.http.get<Project[]>("/projectFile")  
  }

  getProject(name: string): Observable<Project | undefined> {
    let p: Observable<Project | undefined> = this.getProjects()
      .pipe(map((projects: Project[]) => projects.find(project => project.name === name)));
    return p;
  }

  loadProject(project: Project, clearAll: boolean = true) {
    this.currentProject = project;
    if(clearAll === true) {
      this.eventService.emitClearAllEvent()
    }
    if(!project.data && !environment.singleHtml) {
      this.eventService.emitSpinnerEvent(true)
      this.templateService.renderTemplate(project.template, JSON.stringify(project.templateParams))
        .subscribe((s: any) => {
          project.data = s
          this.eventService.emitProjectEvent(project);
          this.eventService.emitSpinnerEvent(false)
        })        
    } else {
      this.eventService.emitProjectEvent(project);
    }
  }  
}
