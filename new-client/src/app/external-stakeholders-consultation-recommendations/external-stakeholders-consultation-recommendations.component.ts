import {Component, OnInit} from '@angular/core';
import {Decision, DraftCurriculum} from '../database/db.models';
import {injectAppSelector} from '../injectables';
import {Router} from '@angular/router';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-external-stakeholders-consultation-recommendations',
  imports: [
    ButtonComponent
  ],
  templateUrl: './external-stakeholders-consultation-recommendations.component.html',
  styleUrl: './external-stakeholders-consultation-recommendations.component.scss'
})
export class ExternalStakeholdersConsultationRecommendationsComponent implements OnInit {
  buttonText!: string;
  curriculumDraft!: Decision;
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

  ngOnInit() {
    this.fetchExternalStakeholders()
  }

  async fetchExternalStakeholders() {
    const result = await this.programmeService.queryExternalStakeholders(this.programme()?.["id"] as string);
    this.buttonText = result?.draftAndPDQARecommendation ? 'Edit' : 'Add';
    this.curriculumDraft = result?.draftAndPDQARecommendation as Decision;
  }
}
