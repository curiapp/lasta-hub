"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.STEPS = {
    needAnalysis: 'Need-Analysis',
    curriculumDevelopment: 'Curriculum-Development',
    consultationsPac: 'Consultations-Pac',
    tluCeuQa: 'Tlu-Ceu-Qa',
    bosSenate: 'Bos-Senate',
    nqaSubmit: 'Nqa-Submission'
};
var WorkflowService = /** @class */ (function () {
    function WorkflowService() {
        this.workflow = [
            { step: exports.STEPS.needAnalysis, valid: true, current: 1 },
            { step: exports.STEPS.curriculumDevelopment, valid: false, current: 0 },
            { step: exports.STEPS.consultationsPac, valid: false, current: 0 },
            { step: exports.STEPS.tluCeuQa, valid: false, current: 0 },
            { step: exports.STEPS.bosSenate, valid: false, current: 0 },
            { step: exports.STEPS.nqaSubmit, valid: false, current: 0 },
        ];
    }
    WorkflowService.prototype.validateStep = function (step, subStep, previous) {
        // If the state is found, set the valid field to true 
        var found = false;
        for (var i = 0; i < this.workflow.length && !found; i++) {
            if (this.workflow[i].step === step) {
                found = this.workflow[i].valid = true;
                this.workflow[i].current = subStep;
                if (step != previous)
                    this.workflow[i].valid = false;
            }
        }
    };
    WorkflowService.prototype.getCurrentStep = function () {
        //find whic is the current stage and what is its sub step
        var found = false;
        for (var i = 0; i < this.workflow.length && !found; i++) {
            if (this.workflow[i].valid) {
                return this.workflow[i];
            }
        }
    };
    WorkflowService.prototype.resetSteps = function () {
        // Reset all the steps in the Workflow to be invalid
        this.workflow.forEach(function (element) {
            element.valid = false;
        });
    };
    WorkflowService.prototype.getFirstInvalidStep = function (step) {
        // If all the previous steps are validated, return blank
        // Otherwise, return the first invalid step
        var found = false;
        var valid = true;
        var redirectToStep = '';
        for (var i = 0; i < this.workflow.length && !found && valid; i++) {
            var item = this.workflow[i];
            if (item.step === step) {
                found = true;
                redirectToStep = '';
            }
            else {
                valid = item.valid;
                redirectToStep = item.step;
            }
        }
        return redirectToStep;
    };
    WorkflowService = __decorate([
        core_1.Injectable()
    ], WorkflowService);
    return WorkflowService;
}());
exports.WorkflowService = WorkflowService;
