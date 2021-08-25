(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

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
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var ngx_ace_editor_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-ace-editor-wrapper */ "qStI");








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
        this.eventService.emitClearAllEvent();
        this.eventService.emitJoinDataEvent(JSON.parse(this.fileContent));
    }
    renderTemplate() {
        if (this.fileName) {
            this.eventService.emitSpinnerEvent(true);
            this.eventService.emitClearAllEvent();
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
    } }, decls: 10, vars: 3, consts: [["mat-icon-button", "", "aria-label", "Render", "matTooltip", "Render template", 3, "click"], ["type", "text", 3, "ngModel", "ngModelChange"], ["type", "params", 3, "ngModel", "ngModelChange"], ["mat-icon-button", "", "aria-label", "Set data", "matTooltip", "Set json data to topology graph", 3, "click"], [2, "height", "600px", 3, "text", "textChange"], ["templateEditor", ""]], template: function TepmlateEditorComponent_Template(rf, ctx) { if (rf & 1) {
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
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_4__["MatTooltip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIcon"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], ngx_ace_editor_wrapper__WEBPACK_IMPORTED_MODULE_7__["AceEditorComponent"]], styles: ["@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons.woff2') format(\"woff2\"), url('material-icons.woff') format(\"woff\");\n}\n.material-icons[_ngcontent-%COMP%] {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Outlined\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-outlined.woff2') format(\"woff2\"), url('material-icons-outlined.woff') format(\"woff\");\n}\n.material-icons-outlined[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Outlined\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Round\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-round.woff2') format(\"woff2\"), url('material-icons-round.woff') format(\"woff\");\n}\n.material-icons-round[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Round\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Sharp\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-sharp.woff2') format(\"woff2\"), url('material-icons-sharp.woff') format(\"woff\");\n}\n.material-icons-sharp[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Sharp\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Two Tone\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-two-tone.woff2') format(\"woff2\"), url('material-icons-two-tone.woff') format(\"woff\");\n}\n.material-icons-two-tone[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Two Tone\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSw2QkFBNkI7RUFDN0Isa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsMkZBQStGO0FBQ2pHO0FBQ0E7RUFDRSw2QkFBNkI7RUFDN0IsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLG1DQUFtQztFQUNuQyxrQ0FBa0M7RUFDbEMsa0NBQWtDO0VBQ2xDLDZCQUE2QjtBQUMvQjtBQUVBO0VBQ0Usc0NBQXNDO0VBQ3RDLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLDZHQUFpSDtBQUNuSDtBQUNBO0VBQ0Usc0NBQXNDO0VBQ3RDLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxtQ0FBbUM7RUFDbkMsa0NBQWtDO0VBQ2xDLGtDQUFrQztFQUNsQyw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQix1R0FBMkc7QUFDN0c7QUFDQTtFQUNFLG1DQUFtQztFQUNuQyxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsbUNBQW1DO0VBQ25DLGtDQUFrQztFQUNsQyxrQ0FBa0M7RUFDbEMsNkJBQTZCO0FBQy9CO0FBRUE7RUFDRSxtQ0FBbUM7RUFDbkMsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsdUdBQTJHO0FBQzdHO0FBQ0E7RUFDRSxtQ0FBbUM7RUFDbkMsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLG1DQUFtQztFQUNuQyxrQ0FBa0M7RUFDbEMsa0NBQWtDO0VBQ2xDLDZCQUE2QjtBQUMvQjtBQUVBO0VBQ0Usc0NBQXNDO0VBQ3RDLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLDZHQUFpSDtBQUNuSDtBQUNBO0VBQ0Usc0NBQXNDO0VBQ3RDLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxtQ0FBbUM7RUFDbkMsa0NBQWtDO0VBQ2xDLGtDQUFrQztFQUNsQyw2QkFBNkI7QUFDL0IiLCJmaWxlIjoidGVwbWxhdGUtZWRpdG9yLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnNcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWRpc3BsYXk6IGJsb2NrO1xuICBzcmM6IHVybChcIi4vbWF0ZXJpYWwtaWNvbnMud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksIHVybChcIi4vbWF0ZXJpYWwtaWNvbnMud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xufVxuLm1hdGVyaWFsLWljb25zIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnNcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgZGlyZWN0aW9uOiBsdHI7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFwibGlnYVwiO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgT3V0bGluZWRcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWRpc3BsYXk6IGJsb2NrO1xuICBzcmM6IHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksIHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xufVxuLm1hdGVyaWFsLWljb25zLW91dGxpbmVkIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgT3V0bGluZWRcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgZGlyZWN0aW9uOiBsdHI7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFwibGlnYVwiO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgUm91bmRcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWRpc3BsYXk6IGJsb2NrO1xuICBzcmM6IHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtcm91bmQud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksIHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtcm91bmQud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xufVxuLm1hdGVyaWFsLWljb25zLXJvdW5kIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgUm91bmRcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgZGlyZWN0aW9uOiBsdHI7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFwibGlnYVwiO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgU2hhcnBcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWRpc3BsYXk6IGJsb2NrO1xuICBzcmM6IHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtc2hhcnAud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksIHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtc2hhcnAud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xufVxuLm1hdGVyaWFsLWljb25zLXNoYXJwIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgU2hhcnBcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgZGlyZWN0aW9uOiBsdHI7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFwibGlnYVwiO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgVHdvIFRvbmVcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWRpc3BsYXk6IGJsb2NrO1xuICBzcmM6IHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtdHdvLXRvbmUud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksIHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtdHdvLXRvbmUud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xufVxuLm1hdGVyaWFsLWljb25zLXR3by10b25lIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgVHdvIFRvbmVcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgZGlyZWN0aW9uOiBsdHI7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFwibGlnYVwiO1xufVxuIl19 */"] });


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
/* harmony import */ var _topology_grid_view_topology_grid_view_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../topology-grid-view/topology-grid-view.component */ "gpea");
/* harmony import */ var _tepmlate_editor_tepmlate_editor_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../tepmlate-editor/tepmlate-editor.component */ "/um1");
/* harmony import */ var _projects_projects_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../projects/projects.component */ "6bE9");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");















function MainLayoutComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "mat-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class MainLayoutComponent {
    constructor(eventService, cd) {
        this.eventService = eventService;
        this.cd = cd;
        this.showSpinner = false;
        this.leftArea = "25%";
        this.mainArea = "75%";
        eventService.spinnerEvent$.subscribe(value => {
            this.showSpinner = value;
            cd.detectChanges();
        });
        eventService.wideLayoutEvent$.subscribe(_ => {
            this.leftArea = "50%";
            this.mainArea = "50%";
        });
        eventService.narrowLayoutEvent$.subscribe(_ => {
            this.leftArea = "25%";
            this.mainArea = "75%";
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
    } }, decls: 21, vars: 4, consts: [[1, "wrapper"], ["class", "overlay", 4, "ngIf"], [1, "loaded-content"], ["fxLayout", "row"], [1, "noprint"], [1, "noprint", 2, "overflow", "auto", "height", "90vh", 3, "fxFlex"], ["fxFlex", "5px", 2, "background-color", "gray"], ["fxFlex", "75%", 2, "overflow", "auto", "height", "90vh"], ["label", "Topology"], ["label", "Data"], ["label", "Templates"], ["label", "Projects"], [1, "overlay"], [1, "spinner-wrapper"]], template: function MainLayoutComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MainLayoutComponent_div_1_Template, 3, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "app-main-toolbar", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "selected-item-inspector");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "select-table");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-tab-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-tab", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "app-topology");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "mat-tab", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "topology-grid-view");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-tab", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "tepmlate-editor");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "mat-tab", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "app-projects");
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
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("fxFlex", ctx.leftArea);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutDirective"], _main_toolbar_main_toolbar_component__WEBPACK_IMPORTED_MODULE_5__["MainToolbarComponent"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultFlexDirective"], _selected_item_inspector_selected_item_inspector_component__WEBPACK_IMPORTED_MODULE_6__["SelectedItemInspectorComponent"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_7__["MatDivider"], _select_table_select_table_component__WEBPACK_IMPORTED_MODULE_8__["SelectTableComponent"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__["MatTabGroup"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__["MatTab"], _topology_topology_component__WEBPACK_IMPORTED_MODULE_0__["TopologyComponent"], _topology_grid_view_topology_grid_view_component__WEBPACK_IMPORTED_MODULE_10__["TopologyGridViewComponent"], _tepmlate_editor_tepmlate_editor_component__WEBPACK_IMPORTED_MODULE_11__["TepmlateEditorComponent"], _projects_projects_component__WEBPACK_IMPORTED_MODULE_12__["ProjectsComponent"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__["MatSpinner"]], styles: ["#grid-container[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n#menu[_ngcontent-%COMP%] {\r\n    background-color: coral;\r\n}\r\n.wrapper[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 100%;\r\n  }\r\n.overlay[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    z-index: 1002;\r\n    background-color: rgba(255, 255, 255, 0.5);\r\n    width: 100%;\r\n    height: 100%;\r\n  }\r\n.spinner-wrapper[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: center;\r\n    justify-items: center;\r\n  }\r\n@media print{\r\n    .noprint[_ngcontent-%COMP%]{\r\n        display: none;\r\n    }\r\n }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4tbGF5b3V0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtBQUNoQjtBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCO0FBRUE7SUFDSSxXQUFXO0lBQ1gsWUFBWTtFQUNkO0FBRUE7SUFDRSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLDBDQUEwQztJQUMxQyxXQUFXO0lBQ1gsWUFBWTtFQUNkO0FBRUE7SUFDRSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLHFCQUFxQjtFQUN2QjtBQUVBO0lBQ0U7UUFDSSxhQUFhO0lBQ2pCO0NBQ0giLCJmaWxlIjoibWFpbi1sYXlvdXQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNncmlkLWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG4jbWVudSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjb3JhbDtcclxufVxyXG5cclxuLndyYXBwZXIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgfVxyXG4gIFxyXG4gIC5vdmVybGF5IHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHotaW5kZXg6IDEwMDI7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICB9XHJcbiAgXHJcbiAgLnNwaW5uZXItd3JhcHBlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgfVxyXG5cclxuICBAbWVkaWEgcHJpbnR7XHJcbiAgICAubm9wcmludHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG4gfSAgIl19 */"] });


/***/ }),

