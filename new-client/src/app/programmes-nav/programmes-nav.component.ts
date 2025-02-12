import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-programmes-nav',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './programmes-nav.component.html',
  styleUrl: './programmes-nav.component.scss'
})
export class ProgrammesNavComponent {

}
