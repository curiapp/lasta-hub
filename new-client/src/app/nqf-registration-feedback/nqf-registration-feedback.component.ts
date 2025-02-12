import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {injectAppSelector} from '../injectables';
import {Router} from '@angular/router';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {Decision} from '../database/db.models';

@Component({
  selector: 'app-nqf-registration-feedback',
    imports: [
        ButtonComponent
    ],
  templateUrl: './nqf-registration-feedback.component.html',
  styleUrl: './nqf-registration-feedback.component.scss'
})
export class NqfRegistrationFeedbackComponent implements OnInit {
  buttonText!: string;
  feedback!: Decision;
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
    this.buttonText = result?.feedback ? 'Edit' : 'Add';
    this.feedback = result?.feedback as Decision;
  }
}
