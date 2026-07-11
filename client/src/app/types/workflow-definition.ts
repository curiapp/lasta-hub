export type WorkflowRole = {
  id: string;
  name: string;
}

export type WorkflowStage = {
  id: string;
  name: string;
  order: number;
}

export type WorkflowTransition = {
  event: string;
  label: string;
  to: string | string[];
  notifyRoles?: string[];
  outcome?: string;
  when?: {
    field: string;
    equals?: unknown;
    notEquals?: unknown;
    in?: unknown[];
  };
}

export type WorkflowFieldType =
  'text' | 'textarea' | 'date' | 'file' | 'select' | 'radio' | 'number' | 'email' | 'tel' | 'url' | 'checkbox' | 'repeater';

export type WorkflowField = {
  key: string;
  label: string;
  type: WorkflowFieldType;
  required: boolean;
  options?: string[];
  fields?: WorkflowField[];
  minItems?: number;
  maxItems?: number;
  acceptedFileTypes?: string[];
  maxFileSizeMb?: number;
}

export type WorkflowTask = {
  id: string;
  stageId: string;
  name: string;
  ownerRoles: string[];
  form?: WorkflowField[];
  artifacts?: WorkflowArtifactRequirement[];
  transitions: WorkflowTransition[];
}

export type WorkflowArtifactRequirement = {
  key: string;
  label: string;
  required?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSizeMb?: number;
}

export type WorkflowDefinition = {
  id: string;
  version: number;
  name: string;
  description: string;
  initialTask: string;
  roles: WorkflowRole[];
  stages: WorkflowStage[];
  tasks: WorkflowTask[];
}

export type WorkflowDefinitionSummary = {
  id: string;
  slug: string;
  name: string;
  description?: string;
  status: string;
  updatedAt: string;
}
