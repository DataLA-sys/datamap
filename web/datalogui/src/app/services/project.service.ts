import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import configProjects from '../../assets/projects.json';
import projectsData from '../../assets/projects_data.json';
import { Project } from '../classes/project';
import { TemplateService } from './template.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService { 
  constructor(private http: HttpClient, private templateService: TemplateService) { }
  getProjects(): Observable<Project[]> {
   
    let projects: Project[] = configProjects.filter((p: Project) => p.enable !== false);
    projects.forEach(project => {
      if(project.dataExists == true) {
        this.getJSONData(project)
      } else {
        this.templateService
        .renderTemplate(project.template, JSON.stringify(project.templateParams))
          .subscribe(projectData => {
            this.setData(project, projectData)
          })          
      }
    });
      
    return of(projects)
  }

  private getJSONData(project: Project) {
      project.data = projectsData.find((d: any) => d.name === project.name)?.data
  }

  private setData(project: Project, data: any) {
    project.data = data;
  }
}
