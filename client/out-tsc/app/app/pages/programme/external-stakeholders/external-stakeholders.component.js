import { Component, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CardComponent } from "../../../components/card/card/card.component";
import { CurriculumDevPACStartComponent } from '../../../components/forms/exeternal-curriculum-dev-pac-start/curriculum-dev-pac-start.component';
import { CurriculumDevPACConsultComponent } from '../../../components/forms/external-curriculum-dev-pac-consult/curriculum-dev-pac-consult.component';
import { PacConsultEndorseComponent } from '../../../components/forms/external-pac-consult-endorse/pac-consult-endorse.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { GET_PROGRAMME_PHASE_BY_ID } from '../../../graphql/graphql.queries';
import { DatePipe } from "../../../pipes/date.pipe";
import { LoadingService } from '../../../services/loading.service';
import { programme_steps } from '../../../static';
import { CanEditDirective } from '../../../directives/can-edit.directive';
import { ActionButtonsComponent } from "../../../components/action-buttons/action-buttons.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = a0 => [a0];
const _c1 = () => ["download"];
const _c2 = a0 => ({ name: "External Stakeholders Curriculum Programme Draft document", id: a0 });
const _c3 = a0 => ({ name: "External Stakeholders PAC and Benchmarking document", id: a0 });
const _c4 = a0 => ({ name: "External Stakeholders consultation final programme draft document", id: a0 });
const _forTrack0 = ($index, $item) => $item.id;
function ExternalStakeholdersComponent_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 6);
    i0.ɵɵlistener("click", function ExternalStakeholdersComponent_For_3_Template_li_click_0_listener() { const step_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onSelectStep(step_r2.id)); });
    i0.ɵɵelementStart(1, "span", 7);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 8);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const step_r2 = ctx.$implicit;
    const ɵ$index_5_r4 = ctx.$index;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassMap(ctx_r2.selectedStep == step_r2.id ? "bg-primary text-white" : "bg-gray-100");
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ɵ$index_5_r4 + 1, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", step_r2.title, " ");
} }
function ExternalStakeholdersComponent_Conditional_4_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵlistener("click", function ExternalStakeholdersComponent_Conditional_4_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); i0.ɵɵnextContext(); const draft_programme_r6 = i0.ɵɵreference(10); return i0.ɵɵresetView(draft_programme_r6.open()); });
    i0.ɵɵtext(1, " Upload draft Programme to start PAC Consultation ");
    i0.ɵɵelementEnd();
} }
function ExternalStakeholdersComponent_Conditional_4_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 14);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction1(5, _c0, "Date : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.circulationDraft == null ? null : ctx_r2.circulationDraft.extraData["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(7, _c1))("target", i0.ɵɵpureFunction1(8, _c2, ctx_r2.circulationDraft == null ? null : ctx_r2.circulationDraft.extraData["draftFile"]));
} }
function ExternalStakeholdersComponent_Conditional_4_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtext(1, "Draft programme document not submitted");
    i0.ɵɵelementEnd();
} }
function ExternalStakeholdersComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 10)(2, "h2", 11);
    i0.ɵɵtext(3, "Circulation of Draft Programme");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, ExternalStakeholdersComponent_Conditional_4_button_4_Template, 2, 0, "button", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 13);
    i0.ɵɵtext(6, " CDC is required to upload the draft programme document for circulation to PAC members as identified in Stage 2. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, ExternalStakeholdersComponent_Conditional_4_Conditional_7_Template, 3, 10, "card", 14)(8, ExternalStakeholdersComponent_Conditional_4_Conditional_8_Template, 2, 0, "p", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 0);
    i0.ɵɵelement(11, "external-curriculum-dev-pac-start", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.circulationDraft == null ? null : ctx_r2.circulationDraft.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function ExternalStakeholdersComponent_Conditional_5_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵlistener("click", function ExternalStakeholdersComponent_Conditional_5_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); i0.ɵɵnextContext(); const consult_pac_r8 = i0.ɵɵreference(10); return i0.ɵɵresetView(consult_pac_r8.open()); });
    i0.ɵɵtext(1, " Consultations ");
    i0.ɵɵelementEnd();
} }
function ExternalStakeholdersComponent_Conditional_5_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 20);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction1(5, _c0, "Date : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.pacConsultation == null ? null : ctx_r2.pacConsultation.extraData["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(7, _c1))("target", i0.ɵɵpureFunction1(8, _c3, ctx_r2.pacConsultation == null ? null : ctx_r2.pacConsultation.extraData["draftFile"]));
} }
function ExternalStakeholdersComponent_Conditional_5_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtext(1, "PAC Consultation and Benchmarking document not submitted");
    i0.ɵɵelementEnd();
} }
function ExternalStakeholdersComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 19)(2, "h2", 11);
    i0.ɵɵtext(3, "PAC Consultation and Benchmarking");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, ExternalStakeholdersComponent_Conditional_5_button_4_Template, 2, 0, "button", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 13);
    i0.ɵɵtext(6, " PAC Consultation and Benchmarking CDC convene a meeting with PAC members and benchmark with peer universities, others stakeholders to solicit inputs on the draft programme. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, ExternalStakeholdersComponent_Conditional_5_Conditional_7_Template, 3, 10, "card", 20)(8, ExternalStakeholdersComponent_Conditional_5_Conditional_8_Template, 2, 0, "p", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 1);
    i0.ɵɵelement(11, "external-curriculum-dev-pac-consult", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.pacConsultation == null ? null : ctx_r2.pacConsultation.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function ExternalStakeholdersComponent_Conditional_6_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵlistener("click", function ExternalStakeholdersComponent_Conditional_6_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); i0.ɵɵnextContext(); const final_draft_r10 = i0.ɵɵreference(10); return i0.ɵɵresetView(final_draft_r10.open()); });
    i0.ɵɵtext(1, " Recommendations ");
    i0.ɵɵelementEnd();
} }
function ExternalStakeholdersComponent_Conditional_6_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 21);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction1(5, _c0, "Date : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.finalDraft == null ? null : ctx_r2.finalDraft.extraData["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(7, _c1))("target", i0.ɵɵpureFunction1(8, _c4, ctx_r2.finalDraft == null ? null : ctx_r2.finalDraft.extraData["draftFile"]));
} }
function ExternalStakeholdersComponent_Conditional_6_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 15);
    i0.ɵɵtext(1, "Final Programme Draft document not submitted");
    i0.ɵɵelementEnd();
} }
function ExternalStakeholdersComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 10)(2, "h2", 11);
    i0.ɵɵtext(3, "Final Programme Draft - PDQA Recommendations");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, ExternalStakeholdersComponent_Conditional_6_button_4_Template, 2, 0, "button", 12);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 13);
    i0.ɵɵtext(6, " CDC circulate the final programme draft document to PDQA for recommendation to BOS. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, ExternalStakeholdersComponent_Conditional_6_Conditional_7_Template, 3, 10, "card", 21)(8, ExternalStakeholdersComponent_Conditional_6_Conditional_8_Template, 2, 0, "p", 15);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 2);
    i0.ɵɵelement(11, "external-pac-consult-endorse", 16);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.finalDraft == null ? null : ctx_r2.finalDraft.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
export class ExternalStakeholdersComponent {
    route;
    apollo = inject(Apollo);
    _loading = inject(LoadingService);
    pid;
    programme;
    steps = programme_steps['external_stakeholders_consultations'];
    selectedStep = 1;
    circulationDraft;
    pacConsultation;
    finalDraft;
    constructor(route) {
        this.route = route;
    }
    onSelectStep = (step) => {
        this.selectedStep = step;
    };
    ngOnInit() {
        this.programme = this.route.snapshot.parent.data['programme']?.programmes[0];
        this.route.parent?.paramMap.subscribe(params => {
            this.pid = params.get('id');
            this.apollo.watchQuery({
                query: GET_PROGRAMME_PHASE_BY_ID,
                variables: {
                    programmeId: params.get('id'),
                    phaseSlug: 'external-stakeholder-consultation',
                }
            }).valueChanges.subscribe((result) => {
                this._loading.isLoading.set(result.loading);
                const data = result?.data?.programme_phase_step;
                this.circulationDraft = data?.steps?.find((item) => item.slug === 'circulation-of-draft-programme');
                this.pacConsultation = data?.steps?.find((item) => item.slug === 'pac-consultation-and-benchmarking');
                this.finalDraft = data?.steps?.find((item) => item.slug === 'final-draft-and-pdqa-recommendations');
            });
        });
    }
    static ɵfac = function ExternalStakeholdersComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ExternalStakeholdersComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ExternalStakeholdersComponent, selectors: [["client-external-stakeholders"]], decls: 7, vars: 3, consts: [["draft_programme", ""], ["consult_pac", ""], ["final_draft", ""], [1, "relative", "after:absolute", "after:inset-x-0", "after:top-1/2", "after:block", "after:h-0.5", "after:-translate-y-1/2", "after:rounded-lg", "after:bg-gray-100"], [1, "relative", "z-10", "flex", "justify-between", "text-sm", "font-medium", "text-gray-500"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer", 3, "click"], [1, "size-10", "md:size-6", "xl:size-8", "rounded-full", "grid", "place-items-center", "text-[14px]/6", "font-bold"], [1, "hidden", "md:block", "md:text-xs"], [1, "space-y-4", "my-6"], [1, "flex", "justify-between", "gap-2", "flex-wrap"], [1, "text-xl", "md:text-2xl", "capitalize"], ["class", "btn btn-sm font-normal btn-secondary text-primary", 3, "click", 4, "canEdit"], [1, "text-gray-700", "text-sm"], ["title", "Draft Programme Document ", 3, "descriptions"], [1, "text-sm", "text-primary", "font-semibold"], [3, "pid"], [1, "btn", "btn-sm", "font-normal", "btn-secondary", "text-primary", 3, "click"], [3, "actions", "target"], [1, "flex", "justify-between"], ["title", "PAC Consultation and Benchmarking Document ", 3, "descriptions"], ["title", "final draft programme document", 3, "descriptions"]], template: function ExternalStakeholdersComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 3)(1, "ol", 4);
            i0.ɵɵrepeaterCreate(2, ExternalStakeholdersComponent_For_3_Template, 5, 4, "li", 5, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(4, ExternalStakeholdersComponent_Conditional_4_Template, 12, 3);
            i0.ɵɵconditionalCreate(5, ExternalStakeholdersComponent_Conditional_5_Template, 12, 3);
            i0.ɵɵconditionalCreate(6, ExternalStakeholdersComponent_Conditional_6_Template, 12, 3);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.steps);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedStep == 1 ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep === 2 ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep === 3 ? 6 : -1);
        } }, dependencies: [CurriculumDevPACStartComponent, CurriculumDevPACConsultComponent, PacConsultEndorseComponent, ModalComponent, CardComponent, CanEditDirective, ActionButtonsComponent, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ExternalStakeholdersComponent, [{
        type: Component,
        args: [{ selector: 'client-external-stakeholders', imports: [CurriculumDevPACStartComponent, CurriculumDevPACConsultComponent, PacConsultEndorseComponent, ModalComponent, DatePipe, CardComponent, CanEditDirective, ActionButtonsComponent], template: "<div\r\n  class=\"relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100\">\r\n  <ol class=\"relative z-10 flex justify-between text-sm font-medium text-gray-500\">\r\n    @for(step of steps;track step.id;let i= $index; ){\r\n    <li class=\"flex items-center gap-1 p-2 cursor-pointer\" (click)=\"onSelectStep(step.id)\">\r\n      <span class=\"size-10 md:size-6 xl:size-8 rounded-full grid place-items-center text-[14px]/6 font-bold\"\r\n        [class]=\"selectedStep==step.id?'bg-primary text-white':'bg-gray-100'\"> {{i+1}} </span>\r\n      <span class=\"hidden md:block md:text-xs\"> {{step.title}} </span>\r\n    </li>\r\n    }\r\n  </ol>\r\n</div>\r\n\r\n@if(selectedStep==1){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">Circulation of Draft Programme</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\" (click)=\"draft_programme.open()\">\r\n      Upload draft Programme to start PAC Consultation\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    CDC is required to upload the draft programme document for circulation to PAC members as identified in Stage 2.\r\n  </p>\r\n\r\n  @if(circulationDraft?.stepName){\r\n  <card title=\"Draft Programme Document \" [descriptions]=\"['Date : ' + (circulationDraft?.extraData['date'] | date)]\" >\r\n    <action-buttons [actions]=\"['download']\"\r\n    [target]=\"{name:'External Stakeholders Curriculum Programme Draft document',\r\n      id: circulationDraft?.extraData['draftFile']}\" />\r\n    </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">Draft programme document not submitted</p>\r\n  }\r\n\r\n</div>\r\n\r\n<modal #draft_programme>\r\n  <external-curriculum-dev-pac-start [pid]=\"pid\"></external-curriculum-dev-pac-start>\r\n</modal>\r\n\r\n}\r\n\r\n@if(selectedStep===2){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">PAC Consultation and Benchmarking</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\" (click)=\"consult_pac.open()\">\r\n      Consultations\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    PAC Consultation and Benchmarking\r\n    CDC convene a meeting with PAC members and benchmark with peer universities, others stakeholders to solicit inputs\r\n    on the draft programme.\r\n  </p>\r\n\r\n  @if(pacConsultation?.stepName){\r\n  <card title=\"PAC Consultation and Benchmarking Document \"\r\n    [descriptions]=\"['Date : ' + (pacConsultation?.extraData['date'] | date)]\" >\r\n      <action-buttons [actions]=\"['download']\"\r\n    [target]=\"{name:'External Stakeholders PAC and Benchmarking document',\r\n      id: pacConsultation?.extraData['draftFile']}\" />\r\n    </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">PAC Consultation and Benchmarking document not submitted</p>\r\n  }\r\n\r\n</div>\r\n\r\n<modal #consult_pac>\r\n  <external-curriculum-dev-pac-consult [pid]=\"pid\"></external-curriculum-dev-pac-consult>\r\n</modal>\r\n}\r\n\r\n\r\n@if(selectedStep===3){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">Final Programme Draft - PDQA Recommendations</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\" (click)=\"final_draft.open()\">\r\n      Recommendations\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    CDC circulate the final programme draft document to PDQA for recommendation to BOS.\r\n  </p>\r\n\r\n  @if(finalDraft?.stepName){\r\n  <card title=\"final draft programme document\"\r\n    [descriptions]=\"['Date : ' + (finalDraft?.extraData['date'] | date)]\">\r\n      <action-buttons [actions]=\"['download']\"\r\n    [target]=\"{name:'External Stakeholders consultation final programme draft document',\r\n      id: finalDraft?.extraData['draftFile']}\" />\r\n    </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">Final Programme Draft document not submitted</p>\r\n  }\r\n</div>\r\n\r\n<modal #final_draft>\r\n  <external-pac-consult-endorse [pid]=\"pid\"></external-pac-consult-endorse>\r\n</modal>\r\n}\r\n" }]
    }], () => [{ type: i1.ActivatedRoute }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ExternalStakeholdersComponent, { className: "ExternalStakeholdersComponent", filePath: "src/app/pages/programme/external-stakeholders/external-stakeholders.component.ts", lineNumber: 23 }); })();
