import { Component } from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {DashboardLayoutComponent} from "../dashboard-layout/dashboard-layout.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MainTopSectionDirective} from "../main-top-section.directive";
import {NavHeaderComponent} from "../nav-header/nav-header.component";
import {TopSectionDirective} from "../top-section.directive";
import {injectAppSelector} from '../injectables';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {ProgrammeService} from '../services/programme/programme.service';
import {Router} from '@angular/router';
import {ConsultationStakeholder, Programme} from '../database/db.models';
import {createId} from '@paralleldrive/cuid2';
import {Location} from '@angular/common';

@Component({
  selector: 'app-need-analysis-add-stakeholder',
    imports: [
        ButtonComponent,
        DashboardLayoutComponent,
        FormsModule,
        MainTopSectionDirective,
        NavHeaderComponent,
        ReactiveFormsModule,
        TopSectionDirective
    ],
  templateUrl: './need-analysis-add-stakeholder.component.html',
  styleUrl: './need-analysis-add-stakeholder.component.scss'
})
export class NeedAnalysisAddStakeholderComponent {
  addStakeholderForm!: FormGroup;
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
    this.addStakeholderForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact: ['', Validators.required]
    })
  }

  async onSubmit() {
    const stakeholder: ConsultationStakeholder = {
      id: createId(),
      name: this.addStakeholderForm.value.name,
      contact: this.addStakeholderForm.value.contact,
    };

    console.log(stakeholder)

    await this.programmeService.addStakeholder(stakeholder, this.needAnalysis()?.id as string)

    this.location.back();
  }
}
