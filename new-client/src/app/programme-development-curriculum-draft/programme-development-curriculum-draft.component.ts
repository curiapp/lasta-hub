import {Component, OnInit} from '@angular/core';
import {Decision, DraftCurriculum} from '../database/db.models';
import {injectAppSelector} from '../injectables';
import {Router} from '@angular/router';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-programme-development-curriculum-draft',
  imports: [
    ButtonComponent
  ],
  templateUrl: './programme-development-curriculum-draft.component.html',
  styleUrl: './programme-development-curriculum-draft.component.scss'
})
export class ProgrammeDevelopmentCurriculumDraftComponent implements OnInit {
  buttonText!: string;
  curriculumDraft!: DraftCurriculum;
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
    this.fetchProgrammeDevelopment()
  }

  async fetchProgrammeDevelopment() {
    const result = await this.programmeService.queryProgrammeDevelopment(this.programme()?.["id"] as string);
    this.buttonText = result?.curriculumDrafting ? 'Edit' : 'Add';
    this.curriculumDraft = result?.curriculumDrafting as DraftCurriculum;
  }
}