/***/ "6JpY":
/*!************************************!*\
  !*** ./src/app/classes/dataset.ts ***!
  \************************************/
/*! exports provided: Named, TopologyNode, Field, Dataset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Named", function() { return Named; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopologyNode", function() { return TopologyNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return Field; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dataset", function() { return Dataset; });
class Named {
}
class TopologyNode extends Named {
}
class Field extends Named {
    constructor() {
        super(...arguments);
        this.fieldPlanType = "Empty";
    }
}
class Dataset extends TopologyNode {
}


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
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");











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
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 4);
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
ProjectsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectsComponent, selectors: [["app-projects"]], decls: 2, vars: 1, consts: [[4, "ngFor", "ngForOf"], ["matLine", ""], [1, "button-container"], ["mat-mini-fab", "", "color", "basic", "matTooltip", "Load project data", 3, "click"], ["mat-mini-fab", "", "color", "basic", "matTooltip", "Add project data to current", 3, "click"]], template: function ProjectsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProjectsComponent_mat_list_item_1_Template, 17, 4, "mat-list-item", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.projects);
    } }, directives: [_angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListItem"], _angular_material_core__WEBPACK_IMPORTED_MODULE_6__["MatLine"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_8__["MatTooltip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIcon"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_10__["MatDivider"]], styles: ["@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons.woff2') format(\"woff2\"), url('material-icons.woff') format(\"woff\");\n}\n.material-icons[_ngcontent-%COMP%] {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Outlined\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-outlined.woff2') format(\"woff2\"), url('material-icons-outlined.woff') format(\"woff\");\n}\n.material-icons-outlined[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Outlined\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Round\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-round.woff2') format(\"woff2\"), url('material-icons-round.woff') format(\"woff\");\n}\n.material-icons-round[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Round\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Sharp\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-sharp.woff2') format(\"woff2\"), url('material-icons-sharp.woff') format(\"woff\");\n}\n.material-icons-sharp[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Sharp\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Two Tone\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-two-tone.woff2') format(\"woff2\"), url('material-icons-two-tone.woff') format(\"woff\");\n}\n.material-icons-two-tone[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Two Tone\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n.button-container[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: center;\r\n    width: 120px;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3MiLCJwcm9qZWN0cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNkJBQTZCO0VBQzdCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLDJGQUErRjtBQUNqRztBQUNBO0VBQ0UsNkJBQTZCO0VBQzdCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxtQ0FBbUM7RUFDbkMsa0NBQWtDO0VBQ2xDLGtDQUFrQztFQUNsQyw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFLHNDQUFzQztFQUN0QyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQiw2R0FBaUg7QUFDbkg7QUFDQTtFQUNFLHNDQUFzQztFQUN0QyxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsbUNBQW1DO0VBQ25DLGtDQUFrQztFQUNsQyxrQ0FBa0M7RUFDbEMsNkJBQTZCO0FBQy9CO0FBRUE7RUFDRSxtQ0FBbUM7RUFDbkMsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsdUdBQTJHO0FBQzdHO0FBQ0E7RUFDRSxtQ0FBbUM7RUFDbkMsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLG1DQUFtQztFQUNuQyxrQ0FBa0M7RUFDbEMsa0NBQWtDO0VBQ2xDLDZCQUE2QjtBQUMvQjtBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLHVHQUEyRztBQUM3RztBQUNBO0VBQ0UsbUNBQW1DO0VBQ25DLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxtQ0FBbUM7RUFDbkMsa0NBQWtDO0VBQ2xDLGtDQUFrQztFQUNsQyw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFLHNDQUFzQztFQUN0QyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQiw2R0FBaUg7QUFDbkg7QUFDQTtFQUNFLHNDQUFzQztFQUN0QyxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsbUNBQW1DO0VBQ25DLGtDQUFrQztFQUNsQyxrQ0FBa0M7RUFDbEMsNkJBQTZCO0FBQy9CO0FDMUhBO0lBQ0ksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixZQUFZO0VBQ2QiLCJmaWxlIjoicHJvamVjdHMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29uc1wiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtZGlzcGxheTogYmxvY2s7XG4gIHNyYzogdXJsKFwiLi9tYXRlcmlhbC1pY29ucy53b2ZmMlwiKSBmb3JtYXQoXCJ3b2ZmMlwiKSwgdXJsKFwiLi9tYXRlcmlhbC1pY29ucy53b2ZmXCIpIGZvcm1hdChcIndvZmZcIik7XG59XG4ubWF0ZXJpYWwtaWNvbnMge1xuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29uc1wiO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHdvcmQtd3JhcDogbm9ybWFsO1xuICBkaXJlY3Rpb246IGx0cjtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogXCJsaWdhXCI7XG59XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29ucyBPdXRsaW5lZFwiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtZGlzcGxheTogYmxvY2s7XG4gIHNyYzogdXJsKFwiLi9tYXRlcmlhbC1pY29ucy1vdXRsaW5lZC53b2ZmMlwiKSBmb3JtYXQoXCJ3b2ZmMlwiKSwgdXJsKFwiLi9tYXRlcmlhbC1pY29ucy1vdXRsaW5lZC53b2ZmXCIpIGZvcm1hdChcIndvZmZcIik7XG59XG4ubWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQge1xuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29ucyBPdXRsaW5lZFwiO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHdvcmQtd3JhcDogbm9ybWFsO1xuICBkaXJlY3Rpb246IGx0cjtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogXCJsaWdhXCI7XG59XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29ucyBSb3VuZFwiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtZGlzcGxheTogYmxvY2s7XG4gIHNyYzogdXJsKFwiLi9tYXRlcmlhbC1pY29ucy1yb3VuZC53b2ZmMlwiKSBmb3JtYXQoXCJ3b2ZmMlwiKSwgdXJsKFwiLi9tYXRlcmlhbC1pY29ucy1yb3VuZC53b2ZmXCIpIGZvcm1hdChcIndvZmZcIik7XG59XG4ubWF0ZXJpYWwtaWNvbnMtcm91bmQge1xuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29ucyBSb3VuZFwiO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHdvcmQtd3JhcDogbm9ybWFsO1xuICBkaXJlY3Rpb246IGx0cjtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogXCJsaWdhXCI7XG59XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29ucyBTaGFycFwiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtZGlzcGxheTogYmxvY2s7XG4gIHNyYzogdXJsKFwiLi9tYXRlcmlhbC1pY29ucy1zaGFycC53b2ZmMlwiKSBmb3JtYXQoXCJ3b2ZmMlwiKSwgdXJsKFwiLi9tYXRlcmlhbC1pY29ucy1zaGFycC53b2ZmXCIpIGZvcm1hdChcIndvZmZcIik7XG59XG4ubWF0ZXJpYWwtaWNvbnMtc2hhcnAge1xuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29ucyBTaGFycFwiO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHdvcmQtd3JhcDogbm9ybWFsO1xuICBkaXJlY3Rpb246IGx0cjtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogXCJsaWdhXCI7XG59XG5cbkBmb250LWZhY2Uge1xuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29ucyBUd28gVG9uZVwiO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGZvbnQtZGlzcGxheTogYmxvY2s7XG4gIHNyYzogdXJsKFwiLi9tYXRlcmlhbC1pY29ucy10d28tdG9uZS53b2ZmMlwiKSBmb3JtYXQoXCJ3b2ZmMlwiKSwgdXJsKFwiLi9tYXRlcmlhbC1pY29ucy10d28tdG9uZS53b2ZmXCIpIGZvcm1hdChcIndvZmZcIik7XG59XG4ubWF0ZXJpYWwtaWNvbnMtdHdvLXRvbmUge1xuICBmb250LWZhbWlseTogXCJNYXRlcmlhbCBJY29ucyBUd28gVG9uZVwiO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgbGluZS1oZWlnaHQ6IDE7XG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIHdvcmQtd3JhcDogbm9ybWFsO1xuICBkaXJlY3Rpb246IGx0cjtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XG4gIGZvbnQtZmVhdHVyZS1zZXR0aW5nczogXCJsaWdhXCI7XG59XG4iLCJAaW1wb3J0ICdtYXRlcmlhbC1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3MnO1xyXG4uYnV0dG9uLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICB3aWR0aDogMTIwcHg7XHJcbiAgfSJdfQ== */"] });


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
/* harmony import */ var _classes_dataset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../classes/dataset */ "6JpY");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_events_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/events.service */ "riPR");
/* harmony import */ var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/project.service */ "c3AT");
/* harmony import */ var _swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-graph */ "L/je");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");









