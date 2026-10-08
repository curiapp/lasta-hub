import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { StartNeedAnalysisService } from '../../../services/start-need-analysis.service';
import { ToastService } from '../../../services/toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
function CreateProgrammeComponent_Conditional_8_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 27)(1, "span", 28);
    i0.ɵɵtext(2, "account_balance");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.faculty == null ? null : ctx_r1.currentUser.faculty.name, " ");
} }
function CreateProgrammeComponent_Conditional_8_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 27)(1, "span", 28);
    i0.ɵɵtext(2, "groups");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.department == null ? null : ctx_r1.currentUser.department.name, " ");
} }
function CreateProgrammeComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵconditionalCreate(1, CreateProgrammeComponent_Conditional_8_Conditional_1_Template, 4, 1, "span", 27);
    i0.ɵɵconditionalCreate(2, CreateProgrammeComponent_Conditional_8_Conditional_2_Template, 4, 1, "span", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional((ctx_r1.currentUser == null ? null : ctx_r1.currentUser.faculty == null ? null : ctx_r1.currentUser.faculty.name) ? 1 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional((ctx_r1.currentUser == null ? null : ctx_r1.currentUser.department == null ? null : ctx_r1.currentUser.department.name) ? 2 : -1);
} }
function CreateProgrammeComponent_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1, "Enter a programme title of at least 3 characters.");
    i0.ɵɵelementEnd();
} }
function CreateProgrammeComponent_Conditional_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1, "Enter a valid programme code.");
    i0.ɵɵelementEnd();
} }
function CreateProgrammeComponent_For_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const singleLevel_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngValue", singleLevel_r4);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Level ", singleLevel_r4);
} }
function CreateProgrammeComponent_Conditional_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 17);
    i0.ɵɵtext(1, "Select the programme\u2019s NQF level.");
    i0.ɵɵelementEnd();
} }
function CreateProgrammeComponent_Conditional_56_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 29);
    i0.ɵɵtext(1, " Creating ");
} }
function CreateProgrammeComponent_Conditional_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 30);
    i0.ɵɵtext(1, "add");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(2, " Create programme ");
} }
export class CreateProgrammeComponent {
    levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    programme = { code: "", title: "", faculty: "", department: "", initiator: "", level: 0 };
    _loading = inject(LoadingService);
    _http = inject(ClientService);
    router = inject(Router);
    toast = inject(ToastService);
    apollo = inject(Apollo);
    modalControl = inject(ModalControlService);
    currentUser;
    ngOnInit() {
        let user = sessionStorage.getItem("loggedInUser");
        if (user) {
            this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
            this.programme.initiator = this.currentUser?.id;
            this.programme.faculty = this.currentUser?.faculty?.id;
            this.programme.department = this.currentUser?.department?.id;
        }
    }
    onSubmit(form) {
        this._http.post('programmes', {
            ...this.programme,
            workflowSlug: 'lasta-programme-development',
        })
            .subscribe({
            next: (data) => {
                form.reset();
                this.toast.success(data?.message ?? "Programme created and workflow started");
                this.modalControl.close();
                this.apollo.client.refetchQueries({
                    include: ['V2GetProgrammes', 'V2GetBootstrap']
                });
            },
            error: (error) => {
                this.modalControl.close();
                this.toast?.error("Failed to create new programme ");
            }
        });
    }
    static ɵfac = function CreateProgrammeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CreateProgrammeComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CreateProgrammeComponent, selectors: [["create-programme"]], features: [i0.ɵɵProvidersFeature([StartNeedAnalysisService])], decls: 58, vars: 16, consts: [["programmeForm", "ngForm"], ["title", "ngModel"], ["code", "ngModel"], ["level", "ngModel"], [1, "w-full", "max-w-xl"], [1, "border-b", "border-base-300", "pb-3"], [1, "text-xs", "font-bold", "uppercase", "text-base-content/50"], [1, "mt-1", "text-xl", "font-bold"], [1, "mt-1", "text-sm", "text-base-content/60"], [1, "mt-3", "flex", "flex-wrap", "gap-2"], [1, "mt-4", "grid", "gap-4", 3, "ngSubmit"], [1, "form-control"], [1, "mb-1", "text-xs", "font-semibold"], [1, "text-error"], [1, "input", "input-bordered", "flex", "items-center", "gap-2"], [1, "material-symbols-rounded", "text-lg", "text-base-content/40"], ["id", "programmeTitle", "type", "text", "required", "", "minlength", "3", "name", "title", "placeholder", "e.g. Bachelor of Data Science", 1, "grow", 3, "ngModelChange", "ngModel"], [1, "mt-1", "text-xs", "text-error"], [1, "grid", "gap-4", "sm:grid-cols-[1fr_0.75fr]"], ["id", "programmeCode", "type", "text", "required", "", "minlength", "2", "name", "code", "placeholder", "e.g. BDS", 1, "grow", "uppercase", 3, "ngModelChange", "ngModel"], ["required", "", "name", "level", 1, "select", "select-bordered", "w-full", 3, "ngModelChange", "ngModel"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], ["role", "note", 1, "flex", "items-start", "gap-2", "rounded-md", "bg-info/10", "p-3", "text-xs", "text-base-content/65"], [1, "material-symbols-rounded", "text-info"], [1, "flex", "items-center", "justify-end", "gap-2", "border-t", "border-base-300", "pt-3"], ["type", "submit", 1, "btn", "btn-primary", "btn-sm", "min-w-36", 3, "disabled"], [1, "badge", "badge-ghost", "badge-sm"], [1, "material-symbols-rounded", "text-sm"], [1, "loading", "loading-spinner", "loading-sm"], [1, "material-symbols-rounded", "text-lg"]], template: function CreateProgrammeComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "section", 4)(1, "header", 5)(2, "p", 6);
            i0.ɵɵtext(3, "Programme setup");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "h2", 7);
            i0.ɵɵtext(5, "Create a new programme");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "p", 8);
            i0.ɵɵtext(7, " Add the core programme details and start the development workflow. ");
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(8, CreateProgrammeComponent_Conditional_8_Template, 3, 2, "div", 9);
            i0.ɵɵelementStart(9, "form", 10, 0);
            i0.ɵɵlistener("ngSubmit", function CreateProgrammeComponent_Template_form_ngSubmit_9_listener() { i0.ɵɵrestoreView(_r1); const programmeForm_r3 = i0.ɵɵreference(10); return i0.ɵɵresetView(ctx.onSubmit(programmeForm_r3)); });
            i0.ɵɵelementStart(11, "label", 11)(12, "span", 12);
            i0.ɵɵtext(13, " Programme title ");
            i0.ɵɵelementStart(14, "b", 13);
            i0.ɵɵtext(15, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(16, "label", 14)(17, "span", 15);
            i0.ɵɵtext(18, "school");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(19, "input", 16, 1);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateProgrammeComponent_Template_input_ngModelChange_19_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.programme.title, $event) || (ctx.programme.title = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(21, CreateProgrammeComponent_Conditional_21_Template, 2, 0, "span", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 18)(23, "label", 11)(24, "span", 12);
            i0.ɵɵtext(25, " Programme code ");
            i0.ɵɵelementStart(26, "b", 13);
            i0.ɵɵtext(27, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(28, "label", 14)(29, "span", 15);
            i0.ɵɵtext(30, "tag");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "input", 19, 2);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateProgrammeComponent_Template_input_ngModelChange_31_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.programme.code, $event) || (ctx.programme.code = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(33, CreateProgrammeComponent_Conditional_33_Template, 2, 0, "span", 17);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(34, "label", 11)(35, "span", 12);
            i0.ɵɵtext(36, " NQF level ");
            i0.ɵɵelementStart(37, "b", 13);
            i0.ɵɵtext(38, "*");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(39, "select", 20, 3);
            i0.ɵɵtwoWayListener("ngModelChange", function CreateProgrammeComponent_Template_select_ngModelChange_39_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.programme.level, $event) || (ctx.programme.level = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementStart(41, "option", 21);
            i0.ɵɵtext(42, "Select level");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(43, CreateProgrammeComponent_For_44_Template, 2, 2, "option", 22, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(45, CreateProgrammeComponent_Conditional_45_Template, 2, 0, "span", 17);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "div", 23)(47, "span", 24);
            i0.ɵɵtext(48, "account_tree");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "span");
            i0.ɵɵtext(50, "The programme will begin with the ");
            i0.ɵɵelementStart(51, "strong");
            i0.ɵɵtext(52, "Need Analysis");
            i0.ɵɵelementEnd();
            i0.ɵɵtext(53, " stage after creation.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(54, "footer", 25)(55, "button", 26);
            i0.ɵɵconditionalCreate(56, CreateProgrammeComponent_Conditional_56_Template, 2, 0)(57, CreateProgrammeComponent_Conditional_57_Template, 3, 0);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            const programmeForm_r3 = i0.ɵɵreference(10);
            const title_r5 = i0.ɵɵreference(20);
            const code_r6 = i0.ɵɵreference(32);
            const level_r7 = i0.ɵɵreference(40);
            i0.ɵɵadvance(8);
            i0.ɵɵconditional((ctx.currentUser == null ? null : ctx.currentUser.faculty) || (ctx.currentUser == null ? null : ctx.currentUser.department) ? 8 : -1);
            i0.ɵɵadvance(8);
            i0.ɵɵclassProp("input-error", title_r5.invalid && title_r5.touched);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.programme.title);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(title_r5.invalid && title_r5.touched ? 21 : -1);
            i0.ɵɵadvance(7);
            i0.ɵɵclassProp("input-error", code_r6.invalid && code_r6.touched);
            i0.ɵɵadvance(3);
            i0.ɵɵtwoWayProperty("ngModel", ctx.programme.code);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(code_r6.invalid && code_r6.touched ? 33 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("select-error", level_r7.invalid && level_r7.touched);
            i0.ɵɵtwoWayProperty("ngModel", ctx.programme.level);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngValue", 0);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.levels);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional((level_r7.invalid || ctx.programme.level === 0) && level_r7.touched ? 45 : -1);
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("disabled", programmeForm_r3.invalid || ctx.programme.level === 0 || ctx._loading.isLoading());
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx._loading.isLoading() ? 56 : 57);
        } }, dependencies: [FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.SelectControlValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.RequiredValidator, i1.MinLengthValidator, i1.NgModel, i1.NgForm], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateProgrammeComponent, [{
        type: Component,
        args: [{ selector: 'create-programme', providers: [StartNeedAnalysisService], imports: [FormsModule], template: "<section class=\"w-full max-w-xl\">\n  <header class=\"border-b border-base-300 pb-3\">\n    <p class=\"text-xs font-bold uppercase text-base-content/50\">Programme setup</p>\n    <h2 class=\"mt-1 text-xl font-bold\">Create a new programme</h2>\n    <p class=\"mt-1 text-sm text-base-content/60\">\n      Add the core programme details and start the development workflow.\n    </p>\n  </header>\n\n  @if (currentUser?.faculty || currentUser?.department) {\n    <div class=\"mt-3 flex flex-wrap gap-2\">\n      @if (currentUser?.faculty?.name) {\n        <span class=\"badge badge-ghost badge-sm\">\n          <span class=\"material-symbols-rounded text-sm\">account_balance</span>\n          {{ currentUser?.faculty?.name }}\n        </span>\n      }\n      @if (currentUser?.department?.name) {\n        <span class=\"badge badge-ghost badge-sm\">\n          <span class=\"material-symbols-rounded text-sm\">groups</span>\n          {{ currentUser?.department?.name }}\n        </span>\n      }\n    </div>\n  }\n\n  <form (ngSubmit)=\"onSubmit(programmeForm)\" #programmeForm=\"ngForm\" class=\"mt-4 grid gap-4\">\n    <label class=\"form-control\">\n      <span class=\"mb-1 text-xs font-semibold\">\n        Programme title <b class=\"text-error\">*</b>\n      </span>\n      <label class=\"input input-bordered flex items-center gap-2\"\n        [class.input-error]=\"title.invalid && title.touched\">\n        <span class=\"material-symbols-rounded text-lg text-base-content/40\">school</span>\n        <input id=\"programmeTitle\" type=\"text\" class=\"grow\" required minlength=\"3\"\n          [(ngModel)]=\"programme.title\" name=\"title\" #title=\"ngModel\"\n          placeholder=\"e.g. Bachelor of Data Science\">\n      </label>\n      @if (title.invalid && title.touched) {\n        <span class=\"mt-1 text-xs text-error\">Enter a programme title of at least 3 characters.</span>\n      }\n    </label>\n\n    <div class=\"grid gap-4 sm:grid-cols-[1fr_0.75fr]\">\n      <label class=\"form-control\">\n        <span class=\"mb-1 text-xs font-semibold\">\n          Programme code <b class=\"text-error\">*</b>\n        </span>\n        <label class=\"input input-bordered flex items-center gap-2\"\n          [class.input-error]=\"code.invalid && code.touched\">\n          <span class=\"material-symbols-rounded text-lg text-base-content/40\">tag</span>\n          <input id=\"programmeCode\" type=\"text\" class=\"grow uppercase\" required minlength=\"2\"\n            [(ngModel)]=\"programme.code\" name=\"code\" #code=\"ngModel\" placeholder=\"e.g. BDS\">\n        </label>\n        @if (code.invalid && code.touched) {\n          <span class=\"mt-1 text-xs text-error\">Enter a valid programme code.</span>\n        }\n      </label>\n\n      <label class=\"form-control\">\n        <span class=\"mb-1 text-xs font-semibold\">\n          NQF level <b class=\"text-error\">*</b>\n        </span>\n        <select class=\"select select-bordered w-full\" required [(ngModel)]=\"programme.level\"\n          name=\"level\" #level=\"ngModel\" [class.select-error]=\"level.invalid && level.touched\">\n          <option [ngValue]=\"0\" disabled>Select level</option>\n          @for (singleLevel of levels; track singleLevel) {\n            <option [ngValue]=\"singleLevel\">Level {{ singleLevel }}</option>\n          }\n        </select>\n        @if ((level.invalid || programme.level === 0) && level.touched) {\n          <span class=\"mt-1 text-xs text-error\">Select the programme\u2019s NQF level.</span>\n        }\n      </label>\n    </div>\n\n    <div role=\"note\" class=\"flex items-start gap-2 rounded-md bg-info/10 p-3 text-xs text-base-content/65\">\n      <span class=\"material-symbols-rounded text-info\">account_tree</span>\n      <span>The programme will begin with the <strong>Need Analysis</strong> stage after creation.</span>\n    </div>\n\n    <footer class=\"flex items-center justify-end gap-2 border-t border-base-300 pt-3\">\n      <button type=\"submit\" class=\"btn btn-primary btn-sm min-w-36\"\n        [disabled]=\"programmeForm.invalid || programme.level === 0 || _loading.isLoading()\">\n        @if (_loading.isLoading()) {\n          <span class=\"loading loading-spinner loading-sm\"></span>\n          Creating\n        } @else {\n          <span class=\"material-symbols-rounded text-lg\">add</span>\n          Create programme\n        }\n      </button>\n    </footer>\n  </form>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(CreateProgrammeComponent, { className: "CreateProgrammeComponent", filePath: "src/app/components/forms/create-programme/create-programmme.component.ts", lineNumber: 21 }); })();
