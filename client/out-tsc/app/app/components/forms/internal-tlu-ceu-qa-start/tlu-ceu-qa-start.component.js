import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function TLUCEUQAStartComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵtext(1, "Consultation date required*");
    i0.ɵɵelementEnd();
} }
function TLUCEUQAStartComponent_Conditional_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 23);
    i0.ɵɵtext(1, " Recommend to at least one body required* ");
    i0.ɵɵelementEnd();
} }
export class TLUCEUQAStartComponent {
    url = `${environment.apiUrl}/reviews/start`;
    pid;
    fileUpload;
    model = {
        date: new Date(),
        recommendedTo: [],
        includesWilComponent: false
    };
    onUpload() {
        this.fileUpload.onUpload({ ...this.model });
    }
    onChecked(event) {
        const isChecked = event.target.value;
        if (this.model.recommendedTo.includes(isChecked)) {
            var index = this.model.recommendedTo.indexOf(isChecked);
            this.model.recommendedTo.splice(index, 1);
        }
        else
            this.model.recommendedTo.push(isChecked);
    }
    static ɵfac = function TLUCEUQAStartComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TLUCEUQAStartComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TLUCEUQAStartComponent, selectors: [["tlu-ceu-qa-start"]], viewQuery: function TLUCEUQAStartComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 47, vars: 8, consts: [["consultForm", "ngForm"], ["date", "ngModel"], ["wil", "ngModel"], ["recommendedTo", "ngModel"], [1, "space-y-4"], [1, "text-xl"], [1, "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "date", "type", "date", "required", "", "ng2-datetime-picker", "", "date-only", "true", "name", "date", "placeholder", "YYYY-MM-DD", 1, "input", "input-bordered", "w-full", 3, "ngModelChange", "ngModel"], [1, "label", "text-error"], ["for", "doc", 1, "fieldset-legend"], [1, "rounded-lg", "border-2", "border-dashed", "border-gray-300", "p-2"], [1, "flex", "gap-2", "items-center"], ["type", "checkbox", "id", "defaultInline1", "name", "isWil", 1, "checkbox", "checkbox-sm", 3, "ngModelChange", "ngModel"], ["for", "defaultInline1", 1, "custom-control-label"], [1, "rounded-lg", "flex", "items-center", "gap-2", "border-2", "border-dashed", "border-gray-300", "p-2"], ["type", "checkbox", "name", "status", "ngModel", "", "value", "CEU", "required", "", 1, "checkbox", "checkbox-sm", 3, "change"], ["for", "defaultInline3", 1, "label"], ["type", "checkbox", "name", "status", "ngModel", "", "value", "COLL", "required", "", 1, "checkbox", "checkbox-sm", 3, "change"], ["for", "defaultInline4", 1, "label"], ["type", "checkbox", "name", "status", "ngModel", "", "value", "TLP", "required", "", 1, "checkbox", "checkbox-sm", 3, "change"], ["for", "defaultInline5", 1, "label"], [1, "label", "label-text-alt", "text-error"], ["itemAlias", "review-start", 3, "pid", "url"], [1, "form-control", "mt-4"], ["type", "button", 1, "btn", "btn-sm", "btn-primary", "w-full", 3, "click", "disabled"]], template: function TLUCEUQAStartComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4)(1, "h3", 5);
            i0.ɵɵtext(2, "Start Internal Consultation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 6, 0)(5, "fieldset", 7)(6, "legend", 8);
            i0.ɵɵtext(7, "Date");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "input", 9, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function TLUCEUQAStartComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.date, $event) || (ctx.model.date = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(10, TLUCEUQAStartComponent_Conditional_10_Template, 2, 0, "div", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "fieldset", 7)(12, "legend", 11);
            i0.ɵɵtext(13, "WIL Component (optional)");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 12)(15, "div", 13)(16, "input", 14, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function TLUCEUQAStartComponent_Template_input_ngModelChange_16_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.model.includesWilComponent, $event) || (ctx.model.includesWilComponent = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(18, "label", 15);
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(20, "fieldset", 7)(21, "legend", 8);
            i0.ɵɵtext(22, "Recommend to");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 16)(24, "div", 13)(25, "input", 17, 3);
            i0.ɵɵlistener("change", function TLUCEUQAStartComponent_Template_input_change_25_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onChecked($event)); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "label", 18);
            i0.ɵɵtext(28, "CEU");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "div", 13)(30, "input", 19, 3);
            i0.ɵɵlistener("change", function TLUCEUQAStartComponent_Template_input_change_30_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onChecked($event)); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(32, "label", 20);
            i0.ɵɵtext(33, "COLL");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(34, "div", 13)(35, "input", 21, 3);
            i0.ɵɵlistener("change", function TLUCEUQAStartComponent_Template_input_change_35_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onChecked($event)); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "label", 22);
            i0.ɵɵtext(38, "TLP");
            i0.ɵɵelementEnd()()();
            i0.ɵɵconditionalCreate(39, TLUCEUQAStartComponent_Conditional_39_Template, 2, 0, "span", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(40, "fieldset", 7)(41, "legend", 8);
            i0.ɵɵtext(42, "Drafted Programme");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(43, "file-upload", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(44, "div", 25)(45, "button", 26);
            i0.ɵɵlistener("click", function TLUCEUQAStartComponent_Template_button_click_45_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUpload()); });
            i0.ɵɵtext(46, " Submit ");
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const consultForm_r2 = i0.ɵɵreference(4);
            const date_r3 = i0.ɵɵreference(9);
            const recommendedTo_r4 = i0.ɵɵreference(26);
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.date);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(date_r3.invalid && date_r3.touched ? 10 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵtwoWayProperty("ngModel", ctx.model.includesWilComponent);
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", ctx.model.includesWilComponent ? "Includes" : "Excludes", " WIL Component ");
            i0.ɵɵadvance(20);
            i0.ɵɵconditional(ctx.model.recommendedTo.length < 1 && recommendedTo_r4.invalid && recommendedTo_r4.touched ? 39 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader.queue.length) || consultForm_r2.invalid);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.CheckboxControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.CheckboxRequiredValidator, i1.NgModel, i1.NgForm, FileUploadModule, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TLUCEUQAStartComponent, [{
        type: Component,
        args: [{ selector: 'tlu-ceu-qa-start', imports: [FormsModule, FileUploadModule, FileUploadComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">Start Internal Consultation</h3>\r\n  <form #consultForm=\"ngForm\" class=\"space-y-2\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Date</legend>\r\n      <input id=\"date\" type=\"date\" class=\"input input-bordered w-full\" required [(ngModel)]=\"model.date\"\r\n        ng2-datetime-picker date-only=\"true\" name=\"date\" placeholder=\"YYYY-MM-DD\" #date=\"ngModel\" />\r\n      @if(date.invalid && date.touched){\r\n      <div class=\"label text-error\">Consultation date required*</div>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\" for=\"doc\">WIL Component (optional)</legend>\r\n      <div class=\"rounded-lg border-2 border-dashed border-gray-300 p-2\">\r\n        <div class=\"flex gap-2 items-center\">\r\n          <input type=\"checkbox\" class=\"checkbox checkbox-sm\" id=\"defaultInline1\" name=\"isWil\"\r\n            [(ngModel)]=\"model.includesWilComponent\" #wil=\"ngModel\">\r\n\r\n          <label class=\"custom-control-label\" for=\"defaultInline1\"> {{model.includesWilComponent?'Includes':'Excludes'}}\r\n            WIL\r\n            Component\r\n          </label>\r\n        </div>\r\n      </div>\r\n      <!-- <div [hidden]=\"model.wil ===true || model.distance ===true\" class=\"alert alert-danger\"></div> -->\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Recommend to</legend>\r\n      <div class=\"rounded-lg flex items-center gap-2 border-2 border-dashed border-gray-300 p-2\">\r\n        <div class=\"flex gap-2 items-center\">\r\n          <input type=\"checkbox\" class=\"checkbox checkbox-sm\" name=\"status\" ngModel value=\"CEU\" required\r\n            #recommendedTo=\"ngModel\" (change)=\"onChecked($event)\">\r\n          <label class=\"label\" for=\"defaultInline3\">CEU</label>\r\n        </div>\r\n        <div class=\"flex gap-2 items-center\">\r\n          <input type=\"checkbox\" class=\"checkbox checkbox-sm\" name=\"status\" ngModel value=\"COLL\" required\r\n            #recommendedTo=\"ngModel\" (change)=\"onChecked($event)\">\r\n          <label class=\"label\" for=\"defaultInline4\">COLL</label>\r\n        </div>\r\n        <div class=\"flex gap-2 items-center\">\r\n          <input type=\"checkbox\" class=\"checkbox checkbox-sm\" name=\"status\" ngModel value=\"TLP\" required\r\n            #recommendedTo=\"ngModel\" (change)=\"onChecked($event)\">\r\n          <label class=\"label\" for=\"defaultInline5\">TLP</label>\r\n        </div>\r\n      </div>\r\n      @if (this.model.recommendedTo.length<1 && recommendedTo.invalid && recommendedTo.touched) { <span\r\n        class=\"label label-text-alt text-error\">\r\n        Recommend to at least one body required*\r\n        </span>\r\n        }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Drafted Programme</legend>\r\n      <file-upload [pid]=\"pid\" itemAlias=\"review-start\" [url]=\"url\"></file-upload>\r\n    </fieldset>\r\n\r\n    <div class=\"form-control mt-4\">\r\n      <button type=\"button\" class=\"btn btn-sm btn-primary w-full\" (click)=\"onUpload()\"\r\n        [disabled]=\"!fileUpload?.uploader.queue.length || consultForm.invalid\">\r\n        Submit\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TLUCEUQAStartComponent, { className: "TLUCEUQAStartComponent", filePath: "src/app/components/forms/internal-tlu-ceu-qa-start/tlu-ceu-qa-start.component.ts", lineNumber: 18 }); })();
