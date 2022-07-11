import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopologyComponent } from './components/topology/topology.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AceEditorModule } from 'ng2-ace-editor';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularSplitModule } from 'angular-split';

import { FilesTreeComponent } from './components/files-tree/files-tree.component';
import { SourceCodeComponent } from './components/source-code/source-code.component';
import { TepmlateEditorComponent } from './components/tepmlate-editor/tepmlate-editor.component';
import { SelectTableComponent } from './components/select_table/select-table.component';
import { MainToolbarComponent } from './components/main-toolbar/main-toolbar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SelectedItemInspectorComponent } from './components/selected-item-inspector/selected-item-inspector.component';
import { SelectedItemInfoComponent } from './components/selected-item-info/selected-item-info.component';
import { TopologyGridViewComponent } from './components/topology-grid-view/topology-grid-view.component';
import { AgGridModule } from 'ag-grid-angular';
import 'material-icons/iconfont/material-icons.css';
import { DomainLinkComponentComponent } from './components/domain-link-component/domain-link-component.component';
import { CommandsComponent } from './components/commands/commands.component';
import { ProjectDialogComponent } from './components/projectDialog/projectDialog.component';

import { CacheInterceptor } from './http-interceptors/cache-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    TopologyComponent,
    FilesTreeComponent,
    SourceCodeComponent,
    TepmlateEditorComponent,
    SelectTableComponent,
    MainToolbarComponent,
    MainLayoutComponent,
    ProjectsComponent,
    SelectedItemInspectorComponent,
    SelectedItemInfoComponent,
    TopologyGridViewComponent,
    DomainLinkComponentComponent,
    CommandsComponent,
    ProjectDialogComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxGraphModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatTreeModule,
    MatGridListModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatMenuModule,
    MatSidenavModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatDialogModule,
    ScrollingModule,
    AceEditorModule,
    FlexLayoutModule,
    AgGridModule.withComponents([]),
    AngularSplitModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MatBottomSheetRef, useValue: {} },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