function TopologyComponent_ng_template_1__svg_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "image", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} }
function TopologyComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "g", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "image", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TopologyComponent_ng_template_1_Template__svg_image_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7); const node_r4 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r6.nodeClick(node_r4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, TopologyComponent_ng_template_1__svg_ng_container_2_Template, 2, 0, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "text", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const node_r4 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("href", node_r4.data.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r1.checkIfSelected(node_r4));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](node_r4.label);
} }
function TopologyComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "g", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "image", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "rect", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const cluster_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("href", cluster_r8.data.image);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("width", cluster_r8.dimension.width)("height", cluster_r8.dimension.height)("fill", cluster_r8.data.color);
} }
const _c0 = function () { return []; };
class TopologyComponent {
    constructor(eventService, projectService, cd) {
        this.eventService = eventService;
        this.projectService = projectService;
        this.cd = cd;
        this.x = 1400;
        this.y = 800;
        this.dim = [this.x, this.y];
        this.inodes = [];
        this.clusters = [];
        this.nodes = [];
        this.links = [];
        this.selectedTable = "";
        this.showMiniMap = false;
        this.showClusters = true;
        this.viewMode = "datasets";
        this.inOut = [];
        this.zoomToFit$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.panToNode$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.center$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.currentProject = "";
        eventService.zoomToFitEvent$.subscribe(value => this.zoomToFit());
        eventService.centerTopologyEvent$.subscribe(value => this.center$.next(true));
        eventService.getSelectedNodeProjectEvent$.subscribe(node => eventService.emitReturnSelectedNodeProjectEvent(this.getNodeProject(node)));
        eventService.clearAllEvent$.subscribe(value => this.clear());
        eventService.joinDataEvent$.subscribe(value => {
            this.calculateInOut(value.name, value.data || new _classes_topology__WEBPACK_IMPORTED_MODULE_0__["Topology"]());
            this.addData(value);
        });
        eventService.projectEvent$.subscribe(value => {
            this.currentProject = value.name;
            this.addData(value.data || new _classes_topology__WEBPACK_IMPORTED_MODULE_0__["Topology"]());
            this.calculateInOut(value.name, value.data || new _classes_topology__WEBPACK_IMPORTED_MODULE_0__["Topology"]());
        });
        eventService.tableSelectedEvent$.subscribe(value => {
            let found = this.nodes.find(node => { var _a, _b; return ((_b = (_a = node.data) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.name) === value; });
            if (found) {
                this.nodeClick(found);
                this.panToNode$.next(found === null || found === void 0 ? void 0 : found.id);
            }
        });
        eventService.filterByTableInEvent$.subscribe(value => {
            if (this.data) {
                this.getData(this.data, value);
            }
        });
        eventService.clearTableFilterEvent$.subscribe(value => {
            if (this.data) {
                this.getData(this.data);
            }
        });
        eventService.toggleClustersEvent$.subscribe(value => {
            this.showClusters = !this.showClusters;
        });
        eventService.toggleViewEvent$.subscribe(value => {
            this.viewMode = value;
            if (this.data) {
                this.getData(this.data);
            }
        });
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
        var _a;
        return node.id == ((_a = this.selected) === null || _a === void 0 ? void 0 : _a.id);
    }
    clear() {
        this.currentProject = "";
        let t = new _classes_topology__WEBPACK_IMPORTED_MODULE_0__["Topology"]();
        t.datasets = [];
        this.inOut = [];
        this.getData(t);
    }
    addData(data) {
        var _a, _b;
        let t = new _classes_topology__WEBPACK_IMPORTED_MODULE_0__["Topology"]();
        t.datasets = (((_a = this.data) === null || _a === void 0 ? void 0 : _a.datasets) || []).concat(data.datasets || []);
        t.actions = (((_b = this.data) === null || _b === void 0 ? void 0 : _b.actions) || []).concat(data.actions || []);
        this.getData(t);
    }
    getInDatasets(tableName, tables) {
        var _a, _b;
        let intables = ((_b = (_a = tables.find(d => d.name == tableName)) === null || _a === void 0 ? void 0 : _a.in) === null || _b === void 0 ? void 0 : _b.map(d => d.name)) || [];
        let res = [];
        intables.forEach(t => res = res.concat(this.getInDatasets(t, tables) || []));
        return res.concat(intables);
    }
    normalizeDataset(normalised, dataset) {
        dataset.out.forEach(out => {
            let mainDs = normalised.find(d => d.name == out.name);
            if (mainDs) {
                if (!mainDs.in.find(i => i.name == dataset.name)) {
                    mainDs.in.push(dataset);
                }
            }
        });
    }
    concatNamed(list1, list2) {
        list2.forEach(d2 => {
            if (list1.find(d1 => d1.name == d2.name) == undefined) {
                list1.push(d2);
            }
        });
        return list1;
    }
    normaizeTree(normalised, datasets, level) {
        datasets.forEach(dd => {
            let found = normalised.find(n => n.name == dd.name);
            if (found == undefined) {
                normalised.push(dd);
                this.normaizeTree(normalised, dd.in.concat(dd.out), level + 1);
            }
            else {
                let prev = found.in.length + found.out.length;
                found.in = this.concatNamed(found.in, dd.in);
                found.out = this.concatNamed(found.out, dd.out);
                if (dd instanceof _classes_dataset__WEBPACK_IMPORTED_MODULE_2__["Dataset"] && found instanceof _classes_dataset__WEBPACK_IMPORTED_MODULE_2__["Dataset"]) {
                    found.fields = this.concatNamed(found.fields || [], dd.fields || []);
                }
                if ((prev != found.in.length + found.out.length) || level === 0) {
                    this.normaizeTree(normalised, dd.in.concat(dd.out), level + 1);
                }
            }
        });
    }
    getNodes() {
        var _a, _b;
        if (this.viewMode === "actions") {
            return ((_a = this.data) === null || _a === void 0 ? void 0 : _a.actions) || [];
        }
        if (this.viewMode === "inout" && this.inOut) {
            return this.inOut;
        }
        return ((_b = this.data) === null || _b === void 0 ? void 0 : _b.datasets) || [];
    }
    calculateInOut(project, data) {
        //this.inOut = []
        let inodes = data.datasets || [];
        this.normaizeTree(inodes, data.datasets || [], 0);
        inodes.forEach(d => this.normalizeDataset(inodes, d));
        if (project !== "") {
            let io = this.projectService.getProjectsInputOutput(inodes, project);
            this.inOut.push(io);
            this.normaizeTree(this.inOut, this.inOut, 0);
            this.inOut.forEach(d => this.normalizeDataset(this.inOut, d));
            this.eventService.emitProjectStatEvent(io);
        }
    }
    getData(data, filterByTableIn = undefined) {
        this.data = data;
        this.selected = undefined;
        let inodes = this.getNodes();
        this.normaizeTree(inodes, this.getNodes(), 0);
        inodes.forEach(d => this.normalizeDataset(inodes, d));
        let filteredTables = filterByTableIn ? this.getInDatasets(filterByTableIn, inodes) : [];
        if (filterByTableIn) {
            if (filteredTables.indexOf(filterByTableIn) == -1) {
                filteredTables.push(filterByTableIn);
            }
        }
        let did = 0;
        let tablesId = inodes.map(d => { return { key: d.name, value: "" + ++did }; });
        let linkid = 0;
        let links = [];
        let clusters = [];
        inodes.forEach(d => {
            this.checkCluster(d.layer, d.name, clusters, tablesId);
            let inlinks = d.in.map(l => {
                var _a, _b;
                this.checkCluster(l.layer, l.name, clusters, tablesId);
                return { "id": "" + ++linkid, "source": (_a = tablesId.find(k => k.key == l.name)) === null || _a === void 0 ? void 0 : _a.value, "target": (_b = tablesId.find(k => k.key == d.name)) === null || _b === void 0 ? void 0 : _b.value };
            });
            links = links.concat(inlinks);
        });
        this.nodes = inodes
            .filter(d => filteredTables.length == 0 || filteredTables.indexOf(d.name) > -1)
            .map(d => {
            var _a;
            return new _classes_node__WEBPACK_IMPORTED_MODULE_1__["Node"](((_a = tablesId.find(k => k.key == d.name)) === null || _a === void 0 ? void 0 : _a.value) || "notfoundid", d.name, new _classes_node__WEBPACK_IMPORTED_MODULE_1__["NodeData"]("#a95963", d));
        });
        this.links = links.filter(l => this.nodes.filter(n => n.id == l.source).length > 0 && this.nodes.filter(n => n.id == l.target).length > 0);
        this.clusters = clusters;
        this.eventService.emitTableListEvent(this.nodes.map(n => { var _a; return (_a = n.data) === null || _a === void 0 ? void 0 : _a.dataset; }));
    }
    ngOnInit() {
    }
}
TopologyComponent.ɵfac = function TopologyComponent_Factory(t) { return new (t || TopologyComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_events_service__WEBPACK_IMPORTED_MODULE_5__["EventService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_services_project_service__WEBPACK_IMPORTED_MODULE_6__["ProjectService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ChangeDetectorRef"])); };
TopologyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: TopologyComponent, selectors: [["app-topology"]], decls: 5, vars: 9, consts: [["layout", "dagreCluster", 3, "view", "links", "nodes", "clusters", "showMiniMap", "zoomToFit$", "panToNode$", "center$"], ["nodeTemplate", ""], ["clusterTemplate", ""], [1, "node-group", "ng-star-inserted"], ["height", "40", "width", "40", "fill", "none", "fill", "#a95963", 3, "click"], [4, "ngIf"], [1, "name"], ["href", "./assets/check.svg", "height", "40", "width", "40", "fill", "none", "fill", "#a95963"], [1, "node", "cluster"], ["height", "100", "width", "100", "fill", "none"], ["rx", "5", "ry", "5"]], template: function TopologyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ngx-graph", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, TopologyComponent_ng_template_1_Template, 5, 3, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, TopologyComponent_ng_template_3_Template, 3, 4, "ng-template", null, 2, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("view", ctx.dim)("links", ctx.links)("nodes", ctx.nodes)("clusters", ctx.showClusters ? ctx.clusters : _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](8, _c0))("showMiniMap", ctx.showMiniMap)("zoomToFit$", ctx.zoomToFit$)("panToNode$", ctx.panToNode$)("center$", ctx.center$);
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
    constructor(color, dataset) {
        this.image = "assets/dataset.ico";
        this.color = "#a95963";
        this.image = this.getImage(dataset);
        this.color = color;
        this.dataset = dataset;
    }
    getImage(dataset) {
        if (dataset.datasetType == "Table") {
            return "assets/dataset.ico";
        }
        if (dataset.datasetType == "SH") {
            return "assets/sh.jpg";
        }
        if (dataset.datasetType == "project") {
            return "assets/project.png";
        }
        if (dataset.datasetType == "file") {
            return "assets/file.png";
        }
        return "assets/component.png";
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
            this.tables = value.map(d => (d === null || d === void 0 ? void 0 : d.name) || "").sort();
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
/* harmony import */ var material_icons_iconfont_material_icons_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! material-icons/iconfont/material-icons.css */ "x4lw");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_events_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/events.service */ "riPR");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/toolbar */ "/t3+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");










function MainToolbarComponent_span_34_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const project_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u00A0", project_r1, "\u00A0");
} }
function MainToolbarComponent_span_34_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const project_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u00A0", project_r1, "\u00A0");
} }
function MainToolbarComponent_span_34_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MainToolbarComponent_span_34_span_1_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, MainToolbarComponent_span_34_span_2_Template, 2, 1, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainToolbarComponent_span_34_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7); const project_r1 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r6.loadProject(project_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "done");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const project_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", project_r1 === ctx_r0.currentProject);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", project_r1 !== ctx_r0.currentProject);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", project_r1 === ctx_r0.currentProject);
} }
class MainToolbarComponent {
    constructor(eventService) {
        this.eventService = eventService;
        this.projects = [];
        this.viewMode = "datasets";
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
    viewModeChanged() {
        this.eventService.emitToggleViewEvent(this.viewMode);
    }
    zoomToFit() {
        this.eventService.emitZoomToFitEvent();
    }
    centerGraph() {
        this.eventService.emitCenterTopologyEvent();
    }
    clustersOnOff() {
        this.eventService.emitToggleClustersEvent();
    }
    wideLayout() {
        this.eventService.emitWideLayoutEvent(true);
    }
    narrowLayout() {
        this.eventService.emitNarrowLayoutEvent(true);
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
MainToolbarComponent.ɵfac = function MainToolbarComponent_Factory(t) { return new (t || MainToolbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_events_service__WEBPACK_IMPORTED_MODULE_2__["EventService"])); };
MainToolbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MainToolbarComponent, selectors: [["app-main-toolbar"]], decls: 39, vars: 2, consts: [["color", "basic", "mat-mini-fab", "", "matTooltip", "Zoom to fit", 3, "click"], ["color", "basic", "mat-mini-fab", "", "matTooltip", "Center topology", 3, "click"], ["color", "basic", "mat-mini-fab", "", "matTooltip", "Clusters on/off", 3, "click"], [3, "ngModel", "ngModelChange", "change"], ["mat-mini-fab", "", "matTooltip", "View datasets", "value", "datasets"], ["mat-mini-fab", "", "matTooltip", "View actions", "value", "actions"], ["mat-mini-fab", "", "matTooltip", "View in-out", "value", "inout"], ["color", "basic", "mat-mini-fab", "", "matTooltip", "Narrow layout", 3, "click"], ["color", "basic", "mat-mini-fab", "", "matTooltip", "Wide layout", 3, "click"], [4, "ngFor", "ngForOf"], [1, "button-container"], ["color", "basic", "mat-mini-fab", "", "matTooltip", "Clear data", 3, "click"], ["style", "color: mediumblue;", 4, "ngIf"], ["style", "color: gray;", 4, "ngIf"], ["mat-mini-fab", "", "color", "basic", "matTooltip", "Load project", 3, "disabled", "click"], [2, "color", "mediumblue"], [2, "color", "gray"]], template: function MainToolbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-toolbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "section");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Data Topology");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "section");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainToolbarComponent_Template_button_click_7_listener() { return ctx.zoomToFit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "fit_screen");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainToolbarComponent_Template_button_click_10_listener() { return ctx.centerGraph(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "open_with");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainToolbarComponent_Template_button_click_13_listener() { return ctx.clustersOnOff(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "select_all");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "mat-button-toggle-group", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function MainToolbarComponent_Template_mat_button_toggle_group_ngModelChange_16_listener($event) { return ctx.viewMode = $event; })("change", function MainToolbarComponent_Template_mat_button_toggle_group_change_16_listener() { return ctx.viewModeChanged(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-button-toggle", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "mediation");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "mat-button-toggle", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "compare_arrows");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "mat-button-toggle", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "moving");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainToolbarComponent_Template_button_click_26_listener() { return ctx.narrowLayout(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](28, "arrow_back");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainToolbarComponent_Template_button_click_29_listener() { return ctx.wideLayout(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "arrow_forward");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](34, MainToolbarComponent_span_34_Template, 6, 3, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MainToolbarComponent_Template_button_click_36_listener() { return ctx.clear(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "mat-icon");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "clear");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx.viewMode);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.projects);
    } }, directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_3__["MatToolbar"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__["MatTooltip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIcon"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__["MatButtonToggleGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__["MatButtonToggle"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"]], styles: ["@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons.woff2') format(\"woff2\"), url('material-icons.woff') format(\"woff\");\n}\n.material-icons[_ngcontent-%COMP%] {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Outlined\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-outlined.woff2') format(\"woff2\"), url('material-icons-outlined.woff') format(\"woff\");\n}\n.material-icons-outlined[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Outlined\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Round\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-round.woff2') format(\"woff2\"), url('material-icons-round.woff') format(\"woff\");\n}\n.material-icons-round[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Round\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Sharp\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-sharp.woff2') format(\"woff2\"), url('material-icons-sharp.woff') format(\"woff\");\n}\n.material-icons-sharp[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Sharp\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Two Tone\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-two-tone.woff2') format(\"woff2\"), url('material-icons-two-tone.woff') format(\"woff\");\n}\n.material-icons-two-tone[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Two Tone\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n.button-container[_ngcontent-%COMP%] {\r\n    display: flex;\r\n    justify-content: center;\r\n    width: 120px;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3MiLCJtYWluLXRvb2xiYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLDZCQUE2QjtFQUM3QixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQiwyRkFBK0Y7QUFDakc7QUFDQTtFQUNFLDZCQUE2QjtFQUM3QixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsbUNBQW1DO0VBQ25DLGtDQUFrQztFQUNsQyxrQ0FBa0M7RUFDbEMsNkJBQTZCO0FBQy9CO0FBRUE7RUFDRSxzQ0FBc0M7RUFDdEMsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsNkdBQWlIO0FBQ25IO0FBQ0E7RUFDRSxzQ0FBc0M7RUFDdEMsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLG1DQUFtQztFQUNuQyxrQ0FBa0M7RUFDbEMsa0NBQWtDO0VBQ2xDLDZCQUE2QjtBQUMvQjtBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLHVHQUEyRztBQUM3RztBQUNBO0VBQ0UsbUNBQW1DO0VBQ25DLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxtQ0FBbUM7RUFDbkMsa0NBQWtDO0VBQ2xDLGtDQUFrQztFQUNsQyw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQix1R0FBMkc7QUFDN0c7QUFDQTtFQUNFLG1DQUFtQztFQUNuQyxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsbUNBQW1DO0VBQ25DLGtDQUFrQztFQUNsQyxrQ0FBa0M7RUFDbEMsNkJBQTZCO0FBQy9CO0FBRUE7RUFDRSxzQ0FBc0M7RUFDdEMsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsNkdBQWlIO0FBQ25IO0FBQ0E7RUFDRSxzQ0FBc0M7RUFDdEMsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLG1DQUFtQztFQUNuQyxrQ0FBa0M7RUFDbEMsa0NBQWtDO0VBQ2xDLDZCQUE2QjtBQUMvQjtBQzFIQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsWUFBWTtFQUNkIiwiZmlsZSI6Im1haW4tdG9vbGJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIk1hdGVyaWFsIEljb25zXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgc3JjOiB1cmwoXCIuL21hdGVyaWFsLWljb25zLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpLCB1cmwoXCIuL21hdGVyaWFsLWljb25zLndvZmZcIikgZm9ybWF0KFwid29mZlwiKTtcbn1cbi5tYXRlcmlhbC1pY29ucyB7XG4gIGZvbnQtZmFtaWx5OiBcIk1hdGVyaWFsIEljb25zXCI7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBsaW5lLWhlaWdodDogMTtcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd29yZC13cmFwOiBub3JtYWw7XG4gIGRpcmVjdGlvbjogbHRyO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcImxpZ2FcIjtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIk1hdGVyaWFsIEljb25zIE91dGxpbmVkXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgc3JjOiB1cmwoXCIuL21hdGVyaWFsLWljb25zLW91dGxpbmVkLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpLCB1cmwoXCIuL21hdGVyaWFsLWljb25zLW91dGxpbmVkLndvZmZcIikgZm9ybWF0KFwid29mZlwiKTtcbn1cbi5tYXRlcmlhbC1pY29ucy1vdXRsaW5lZCB7XG4gIGZvbnQtZmFtaWx5OiBcIk1hdGVyaWFsIEljb25zIE91dGxpbmVkXCI7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBsaW5lLWhlaWdodDogMTtcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd29yZC13cmFwOiBub3JtYWw7XG4gIGRpcmVjdGlvbjogbHRyO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcImxpZ2FcIjtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIk1hdGVyaWFsIEljb25zIFJvdW5kXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgc3JjOiB1cmwoXCIuL21hdGVyaWFsLWljb25zLXJvdW5kLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpLCB1cmwoXCIuL21hdGVyaWFsLWljb25zLXJvdW5kLndvZmZcIikgZm9ybWF0KFwid29mZlwiKTtcbn1cbi5tYXRlcmlhbC1pY29ucy1yb3VuZCB7XG4gIGZvbnQtZmFtaWx5OiBcIk1hdGVyaWFsIEljb25zIFJvdW5kXCI7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBsaW5lLWhlaWdodDogMTtcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd29yZC13cmFwOiBub3JtYWw7XG4gIGRpcmVjdGlvbjogbHRyO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcImxpZ2FcIjtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIk1hdGVyaWFsIEljb25zIFNoYXJwXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgc3JjOiB1cmwoXCIuL21hdGVyaWFsLWljb25zLXNoYXJwLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpLCB1cmwoXCIuL21hdGVyaWFsLWljb25zLXNoYXJwLndvZmZcIikgZm9ybWF0KFwid29mZlwiKTtcbn1cbi5tYXRlcmlhbC1pY29ucy1zaGFycCB7XG4gIGZvbnQtZmFtaWx5OiBcIk1hdGVyaWFsIEljb25zIFNoYXJwXCI7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBsaW5lLWhlaWdodDogMTtcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd29yZC13cmFwOiBub3JtYWw7XG4gIGRpcmVjdGlvbjogbHRyO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcImxpZ2FcIjtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBcIk1hdGVyaWFsIEljb25zIFR3byBUb25lXCI7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1kaXNwbGF5OiBibG9jaztcbiAgc3JjOiB1cmwoXCIuL21hdGVyaWFsLWljb25zLXR3by10b25lLndvZmYyXCIpIGZvcm1hdChcIndvZmYyXCIpLCB1cmwoXCIuL21hdGVyaWFsLWljb25zLXR3by10b25lLndvZmZcIikgZm9ybWF0KFwid29mZlwiKTtcbn1cbi5tYXRlcmlhbC1pY29ucy10d28tdG9uZSB7XG4gIGZvbnQtZmFtaWx5OiBcIk1hdGVyaWFsIEljb25zIFR3byBUb25lXCI7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBsaW5lLWhlaWdodDogMTtcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd29yZC13cmFwOiBub3JtYWw7XG4gIGRpcmVjdGlvbjogbHRyO1xuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcbiAgZm9udC1mZWF0dXJlLXNldHRpbmdzOiBcImxpZ2FcIjtcbn1cbiIsIkBpbXBvcnQgJ21hdGVyaWFsLWljb25zL2ljb25mb250L21hdGVyaWFsLWljb25zLmNzcyc7XHJcbi5idXR0b24tY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMjBweDtcclxuICB9Il19 */"] });


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
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/tree */ "8yBR");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/grid-list */ "zkoq");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/autocomplete */ "/1cH");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/cdk/scrolling */ "vxfF");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/flex-layout */ "YUcS");
/* harmony import */ var _components_files_tree_files_tree_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/files-tree/files-tree.component */ "eGCM");
/* harmony import */ var _components_source_code_source_code_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/source-code/source-code.component */ "gGJr");
/* harmony import */ var _components_tepmlate_editor_tepmlate_editor_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/tepmlate-editor/tepmlate-editor.component */ "/um1");
/* harmony import */ var _components_select_table_select_table_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/select_table/select-table.component */ "Ghr/");
/* harmony import */ var _components_main_toolbar_main_toolbar_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/main-toolbar/main-toolbar.component */ "V8oo");
/* harmony import */ var _components_main_layout_main_layout_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/main-layout/main-layout.component */ "0kqm");
/* harmony import */ var _components_projects_projects_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./components/projects/projects.component */ "6bE9");
/* harmony import */ var _components_selected_item_inspector_selected_item_inspector_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./components/selected-item-inspector/selected-item-inspector.component */ "dJwY");
/* harmony import */ var _components_topology_grid_view_topology_grid_view_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./components/topology-grid-view/topology-grid-view.component */ "gpea");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ag-grid-angular */ "cWTo");
/* harmony import */ var material_icons_iconfont_material_icons_css__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! material-icons/iconfont/material-icons.css */ "x4lw");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/core */ "fXoL");









































