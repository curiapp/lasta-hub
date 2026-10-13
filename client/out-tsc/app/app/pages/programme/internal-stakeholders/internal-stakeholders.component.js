import { Component, inject } from "@angular/core";
import { Apollo } from "apollo-angular";
import { CardComponent } from "../../../components/card/card/card.component";
import { CEURecommendComponent } from "../../../components/forms/internal-ceu-recommend/ceu-recommend.component";
import { InternalReviewPduComponent } from "../../../components/forms/internal-review-pdqa/internal-review-pdqa.component";
import { TLUCEUQAStartComponent } from "../../../components/forms/internal-tlu-ceu-qa-start/tlu-ceu-qa-start.component";
import { TLURecommendComponent } from "../../../components/forms/internal-tlu-recommend/tlu-recommend.component";
import { ModalComponent } from "../../../components/modal/modal.component";
import { GET_PROGRAMME_PHASE_BY_ID } from "../../../graphql/graphql.queries";
import { DatePipe } from "../../../pipes/date.pipe";
import { LoadingService } from "../../../services/loading.service";
import { programme_steps } from "../../../static";
import { CanEditDirective } from "../../../directives/can-edit.directive";
import { ActionButtonsComponent } from "../../../components/action-buttons/action-buttons.component";
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _c0 = (a0, a1, a2) => [a0, a1, a2];
const _c1 = () => ["download"];
const _c2 = a0 => ({ name: "Internal Stakeholders Curriculum Programme Draft document", id: a0 });
const _c3 = (a0, a1) => [a0, a1];
const _c4 = a0 => ({ name: "Internal Stakeholders ADSTLT Support Letter/Recommendations document", id: a0 });
const _c5 = a0 => ({ name: "Internal Stakeholders CEU Support Letter/Recommendations document", id: a0 });
const _c6 = a0 => ({ name: "Internal Stakeholders PDQA Support Letter/Recommendations document", id: a0 });
const _forTrack0 = ($index, $item) => $item.id;
function InternalStakeholdersComponent_For_3_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "li", 7);
    i0.ɵɵlistener("click", function InternalStakeholdersComponent_For_3_Template_li_click_0_listener() { const step_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.onSelectStep(step_r2.id)); });
    i0.ɵɵelementStart(1, "span", 8);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 9);
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
function InternalStakeholdersComponent_Conditional_4_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function InternalStakeholdersComponent_Conditional_4_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); i0.ɵɵnextContext(); const internal_consult_r6 = i0.ɵɵreference(10); return i0.ɵɵresetView(internal_consult_r6.open()); });
    i0.ɵɵtext(1, " Start Internal Consultations ");
    i0.ɵɵelementEnd();
} }
function InternalStakeholdersComponent_Conditional_4_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 15);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction3(5, _c0, `Wil Component ${(ctx_r2.internalConsultations == null ? null : ctx_r2.internalConsultations.extraData["includesWilComponent"]) ? "Included" : "Excluded"}`, `Recommended To: ${ctx_r2.internalConsultations == null ? null : ctx_r2.internalConsultations.extraData["recommendedTo"] == null ? null : ctx_r2.internalConsultations.extraData["recommendedTo"].join(" ")}`, "Date : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.internalConsultations == null ? null : ctx_r2.internalConsultations.extraData["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(9, _c1))("target", i0.ɵɵpureFunction1(10, _c2, ctx_r2.internalConsultations == null ? null : ctx_r2.internalConsultations.extraData["draftedProgrammeFile"]));
} }
function InternalStakeholdersComponent_Conditional_4_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "Programme Draft document not submitted");
    i0.ɵɵelementEnd();
} }
function InternalStakeholdersComponent_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 11)(2, "h2", 12);
    i0.ɵɵtext(3, "Internal Consultations");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, InternalStakeholdersComponent_Conditional_4_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " This sub stage requires CDC to identify relevant internal stakeholders for consultation to seek inputs on teaching, learning and assessment (TL &A), delivery, cooperative education, quality assurance, and circulate the programme document. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, InternalStakeholdersComponent_Conditional_4_Conditional_7_Template, 3, 12, "card", 15)(8, InternalStakeholdersComponent_Conditional_4_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 0);
    i0.ɵɵelement(11, "tlu-ceu-qa-start", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.internalConsultations == null ? null : ctx_r2.internalConsultations.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function InternalStakeholdersComponent_Conditional_5_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function InternalStakeholdersComponent_Conditional_5_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); i0.ɵɵnextContext(); const adstlt_review_r8 = i0.ɵɵreference(10); return i0.ɵɵresetView(adstlt_review_r8.open()); });
    i0.ɵɵtext(1, " ADS-TLT Review ");
    i0.ɵɵelementEnd();
} }
function InternalStakeholdersComponent_Conditional_5_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 21);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction2(5, _c3, "Decision : " + (ctx_r2.adstltReview == null ? null : ctx_r2.adstltReview.extraData["decision"]), "Date : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.adstltReview["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(8, _c1))("target", i0.ɵɵpureFunction1(9, _c4, ctx_r2.adstltReview == null ? null : ctx_r2.adstltReview.extraData["reviewFile"]));
} }
function InternalStakeholdersComponent_Conditional_5_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "ADSTLT Support Letter/Recommendations document not submitted");
    i0.ɵɵelementEnd();
} }
function InternalStakeholdersComponent_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 20)(2, "h2", 12);
    i0.ɵɵtext(3, "ADSTLT Review");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, InternalStakeholdersComponent_Conditional_5_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " The Department responsible advice the department on the appropriate teaching, learning and assessment strategies on the various courses and makes a recommendation. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, InternalStakeholdersComponent_Conditional_5_Conditional_7_Template, 3, 11, "card", 21)(8, InternalStakeholdersComponent_Conditional_5_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 1);
    i0.ɵɵelement(11, "tlu-recommend", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.adstltReview == null ? null : ctx_r2.adstltReview.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function InternalStakeholdersComponent_Conditional_6_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function InternalStakeholdersComponent_Conditional_6_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r9); i0.ɵɵnextContext(); const ce_review_r10 = i0.ɵɵreference(10); return i0.ɵɵresetView(ce_review_r10.open()); });
    i0.ɵɵtext(1, " CE Review ");
    i0.ɵɵelementEnd();
} }
function InternalStakeholdersComponent_Conditional_6_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 23);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction2(5, _c3, "Decision : " + (ctx_r2.ceuReview == null ? null : ctx_r2.ceuReview.extraData["decision"]), "Date : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.ceuReview["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(8, _c1))("target", i0.ɵɵpureFunction1(9, _c5, ctx_r2.ceuReview == null ? null : ctx_r2.ceuReview.extraData["reviewFile"]));
} }
function InternalStakeholdersComponent_Conditional_6_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "CEU Support Letter/Recommendations document not submitted");
    i0.ɵɵelementEnd();
} }
function InternalStakeholdersComponent_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 22)(2, "h2", 12);
    i0.ɵɵtext(3, "CE Review");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, InternalStakeholdersComponent_Conditional_6_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " The Department responsible ensure the integration of the Work Integrated Learning (WIL) component in the undergraduate programme and makes a recommendation. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, InternalStakeholdersComponent_Conditional_6_Conditional_7_Template, 3, 11, "card", 23)(8, InternalStakeholdersComponent_Conditional_6_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 2);
    i0.ɵɵelement(11, "ceu-recommend", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.ceuReview == null ? null : ctx_r2.ceuReview.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
function InternalStakeholdersComponent_Conditional_7_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 18);
    i0.ɵɵlistener("click", function InternalStakeholdersComponent_Conditional_7_button_4_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r11); i0.ɵɵnextContext(); const pdqa_review_r12 = i0.ɵɵreference(10); return i0.ɵɵresetView(pdqa_review_r12.open()); });
    i0.ɵɵtext(1, " PDQA Recommendation ");
    i0.ɵɵelementEnd();
} }
function InternalStakeholdersComponent_Conditional_7_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "card", 25);
    i0.ɵɵpipe(1, "date");
    i0.ɵɵelement(2, "action-buttons", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("descriptions", i0.ɵɵpureFunction2(5, _c3, "Decision : " + (ctx_r2.pdqaRecommend == null ? null : ctx_r2.pdqaRecommend.extraData["decision"]), "Date : " + i0.ɵɵpipeBind1(1, 3, ctx_r2.pdqaRecommend["date"])));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("actions", i0.ɵɵpureFunction0(8, _c1))("target", i0.ɵɵpureFunction1(9, _c6, ctx_r2.pdqaRecommend == null ? null : ctx_r2.pdqaRecommend.extraData["reviewFile"]));
} }
function InternalStakeholdersComponent_Conditional_7_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 16);
    i0.ɵɵtext(1, "PDQA Support Letter/Recommendations document not submitted");
    i0.ɵɵelementEnd();
} }
function InternalStakeholdersComponent_Conditional_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10)(1, "div", 24)(2, "h2", 12);
    i0.ɵɵtext(3, "PDQA Recommendation");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, InternalStakeholdersComponent_Conditional_7_button_4_Template, 2, 0, "button", 13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 14);
    i0.ɵɵtext(6, " The department review and verify the readiness of the programme for submission to BOS, makes a recommendation and provide a checklist. ");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(7, InternalStakeholdersComponent_Conditional_7_Conditional_7_Template, 3, 11, "card", 25)(8, InternalStakeholdersComponent_Conditional_7_Conditional_8_Template, 2, 0, "p", 16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "modal", null, 3);
    i0.ɵɵelement(11, "internal-pdqa-review", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("canEdit", ctx_r2.programme == null ? null : ctx_r2.programme.initiator);
    i0.ɵɵadvance(3);
    i0.ɵɵconditional((ctx_r2.pdqaRecommend == null ? null : ctx_r2.pdqaRecommend.stepName) ? 7 : 8);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("pid", ctx_r2.pid);
} }
export class InternalStakeholdersComponent {
    route;
    apollo = inject(Apollo);
    _loading = inject(LoadingService);
    pid;
    programme;
    steps = programme_steps['internal_stakeholders_consultations'];
    selectedStep = 1;
    internalConsultations;
    adstltReview;
    ceuReview;
    pdqaRecommend;
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
                    phaseSlug: 'internal-stakeholder-consultation',
                }
            }).valueChanges.subscribe((result) => {
                this._loading.isLoading.set(result.loading);
                const data = result?.data?.programme_phase_step;
                this.internalConsultations = data?.steps?.find((item) => item.slug === 'internal-consultations');
                this.adstltReview = data?.steps?.find((item) => item.slug === 'adstlt-review');
                this.ceuReview = data?.steps?.find((item) => item.slug === 'ceu-review');
                this.pdqaRecommend = data?.steps?.find((item) => item.slug === 'pdqa-review');
            });
        });
    }
    static ɵfac = function InternalStakeholdersComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InternalStakeholdersComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InternalStakeholdersComponent, selectors: [["client-internal-stakeholders"]], decls: 8, vars: 4, consts: [["internal_consult", ""], ["adstlt_review", ""], ["ce_review", ""], ["pdqa_review", ""], [1, "relative", "after:absolute", "after:inset-x-0", "after:top-1/2", "after:block", "after:h-0.5", "after:-translate-y-1/2", "after:rounded-lg", "after:bg-gray-100"], [1, "relative", "z-10", "flex", "justify-between", "text-sm", "font-medium", "text-gray-500"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer"], [1, "flex", "items-center", "gap-1", "p-2", "cursor-pointer", 3, "click"], [1, "size-10", "md:size-6", "xl:size-8", "rounded-full", "grid", "place-items-center", "text-xs", "lg:text-[14px]/6", "font-bold"], [1, "hidden", "md:block", "md:text-xs"], [1, "space-y-4", "my-6"], [1, "flex", "justify-between", "gap-2", "flex-wrap"], [1, "text-xl", "md:text-2xl", "capitalize"], ["class", "btn btn-sm font-normal btn-secondary text-primary", 3, "click", 4, "canEdit"], [1, "text-gray-700", "text-sm"], ["title", "programme draft document ", 3, "descriptions"], [1, "text-sm", "text-primary", "font-semibold"], [3, "pid"], [1, "btn", "btn-sm", "font-normal", "btn-secondary", "text-primary", 3, "click"], [3, "actions", "target"], [1, "flex", "justify-between"], ["title", " ADSTLT Support Letter/Recommendations document", 3, "descriptions"], [1, "flex", "justify-between", "items-center"], ["title", " CEU Support Letter/Recommendations document", 3, "descriptions"], [1, "flex", "justify-between", "items-center", "gap-2", "flex-wrap"], ["title", " PDQA Support Letter/Recommendations document", 3, "descriptions"]], template: function InternalStakeholdersComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 4)(1, "ol", 5);
            i0.ɵɵrepeaterCreate(2, InternalStakeholdersComponent_For_3_Template, 5, 4, "li", 6, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(4, InternalStakeholdersComponent_Conditional_4_Template, 12, 3);
            i0.ɵɵconditionalCreate(5, InternalStakeholdersComponent_Conditional_5_Template, 12, 3);
            i0.ɵɵconditionalCreate(6, InternalStakeholdersComponent_Conditional_6_Template, 12, 3);
            i0.ɵɵconditionalCreate(7, InternalStakeholdersComponent_Conditional_7_Template, 12, 3);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.steps);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.selectedStep == 1 ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep == 2 ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep == 3 ? 6 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.selectedStep == 4 ? 7 : -1);
        } }, dependencies: [TLUCEUQAStartComponent, TLURecommendComponent, CEURecommendComponent, InternalReviewPduComponent, ModalComponent, CardComponent, CanEditDirective, ActionButtonsComponent, DatePipe], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InternalStakeholdersComponent, [{
        type: Component,
        args: [{ selector: 'client-internal-stakeholders', imports: [TLUCEUQAStartComponent, TLURecommendComponent, CEURecommendComponent, InternalReviewPduComponent, ModalComponent, DatePipe, CardComponent, CanEditDirective, ActionButtonsComponent], template: "<div\r\n  class=\"relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100\">\r\n  <ol class=\"relative z-10 flex justify-between text-sm font-medium text-gray-500\">\r\n    @for(step of steps;track step.id;let i= $index; ){\r\n    <li class=\"flex items-center gap-1 p-2 cursor-pointer\" (click)=\"onSelectStep(step.id)\">\r\n      <span class=\"size-10 md:size-6 xl:size-8 rounded-full grid place-items-center text-xs lg:text-[14px]/6 font-bold\"\r\n        [class]=\"selectedStep==step.id?'bg-primary text-white':'bg-gray-100'\"> {{i+1}} </span>\r\n      <span class=\"hidden md:block md:text-xs\"> {{step.title}} </span>\r\n    </li>\r\n    }\r\n  </ol>\r\n</div>\r\n\r\n@if(selectedStep==1){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">Internal Consultations</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"internal_consult.open()\">\r\n      Start Internal Consultations\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    This sub stage requires CDC to identify relevant internal stakeholders for consultation to seek inputs on teaching,\r\n    learning and assessment (TL &A), delivery, cooperative education, quality assurance, and circulate the programme\r\n    document.\r\n  </p>\r\n\r\n  @if(internalConsultations?.stepName){\r\n  <card title=\"programme draft document \" [descriptions]=\"\r\n  [\r\n    `Wil Component ${internalConsultations?.extraData['includesWilComponent']?'Included':'Excluded'}`,\r\n    `Recommended To: ${internalConsultations?.extraData['recommendedTo']?.join(' ')}`,\r\n    'Date : ' + (internalConsultations?.extraData['date'] | date)\r\n  ]\r\n  \">\r\n    <action-buttons [actions]=\"['download']\" [target]=\"{name:'Internal Stakeholders Curriculum Programme Draft document',\r\n      id: internalConsultations?.extraData['draftedProgrammeFile']}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">Programme Draft document not submitted</p>\r\n  }\r\n</div>\r\n\r\n<modal #internal_consult>\r\n  <tlu-ceu-qa-start [pid]=\"pid\"></tlu-ceu-qa-start>\r\n</modal>\r\n}\r\n\r\n@if(selectedStep==2){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">ADSTLT Review</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"adstlt_review.open()\">\r\n      ADS-TLT Review\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    The Department responsible advice the department on the appropriate teaching, learning and assessment strategies on\r\n    the various courses and makes a recommendation.\r\n  </p>\r\n\r\n  @if(adstltReview?.stepName){\r\n  <card title=\" ADSTLT Support Letter/Recommendations document\" [descriptions]=\"\r\n    [\r\n      'Decision : '+ adstltReview?.extraData['decision'],\r\n      'Date : ' + (adstltReview['date'] | date)\r\n    ]\">\r\n    <action-buttons [actions]=\"['download']\" [target]=\"{name:'Internal Stakeholders ADSTLT Support Letter/Recommendations document',\r\n      id: adstltReview?.extraData['reviewFile']}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">ADSTLT Support Letter/Recommendations document not submitted</p>\r\n  }\r\n</div>\r\n\r\n<modal #adstlt_review>\r\n  <tlu-recommend [pid]=\"pid\"></tlu-recommend>\r\n</modal>\r\n}\r\n\r\n@if(selectedStep==3){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">CE Review</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"ce_review.open()\">\r\n      CE Review\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    The Department responsible ensure the integration of the Work Integrated Learning (WIL) component in the\r\n    undergraduate programme and makes a recommendation.\r\n  </p>\r\n\r\n  @if(ceuReview?.stepName){\r\n  <card title=\" CEU Support Letter/Recommendations document\" [descriptions]=\"[\r\n      'Decision : '+ ceuReview?.extraData['decision'],\r\n      'Date : ' + (ceuReview['date'] | date)\r\n      ]\">\r\n\r\n    <action-buttons [actions]=\"['download']\" [target]=\"{name:'Internal Stakeholders CEU Support Letter/Recommendations document',\r\n      id: ceuReview?.extraData['reviewFile']}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">CEU Support Letter/Recommendations document not submitted</p>\r\n  }\r\n</div>\r\n\r\n<modal #ce_review>\r\n  <ceu-recommend [pid]=\"pid\"></ceu-recommend>\r\n</modal>\r\n}\r\n\r\n@if(selectedStep==4){\r\n<div class=\"space-y-4 my-6\">\r\n  <div class=\"flex justify-between items-center gap-2 flex-wrap\">\r\n    <h2 class=\"text-xl md:text-2xl capitalize\">PDQA Recommendation</h2>\r\n    <button *canEdit=\"programme?.initiator\" class=\"btn btn-sm font-normal btn-secondary text-primary\"\r\n      (click)=\"pdqa_review.open()\">\r\n      PDQA Recommendation\r\n    </button>\r\n  </div>\r\n\r\n  <p class=\"text-gray-700 text-sm\">\r\n    The department review and verify the readiness of the programme for submission to BOS, makes a recommendation and\r\n    provide a checklist.\r\n  </p>\r\n\r\n  @if(pdqaRecommend?.stepName){\r\n  <card title=\" PDQA Support Letter/Recommendations document\" [descriptions]=\"[\r\n      'Decision : '+ pdqaRecommend?.extraData['decision'],\r\n      'Date : ' + (pdqaRecommend['date'] | date)\r\n      ]\">\r\n    <action-buttons [actions]=\"['download']\" [target]=\"{name:'Internal Stakeholders PDQA Support Letter/Recommendations document',\r\n      id: pdqaRecommend?.extraData['reviewFile']}\" />\r\n  </card>\r\n  }@else{\r\n  <p class=\"text-sm text-primary font-semibold\">PDQA Support Letter/Recommendations document not submitted</p>\r\n  }\r\n</div>\r\n\r\n<modal #pdqa_review>\r\n  <internal-pdqa-review [pid]=\"pid\"></internal-pdqa-review>\r\n</modal>\r\n}\r\n" }]
    }], () => [{ type: i1.ActivatedRoute }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InternalStakeholdersComponent, { className: "InternalStakeholdersComponent", filePath: "src/app/pages/programme/internal-stakeholders/internal-stakeholders.component.ts", lineNumber: 24 }); })();
