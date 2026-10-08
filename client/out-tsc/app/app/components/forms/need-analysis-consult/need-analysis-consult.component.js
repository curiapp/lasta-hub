import { Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileExtensionPipe } from "../../../pipes/file-extension.pipe";
import { FilePipe } from "../../../pipes/file.pipe";
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "ng2-file-upload";
function NeedAnalysisConsultationComponent_Conditional_5_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 12);
    i0.ɵɵtext(1, "Start date required*");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisConsultationComponent_Conditional_5_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "label", 15)(1, "span", 24);
    i0.ɵɵtext(2, "End date required*");
    i0.ɵɵelementEnd()();
} }
function NeedAnalysisConsultationComponent_Conditional_5_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "fieldset", 25)(1, "div", 26)(2, "div", 27)(3, "label", 28)(4, "span", 29);
    i0.ɵɵtext(5, " contact_page ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "input", 30, 3);
    i0.ɵɵtwoWayListener("ngModelChange", function NeedAnalysisConsultationComponent_Conditional_5_Conditional_19_Template_input_ngModelChange_6_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.needAnalysis.stakeholder.name, $event) || (ctx_r1.needAnalysis.stakeholder.name = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "label", 31)(9, "span", 29);
    i0.ɵɵtext(10, " account_tree ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "input", 32, 4);
    i0.ɵɵtwoWayListener("ngModelChange", function NeedAnalysisConsultationComponent_Conditional_5_Conditional_19_Template_input_ngModelChange_11_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.needAnalysis.stakeholder.organisation, $event) || (ctx_r1.needAnalysis.stakeholder.organisation = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "button", 33);
    i0.ɵɵlistener("click", function NeedAnalysisConsultationComponent_Conditional_5_Conditional_19_Template_button_click_13_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.addOrganisation()); });
    i0.ɵɵtext(14, "Add +");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const stakename_r4 = i0.ɵɵreference(7);
    const stakeorg_r5 = i0.ɵɵreference(12);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵclassProp("open", ctx_r1.isStakeholderShown());
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.needAnalysis.stakeholder.name);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.needAnalysis.stakeholder.organisation);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", stakeorg_r5.invalid || stakename_r4.invalid);
} }
function NeedAnalysisConsultationComponent_Conditional_5_For_22_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 21)(1, "div", 34)(2, "p", 35);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 36);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "button", 37);
    i0.ɵɵlistener("click", function NeedAnalysisConsultationComponent_Conditional_5_For_22_Template_button_click_6_listener() { const item_r7 = i0.ɵɵrestoreView(_r6).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeOrganisation(item_r7.organisation)); });
    i0.ɵɵelementStart(7, "span", 38);
    i0.ɵɵtext(8, " close ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const item_r7 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r7.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r7.organisation);
} }
function NeedAnalysisConsultationComponent_Conditional_5_ForEmpty_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 22);
    i0.ɵɵtext(1, "No Stakeholders");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisConsultationComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵanimateEnter("enter-animation1");
    i0.ɵɵelementStart(1, "fieldset", 9)(2, "legend", 10);
    i0.ɵɵtext(3, "Consultation Start Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 11, 1);
    i0.ɵɵtwoWayListener("ngModelChange", function NeedAnalysisConsultationComponent_Conditional_5_Template_input_ngModelChange_4_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.needAnalysis.startDate, $event) || (ctx_r1.needAnalysis.startDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, NeedAnalysisConsultationComponent_Conditional_5_Conditional_6_Template, 2, 0, "span", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "fieldset", 9)(8, "legend", 13);
    i0.ɵɵtext(9, "Consultation End Date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "input", 14, 2);
    i0.ɵɵtwoWayListener("ngModelChange", function NeedAnalysisConsultationComponent_Conditional_5_Template_input_ngModelChange_10_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.needAnalysis.endDate, $event) || (ctx_r1.needAnalysis.endDate = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(12, NeedAnalysisConsultationComponent_Conditional_5_Conditional_12_Template, 3, 0, "label", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 7)(14, "div", 16)(15, "label", 17);
    i0.ɵɵtext(16, "Stakeholders List");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "button", 18);
    i0.ɵɵlistener("click", function NeedAnalysisConsultationComponent_Conditional_5_Template_button_click_17_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleAdd()); });
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(19, NeedAnalysisConsultationComponent_Conditional_5_Conditional_19_Template, 15, 5, "fieldset", 19);
    i0.ɵɵelementStart(20, "div", 20);
    i0.ɵɵrepeaterCreate(21, NeedAnalysisConsultationComponent_Conditional_5_For_22_Template, 9, 2, "div", 21, i0.ɵɵrepeaterTrackByIdentity, false, NeedAnalysisConsultationComponent_Conditional_5_ForEmpty_23_Template, 2, 0, "span", 22);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(24, "button", 23);
    i0.ɵɵlistener("click", function NeedAnalysisConsultationComponent_Conditional_5_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggle()); });
    i0.ɵɵtext(25, " Next ");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const sdate_r8 = i0.ɵɵreference(5);
    const edate_r9 = i0.ɵɵreference(11);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.needAnalysis.startDate);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(sdate_r8.invalid && sdate_r8.touched ? 6 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.needAnalysis.endDate);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(edate_r9.invalid && edate_r9.touched ? 12 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate1(" add stakeholder ", ctx_r1.isStakeholderShown() ? "-" : "+", " ");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.isStakeholderShown() ? 19 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.stakeholders);
} }
function NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1, " draft ");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1, " docs ");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1, " docs ");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1, " csv ");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1, " csv ");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 55);
    i0.ɵɵtext(1, " draft ");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisConsultationComponent_Conditional_6_For_18_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 58);
} }
function NeedAnalysisConsultationComponent_Conditional_6_For_18_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 49)(1, "div", 54);
    i0.ɵɵconditionalCreate(2, NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_2_Template, 2, 0, "span", 55);
    i0.ɵɵpipe(3, "Extension");
    i0.ɵɵconditionalBranchCreate(4, NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_4_Template, 2, 0, "span", 55)(5, NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_5_Template, 2, 0, "span", 55)(6, NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_6_Template, 2, 0, "span", 55)(7, NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_7_Template, 2, 0, "span", 55)(8, NeedAnalysisConsultationComponent_Conditional_6_For_18_Case_8_Template, 2, 0, "span", 55);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 56)(10, "p", 57);
    i0.ɵɵtext(11);
    i0.ɵɵelementStart(12, "b");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "file");
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(15, NeedAnalysisConsultationComponent_Conditional_6_For_18_Conditional_15_Template, 1, 0, "span", 58);
    i0.ɵɵelementStart(16, "button", 59);
    i0.ɵɵlistener("click", function NeedAnalysisConsultationComponent_Conditional_6_For_18_Template_button_click_16_listener() { const item_r12 = i0.ɵɵrestoreView(_r11).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.removeFile(item_r12)); });
    i0.ɵɵelementStart(17, "span", 60);
    i0.ɵɵtext(18, " close ");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    let tmp_12_0;
    const item_r12 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_12_0 = i0.ɵɵpipeBind1(3, 4, item_r12.file.name)) === "pdf" ? 2 : tmp_12_0 === "docs" ? 4 : tmp_12_0 === "docx" ? 5 : tmp_12_0 === "xlsx" ? 6 : tmp_12_0 === "csv" ? 7 : 8);
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate1("", item_r12.file.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(14, 6, item_r12.file.size));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r1.uploader.isUploading ? 15 : -1);
} }
function NeedAnalysisConsultationComponent_Conditional_6_ForEmpty_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 50);
    i0.ɵɵtext(1, "No file selected");
    i0.ɵɵelementEnd();
} }
function NeedAnalysisConsultationComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵanimateEnter("enter-animation");
    i0.ɵɵelementStart(1, "fieldset", 9)(2, "legend", 10);
    i0.ɵɵtext(3, "Upload Questionnaires from Respondents");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 39)(5, "label", 40)(6, "div", 41);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(7, "svg", 42);
    i0.ɵɵelement(8, "path", 43);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(9, "p", 44)(10, "span", 45);
    i0.ɵɵtext(11, "Click to upload");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12, " or drag and drop ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "p", 46);
    i0.ɵɵtext(14, "PDF, DOCX, TXT or XLSX (MAX. 50MB)");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(15, "input", 47);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 48);
    i0.ɵɵrepeaterCreate(17, NeedAnalysisConsultationComponent_Conditional_6_For_18_Template, 19, 8, "div", 49, i0.ɵɵrepeaterTrackByIndex, false, NeedAnalysisConsultationComponent_Conditional_6_ForEmpty_19_Template, 2, 0, "span", 50);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 51)(21, "button", 52);
    i0.ɵɵlistener("click", function NeedAnalysisConsultationComponent_Conditional_6_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggle()); });
    i0.ɵɵtext(22, "Prev");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "button", 53);
    i0.ɵɵlistener("click", function NeedAnalysisConsultationComponent_Conditional_6_Template_button_click_23_listener() { i0.ɵɵrestoreView(_r10); const ctx_r1 = i0.ɵɵnextContext(); const consultForm_r13 = i0.ɵɵreference(4); return i0.ɵɵresetView(ctx_r1.uploadAll(consultForm_r13)); });
    i0.ɵɵtext(24, " submit ");
    i0.ɵɵelementStart(25, "span", 29);
    i0.ɵɵtext(26, " cloud_upload ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("uploader", ctx_r1.uploader);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("uploader", ctx_r1.uploader);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r1.uploader.queue);
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("disabled", !ctx_r1.uploader.queue.length);
} }
export class NeedAnalysisConsultationComponent {
    router;
    _location;
    url = `${environment.apiUrl}/need-analysis/consult`;
    pid;
    toast = inject(ToastService);
    modalControl = inject(ModalControlService);
    isStakeholderShown = signal(false, ...(ngDevMode ? [{ debugName: "isStakeholderShown" }] : []));
    isShown = signal(false, ...(ngDevMode ? [{ debugName: "isShown" }] : []));
    apollo = inject(Apollo);
    constructor(router, _location) {
        this.router = router;
        this._location = _location;
    }
    toggleAdd() {
        this.isStakeholderShown.update((isShown) => !isShown);
    }
    toggle() {
        this.isShown.update((isShown) => !isShown);
    }
    needAnalysis = {
        startDate: new Date(),
        endDate: new Date(),
        stakeholder: { name: '', organisation: '' },
    };
    stakeholders = [];
    uploader = new FileUploader({
        url: this.url,
        itemAlias: 'files',
        maxFileSize: 50 * 1024 * 1024,
        method: 'POST',
        headers: [
            { name: 'Authorization', value: 'Bearer YOUR_TOKEN' }, // If using JWT authentication
            { name: 'X-Requested-With', value: 'XMLHttpRequest' },
        ]
    });
    addOrganisation() {
        this.stakeholders.push(this.needAnalysis.stakeholder);
        this.needAnalysis.stakeholder = { name: '', organisation: '' };
    }
    removeOrganisation(value) {
        this.stakeholders = this.stakeholders.filter((item) => item.organisation !== value);
    }
    ngOnInit() {
        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onBuildItemForm = (item, form) => {
            form.append('programmeId', this.pid);
            form.append('startDate', this.needAnalysis.startDate);
            form.append('endDate', this.needAnalysis.endDate);
            form.append('organizations', JSON.stringify(this.stakeholders));
        };
        this.uploader.onCompleteItem = (item, response, status, headers) => {
            if (status === 201 || status === 200) {
                const res = JSON.parse(response);
                this.modalControl.close();
                this.uploader.clearQueue();
                this.toast?.success(res?.message);
                this.apollo.client.refetchQueries({
                    include: ['GetProgrammePhase']
                });
            }
            else if (status == 500) {
                this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
                this.modalControl.close();
            }
            else {
                this.modalControl.close();
                this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
            }
        };
    }
    removeFile(item) {
        this.uploader.removeFromQueue(item);
    }
    uploadAll(item) {
        this.uploader.uploadAll();
    }
    static ɵfac = function NeedAnalysisConsultationComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NeedAnalysisConsultationComponent)(i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.Location)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NeedAnalysisConsultationComponent, selectors: [["need-analysis-consult"]], inputs: { pid: "pid" }, decls: 7, vars: 2, consts: [["consultForm", "ngForm"], ["sdate", "ngModel"], ["edate", "ngModel"], ["stakename", "ngModel"], ["stakeorg", "ngModel"], [1, "space-y-4"], [1, "text-xl"], [1, "space-y-2"], [1, "next-page", "space-y-2"], [1, "fieldset"], [1, "fieldset-legend"], ["id", "sdate", "type", "date", "required", "", "date-only", "true", "name", "sDate", "placeholder", "YYYY-MM-DD", 1, "input", 3, "ngModelChange", "ngModel"], [1, "label", "text-error"], ["for", "date", 1, "fieldset-legend"], ["id", "edate", "type", "date", "required", "", "date-only", "true", "name", "eDate", "placeholder", "YYYY-MM-DD", 1, "input", "input-sm", 3, "ngModelChange", "ngModel"], [1, "fieldset-label"], [1, "flex", "justify-between", "gap-2"], [1, "text-base", "font-semibold"], [1, "btn", "btn-xs", "btn-outline", "btn-primary", 3, "click"], [1, "stakeholder-input-container", 3, "open"], [1, "flex", "gap-2", "flex-wrap", "p-2", "rounded-xl", "border-dashed", "border-2", "border-gray-300"], [1, "group", "px-2", "py-2", "rounded-md", "bg-gray-200", "flex", "gap-4", "items-center", "justify-between", "transition-all"], [1, "text-xs", "pl-2", "font-semibold"], [1, "btn", "btn-primary", "btn-sm", "w-full", "mt-4", 3, "click"], [1, "label-text-alt", "text-error"], [1, "stakeholder-input-container"], [1, "flex", "h-fit", "items-center", "gap-1", "border-2", "border-dashed", "border-gray-300", "rounded-box", "p-2"], [1, "w-auto", "flex-auto"], [1, "input", "input-sm", "border-b-0", "rounded-b-none", "rounded-r-none", "flex", "flex-auto", "gap-2", "items-center"], [1, "material-symbols-rounded"], ["type", "text", "placeholder", "Enter stakeholder name", "id", "organisation", "name", "organisation", "required", "", 1, "flex-auto", 3, "ngModelChange", "ngModel"], [1, "input", "input-sm", "rounded-r-none", "rounded-t-none", "flex", "flex-auto", "gap-2", "items-center"], ["type", "text", "placeholder", "Enter stakeholder organisation", "id", "organisation", "name", "organisation", "required", "", 1, "flex-auto", 3, "ngModelChange", "ngModel"], [1, "btn", "rounded-l-none", "btn-primary", "h-18!", 3, "click", "disabled"], [1, "space-y-1"], [1, "line-clamp-2", "text-sm", "capitalize"], [1, "line-clamp-2", "text-xs", "capitalize"], [1, "btn", "btn-ghost", "btn-circle", "transition", "btn-xs", "hidden", "group-hover:block", 3, "click"], [1, "material-symbols-rounded", "text-xs"], [1, "flex", "items-center", "justify-center", "w-full"], ["for", "dropzone-file", "ng2FileDrop", "", 1, "flex", "flex-col", "items-center", "justify-center", "w-full", "h-28", "border-2", "border-gray-300", "border-dashed", "rounded-box", "cursor-pointer", "bg-gray-50", "hover:bg-gray-100", 3, "uploader"], [1, "flex", "flex-col", "items-center", "justify-center", "pt-5", "pb-6"], ["aria-hidden", "true", "xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 20 16", 1, "w-8", "h-8", "mb-4", "text-gray-500", "dark:text-gray-400"], ["stroke", "currentColor", "stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"], [1, "mb-2", "text-sm", "text-gray-500", "dark:text-gray-400"], [1, "font-semibold"], [1, "text-xs", "text-gray-500", "dark:text-gray-400"], ["id", "dropzone-file", "type", "file", "ng2FileSelect", "", 1, "hidden", 3, "uploader"], [1, "h-40", "overflow-y-scroll", "border-2", "border-gray-300", "border-dashed", "rounded-box", "p-2", "space-y-2"], [1, "flex", "items-center", "gap-4", "p-1", "border-b", "border-b-gray-500/5", "group", "transition-all"], [1, "text-xs", "text-center", "my-2", "w-full", "h-full"], [1, "flex", "justify-start", "gap-2"], [1, "btn", "btn-secondary", "btn-sm", "w-4/12", 3, "click"], ["type", "button", 1, "btn", "btn-primary", "btn-sm", "join-item", "flex-auto", 3, "click", "disabled"], [1, "icon", "size-8", "rounded-md", "bg-gray-200", "grid", "place-items-center"], [1, "material-symbols-rounded", "text-[24px]"], [1, "grow", "w-[70%]", "tooltip", "text-left"], [1, "line-clamp-1", "w-full", "text-xs"], [1, "loading", "loading-spinner", "loading-1xl"], [1, "size-8", "hidden", "group-hover:grid", "hover:rotate-90", "place-items-center", "cursor-pointer", "transition-all", "hover:bg-gray-200", "btn-circle", "btn-sm", 3, "click"], [1, "text-[20px]!", "material-symbols-rounded"]], template: function NeedAnalysisConsultationComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 5)(1, "h3", 6);
            i0.ɵɵtext(2, "Stakeholders' Consultation");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "form", 7, 0);
            i0.ɵɵconditionalCreate(5, NeedAnalysisConsultationComponent_Conditional_5_Template, 26, 7, "div", 7);
            i0.ɵɵconditionalCreate(6, NeedAnalysisConsultationComponent_Conditional_6_Template, 27, 4, "div", 8);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(!ctx.isShown() ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.isShown() ? 6 : -1);
        } }, dependencies: [FormsModule, i3.ɵNgNoValidate, i3.DefaultValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.RequiredValidator, i3.NgModel, i3.NgForm, FileUploadModule, i4.FileDropDirective, i4.FileSelectDirective, FilePipe, FileExtensionPipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NeedAnalysisConsultationComponent, [{
        type: Component,
        args: [{ selector: 'need-analysis-consult', imports: [FormsModule, FileUploadModule, FilePipe, FileExtensionPipe], template: "<div class=\"space-y-4\">\r\n  <h3 class=\"text-xl\">Stakeholders' Consultation</h3>\r\n  <form #consultForm=\"ngForm\" class=\"space-y-2\">\r\n\r\n    @if (!isShown()) {\r\n    <div class=\"space-y-2\" animate.enter=\"enter-animation1\">\r\n      <fieldset class=\"fieldset\">\r\n        <legend class=\"fieldset-legend\">Consultation Start Date</legend>\r\n        <input id=\"sdate\" type=\"date\" class=\"input\" required [(ngModel)]=\"needAnalysis.startDate\" date-only=\"true\"\r\n          name=\"sDate\" placeholder=\"YYYY-MM-DD\" #sdate=\"ngModel\" />\r\n        @if(sdate.invalid && sdate.touched){\r\n        <span class=\"label text-error\">Start date required*</span>\r\n        }\r\n      </fieldset>\r\n\r\n      <fieldset class=\"fieldset\">\r\n        <legend class=\"fieldset-legend\" for=\"date\">Consultation End Date</legend>\r\n        <input id=\"edate\" type=\"date\" class=\"input input-sm\" required [(ngModel)]=\"needAnalysis.endDate\"\r\n          date-only=\"true\" name=\"eDate\" placeholder=\"YYYY-MM-DD\" #edate=\"ngModel\" />\r\n        @if(edate.invalid && edate.touched){\r\n        <label class=\"fieldset-label\">\r\n          <span class=\"label-text-alt text-error\">End date required*</span>\r\n        </label>\r\n        }\r\n      </fieldset>\r\n\r\n      <div class=\"space-y-2\">\r\n        <div class=\"flex justify-between gap-2\">\r\n          <label class=\"text-base font-semibold\">Stakeholders List</label>\r\n          <button class=\"btn btn-xs btn-outline btn-primary\" (click)=\"toggleAdd()\">\r\n            add stakeholder {{isStakeholderShown()?'-':'+'}}\r\n          </button>\r\n        </div>\r\n        @if(isStakeholderShown()) {\r\n        <fieldset class=\"stakeholder-input-container\" [class.open]=\"isStakeholderShown()\">\r\n          <div class=\"flex h-fit items-center gap-1 border-2 border-dashed border-gray-300 rounded-box p-2\">\r\n            <div class=\"w-auto flex-auto\">\r\n              <label class=\"input input-sm border-b-0 rounded-b-none rounded-r-none flex flex-auto gap-2 items-center \">\r\n                <span class=\"material-symbols-rounded\">\r\n                  contact_page\r\n                </span>\r\n                <input type=\"text\" placeholder=\"Enter stakeholder name\" id=\"organisation\" name=\"organisation\" required\r\n                  class=\"flex-auto\" [(ngModel)]=\"needAnalysis.stakeholder.name\" #stakename=\"ngModel\" />\r\n              </label>\r\n\r\n              <label class=\"input input-sm  rounded-r-none rounded-t-none flex flex-auto gap-2 items-center \">\r\n                <span class=\"material-symbols-rounded\">\r\n                  account_tree\r\n                </span>\r\n                <input type=\"text\" placeholder=\"Enter stakeholder organisation\" id=\"organisation\" name=\"organisation\"\r\n                  required class=\"flex-auto\" [(ngModel)]=\"needAnalysis.stakeholder.organisation\" #stakeorg=\"ngModel\" />\r\n              </label>\r\n            </div>\r\n            <button [disabled]=\"stakeorg.invalid || stakename.invalid\" (click)=\"addOrganisation()\"\r\n              class=\"btn rounded-l-none btn-primary h-18!\">Add +</button>\r\n          </div>\r\n        </fieldset>\r\n        }\r\n\r\n        <div class=\"flex gap-2 flex-wrap p-2 rounded-xl border-dashed border-2 border-gray-300\">\r\n          @for (item of stakeholders; track item) {\r\n          <div class=\"group px-2 py-2 rounded-md bg-gray-200 flex gap-4 items-center justify-between transition-all\">\r\n            <div class=\"space-y-1\">\r\n              <p class=\"line-clamp-2 text-sm capitalize\">{{item.name}}</p>\r\n              <p class=\"line-clamp-2 text-xs capitalize\">{{item.organisation}}</p>\r\n            </div>\r\n            <button class=\"btn btn-ghost btn-circle transition btn-xs hidden group-hover:block\"\r\n              (click)=\"removeOrganisation(item.organisation)\">\r\n              <span class=\"material-symbols-rounded text-xs\">\r\n                close\r\n              </span>\r\n            </button>\r\n          </div>\r\n          }@empty {\r\n          <span class=\"text-xs pl-2 font-semibold\">No Stakeholders</span>\r\n          }\r\n        </div>\r\n      </div>\r\n\r\n      <button class=\"btn btn-primary btn-sm w-full mt-4\" (click)=\"toggle()\">\r\n        Next\r\n      </button>\r\n    </div>\r\n    }\r\n\r\n    @if (isShown()) {\r\n    <div class=\"next-page space-y-2\" animate.enter=\"enter-animation\">\r\n      <fieldset class=\"fieldset\">\r\n        <legend class=\"fieldset-legend\">Upload Questionnaires from Respondents</legend>\r\n        <div class=\"flex items-center justify-center w-full\">\r\n          <label for=\"dropzone-file\"\r\n            class=\"flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-box cursor-pointer bg-gray-50 hover:bg-gray-100\"\r\n            ng2FileDrop [uploader]=\"uploader\">\r\n            <div class=\"flex flex-col items-center justify-center pt-5 pb-6\">\r\n              <svg class=\"w-8 h-8 mb-4 text-gray-500 dark:text-gray-400\" aria-hidden=\"true\"\r\n                xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 20 16\">\r\n                <path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"\r\n                  d=\"M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2\" />\r\n              </svg>\r\n              <p class=\"mb-2 text-sm text-gray-500 dark:text-gray-400\">\r\n                <span class=\"font-semibold\">Click to upload</span>\r\n                or drag and drop\r\n              </p>\r\n              <p class=\"text-xs text-gray-500 dark:text-gray-400\">PDF, DOCX, TXT or XLSX (MAX. 50MB)</p>\r\n            </div>\r\n            <input id=\"dropzone-file\" type=\"file\" class=\"hidden\" ng2FileSelect [uploader]=\"uploader\" />\r\n          </label>\r\n        </div>\r\n\r\n        <div class=\"h-40 overflow-y-scroll border-2 border-gray-300 border-dashed rounded-box p-2 space-y-2\">\r\n          @for (item of uploader.queue; track $index) {\r\n          <div class=\"flex items-center gap-4 p-1 border-b border-b-gray-500/5 group transition-all\">\r\n            <div class=\"icon size-8 rounded-md bg-gray-200 grid place-items-center\">\r\n              @switch (item.file.name | Extension) {\r\n              @case ('pdf') {\r\n              <span class=\"material-symbols-rounded text-[24px]\">\r\n                draft\r\n              </span>\r\n              }\r\n              @case ('docs') {\r\n              <span class=\"material-symbols-rounded text-[24px]\">\r\n                docs\r\n              </span>\r\n              }\r\n              @case ('docx') {\r\n              <span class=\"material-symbols-rounded text-[24px]\">\r\n                docs\r\n              </span>\r\n              }\r\n              @case ('xlsx') {\r\n              <span class=\"material-symbols-rounded text-[24px]\">\r\n                csv\r\n              </span>\r\n              }\r\n              @case ('csv') {\r\n              <span class=\"material-symbols-rounded text-[24px]\">\r\n                csv\r\n              </span>\r\n              }\r\n              @default {\r\n              <span class=\"material-symbols-rounded text-[24px]\">\r\n                draft\r\n              </span>\r\n              }\r\n              }\r\n            </div>\r\n            <div class=\"grow w-[70%] tooltip text-left\">\r\n              <p class=\"line-clamp-1 w-full text-xs\">{{item.file.name}} <b>{{item.file.size | file}}</b></p>\r\n            </div>\r\n            @if(uploader.isUploading){\r\n            <span class=\"loading loading-spinner loading-1xl\"></span>\r\n            }\r\n            <button\r\n              class=\"size-8 hidden group-hover:grid hover:rotate-90  place-items-center cursor-pointer transition-all hover:bg-gray-200 btn-circle btn-sm\"\r\n              (click)=\"removeFile(item)\">\r\n              <span class=\" text-[20px]! material-symbols-rounded\">\r\n                close\r\n              </span>\r\n            </button>\r\n          </div>\r\n          }@empty {\r\n          <span class=\"text-xs text-center my-2 w-full h-full\">No file selected</span>\r\n          }\r\n        </div>\r\n      </fieldset>\r\n\r\n      <div class=\"flex justify-start gap-2\">\r\n        <button class=\"btn btn-secondary btn-sm w-4/12\" (click)=\"toggle()\">Prev</button>\r\n        <button type=\"button\" class=\"btn btn-primary btn-sm join-item flex-auto\" (click)=\"uploadAll(consultForm)\"\r\n          [disabled]=\"!uploader.queue.length\">\r\n          submit\r\n          <span class=\"material-symbols-rounded\">\r\n            cloud_upload\r\n          </span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    }\r\n\r\n  </form>\r\n</div>\r\n" }]
    }], () => [{ type: i1.Router }, { type: i2.Location }], { pid: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NeedAnalysisConsultationComponent, { className: "NeedAnalysisConsultationComponent", filePath: "src/app/components/forms/need-analysis-consult/need-analysis-consult.component.ts", lineNumber: 18 }); })();
