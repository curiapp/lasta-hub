import { Component, inject, OnInit, signal, ViewContainerRef } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ActionButtonsComponent } from "../../components/action-buttons/action-buttons.component";
import { CreateProgrammeComponent } from "../../components/forms/create-programme/create-programme.component";
import { ProgrammeTemplateComponent } from "../../components/loaders/programme-template/programme-template.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import { EventsComponent } from "../../components/page/events/events.component";
import { CanEditDirective } from '../../directives/can-edit.directive';
import { getGreeting } from '../../functions';
import { V2_GET_BOOTSTRAP, V2_GET_PROGRAMMES } from '../../graphql/graphql.queries.v2';
import { programmeDevIcons } from '../../static';
import { Programme, User } from '../../types';
import { WorkflowDashboard } from '../../types/programme-workflow';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule, FormsModule, ProgrammeTemplateComponent, ModalComponent, CreateProgrammeComponent, EventsComponent, CanEditDirective, ActionButtonsComponent],
})
export class HomeComponent implements OnInit {
  currentUser: User;
  programme: string;
  greetingMessage: string = '';
  programmeTools: string[] = ["Need Analysis Decision", "Programme Development Decision", "External Stakeholders Consultation Decision", "Internal Stakeholders Consultation Decision"];
  showAll = false;
  apollo = inject(Apollo);
  programmeDevIcons = programmeDevIcons;
  programmes = signal<Programme[]>([]);
  programmesLoading = signal(true);
  dashboard = signal<WorkflowDashboard>({
    programmeCount: 0,
    activeTaskCount: 0,
    completedTaskCount: 0,
    processCounts: {},
    stageCount: 0,
    taskDefinitionCount: 0,
  });

  searchText = signal("");
  limit = 50;

  private queryRef = this.apollo.watchQuery<any>({
    query: V2_GET_PROGRAMMES,
    variables: { searchText: '', offset: 0, limit: this.limit },
  });
  private dashboardQueryRef = this.apollo.watchQuery<{ bootstrap: { dashboard: WorkflowDashboard } }>({
    query: V2_GET_BOOTSTRAP,
    fetchPolicy: 'network-only',
  });

  queryResult = toSignal(this.queryRef.valueChanges);

  constructor(private viewContainer: ViewContainerRef) {
    this.queryRef.valueChanges.subscribe((result: any) => {
      this.programmesLoading.set(result.loading);
      this.programmes.set(result?.data?.programmes || []);
    });
    this.dashboardQueryRef.valueChanges.subscribe((result) => {
      if (result.data?.bootstrap?.dashboard) {
        this.dashboard.set(result.data.bootstrap.dashboard as WorkflowDashboard);
      }
    });

    toObservable(this.searchText).pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this.queryRef.refetch({ searchText, offset: 0 });
    });
  }

  onSearch(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchText.set(val);
  }

  clearSearch() {
    this.searchText.set('');
    this.queryRef.refetch({ searchText: '', offset: 0 });
  }

  loadMore() {
    const currentLength = this.programmes().length;
    this.queryRef.fetchMore({
      variables: { offset: currentLength },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          programmes: [...prev.programmes, ...fetchMoreResult.programmes]
        };
      }
    });
  }

  toggleView() {
    this.showAll = !this.showAll;
    this.updateDisplayedPrograms();
  }

  updateDisplayedPrograms() {
    if (this.showAll) {
      this.programmes.set(this.programmes());
    } else {
      this.programmes.set(this.programmes().slice(0, 10));
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
