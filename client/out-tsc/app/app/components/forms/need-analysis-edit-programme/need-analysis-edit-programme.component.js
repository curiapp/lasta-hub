import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { StartNeedAnalysisService } from '../../../services/start-need-analysis.service';
import { ToastService } from '../../../services/toast.service';
import { NQFLevel } from '../../../static';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function NeedAnalysisEditProgramComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 10);
    i0.ɵɵtext(1, " Programme title required* ");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisEditProgramComponent_Conditional_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵtext(1, " Programme code required* ");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisEditProgramComponent_For_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 15);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const level_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", level_r3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(level_r3);
} }
function NeedAnalysisEditProgramComponent_Conditional_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "span", 10);
    i0.ɵɵtext(2, "NQF Level required*");
    i0.ɵɵelementEnd()();
} }
function NeedAnalysisEditProgramComponent_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 19)(1, "span", 21);
    i0.ɵɵtext(2, "edit");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4, "Update");
    i0.ɵɵelementEnd()();
} }
function NeedAnalysisEditProgramComponent_Conditional_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 20);
} }
export class NeedAnalysisEditProgramComponent {
    programme;
    levels = NQFLevel;
    _loading = inject(LoadingService);
    needAnalysisService = inject(StartNeedAnalysisService);
    toast = inject(ToastService);
    modalControl = inject(ModalControlService);
    apollo = inject(Apollo);
    updateProgramme(form) {
        if (form.valid) {
            this.needAnalysisService.updateNeedAnalysis({ ...form.value, id: this.programme.id }).subscribe({
                next: (response) => {
                    this.toast.success(response?.message);
                    this.modalControl.close();
                    this.apollo.client.refetchQueries({
                        include: ['GetProgramme']
                    });
                },
                error: (error) => {
                    this.toast.error("Error updating programme: " + error?.message);
                    this.modalControl.close();
                }
            });
        }
    }
    static ɵfac = function NeedAnalysisEditProgramComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NeedAnalysisEditProgramComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NeedAnalysisEditProgramComponent, selectors: [["need-analysis-edit-program"]], inputs: { programme: "programme" }, decls: 31, vars: 8, consts: [["updateProgrammeForm", "ngForm"], ["ptitle", "ngModel"], ["code", "ngModel"], ["level", "ngModel"], [1, "space-y-1"], [1, "text-2xl"], [1, "space-y-3", 3, "ngSubmit"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "title", "type", "text", "required", "", "name", "title", 1, "input", "input-bordered", 3, "ngModel"], [1, "label", "label-text-alt", "text-error"], ["id", "programmeCode", "type", "text", "required", "", "name", "code", 1, "input", "input-bordered", 3, "ngModel"], [1, "label-text", "label-text-alt", "text-error"], ["title", "Select level", "required", "", "name", "level", 1, "select", "select-bordered", "w-full", 3, "ngModel"], ["disabled", ""], [3, "value"], [1, "label"], [1, "form-control", "gap-2"], ["type", "submit", 1, "btn", "btn-sm", "btn-primary", "w-full", "flex", "gap-1", "items-center", 3, "disabled"], [1, "flex", "items-center", "gap-2"], [1, "loading", "loading-spinner", "loading-sm"], [1, "material-symbols-rounded"]], template: function NeedAnalysisEditProgramComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 4)(1, "h3", 5);
            i0.ɵɵtext(2, "Edit Programme");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 6, 0);
            i0.ɵɵlistener("ngSubmit", function NeedAnalysisEditProgramComponent_Template_form_ngSubmit_3_listener() { i0.ɵɵrestoreView(_r1); const updateProgrammeForm_r2 = i0.ɵɵreference(4); return i0.ɵɵresetView(ctx.updateProgramme(updateProgrammeForm_r2)); });
            i0.ɵɵelementStart(5, "fieldset", 7)(6, "legend", 8);
            i0.ɵɵtext(7, "Proposed Programme Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(8, "input", 9, 1);
            i0.ɵɵconditionalCreate(10, NeedAnalysisEditProgramComponent_Conditional_10_Template, 2, 0, "span", 10);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(11, "fieldset", 7)(12, "legend", 8);
            i0.ɵɵtext(13, "Proposed Programme Code");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(14, "input", 11, 2);
            i0.ɵɵconditionalCreate(16, NeedAnalysisEditProgramComponent_Conditional_16_Template, 2, 0, "span", 12);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "fieldset", 7)(18, "legend", 8);
            i0.ɵɵtext(19, "NQF Level");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(20, "select", 13, 3)(22, "option", 14);
            i0.ɵɵtext(23, "Select NQF Level");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(24, NeedAnalysisEditProgramComponent_For_25_Template, 2, 2, "option", 15, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(26, NeedAnalysisEditProgramComponent_Conditional_26_Template, 3, 0, "div", 16);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "div", 17)(28, "button", 18);
            i0.ɵɵconditionalCreate(29, NeedAnalysisEditProgramComponent_Conditional_29_Template, 5, 0, "span", 19)(30, NeedAnalysisEditProgramComponent_Conditional_30_Template, 1, 0, "span", 20);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const updateProgrammeForm_r2 = i0.ɵɵreference(4);
            const ptitle_r4 = i0.ɵɵreference(9);
            const code_r5 = i0.ɵɵreference(15);
            const level_r6 = i0.ɵɵreference(21);
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngModel", ctx.programme.title);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ptitle_r4.invalid && ptitle_r4.touched ? 10 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngModel", ctx.programme.code);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(code_r5.invalid && code_r5.touched ? 16 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngModel", ctx.programme.level);
            i0.ɵɵadvance(4);
            i0.ɵɵrepeater(ctx.levels);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(level_r6.invalid && level_r6.touched ? 26 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("disabled", updateProgrammeForm_r2.form.invalid);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!(ctx._loading == null ? null : ctx._loading.isLoading()) ? 29 : 30);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.NgModel, i1.NgForm], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NeedAnalysisEditProgramComponent, [{
        type: Component,
        args: [{ selector: 'need-analysis-edit-program', imports: [FormsModule], template: "<div class=\"space-y-1\">\r\n  <h3 class=\"text-2xl\">Edit Programme</h3>\r\n  <form (ngSubmit)=\"updateProgramme(updateProgrammeForm)\" #updateProgrammeForm=\"ngForm\" class=\"space-y-3\">\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Proposed Programme Title</legend>\r\n      <input id=\"title\" type=\"text\" class=\"input input-bordered\" required [ngModel]=\"programme.title\" name=\"title\"\r\n        #ptitle=\"ngModel\">\r\n      @if (ptitle.invalid && ptitle.touched) {\r\n      <span class=\"label label-text-alt text-error\">\r\n        Programme title required*\r\n      </span>\r\n      }\r\n    </fieldset>\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">Proposed Programme Code</legend>\r\n      <input id=\"programmeCode\" type=\"text\" class=\"input input-bordered\" required [ngModel]=\"programme.code\" name=\"code\"\r\n        #code=\"ngModel\">\r\n      @if (code.invalid && code.touched) {\r\n      <span class=\"label-text label-text-alt text-error\">\r\n        Programme code required*\r\n      </span>\r\n      }\r\n    </fieldset>\r\n\r\n\r\n    <fieldset class=\"fieldset\">\r\n      <legend class=\"fieldset-legend\">NQF Level</legend>\r\n      <select class=\"select select-bordered w-full\" title=\"Select level\" required [ngModel]=\"programme.level\"\r\n        name=\"level\" #level=\"ngModel\">\r\n        <option disabled>Select NQF Level</option>\r\n        @for (level of levels;track level){\r\n        <option [value]=\"level\">{{level}}</option>\r\n        }\r\n      </select>\r\n      @if (level.invalid && level.touched) {\r\n      <div class=\"label\">\r\n        <span class=\"label label-text-alt text-error\">NQF Level required*</span>\r\n      </div>\r\n      }\r\n    </fieldset>\r\n\r\n    <div class=\"form-control gap-2\">\r\n      <button type=\"submit\" class=\"btn btn-sm btn-primary w-full flex gap-1 items-center\"\r\n        [disabled]=\"updateProgrammeForm.form.invalid\">\r\n        @if (!_loading?.isLoading()) {\r\n        <span class=\"flex items-center gap-2\">\r\n          <span class=\"material-symbols-rounded\">edit</span>\r\n          <span>Update</span>\r\n        </span>\r\n        } @else {\r\n        <span class=\"loading loading-spinner loading-sm\"></span>\r\n        }\r\n      </button>\r\n    </div>\r\n  </form>\r\n</div>\r\n" }]
    }], null, { programme: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NeedAnalysisEditProgramComponent, { className: "NeedAnalysisEditProgramComponent", filePath: "src/app/components/forms/need-analysis-edit-programme/need-analysis-edit-programme.component.ts", lineNumber: 17 }); })();
