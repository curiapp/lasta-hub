import {Component, OnInit} from '@angular/core';
import {DashboardLayoutComponent} from "../dashboard-layout/dashboard-layout.component";
import {NavHeaderComponent} from "../nav-header/nav-header.component";
import {TopSectionDirective} from "../top-section.directive";
import {ButtonComponent} from '../button/button.component';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {MainTopSectionDirective} from '../main-top-section.directive';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Programme} from '../database/db.models';
import {createId} from '@paralleldrive/cuid2';
import {injectAppSelector} from '../injectables';
import {ProgrammeService} from '../services/programme/programme.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-new-programme',
  imports: [
    DashboardLayoutComponent,
    NavHeaderComponent,
    TopSectionDirective,
    ButtonComponent,
    MainTopSectionDirective,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-new-programme.component.html',
  styleUrl: './create-new-programme.component.scss'
})
export class CreateNewProgrammeComponent implements OnInit{
    createProgrammeForm!: FormGroup;
    currentUser = injectAppSelector((state) => state.auth.currentUser)

    CancelButton: IButton = {
      text: 'Cancel', variant: ButtonVariants.danger, type: ButtonTypes.button
    }

    SubmitButton: IButton = {
      text: 'Submit', variant: ButtonVariants.primary, type: ButtonTypes.submit
    }

    constructor(
      private formBuilder: FormBuilder,
      private programmeService: ProgrammeService,
      private router: Router
    ) {
    }

    ngOnInit() {
      this.createProgrammeForm = this.formBuilder.group({
        programmeTitle: ['', Validators.required],
        programmeCode: ['', Validators.required],
        nqfLevel: ['', Validators.required],
        faculty: ['', Validators.required],
        department: ['', Validators.required],
      })
    }

    async onSubmit() {
      const programme: Programme = {
        id: createId(),
        lecturer: this.currentUser()?.email as string,
        code: this.createProgrammeForm.value.programmeCode,
        title: this.createProgrammeForm.value.programmeTitle,
        level: this.createProgrammeForm.value.nqfLevel,
        faculty: this.currentUser()?.faculty as string,
        department: this.currentUser()?.department as string,
      };

      console.log(programme);
      await this.programmeService.addProgramme(programme);
      this.router.navigate(['/dashboard']);
    }
}
