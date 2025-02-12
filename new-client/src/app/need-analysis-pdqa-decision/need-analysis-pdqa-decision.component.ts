import {Component, OnInit} from '@angular/core';
import {Consultations, Decision} from '../database/db.models';
import {injectAppSelector} from '../injectables';
import {Router, RouterLink} from '@angular/router';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {ButtonComponent} from '../button/button.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-need-analysis-pdqa-decision',
  imports: [
    ButtonComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './need-analysis-pdqa-decision.component.html',
  styleUrl: './need-analysis-pdqa-decision.component.scss'
})
export class NeedAnalysisPdqaDecisionComponent implements OnInit {

  buttonText!: string;
  pdqaDecision!: Decision;
  programme = injectAppSelector((state => state.programme.selectedProgramme))

  constructor(
    private router: Router,
    private programmeService: ProgrammeService,
  ) {
  }

  needAnalysis = injectAppSelector((state =>state.programme.needAnalysis));
  get ButtonProps(): IButton {
    return {
      text: this.buttonText,
      type: ButtonTypes.button,
      variant: ButtonVariants.primary,
    }
  }

  AddButton: IButton = {
    text: "Add",
    type: ButtonTypes.button,
    variant: ButtonVariants.primary,
  }
  ngOnInit() {
    this.fetchNeedAnalysis()
  }

  async fetchNeedAnalysis() {
    const result = await this.programmeService.queryNeedAnalysis(this.programme()?.["id"] as string);
    this.buttonText = result?.consultations ? 'Mark Complete' : 'Start Consultation';
    this.pdqaDecision = result?.pdqaDecision as Decision;
  }
}
