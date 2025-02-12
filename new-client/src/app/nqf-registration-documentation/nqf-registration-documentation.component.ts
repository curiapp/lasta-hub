import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {DraftCurriculum} from '../database/db.models';
import {injectAppSelector} from '../injectables';
import {Router} from '@angular/router';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';

@Component({
  selector: 'app-nqf-registration-documentation',
    imports: [
        ButtonComponent
    ],
  templateUrl: './nqf-registration-documentation.component.html',
  styleUrl: './nqf-registration-documentation.component.scss'
})
export class NqfRegistrationDocumentationComponent implements OnInit {
  buttonText!: string;
  documentation!: boolean;
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
    this.buttonText = result?.documentation ? 'Edit' : 'Add';
    this.documentation = result?.documentation as boolean;
  }
}
