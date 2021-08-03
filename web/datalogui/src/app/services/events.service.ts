import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dataset } from '../classes/dataset';
import { Node, NodeData } from "../classes/node";
import { Project } from '../classes/project';

@Injectable({
  providedIn: 'root'
})
export class EventService { 
  constructor() { }

  private clearAllEventSource = new Subject<boolean>();
  clearAllEvent$ = this.clearAllEventSource.asObservable();
  emitClearAllEvent() {
    this.clearAllEventSource.next(true);
  }

  private zoomToFitEventSource = new Subject<boolean>();
  zoomToFitEvent$ = this.zoomToFitEventSource.asObservable();
  emitZoomToFitEvent() {
    this.zoomToFitEventSource.next(true);
  }  

  private nodeSelectedEventSource = new Subject<Node>();
  nodeSelectedEvent$ = this.nodeSelectedEventSource.asObservable();
  emitNodeSelectedEvent(node: Node) {
    this.nodeSelectedEventSource.next(node);
  }

  private getSelectedNodeProjectEventSource = new Subject<Node>();
  getSelectedNodeProjectEvent$ = this.getSelectedNodeProjectEventSource.asObservable();
  emitGetGetSelectedNodeProjectEvent(node: Node) {
    this.getSelectedNodeProjectEventSource.next(node);
  }

  private returnSelectedNodeProjectEventSource = new Subject<string | undefined>();
  returnSelectedNodeProjectEvent$ = this.returnSelectedNodeProjectEventSource.asObservable();
  emitReturnSelectedNodeProjectEvent(projects: string | undefined) {
    this.returnSelectedNodeProjectEventSource.next(projects);
  }

  private joinDataEventSource = new Subject<any>();
  joinDataEvent$ = this.joinDataEventSource.asObservable();
  emitJoinDataEvent(data: any) {
    this.joinDataEventSource.next(data);
  }

  private projectEventSource = new Subject<Project>();
  projectEvent$ = this.projectEventSource.asObservable();
  emitProjectEvent(data: any) {
    this.projectEventSource.next(data);
  }

  private projectNameEventSource = new Subject<string>();
  projectNameEvent$ = this.projectNameEventSource.asObservable();
  emitProjectNameEvent(data: any) {
    this.projectNameEventSource.next(data);
  }  

  private tableListEventSource = new Subject<any[]>();
  tableListEvent$ = this.tableListEventSource.asObservable();
  emitTableListEvent(list: any[]) {
    this.tableListEventSource.next(list);
  }

  private tableSelectedEventSource = new Subject<string|undefined>();
  tableSelectedEvent$ = this.tableSelectedEventSource.asObservable();
  emitTableSelectedEvent(value: string|undefined) {
    this.tableSelectedEventSource.next(value);
  }  

  private spinnerEventSource = new Subject<boolean>();
  spinnerEvent$ = this.spinnerEventSource.asObservable();
  emitSpinnerEvent(value: boolean) {
    this.spinnerEventSource.next(value);
  }

  private wideLayoutEventSource = new Subject<boolean>();
  wideLayoutEvent$ = this.wideLayoutEventSource.asObservable();
  emitWideLayoutEvent(value: boolean) {
    this.wideLayoutEventSource.next(value);
  }

  private narrowLayoutEventSource = new Subject<boolean>();
  narrowLayoutEvent$ = this.narrowLayoutEventSource.asObservable();
  emitNarrowLayoutEvent(value: boolean) {
    this.narrowLayoutEventSource.next(value);
  }  

  private centerTopologyEventSource = new Subject<boolean>();
  centerTopologyEvent$ = this.centerTopologyEventSource.asObservable();
  emitCenterTopologyEvent() {
    this.centerTopologyEventSource.next(true);
  }

  private toggleClustersEventSource = new Subject<boolean>();
  toggleClustersEvent$ = this.toggleClustersEventSource.asObservable();
  emitToggleClustersEvent() {
    this.toggleClustersEventSource.next(true);
  }  

  private toggleActionsEventSource = new Subject<boolean>();
  toggleActionsEvent$ = this.toggleActionsEventSource.asObservable();
  emitToggleActionsEvent() {
    this.toggleActionsEventSource.next(true);
  }  

    private filterByTableInEventSource = new Subject<string>();
  filterByTableInEvent$ = this.filterByTableInEventSource.asObservable();
  emitFilterByTableInEvent(tableName: string) {
    this.filterByTableInEventSource.next(tableName);
  }
  
  private clearTableFilterEventSource = new Subject<boolean>();
  clearTableFilterEvent$ = this.clearTableFilterEventSource.asObservable();
  emitClearTableFilterEvent() {
    this.clearTableFilterEventSource.next(true);
  }

}