class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_38__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_38__["ɵɵdefineInjector"]({ providers: [{ provide: _angular_common__WEBPACK_IMPORTED_MODULE_2__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_2__["HashLocationStrategy"] }], imports: [[
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
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggleModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__["MatTabsModule"],
            _angular_material_tree__WEBPACK_IMPORTED_MODULE_16__["MatTreeModule"],
            _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_17__["MatGridListModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_18__["MatInputModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_19__["MatAutocompleteModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_20__["MatListModule"],
            _angular_material_divider__WEBPACK_IMPORTED_MODULE_21__["MatDividerModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_22__["MatProgressSpinnerModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_23__["MatTooltipModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_24__["MatCheckboxModule"],
            _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__["ScrollingModule"],
            ngx_ace_editor_wrapper__WEBPACK_IMPORTED_MODULE_9__["AceEditorModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_26__["FlexLayoutModule"],
            ag_grid_angular__WEBPACK_IMPORTED_MODULE_36__["AgGridModule"].withComponents([])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_38__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
        _components_topology_topology_component__WEBPACK_IMPORTED_MODULE_7__["TopologyComponent"],
        _components_files_tree_files_tree_component__WEBPACK_IMPORTED_MODULE_27__["FilesTreeComponent"],
        _components_source_code_source_code_component__WEBPACK_IMPORTED_MODULE_28__["SourceCodeComponent"],
        _components_tepmlate_editor_tepmlate_editor_component__WEBPACK_IMPORTED_MODULE_29__["TepmlateEditorComponent"],
        _components_select_table_select_table_component__WEBPACK_IMPORTED_MODULE_30__["SelectTableComponent"],
        _components_main_toolbar_main_toolbar_component__WEBPACK_IMPORTED_MODULE_31__["MainToolbarComponent"],
        _components_main_layout_main_layout_component__WEBPACK_IMPORTED_MODULE_32__["MainLayoutComponent"],
        _components_projects_projects_component__WEBPACK_IMPORTED_MODULE_33__["ProjectsComponent"],
        _components_selected_item_inspector_selected_item_inspector_component__WEBPACK_IMPORTED_MODULE_34__["SelectedItemInspectorComponent"],
        _components_topology_grid_view_topology_grid_view_component__WEBPACK_IMPORTED_MODULE_35__["TopologyGridViewComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_0__["ReactiveFormsModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
        _swimlane_ngx_graph__WEBPACK_IMPORTED_MODULE_8__["NgxGraphModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_10__["MatToolbarModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggleModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
        _angular_material_tabs__WEBPACK_IMPORTED_MODULE_15__["MatTabsModule"],
        _angular_material_tree__WEBPACK_IMPORTED_MODULE_16__["MatTreeModule"],
        _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_17__["MatGridListModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_18__["MatInputModule"],
        _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_19__["MatAutocompleteModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_20__["MatListModule"],
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_21__["MatDividerModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_22__["MatProgressSpinnerModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_23__["MatTooltipModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_24__["MatCheckboxModule"],
        _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__["ScrollingModule"],
        ngx_ace_editor_wrapper__WEBPACK_IMPORTED_MODULE_9__["AceEditorModule"],
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_26__["FlexLayoutModule"], ag_grid_angular__WEBPACK_IMPORTED_MODULE_36__["AgGridModule"]] }); })();


/***/ }),

/***/ "aXBy":
/*!*******************************************!*\
  !*** ./src/app/services/files.service.ts ***!
  \*******************************************/
/*! exports provided: SourceFilesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceFilesService", function() { return SourceFilesService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _project_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project.service */ "c3AT");




class SourceFilesService {
    constructor(http, projectService) {
        this.http = http;
        this.projectService = projectService;
    }
    getFolder() {
        var _a, _b;
        if ((_a = this.projectService.currentProject) === null || _a === void 0 ? void 0 : _a.templateParams) {
            const params = (_b = this.projectService.currentProject) === null || _b === void 0 ? void 0 : _b.templateParams;
            return params.folder + "/";
        }
        return "";
    }
    getSourceFileContent(fileName) {
        let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]()
            .set('fileName', this.getFolder() + fileName);
        params.append("fileName", this.getFolder() + fileName);
        return this.http.get("/sourceFileContent", { params });
    }
}
SourceFilesService.ɵfac = function SourceFilesService_Factory(t) { return new (t || SourceFilesService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_project_service__WEBPACK_IMPORTED_MODULE_2__["ProjectService"])); };
SourceFilesService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: SourceFilesService, factory: SourceFilesService.ɵfac, providedIn: 'root' });


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
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _classes_dataset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../classes/dataset */ "6JpY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _template_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./template.service */ "dBhf");
/* harmony import */ var _events_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./events.service */ "riPR");








class ProjectService {
    constructor(http, templateService, eventService) {
        this.http = http;
        this.templateService = templateService;
        this.eventService = eventService;
        this.currentProject = undefined;
        eventService.projectNameEvent$.subscribe(value => {
            this.getProject(value).subscribe(p => {
                if (p) {
                    this.loadProject(p);
                }
            });
        });
    }
    getProjects() {
        return this.http.get("/projectFile");
    }
    getProject(name) {
        let p = this.getProjects()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((projects) => projects.find(project => project.name === name)));
        return p;
    }
    loadProject(project, clearAll = true) {
        this.currentProject = project;
        if (clearAll === true) {
            this.eventService.emitClearAllEvent();
        }
        if (!project.data && !src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].singleHtml) {
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
    getProjectsInputOutput(normalisedTopologyTree, project) {
        let newNode = function (node) {
            let ioNode = new _classes_dataset__WEBPACK_IMPORTED_MODULE_3__["Dataset"]();
            ioNode.name = node.name;
            ioNode.nodeType = node.nodeType;
            ioNode.project = project;
            ioNode.out = [];
            ioNode.in = [];
            ioNode.datasetType = node.datasetType;
            return ioNode;
        };
        let result = new _classes_dataset__WEBPACK_IMPORTED_MODULE_3__["Dataset"]();
        result.name = project;
        result.nodeType = "project";
        result.project = project;
        result.datasetType = "project";
        let inNodes = [];
        let outNodes = [];
        normalisedTopologyTree.forEach(node => {
            if (node.in.length === 0) {
                inNodes.push(newNode(node));
            }
            if (node.out.length === 0) {
                let nextDs = normalisedTopologyTree.find(d => d.in.find(i => i.name === node.name) != undefined);
                if (!nextDs) {
                    outNodes.push(newNode(node));
                }
            }
        });
        result.in = inNodes;
        result.out = outNodes;
        this.saveProjectStat(result, project);
        return result;
    }
    saveProjectStat(projectStat, project) {
        let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]()
            .set('project', project);
        this.http.post("/projectStat", projectStat, { params })
            .subscribe(s => console.log(s));
        //.pipe(
        //catchError(this.handleError('addHero', projectStat))
        //);
    }
    loadProjectStat(project) {
        let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpParams"]()
            .set('project', project);
        return this.http.get("/projectStat", { params });
    }
}
ProjectService.ɵfac = function ProjectService_Factory(t) { return new (t || ProjectService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_template_service__WEBPACK_IMPORTED_MODULE_5__["TemplateService"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_events_service__WEBPACK_IMPORTED_MODULE_6__["EventService"])); };
ProjectService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: ProjectService, factory: ProjectService.ɵfac, providedIn: 'root' });


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
/* harmony import */ var _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/tree */ "FvrZ");
/* harmony import */ var _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/tree */ "8yBR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_events_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/events.service */ "riPR");
/* harmony import */ var src_app_services_files_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/files.service */ "aXBy");
/* harmony import */ var src_app_services_project_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/project.service */ "c3AT");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/tabs */ "wZkO");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");














