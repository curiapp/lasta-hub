import { Component } from '@angular/core';
import {Decision, NQFCompleteRegistration, NQFRegistration} from '../database/db.models';
import {injectAppSelector} from '../injectables';
import {Router} from '@angular/router';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-nqf-registration-registration',
  imports: [
    ButtonComponent
  ],
  templateUrl: './nqf-registration-registration.component.html',
  styleUrl: './nqf-registration-registration.component.scss'
})
export class NqfRegistrationRegistrationComponent {
  buttonText!: string;
  registration!: NQFCompleteRegistration;
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
    this.buttonText = result?.registration ? 'Edit' : 'Add';
    this.registration = result?.registration as NQFCompleteRegistration;
  }
}
