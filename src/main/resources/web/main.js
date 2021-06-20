(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+lZI":
/*!***************************************!*\
  !*** ./src/assets/projects_data.json ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module) {

module.exports = JSON.parse("[]");

/***/ }),

/***/ "/um1":
/*!*************************************************************************!*\
  !*** ./src/app/components/tepmlate-editor/tepmlate-editor.component.ts ***!
  \*************************************************************************/
/*! exports provided: TepmlateEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TepmlateEditorComponent", function() { return TepmlateEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_template_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/template.service */ "dBhf");
/* harmony import */ var src_app_services_events_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/events.service */ "riPR");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ngx_ace_editor_wrapper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-ace-editor-wrapper */ "qStI");







const _c0 = ["templateEditor"];
class TepmlateEditorComponent {
    constructor(teplateService, eventService) {
        this.teplateService = teplateService;
        this.eventService = eventService;
        eventService.projectEvent$.subscribe(value => {
            this.fileName = value.template;
            this.params = JSON.stringify(value.templateParams);
            this.fileContent = JSON.stringify(value.data || {}, null, 4);
        });
    }
    ngOnInit() {
    }
    setData() {
        this.eventService.emitJoinDataEvent(JSON.parse(this.fileContent));
    }
    renderTemplate() {
        if (this.fileName) {
            this.eventService.emitSpinnerEvent(true);
            this.teplateService.renderTemplate(this.fileName, this.params)
                .subscribe(s => {
                this.fileContent = JSON.stringify(s, null, 4);
                this.eventService.emitJoinDataEvent(s);
                this.eventService.emitSpinnerEvent(false);
            }, error => {
                console.log("Error while parse template!");
                console.log(error);
                this.fileContent = error.error.text;
                this.eventService.emitSpinnerEvent(false);
            });
        }
    }
}
TepmlateEditorComponent.ɵfac = function TepmlateEditorComponent_Factory(t) { return new (t || TepmlateEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_template_service__WEBPACK_IMPORTED_MODULE_1__["TemplateService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_events_service__WEBPACK_IMPORTED_MODULE_2__["EventService"])); };
TepmlateEditorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TepmlateEditorComponent, selectors: [["tepmlate-editor"]], viewQuery: function TepmlateEditorComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.editor = _t.first);
    } }, decls: 10, vars: 3, consts: [["mat-icon-button", "", "aria-label", "Render", 3, "click"], ["type", "text", 3, "ngModel", "ngModelChange"], ["type", "params", 3, "ngModel", "ngModelChange"], ["mat-icon-button", "", "aria-label", "Set data", 3, "click"], [2, "height", "600px", 3, "text", "textChange"], ["templateEditor", ""]], template: function TepmlateEditorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TepmlateEditorComponent_Template_button_click_0_listener() { return ctx.renderTemplate(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "cake");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TepmlateEditorComponent_Template_input_ngModelChange_3_listener($event) { return ctx.fileName = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function TepmlateEditorComponent_Template_input_ngModelChange_4_listener($event) { return ctx.params = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TepmlateEditorComponent_Template_button_click_5_listener() { return ctx.setData(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "done");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ace-editor", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("textChange", function TepmlateEditorComponent_Template_ace_editor_textChange_8_listener($event) { return ctx.fileContent = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.fileName);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.params);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("text", ctx.fileContent);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIcon"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], ngx_ace_editor_wrapper__WEBPACK_IMPORTED_MODULE_6__["AceEditorComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0ZXBtbGF0ZS1lZGl0b3IuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\projects\sbtprojects\datalog\web\datalogui\src\main.ts */"zUnb");


/***/ }),

/***/ "0kqm":
/*!*****************************************************************!*\
  !*** ./src/app/components/main-layout/main-layout.component.ts ***!
  \*****************************************************************/
/*! exports provided: MainLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainLayoutComponent", function() { return MainLayoutComponent; });
/* harmony import */ var _topology_topology_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../topology/topology.component */ "8j9F");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_events_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/events.service */ "riPR");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout/flex */ "XiUz");
/* harmony import */ var _main_toolbar_main_toolbar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../main-toolbar/main-toolbar.component */ "V8oo");
/* harmony import */ var _selected_item_inspector_selected_item_inspector_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../selected-item-inspector/selected-item-inspector.component */ "dJwY");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _select_table_select_table_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../select_table/select-table.component */ "Ghr/");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _tepmlate_editor_tepmlate_editor_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../tepmlate-editor/tepmlate-editor.component */ "/um1");
/* harmony import */ var _projects_projects_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../projects/projects.component */ "6bE9");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");














function MainLayoutComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "mat-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class MainLayoutComponent {
    constructor(eventService, cd) {
        this.eventService = eventService;
        this.cd = cd;
        this.showSpinner = false;
        eventService.spinnerEvent$.subscribe(value => {
            this.showSpinner = value;
            cd.detectChanges();
        });
    }
    zoomToFit() {
        this.topologyComponent.zoomToFit();
    }
    ngOnInit() {
    }
}
MainLayoutComponent.ɵfac = function MainLayoutComponent_Factory(t) { return new (t || MainLayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_events_service__WEBPACK_IMPORTED_MODULE_2__["EventService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"])); };
MainLayoutComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MainLayoutComponent, selectors: [["app-main-layout"]], viewQuery: function MainLayoutComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_topology_topology_component__WEBPACK_IMPORTED_MODULE_0__["TopologyComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.topologyComponent = _t.first);
    } }, decls: 19, vars: 3, consts: [[1, "wrapper"], ["class", "overlay", 4, "ngIf"], [1, "loaded-content"], ["fxLayout", "row"], ["fxFlex", "20%", 2, "overflow", "auto", "height", "90vh"], ["fxFlex", "5px", 2, "background-color", "gray"], ["fxFlex", "80%", 2, "overflow", "auto", "height", "90vh"], ["label", "Topology"], ["label", "Templates"], ["label", "Projects"], [1, "overlay"], [1, "spinner-wrapper"]], template: function MainLayoutComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MainLayoutComponent_div_1_Template, 3, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "app-main-toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "selected-item-inspector");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "select-table");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-tab-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-tab", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "app-topology");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "mat-tab", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "tepmlate-editor");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-tab", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "app-projects");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showSpinner === true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("blurred", ctx.showSpinner);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutDirective"], _main_toolbar_main_toolbar_component__WEBPACK_IMPORTED_MODULE_5__["MainToolbarComponent"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultFlexDirective"], _selected_item_inspector_selected_item_inspector_component__WEBPACK_IMPORTED_MODULE_6__["SelectedItemInspectorComponent"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_7__["MatDivider"], _select_table_select_table_component__WEBPACK_IMPORTED_MODULE_8__["SelectTableComponent"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__["MatTabGroup"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__["MatTab"], _topology_topology_component__WEBPACK_IMPORTED_MODULE_0__["TopologyComponent"], _tepmlate_editor_tepmlate_editor_component__WEBPACK_IMPORTED_MODULE_10__["TepmlateEditorComponent"], _projects_projects_component__WEBPACK_IMPORTED_MODULE_11__["ProjectsComponent"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__["MatSpinner"]], styles: ["#grid-container[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n#menu[_ngcontent-%COMP%] {\r\n    background-color: coral;\r\n}\r\n.wrapper[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 100%;\r\n  }\r\n.overlay[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    z-index: 1002;\r\n    background-color: rgba(255, 255, 255, 0.5);\r\n    width: 100%;\r\n    height: 100%;\r\n  }\r\n.spinner-wrapper[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: center;\r\n    justify-items: center;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4tbGF5b3V0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCO0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtFQUNkO0FBRUE7SUFDRSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLDBDQUEwQztJQUMxQyxXQUFXO0lBQ1gsWUFBWTtFQUNkO0FBRUE7SUFDRSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtFQUN2QiIsImZpbGUiOiJtYWluLWxheW91dC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2dyaWQtY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcbiNtZW51IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IGNvcmFsO1xyXG59XHJcblxyXG4ud3JhcHBlciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICB9XHJcbiAgXHJcbiAgLm92ZXJsYXkge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgei1pbmRleDogMTAwMjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gIH1cclxuICBcclxuICAuc3Bpbm5lci13cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICB9XHJcbiJdfQ== */"] });


/***/ }),

/***/ "6bE9":
/*!***********************************************************!*\
  !*** ./src/app/components/projects/projects.component.ts ***!
  \***********************************************************/
/*! exports provided: ProjectsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectsComponent", function() { return ProjectsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/project.service */ "c3AT");
/* harmony import */ var src_app_services_template_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/template.service */ "dBhf");
/* harmony import */ var src_app_services_events_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/events.service */ "riPR");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");










const _c0 = function () { return {}; };
function ProjectsComponent_mat_list_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProjectsComponent_mat_list_item_1_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const project_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.loadProject(project_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "content_paste");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProjectsComponent_mat_list_item_1_Template_button_click_13_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const project_r1 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r4.loadProject(project_r1, false); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "add_circle_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "mat-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const project_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](project_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", project_r1.template, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.object2str(project_r1.templateParams || _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c0)), " ");
} }
class ProjectsComponent {
    constructor(projectService, templateService, eventService) {
        this.projectService = projectService;
        this.templateService = templateService;
        this.eventService = eventService;
        projectService.getProjects().subscribe(value => {
            this.projects = value;
        });
    }
    loadProject(project, clearAll = true) {
        this.eventService.emitSpinnerEvent(true);
        this.projectService.loadProject(project, clearAll);
        this.eventService.emitSpinnerEvent(false);
    }
    object2str(value) {
        return JSON.stringify(value);
    }
    ngOnInit() {
    }
}
ProjectsComponent.ɵfac = function ProjectsComponent_Factory(t) { return new (t || ProjectsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_project_service__WEBPACK_IMPORTED_MODULE_1__["ProjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_template_service__WEBPACK_IMPORTED_MODULE_2__["TemplateService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_events_service__WEBPACK_IMPORTED_MODULE_3__["EventService"])); };
ProjectsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectsComponent, selectors: [["app-projects"]], decls: 2, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["matLine", ""], [1, "button-container"], ["mat-mini-fab", "", "color", "primary", 3, "click"]], template: function ProjectsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProjectsComponent_mat_list_item_1_Template, 17, 4, "mat-list-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.projects);
    } }, directives: [_angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListItem"], _angular_material_core__WEBPACK_IMPORTED_MODULE_6__["MatLine"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIcon"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__["MatDivider"]], styles: [".button-container[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: center;\r\n    width: 120px;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3RzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLFlBQVk7RUFDZCIsImZpbGUiOiJwcm9qZWN0cy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ1dHRvbi1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgd2lkdGg6IDEyMHB4O1xyXG4gIH0iXX0= */"] });


/***/ }),

/***/ "8j9F":
/*!***********************************************************!*\
  !*** ./src/app/components/topology/topology.component.ts ***!
  \***********************************************************/
/*! exports provided: TopologyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopologyComponent", function() { return TopologyComponent; });
/* harmony import */ var _classes_topology__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../classes/topology */ "mTf4");
/* harmony import */ var _classes_node__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/node */ "AuC1");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jspdf */ "i680");
/* harmony import */ var svg2pdf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! svg2pdf.js */ "EvH5");
/* harmony import */ var svg2pdf_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(svg2pdf_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_events_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/events.service */ "riPR");
/* harmony import */ var _swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-graph */ "L/je");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");









