export type WorkflowRole = {
  id: string;
  name: string;
}

export type WorkflowStage = {
  id: string;
  name: string;
  description?: string;
  order: number;
}

export type WorkflowCondition = {
  field: string;
  equals?: unknown;
  notEquals?: unknown;
  in?: unknown[];
}

export type WorkflowTransition = {
  event: string;
  label: string;
  to: string | string[];
  notifyRoles?: string[];
  outcome?: string;
  when?: WorkflowCondition;
}

export type WorkflowFieldType =
  'text' | 'textarea' | 'date' | 'file' | 'select' | 'radio' | 'number' | 'email' | 'tel' | 'url' | 'checkbox' | 'repeater' | 'user-search';

export type WorkflowField = {
  key: string;
  label: string;
  type: WorkflowFieldType;
  required: boolean;
  options?: string[];
  fields?: WorkflowField[];
  minItems?: number;
  maxItems?: number;
  multiple?: boolean;
  emailAction?: boolean;
  emailSubject?: string;
  emailMessage?: string;
  acceptedFileTypes?: string[];
  maxFileSizeMb?: number;
  visibleWhen?: WorkflowCondition;
}

export type WorkflowTask = {
  id: string;
  stageId: string;
  name: string;
  description?: string;
  ownerRoles: string[];
  visibleWhen?: WorkflowCondition;
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
  slug?: string;
  definitionId?: string;
  versionId?: string;
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
