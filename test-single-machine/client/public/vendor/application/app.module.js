"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
require("rxjs/add/operator/map");
var app_component_1 = require("./app.component");
var about_us_component_1 = require("./about-us/about-us.component");
var home_component_1 = require("./home/home.component");
var notification_component_1 = require("./notification/notification.component");
var tutorial_component_1 = require("./tutorial/tutorial.component");
var login_component_1 = require("./login/login.component");
var course_in_progress_component_1 = require("./course-in-progress/course-in-progress.component");
var course_due_for_review_component_1 = require("./course-due-for-review/course-due-for-review.component");
var course_recently_approved_component_1 = require("./course-recently-approved/course-recently-approved.component");
var side_bar_component_1 = require("./side-bar/side-bar.component");
var start_need_analysis_component_1 = require("./start-need-analysis/start-need-analysis.component");
var resume_programme_component_1 = require("./resume-programme/resume-programme.component");
var need_analysis_conclude_component_1 = require("./need-analysis-conclude/need-analysis-conclude.component");
var need_analysis_consultation_component_1 = require("./need-analysis-consultation/need-analysis-consultation.component");
var bos_component_1 = require("./bos/bos.component");
var senate_component_1 = require("./senate/senate.component");
var pac_component_1 = require("./pac/pac.component");
var cdc_component_1 = require("./cdc/cdc.component");
var consult_benchmark_component_1 = require("./consult-benchmark/consult-benchmark.component");
var pac_consult_draft_component_1 = require("./pac-consult-draft/pac-consult-draft.component");
var pac_consult_endorse_component_1 = require("./pac-consult-endorse/pac-consult-endorse.component");
var end_consult_component_1 = require("./end-consult/end-consult.component");
var bos_submit_component_1 = require("./bos-submit/bos-submit.component");
var curriculum_dev_draft_revise_component_1 = require("./curriculum-dev-draft-revise/curriculum-dev-draft-revise.component");
var curriculum_dev_draft_submit_pdu_component_1 = require("./curriculum-dev-draft-submit-pdu/curriculum-dev-draft-submit-pdu.component");
var curriculum_dev_draft_pdu_approval_component_1 = require("./curriculum-dev-draft-pdu-approval/curriculum-dev-draft-pdu-approval.component");
var curriculum_dev_pac_start_component_1 = require("./curriculum-dev-pac-start/curriculum-dev-pac-start.component");
var curriculum_dev_pac_consult_component_1 = require("./curriculum-dev-pac-consult/curriculum-dev-pac-consult.component");
var tlu_recommend_component_1 = require("./tlu-recommend/tlu-recommend.component");
var ceu_recommend_component_1 = require("./ceu-recommend/ceu-recommend.component");
var qa_recommend_component_1 = require("./qa-recommend/qa-recommend.component");
var senate_submit_component_1 = require("./senate-submit/senate-submit.component");
var final_draft_component_1 = require("./final-draft/final-draft.component");
var bos_submit_final_component_1 = require("./bos-submit-final/bos-submit-final.component");
var faculty_bos_final_component_1 = require("./faculty-bos-final/faculty-bos-final.component");
var senate_submit_final_component_1 = require("./senate-submit-final/senate-submit-final.component");
var other_faculty_bos_component_1 = require("./other-faculty-bos/other-faculty-bos.component");
var final_senate_recommend_component_1 = require("./final-senate-recommend/final-senate-recommend.component");
var nqa_preparation_component_1 = require("./nqa-preparation/nqa-preparation.component");
var pdu_recommend_component_1 = require("./pdu-recommend/pdu-recommend.component");
var nqa_reg_component_1 = require("./nqa-reg/nqa-reg.component");
var nqa_submit_component_1 = require("./nqa-submit/nqa-submit.component");
var nqa_recommend_component_1 = require("./nqa-recommend/nqa-recommend.component");
var apc_recommend_component_1 = require("./apc-recommend/apc-recommend.component");
var pdu_staff_component_1 = require("./pdu-staff/pdu-staff.component");
var coll_recommend_component_1 = require("./coll-recommend/coll-recommend.component");
var ng2_datetime_picker_1 = require("ng2-datetime-picker");
var file_upload_module_1 = require("ng2-file-upload/file-upload/file-upload.module");
var authentication_service_1 = require("./_services/authentication.service");
var short_summary_service_1 = require("./_services/short-summary.service");
var start_need_analysis_service_1 = require("./_services/start-need-analysis.service");
var consultation_service_1 = require("./_services/consultation.service");
var senate_service_1 = require("./_services/senate.service");
var conclude_service_1 = require("./_services/conclude.service");
var bos_service_1 = require("./_services/bos.service");
var bos_submit_service_1 = require("./_services/bos-submit.service");
var senate_submit_service_1 = require("./_services/senate-submit.service");
var curriculum_dev_draft_submit_pdu_service_1 = require("./_services/curriculum-dev-draft-submit-pdu.service");
var app_routing_module_1 = require("./app.routing.module");
var tlu_ceu_qa_start_component_1 = require("./tlu-ceu-qa-start/tlu-ceu-qa-start.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                notification_component_1.NotificationComponent,
                tutorial_component_1.TutorialComponent,
                about_us_component_1.AboutUsComponent,
                login_component_1.LoginComponent,
                course_in_progress_component_1.CourseInProgressComponent,
                course_due_for_review_component_1.CourseDueForReviewComponent,
                course_recently_approved_component_1.CourseRecentlyApprovedComponent,
                side_bar_component_1.SideBarComponent,
                start_need_analysis_component_1.StartNeedAnalysisComponent,
                resume_programme_component_1.ResumeComponent,
                need_analysis_consultation_component_1.NeedAnalysisConsultationComponent,
                need_analysis_conclude_component_1.NeedAnalysisConcludeComponent,
                bos_component_1.BosComponent,
                senate_component_1.SenateComponent,
                pac_component_1.PacComponent,
                end_consult_component_1.EndConsultComponent,
                bos_submit_component_1.BosSubmitComponent,
                senate_submit_component_1.SenateSubmitComponent,
                cdc_component_1.CdcComponent,
                coll_recommend_component_1.COLLRecommendComponent,
                curriculum_dev_draft_revise_component_1.CurriculumDevDraftReviseComponent,
                curriculum_dev_draft_submit_pdu_component_1.CurriculumDevDraftSubmitPDUComponent,
                curriculum_dev_draft_pdu_approval_component_1.CurriculumDevDraftPDUApprovComponent,
                curriculum_dev_pac_start_component_1.CurriculumDevPACStartComponent,
                curriculum_dev_pac_consult_component_1.CurriculumDevPACConsultComponent,
                consult_benchmark_component_1.ConsultBenchmarkComponent,
                pac_consult_draft_component_1.PacConsultDraftComponent,
                pac_consult_endorse_component_1.PacConsultEndorseComponent,
                tlu_recommend_component_1.TLURecommendComponent,
                tlu_ceu_qa_start_component_1.TLUCEUQAStartComponent,
                ceu_recommend_component_1.CEURecommendComponent,
                qa_recommend_component_1.QARecommendComponent,
                final_draft_component_1.FinalDraftComponent,
                bos_submit_final_component_1.BosSubmitFinalComponent,
                faculty_bos_final_component_1.FacultyBosFinalComponent,
                senate_submit_final_component_1.SenateSubmitFinalComponent,
                other_faculty_bos_component_1.OtherFacultyBosComponent,
                final_senate_recommend_component_1.FinalSenateRecommendComponent,
                nqa_preparation_component_1.NqaPreparationComponent,
                pdu_recommend_component_1.PduRecommendComponent,
                nqa_submit_component_1.NqaSubmitComponent,
                nqa_recommend_component_1.NQARecommendComponent,
                nqa_reg_component_1.NQARegComponent,
                apc_recommend_component_1.ApcRecommendComponent,
                pdu_staff_component_1.PDUStaffComponent
            ], imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_module_1.AppRoutingModule, ng2_datetime_picker_1.Ng2DatetimePickerModule, file_upload_module_1.FileUploadModule],
            providers: [
                common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                //AuthGuard,
                authentication_service_1.UserAuthenticationService,
                short_summary_service_1.ShortSummaryService,
                start_need_analysis_service_1.StartNeedAnalysisService,
                consultation_service_1.ConsultationService,
                senate_service_1.SenateService,
                conclude_service_1.ConcludeService,
                bos_service_1.BosService,
                bos_submit_service_1.BoSSubmitService,
                senate_submit_service_1.SenateSubmitService,
                curriculum_dev_draft_submit_pdu_service_1.CurriculumDevDraftSubmitPduService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
