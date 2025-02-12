import {Component, OnInit} from '@angular/core';
import {Decision} from '../database/db.models';
import {injectAppSelector} from '../injectables';
import {Router} from '@angular/router';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';

@Component({
  selector: 'app-programme-development-pdqa-decision',
  imports: [],
  templateUrl: './programme-development-pdqa-decision.component.html',
  styleUrl: './programme-development-pdqa-decision.component.scss'
})
export class ProgrammeDevelopmentPdqaDecisionComponent implements OnInit {

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
    this.fetchProgrammeDevelopment()
  }

  async fetchProgrammeDevelopment() {
    const result = await this.programmeService.queryProgrammeDevelopment(this.programme()?.["id"] as string);
    this.buttonText = result?.pdqaDecision ? 'Mark Complete' : 'Start Consultation';
    this.pdqaDecision = result?.pdqaDecision as Decision;
  }
}
