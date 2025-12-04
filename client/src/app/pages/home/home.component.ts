import { Component, inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { StartNeedAnalysisComponent } from "../../components/forms/start-need-analysis/start-need-analysis.component";
import { ProgrammeTemplateComponent } from "../../components/loaders/programme-template/programme-template.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import { EventsComponent } from "../../components/page/events/events.component";
import { CanEditDirective } from '../../directives/can-edit.directive';
import { getGreeting } from '../../functions';
import { GET_PROGRAMMES } from '../../graphql/graphql.queries';
import { LoadingService } from '../../services/loading.service';
import { Programme, User } from '../../types';
import { programmeDevIcons } from '../../static';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule, FormsModule, ProgrammeTemplateComponent, ModalComponent, StartNeedAnalysisComponent, EventsComponent, CanEditDirective]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  programme: string;
  greetingMessage: string = '';
  programmeTools: string[] = ["Need Analysis Decision", "Programme Development Decision", "External Stakeholders Consultation Decision", "Internal Stakeholders Consultation Decision"];
  showAll = false;
  programmes: Programme[] = [];
  _loading = inject(LoadingService);
  apollo = inject(Apollo);
  programmeDevIcons = programmeDevIcons;

  constructor(private viewContainer: ViewContainerRef) { }

  toggleView() {
    this.showAll = !this.showAll;
    this.updateDisplayedPrograms();
  }

  updateDisplayedPrograms() {
    if (this.showAll) {
      this.programmes = [...this.programmes];
    } else {
      this.programmes = this.programmes.slice(0, 10);
    }
  }

  onApprove(code: string) {
    const componentRef = this.viewContainer.createComponent(ConfirmModalComponent);
    componentRef.instance.action = "accept"
    componentRef.instance.message = `Are you sure you want to approve this ${code}?`;
  }

  changed(event) {
    this.programme = event;
  }

  loggedIn() {
    let currentUser: User = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (currentUser) {
      this.currentUser = currentUser;
    } else {
      this.currentUser = null;
    }
  }

  randomPositions: { top: number; left: number }[] = [];
  randomDelays: number[] = [];
  randomDurations: number[] = [];

  ngOnInit() {
    this.greetingMessage = getGreeting();
    this.updateDisplayedPrograms();
    this.loggedIn();

    this.apollo.watchQuery({
      query: GET_PROGRAMMES
    }).valueChanges.subscribe((result: any) => {
      this._loading.isLoading.set(result.loading);
      this.programmes = result?.data?.programmes;
    });


    const width = window.innerWidth;
    const height = window.innerHeight;

    this.randomPositions = this.programmeDevIcons.map(() => ({
      top: Math.random() * (height - 50),
      left: Math.random() * (width - 50)
    }));

    this.randomDelays = this.programmeDevIcons.map(() => Math.random() * 5);
    this.randomDurations = this.programmeDevIcons.map(() => 6 + Math.random() * 4);

  }



}
