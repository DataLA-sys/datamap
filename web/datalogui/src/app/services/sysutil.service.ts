import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProjectService } from './project.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class RunOperator {
  shCommand!: string;
  runid!: string;
  log: string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class SysutilService {
  
  commands: RunOperator[] = [];

  constructor(private http: HttpClient, private projectService: ProjectService) { }

  runShCommand(shCommand: string): Observable<string | undefined> {
    let params = new HttpParams().set("sh",  shCommand)
    params.append("sh",  shCommand)

    return this.http.get("/runit", { responseType: 'text', params })
    .pipe(map((runid)=>{
      let c = new RunOperator()
      c.shCommand=shCommand;
      c.runid=runid.toString();
      this.commands.push(c);
      return runid.toString();
    }))
  }

  refreshLog(command: RunOperator): Observable<any> {
    let params = new HttpParams().set("runid",  command.runid)
    params.append("runid",  command.runid)    
    return this.http.get("/sysout", { responseType: 'text', params })
  }  
}
