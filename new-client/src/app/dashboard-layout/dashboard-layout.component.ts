import { Component, ContentChild } from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopSectionDirective} from '../top-section.directive';
import {RightSectionDirective} from '../right-section.directive';
import {MainTopSectionDirective} from '../main-top-section.directive';
import {LeftSectionDirective} from '../left-section.directive';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    CommonModule
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  @ContentChild(TopSectionDirective) topSection!: TopSectionDirective;
  @ContentChild(MainTopSectionDirective) mainTopSection!: MainTopSectionDirective;
  @ContentChild(LeftSectionDirective) leftSection!: LeftSectionDirective;
  @ContentChild(RightSectionDirective) rightSection!: RightSectionDirective;
}