const _c0 = ["editor"];
function TopologyComponent_ng_template_1__svg_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "image", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} }
function TopologyComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "g", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "image", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function TopologyComponent_ng_template_1_Template__svg_image_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7); const node_r4 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r6.nodeClick(node_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, TopologyComponent_ng_template_1__svg_ng_container_2_Template, 2, 0, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "text", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const node_r4 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("href", node_r4.data.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r1.checkIfSelected(node_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](node_r4.label);
} }
function TopologyComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "g", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "image", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "rect", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const cluster_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("href", cluster_r8.data.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("width", cluster_r8.dimension.width)("height", cluster_r8.dimension.height)("fill", cluster_r8.data.color);
} }
const _c1 = function () { return [1200, 600]; };
class TopologyComponent {
    constructor(eventService, cd) {
        this.eventService = eventService;
        this.cd = cd;
        this.text = "<test><order>PO001</order>\r\n<messgeID>1124</messageID></test>";
        this.clusters = [];
        this.nodes = [];
        this.links = [];
        this.projects = [];
        this.selectedProject = "";
        this.selectedTable = "";
        this.codeValue = "<a>aa</a>";
        this.zoomToFit$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        eventService.zoomToFitEvent$.subscribe(value => this.zoomToFit());
        eventService.getSelectedNodeProjectEvent$.subscribe(node => eventService.emitReturnSelectedNodeProjectEvent(this.getNodeProject(node)));
        eventService.projectSelectedEvent$.subscribe(value => {
            if (this.data) {
                this.getData(this.data, value);
            }
        });
        eventService.clearAllEvent$.subscribe(value => this.clear());
        eventService.joinDataEvent$.subscribe(value => this.addData(value));
        eventService.projectEvent$.subscribe(value => this.addData(value.data || new _classes_topology__WEBPACK_IMPORTED_MODULE_0__["Topology"]()));
        eventService.tableSelectedEvent$.subscribe(value => {
            let found = this.nodes.find(node => { var _a, _b; return ((_b = (_a = node.data) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.name) === value; });
            if (found) {
                this.nodeClick(found);
            }
        });
    }
    setEditorContent(event) {
        // console.log(event, typeof event);
        console.log("");
    }
    saveGraph() {
        const doc = new jspdf__WEBPACK_IMPORTED_MODULE_3__["jsPDF"]();
        const svgatt = document.getElementsByTagName("svg");
        const o = { x: 0, y: 0, width: 1500, height: 2500, loadExternalStyleSheets: true };
        const element = svgatt[0];
        if (element) {
            const x = 0;
            const y = 0;
            const width = 1500;
            const height = 2500;
            doc
                .svg(element, o)
                .then(() => {
                doc.save('myPDF.pdf');
            });
        }
    }
    getNodeProject(node) {
        var _a;
        return (_a = node.data) === null || _a === void 0 ? void 0 : _a.dataset.project;
    }
    getTables() {
        let res = [];
        if (this.nodes) {
            res = this.nodes.map(n => { var _a; return ((_a = n.data) === null || _a === void 0 ? void 0 : _a.dataset.name) || ""; });
        }
        return res;
    }
    zoomToFit() {
        this.zoomToFit$.next(true);
    }
    checkCluster(layer, nodeName, clusters, tablesId) {
        var _a;
        let cluster = clusters.find((c) => c.label == layer);
        if (!cluster) {
            cluster = { id: layer, label: layer, childNodeIds: [] };
            if (cluster.label == "Hive") {
                cluster.data = { image: "assets/Apache_Hive_logo.svg" };
            }
            if (cluster.label == "Oracle") {
                cluster.data = { image: "assets/oracle-2.svg" };
            }
            if (cluster.label == "DataMart") {
                cluster.data = { image: "assets/datamart.png" };
            }
            clusters.push(cluster);
        }
        cluster.childNodeIds.push((_a = tablesId.find(k => k.key == nodeName)) === null || _a === void 0 ? void 0 : _a.value);
    }
    findFileContent(dirs, project, fileName) {
        let found = undefined;
        if (dirs) {
            found = dirs.find(d => d.project == project && d.isFile == true && d.name == fileName);
            if (!found) {
                for (let d of dirs) {
                    found = this.findFileContent(d.childDirs, project, fileName);
                    if (found) {
                        break;
                    }
                }
            }
        }
        return found;
    }
    nodeClick(node) {
        this.selected = node;
        this.eventService.emitNodeSelectedEvent(node);
        this.cd.detectChanges();
    }
    checkIfSelected(node) {
        return node == this.selected;
    }
    clear() {
        let t = new _classes_topology__WEBPACK_IMPORTED_MODULE_0__["Topology"]();
        t.datasets = [];
        this.getData(t);
    }
    addData(data) {
        var _a;
        let t = new _classes_topology__WEBPACK_IMPORTED_MODULE_0__["Topology"]();
        t.datasets = (((_a = this.data) === null || _a === void 0 ? void 0 : _a.datasets) || []).concat(data.datasets || []);
        this.getData(t);
    }
    getData(data, project = null) {
        this.data = data;
        this.selected = undefined;
        console.log(data);
        let inodes = [];
        inodes = inodes.concat(data.datasets);
        data.datasets.forEach(dd => {
            dd.in.concat(dd.out).forEach(i => {
                if (inodes.filter(n => n.name == i.name).length == 0) {
                    inodes.push(i);
                }
            });
        });
        let p = inodes.map(n => n.project ? n.project : "Empty");
        this.projects = ["", ...new Set(p)];
        this.eventService.emitReceiveProjectsEvent(this.projects);
        this.selectedProject = this.projects.length > 0 ? this.projects[0] : "";
        let did = 0;
        let tablesId = inodes.map(d => { return { key: d.name, value: "" + ++did }; });
        let linkid = 0;
        let links = [];
        let clusters = [];
        data.datasets.forEach(d => {
            if (project == null || project == "" || project == d.project) {
                this.checkCluster(d.layer, d.name, clusters, tablesId);
            }
            let inlinks = d.in.map(l => {
                var _a, _b;
                if (project == null || project == "" || project == l.project) {
                    this.checkCluster(l.layer, l.name, clusters, tablesId);
                }
                return { "id": "" + ++linkid, "source": (_a = tablesId.find(k => k.key == l.name)) === null || _a === void 0 ? void 0 : _a.value, "target": (_b = tablesId.find(k => k.key == d.name)) === null || _b === void 0 ? void 0 : _b.value };
            });
            links = links.concat(inlinks);
            let outlinks = d.out.map(l => {
                var _a, _b;
                if (project == null || project == "" || project == l.project) {
                    this.checkCluster(l.layer, l.name, clusters, tablesId);
                }
                return { "id": "" + ++linkid, "source": (_a = tablesId.find(k => k.key == d.name)) === null || _a === void 0 ? void 0 : _a.value, "target": (_b = tablesId.find(k => k.key == l.name)) === null || _b === void 0 ? void 0 : _b.value };
            });
            links = links.concat(outlinks);
        });
        this.nodes = inodes.filter(d => {
            return (project == null || project == "")
                || d.project == project
                || data.datasets.find(fd => fd.name == d.name && fd.project == project) != null
                || (data.datasets.find(f => f.in.filter(td => td.name == d.name && td.project == project).length > 0) != null)
                || (data.datasets.find(f => f.out.filter(td => td.name == d.name && td.project == project).length > 0) != null)
                || this.checkIfLinkInProject(d, links, data, tablesId, project);
        })
            .map(d => {
            var _a;
            return new _classes_node__WEBPACK_IMPORTED_MODULE_1__["Node"](((_a = tablesId.find(k => k.key == d.name)) === null || _a === void 0 ? void 0 : _a.value) || "notfoundid", d.name, new _classes_node__WEBPACK_IMPORTED_MODULE_1__["NodeData"]("assets/dataset.ico", "#a95963", d));
        });
        this.links = links.filter(l => this.nodes.filter(n => n.id == l.source || n.id == l.target).length > 0);
        this.clusters = clusters;
        this.eventService.emitTableListEvent(this.getTables());
    }
    checkIfLinkInProject(dataset, links, data, tablesId, project) {
        let did = tablesId.find(t => t.key == dataset.name).value;
        let dlinks = links.filter(l => l.source == did || l.target == did);
        return dlinks.filter(link => {
            var _a, _b;
            let sname = (_a = tablesId.find(k => k.value == link.source)) === null || _a === void 0 ? void 0 : _a.key;
            let tname = (_b = tablesId.find(k => k.value == link.target)) === null || _b === void 0 ? void 0 : _b.key;
            let s = data.datasets.filter(d => d.name == sname && d.project == project);
            let t = data.datasets.filter(d => d.name == tname && d.project == project);
            return s.length > 0 || t.length > 0;
        }).length > 0;
    }
    ngOnInit() {
    }
}
TopologyComponent.ɵfac = function TopologyComponent_Factory(t) { return new (t || TopologyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_events_service__WEBPACK_IMPORTED_MODULE_6__["EventService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ChangeDetectorRef"])); };
TopologyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: TopologyComponent, selectors: [["app-topology"]], viewQuery: function TopologyComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.editor = _t.first);
    } }, decls: 5, vars: 7, consts: [["layout", "dagreCluster", 3, "view", "links", "nodes", "clusters", "showMiniMap", "zoomToFit$"], ["nodeTemplate", ""], ["clusterTemplate", ""], [1, "node-group", "ng-star-inserted"], ["height", "40", "width", "40", "fill", "none", "fill", "#a95963", 3, "click"], [4, "ngIf"], [1, "name"], ["href", "./assets/check.svg", "height", "40", "width", "40", "fill", "none", "fill", "#a95963"], [1, "node", "cluster"], ["height", "100", "width", "100", "fill", "none"], ["rx", "5", "ry", "5"]], template: function TopologyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ngx-graph", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, TopologyComponent_ng_template_1_Template, 5, 3, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](3, TopologyComponent_ng_template_3_Template, 3, 4, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("view", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](6, _c1))("links", ctx.links)("nodes", ctx.nodes)("clusters", ctx.clusters)("showMiniMap", true)("zoomToFit$", ctx.zoomToFit$);
    } }, directives: [_swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_7__["GraphComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0b3BvbG9neS5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "AuC1":
/*!*********************************!*\
  !*** ./src/app/classes/node.ts ***!
  \*********************************/
/*! exports provided: NodeData, Node */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeData", function() { return NodeData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Node", function() { return Node; });
class NodeData {
    constructor(image, color, dataset) {
        this.image = "assets/dataset.ico";
        this.color = "#a95963";
        this.image = image;
        this.color = color;
        this.dataset = dataset;
    }
}
class Node {
    constructor(id, label, data) {
        this.id = id;
        this.label = label;
        this.data = data;
    }
}


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    singleHtml: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "C+Dh":
/*!**********************************!*\
  !*** ./src/assets/projects.json ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module) {

module.exports = JSON.parse("[]");

/***/ }),

