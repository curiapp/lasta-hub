import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';
import * as i0 from "@angular/core";
export class CurriculumDevDraftPduApprovalComponent {
    url = `${environment.apiUrl}/curriculum-development/draft/validate`;
    model = {};
    devCode;
    decision;
    pid;
    fileUpload;
    onUpload(decision = "") {
        this.fileUpload.onUpload({ decision });
    }
    static ɵfac = function CurriculumDevDraftPduApprovalComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CurriculumDevDraftPduApprovalComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CurriculumDevDraftPduApprovalComponent, selectors: [["pd-curriculum-dev-draft-pdu-approval"]], viewQuery: function CurriculumDevDraftPduApprovalComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(FileUploadComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.fileUpload = _t.first);
        } }, inputs: { pid: "pid" }, decls: 15, vars: 4, consts: [[1, "space-y-4"], [1, "text-xl"], [1, "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], ["itemAlias", "check-list", 3, "pid", "url"], [1, "flex", "items-center", "justify-center", "gap-2"], ["type", "button", 1, "btn", "btn-sm", "btn-primary", "btn-s", "flex-auto", 3, "click", "disabled"], ["type", "button", 1, "btn", "btn-sm", "btn-accent", 3, "click", "disabled"], [1, "material-symbols-rounded"]], template: function CurriculumDevDraftPduApprovalComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h3", 1);
            i0.ɵɵtext(2, "Draft Curriculum - PDQA Recomendation ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "div", 2)(4, "fieldset", 3)(5, "legend", 4);
            i0.ɵɵtext(6, "Draft Curriculum");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(7, "file-upload", 5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 6)(9, "button", 7);
            i0.ɵɵlistener("click", function CurriculumDevDraftPduApprovalComponent_Template_button_click_9_listener() { return ctx.onUpload("approve"); });
            i0.ɵɵtext(10, " Recommended for consultation ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "button", 8);
            i0.ɵɵlistener("click", function CurriculumDevDraftPduApprovalComponent_Template_button_click_11_listener() { return ctx.onUpload("decline"); });
            i0.ɵɵtext(12, " Request Resubmission ");
            i0.ɵɵelementStart(13, "span", 9);
            i0.ɵɵtext(14, " undo ");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("pid", ctx.pid)("url", ctx.url);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", !(ctx.fileUpload == null ? null : ctx.fileUpload.uploader == null ? null : ctx.fileUpload.uploader.queue.length));
        } }, dependencies: [FormsModule, FileUploadComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CurriculumDevDraftPduApprovalComponent, [{
        type: Component,
        args: [{ selector: 'pd-curriculum-dev-draft-pdu-approval', imports: [FormsModule, FileUploadComponent], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">Draft Curriculum - PDQA Recomendation </h3>\r\n  <div class=\"space-y-2\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Draft Curriculum</legend>\r\n      <file-upload [pid]=\"pid\" [url]=\"url\" itemAlias=\"check-list\"></file-upload>\r\n    </fieldset>\r\n\r\n    <div class=\"flex items-center justify-center gap-2\">\r\n      <button type=\"button\" class=\"btn btn-sm btn-primary btn-s flex-auto\" (click)=\"onUpload('approve')\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length\">\r\n        Recommended for consultation\r\n      </button>\r\n      <button type=\"button\" class=\"btn btn-sm btn-accent\" (click)=\"onUpload('decline')\"\r\n        [disabled]=\"!fileUpload?.uploader?.queue.length\">\r\n        Request Resubmission\r\n        <span class=\"material-symbols-rounded\">\r\n          undo\r\n        </span>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n" }]
    }], null, { pid: [{
            type: Input
        }], fileUpload: [{
            type: ViewChild,
            args: [FileUploadComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CurriculumDevDraftPduApprovalComponent, { className: "CurriculumDevDraftPduApprovalComponent", filePath: "src/app/components/forms/pd-curriculum-dev-draft-pdu-approval/curriculum-dev-draft-pdu-approval.component.ts", lineNumber: 11 }); })();
