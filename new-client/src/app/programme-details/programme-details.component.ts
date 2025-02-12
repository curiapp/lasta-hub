import {Component, Input, OnInit} from '@angular/core';
import {ButtonTypes, ButtonVariants, IButton, IProgramme} from '../../models';
import {ButtonComponent} from '../button/button.component';
import {injectAppSelector} from '../injectables';
import {Programme} from '../database/db.models';

@Component({
  selector: 'app-programme-details',
  imports: [
    ButtonComponent
  ],
  templateUrl: './programme-details.component.html',
  styleUrl: './programme-details.component.scss'
})
export class ProgrammeDetailsComponent implements OnInit{
  programme!: Programme;
  selectedProgramme = injectAppSelector((state) => state.programme.selectedProgramme)

  ButtonProps: IButton = {
    text: 'Edit',
    type: ButtonTypes.button,
    variant: ButtonVariants.primary,
  }

  ngOnInit() {
    this.programme = this.selectedProgramme() as Programme;
  }
}
