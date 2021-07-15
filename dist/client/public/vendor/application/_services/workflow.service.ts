import { Injectable }  from '@angular/core';

export const STEPS = {
    needAnalysis:'Need-Analysis',
    curriculumDevelopment:'Curriculum-Development',
    consultationsPac: 'Consultations-Pac',
    tluCeuQa: 'Tlu-Ceu-Qa',
    bosSenate:'Bos-Senate',
    nqaSubmit:'Nqa-Submission'
}

@Injectable()
export class WorkflowService {
    private workflow = [
        { step: STEPS.needAnalysis, valid: true ,current:1},
        { step: STEPS.curriculumDevelopment, valid: false,current:0 },
        { step: STEPS.consultationsPac, valid: false,current:0 },
        { step: STEPS.tluCeuQa, valid: false,current:0 },
        { step: STEPS.bosSenate, valid: false,current:0 },
        { step: STEPS.nqaSubmit, valid: false,current:0 },
    ];
    
    validateStep(step: string,subStep:number,previous:string) {
        // If the state is found, set the valid field to true 
        var found = false;
        for (var i = 0; i < this.workflow.length && !found; i++) {
            if (this.workflow[i].step === step) {
                found = this.workflow[i].valid = true;
                this.workflow[i].current = subStep;
                if(step != previous)
                    this.workflow[i].valid = false;
            }
        }
    }
    getCurrentStep(){
        //find whic is the current stage and what is its sub step
        var found = false;
        for (var i = 0; i < this.workflow.length && !found; i++) {
            if (this.workflow[i].valid) {
                return this.workflow[i];
            }
        }
    }

    resetSteps() {
        // Reset all the steps in the Workflow to be invalid
        this.workflow.forEach(element => {
            element.valid = false;
        });
    }

    getFirstInvalidStep(step: string) : string {
        // If all the previous steps are validated, return blank
        // Otherwise, return the first invalid step
        var found = false;
        var valid = true;
        var redirectToStep = '';
        for (var i = 0; i < this.workflow.length && !found && valid; i++) {
            let item = this.workflow[i];
            if (item.step === step) {
                found = true;
                redirectToStep = '';
            }
            else {
                valid = item.valid;
                redirectToStep = item.step
            }
        }
        return redirectToStep;
    }
}