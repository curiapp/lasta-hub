import {IProgrammeDevelopmentStage} from '../../models';

export interface Programme {
  id: string;
  lecturer: string;
  code: string;
  title: string;
  level: number;
  faculty: string,
  department: string;
}

export interface Decision {
  id: string;
  decisionMaker: string;
  decision: string;
  dateSubmitted: Date | null;
}

export interface ConsultationStakeholder {
  id: string;
  name: string;
  contact: string;
}
export interface ConsultationSubmission {
  id: string;
  name: string;
  dateSubmitted: Date;
}
export interface Consultations {
  id: string;
  startDate: Date | null;
  endDate: Date | null;
  stakeholders: ConsultationStakeholder[] | null;
  submissions: ConsultationSubmission[] | null;
  complete: boolean;
}
export interface NeedAnalysis{
  id: string;
  programme: string;
  consultations: Consultations;
  pdqaDecision: Decision;
  bosConsultations: Decision;
  apcRecommendation: Decision;
  senateRecommendation: Decision;
}

export interface CurriculumDevelopmentCoordinator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  workNumber: string;
}

export interface ProgrammeAdvisoryCommitteeMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  workNumber: string;
  highestQualificationName: string;
  highestQualificationInstitutionName: string;

}

export interface ProgrammeDevelopmentCommittee {
  id: string;
  cdc: CurriculumDevelopmentCoordinator[];
  pac: ProgrammeAdvisoryCommitteeMember[];
}

export interface DraftCurriculum {
  id: string;
  title: string;
  dateSubmitted: Date;
}

export interface ProgrammeDevelopment {
  id: string;
  programme: string;
  programmeDevelopmentCommittee: ProgrammeDevelopmentCommittee | null;
  curriculumDrafting: DraftCurriculum | null;
  pdqaDecision: Decision | null;
}

export interface ConsultationAndBenchmarkingItem {
  id: string;
  title: string;
  dateSubmitted: Date;
}

export interface ConsultationAndBenchmarking {
  id: string;
  finalDraft: ConsultationAndBenchmarkingItem;
  minutes: ConsultationAndBenchmarkingItem;
  endorsementLetters: ConsultationAndBenchmarkingItem;
  comments: ConsultationAndBenchmarkingItem;
  benchmarkingReports: ConsultationAndBenchmarkingItem;
}
export interface ExternalStakeholdersConsultation {
  id: string;
  programme: string;
  draftProgramme: DraftCurriculum | null;
  consultationAndBenchmarking: ConsultationAndBenchmarking | null;
  draftAndPDQARecommendation: Decision | null;
}

export interface InternalConsultationDepartment {
  id: string;
  name: string;
}
export interface InternalConsultationDepartmentDecision {
  id: string;
  department: InternalConsultationDepartment;
  decision: string;
}

export interface SupportLetter {
  id: string;
  dateSubmitted: Date;

}
export interface ADSTLTReview {
  id: string;
  recommendation: Decision;
  supportLetter: SupportLetter;
}
export interface InternalStakeholdersConsultation {
  id: string;
  programme: Programme;
  startDate: Date;
  endDate: Date;
  departments: InternalConsultationDepartmentDecision[];
  wilComponent: boolean;
  draftProgramme: DraftCurriculum;
  adstltReview: ADSTLTReview;
  ceuReview: Decision;
  pdqaRecommendation: Decision;
}

export interface DraftToBosSubmission {
  id: string;
  letters: ConsultationAndBenchmarkingItem;
  pacMinutes: ConsultationAndBenchmarkingItem;
  benchmarking: ConsultationAndBenchmarkingItem;
  draftDocument: ConsultationAndBenchmarkingItem;
  checklist: ConsultationAndBenchmarkingItem;
  completed: boolean;
}

export interface BOSAPCSenateConsultation {
  id: string;
  programme: string;
  draftSubmission: DraftToBosSubmission  | null;
  facultyBOSConsultation: Decision  | null;
  apcRecommendation: Decision  | null;
  finalSenateRecommendation: Decision  | null;
}

export interface NQFSubmission {
  id: string;
  initialSubmission: boolean;
  resubmitted: boolean;
}

export interface NQFCompleteRegistration {
  id: string;
  nqfId: string;
  dateSubmitted: Date;
}
export interface NQFRegistration {
  id: string;
  programme: string;
  documentation: boolean;
  submission: NQFSubmission  | null;
  feedback: Decision  | null;
  registration: NQFCompleteRegistration  | null;
}
