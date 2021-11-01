import value from '*.json';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'select-table',
  templateUrl: './select-table.component.html',
  styleUrls: ['./select-table.component.css']
})
export class SelectTableComponent implements OnInit {

  tables: string[] = [];
  selectedTable: string |  undefined;
  constructor(private eventService: EventService) { 
    eventService.tableListEvent$.subscribe(value => {
      this.tables = value.map(d => (d?.name)||"").sort()
    })
    eventService.nodeSelectedEvent$.subscribe(value => {
      this.selectedTable = value.data?.dataset.name;
    })
  }

  selectTable(value: string|undefined) {
    this.eventService.emitTableSelectedEvent(value)
  }  

  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tables.filter(table => table.toLowerCase().indexOf(filterValue) > -1);
  }

}
