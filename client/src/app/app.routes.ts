import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { ResumeProgrammeComponent } from './resume-programme/resume-programme.component';
// import { StartNeedAnalysisComponent } from './start-need-analysis/start-need-analysis.component';
// import { NeedAnalysisConcludeComponent } from './need-analysis-conclude/need-analysis-conclude.component';
// import { EndConsultComponent } from './end-consult/end-consult.component';
// import { BosSubmitComponent } from './bos-submit/bos-submit.component';
// import { SenateComponent } from './senate/senate.component';
// import { CdcComponent } from './cdc/cdc.component';
// import { PacComponent } from './pac/pac.component';
// import { CurriculumDevDraftReviseComponent } from './curriculum-dev-draft-revise/curriculum-dev-draft-revise.component';
// import { CurriculumDevDraftSubmitPDUComponent } from './curriculum-dev-draft-submit-pdu/curriculum-dev-draft-submit-pdu.component';
// import { CurriculumDevDraftPDUApprovComponent } from './curriculum-dev-draft-pdu-approval/curriculum-dev-draft-pdu-approval.component';
// import { CurriculumDevPACStartComponent } from './curriculum-dev-pac-start/curriculum-dev-pac-start.component';
// import { CurriculumDevPACConsultComponent } from './curriculum-dev-pac-consult/curriculum-dev-pac-consult.component';
// import { ConsultBenchmarkComponent } from './consult-benchmark/consult-benchmark.component';
// import { PacConsultDraftComponent } from './pac-consult-draft/pac-consult-draft.component';
// import { PacConsultEndorseComponent } from './pac-consult-endorse/pac-consult-endorse.component';
// import { NqaPreparationComponent } from './nqa-preparation/nqa-preparation.component';
// import { PduRecommendComponent } from './pdu-recommend/pdu-recommend.component';
// import { NQARecommendComponent } from './nqa-recommend/nqa-recommend.component';
// import { CEURecommendComponent } from './ceu-recommend/ceu-recommend.component';
// import { NQARegComponent } from './nqa-reg/nqa-reg.component';
// import { NqaSubmitComponent } from './nqa-submit/nqa-submit.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
// import { NeedAnalysisConsultationComponent } from './need-analysis-consult/need-analysis-consult.component';
// import { BosComponent } from './bos/bos.component';
import { AboutUsComponent } from './about-us/about-us.component';
// import { ApcRecommendComponent } from './apc-recommend/apc-recommend.component';
// import { ApcComponent } from './apc/apc.component';
// import { BosSubmitFinalComponent } from './bos-submit-final/bos-submit-final.component';
// import { COLLRecommendComponent } from './coll-recommend/coll-recommend.component';
// import { FacultyBosFinalComponent } from './faculty-bos-final/faculty-bos-final.component';
// import { FinalDraftComponent } from './final-draft/final-draft.component';
// import { FinalSenateRecommendComponent } from './final-senate-recommend/final-senate-recommend.component';
// import { InternalReviewPduComponent } from './internal-review-pdu/internal-review-pdu.component';
// import { OtherFacultyBosComponent } from './other-faculty-bos/other-faculty-bos.component';
import { OurTeamComponent } from './our-team/our-team.component';
// import { QARecommendComponent } from './qa-recommend/qa-recommend.component';
// import { SenateSubmitFinalComponent } from './senate-submit-final/senate-submit-final.component';
// import { SenateSubmitComponent } from './senate-submit/senate-submit.component';
// import { TLUCEUQAStartComponent } from './tlu-ceu-qa-start/tlu-ceu-qa-start.component';
// import { TLURecommendComponent } from './tlu-recommend/tlu-recommend.component';
import { TutorialComponent } from './tutorials/tutorials.component';

