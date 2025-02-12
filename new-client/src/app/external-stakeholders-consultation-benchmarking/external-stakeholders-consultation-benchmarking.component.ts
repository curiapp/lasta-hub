import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ConsultationAndBenchmarking, DraftCurriculum} from '../database/db.models';
import {injectAppSelector} from '../injectables';
import {Router} from '@angular/router';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';

@Component({
  selector: 'app-external-stakeholders-consultation-benchmarking',
    imports: [
        ButtonComponent
    ],
  templateUrl: './external-stakeholders-consultation-benchmarking.component.html',
  styleUrl: './external-stakeholders-consultation-benchmarking.component.scss'
})
export class ExternalStakeholdersConsultationBenchmarkingComponent implements OnInit{
  buttonText!: string;
  draftButtonText!: string;
  endorsementButtonText!: string;
  minutesButtonText!: string;
  commentsButtonText!: string;
  reportsButtonText!: string;
  consultationAndBenchmarking!: ConsultationAndBenchmarking;
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

  get EndorsementButtonProps(): IButton {
    return {
      text: this.endorsementButtonText,
      type: ButtonTypes.button,
      variant: ButtonVariants.primary,
    }
  }

  get MinutesButtonProps(): IButton {
    return {
      text: this.minutesButtonText,
      type: ButtonTypes.button,
      variant: ButtonVariants.primary,
    }
  }

  get CommentsButtonProps(): IButton {
    return {
      text: this.commentsButtonText,
      type: ButtonTypes.button,
      variant: ButtonVariants.primary,
    }
  }

  get ReportsButtonProps(): IButton {
    return {
      text: this.reportsButtonText,
      type: ButtonTypes.button,
      variant: ButtonVariants.primary,
    }
  }

  ngOnInit() {
    this.fetchExternalStakeholders()
  }

  async fetchExternalStakeholders() {
    const result = await this.programmeService.queryExternalStakeholders(this.programme()?.["id"] as string);
    this.buttonText = result?.consultationAndBenchmarking ? 'Mark Complete' : 'Start Consultation and Benchmarking';
    this.draftButtonText = result?.consultationAndBenchmarking?.finalDraft? 'Edit' : 'Add';
    this.minutesButtonText = result?.consultationAndBenchmarking?.minutes? 'Edit' : 'Add';
    this.endorsementButtonText = result?.consultationAndBenchmarking?.endorsementLetters? 'Edit' : 'Add';
    this.commentsButtonText = result?.consultationAndBenchmarking?.comments? 'Edit' : 'Add';
    this.reportsButtonText = result?.consultationAndBenchmarking?.benchmarkingReports? 'Edit' : 'Add';
    this.consultationAndBenchmarking = result?.consultationAndBenchmarking as ConsultationAndBenchmarking;
  }
}
