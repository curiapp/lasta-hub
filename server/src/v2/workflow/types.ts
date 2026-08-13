export interface WorkflowField {
    key: string;
    label: string;
    type: "text" | "textarea" | "date" | "file" | "select" | "radio" | "number" | "email" | "tel" | "url" | "checkbox" | "repeater";
    required?: boolean;
    options?: string[];
    fields?: WorkflowField[];
    minItems?: number;
    maxItems?: number;
    acceptedFileTypes?: string[];
    maxFileSizeMb?: number;
}

export interface WorkflowArtifactRequirement {
    key: string;
    label: string;
    required?: boolean;
    multiple?: boolean;
    maxFiles?: number;
    maxFileSizeMb?: number;
}

export interface WorkflowCondition {
    field: string;
    equals?: unknown;
    notEquals?: unknown;
    in?: unknown[];
}

export interface WorkflowTransition {
    event: string;
    label: string;
    to: string | string[];
    outcome?: string;
    notifyRoles?: string[];
    when?: WorkflowCondition;
}

export interface WorkflowTaskDefinition {
    id: string;
    stageId: string;
    name: string;
    description?: string;
    ownerRoles: string[];
    form?: WorkflowField[];
    artifacts?: WorkflowArtifactRequirement[];
    transitions?: WorkflowTransition[];
}

export interface WorkflowDefinition {
    id: string;
    version: number;
    name: string;
    description?: string;
    initialTask: string;
    roles?: Array<{ id: string; name: string }>;
    stages?: Array<{ id: string; name: string; description?: string; order: number }>;
    tasks: WorkflowTaskDefinition[];
}

export interface CompleteTaskInput {
    event?: string;
    actor?: {
        id?: string;
        role?: string;
    };
    formData?: Record<string, unknown>;
    artifacts?: Array<{
        type: string;
        title?: string;
        reference?: string;
        path?: string;
        mimeType?: string;
        size?: number;
    }>;
}
