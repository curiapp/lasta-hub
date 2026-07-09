import curriculumDefinition from "../../../../workflow-hub/data/workflow-definition.json";
import type {
    CompleteTaskInput,
    WorkflowCondition,
    WorkflowDefinition,
    WorkflowField,
    WorkflowTaskDefinition,
    WorkflowTransition,
} from "./types";
import { WorkflowError } from "./errors";

export const defaultWorkflowDefinition = curriculumDefinition as WorkflowDefinition;
const supportedFieldTypes = new Set([
    "text", "textarea", "date", "file", "select", "radio", "number", "email", "tel", "url", "checkbox", "repeater",
]);

export function validateDefinition(definition: WorkflowDefinition) {
    if (!definition?.id || !definition.initialTask || !Array.isArray(definition.tasks) || !definition.tasks.length) {
        throw new WorkflowError("Workflow definition must include id, initialTask, and tasks", 400);
    }
    const taskKeys = new Set(definition.tasks.map((task) => task.id));
    if (taskKeys.size !== definition.tasks.length) {
        throw new WorkflowError("Workflow task IDs must be unique", 400);
    }
    if (!taskKeys.has(definition.initialTask)) {
        throw new WorkflowError(`Initial task does not exist: ${definition.initialTask}`, 400);
    }
    for (const task of definition.tasks) {
        if (!task.stageId || !task.name || !task.ownerRoles?.length) {
            throw new WorkflowError(`Task ${task.id} must include stageId, name, and ownerRoles`, 400);
        }
        for (const transition of task.transitions ?? []) {
            const targets = Array.isArray(transition.to) ? transition.to : [transition.to];
            const unknown = targets.find((target) => target !== "END" && !taskKeys.has(target));
            if (unknown) throw new WorkflowError(`Task ${task.id} targets unknown task: ${unknown}`, 400);
        }
        validateFields(task.form ?? [], task.id);
    }
}

function validateFields(fields: WorkflowField[], taskId: string, parentKey?: string) {
    const fieldKeys = new Set<string>();
    for (const field of fields) {
        if (!field.key || !field.label || !supportedFieldTypes.has(field.type)) {
            throw new WorkflowError(`Task ${taskId} contains an invalid form field`, 400);
        }
        if (fieldKeys.has(field.key)) {
            throw new WorkflowError(`Task ${taskId} contains duplicate field key: ${field.key}`, 400);
        }
        if ((field.type === "select" || field.type === "radio") && !field.options?.length) {
            throw new WorkflowError(`${field.type} field ${field.key} requires options`, 400);
        }
        if (field.type === "repeater") {
            if (!field.fields?.length) {
                throw new WorkflowError(`Repeatable group ${field.key} requires child fields`, 400);
            }
            if (field.minItems != null && field.maxItems != null && field.minItems > field.maxItems) {
                throw new WorkflowError(`Repeatable group ${field.key} has an invalid item range`, 400);
            }
            validateFields(field.fields, taskId, parentKey ? `${parentKey}.${field.key}` : field.key);
        }
        fieldKeys.add(field.key);
    }
}

export function getTaskDefinition(definition: WorkflowDefinition, taskKey: string) {
    const task = definition.tasks.find((item) => item.id === taskKey);
    if (!task) throw new WorkflowError(`Unknown task definition: ${taskKey}`, 400);
    return task;
}

export function validateCompletion(task: WorkflowTaskDefinition, input: CompleteTaskInput) {
    const missingFields = validateSubmittedFields(task.form ?? [], input.formData ?? {});
    const artifactTypes = new Set((input.artifacts ?? []).map((artifact) => artifact.type));
    const missingArtifacts = (task.artifacts ?? [])
        .filter((artifact) => artifact.required && !artifactTypes.has(artifact.key))
        .map((artifact) => artifact.label);
    const missing = [...missingFields, ...missingArtifacts];

    if (missing.length) {
        throw new WorkflowError(`Missing required items: ${missing.join(", ")}`, 400);
    }
}

function validateSubmittedFields(fields: WorkflowField[], values: Record<string, unknown>, prefix = "") {
    const errors: string[] = [];
    for (const field of fields) {
        const value = values[field.key];
        const label = prefix ? `${prefix} / ${field.label}` : field.label;
        const empty = value == null || value === "" || value === false || (Array.isArray(value) && value.length === 0);
        if (field.required && empty) {
            errors.push(label);
            continue;
        }
        if (empty) continue;

        if ((field.type === "select" || field.type === "radio") && !field.options?.includes(String(value))) {
            errors.push(`${label} has an invalid option`);
        }
        if (field.type === "checkbox" && field.options?.length) {
            const selected = Array.isArray(value) ? value.map(String) : [String(value)];
            if (selected.some((option) => !field.options?.includes(option))) {
                errors.push(`${label} has an invalid option`);
            }
        }
        if (field.type === "repeater") {
            if (!Array.isArray(value)) {
                errors.push(`${label} must be a list`);
                continue;
            }
            if (field.minItems != null && value.length < field.minItems) errors.push(`${label} requires at least ${field.minItems}`);
            if (field.maxItems != null && value.length > field.maxItems) errors.push(`${label} allows at most ${field.maxItems}`);
            value.forEach((item, index) => {
                if (item && typeof item === "object" && !Array.isArray(item)) {
                    errors.push(...validateSubmittedFields(field.fields ?? [], item as Record<string, unknown>, `${label} ${index + 1}`));
                } else {
                    errors.push(`${label} ${index + 1} is invalid`);
                }
            });
        }
    }
    return errors;
}

function matches(condition: WorkflowCondition | undefined, formData: Record<string, unknown>) {
    if (!condition) return true;
    const value = formData[condition.field];
    if (Object.hasOwn(condition, "equals")) return value === condition.equals;
    if (Object.hasOwn(condition, "notEquals")) return value !== condition.notEquals;
    if (Array.isArray(condition.in)) return condition.in.includes(value);
    return false;
}

export function selectTransition(task: WorkflowTaskDefinition, input: CompleteTaskInput): WorkflowTransition {
    const event = input.event ?? "submit";
    const formData = input.formData ?? {};
    const transition = (task.transitions ?? [])
        .find((candidate) => candidate.event === event && matches(candidate.when, formData));

    if (!transition) throw new WorkflowError("No transition matched this submission", 400);
    return transition;
}
