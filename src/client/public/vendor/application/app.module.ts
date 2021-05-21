import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import 'rxjs/add/operator/map';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { LoginComponent } from './login/login.component';
import { CourseInProgressComponent } from './course-in-progress/course-in-progress.component';
import { CourseDueForReviewComponent } from './course-due-for-review/course-due-for-review.component';
import { CourseRecentlyApprovedComponent } from './course-recently-approved/course-recently-approved.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { StartNeedAnalysisComponent } from './start-need-analysis/start-need-analysis.component';
import { ResumeComponent } from './resume-programme/resume-programme.component';
import { NeedAnalysisConcludeComponent } from './need-analysis-conclude/need-analysis-conclude.component';
import { NeedAnalysisConsultationComponent } from './need-analysis-consultation/need-analysis-consultation.component';
import { BosComponent } from './bos/bos.component';
import { SenateComponent } from './senate/senate.component';
import { PacComponent } from './pac/pac.component';
import { CdcComponent } from './cdc/cdc.component';
import { ConsultBenchmarkComponent } from './consult-benchmark/consult-benchmark.component';
import { PacConsultDraftComponent } from './pac-consult-draft/pac-consult-draft.component';
import { PacConsultEndorseComponent } from './pac-consult-endorse/pac-consult-endorse.component';
import { EndConsultComponent } from './end-consult/end-consult.component';
import { BosSubmitComponent } from './bos-submit/bos-submit.component';
import { CurriculumDevDraftReviseComponent } from './curriculum-dev-draft-revise/curriculum-dev-draft-revise.component';
import { CurriculumDevDraftSubmitPDUComponent } from './curriculum-dev-draft-submit-pdu/curriculum-dev-draft-submit-pdu.component';
import { CurriculumDevDraftPDUApprovComponent } from './curriculum-dev-draft-pdu-approval/curriculum-dev-draft-pdu-approval.component';
import { CurriculumDevPACStartComponent } from './curriculum-dev-pac-start/curriculum-dev-pac-start.component';
import { CurriculumDevPACConsultComponent } from './curriculum-dev-pac-consult/curriculum-dev-pac-consult.component';
import { TLURecommendComponent } from './tlu-recommend/tlu-recommend.component';
import { CEURecommendComponent } from './ceu-recommend/ceu-recommend.component';
import { QARecommendComponent } from './qa-recommend/qa-recommend.component';
import { SenateSubmitComponent } from './senate-submit/senate-submit.component';
import { FinalDraftComponent } from './final-draft/final-draft.component';
import { BosSubmitFinalComponent } from './bos-submit-final/bos-submit-final.component';
import { FacultyBosFinalComponent } from './faculty-bos-final/faculty-bos-final.component';
import { SenateSubmitFinalComponent } from './senate-submit-final/senate-submit-final.component';
import { OtherFacultyBosComponent } from './other-faculty-bos/other-faculty-bos.component';
import { FinalSenateRecommendComponent } from './final-senate-recommend/final-senate-recommend.component';
import { NqaPreparationComponent } from './nqa-preparation/nqa-preparation.component';
import { PduRecommendComponent } from './pdu-recommend/pdu-recommend.component';
import { NQARegComponent } from './nqa-reg/nqa-reg.component';
import { NqaSubmitComponent } from './nqa-submit/nqa-submit.component';
import { NQARecommendComponent } from './nqa-recommend/nqa-recommend.component';
import { ApcRecommendComponent } from './apc-recommend/apc-recommend.component';
import { PDUStaffComponent } from './pdu-staff/pdu-staff.component';
import { COLLRecommendComponent } from './coll-recommend/coll-recommend.component';


import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { AuthGuard } from './_guards/auth.guards';
import { UserAuthenticationService } from './_services/authentication.service';
import { ShortSummaryService } from './_services/short-summary.service';
import { StartNeedAnalysisService } from './_services/start-need-analysis.service';
import { ConsultationService } from './_services/consultation.service';
import { SenateService } from './_services/senate.service';
import { ConcludeService } from './_services/conclude.service';
import { BosService } from './_services/bos.service';
import { BoSSubmitService } from './_services/bos-submit.service';
import { SenateSubmitService } from './_services/senate-submit.service';
import { CurriculumDevDraftSubmitPduService } from './_services/curriculum-dev-draft-submit-pdu.service';

import { AppRoutingModule } from './app.routing.module';
import { TLUCEUQAStartComponent } from './tlu-ceu-qa-start/tlu-ceu-qa-start.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotificationComponent,
        TutorialComponent,
        AboutUsComponent,
        LoginComponent,
        CourseInProgressComponent,
        CourseDueForReviewComponent,
        CourseRecentlyApprovedComponent,
        SideBarComponent,
        StartNeedAnalysisComponent,
        ResumeComponent,
        NeedAnalysisConsultationComponent,
        NeedAnalysisConcludeComponent,
        BosComponent,
        SenateComponent,
        PacComponent,
        EndConsultComponent,
        BosSubmitComponent,
        SenateSubmitComponent,
        CdcComponent,
        COLLRecommendComponent,
        CurriculumDevDraftReviseComponent,
        CurriculumDevDraftSubmitPDUComponent,
        CurriculumDevDraftPDUApprovComponent,
        CurriculumDevPACStartComponent,
        CurriculumDevPACConsultComponent,
        ConsultBenchmarkComponent,
        PacConsultDraftComponent,
        PacConsultEndorseComponent,
        TLURecommendComponent,
        TLUCEUQAStartComponent,
        CEURecommendComponent,
        QARecommendComponent,
        FinalDraftComponent,
        BosSubmitFinalComponent,
        FacultyBosFinalComponent,
        SenateSubmitFinalComponent,
        OtherFacultyBosComponent,
        FinalSenateRecommendComponent,
        NqaPreparationComponent,
        PduRecommendComponent,
        NqaSubmitComponent,
        NQARecommendComponent,
        NQARegComponent,
        ApcRecommendComponent,
        PDUStaffComponent
    ],imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, AppRoutingModule, Ng2DatetimePickerModule, FileUploadModule],
    providers: [
        Location, { provide: LocationStrategy, useClass: HashLocationStrategy },
        //AuthGuard,
        UserAuthenticationService,
        ShortSummaryService,
        StartNeedAnalysisService,
        ConsultationService,
        SenateService,
        ConcludeService,
        BosService,
        BoSSubmitService,
        SenateSubmitService,
        CurriculumDevDraftSubmitPduService

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
