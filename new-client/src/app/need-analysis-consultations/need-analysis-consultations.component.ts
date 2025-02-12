import {Component, OnInit} from '@angular/core';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {ButtonComponent} from '../button/button.component';
import {injectAppSelector} from '../injectables';
import {Router, RouterLink} from '@angular/router';
import {Consultations} from '../database/db.models';
import {ProgrammeService} from '../services/programme/programme.service';
import {NgForOf} from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-need-analysis-consultations',
  imports: [
    ButtonComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './need-analysis-consultations.component.html',
  styleUrl: './need-analysis-consultations.component.scss'
})
export class NeedAnalysisConsultationsComponent implements OnInit{
  buttonText!: string;
  consultations!: Consultations;
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
    await this.programmeService.queryNeedAnalysisConsultation(this.programme()?.["id"] as string)
    this.buttonText = result?.consultations ? 'Mark Complete' : 'Start Consultation';
    this.consultations = result?.consultations as Consultations;
  }



  async onStartOrCompleteClick() {
    if (this.needAnalysis()?.consultations){
      await this.programmeService.completeStakeholdersConsultation(this.needAnalysis()?.id as string)
    }else{
      await this.router.navigate(['/need-analysis/start-consultations']);
    }
  }

  formatDate(date: Date) {
    return moment(date).format('DD MMMM YYYY');
  }
}
