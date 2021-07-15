"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var about_us_component_1 = require("./about-us/about-us.component");
var home_component_1 = require("./home/home.component");
var notification_component_1 = require("./notification/notification.component");
var tutorial_component_1 = require("./tutorial/tutorial.component");
var login_component_1 = require("./login/login.component");
var resume_programme_component_1 = require("./resume-programme/resume-programme.component");
var start_need_analysis_component_1 = require("./start-need-analysis/start-need-analysis.component");
var need_analysis_consultation_component_1 = require("./need-analysis-consultation/need-analysis-consultation.component");
var bos_component_1 = require("./bos/bos.component");
var senate_component_1 = require("./senate/senate.component");
var need_analysis_conclude_component_1 = require("./need-analysis-conclude/need-analysis-conclude.component");
var pac_component_1 = require("./pac/pac.component");
var cdc_component_1 = require("./cdc/cdc.component");
var end_consult_component_1 = require("./end-consult/end-consult.component");
var curriculum_dev_draft_revise_component_1 = require("./curriculum-dev-draft-revise/curriculum-dev-draft-revise.component");
var curriculum_dev_draft_submit_pdu_component_1 = require("./curriculum-dev-draft-submit-pdu/curriculum-dev-draft-submit-pdu.component");
var curriculum_dev_draft_pdu_approval_component_1 = require("./curriculum-dev-draft-pdu-approval/curriculum-dev-draft-pdu-approval.component");
var curriculum_dev_pac_start_component_1 = require("./curriculum-dev-pac-start/curriculum-dev-pac-start.component");
var curriculum_dev_pac_consult_component_1 = require("./curriculum-dev-pac-consult/curriculum-dev-pac-consult.component");
var tlu_ceu_qa_start_component_1 = require("./tlu-ceu-qa-start/tlu-ceu-qa-start.component");
var tlu_recommend_component_1 = require("./tlu-recommend/tlu-recommend.component");
var ceu_recommend_component_1 = require("./ceu-recommend/ceu-recommend.component");
var qa_recommend_component_1 = require("./qa-recommend/qa-recommend.component");
var bos_submit_component_1 = require("./bos-submit/bos-submit.component");
var senate_submit_component_1 = require("./senate-submit/senate-submit.component");
var consult_benchmark_component_1 = require("./consult-benchmark/consult-benchmark.component");
var pac_consult_draft_component_1 = require("./pac-consult-draft/pac-consult-draft.component");
var pac_consult_endorse_component_1 = require("./pac-consult-endorse/pac-consult-endorse.component");
var final_draft_component_1 = require("./final-draft/final-draft.component");
var bos_submit_final_component_1 = require("./bos-submit-final/bos-submit-final.component");
var faculty_bos_final_component_1 = require("./faculty-bos-final/faculty-bos-final.component");
var senate_submit_final_component_1 = require("./senate-submit-final/senate-submit-final.component");
var other_faculty_bos_component_1 = require("./other-faculty-bos/other-faculty-bos.component");
var final_senate_recommend_component_1 = require("./final-senate-recommend/final-senate-recommend.component");
var nqa_preparation_component_1 = require("./nqa-preparation/nqa-preparation.component");
var pdu_recommend_component_1 = require("./pdu-recommend/pdu-recommend.component");
var nqa_recommend_component_1 = require("./nqa-recommend/nqa-recommend.component");
var nqa_reg_component_1 = require("./nqa-reg/nqa-reg.component");
var nqa_submit_component_1 = require("./nqa-submit/nqa-submit.component");
var apc_recommend_component_1 = require("./apc-recommend/apc-recommend.component");
var pdu_staff_component_1 = require("./pdu-staff/pdu-staff.component");
var coll_recommend_component_1 = require("./coll-recommend/coll-recommend.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'notifications', component: notification_component_1.NotificationComponent },
    { path: 'StartNeedAnalysis', component: start_need_analysis_component_1.StartNeedAnalysisComponent },
    { path: 'tutorials', component: tutorial_component_1.TutorialComponent },
    { path: 'about-us', component: about_us_component_1.AboutUsComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'resume', component: resume_programme_component_1.ResumeComponent },
    { path: 'NeedAnalysisConsult', component: need_analysis_consultation_component_1.NeedAnalysisConsultationComponent },
    { path: 'NeedAnalysisConclude', component: need_analysis_conclude_component_1.NeedAnalysisConcludeComponent },
    { path: 'bos', component: bos_component_1.BosComponent },
    { path: 'senate', component: senate_component_1.SenateComponent },
    { path: 'pac', component: pac_component_1.PacComponent },
    { path: 'cdc', component: cdc_component_1.CdcComponent },
    { path: 'endconsult', component: end_consult_component_1.EndConsultComponent },
    { path: 'bossubmit', component: bos_submit_component_1.BosSubmitComponent },
    { path: 'senatesubmit', component: senate_submit_component_1.SenateSubmitComponent },
    { path: 'curriculum-Revise', component: curriculum_dev_draft_revise_component_1.CurriculumDevDraftReviseComponent },
    { path: 'curriculum-dev-draft-submit-pdu', component: curriculum_dev_draft_submit_pdu_component_1.CurriculumDevDraftSubmitPDUComponent },
    { path: 'curriculum-dev-draft-pdu-approval', component: curriculum_dev_draft_pdu_approval_component_1.CurriculumDevDraftPDUApprovComponent },
    { path: 'curriculum-dev-pac-start', component: curriculum_dev_pac_start_component_1.CurriculumDevPACStartComponent },
    { path: 'curriculum-dev-pac-consult', component: curriculum_dev_pac_consult_component_1.CurriculumDevPACConsultComponent },
    { path: 'consult-benchmark', component: consult_benchmark_component_1.ConsultBenchmarkComponent },
    { path: 'pac-consult-draft', component: pac_consult_draft_component_1.PacConsultDraftComponent },
    { path: 'pac-consult-endorse', component: pac_consult_endorse_component_1.PacConsultEndorseComponent },
    { path: 'tlu-ceu-qa-start', component: tlu_ceu_qa_start_component_1.TLUCEUQAStartComponent },
    { path: 'tlu-recommend', component: tlu_recommend_component_1.TLURecommendComponent },
    { path: 'ceu-recommend', component: ceu_recommend_component_1.CEURecommendComponent },
    { path: 'coll-recommend', component: coll_recommend_component_1.COLLRecommendComponent },
    { path: 'qa-recommend', component: qa_recommend_component_1.QARecommendComponent },
    { path: 'final-draft', component: final_draft_component_1.FinalDraftComponent },
    { path: 'bos-submit-final', component: bos_submit_final_component_1.BosSubmitFinalComponent },
    { path: 'faculty-bos-final', component: faculty_bos_final_component_1.FacultyBosFinalComponent },
    { path: 'senate-submit-final', component: senate_submit_final_component_1.SenateSubmitFinalComponent },
    { path: 'other-faculty-bos', component: other_faculty_bos_component_1.OtherFacultyBosComponent },
    { path: 'final-senate-recommend', component: final_senate_recommend_component_1.FinalSenateRecommendComponent },
    { path: 'nqa-preparation', component: nqa_preparation_component_1.NqaPreparationComponent },
    { path: 'pdu-recommend', component: pdu_recommend_component_1.PduRecommendComponent },
    { path: 'nqa-recommend', component: nqa_recommend_component_1.NQARecommendComponent },
    { path: 'coll-recommend', component: coll_recommend_component_1.COLLRecommendComponent },
    { path: 'nqa-reg', component: nqa_reg_component_1.NQARegComponent },
    { path: 'nqa-submit', component: nqa_submit_component_1.NqaSubmitComponent },
    { path: 'apc-recommend', component: apc_recommend_component_1.ApcRecommendComponent },
    { path: 'pdu-staff', component: pdu_staff_component_1.PDUStaffComponent },
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(appRoutes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
