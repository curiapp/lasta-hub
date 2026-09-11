import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { debounceTime, distinctUntilChanged, skip, Subscription } from 'rxjs';
import { ActionButtonsComponent } from '../../../../components/action-buttons/action-buttons.component';
import { CreateProgrammeComponent } from '../../../../components/forms/create-programme/create-programme.component';
import { ProgrammeTemplateComponent } from '../../../../components/loaders/programme-template/programme-template.component';
import { ModalComponent } from '../../../../components/modal/modal.component';
import { CanEditDirective } from '../../../../directives/can-edit.directive';
import { getGreeting } from '../../../../functions';
import { GET_BOOTSTRAP, GET_PROGRAMMES } from '../../../../graphql/graphql.queries';
import { Programme, User } from '../../../../types';
import { WorkflowDashboard } from '../../../../types/programme-workflow';

type ProgrammeScope = 'mine' | 'all' | 'department' | 'faculty';
type ProgrammeSort = 'newest' | 'oldest' | 'title-asc' | 'title-desc';

type ProgrammeOption<T> = {
  value: T;
  label: string;
  icon: string;
};

@Component({
  selector: 'home-authenticated',
  imports: [
    RouterModule,
    FormsModule,
    ProgrammeTemplateComponent,
    ModalComponent,
    CreateProgrammeComponent,
    CanEditDirective,
    ActionButtonsComponent,
  ],
  templateUrl: './home-authenticated.component.html',
  styleUrls: ['./home-authenticated.component.css'],
})
export class HomeAuthenticatedComponent implements OnInit, OnDestroy {
  private readonly apollo = inject(Apollo);
  private readonly programmeScopeStorageKey = 'home.programmeScope';
  private readonly programmeSortStorageKey = 'home.programmeSort';
  private readonly minimumProgrammeLoadingMs = 650;
  private readonly limit = 50;
  private programmeLoadingStartedAt = Date.now();
  private programmeLoadingTimer?: ReturnType<typeof setTimeout>;
  private subscriptions = new Subscription();

  currentUser: User | null = null;
  greetingMessage = '';
  showAll = signal(false);
  programmes = signal<Programme[]>([]);
  programmesLoading = signal(true);
  programmeScope = signal<ProgrammeScope>('all');
  programmeSort = signal<ProgrammeSort>('newest');
  searchText = signal('');
  dashboard = signal<WorkflowDashboard>({
    programmeCount: 0,
    activeTaskCount: 0,
    completedTaskCount: 0,
    processCounts: {},
    stageCount: 0,
    taskDefinitionCount: 0,
  });

  readonly programmeScopeOptions: Array<ProgrammeOption<ProgrammeScope>> = [
    { value: 'mine', label: 'My programmes', icon: 'person' },
    { value: 'all', label: 'All programmes', icon: 'view_list' },
    { value: 'department', label: 'My department', icon: 'groups' },
    { value: 'faculty', label: 'My faculty', icon: 'account_balance' },
  ];

  readonly programmeSortOptions: Array<ProgrammeOption<ProgrammeSort>> = [
    { value: 'newest', label: 'Newest first', icon: 'calendar_month' },
    { value: 'oldest', label: 'Oldest first', icon: 'event' },
    { value: 'title-asc', label: 'A to Z', icon: 'sort_by_alpha' },
    { value: 'title-desc', label: 'Z to A', icon: 'sort_by_alpha' },
  ];

  filteredProgrammes = computed(() => this.programmes().filter((programme) => this.matchesScope(programme)));
  displayedProgrammes = computed(() => this.sortProgrammes(this.filteredProgrammes()));

  private queryRef = this.apollo.watchQuery<{ programmes: Programme[] }>({
    query: GET_PROGRAMMES,
    variables: { searchText: '', offset: 0, limit: this.limit },
    fetchPolicy: 'cache-first',
  });

  private dashboardQueryRef = this.apollo.watchQuery<{ bootstrap: { dashboard: WorkflowDashboard } }>({
    query: GET_BOOTSTRAP,
    fetchPolicy: 'network-only',
  });

