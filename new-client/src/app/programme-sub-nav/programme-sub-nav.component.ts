import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-programme-sub-nav',
  imports: [
    NgForOf,
    NgIf,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './programme-sub-nav.component.html',
  styleUrl: './programme-sub-nav.component.scss'
})
export class ProgrammeSubNavComponent implements OnInit{
  @Input() routes: string[] = [];

  ngOnInit() {
    if (!this.routes || this.routes.length === 0) {
      console.warn("No routes defined");
    }
  }
}