/***/ "Ghr/":
/*!*******************************************************************!*\
  !*** ./src/app/components/select_table/select-table.component.ts ***!
  \*******************************************************************/
/*! exports provided: SelectTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectTableComponent", function() { return SelectTableComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_events_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/events.service */ "riPR");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






function SelectTableComponent_mat_list_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list-item", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SelectTableComponent_mat_list_item_1_Template_mat_list_item_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3); const table_r1 = ctx.$implicit; const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r2.selectTable(table_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const table_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", table_r1, " ");
} }
class SelectTableComponent {
    constructor(eventService) {
        this.eventService = eventService;
        this.tables = [];
        this.myControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]();
        eventService.tableListEvent$.subscribe(value => {
            this.tables = value.sort();
        });
    }
    selectTable(value) {
        this.eventService.emitTableSelectedEvent(value);
    }
    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(value => this._filter(value)));
    }
    _filter(value) {
        const filterValue = value.toLowerCase();
        return this.tables.filter(table => table.toLowerCase().indexOf(filterValue) > -1);
    }
}
SelectTableComponent.ɵfac = function SelectTableComponent_Factory(t) { return new (t || SelectTableComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_events_service__WEBPACK_IMPORTED_MODULE_3__["EventService"])); };
SelectTableComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SelectTableComponent, selectors: [["select-table"]], decls: 2, vars: 1, consts: [[3, "click", 4, "ngFor", "ngForOf"], [3, "click"]], template: function SelectTableComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, SelectTableComponent_mat_list_item_1_Template, 2, 1, "mat-list-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.tables);
    } }, directives: [_angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatNavList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListItem"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWxlY3QtdGFibGUuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class AppComponent {
    constructor() {
        this.title = 'datalog3';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "V8oo":
/*!*******************************************************************!*\
  !*** ./src/app/components/main-toolbar/main-toolbar.component.ts ***!
  \*******************************************************************/
/*! exports provided: MainToolbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainToolbarComponent", function() { return MainToolbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_events_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/events.service */ "riPR");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






function MainToolbarComponent_span_9_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const project_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", project_r1, "\u00A0");
} }
function MainToolbarComponent_span_9_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const project_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("\u00A0", project_r1, "\u00A0");
} }
function MainToolbarComponent_span_9_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MainToolbarComponent_span_9_span_1_Template, 2, 1, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MainToolbarComponent_span_9_span_2_Template, 2, 1, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainToolbarComponent_span_9_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const project_r1 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.loadProject(project_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "done");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const project_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", project_r1 === ctx_r0.currentProject);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", project_r1 !== ctx_r0.currentProject);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", project_r1 === ctx_r0.currentProject);
} }
class MainToolbarComponent {
    constructor(eventService) {
        this.eventService = eventService;
        this.projects = [];
        eventService.nodeSelectedEvent$.subscribe(value => {
            this.eventService.emitGetGetSelectedNodeProjectEvent(value);
        });
        this.eventService.projectEvent$.subscribe(value => {
            this.currentProject = value.name;
            if (!this.projects.includes(value.name)) {
                this.projects.push(value.name);
            }
            if (this.projects.length == 6) {
                this.projects.shift();
            }
        });
        this.eventService.clearAllEvent$.subscribe(value => {
            this.currentProject = undefined;
        });
    }
    ngOnInit() {
    }
    zoomToFit() {
        this.eventService.emitZoomToFitEvent();
    }
    projectSelected(project) {
        this.eventService.emitProjectSelectedEvent(project);
    }
    clear() {
        this.projects = [];
        this.eventService.emitClearAllEvent();
    }
    loadProject(project) {
        if (project) {
            this.eventService.emitProjectNameEvent(project);
        }
    }
    nextProject() {
        if (this.currentProject) {
            let selected = this.projects.indexOf(this.currentProject);
            if (selected + 1 < this.projects.length) {
                return this.projects[selected + 1];
            }
        }
        return undefined;
    }
    prevProject() {
        if (this.currentProject) {
            let selected = this.projects.indexOf(this.currentProject);
            if (selected > 0) {
                return this.projects[selected - 1];
            }
        }
        return undefined;
    }
}
MainToolbarComponent.ɵfac = function MainToolbarComponent_Factory(t) { return new (t || MainToolbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_events_service__WEBPACK_IMPORTED_MODULE_1__["EventService"])); };
MainToolbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MainToolbarComponent, selectors: [["app-main-toolbar"]], decls: 14, vars: 1, consts: [[1, "button-container"], ["mat-mini-fab", "", "color", "primary", "aria-label", "Zoom to fit", 3, "click"], [4, "ngFor", "ngForOf"], ["mat-mini-fab", "", "color", "primary", "aria-label", "Clear", 3, "click"], ["style", "color: mediumblue;", 4, "ngIf"], ["style", "color: gray;", 4, "ngIf"], ["mat-mini-fab", "", "color", "primary", 3, "disabled", "click"], [2, "color", "mediumblue"], [2, "color", "gray"]], template: function MainToolbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Data topology");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainToolbarComponent_Template_button_click_4_listener() { return ctx.zoomToFit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "fit_screen");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, MainToolbarComponent_span_9_Template, 6, 3, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MainToolbarComponent_Template_button_click_11_listener() { return ctx.clear(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.projects);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_2__["MatToolbar"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"]], styles: [".button-container[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: center;\r\n    width: 120px;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4tdG9vbGJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixZQUFZO0VBQ2QiLCJmaWxlIjoibWFpbi10b29sYmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYnV0dG9uLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB3aWR0aDogMTIwcHg7XHJcbiAgfSJdfQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _components_topology_topology_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/topology/topology.component */ "8j9F");
/* harmony import */ var _swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @swimlane/ngx-graph */ "L/je");
/* harmony import */ var ngx_ace_editor_wrapper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-ace-editor-wrapper */ "qStI");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tree */ "8yBR");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/grid-list */ "zkoq");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/cdk/scrolling */ "vxfF");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _components_files_tree_files_tree_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/files-tree/files-tree.component */ "eGCM");
/* harmony import */ var _components_source_code_source_code_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/source-code/source-code.component */ "gGJr");
/* harmony import */ var _components_tepmlate_editor_tepmlate_editor_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/tepmlate-editor/tepmlate-editor.component */ "/um1");
/* harmony import */ var _components_select_table_select_table_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/select_table/select-table.component */ "Ghr/");
/* harmony import */ var _components_main_toolbar_main_toolbar_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/main-toolbar/main-toolbar.component */ "V8oo");
/* harmony import */ var _components_main_layout_main_layout_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/main-layout/main-layout.component */ "0kqm");
/* harmony import */ var _components_projects_projects_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/projects/projects.component */ "6bE9");
/* harmony import */ var _components_selected_item_inspector_selected_item_inspector_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/selected-item-inspector/selected-item-inspector.component */ "dJwY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/core */ "fXoL");


































