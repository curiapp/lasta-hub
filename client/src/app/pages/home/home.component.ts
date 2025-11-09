import { Component, inject, OnInit, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgrammeTableComponent } from '../../programme/components/programme-table/programme-table.component';
import { upComingEvents } from '../../static';
import { Programme } from '../../types';
import { generateNext7Days, getGreeting } from '../../functions';
import { ClientService } from '../../services/client.service';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import { ProgrammeTamplateComponent } from "../../components/loaders/programme-tamplate/programme-tamplate.component";
import { LoadingService } from '../../services/loading.service';
import { ModalComponent } from "../../components/modal/modal.component";
import { StartNeedAnalysisComponent } from "../../components/forms/start-need-analysis/start-need-analysis.component";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule, FormsModule, ProgrammeTamplateComponent, ModalComponent, StartNeedAnalysisComponent]
})
export class HomeComponent implements OnInit {
  username: string;
  faculty: string;
  department: string;
  dates: { day: string, date: string, dayOfMonth: string }[] = [];
  today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  programme: string;
  greetingMessage: string = '';
  programmeTools: string[] = ["Need Analysis Decision", "Programme Development Decision", "External Stakeholders Consultation Decision", "Internal Stakeholders Consultation Decision"];
  user: string;
  showAll = false;
  currentUser: any
  upComingEvents = upComingEvents;
  programmes: Programme[] = [];
  _loading = inject(LoadingService);
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

  ngOnInit() {
    this.greetingMessage = getGreeting();
    this.dates = generateNext7Days()
    this.updateDisplayedPrograms();
    this.loggedIn();


    this.client.getAll<Programme>("programmes").subscribe((data) => {
      this.programmes = data;
      // console.log("Hello World ", data);
    })
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

    // console.log(currentUser);
    if (currentUser) {
      this.currentUser = currentUser;
    } else {
      this.currentUser = null;
    }
  }

}
