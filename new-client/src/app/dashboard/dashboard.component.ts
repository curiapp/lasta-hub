import {Component, OnInit} from '@angular/core';
import {DashboardLayoutComponent} from '../dashboard-layout/dashboard-layout.component';
import {TopSectionDirective} from '../top-section.directive';
import {MainTopSectionDirective} from '../main-top-section.directive';
import {LeftSectionDirective} from '../left-section.directive';
import {RightSectionDirective} from '../right-section.directive';
import {AuthService} from '../services/auth/auth.service';
import {injectSelector} from '@reduxjs/angular-redux';
import {RootState} from '../store';
import {injectAppDispatch, injectAppSelector} from '../injectables';
import {NavHeaderComponent} from '../nav-header/nav-header.component';
import {GreetingComponent} from '../greeting/greeting.component';
import {OverviewComponent} from '../overview/overview.component';
import {MiniCalendarComponent} from '../mini-calendar/mini-calendar.component';
import {ProgrammeService} from '../services/programme/programme.service';
import {NgForOf} from '@angular/common';
import {ButtonTypes, ButtonVariants, IButton, IProgramme} from '../../models';
import {ButtonComponent} from '../button/button.component';
import {TableComponent} from '../table/table.component';
import {setProgrammeNeedAnalysis, setSelectedProgramme} from '../store/programme/programme.slice';
import {Router, RouterLink} from '@angular/router';
import {NeedAnalysis, Programme} from '../database/db.models';
import {pb} from '../database/db';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardLayoutComponent,
    TopSectionDirective,
    LeftSectionDirective,
    RightSectionDirective,
    NavHeaderComponent,
    GreetingComponent,
    OverviewComponent,
    MiniCalendarComponent,
    NgForOf,
    ButtonComponent,
    TableComponent,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  dispatch = injectAppDispatch()
  userSession = injectAppSelector((state => state.auth.currentUser))
  selectProgramme = setSelectedProgramme
  programmeNeedAnalysis = setProgrammeNeedAnalysis
  firstName!: string;
  lastName!: string;
  title!: string;
  programmes!: any[];
  programmesDueToReview!: any[]
  programmesTableColumns: any[] = [
    { key: 'faculty', label: 'Faculty' },
    { key: 'title', label: 'Title' },
    { key: 'dateCreated', label: 'Date Created' },
    { key: 'lastReview', label: 'Last Review' },
  ]

  constructor(private programmeService: ProgrammeService, private router: Router) {}

  ViewButtonProps: IButton = {
    type: ButtonTypes.button, variant: ButtonVariants.secondary,
    text: "View All"
  };

  AddButtonProps: IButton = {
    type: ButtonTypes.button, variant: ButtonVariants.primary,
    text: "Add"
  };

  onSelectProgramme = (selectedProgramme: any) => {
    this.dispatch(this.selectProgramme(selectedProgramme));
    this.fetchProgrammeNeedAnalysis(selectedProgramme.id)
    this.router.navigate([`/programme/${selectedProgramme.code}`]);
  }

  ngOnInit() {
    this.firstName = this.userSession()?.name as string;
    this.lastName = this.userSession()?.name as string;
    this.title = this.userSession()?.title as string;
    this.fetchProgrammes();
    console.log(this.programmes)
    this.programmesDueToReview = this.programmeService.fetchProgrammesDueForReview(this.userSession()?.email as string);
  }

  async fetchProgrammes() {
    this.programmes = await this.programmeService.fetchAllProgrammes();
    console.log(this.programmes);
  }

  async fetchProgrammeNeedAnalysis(programmeId: string) {
    const result = await this.programmeService.queryNeedAnalysis(programmeId);
    this.dispatch(this.programmeNeedAnalysis(result as NeedAnalysis))
  }


}
