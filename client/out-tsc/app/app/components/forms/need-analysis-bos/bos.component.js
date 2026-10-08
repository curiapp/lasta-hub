import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function BosComponent_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵtext(1, "Bos consultation date is required");
    i0.ɵɵelementEnd();
} }
function BosComponent_Conditional_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵtext(1, "Recommendations status is needed");
    i0.ɵɵelementEnd();
} }
//create the component properties
export class BosComponent {
    url = `${environment.apiUrl}/need-analysis/bos/recommend`;
    model = {};
    consultationDate;
    pid;
    fileUpload;
    onUpload() {
        this.fileUpload.onUpload(this.model);
    }
    static ɵfac = function BosComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BosComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BosComponent, selectors: [["bos-amendment"]], viewQuery: function BosComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 43, vars: 9, consts: [["bosForm", "ngForm"], ["date", "ngModel"], ["status", "ngModel"], [1, "container"], [1, "text-xl", "mb-4"], [1, "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], [1, "form-control"], ["id", "date", "type", "Date", "required", "", "date-only", "true", "name", "date", "placeholder", "YYYY-MM-DD", 1, "input", "input-bordered", 3, "ngModelChange", "ngModel"], [1, "input-group-addon"], [1, "glyphicon", "glyphicon-calendar"], [1, "label", "label-text-alt", "text-red-700"], ["itemAlias", "recommendation", 3, "pid", "url"], [1, "w-full", "border-2", "border-gray-300", "border-dashed", "rounded-lg", "p-3"], [1, "space-y-1"], [1, "radio-inline"], ["type", "radio", "name", "status", "value", "senate", "required", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], ["type", "radio", "name", "status", "value", "bos", "required", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], ["type", "radio", "name", "status", "value", "decline", "required", "", 1, "radio", "radio-xs", 3, "ngModelChange", "ngModel"], [1, "label", "label-text-alt"], [1, "form-control", "my-2"], ["type", "button", 1, "btn", "btn-sm", "btn-primary", "w-full", "btn-s", 3, "click", "disabled"], [1, "material-symbols-rounded"]], template: function BosComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 3)(1, "h3", 4);
            i0.ɵɵtext(2, "Bos Consultation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 5, 0)(5, "fieldset", 6)(6, "legend", 7);
            i0.ɵɵtext(7, "BOS Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 8)(9, "input", 9, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function BosComponent_Template_input_ngModelChange_9_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.date, $event) || (ctx.model.date = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "span", 10);
            i0.ɵɵelement(12, "span", 11);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(13, BosComponent_Conditional_13_Template, 2, 0, "div", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "fieldset", 6)(15, "legend", 7);
            i0.ɵɵtext(16, "Recommendations (File)");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "file-upload", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "fieldset", 6)(19, "legend", 7);
            i0.ɵɵtext(20, "Status");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(21, "fieldset", 14)(22, "div", 15)(23, "div")(24, "label", 16)(25, "input", 17, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function BosComponent_Template_input_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.status, $event) || (ctx.model.status = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(27, " Recommend to Senate ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "div")(29, "label", 16)(30, "input", 18, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function BosComponent_Template_input_ngModelChange_30_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.status, $event) || (ctx.model.status = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(32, " Resubmit to BOS ");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "label", 16)(34, "input", 19, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function BosComponent_Template_input_ngModelChange_34_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.status, $event) || (ctx.model.status = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtext(36, " Decline ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(37, BosComponent_Conditional_37_Template, 2, 0, "div", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(38, "div", 21)(39, "button", 22);
            i0.ɵɵlistener("click", function BosComponent_Template_button_click_39_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload()); });
            i0.ɵɵtext(40, " Submit ");
            i0.ɵɵelementStart(41, "span", 23);
            i0.ɵɵtext(42, "cloud_upload");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            const bosForm_r2 = i0.ɵɵreference(4);
            const date_r3 = i0.ɵɵreference(10);
            const status_r4 = i0.ɵɵreference(26);
            i0.ɵɵadvance(9);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.date);
            i0.ɵɵadvance(4);
            i0.ɵɵconditional(date_r3.invalid && date_r3.touched ? 13 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.status);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.status);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.status);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(status_r4.invalid && status_r4.touched ? 37 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length) || !bosForm_r2.form.valid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BosComponent, [{
        type: Component,
        args: [{ selector: 'bos-amendment', imports: [FormsModule, FileUploadComponent], template: "<div class=\"container\">\r\n  <h3 class=\"text-xl mb-4\">Bos Consultation</h3>\r\n  <form #bosForm=\"ngForm\" class=\"space-y-2\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">BOS Date</legend>\r\n      <div class=\"form-control\">\r\n        <input id=\"date\" type=\"Date\" class=\"input input-bordered\" required [(ngModel)]=\"model.date\" date-only=\"true\"\r\n          name=\"date\" placeholder=\"YYYY-MM-DD\" #date=\"ngModel\" />\r\n        <span class=\"input-group-addon\">\r\n          <span class=\"glyphicon glyphicon-calendar\"></span>\r\n        </span>\r\n      </div>\r\n      @if(date.invalid && date.touched){\r\n      <div class=\"label label-text-alt text-red-700\">Bos consultation date is required</div>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Recommendations (File)</legend>\r\n      <file-upload [pid]=\"pid\" [url]=\"url\" itemAlias=\"recommendation\"></file-upload>\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Status</legend>\r\n      <fieldset class=\"w-full border-2 border-gray-300 border-dashed rounded-lg p-3\">\r\n        <div class=\"space-y-1\">\r\n          <div>\r\n            <label class=\"radio-inline\">\r\n              <input type=\"radio\" class=\"radio radio-xs\" name=\"status\" [(ngModel)]=\"model.status\" value=\"senate\"\r\n                required #status=\"ngModel\">\r\n              Recommend to Senate\r\n            </label>\r\n          </div>\r\n          <div>\r\n            <label class=\"radio-inline\">\r\n              <input class=\"radio radio-xs\" type=\"radio\" name=\"status\" [(ngModel)]=\"model.status\" value=\"bos\" required\r\n                #status=\"ngModel\"> Resubmit to BOS </label>\r\n          </div>\r\n          <label class=\"radio-inline\">\r\n            <input class=\"radio radio-xs\" type=\"radio\" name=\"status\" [(ngModel)]=\"model.status\" value=\"decline\" required\r\n              #status=\"ngModel\"> Decline </label>\r\n        </div>\r\n      </fieldset>\r\n\r\n      @if(status.invalid && status.touched){\r\n      <div class=\"label label-text-alt\">Recommendations status is needed</div>\r\n      }\r\n    </fieldset>\r\n\r\n    <div class=\"form-control my-2\">\r\n      <button type=\"button\" class=\"btn btn-sm btn-primary w-full btn-s\" (click)=\"onUpload()\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length || !bosForm.form.valid\">\r\n        Submit\r\n        <span class=\"material-symbols-rounded\">cloud_upload</span>\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BosComponent, { className: "BosComponent", filePath: "src/app/components/forms/need-analysis-bos/bos.component.ts", lineNumber: 16 }); })();
