import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ConsultationAndBenchmarking, DraftToBosSubmission} from '../database/db.models';
import {injectAppSelector} from '../injectables';
import {Router} from '@angular/router';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';

@Component({
  selector: 'app-bos-apc-senate-consultation-draft-submission',
    imports: [
        ButtonComponent
    ],
  templateUrl: './bos-apc-senate-consultation-draft-submission.component.html',
  styleUrl: './bos-apc-senate-consultation-draft-submission.component.scss'
})
export class BosApcSenateConsultationDraftSubmissionComponent implements OnInit {
  buttonText!: string;
  supportButtonText!: string;
  pacButtonText!: string;
  benchmarkingButtonText!: string;
  draftButtonText!: string;
  checklistButtonText!: string;
  finalDraftBOS!: DraftToBosSubmission;
  programme = injectAppSelector((state => state.programme.selectedProgramme))

  constructor(
    private router: Router,
    private programmeService: ProgrammeService,
  ) {
  }

  get ButtonProps(): IButton {
    return {
      text: this.buttonText,
      type: ButtonTypes.button,
      variant: ButtonVariants.primary,
    }
  }

  get DraftButtonProps(): IButton {
    return {
      text: this.draftButtonText,
      type: ButtonTypes.button,
      variant: ButtonVariants.primary,
    }
  }

  get SupportButtonProps(): IButton {
    return {
      text: this.supportButtonText,
      type: ButtonTypes.button,
      variant: ButtonVariants.primary,
    }
  }

  get PACButtonProps(): IButton {
    return {
      text: this.pacButtonText,
      type: ButtonTypes.button,
      variant: ButtonVariants.primary,
    }
  }

  get BenchmarkingButtonProps(): IButton {
    return {
      text: this.benchmarkingButtonText,
      type: ButtonTypes.button,
      variant: ButtonVariants.primary,
    }
  }

  get ChecklistButtonProps(): IButton {
    return {
      text: this.checklistButtonText,
      type: ButtonTypes.button,
      variant: ButtonVariants.primary,
    }
  }

  ngOnInit() {
    this.fetchBOSAPCSenate()
  }

  async fetchBOSAPCSenate() {
    const result = await this.programmeService.queryBOSAPCSenate(this.programme()?.["id"] as string);
    this.buttonText = result?.draftSubmission ? 'Mark Complete' : 'Start Draft';
    this.draftButtonText = result?.draftSubmission?.draftDocument? 'Edit' : 'Add';
    this.pacButtonText = result?.draftSubmission?.pacMinutes? 'Edit' : 'Add';
    this.benchmarkingButtonText = result?.draftSubmission?.benchmarking? 'Edit' : 'Add';
    this.checklistButtonText = result?.draftSubmission?.checklist? 'Edit' : 'Add';
    this.supportButtonText = result?.draftSubmission?.letters? 'Edit' : 'Add';
    this.finalDraftBOS = result?.draftSubmission as DraftToBosSubmission;
  }
}