class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_32__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_32__["ɵɵdefineInjector"]({ providers: [{ provide: _angular_common__WEBPACK_IMPORTED_MODULE_2__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_2__["HashLocationStrategy"] }], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_8__["NgxGraphModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__["MatToolbarModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_13__["MatSelectModule"],
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_14__["MatTabsModule"],
            _angular_material_tree__WEBPACK_IMPORTED_MODULE_15__["MatTreeModule"],
            _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_16__["MatGridListModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_17__["MatInputModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__["MatAutocompleteModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_19__["MatListModule"],
            _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__["MatDividerModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_21__["MatProgressSpinnerModule"],
            _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_22__["ScrollingModule"],
            ngx_ace_editor_wrapper__WEBPACK_IMPORTED_MODULE_9__["AceEditorModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_23__["FlexLayoutModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_32__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
        _components_topology_topology_component__WEBPACK_IMPORTED_MODULE_7__["TopologyComponent"],
        _components_files_tree_files_tree_component__WEBPACK_IMPORTED_MODULE_24__["FilesTreeComponent"],
        _components_source_code_source_code_component__WEBPACK_IMPORTED_MODULE_25__["SourceCodeComponent"],
        _components_tepmlate_editor_tepmlate_editor_component__WEBPACK_IMPORTED_MODULE_26__["TepmlateEditorComponent"],
        _components_select_table_select_table_component__WEBPACK_IMPORTED_MODULE_27__["SelectTableComponent"],
        _components_main_toolbar_main_toolbar_component__WEBPACK_IMPORTED_MODULE_28__["MainToolbarComponent"],
        _components_main_layout_main_layout_component__WEBPACK_IMPORTED_MODULE_29__["MainLayoutComponent"],
        _components_projects_projects_component__WEBPACK_IMPORTED_MODULE_30__["ProjectsComponent"],
        _components_selected_item_inspector_selected_item_inspector_component__WEBPACK_IMPORTED_MODULE_31__["SelectedItemInspectorComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
        _swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_8__["NgxGraphModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__["MatToolbarModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_13__["MatSelectModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_14__["MatTabsModule"],
        _angular_material_tree__WEBPACK_IMPORTED_MODULE_15__["MatTreeModule"],
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_16__["MatGridListModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_17__["MatInputModule"],
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_18__["MatAutocompleteModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_19__["MatListModule"],
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_20__["MatDividerModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_21__["MatProgressSpinnerModule"],
        _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_22__["ScrollingModule"],
        ngx_ace_editor_wrapper__WEBPACK_IMPORTED_MODULE_9__["AceEditorModule"],
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_23__["FlexLayoutModule"]] }); })();


/***/ }),

/***/ "c3AT":
/*!*********************************************!*\
  !*** ./src/app/services/project.service.ts ***!
  \*********************************************/
/*! exports provided: ProjectService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectService", function() { return ProjectService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _assets_projects_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../assets/projects.json */ "C+Dh");
var _assets_projects_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../assets/projects.json */ "C+Dh", 1);
/* harmony import */ var _assets_projects_data_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../assets/projects_data.json */ "+lZI");
var _assets_projects_data_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../assets/projects_data.json */ "+lZI", 1);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _template_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./template.service */ "dBhf");
/* harmony import */ var _events_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events.service */ "riPR");









