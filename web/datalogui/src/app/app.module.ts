import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopologyComponent } from './components/topology/topology.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AceEditorModule } from 'ngx-ace-editor-wrapper';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FilesTreeComponent } from './components/files-tree/files-tree.component';
import { SourceCodeComponent } from './components/source-code/source-code.component';
import { TepmlateEditorComponent } from './components/tepmlate-editor/tepmlate-editor.component';
import { SelectTableComponent } from './components/select_table/select-table.component';
import { MainToolbarComponent } from './components/main-toolbar/main-toolbar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ProjectsComponent } from './components/projects/projects.component';

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
    ProjectsComponent
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
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatTreeModule,
    MatGridListModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    ScrollingModule,
    AceEditorModule,
    FlexLayoutModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
