import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class SourceFilesService {
  
  constructor(private http: HttpClient, private projectService: ProjectService) { }
  private codec = new HttpUrlEncodingCodec()
  private getFolder(): string {
    if(this.projectService.currentProject?.templateParams) {
      const params: any = this.projectService.currentProject?.templateParams
      return params.folder + "/"
    }    
    return ""
  }

  getSourceFileContent(fileName: string) {
    let params = new HttpParams().set('fileName', encodeURIComponent(fileName))   
    let opt: Object = {
      params,
      responseType: 'text' as 'json'
    }
    return this.http.get<string>("/sourceFileContent", opt)
  }
}
