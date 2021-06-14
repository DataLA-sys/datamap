import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EventService } from 'src/app/services/events.service';
import { TemplateService } from 'src/app/services/template.service';

@Component({
  selector: 'tepmlate-editor',
  templateUrl: './tepmlate-editor.component.html',
  styleUrls: ['./tepmlate-editor.component.css']
})
export class TepmlateEditorComponent implements OnInit {
  fileName?: string;
  params?: string;
  fileContent: any;
  @ViewChild('templateEditor') editor: any;
  
  constructor(private teplateService: TemplateService, private eventService: EventService) { 
    eventService.projectEvent$.subscribe(value => {
      this.fileName = value.template
      this.params = JSON.stringify(value.templateParams)
      this.fileContent = JSON.stringify(value.data || {}, null, 4)
    })
  }

  ngOnInit(): void {
  }

  setData() {
    this.eventService.emitJoinDataEvent(JSON.parse(this.fileContent))
  }

  renderTemplate() {
    if(this.fileName) {
      this.teplateService.renderTemplate(this.fileName, this.params)
      .subscribe(s => {
        this.fileContent = JSON.stringify(s, null, 4)
        this.eventService.emitJoinDataEvent(s)
      }, error => {        
        console.log("Error while parse template!")
        console.log(error)
        this.fileContent = error.error.text;
      })
    }
  }

}
