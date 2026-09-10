import { Component, computed, inject, OnInit, signal, ViewContainerRef } from '@angular/core';
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
import { CanEditDirective } from '../../directives/can-edit.directive';
import { getGreeting } from '../../functions';
import { GET_BOOTSTRAP, GET_PROGRAMMES } from '../../graphql/graphql.queries';
import { programmeDevIcons } from '../../static';
import { Programme, User } from '../../types';
import { WorkflowDashboard } from '../../types/programme-workflow';

type ProgrammeScope = 'mine' | 'all' | 'department' | 'faculty';
type ProgrammeSort = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RouterModule, FormsModule, ProgrammeTemplateComponent, ModalComponent, CreateProgrammeComponent, CanEditDirective, ActionButtonsComponent],
})
export class HomeComponent implements OnInit {
  currentUser: User | null;
  programme: string;
  greetingMessage: string = '';
  showAll = signal(false);
  apollo = inject(Apollo);
  programmeDevIcons = programmeDevIcons;
  programmes = signal<Programme[]>([]);
  programmesLoading = signal(true);
  programmeScope = signal<ProgrammeScope>('all');
  programmeSort = signal<ProgrammeSort>('newest');
  private readonly programmeScopeStorageKey = 'home.programmeScope';
  private readonly programmeSortStorageKey = 'home.programmeSort';
  readonly programmeScopeOptions: Array<{ value: ProgrammeScope; label: string; icon: string }> = [
    { value: 'mine', label: 'My programmes', icon: 'person' },
    { value: 'all', label: 'All programmes', icon: 'view_list' },
    { value: 'department', label: 'My department', icon: 'groups' },
    { value: 'faculty', label: 'My faculty', icon: 'account_balance' },
  ];
  readonly programmeSortOptions: Array<{ value: ProgrammeSort; label: string; icon: string }> = [
    { value: 'newest', label: 'Newest first', icon: 'calendar_month' },
    { value: 'oldest', label: 'Oldest first', icon: 'event' },
    { value: 'title-asc', label: 'A to Z', icon: 'sort_by_alpha' },
    { value: 'title-desc', label: 'Z to A', icon: 'sort_by_alpha' },
  ];
  dashboard = signal<WorkflowDashboard>({
    programmeCount: 0,
    activeTaskCount: 0,
    completedTaskCount: 0,
    processCounts: {},
    stageCount: 0,
    taskDefinitionCount: 0,
  });

  searchText = signal("");
  filteredProgrammes = computed(() => this.programmes().filter((programme) => this.matchesScope(programme)));
  displayedProgrammes = computed(() => this.sortProgrammes(this.filteredProgrammes()));
  limit = 50;

  private queryRef = this.apollo.watchQuery<any>({
    query: GET_PROGRAMMES,
    variables: { searchText: '', offset: 0, limit: this.limit },
  });
  private dashboardQueryRef = this.apollo.watchQuery<{ bootstrap: { dashboard: WorkflowDashboard } }>({
    query: GET_BOOTSTRAP,
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
    this.showAll.update((showAll) => !showAll);
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
      const defaultScope = this.isLecturerUser() ? 'mine' : 'all';
      const savedScope = this.readProgrammeScope();
      const savedSort = this.readProgrammeSort();
      this.programmeScope.set(savedScope && this.scopeAvailable(savedScope) ? savedScope : defaultScope);
      if (savedSort) this.programmeSort.set(savedSort);
    } else {
      this.currentUser = null;
    }
  }

  setProgrammeScope(scope: ProgrammeScope) {
    this.programmeScope.set(scope);
    sessionStorage.setItem(this.programmeScopeStorageKey, scope);
    this.showAll.set(false);
  }

  setProgrammeSort(sort: ProgrammeSort) {
    this.programmeSort.set(sort);
    sessionStorage.setItem(this.programmeSortStorageKey, sort);
  }

  scopeIcon(scope: ProgrammeScope) {
    return this.programmeScopeOptions.find((option) => option.value === scope)?.icon ?? 'filter_list';
  }

  scopeLabel(scope: ProgrammeScope = this.programmeScope()) {
    return this.programmeScopeOptions.find((option) => option.value === scope)?.label ?? 'Programme view';
  }

