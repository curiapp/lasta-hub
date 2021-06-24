import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { ResumeProgrammeComponent } from './resume-programme/resume-programme.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartNeedAnalysisComponent } from './start-need-analysis/start-need-analysis.component';
import { StartNeedAnalysisService } from './services/start-need-analysis.service';
import {  HttpModule } from '@angular/http';
import { NeedAnalysisConcludeComponent } from './need-analysis-conclude/need-analysis-conclude.component';
import { FileSelectDirective, FileUploadModule } from 'ng2-file-upload';
import { NeedAnalysisConsultationComponent } from './need-analysis-consult/need-analysis-consult.component';
import { EndConsultComponent } from './end-consult/end-consult.component';
import { BosComponent } from './bos/bos.component';
import { BosSubmitComponent } from './bos-submit/bos-submit.component';
import { BoSSubmitService } from './services/bos-submit.service';
import { BosSubmitFinalComponent } from './bos-submit-final/bos-submit-final.component';
import { CurriculumDevDraftSubmitPduService } from './services/curriculum-dev-draft-submit-pdu.service';
import { SenateComponent } from './senate/senate.component';
import { CdcComponent } from './cdc/cdc.component';
import { PacComponent } from './pac/pac.component';
import { CurriculumDevDraftReviseComponent } from './curriculum-dev-draft-revise/curriculum-dev-draft-revise.component';
import { CurriculumDevDraftSubmitPDUComponent } from './curriculum-dev-draft-submit-pdu/curriculum-dev-draft-submit-pdu.component';
import { CurriculumDevDraftPDUApprovComponent } from './curriculum-dev-draft-pdu-approval/curriculum-dev-draft-pdu-approval.component';
import { CurriculumDevPACStartComponent } from './curriculum-dev-pac-start/curriculum-dev-pac-start.component';
import { CurriculumDevPACConsultComponent } from './curriculum-dev-pac-consult/curriculum-dev-pac-consult.component';
import { ConsultBenchmarkComponent } from './consult-benchmark/consult-benchmark.component';
import { PacConsultDraftComponent } from './pac-consult-draft/pac-consult-draft.component';
import { PacConsultEndorseComponent } from './pac-consult-endorse/pac-consult-endorse.component';
import { NqaPreparationComponent } from './nqa-preparation/nqa-preparation.component';
import { PduRecommendComponent } from './pdu-recommend/pdu-recommend.component';
import { NQARecommendComponent } from './nqa-recommend/nqa-recommend.component';
import { NQARegComponent } from './nqa-reg/nqa-reg.component';
import { NqaSubmitComponent } from './nqa-submit/nqa-submit.component';
import { FinalDraftComponent } from './final-draft/final-draft.component';
import { FacultyBosFinalComponent } from './faculty-bos-final/faculty-bos-final.component';
import { SenateSubmitFinalComponent } from './senate-submit-final/senate-submit-final.component';
import { TLUCEUQAStartComponent } from './tlu-ceu-qa-start/tlu-ceu-qa-start.component';
import { TLURecommendComponent } from './tlu-recommend/tlu-recommend.component';
import { QARecommendComponent } from './qa-recommend/qa-recommend.component';
import { COLLRecommendComponent } from './coll-recommend/coll-recommend.component';
import { CEURecommendComponent } from './ceu-recommend/ceu-recommend.component';
import { SenateSubmitService } from './services/senate-submit.service';
import { TutorialComponent } from './tutorials/tutorials.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { SenateSubmitComponent } from './senate-submit/senate-submit.component';
import { OtherFacultyBosComponent } from './other-faculty-bos/other-faculty-bos.component';
import { ApcRecommendComponent } from './apc-recommend/apc-recommend.component';
import { FinalSenateRecommendComponent } from './final-senate-recommend/final-senate-recommend.component';
import { LoginComponent } from './login/login.component';
import { CourseInProgressComponent } from './course-in-progress/course-in-progress.component';
import { CourseDueForReviewComponent } from './course-due-for-review/course-due-for-review.component';
import { CourseRecentlyApprovedComponent } from './course-recently-approved/course-recently-approved.component';
import { ShortSummaryService } from './services/short-summary.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResumeProgrammeComponent,
    StartNeedAnalysisComponent,
    NeedAnalysisConcludeComponent,
    NeedAnalysisConsultationComponent,
    EndConsultComponent,
    BosComponent,
    BosSubmitComponent,
    BosSubmitFinalComponent,
    SenateComponent,
    CdcComponent,
    PacComponent,
    CurriculumDevDraftReviseComponent,
    CurriculumDevDraftSubmitPDUComponent,
    CurriculumDevDraftPDUApprovComponent,
    CurriculumDevPACStartComponent,
    CurriculumDevPACConsultComponent,
    ConsultBenchmarkComponent,
    PacConsultDraftComponent,
    PacConsultEndorseComponent,
    NqaPreparationComponent,
    PduRecommendComponent,
    NQARecommendComponent,
    NQARegComponent,
    NqaSubmitComponent,
    FinalDraftComponent,
    FacultyBosFinalComponent,
    SenateSubmitFinalComponent,
    SenateSubmitComponent,

    TLUCEUQAStartComponent,
    TLURecommendComponent,
    QARecommendComponent,
    COLLRecommendComponent,
    CEURecommendComponent,
    TutorialComponent,
    AboutUsComponent,
    OurTeamComponent,
    OtherFacultyBosComponent,
    ApcRecommendComponent,
    FinalSenateRecommendComponent,
    LoginComponent,
    CourseInProgressComponent,
    CourseDueForReviewComponent,
    CourseRecentlyApprovedComponent
  ],
  imports: [
    FileUploadModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    FormsModule, ReactiveFormsModule
  ],
  providers: [StartNeedAnalysisService,
    BoSSubmitService,
    CurriculumDevDraftSubmitPduService,
    SenateSubmitService, 
    ShortSummaryService,
    Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
