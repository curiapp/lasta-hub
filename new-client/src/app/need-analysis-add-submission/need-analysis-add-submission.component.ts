import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {injectAppSelector} from '../injectables';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {ProgrammeService} from '../services/programme/programme.service';
import {Location} from '@angular/common';
import {ConsultationStakeholder, ConsultationSubmission} from '../database/db.models';
import {createId} from '@paralleldrive/cuid2';
import {NavHeaderComponent} from '../nav-header/nav-header.component';
import {DashboardLayoutComponent} from '../dashboard-layout/dashboard-layout.component';
import {TopSectionDirective} from '../top-section.directive';
import {ButtonComponent} from '../button/button.component';
import {MainTopSectionDirective} from '../main-top-section.directive';

@Component({
  selector: 'app-need-analysis-add-submission',
  imports: [
    NavHeaderComponent,
    ReactiveFormsModule,
    DashboardLayoutComponent,
    TopSectionDirective,
    ButtonComponent,
    MainTopSectionDirective
  ],
  templateUrl: './need-analysis-add-submission.component.html',
  styleUrl: './need-analysis-add-submission.component.scss'
})
export class NeedAnalysisAddSubmissionComponent {
  addSubmissionForm!: FormGroup;
  currentUser = injectAppSelector((state) => state.auth.currentUser)
  needAnalysis = injectAppSelector((state => state.programme.needAnalysis))
  CancelButton: IButton = {
    text: 'Cancel', variant: ButtonVariants.danger, type: ButtonTypes.button
  }

  SubmitButton: IButton = {
    text: 'Submit', variant: ButtonVariants.primary, type: ButtonTypes.submit
  }

  constructor(
    private formBuilder: FormBuilder,
    private programmeService: ProgrammeService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.addSubmissionForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact: ['', Validators.required]
    })
  }

  async onSubmit() {
    const submission: ConsultationSubmission = {
      id: createId(),
      name: this.addSubmissionForm.value.name,
      dateSubmitted: new Date(),
    };


    await this.programmeService.addSubmission(submission, this.needAnalysis()?.id as string)

    this.location.back();
  }
}
