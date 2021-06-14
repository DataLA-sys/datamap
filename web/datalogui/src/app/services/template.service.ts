import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TemplateFile } from '../classes/tempates';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  constructor(private http: HttpClient) { }

  saveTemplate(template: TemplateFile): Observable<TemplateFile> {
    return this.http.post<TemplateFile>("/template", template)
  }

  renderTemplate(fileName: string, templateParams?: string) {
    let params = new HttpParams()
      .set('fileName', fileName).set('params', templateParams || "{}")
    params.append("fileName", fileName)    
    if(templateParams) {
      //params.set('params', templateParams)
      params.append("params", templateParams)
    }    
    return this.http.get("/renderTemplate", { params })
  }
}
