export interface Programme {
  id?: string;
  code: string;
  level: number;
  title: string;
  faculty: string;
  members?: string[];
  initiator?: string;
  createdDate?: string;
  description?: string;
  lastReviewDate?: string;
  actions?: string[];
  department?: string;
  preProgComponent?: {
    devCode: string;
    initiator: string;
  };
  isPreProgramme?: boolean;
  stage?: "Active" | "Pending Review" | "Inactive" | "Completed" | string;
}

export type ProgrammeList = Programme[];

export type NQFLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type User = {
  id?: string;
  username: string;
  profile: string;
  firstname: string,
  lastname: string,
  usrUnit?: {
    faculty: string,
    department: string,
    type: string
  },
  emailAddress: string,
  token?: string,
  expires?: number
}

export type ToastMessage = {
  id: string;
  message: string;
  type?: string;
  classes?: string;
  duration?: number;
  show?: boolean;
  removeAfterTimeout?: boolean;
}

export type PhaseStepExtraData = {
  decision?: string;
  recommendationDoc?: string;
  endDate?: string; // ISO string
  startDate?: string; // ISO string
  organizations?: any[];
  questionnaires?: { id: string; name: string }[];
  surveyQuestions?: string[];
  status?: string;
  recommendationDate?: string; // ISO string
  recommendationFile?: string;
  apcFile?: string;
  attachments: { name: string, file: string }[]
  [key: string]: any; // allow additional dynamic properties
};

export type PhaseStep = {
  id: string;
  date: string; // ISO string
  slug: string;
  step_id: string;
  stepName: string;
  description: string;
  extraData: PhaseStepExtraData;
};

export type ProgrammePhase = {
  id: string;
  name: string;
  slug: string;
  status: string;
  description: string;
  programmeId: string;
  programmePhaseId: string;
  steps: PhaseStep[];
};
