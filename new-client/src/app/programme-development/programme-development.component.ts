import { Component } from '@angular/core';
import {ProgrammeSubNavComponent} from '../programme-sub-nav/programme-sub-nav.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-programme-development',
  imports: [
    ProgrammeSubNavComponent,
    RouterOutlet
  ],
  templateUrl: './programme-development.component.html',
  styleUrl: './programme-development.component.scss'
})
export class ProgrammeDevelopmentComponent {
  routes: string[] = ['cdc-pac', 'curriculum-draft', 'pdqa-decision'];
}
