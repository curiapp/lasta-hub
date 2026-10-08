import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";
import * as i0 from "@angular/core";
export class CurriculumDevDraftReviseComponent {
    url = `${environment.apiUrl}/curriculum-development/draft/revise`;
    model = {};
    endDate;
    pid;
    fileUpload;
    onUpload() {
        this.fileUpload.onUpload({});
    }
    static ɵfac = function CurriculumDevDraftReviseComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CurriculumDevDraftReviseComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CurriculumDevDraftReviseComponent, selectors: [["pd-curriculum-revise"]], viewQuery: function CurriculumDevDraftReviseComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 13, vars: 3, consts: [[1, "space-y-4"], [1, "text-xl"], [1, "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], ["itemAlias", "survey", 3, "pid", "url"], [1, "flex", "justify-center"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "w-full", 3, "click", "disabled"], [1, "material-symbols-rounded"]], template: function CurriculumDevDraftReviseComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h3", 1);
            i0.ɵɵtext(2, "Curriculum - Drafting");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2)(4, "fieldset", 3)(5, "legend", 4);
            i0.ɵɵtext(6, "Draft Curriculum");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(7, "file-upload", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 6)(9, "button", 7);
            i0.ɵɵlistener("click", function CurriculumDevDraftReviseComponent_Template_button_click_9_listener() { return ctx.onUpload(); });
            i0.ɵɵtext(10, " Submit to PDU ");
            i0.ɵɵelementStart(11, "span", 8);
            i0.ɵɵtext(12, " cloud_upload ");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length));
        } }, dependencies: [FormsModule, FileUploadModule, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CurriculumDevDraftReviseComponent, [{
        type: Component,
        args: [{ selector: 'pd-curriculum-revise', imports: [FormsModule, FileUploadModule, FileUploadComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">Curriculum - Drafting</h3>\r\n  <div class=\"space-y-2\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Draft Curriculum</legend>\r\n      <file-upload [pid]=\"pid\" [url]=\"url\" itemAlias=\"survey\"></file-upload>\r\n    </fieldset>\r\n\r\n    <div class=\"flex justify-center\">\r\n      <button type=\"button\" class=\"btn btn-primary btn-sm w-full\" (click)=\"onUpload()\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length\">\r\n        Submit to PDU\r\n        <span class=\"material-symbols-rounded\">\r\n          cloud_upload\r\n        </span>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CurriculumDevDraftReviseComponent, { className: "CurriculumDevDraftReviseComponent", filePath: "src/app/components/forms/pd-curriculum-dev-draft-revise/curriculum-dev-draft-revise.component.ts", lineNumber: 12 }); })();
