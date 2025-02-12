import {Component, OnInit} from '@angular/core';
import {NavHeaderComponent} from '../nav-header/nav-header.component';
import {DashboardLayoutComponent} from '../dashboard-layout/dashboard-layout.component';
import {ButtonComponent} from '../button/button.component';
import {TopSectionDirective} from '../top-section.directive';
import {MainTopSectionDirective} from '../main-top-section.directive';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProgrammeService} from '../services/programme/programme.service';
import {Router} from '@angular/router';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {injectAppSelector} from '../injectables';
import {Location} from '@angular/common';

@Component({
  selector: 'app-start-need-analysis-consultations',
  imports: [
    NavHeaderComponent,
    DashboardLayoutComponent,
    ButtonComponent,
    TopSectionDirective,
    MainTopSectionDirective,
    ReactiveFormsModule
  ],
  templateUrl: './start-need-analysis-consultations.component.html',
  styleUrl: './start-need-analysis-consultations.component.scss'
})
export class StartNeedAnalysisConsultationsComponent implements OnInit {
  startConsultationsForm!: FormGroup
  needAnalysis = injectAppSelector((state => state.programme.needAnalysis))

  constructor(
    private formBuilder: FormBuilder,
    private programmeService: ProgrammeService,
    private router: Router,
    private location: Location
  ) {
  }

  CancelButton: IButton = {
    text: 'Cancel', variant: ButtonVariants.danger, type: ButtonTypes.button
  }

  SubmitButton: IButton = {
    text: 'Submit', variant: ButtonVariants.primary, type: ButtonTypes.submit
  }

  ngOnInit() {
    this.startConsultationsForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
  }

  async onSubmit() {
    console.log(this.startConsultationsForm.value)
    await this.programmeService.beginStakeholdersConsultation({
        startDate: this.startConsultationsForm.value.startDate,
        endDate: this.startConsultationsForm.value.endDate
      },
      this.needAnalysis()?.id as string,
    )
    this.location.back()
  }
}
