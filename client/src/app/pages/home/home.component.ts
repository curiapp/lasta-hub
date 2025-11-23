import { Component, inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { StartNeedAnalysisComponent } from "../../components/forms/start-need-analysis/start-need-analysis.component";
import { ProgrammeTemplateComponent } from "../../components/loaders/programme-template/programme-template.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import { generateNext7Days, getGreeting } from '../../functions';
import { ClientService } from '../../services/client.service';
import { LoadingService } from '../../services/loading.service';
import { upComingEvents } from '../../static';
import { Programme } from '../../types';
import { GET_PROGRAMMES } from '../../graphql/graphql.queries';

type User = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  id: string;
}
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule, FormsModule, ProgrammeTemplateComponent, ModalComponent, StartNeedAnalysisComponent]
})
export class HomeComponent implements OnInit {
  currentUser: User;
  faculty: string;
  department: string;
  dates: { day: string, date: string, dayOfMonth: string }[] = [];
  today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  programme: string;
  greetingMessage: string = '';
  programmeTools: string[] = ["Need Analysis Decision", "Programme Development Decision", "External Stakeholders Consultation Decision", "Internal Stakeholders Consultation Decision"];
  showAll = false;
  upComingEvents = upComingEvents;
  programmes: Programme[] = [];
  _loading = inject(LoadingService);
  apollo = inject(Apollo);
  // isLoadig: boolean = this._loading.isLoading;

  constructor(private client: ClientService, private viewContainer: ViewContainerRef) { }

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
    let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (currentUser) {
      this.currentUser = currentUser;
    } else {
      this.currentUser = null;
    }
  }

  ngOnInit() {
    this.greetingMessage = getGreeting();
    this.dates = generateNext7Days()
    this.updateDisplayedPrograms();
    this.loggedIn();

    this.apollo.watchQuery({
      query: GET_PROGRAMMES
    })
      .valueChanges.subscribe((result: any) => {
        this._loading.isLoading.set(result.loading);
        this.programmes = result?.data?.programmes;
      });

  }



}
