import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Node, NodeData } from "../classes/node";
import { Project } from '../classes/project';
import { Topology } from "../classes/topology";

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

  private returnSelectedNodeProjectEventSource = new Subject<(string | undefined)[] | undefined>();
  returnSelectedNodeProjectEvent$ = this.returnSelectedNodeProjectEventSource.asObservable();
  emitReturnSelectedNodeProjectEvent(projects: (string | undefined)[] | undefined) {
    this.returnSelectedNodeProjectEventSource.next(projects);
  }

  private receiveProjectsEventSource = new Subject<string[]>();
  receiveProjectstEvent$ = this.receiveProjectsEventSource.asObservable();
  emitReceiveProjectsEvent(projects: string[]) {
    this.receiveProjectsEventSource.next(projects);
  }

  private projectSelectedEventSource = new Subject<string>();
  projectSelectedEvent$ = this.projectSelectedEventSource.asObservable();
  emitProjectSelectedEvent(project: string) {
    this.projectSelectedEventSource.next(project);
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

  private tableListEventSource = new Subject<string[]>();
  tableListEvent$ = this.tableListEventSource.asObservable();
  emitTableListEvent(list: string[]) {
    this.tableListEventSource.next(list);
  }

  private tableSelectedEventSource = new Subject<string|undefined>();
  tableSelectedEvent$ = this.tableSelectedEventSource.asObservable();
  emitTableSelectedEvent(value: string|undefined) {
    this.tableSelectedEventSource.next(value);
  }  
}
