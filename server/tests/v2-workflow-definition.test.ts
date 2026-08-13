import { describe, expect, it } from "vitest";
import lastaWorkflowDefinition from "../src/v2/workflow/data/lasta-workflow-definition.json";
import {
    defaultWorkflowDefinition,
    getTaskDefinition,
    selectTransition,
    validateCompletion,
    validateDefinition,
} from "../src/v2/workflow/definition";
import type { WorkflowDefinition } from "../src/v2/workflow/types";

describe("v2 workflow definition", () => {
    it("validates the workflow generated from the legacy Angular forms", () => {
        const definition = lastaWorkflowDefinition as WorkflowDefinition;

        expect(() => validateDefinition(definition)).not.toThrow();
        expect(definition.stages).toHaveLength(6);
        expect(definition.tasks).toHaveLength(25);
        expect(definition.tasks.find((task) => task.id === "appoint-pac-members")?.form?.[0].type)
            .toBe("repeater");
    });

    it("accepts the curriculum workflow and resolves its first transition", () => {
        expect(() => validateDefinition(defaultWorkflowDefinition)).not.toThrow();
        const task = getTaskDefinition(defaultWorkflowDefinition, "programme-resume");
        const transition = selectTransition(task, {
            formData: {
                rationale: "Needed",
                targetMarket: "Students",
                expectedLevel: "7",
            },
        });

        expect(transition.to).toBe("stakeholders-consultation");
    });

    it("enforces required fields and artifacts", () => {
        const task = getTaskDefinition(defaultWorkflowDefinition, "programme-resume");

        expect(() => validateCompletion(task, { formData: {}, artifacts: [] }))
            .toThrow("Missing required items");
    });

    it("selects conditional approval branches", () => {
        const task = getTaskDefinition(defaultWorkflowDefinition, "pdqa-recommendation");

        expect(selectTransition(task, { formData: { decision: "proceed" } }).to)
            .toBe("bos-need-analysis");
        expect(selectTransition(task, { formData: { decision: "inconclusive" } }).to)
            .toBe("END");
    });

    it("validates radio, checkbox-group, and repeatable member fields", () => {
        const task = {
            id: "pac-members",
            stageId: "setup",
            name: "PAC Members",
            ownerRoles: ["pdqa"],
            form: [
                { key: "meetingType", label: "Meeting Type", type: "radio" as const, required: true, options: ["online", "in-person"] },
                { key: "expertise", label: "Expertise", type: "checkbox" as const, options: ["industry", "academic"] },
                {
                    key: "members",
                    label: "PAC Members",
                    type: "repeater" as const,
                    required: true,
                    minItems: 1,
                    fields: [
                        { key: "organisation", label: "Organisation", type: "text" as const, required: true },
                        { key: "firstName", label: "First Name", type: "text" as const, required: true },
                        { key: "lastName", label: "Last Name", type: "text" as const, required: true },
                        { key: "email", label: "Email", type: "email" as const, required: true },
                    ],
                },
            ],
            transitions: [{ event: "submit", label: "Continue", to: "END" }],
        };

        expect(() => validateCompletion(task, {
            formData: {
                meetingType: "online",
                expertise: ["industry"],
                members: [{ organisation: "NUST", firstName: "Ana", lastName: "N.", email: "ana@example.com" }],
            },
        })).not.toThrow();
        expect(() => validateCompletion(task, {
            formData: {
                meetingType: "unknown",
                members: [{ organisation: "NUST" }],
            },
        })).toThrow("invalid option");
    });
});
