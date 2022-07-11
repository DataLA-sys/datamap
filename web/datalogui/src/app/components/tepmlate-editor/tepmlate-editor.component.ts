import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TemplateFile } from 'src/app/classes/tempates';
import { EventService } from 'src/app/services/events.service';
import { TemplateService } from 'src/app/services/template.service';
import 'brace'
import 'brace/mode/json'
import 'brace/mode/scala'

@Component({
  selector: 'tepmlate-editor',
  templateUrl: './tepmlate-editor.component.html',
  styleUrls: ['./tepmlate-editor.component.css']
})
export class TepmlateEditorComponent implements OnInit, AfterViewInit {
  fileName?: string;
  fileBody: any;
  params?: string;
  rendered: any;
  
  constructor(private teplateService: TemplateService, private eventService: EventService) { 
    eventService.projectEvent$.subscribe(value => {
      this.fileName = value.template
      this.params = JSON.stringify(value.templateParams)
      this.rendered = JSON.stringify(value.data || {}, null, 4)
    })
    eventService.loadProjectEvent$.subscribe(value => {
      this.fileName = value.template
      this.params = JSON.stringify(value.templateParams)
      this.teplateService.loadTemplate(this.fileName).subscribe(s => {
        this.fileBody = s
      })
    })
  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    
  }

  setData() {
    this.eventService.emitClearAllEvent()
    this.eventService.emitJoinDataEvent(JSON.parse(this.rendered))
  }

  renderTemplate() {
    if(this.fileName) {
      this.eventService.emitSpinnerEvent(true);
      this.eventService.emitClearAllEvent()
      this.teplateService.renderTemplate(this.fileName, this.params)
        .subscribe(s => {
          this.rendered = JSON.stringify(s, null, 4)          
          this.eventService.emitJoinDataEvent(s)
          this.eventService.emitSpinnerEvent(false);
        }, error => {        
          console.log("Error while parse template!")
          console.log(error)
          this.rendered = error.error;
          this.eventService.emitSpinnerEvent(false);
        })
    }
  }

  renderTemplateByBody() {
    if(this.fileName && this.fileBody) {
      this.eventService.emitSpinnerEvent(true);
      this.eventService.emitClearAllEvent()
      this.teplateService.renderTemplateByBody(this.fileBody, this.fileName, this.params)
        .subscribe(s => {
          this.rendered = JSON.stringify(s, null, 4)          
          this.eventService.emitJoinDataEvent(s)
          this.eventService.emitSpinnerEvent(false);
        }, error => {        
          console.log("Error while parse template!")
          console.log(error)
          this.rendered = error.error;
          this.eventService.emitSpinnerEvent(false);
        })
    }
  }

  saveTemplate() {
    if(this.fileName && this.fileBody) {
      this.eventService.emitSpinnerEvent(true);
      let t = new TemplateFile()
      t.fileName = this.fileName
      t.templateContent = this.fileBody
      this.teplateService.saveTemplate(t)
        .subscribe(s => {         
          this.eventService.emitSpinnerEvent(false);
        }, error => {
          console.log("Error while save template!")
          console.log(error)
          this.rendered = error.error;
          this.eventService.emitSpinnerEvent(false);
        })
    }
  }
}
