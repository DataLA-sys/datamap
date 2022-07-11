import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TemplateFile } from '../classes/tempates';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  constructor(private http: HttpClient) { }

  loadTemplate(file: string) {
    let params = new HttpParams()
      .set('template', file);
      let opt: Object = {
        params,
        responseType: 'text' as 'json'
      }
    return this.http.get<string>("/loadTemplate", opt) // { params, responseType: undefined })
  }

  saveTemplate(template: TemplateFile): Observable<TemplateFile> {
    return this.http.post<TemplateFile>("/saveTemplate", template)
  }

  renderTemplate(fileName: string, templateParams?: string) {
    let params = new HttpParams()
      .set('fileName', fileName).set('params', templateParams || "{}")
    params.append("fileName", fileName)
    if(templateParams) {
      params.append("params", templateParams)
    }    
    return this.http.get("/renderTemplate", { params })
  }

  renderTemplateByBody(fileBody: string, fileName: string, templateParams?: string) {
    let params = new HttpParams()
      .set('templateName', fileName).set('params', templateParams || "{}")
    params.append("fileName", fileName)
    if(templateParams) {
      params.append("params", templateParams)
    }    
    return this.http.post<string>("/renderTemplateBody", fileBody, { params })
  }
}
