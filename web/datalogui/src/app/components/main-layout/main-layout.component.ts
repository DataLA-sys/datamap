import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/app/services/events.service';
import { TopologyComponent } from '../topology/topology.component'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild(TopologyComponent)
  private topologyComponent!: TopologyComponent;

  showSpinner: boolean = false;

  constructor(private eventService: EventService, public cd: ChangeDetectorRef) {
    eventService.spinnerEvent$.subscribe(value => {
      this.showSpinner = value;
      cd.detectChanges();
    })
  }

  zoomToFit() {
    this.topologyComponent.zoomToFit();
  }

  ngOnInit(): void {
  }

}
