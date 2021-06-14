import { Component, OnInit, ViewChild } from '@angular/core';
import { TopologyComponent } from '../topology/topology.component'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild(TopologyComponent)
  private topologyComponent!: TopologyComponent;

  constructor() { }

  zoomToFit() {
    this.topologyComponent.zoomToFit();
  }

  ngOnInit(): void {
  }

}
