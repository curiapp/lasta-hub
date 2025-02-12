import {Component, OnInit} from '@angular/core';
import {DashboardLayoutComponent} from '../dashboard-layout/dashboard-layout.component';
import {TopSectionDirective} from '../top-section.directive';
import {LeftSectionDirective} from '../left-section.directive';
import {RightSectionDirective} from '../right-section.directive';
import {injectAppSelector} from '../injectables';
import {ProgrammeOverviewComponent} from '../programme-overview/programme-overview.component';
import {ProgrammesNavComponent} from '../programmes-nav/programmes-nav.component';
import {Router, RouterOutlet} from '@angular/router';

import {MainTopSectionDirective} from '../main-top-section.directive';
import {ButtonComponent} from '../button/button.component';
import {ButtonTypes, ButtonVariants, IButton, IProgramme} from '../../models';
import {NavHeaderComponent} from '../nav-header/nav-header.component';
import {Program} from '@angular/compiler-cli';
import {Programme} from '../database/db.models';

@Component({
  selector: 'app-programme',
  imports: [
    DashboardLayoutComponent,
    TopSectionDirective,
    ProgrammeOverviewComponent,
    ProgrammesNavComponent,
    RouterOutlet,
    MainTopSectionDirective,
    ButtonComponent,
    NavHeaderComponent
  ],
  templateUrl: './programme.component.html',
  styleUrl: './programme.component.scss'
})
export class ProgrammeComponent implements OnInit {
  programme!: Programme;
  selectedProgramme = injectAppSelector((state) => state.programme.selectedProgramme);

  ButtonProps: IButton = {
    type: ButtonTypes.button, variant: ButtonVariants.icon,
    icon: "assets/svgs/back-arrow.svg"
  };

  ngOnInit() {
    this.programme = this.selectedProgramme() as Programme;
  }

  constructor(protected router: Router) {
  }
}
