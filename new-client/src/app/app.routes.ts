import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {inject} from '@angular/core';
import {AuthMiddlewareService} from './services/middleware/auth-middleware.service';
import {ProgrammeComponent} from './programme/programme.component';
import {NeedAnalysisComponent} from './need-analysis/need-analysis.component';
import {NeedAnalysisConsultationsComponent} from './need-analysis-consultations/need-analysis-consultations.component';
import {ProgrammeDetailsComponent} from './programme-details/programme-details.component';
import {NeedAnalysisPdqaDecisionComponent} from './need-analysis-pdqa-decision/need-analysis-pdqa-decision.component';
import {
  NeedAnalysisBosConsultationComponent
} from './need-analysis-bos-consultation/need-analysis-bos-consultation.component';
import {
  NeedAnalysisApcRecommendationComponent
} from './need-analysis-apc-recommendation/need-analysis-apc-recommendation.component';
import {
  NeedAnalysisSenateRecommendationComponent
} from './need-analysis-senate-recommendation/need-analysis-senate-recommendation.component';
import {ProgrammeDevelopmentComponent} from './programme-development/programme-development.component';
import {
  ProgrammeDevelopmentCdcPacComponent
} from './programme-development-cdc-pac/programme-development-cdc-pac.component';
import {
  ProgrammeDevelopmentCurriculumDraftComponent
} from './programme-development-curriculum-draft/programme-development-curriculum-draft.component';
import {
  ProgrammeDevelopmentPdqaDecisionComponent
} from './programme-development-pdqa-decision/programme-development-pdqa-decision.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {TutorialsComponent} from './tutorials/tutorials.component';
import {FaqComponent} from './faq/faq.component';
import {
  ExternalStakeholdersConsultationsComponent
} from './external-stakeholders-consultations/external-stakeholders-consultations.component';
import {
  ExternalStakeholdersConsultationCirculationComponent
} from './external-stakeholders-consultation-circulation/external-stakeholders-consultation-circulation.component';
import {
  ExternalStakeholdersConsultationBenchmarkingComponent
} from './external-stakeholders-consultation-benchmarking/external-stakeholders-consultation-benchmarking.component';
import {
  ExternalStakeholdersConsultationRecommendationsComponent
} from './external-stakeholders-consultation-recommendations/external-stakeholders-consultation-recommendations.component';
import {
  InternalStakeholdersConsultationPdqaRecommendationComponent
} from './internal-stakeholders-consultation-pdqa-recommendation/internal-stakeholders-consultation-pdqa-recommendation.component';
import {
  InternalStakeholdersConsultationCeuReviewComponent
} from './internal-stakeholders-consultation-ceu-review/internal-stakeholders-consultation-ceu-review.component';
import {
  InternalStakeholdersConsultationAdstltReviewComponent
} from './internal-stakeholders-consultation-adstlt-review/internal-stakeholders-consultation-adstlt-review.component';
import {
  InternalStakeholdersConsultationInternalConsultationsComponent
} from './internal-stakeholders-consultation-internal-consultations/internal-stakeholders-consultation-internal-consultations.component';
import {
  InternalStakeholdersConsultationsComponent
} from './internal-stakeholders-consultations/internal-stakeholders-consultations.component';
import {BosApcSenateConsultationComponent} from './bos-apc-senate-consultation/bos-apc-senate-consultation.component';
import {
  BosApcSenateConsultationDraftSubmissionComponent
} from './bos-apc-senate-consultation-draft-submission/bos-apc-senate-consultation-draft-submission.component';
import {
  BosApcSenateConsultationFacultyBosComponent
} from './bos-apc-senate-consultation-faculty-bos/bos-apc-senate-consultation-faculty-bos.component';
import {
  BosApcSenateConsultationApcRecommendationComponent
} from './bos-apc-senate-consultation-apc-recommendation/bos-apc-senate-consultation-apc-recommendation.component';
import {
  BosApcSenateConsultationSenateRecommendationComponent
} from './bos-apc-senate-consultation-senate-recommendation/bos-apc-senate-consultation-senate-recommendation.component';
import {NqfRegistrationComponent} from './nqf-registration/nqf-registration.component';
import {
  NqfRegistrationDocumentationComponent
} from './nqf-registration-documentation/nqf-registration-documentation.component';
import {NqfRegistrationSubmissionComponent} from './nqf-registration-submission/nqf-registration-submission.component';
import {NqfRegistrationFeedbackComponent} from './nqf-registration-feedback/nqf-registration-feedback.component';
import {
  NqfRegistrationRegistrationComponent
} from './nqf-registration-registration/nqf-registration-registration.component';
import {CreateNewProgrammeComponent} from './create-new-programme/create-new-programme.component';
import {
  StartNeedAnalysisConsultationsComponent
} from './start-need-analysis-consultations/start-need-analysis-consultations.component';
import {
  NeedAnalysisAddStakeholderComponent
} from './need-analysis-add-stakeholder/need-analysis-add-stakeholder.component';
import {
  NeedAnalysisAddSubmissionComponent
} from './need-analysis-add-submission/need-analysis-add-submission.component';