class ProjectService {
    constructor(http, templateService, eventService) {
        this.http = http;
        this.templateService = templateService;
        this.eventService = eventService;
        eventService.projectNameEvent$.subscribe(value => {
            this.getProject(value).subscribe(p => {
                if (p) {
                    this.loadProject(p);
                }
            });
        });
    }
    getProjects() {
        if (src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].singleHtml == true) {
            let projects = _assets_projects_json__WEBPACK_IMPORTED_MODULE_2__.filter((p) => p.enable !== false);
            projects.forEach(project => {
                if (project.dataExists == true) {
                    this.getJSONData(project);
                }
            });
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["of"])(projects);
        }
        else {
            return this.http.get("/projectFile");
        }
    }
    getJSONData(project) {
        var _a;
        project.data = (_a = _assets_projects_data_json__WEBPACK_IMPORTED_MODULE_3__.find((d) => d.name === project.name)) === null || _a === void 0 ? void 0 : _a.data;
    }
    setData(project, data) {
        project.data = data;
    }
    getProject(name) {
        let p = this.getProjects()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((projects) => projects.find(project => project.name === name)));
        return p;
    }
    loadProject(project, clearAll = true) {
        if (clearAll === true) {
            this.eventService.emitClearAllEvent();
        }
        if (!project.data && !src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].singleHtml) {
            this.eventService.emitSpinnerEvent(true);
            this.templateService.renderTemplate(project.template, JSON.stringify(project.templateParams))
                .subscribe((s) => {
                project.data = s;
                this.eventService.emitProjectEvent(project);
                this.eventService.emitSpinnerEvent(false);
            });
        }
        else {
            this.eventService.emitProjectEvent(project);
        }
    }
}
ProjectService.ɵfac = function ProjectService_Factory(t) { return new (t || ProjectService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_template_service__WEBPACK_IMPORTED_MODULE_7__["TemplateService"]), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_events_service__WEBPACK_IMPORTED_MODULE_8__["EventService"])); };
ProjectService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({ token: ProjectService, factory: ProjectService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "dBhf":
/*!**********************************************!*\
  !*** ./src/app/services/template.service.ts ***!
  \**********************************************/
/*! exports provided: TemplateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateService", function() { return TemplateService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



class TemplateService {
    constructor(http) {
        this.http = http;
    }
    saveTemplate(template) {
        return this.http.post("/template", template);
    }
    renderTemplate(fileName, templateParams) {
        let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]()
            .set('fileName', fileName).set('params', templateParams || "{}");
        params.append("fileName", fileName);
        if (templateParams) {
            //params.set('params', templateParams)
            params.append("params", templateParams);
        }
        return this.http.get("/renderTemplate", { params });
    }
}
TemplateService.ɵfac = function TemplateService_Factory(t) { return new (t || TemplateService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"])); };
TemplateService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TemplateService, factory: TemplateService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "dJwY":
/*!*****************************************************************************************!*\
  !*** ./src/app/components/selected-item-inspector/selected-item-inspector.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: SelectedItemInspectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectedItemInspectorComponent", function() { return SelectedItemInspectorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_events_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/events.service */ "riPR");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");






function SelectedItemInspectorComponent_mat_list_item_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SelectedItemInspectorComponent_mat_list_item_1_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r2.loadProject(ctx_r2.selectedNodeProject); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "done");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r0.selectedNodeProject, " ");
} }
function SelectedItemInspectorComponent_textarea_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "textarea", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.selected == null ? null : ctx_r1.selected.data == null ? null : ctx_r1.selected.data.dataset == null ? null : ctx_r1.selected.data.dataset.sourceFile);
} }
class SelectedItemInspectorComponent {
    constructor(eventService) {
        this.eventService = eventService;
        eventService.nodeSelectedEvent$.subscribe(value => {
            this.selected = value;
            this.eventService.emitGetGetSelectedNodeProjectEvent(value);
        });
        eventService.returnSelectedNodeProjectEvent$.subscribe(value => {
            this.selectedNodeProject = value;
        });
        this.eventService.clearAllEvent$.subscribe(value => {
            this.selected = undefined;
            this.selectedNodeProject = undefined;
        });
    }
    loadProject(project) {
        if (project) {
            this.eventService.emitProjectNameEvent(project);
        }
    }
    ngOnInit() {
    }
}
SelectedItemInspectorComponent.ɵfac = function SelectedItemInspectorComponent_Factory(t) { return new (t || SelectedItemInspectorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_events_service__WEBPACK_IMPORTED_MODULE_1__["EventService"])); };
SelectedItemInspectorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SelectedItemInspectorComponent, selectors: [["selected-item-inspector"]], decls: 4, vars: 2, consts: [[4, "ngIf"], ["disabled", "", 4, "ngIf"], ["mat-mini-fab", "", "color", "primary", 3, "click"], ["disabled", ""]], template: function SelectedItemInspectorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SelectedItemInspectorComponent_mat_list_item_1_Template, 5, 1, "mat-list-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-list-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, SelectedItemInspectorComponent_textarea_3_Template, 2, 1, "textarea", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.selectedNodeProject != undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.selected);
    } }, directives: [_angular_material_list__WEBPACK_IMPORTED_MODULE_2__["MatNavList"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_2__["MatListItem"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZWxlY3RlZC1pdGVtLWluc3BlY3Rvci5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "eGCM":
/*!***************************************************************!*\
  !*** ./src/app/components/files-tree/files-tree.component.ts ***!
  \***************************************************************/
/*! exports provided: FilesTreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilesTreeComponent", function() { return FilesTreeComponent; });
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/tree */ "FvrZ");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/tree */ "8yBR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");






function FilesTreeComponent_mat_tree_node_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-tree-node", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const node_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", node_r2.name, " ");
} }
function FilesTreeComponent_mat_tree_node_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-tree-node", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const node_r3 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("aria-label", "Toggle " + node_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r1.treeControl.isExpanded(node_r3) ? "expand_more" : "chevron_right", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", node_r3.name, " ");
} }
class FilesTreeComponent {
    constructor() {
        this._transformer = (node, level) => {
            return {
                expandable: !!node.childDirs && node.childDirs.length > 0,
                name: node.name,
                level: level,
                data: node
            };
        };
        this.treeControl = new _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["FlatTreeControl"](node => node.level, node => node.expandable);
        this.treeFlattener = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeFlattener"](this._transformer, node => node.level, node => node.expandable, node => node.childDirs);
        this.dataSource = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeFlatDataSource"](this.treeControl, this.treeFlattener);
        this.hasChild = (_, node) => node.expandable;
        this.filesTree = [];
    }
    ngOnInit() {
        if (this.filesTree) {
            this.dataSource.data = this.filesTree;
        }
        else {
            this.dataSource.data = [];
        }
    }
}
FilesTreeComponent.ɵfac = function FilesTreeComponent_Factory(t) { return new (t || FilesTreeComponent)(); };
FilesTreeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: FilesTreeComponent, selectors: [["files-tree"]], inputs: { filesTree: "filesTree" }, decls: 3, vars: 3, consts: [[3, "dataSource", "treeControl"], ["matTreeNodePadding", "", 4, "matTreeNodeDef"], ["matTreeNodePadding", "", 4, "matTreeNodeDef", "matTreeNodeDefWhen"], ["matTreeNodePadding", ""], ["mat-icon-button", "", "disabled", ""], ["mat-icon-button", "", "matTreeNodeToggle", ""], [1, "mat-icon-rtl-mirror"]], template: function FilesTreeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-tree", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, FilesTreeComponent_mat_tree_node_1_Template, 3, 1, "mat-tree-node", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, FilesTreeComponent_mat_tree_node_2_Template, 5, 3, "mat-tree-node", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dataSource", ctx.dataSource)("treeControl", ctx.treeControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matTreeNodeDefWhen", ctx.hasChild);
    } }, directives: [_angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTree"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNodeDef"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNode"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNodePadding"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNodeToggle"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIcon"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmaWxlcy10cmVlLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "gGJr":
/*!*****************************************************************!*\
  !*** ./src/app/components/source-code/source-code.component.ts ***!
  \*****************************************************************/
/*! exports provided: SourceCodeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceCodeComponent", function() { return SourceCodeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var ngx_ace_editor_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-ace-editor-wrapper */ "qStI");


