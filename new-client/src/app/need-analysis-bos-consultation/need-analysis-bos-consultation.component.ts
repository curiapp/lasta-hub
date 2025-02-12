import {Component, OnInit} from '@angular/core';
import {injectAppSelector} from '../injectables';
import {Decision} from '../database/db.models';
import {Router} from '@angular/router';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';

@Component({
  selector: 'app-need-analysis-bos-consultation',
  imports: [],
  templateUrl: './need-analysis-bos-consultation.component.html',
  styleUrl: './need-analysis-bos-consultation.component.scss'
})
export class NeedAnalysisBosConsultationComponent implements OnInit{
  buttonText!: string;
  bosConsultation!: Decision;
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
    this.bosConsultation = result?.bosConsultations as Decision;

  }
}
