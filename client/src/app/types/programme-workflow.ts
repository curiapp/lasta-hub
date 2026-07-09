import type { WorkflowDefinition } from './workflow-definition';

export type WorkflowUserSummary = {
  id: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email: string;
};

export type WorkflowProgrammeRecord = {
  id: string;
  title: string;
  code: string;
  level: number;
  status: string;
  faculty: string;
  department: string;
  initiatorUser?: WorkflowUserSummary | null;
  coordinatorUsers?: WorkflowUserSummary[];
};

export type WorkflowTaskInstance = {
  id: string;
  processId: string;
  programmeId: string;
  taskKey: string;
  stageKey: string;
  name: string;
  status: string;
  ownerRoles: string[];
  formData?: Record<string, unknown>;
  decision?: string;
  transitionLabel?: string;
  createdAt: string;
  completedAt?: string;
};

export type ProgrammeWorkflowDetail = {
  programme: WorkflowProgrammeRecord;
  process: {
    id: string;
    status: string;
    currentStageKey?: string;
  } | null;
  definition: WorkflowDefinition | null;
  definitionVersion?: {
    id: string;
    version: number;
  } | null;
  tasks: WorkflowTaskInstance[];
  artifacts: WorkflowArtifactRecord[];
  audit: Array<Record<string, unknown>>;
};

export type WorkflowInboxItem = {
  task: WorkflowTaskInstance;
  programme: WorkflowProgrammeRecord;
};

export type WorkflowArtifactInput = {
  type: string;
  title: string;
  reference: string;
  required: boolean;
};

export type WorkflowArtifactRecord = {
  id: string;
  taskId: string;
  type: string;
  title: string;
  reference?: string;
  mimeType?: string;
  size?: number;
  createdAt: string;
};

export type WorkflowDashboard = {
  programmeCount: number;
  activeTaskCount: number;
  completedTaskCount: number;
  processCounts: Record<string, number>;
  stageCount: number;
  taskDefinitionCount: number;
};

export type WorkflowBootstrap = {
  dashboard: WorkflowDashboard;
};
