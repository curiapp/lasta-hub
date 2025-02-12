import { Component } from '@angular/core';
import {ProgrammeSubNavComponent} from '../programme-sub-nav/programme-sub-nav.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-nqf-registration',
  imports: [
    ProgrammeSubNavComponent,
    RouterOutlet
  ],
  templateUrl: './nqf-registration.component.html',
  styleUrl: './nqf-registration.component.scss'
})
export class NqfRegistrationComponent {
  routes: string[] = ['documentation', 'submission', 'feedback', 'registration']
}