const _c0 = ["editor"];
class SourceCodeComponent {
    constructor() {
        this.codeValue = "";
    }
    ngOnInit() {
    }
}
SourceCodeComponent.ɵfac = function SourceCodeComponent_Factory(t) { return new (t || SourceCodeComponent)(); };
SourceCodeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SourceCodeComponent, selectors: [["app-source-code"]], viewQuery: function SourceCodeComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.editor = _t.first);
    } }, inputs: { codeValue: "codeValue" }, decls: 2, vars: 1, consts: [[2, "height", "600px", 3, "text", "textChange"], ["editor", ""]], template: function SourceCodeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ace-editor", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("textChange", function SourceCodeComponent_Template_ace_editor_textChange_0_listener($event) { return ctx.codeValue = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("text", ctx.codeValue);
    } }, directives: [ngx_ace_editor_wrapper__WEBPACK_IMPORTED_MODULE_1__["AceEditorComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzb3VyY2UtY29kZS5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "mTf4":
/*!*************************************!*\
  !*** ./src/app/classes/topology.ts ***!
  \*************************************/
/*! exports provided: ProjectFileDir, Topology */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectFileDir", function() { return ProjectFileDir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Topology", function() { return Topology; });
class ProjectFileDir {
    constructor() {
        this.project = "";
        this.name = "";
        this.isFile = false;
        this.fileContent = "";
    }
}
class Topology {
}


/***/ }),