  sortIcon(sort: ProgrammeSort) {
    return this.programmeSortOptions.find((option) => option.value === sort)?.icon ?? 'sort';
  }

  sortLabel(sort: ProgrammeSort = this.programmeSort()) {
    return this.programmeSortOptions.find((option) => option.value === sort)?.label ?? 'Sort programmes';
  }

  programmeStatusClasses(status?: string) {
    const normalized = String(status || 'draft').trim().toLowerCase().replace(/\s+/g, '_');
    const base = 'badge badge-sm shrink-0 capitalize font-semibold';

    if (['completed', 'approved', 'registered'].includes(normalized)) return `${base} badge-success`;
    if (['in_progress', 'running', 'active'].includes(normalized)) return `${base} badge-warning`;
    if (['declined', 'rejected', 'stopped', 'cancelled'].includes(normalized)) return `${base} badge-error`;
    if (['deferred', 'on_hold', 'returned', 'paused'].includes(normalized)) return `${base} badge-info`;
    return `${base} badge-ghost`;
  }

  scopeEmptyLabel() {
    return this.programmeScopeOptions.find((option) => option.value === this.programmeScope())?.label.toLowerCase() ?? 'this view';
  }

  randomPositions: { top: number; left: number }[] = [];
  randomDelays: number[] = [];
  randomDurations: number[] = [];

  ngOnInit() {
    this.greetingMessage = getGreeting();
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

  private isLecturerUser() {
    return (this.currentUser?.role ?? '').toLowerCase() === 'lecturer';
  }

  private readProgrammeScope(): ProgrammeScope | null {
    const value = sessionStorage.getItem(this.programmeScopeStorageKey) as ProgrammeScope | null;
    return value && this.programmeScopeOptions.some((option) => option.value === value) ? value : null;
  }

  private readProgrammeSort(): ProgrammeSort | null {
    const value = sessionStorage.getItem(this.programmeSortStorageKey) as ProgrammeSort | null;
    return value && this.programmeSortOptions.some((option) => option.value === value) ? value : null;
  }

  private scopeAvailable(scope: ProgrammeScope) {
    if (scope === 'department') return Boolean(this.currentUser?.department?.id || this.currentUser?.department?.name);
    if (scope === 'faculty') return Boolean(this.currentUser?.faculty?.id || this.currentUser?.faculty?.name);
    return true;
  }

  private matchesScope(programme: Programme) {
    const scope = this.programmeScope();
    if (scope === 'all' || !this.currentUser) return true;
    if (scope === 'mine') return this.sameValue(programme.initiator, this.currentUser.id);
    if (scope === 'department') {
      return this.matchesUnit(programme.department, programme.departmentName, this.currentUser.department);
    }
    return this.matchesUnit(programme.faculty, programme.facultyName, this.currentUser.faculty);
  }

  private matchesUnit(programmeValue: string | undefined, programmeName: string | undefined, userUnit?: { id: string; name: string }) {
    return this.sameValue(programmeValue, userUnit?.id)
      || this.sameValue(programmeValue, userUnit?.name)
      || this.sameValue(programmeName, userUnit?.id)
      || this.sameValue(programmeName, userUnit?.name);
  }

  private sameValue(first?: string, second?: string) {
    return !!first && !!second && first.trim().toLowerCase() === second.trim().toLowerCase();
  }

  private sortProgrammes(programmes: Programme[]) {
    return [...programmes].sort((first, second) => {
      const sort = this.programmeSort();
      if (sort === 'title-asc' || sort === 'title-desc') {
        const comparison = (first.title ?? '').localeCompare(second.title ?? '', undefined, { sensitivity: 'base' });
        return sort === 'title-asc' ? comparison : -comparison;
      }

      const firstDate = this.programmeCreatedTime(first);
      const secondDate = this.programmeCreatedTime(second);
      return sort === 'oldest' ? firstDate - secondDate : secondDate - firstDate;
    });
  }

  private programmeCreatedTime(programme: Programme) {
    const value = programme.createdAt ?? programme.created_at ?? '';
    const time = Date.parse(value);
    return Number.isFinite(time) ? time : 0;
  }

}