function SelectedItemInspectorComponent_mat_list_item_3_Template(rf, ctx) { if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SelectedItemInspectorComponent_mat_list_item_3_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9); const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r8.filterByTableIn(ctx_r8.selected == null ? null : ctx_r8.selected.data == null ? null : ctx_r8.selected.data.dataset == null ? null : ctx_r8.selected.data.dataset.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "done");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "button", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SelectedItemInspectorComponent_mat_list_item_3_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r10.clearTableFilter(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "clear");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.selected == null ? null : ctx_r0.selected.data == null ? null : ctx_r0.selected.data.dataset == null ? null : ctx_r0.selected.data.dataset.name);
} }
function SelectedItemInspectorComponent_mat_list_item_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Action:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r1.getAction());
} }
function SelectedItemInspectorComponent_mat_list_item_10_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "\u00A0");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SelectedItemInspectorComponent_mat_list_item_10_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r11.loadProject(ctx_r11.selectedNodeProject); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "done");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx_r2.selectedNodeProject, " ");
} }
function SelectedItemInspectorComponent_textarea_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "textarea", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.getSource());
} }
function SelectedItemInspectorComponent_mat_tree_node_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-tree-node", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, " code ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const node_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", node_r13.name, " ");
} }
function SelectedItemInspectorComponent_mat_nested_tree_node_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-nested-tree-node");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainer"](7, 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const node_r14 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("aria-label", "Toggle " + node_r14.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r5.treeControl.isExpanded(node_r14) ? "expand_more" : "chevron_right", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", node_r14.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("example-tree-invisible", !ctx_r5.treeControl.isExpanded(node_r14));
} }
function SelectedItemInspectorComponent_mat_list_item_21_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list-item", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SelectedItemInspectorComponent_mat_list_item_21_Template_mat_list_item_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r17); const table_r15 = ctx.$implicit; const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r16.selectTable(table_r15.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const table_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", table_r15 == null ? null : table_r15.name, " ");
} }
function SelectedItemInspectorComponent_mat_list_item_26_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-list-item", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SelectedItemInspectorComponent_mat_list_item_26_Template_mat_list_item_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20); const table_r18 = ctx.$implicit; const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r19.selectTable(table_r18.name); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const table_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", table_r18 == null ? null : table_r18.name, " ");
} }
const _c0 = function () { return []; };
class SelectedItemInspectorComponent {
    constructor(eventService, sourceFilesService, projectService) {
        this.eventService = eventService;
        this.sourceFilesService = sourceFilesService;
        this.projectService = projectService;
        this.treeControl = new _angular_cdk_tree__WEBPACK_IMPORTED_MODULE_0__["NestedTreeControl"](node => node.sources);
        this.dataSource = new _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNestedDataSource"]();
        this.hasChild = (_, node) => !!node.sources && node.sources.length > 0;
        eventService.nodeSelectedEvent$.subscribe(value => {
            var _a, _b, _c;
            this.selected = value;
            this.dataSource.data = (_c = (_b = (_a = this.selected) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.dataset) === null || _c === void 0 ? void 0 : _c.fields;
            this.eventService.emitGetGetSelectedNodeProjectEvent(value);
        });
        eventService.returnSelectedNodeProjectEvent$.subscribe(value => {
            this.selectedNodeProject = value;
        });
        this.eventService.clearAllEvent$.subscribe(value => {
            this.selected = undefined;
            this.selectedNodeProject = undefined;
        });
        this.eventService.projectEvent$.subscribe(value => {
            this.currentProject = value.name;
        });
        this.eventService.projectStatEvent$.subscribe(value => {
            this.currentProjectStat = value || [];
        });
    }
    loadProject(project) {
        if (project) {
            this.eventService.emitProjectNameEvent(project);
        }
    }
    filterByTableIn(tableName) {
        if (tableName) {
            this.eventService.emitFilterByTableInEvent(tableName);
        }
    }
    clearTableFilter() {
        this.eventService.emitClearTableFilterEvent();
    }
    getType() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.selected) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.dataset) === null || _c === void 0 ? void 0 : _c.datasetType;
    }
    getSource() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.selected) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.dataset) === null || _c === void 0 ? void 0 : _c.sourceFile;
    }
    getAction() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.selected) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.dataset) === null || _c === void 0 ? void 0 : _c.action;
    }
    getSourceFile() {
        var _a, _b;
        this.sourceFilesService.getSourceFileContent((_b = (_a = this.selected.data) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.sourceFile)
            .subscribe(fileContent => {
            alert(fileContent);
        }, error => alert(error.message));
    }
    ngOnInit() {
    }
    selectTable(value) {
        this.eventService.emitTableSelectedEvent(value);
    }
}
SelectedItemInspectorComponent.ɵfac = function SelectedItemInspectorComponent_Factory(t) { return new (t || SelectedItemInspectorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_events_service__WEBPACK_IMPORTED_MODULE_3__["EventService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_files_service__WEBPACK_IMPORTED_MODULE_4__["SourceFilesService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_project_service__WEBPACK_IMPORTED_MODULE_5__["ProjectService"])); };
SelectedItemInspectorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SelectedItemInspectorComponent, selectors: [["selected-item-inspector"]], decls: 27, vars: 14, consts: [["label", "Props"], [4, "ngIf"], ["disabled", "", 4, "ngIf"], [3, "label"], [1, "example-tree", 3, "dataSource", "treeControl"], ["matTreeNodeToggle", "", 4, "matTreeNodeDef"], [4, "matTreeNodeDef", "matTreeNodeDefWhen"], [3, "click", 4, "ngFor", "ngForOf"], ["mat-mini-fab", "", "color", "basic", "matTooltip", "Filter. Show this object lineage", 3, "click"], ["mat-mini-fab", "", "color", "basic", "matTooltip", "Clear filter", 3, "click"], ["mat-mini-fab", "", "color", "basic", 3, "click"], ["disabled", ""], ["matTreeNodeToggle", ""], ["mat-icon-button", "", "matTreeNodeToggle", ""], [1, "mat-icon-rtl-mirror"], [1, "mat-tree-node"], ["role", "group"], ["matTreeNodeOutlet", ""], [3, "click"]], template: function SelectedItemInspectorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-tab-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "mat-tab", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SelectedItemInspectorComponent_mat_list_item_3_Template, 11, 1, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-list-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Type:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, SelectedItemInspectorComponent_mat_list_item_9_Template, 5, 1, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, SelectedItemInspectorComponent_mat_list_item_10_Template, 7, 1, "mat-list-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-list-item");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, SelectedItemInspectorComponent_textarea_12_Template, 2, 1, "textarea", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "mat-tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "mat-tree", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, SelectedItemInspectorComponent_mat_tree_node_15_Template, 5, 1, "mat-tree-node", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, SelectedItemInspectorComponent_mat_nested_tree_node_16_Template, 8, 5, "mat-nested-tree-node", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "mat-tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "in");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, SelectedItemInspectorComponent_mat_list_item_21_Template, 2, 1, "mat-list-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](22, "mat-divider");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24, "out");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "mat-nav-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](26, SelectedItemInspectorComponent_mat_list_item_26_Template, 2, 1, "mat-list-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selected);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.getType());
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.getAction() != undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedNodeProject != undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selected);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("label", "Fields (", ctx.selected == null ? null : ctx.selected.data == null ? null : ctx.selected.data.dataset == null ? null : ctx.selected.data.dataset.fields == null ? null : ctx.selected.data.dataset.fields.length, ")");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dataSource", ctx.dataSource)("treeControl", ctx.treeControl);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matTreeNodeDefWhen", ctx.hasChild);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate1"]("label", "Project (", ctx.currentProject, ")");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", (ctx.currentProjectStat == null ? null : ctx.currentProjectStat.in) || _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](12, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", (ctx.currentProjectStat == null ? null : ctx.currentProjectStat.out) || _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](13, _c0));
    } }, directives: [_angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTabGroup"], _angular_material_tabs__WEBPACK_IMPORTED_MODULE_6__["MatTab"], _angular_material_list__WEBPACK_IMPORTED_MODULE_7__["MatNavList"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_7__["MatListItem"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTree"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNodeDef"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_material_divider__WEBPACK_IMPORTED_MODULE_9__["MatDivider"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButton"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_11__["MatTooltip"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIcon"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNode"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNodeToggle"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatNestedTreeNode"], _angular_material_tree__WEBPACK_IMPORTED_MODULE_1__["MatTreeNodeOutlet"]], styles: ["@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons.woff2') format(\"woff2\"), url('material-icons.woff') format(\"woff\");\n}\n.material-icons[_ngcontent-%COMP%] {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Outlined\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-outlined.woff2') format(\"woff2\"), url('material-icons-outlined.woff') format(\"woff\");\n}\n.material-icons-outlined[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Outlined\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Round\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-round.woff2') format(\"woff2\"), url('material-icons-round.woff') format(\"woff\");\n}\n.material-icons-round[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Round\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Sharp\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-sharp.woff2') format(\"woff2\"), url('material-icons-sharp.woff') format(\"woff\");\n}\n.material-icons-sharp[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Sharp\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n@font-face {\n  font-family: \"Material Icons Two Tone\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url('material-icons-two-tone.woff2') format(\"woff2\"), url('material-icons-two-tone.woff') format(\"woff\");\n}\n.material-icons-two-tone[_ngcontent-%COMP%] {\n  font-family: \"Material Icons Two Tone\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n.example-tree-invisible[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\n.example-tree[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%], .example-tree[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n    margin-top: 0;\r\n    margin-bottom: 0;\r\n    list-style-type: none;\r\n  }\n\n.example-tree[_ngcontent-%COMP%]   .mat-nested-tree-node[_ngcontent-%COMP%]   div[role=group][_ngcontent-%COMP%] {\r\n    padding-left: 40px;\r\n  }\n\n.example-tree[_ngcontent-%COMP%]   div[role=group][_ngcontent-%COMP%]    > .mat-tree-node[_ngcontent-%COMP%] {\r\n    padding-left: 40px;\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9tYXRlcmlhbC1pY29ucy9pY29uZm9udC9tYXRlcmlhbC1pY29ucy5jc3MiLCJzZWxlY3RlZC1pdGVtLWluc3BlY3Rvci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNkJBQTZCO0VBQzdCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLDJGQUErRjtBQUNqRztBQUNBO0VBQ0UsNkJBQTZCO0VBQzdCLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxtQ0FBbUM7RUFDbkMsa0NBQWtDO0VBQ2xDLGtDQUFrQztFQUNsQyw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFLHNDQUFzQztFQUN0QyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQiw2R0FBaUg7QUFDbkg7QUFDQTtFQUNFLHNDQUFzQztFQUN0QyxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsbUNBQW1DO0VBQ25DLGtDQUFrQztFQUNsQyxrQ0FBa0M7RUFDbEMsNkJBQTZCO0FBQy9CO0FBRUE7RUFDRSxtQ0FBbUM7RUFDbkMsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsdUdBQTJHO0FBQzdHO0FBQ0E7RUFDRSxtQ0FBbUM7RUFDbkMsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsY0FBYztFQUNkLHNCQUFzQjtFQUN0QixvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLG1DQUFtQztFQUNuQyxrQ0FBa0M7RUFDbEMsa0NBQWtDO0VBQ2xDLDZCQUE2QjtBQUMvQjtBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0VBQ25CLHVHQUEyRztBQUM3RztBQUNBO0VBQ0UsbUNBQW1DO0VBQ25DLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGNBQWM7RUFDZCxzQkFBc0I7RUFDdEIsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGNBQWM7RUFDZCxtQ0FBbUM7RUFDbkMsa0NBQWtDO0VBQ2xDLGtDQUFrQztFQUNsQyw2QkFBNkI7QUFDL0I7QUFFQTtFQUNFLHNDQUFzQztFQUN0QyxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQiw2R0FBaUg7QUFDbkg7QUFDQTtFQUNFLHNDQUFzQztFQUN0QyxtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsbUNBQW1DO0VBQ25DLGtDQUFrQztFQUNsQyxrQ0FBa0M7RUFDbEMsNkJBQTZCO0FBQy9CO0FDMUhBO0lBQ0ksYUFBYTtFQUNmO0FBRUE7O0lBRUUsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixxQkFBcUI7RUFDdkI7QUFFQTs7SUFFRTtBQUNGO0lBQ0Usa0JBQWtCO0VBQ3BCO0FBRUE7Ozs7SUFJRTtBQUNGO0lBQ0Usa0JBQWtCO0VBQ3BCIiwiZmlsZSI6InNlbGVjdGVkLWl0ZW0taW5zcGVjdG9yLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnNcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWRpc3BsYXk6IGJsb2NrO1xuICBzcmM6IHVybChcIi4vbWF0ZXJpYWwtaWNvbnMud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksIHVybChcIi4vbWF0ZXJpYWwtaWNvbnMud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xufVxuLm1hdGVyaWFsLWljb25zIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnNcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgZGlyZWN0aW9uOiBsdHI7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFwibGlnYVwiO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgT3V0bGluZWRcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWRpc3BsYXk6IGJsb2NrO1xuICBzcmM6IHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksIHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtb3V0bGluZWQud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xufVxuLm1hdGVyaWFsLWljb25zLW91dGxpbmVkIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgT3V0bGluZWRcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgZGlyZWN0aW9uOiBsdHI7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFwibGlnYVwiO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgUm91bmRcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWRpc3BsYXk6IGJsb2NrO1xuICBzcmM6IHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtcm91bmQud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksIHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtcm91bmQud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xufVxuLm1hdGVyaWFsLWljb25zLXJvdW5kIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgUm91bmRcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgZGlyZWN0aW9uOiBsdHI7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFwibGlnYVwiO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgU2hhcnBcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWRpc3BsYXk6IGJsb2NrO1xuICBzcmM6IHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtc2hhcnAud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksIHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtc2hhcnAud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xufVxuLm1hdGVyaWFsLWljb25zLXNoYXJwIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgU2hhcnBcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgZGlyZWN0aW9uOiBsdHI7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFwibGlnYVwiO1xufVxuXG5AZm9udC1mYWNlIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgVHdvIFRvbmVcIjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWRpc3BsYXk6IGJsb2NrO1xuICBzcmM6IHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtdHdvLXRvbmUud29mZjJcIikgZm9ybWF0KFwid29mZjJcIiksIHVybChcIi4vbWF0ZXJpYWwtaWNvbnMtdHdvLXRvbmUud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xufVxuLm1hdGVyaWFsLWljb25zLXR3by10b25lIHtcbiAgZm9udC1mYW1pbHk6IFwiTWF0ZXJpYWwgSWNvbnMgVHdvIFRvbmVcIjtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXNpemU6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB3b3JkLXdyYXA6IG5vcm1hbDtcbiAgZGlyZWN0aW9uOiBsdHI7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xuICBmb250LWZlYXR1cmUtc2V0dGluZ3M6IFwibGlnYVwiO1xufVxuIiwiQGltcG9ydCAnbWF0ZXJpYWwtaWNvbnMvaWNvbmZvbnQvbWF0ZXJpYWwtaWNvbnMuY3NzJztcclxuLmV4YW1wbGUtdHJlZS1pbnZpc2libGUge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbiAgXHJcbiAgLmV4YW1wbGUtdHJlZSB1bCxcclxuICAuZXhhbXBsZS10cmVlIGxpIHtcclxuICAgIG1hcmdpbi10b3A6IDA7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gIH1cclxuICBcclxuICAvKlxyXG4gICAqIFRoaXMgcGFkZGluZyBzZXRzIGFsaWdubWVudCBvZiB0aGUgbmVzdGVkIG5vZGVzLlxyXG4gICAqL1xyXG4gIC5leGFtcGxlLXRyZWUgLm1hdC1uZXN0ZWQtdHJlZS1ub2RlIGRpdltyb2xlPWdyb3VwXSB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDQwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC8qXHJcbiAgICogUGFkZGluZyBmb3IgbGVhZiBub2Rlcy5cclxuICAgKiBMZWFmIG5vZGVzIG5lZWQgdG8gaGF2ZSBwYWRkaW5nIHNvIGFzIHRvIGFsaWduIHdpdGggb3RoZXIgbm9uLWxlYWYgbm9kZXNcclxuICAgKiB1bmRlciB0aGUgc2FtZSBwYXJlbnQuXHJcbiAgICovXHJcbiAgLmV4YW1wbGUtdHJlZSBkaXZbcm9sZT1ncm91cF0gPiAubWF0LXRyZWUtbm9kZSB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDQwcHg7XHJcbiAgfSJdfQ== */"] });


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

