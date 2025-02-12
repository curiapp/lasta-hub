import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {injectAppSelector} from '../injectables';
import {Router} from '@angular/router';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {NQFSubmission} from '../database/db.models';

@Component({
  selector: 'app-nqf-registration-submission',
    imports: [
        ButtonComponent
    ],
  templateUrl: './nqf-registration-submission.component.html',
  styleUrl: './nqf-registration-submission.component.scss'
})
export class NqfRegistrationSubmissionComponent implements OnInit {
  buttonText!: string;
  submission!: NQFSubmission;
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
    this.fetchNQFRegistration()
  }

  async fetchNQFRegistration() {
    const result = await this.programmeService.queryNQFRegistration(this.programme()?.["id"] as string);
    this.buttonText = result?.submission ? 'Edit' : 'Add';
    this.submission = result?.submission as NQFSubmission;
  }
}
