import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import configProjects from '../../assets/projects.json';
import projectsData from '../../assets/projects_data.json';
import { Project } from '../classes/project';
import { TemplateService } from './template.service';
import { environment } from 'src/environments/environment';
import { EventService } from './events.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService { 

  
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
    
    if(environment.singleHtml == true) {
      let projects: Project[] = configProjects.filter((p: Project) => p.enable !== false);
        projects.forEach(project => {
          if(project.dataExists == true) {
            this.getJSONData(project)
          }
        });        
      return of(projects)
    } else {
      return this.http.get<Project[]>("/projectFile")
    }
  }

  private getJSONData(project: Project) {
      project.data = projectsData.find((d: any) => d.name === project.name)?.data
  }

  private setData(project: Project, data: any) {
    project.data = data;
  }

  getProject(name: string): Observable<Project | undefined> {
    let p: Observable<Project | undefined> = this.getProjects()
      .pipe(map((projects: Project[]) => projects.find(project => project.name === name)));
    return p;
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
}
