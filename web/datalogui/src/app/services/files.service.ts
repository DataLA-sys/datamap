import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class SourceFilesService {
  
  constructor(private http: HttpClient, private projectService: ProjectService) { }

  private getFolder(): string {
    if(this.projectService.currentProject?.templateParams) {
      const params: any = this.projectService.currentProject?.templateParams
      return params.folder + "/"
    }    
    return ""
  }

  getSourceFileContent(fileName: string) {
    let params = new HttpParams()
      .set('fileName', this.getFolder() + fileName)
    params.append("fileName",  this.getFolder() + fileName)    
    return this.http.get("/sourceFileContent", { params })
  }
}