/***/ "riPR":
/*!********************************************!*\
  !*** ./src/app/services/events.service.ts ***!
  \********************************************/
/*! exports provided: EventService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventService", function() { return EventService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class EventService {
    constructor() {
        this.clearAllEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.clearAllEvent$ = this.clearAllEventSource.asObservable();
        this.zoomToFitEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.zoomToFitEvent$ = this.zoomToFitEventSource.asObservable();
        this.nodeSelectedEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.nodeSelectedEvent$ = this.nodeSelectedEventSource.asObservable();
        this.getSelectedNodeProjectEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.getSelectedNodeProjectEvent$ = this.getSelectedNodeProjectEventSource.asObservable();
        this.returnSelectedNodeProjectEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.returnSelectedNodeProjectEvent$ = this.returnSelectedNodeProjectEventSource.asObservable();
        this.receiveProjectsEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.receiveProjectstEvent$ = this.receiveProjectsEventSource.asObservable();
        this.projectSelectedEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.projectSelectedEvent$ = this.projectSelectedEventSource.asObservable();
        this.joinDataEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.joinDataEvent$ = this.joinDataEventSource.asObservable();
        this.projectEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.projectEvent$ = this.projectEventSource.asObservable();
        this.projectNameEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.projectNameEvent$ = this.projectNameEventSource.asObservable();
        this.tableListEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.tableListEvent$ = this.tableListEventSource.asObservable();
        this.tableSelectedEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.tableSelectedEvent$ = this.tableSelectedEventSource.asObservable();
        this.spinnerEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.spinnerEvent$ = this.spinnerEventSource.asObservable();
    }
    emitClearAllEvent() {
        this.clearAllEventSource.next(true);
    }
    emitZoomToFitEvent() {
        this.zoomToFitEventSource.next(true);
    }
    emitNodeSelectedEvent(node) {
        this.nodeSelectedEventSource.next(node);
    }
    emitGetGetSelectedNodeProjectEvent(node) {
        this.getSelectedNodeProjectEventSource.next(node);
    }
    emitReturnSelectedNodeProjectEvent(projects) {
        this.returnSelectedNodeProjectEventSource.next(projects);
    }
    emitReceiveProjectsEvent(projects) {
        this.receiveProjectsEventSource.next(projects);
    }
    emitProjectSelectedEvent(project) {
        this.projectSelectedEventSource.next(project);
    }
    emitJoinDataEvent(data) {
        this.joinDataEventSource.next(data);
    }
    emitProjectEvent(data) {
        this.projectEventSource.next(data);
    }
    emitProjectNameEvent(data) {
        this.projectNameEventSource.next(data);
    }
    emitTableListEvent(list) {
        this.tableListEventSource.next(list);
    }
    emitTableSelectedEvent(value) {
        this.tableSelectedEventSource.next(value);
    }
    emitSpinnerEvent(value) {
        this.spinnerEventSource.next(value);
    }
}
EventService.ɵfac = function EventService_Factory(t) { return new (t || EventService)(); };
EventService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: EventService, factory: EventService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_main_layout_main_layout_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/main-layout/main-layout.component */ "0kqm");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");




const routes = [
    //{ path: '', redirectTo: '/topoloy', pathMatch: 'full' },
    //{ path: '', component: TopologyComponent },  
    { path: '', component: _components_main_layout_main_layout_component__WEBPACK_IMPORTED_MODULE_1__["MainLayoutComponent"] },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map