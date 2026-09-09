export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  token: string;
  department: {
    id: string;
    name: string;
  },
  faculty: {
    id: string;
    name: string;
  },
}

export type Programme = {
  id?: string;
  code: string;
  level: number;
  title: string;
  faculty?: string;
  department?: string;
  facultyName?: string;
  departmentName?: string;
  status?: string;
  initiator?: string;
  initiatorFirstName?: string;
  initiatorLastName?: string
  createdAt?: string;
  created_at?: string;
  description?: string;
  lastReviewDate?: string;
  actions?: string[];
  isPreProgramme?: boolean;
  stage?: "Active" | "Pending Review" | "Inactive" | "Completed" | string;
}

export type ProgrammeList = Programme[];

export type NQFLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

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

export type TutorialStage = {
  id: number;
  name: string;
  description: string;
  processes: TutorialProcess[];
}

export type TutorialProcess = {
  id: number;
  name: string;
  description: string;
  steps: { id: number; name: string; description: string }[];
  resources?: string[];
}

export type Notifications = {
  id: string;
  title: string;
  message: string;
  type: string;
  referenceId?: string;
  createdAt: string;
  isRead: boolean;
  programmeName: string;
}