  ngOnInit() {
    this.greetingMessage = getGreeting();
    this.currentUser = this.readLoggedInUser();
    this.restoreProgrammePreferences();
    this.seedProgrammesFromCache();

    this.subscriptions.add(this.queryRef.valueChanges.subscribe((result) => {
      const programmes = (result?.data?.programmes || []) as Programme[];
      this.setProgrammesLoading(result.loading && programmes.length === 0 && this.programmes().length === 0);
      this.programmes.set(programmes);
    }));

    this.subscriptions.add(this.dashboardQueryRef.valueChanges.subscribe((result) => {
      if (result.data?.bootstrap?.dashboard) {
        this.dashboard.set(result.data.bootstrap.dashboard as WorkflowDashboard);
      }
    }));

    this.subscriptions.add(toObservable(this.searchText).pipe(
      skip(1),
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe((searchText) => {
      this.queryRef.refetch({ searchText, offset: 0 });
    }));
  }

  ngOnDestroy() {
    if (this.programmeLoadingTimer) clearTimeout(this.programmeLoadingTimer);
    this.subscriptions.unsubscribe();
  }

  onSearch(event: Event) {
    this.searchText.set((event.target as HTMLInputElement).value);
  }

  clearSearch() {
    this.searchText.set('');
    this.queryRef.refetch({ searchText: '', offset: 0 });
  }

  toggleView() {
    this.showAll.update((showAll) => !showAll);
  }

  setProgrammeScope(scope: ProgrammeScope) {
    this.programmeScope.set(scope);
    this.writeSessionValue(this.programmeScopeStorageKey, scope);
    this.showAll.set(false);
  }

  setProgrammeSort(sort: ProgrammeSort) {
    this.programmeSort.set(sort);
    this.writeSessionValue(this.programmeSortStorageKey, sort);
  }

  portfolioHeading() {
    if (this.programmeScope() === 'all') return 'All programmes';
    return this.scopeLabel();
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

  private restoreProgrammePreferences() {
    const defaultScope = this.isLecturerUser() ? 'mine' : 'all';
    const savedScope = this.readProgrammeScope();
    const savedSort = this.readProgrammeSort();

    this.programmeScope.set(savedScope && this.scopeAvailable(savedScope) ? savedScope : defaultScope);
    if (savedSort) this.programmeSort.set(savedSort);
  }

  private setProgrammesLoading(loading: boolean) {
    if (this.programmeLoadingTimer) {
      clearTimeout(this.programmeLoadingTimer);
      this.programmeLoadingTimer = undefined;
    }

    if (loading) {
      this.programmeLoadingStartedAt = Date.now();
      this.programmesLoading.set(true);
      return;
    }

    const elapsed = Date.now() - this.programmeLoadingStartedAt;
    const remaining = Math.max(this.minimumProgrammeLoadingMs - elapsed, 220);
    this.programmeLoadingTimer = setTimeout(() => {
      this.programmesLoading.set(false);
      this.programmeLoadingTimer = undefined;
    }, remaining);
  }

  private seedProgrammesFromCache() {
    const cached = this.apollo.client.readQuery<{ programmes: Programme[] }>({
      query: GET_PROGRAMMES,
      variables: { searchText: '', offset: 0, limit: this.limit },
    });
    if (cached?.programmes?.length) {
      this.programmes.set(cached.programmes);
      this.programmesLoading.set(false);
    }
  }

  private readLoggedInUser(): User | null {
    if (typeof sessionStorage === 'undefined') return null;
    try {
      const raw = sessionStorage.getItem('loggedInUser');
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  }

  private readProgrammeScope(): ProgrammeScope | null {
    const value = this.readSessionValue(this.programmeScopeStorageKey) as ProgrammeScope | null;
    return value && this.programmeScopeOptions.some((option) => option.value === value) ? value : null;
  }

  private readProgrammeSort(): ProgrammeSort | null {
    const value = this.readSessionValue(this.programmeSortStorageKey) as ProgrammeSort | null;
    return value && this.programmeSortOptions.some((option) => option.value === value) ? value : null;
  }

  private readSessionValue(key: string) {
    if (typeof sessionStorage === 'undefined') return null;
    return sessionStorage.getItem(key);
  }

  private writeSessionValue(key: string, value: string) {
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(key, value);
  }

  private isLecturerUser() {
    return (this.currentUser?.role ?? '').toLowerCase() === 'lecturer';
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