/***/ "gpea":
/*!*******************************************************************************!*\
  !*** ./src/app/components/topology-grid-view/topology-grid-view.component.ts ***!
  \*******************************************************************************/
/*! exports provided: TopologyGridViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopologyGridViewComponent", function() { return TopologyGridViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_events_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/events.service */ "riPR");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ag-grid-angular */ "cWTo");




class TopologyGridViewComponent {
    constructor(eventService) {
        this.eventService = eventService;
        this.withFields = true;
        this.columnDefs = [
            { field: 'database', resizable: true, filter: 'agTextColumnFilter', },
            { field: 'tableName', resizable: true, filter: 'agTextColumnFilter', },
            { field: 'fieldName', resizable: true, filter: 'agTextColumnFilter', }
        ];
        this.rowData = [
            { database: '', tableName: '', fieldName: '' }
        ];
        this.tables = [];
        this.defaultColDef = {
            editable: true,
            resizable: true,
            minWidth: 100,
            flex: 1,
        };
        this.popupParent = document.body;
        eventService.tableListEvent$.subscribe(value => {
            this.tables = value;
            this.setData();
        });
    }
    setData() {
        let data = [];
        this.tables.sort((a, b) => (a === null || a === void 0 ? void 0 : a.name.localeCompare((b === null || b === void 0 ? void 0 : b.name) || "")) || 0).forEach(d => {
            const names = ((d === null || d === void 0 ? void 0 : d.name) || "").split(".");
            const database = names.length > 0 ? names[0] : "";
            const tableName = (database !== "" ? d === null || d === void 0 ? void 0 : d.name.replace(database + ".", "") : d === null || d === void 0 ? void 0 : d.name) || "";
            if ((d === null || d === void 0 ? void 0 : d.fields) && this.withFields === true) {
                d.fields.sort((a, b) => a.name.localeCompare(b.name)).forEach(f => {
                    if (!f.name.includes(".")) {
                        data.push({ "database": database, "tableName": tableName, "fieldName": f.name });
                    }
                });
            }
            data.push({ "database": database, "tableName": tableName, "fieldName": "" });
        });
        this.rowData = data;
    }
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }
    onBtnExport() {
        this.gridApi.exportDataAsCsv({ columnSeparator: ";" });
    }
    ngOnInit() {
    }
    setWithFields(withFields) {
        this.withFields = withFields;
        this.setData();
    }
}
TopologyGridViewComponent.ɵfac = function TopologyGridViewComponent_Factory(t) { return new (t || TopologyGridViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_events_service__WEBPACK_IMPORTED_MODULE_1__["EventService"])); };
TopologyGridViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TopologyGridViewComponent, selectors: [["topology-grid-view"]], decls: 7, vars: 5, consts: [["color", "primary", 1, "example-margin", 3, "checked", "change"], [3, "click"], [1, "ag-theme-alpine", 2, "width", "1000px", "height", "800px", 3, "rowData", "columnDefs", "popupParent", "gridReady"], ["agGrid", ""]], template: function TopologyGridViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-checkbox", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function TopologyGridViewComponent_Template_mat_checkbox_change_0_listener($event) { return ctx.setWithFields($event.checked); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " With fields\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\n\u00A0\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TopologyGridViewComponent_Template_button_click_3_listener() { return ctx.onBtnExport(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Export");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ag-grid-angular", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("gridReady", function TopologyGridViewComponent_Template_ag_grid_angular_gridReady_5_listener($event) { return ctx.onGridReady($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("checked", ctx.withFields);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rowData", ctx.rowData)("columnDefs", ctx.columnDefs)("popupParent", ctx.popupParent)("columnDefs", ctx.columnDefs);
    } }, directives: [_angular_material_checkbox__WEBPACK_IMPORTED_MODULE_2__["MatCheckbox"], ag_grid_angular__WEBPACK_IMPORTED_MODULE_3__["AgGridAngular"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0b3BvbG9neS1ncmlkLXZpZXcuY29tcG9uZW50LmNzcyJ9 */"] });


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
    constructor() {
        this.actions = [];
    }
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
        this.wideLayoutEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.wideLayoutEvent$ = this.wideLayoutEventSource.asObservable();
        this.narrowLayoutEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.narrowLayoutEvent$ = this.narrowLayoutEventSource.asObservable();
        this.centerTopologyEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.centerTopologyEvent$ = this.centerTopologyEventSource.asObservable();
        this.toggleClustersEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.toggleClustersEvent$ = this.toggleClustersEventSource.asObservable();
        this.toggleViewEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.toggleViewEvent$ = this.toggleViewEventSource.asObservable();
        this.filterByTableInEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.filterByTableInEvent$ = this.filterByTableInEventSource.asObservable();
        this.clearTableFilterEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.clearTableFilterEvent$ = this.clearTableFilterEventSource.asObservable();
        this.projectStatEventSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.projectStatEvent$ = this.projectStatEventSource.asObservable();
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
    emitWideLayoutEvent(value) {
        this.wideLayoutEventSource.next(value);
    }
    emitNarrowLayoutEvent(value) {
        this.narrowLayoutEventSource.next(value);
    }
    emitCenterTopologyEvent() {
        this.centerTopologyEventSource.next(true);
    }
    emitToggleClustersEvent() {
        this.toggleClustersEventSource.next(true);
    }
    emitToggleViewEvent(value) {
        this.toggleViewEventSource.next(value);
    }
    emitFilterByTableInEvent(tableName) {
        this.filterByTableInEventSource.next(tableName);
    }
    emitClearTableFilterEvent() {
        this.clearTableFilterEventSource.next(true);
    }
    emitProjectStatEvent(value) {
        this.projectStatEventSource.next(value);
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