import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/app/services/events.service';
import { TopologyComponent } from '../topology/topology.component';
import { ContentFile } from 'src/app/classes/files'
import 'brace'
import 'brace/mode/sql'
import 'brace/theme/eclipse'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild(TopologyComponent)
  private topologyComponent!: TopologyComponent;

  showSpinner: boolean = false;
  leftArea = "25%"
  mainArea = "75%"

  openFiles: ContentFile[] = []
  selectedTabIndex = 0;

  constructor(private eventService: EventService, public cd: ChangeDetectorRef) {
    eventService.spinnerEvent$.subscribe(value => {
      this.showSpinner = value;
      cd.detectChanges();
    })
    eventService.wideLayoutEvent$.subscribe(_ => {
      this.leftArea = "50%";
      this.mainArea = "50%"
    })
    eventService.narrowLayoutEvent$.subscribe(_ => {
      this.leftArea = "25%";
      this.mainArea = "75%"
    }) 
    eventService.openSourceFileEvent$.subscribe(value => {
      this.openFiles = this.openFiles.filter(f => f.name != value.name)
      this.openFiles.push(value)
      this.selectedTabIndex = 4 + this.openFiles.length - 1
    })
    eventService.clearAllEvent$.subscribe(_ => this.openFiles = [])
  }

  zoomToFit() {
    this.topologyComponent.zoomToFit();
  }

  ngOnInit(): void {
  }

  deleteFile(fileName: string) {
    this.openFiles.splice(this.openFiles.indexOf(this.openFiles.filter(f=>f.name===fileName)[0]), 1)
  }

}
