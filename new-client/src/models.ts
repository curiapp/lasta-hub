export enum FormInputTypes {
  text = 'text',
  number = 'number',
  email = 'email',
  password = 'password',
  textarea = 'textarea',
}

export enum FormStyleTypes {
  labeled = 'labeled',
  textOnly = 'textOnly',
}

interface  IFormInputBase {
  text: string;
  id: string;
  inputType?: FormInputTypes;

  // @ts-ignore
  [key: any]: string
}

interface ILabeledFormInput extends IFormInputBase {
  styleType: FormStyleTypes.labeled;
  label: string;
  description: string;
}

interface ITextOnlyFormInput extends IFormInputBase {
  styleType: FormStyleTypes.textOnly;
  label?: never;
  description?: never;
}

export type IFormInput = ILabeledFormInput | ITextOnlyFormInput;

export enum ButtonTypes {
  submit = 'submit',
  reset = 'reset',
  button = 'button',
}

export enum ButtonVariants {
  primary = 'primary',
  blue= 'blue',
  secondary = 'secondary',
  outlined = 'outlined',
  light = 'light',
  icon = 'icon',
  danger = 'danger',
}

export interface IButton {
  text?: string;
  variant: ButtonVariants;
  type: ButtonTypes;
  icon?: string;
}

export enum ProgrammeDevelopmentStage {
  needAnalysis = "Need Analysis",
  programmeDevelopment = "Programme Development",
  externalStakeholdersConsultations = "External Stakeholders Consultations",
  internalStakeholdersConsultations = "Internal Stakeholders Consultations",
  bosApcAndSenateConsultations = "BOS, APC and Senate Consultations",
  nqfRegistration = "NQF Registration"
}

export enum NeedAnalysisSubStage {
  details= 'Programme Details',
  consultations = 'Consultations',
  pdqaDecision = 'PDQA Decision',
  bosConsultation = 'BOS Consultation',
  apcRecommendation = 'APC Recommendation',
  senateRecommendation = 'Senate Recommendation',
}

export enum ProgrammeDevelopmentSubStage {
  cdcPac = "CDC PAC",
  curriculumDraft = "Curriculum Draft",
  pdqaDecision = "PDQA Decision",
}

export enum ExternalStakeholdersConsultationSubStage {
  circulationDraftProgramme = "Circulation Draft Programme",
  benchmarking = "Benchmarking",
  recommendation = "Recommendation",
}

export enum InternalStakeholdersConsultationSubStage {
  internalConsultations = "Internal Consultations",
  adstltReview = "ADSTLT Review",
  ceuReview = "CEU Review",
  pdqaRecommendation = "PDQA Recommendation",
}

export enum BosApcAndSenateConsultationSubStage {
  draftSubmission = "Draft Submission",
  facultyBos = "Faculty BOS",
  apcRecommendation = "APC Recommendation",
  senateRecommendation = "Senate Recommendation",
}

export enum NqfRegistrationSubStage {
  documentation = "Documentation",
  submission = "Submission",
  feedback = "Feedback",
  registration = "Registration",
}

export interface IProgrammeDevelopmentSubStage {
  key: string;
  name: NeedAnalysisSubStage | ProgrammeDevelopmentSubStage | ExternalStakeholdersConsultationSubStage |
    InternalStakeholdersConsultationSubStage | BosApcAndSenateConsultationSubStage |
    NqfRegistrationSubStage;
}


export interface IProgrammeDevelopmentStage {
  mainStage: ProgrammeDevelopmentStage;
  subStage: IProgrammeDevelopmentSubStage;
}

export interface IProgramme {
  lecturer: string;
  code: string;
  title: string;
  level: number;
  developmentStage: IProgrammeDevelopmentStage,
  faculty: string,
  department: string;
}