export const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [() => inject(AuthMiddlewareService).canActivate()]},
  {path: 'sign-in', component: SignInComponent, canActivate: [() => inject(AuthMiddlewareService).canActivateSignIn()]},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'tutorials', component: TutorialsComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'create-new-programme', component: CreateNewProgrammeComponent},
  {path: 'need-analysis/start-consultations', component: StartNeedAnalysisConsultationsComponent},
  {path: 'need-analysis/consultations/add-stakeholder', component: NeedAnalysisAddStakeholderComponent},
  {path: 'need-analysis/consultations/add-submission', component: NeedAnalysisAddSubmissionComponent},
  {
    path: 'programme/:programmeId', component: ProgrammeComponent, children: [
      {path: '', redirectTo: 'need-analysis', pathMatch: 'full'},
      {
        path: 'need-analysis', component: NeedAnalysisComponent, children: [
          {path: '', redirectTo: 'programme-details', pathMatch: 'full'},
          {path: 'programme-details', component: ProgrammeDetailsComponent},
          {path: 'consultations', component: NeedAnalysisConsultationsComponent},
          {path: 'pdqa-decision', component: NeedAnalysisPdqaDecisionComponent},
          {path: 'bos-consultation', component: NeedAnalysisBosConsultationComponent},
          {path: 'apc-recommendation', component: NeedAnalysisApcRecommendationComponent},
          {path: 'senate-recommendation', component: NeedAnalysisSenateRecommendationComponent}
        ]
      },
      {
        path: 'programme-development', component: ProgrammeDevelopmentComponent, children: [
          {path: '', redirectTo: 'cdc-pac', pathMatch: 'full'},
          {path: 'cdc-pac', component: ProgrammeDevelopmentCdcPacComponent},
          {path: 'curriculum-draft', component: ProgrammeDevelopmentCurriculumDraftComponent},
          {path: 'pdqa-decision', component: ProgrammeDevelopmentPdqaDecisionComponent}
        ]
      },
      {
        path: 'external-stakeholders-consultations', component: ExternalStakeholdersConsultationsComponent, children: [
          {path: '', redirectTo: 'circulation-draft-programme', pathMatch: 'full'},
          {path: 'circulation-draft-programme', component: ExternalStakeholdersConsultationCirculationComponent},
          {path: 'benchmarking', component: ExternalStakeholdersConsultationBenchmarkingComponent},
          {path: 'recommendation', component: ExternalStakeholdersConsultationRecommendationsComponent}
        ]
      },
      {
        path: 'internal-stakeholders-consultations', component: InternalStakeholdersConsultationsComponent, children: [
          {path: '', redirectTo: 'internal-consultations', pathMatch: 'full'},
          {path: 'internal-consultations', component: InternalStakeholdersConsultationInternalConsultationsComponent},
          {path: 'adstlt-review', component: InternalStakeholdersConsultationAdstltReviewComponent},
          {path: 'ceu-review', component: InternalStakeholdersConsultationCeuReviewComponent},
          {path: 'pdqa-recommendation', component: InternalStakeholdersConsultationPdqaRecommendationComponent}
        ]
      },
      {
        path: 'bos-apc-senate-consultations', component: BosApcSenateConsultationComponent, children: [
          {path: '', redirectTo: 'draft-submission', pathMatch: 'full'},
          {path: 'draft-submission', component: BosApcSenateConsultationDraftSubmissionComponent},
          {path: 'faculty-bos', component: BosApcSenateConsultationFacultyBosComponent},
          {path: 'apc-recommendation', component: BosApcSenateConsultationApcRecommendationComponent},
          {path: 'senate-recommendation', component: BosApcSenateConsultationSenateRecommendationComponent}
        ]
      },
      {
        path: 'nqf-registration', component: NqfRegistrationComponent, children: [
          {path: '', redirectTo: 'documentation', pathMatch: 'full'},
          {path: 'documentation', component: NqfRegistrationDocumentationComponent},
          {path: 'submission', component: NqfRegistrationSubmissionComponent},
          {path: 'feedback', component: NqfRegistrationFeedbackComponent},
          {path: 'registration', component: NqfRegistrationRegistrationComponent},
        ]
      }
    ]
  }
];
