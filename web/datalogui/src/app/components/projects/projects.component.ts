import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/classes/project';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from 'src/app/components/projectDialog/projectDialog.component'
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects?: Project[]
  projectUnderMouse: string = ""
  projectInEdit: string = ""

  @Output()
  onDrawerToggle = new EventEmitter<boolean>();
  
  toggleDrawer() {
    this.onDrawerToggle.emit(true);
  }

  init() {
    this.projectService.getProjects().subscribe(value => {
      this.projects = value;
    })
  }
  
  constructor(private projectService: ProjectService, public dialog: MatDialog, private eventService: EventService) { 
    this.init()
  }

  createProject() {
    this.editProject(new Project())
  }

  deleteProject(project: Project) {
    if(confirm("Delete project?")) {
      this.projects = this.projects?.filter(p=>p.name != project.name)
      this.saveProjects()
    }
  }

  editProject(project: Project) {
    this.projectInEdit = project.name
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      data: {name: project.name, template: project.template, 
        templateParams: this.prettyJson(project.templateParams), domain: project.domain},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != "") {
        let p = this.projects?.find(p=>p.name==this.projectInEdit)
        if(p == undefined) {
          p = new Project()
          this.projects?.push(p)
        }
        p.name = result.name
        p.template = result.template
        p.templateParams = JSON.parse(result.templateParams)
        p.domain = result.domain
        this.saveProjects()
      }
    });
  }

  loadProject(project: Project, clearAll: boolean = true) {
    this.toggleDrawer();
    this.projectService.loadProject(project, clearAll);
  }

  object2str(value: any): string {
    return JSON.stringify(value)
  }

  ngOnInit(): void {
  }

  saveProjects() {
    if(this.projects != undefined) {
      this.eventService.emitClearAllEvent()
      this.projectService.saveProjects(this.projects).subscribe(() => console.log("d"))
    }
  }

  prettyJson(jsonText: string | undefined) {
    if(jsonText && jsonText != "{}" && JSON.stringify(jsonText) != "{}") {
      return JSON.stringify(jsonText, null, ' ')
    } else  { 
      return "{}"
    }
  }

}
