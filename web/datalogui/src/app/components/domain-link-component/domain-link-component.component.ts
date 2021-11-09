import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Project } from 'src/app/classes/project';
import { EventService } from 'src/app/services/events.service';
import { ProjectService } from 'src/app/services/project.service';
import { TemplateService } from 'src/app/services/template.service';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'domain-link-component',
  templateUrl: './domain-link-component.component.html',
  styleUrls: ['./domain-link-component.component.css']
})
export class DomainLinkComponentComponent implements OnInit {

  _currentProject?: string = "";
  _currentItem?: string = "";
  links: any = undefined;

  @Input() set currentProject(value: string | undefined) {    
    this._currentProject = value;
    this.inputChaged()
  }  
  get currentProject(): string | undefined {
     return this._currentProject;
  }

  @Input() set currentItem(value: string) {    
    this._currentItem = value;
  }
  get currentItem(): string {
     return this._currentItem || ""; 
  }  

  domainProjects?: Project[] = undefined;
  selectedDomainProject?: Project = undefined;
  selectedDomainProjectName: string = "None";
  selectedDomainProjectItemName: string = "None";
  selectedLinkType: string = "None";

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {currentProject: string, currentItem: string}, 
    private _bottomSheetRef: MatBottomSheetRef<DomainLinkComponentComponent>, 
    private projectService: ProjectService, private templateService: TemplateService, 
    private eventService: EventService) { 
      
    this._currentProject = data.currentProject;
    this._currentItem = data.currentItem;

    this.inputChaged();
    
    projectService.getProjects().subscribe(projects =>this.domainProjects = projects.filter(p=>p.domain == true))
  }

  selectProject(project: Project)  {
    this.selectedDomainProject = project;
    this.projectService.getProjectData(this.selectedDomainProject).subscribe(()=>{});
  }

  projectChanged(event: any) {
    this.domainProjects?.filter(p => p.name == event.value)
      .forEach(p => this.selectProject(p));
  }

  addLink() {
    if(this._currentProject) {
      let link = {linkType: this.selectedLinkType, dataset: this._currentItem, domainProject: this.selectedDomainProject?.name, domainItem: this.selectedDomainProjectItemName}
      if(!this.links) {
        this.links = {"name": this._currentProject, "domainLinks": []}
      }
      this.links.domainLinks.push(link)
      this.projectService.saveProjectStat(this.links, this._currentProject, "domainLinks")
    }
  }

  deleteLink(link: any) {
    if(this._currentProject) {
      let idx = this.links?.domainLinks?.indexOf(link)
      if(idx !==  -1) {
        this.links.domainLinks.splice(idx, 1)
        let projectStat = this.links
        this.projectService.saveProjectStat(projectStat, this._currentProject, "domainLinks")
      }
    }
  }

  ngOnInit(): void {
  }

  inputChaged() {
    this.links = undefined;
    if(this._currentProject) {
      this.projectService.loadProjectStat(this._currentProject, "domainLinks")
      .subscribe(
        res => this.links = (res as any).error ? undefined : res,
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
      );      
    }
  }

}