export const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: 'PDU - Home' } },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, data: { title: 'PDU - Main' },
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full', data: { title: 'PDU - Home' } },
      { path: 'home', component: HomeComponent, data: { title: 'PDU - Home' } },
      { path: 'tutorials', component: TutorialComponent, data: { title: 'PDU - Tutorials' } },
      { path: 'about-us', component: AboutUsComponent, data: { title: 'PDU - About Us' } },
      { path: 'our-team', component: OurTeamComponent, data: { title: 'PDU - Our Team' } },
      // { path: 'resume', component: ResumeProgrammeComponent, data: { title: 'PDU - Resume' } },
      // { path: 'StartNeedAnalysis', component: StartNeedAnalysisComponent, data: { title: 'PDU - Need Analysis' } },
      // { path: 'NeedAnalysisConclude', component: NeedAnalysisConcludeComponent, data: { title: 'PDU - Need Analysis Conclude' } },
      // { path: 'endconsult', component: EndConsultComponent, data: { title: 'PDU - End consultation' } },
      // { path: 'bossubmit', component: BosSubmitComponent, data: { title: 'PDU - BOS Submission' } },
      // { path: 'senate', component: SenateComponent },
      // { path: 'cdc', component: CdcComponent },
      // { path: 'pac', component: PacComponent },
      // { path: 'curriculum-Revise', component: CurriculumDevDraftReviseComponent },
      // { path: 'curriculum-dev-draft-submit-pdu', component: CurriculumDevDraftSubmitPDUComponent },
      // { path: 'curriculum-dev-draft-pdu-approval', component: CurriculumDevDraftPDUApprovComponent },
      // { path: 'curriculum-dev-pac-start', component: CurriculumDevPACStartComponent },
      // { path: 'curriculum-dev-pac-consult', component: CurriculumDevPACConsultComponent },
      // { path: 'consult-benchmark', component: ConsultBenchmarkComponent },
      // { path: 'pac-consult-draft', component: PacConsultDraftComponent },
      // { path: 'pac-consult-endorse', component: PacConsultEndorseComponent },
      // { path: 'nqa-preparation', component: NqaPreparationComponent },
      // { path: 'pdu-recommend', component: PduRecommendComponent },
      // { path: 'nqa-recommend', component: NQARecommendComponent },
      // { path: 'ceu-recommend', component: CEURecommendComponent },
      // { path: 'nqa-reg', component: NQARegComponent },
      // { path: 'nqa-submit', component: NqaSubmitComponent },
      // // { path:'pdu-staff',component:PDUStaffComponent},
      // { path: 'NeedAnalysisConsult', component: NeedAnalysisConsultationComponent },
      // { path: 'endconsult', component: EndConsultComponent },
      // { path: 'bos', component: BosComponent },
      // { path: 'bossubmit', component: BosSubmitComponent },
      // { path: 'bos-submit-final', component: BosSubmitFinalComponent },
      // { path: 'tlu-ceu-qa-start', component: TLUCEUQAStartComponent },
      // { path: 'tlu-recommend', component: TLURecommendComponent },
      // { path: 'coll-recommend', component: COLLRecommendComponent },
      // { path: 'qa-recommend', component: QARecommendComponent },
      // { path: 'senatesubmit', component: SenateSubmitComponent },
      // { path: 'final-draft', component: FinalDraftComponent },
      // { path: 'faculty-bos-final', component: FacultyBosFinalComponent },
      // { path: 'senate-submit-final', component: SenateSubmitFinalComponent },
      // { path: 'tlu-ceu-qa-start', component: TLUCEUQAStartComponent },
      // { path: 'tlu-recommend', component: TLURecommendComponent },
      // { path: 'coll-recommend', component: COLLRecommendComponent },
      // { path: 'qa-recommend', component: QARecommendComponent },
      // { path: 'other-faculty-bos', component: OtherFacultyBosComponent },
      // // { path: 'apc-recommend', component: ApcRecommendComponent},
      // { path: 'final-senate-recommend', component: FinalSenateRecommendComponent },
      // { path: 'apc', component: ApcComponent },
      // { path: 'app-internal-review-pdu', component: InternalReviewPduComponent },
      // { path: 'apc-recommend', component: ApcRecommendComponent }
    ]
  },

];
