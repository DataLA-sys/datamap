import { Component, OnInit } from '@angular/core';
import { Dataset } from 'src/app/classes/dataset';
import { EventService } from 'src/app/services/events.service';

@Component({
  selector: 'topology-grid-view',
  templateUrl: './topology-grid-view.component.html',
  styleUrls: ['./topology-grid-view.component.css']
})
export class TopologyGridViewComponent implements OnInit {

   withFields = true;
   gridApi: any;
   gridColumnApi: any;

   defaultColDef: any;
   popupParent: any;
   columnDefs: any = [
    { field: 'database', resizable: true, filter: 'agTextColumnFilter', },
    { field: 'tableName', resizable: true, filter: 'agTextColumnFilter', },
    { field: 'fieldName', resizable: true, filter: 'agTextColumnFilter', }
  ];  

  rowData: any = [
    { database: '', tableName: '', fieldName: '' }
  ];

  tables: (Dataset|undefined)[] = [];
  constructor(private eventService: EventService) { 
    this.defaultColDef = {
      editable: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };

    this.popupParent = document.body;
    eventService.tableListEvent$.subscribe(value => {
      this.tables =value;
      this.setData()
    })
  }

  setData() {
    let data: {}[] = []
    this.tables.sort((a,b)=> a?.name.localeCompare(b?.name || "") || 0).forEach(d => {
      const names = (d?.name || "").split(".");
      const database: string = names.length > 0 ? names[0] : ""
      const tableName: string = (database !== "" ? d?.name.replace(database + ".", "") : d?.name) || "";
      if(d?.fields && this.withFields === true) {
        d.fields.sort((a, b) => a.name.localeCompare(b.name)).forEach(f => {
          if(!f.name.includes(".")) {
            data.push({"database": database, "tableName": tableName, "fieldName": f.name});
          }          
        })        
      }       
      data.push({"database": database, "tableName": tableName, "fieldName": ""});            
    });
    this.rowData = data;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  
  onBtnExport() {
    this.gridApi.exportDataAsCsv({columnSeparator: ";"});
  }

  ngOnInit(): void {
  }

  setWithFields(withFields: boolean) {
    this.withFields = withFields;
    this.setData();
  }

}
