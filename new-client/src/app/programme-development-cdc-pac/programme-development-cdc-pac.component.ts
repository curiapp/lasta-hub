import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {CurriculumDevelopmentCoordinator, Decision, ProgrammeAdvisoryCommitteeMember} from '../database/db.models';
import {injectAppSelector} from '../injectables';
import {ProgrammeService} from '../services/programme/programme.service';
import {ButtonTypes, ButtonVariants, IButton} from '../../models';

@Component({
  selector: 'app-programme-development-cdc-pac',
    imports: [
        ButtonComponent,
        NgForOf,
        RouterLink
    ],
  templateUrl: './programme-development-cdc-pac.component.html',
  styleUrl: './programme-development-cdc-pac.component.scss'
})
export class ProgrammeDevelopmentCdcPacComponent implements OnInit{
  buttonText!: string;
  consultations!: Decision;
  cdc!: CurriculumDevelopmentCoordinator[];
  pac!: ProgrammeAdvisoryCommitteeMember[];
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
    this.fetchProgrammeDevelopment()
  }

  async fetchProgrammeDevelopment() {
    const result = await this.programmeService.queryProgrammeDevelopment(this.programme()?.["id"] as string);
    this.cdc = result?.programmeDevelopmentCommittee?.cdc as CurriculumDevelopmentCoordinator[];
    this.pac = result?.programmeDevelopmentCommittee?.pac as ProgrammeAdvisoryCommitteeMember[];
  }
}
