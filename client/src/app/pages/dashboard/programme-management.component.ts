import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DashboardService, ManagedProgramme } from '../../services/dashboard.service';
import { ToastService } from '../../services/toast.service';
import { WorkflowDefinitionSummary } from '../../types/workflow-definition';
import { ProgrammeWorkflowDetail } from '../../types/programme-workflow';
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import { ManagementDialogComponent } from './management-dialog.component';

type ProgrammeForm = { title: string; code: string; level: number; department: string; faculty: string; workflowSlug: string };
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'client-programme-management',
  imports: [FormsModule, RouterLink, ConfirmModalComponent, ManagementDialogComponent],
  templateUrl: './programme-management.component.html',
})
export class ProgrammeManagementComponent implements OnInit {
  private dashboard = inject(DashboardService);
  private toast = inject(ToastService);
  private destroyRef = inject(DestroyRef);
  readonly programmes = signal<ManagedProgramme[]>([]);
  readonly faculties = signal<{ id: string; name: string }[]>([]);
  readonly departments = signal<{ id: string; name: string; facultyId: string }[]>([]);
  readonly definitions = signal<WorkflowDefinitionSummary[]>([]);
  readonly loading = signal(true);
  readonly loadError = signal(false);
  readonly optionsLoading = signal(true);
  readonly optionsError = signal(false);
  readonly saving = signal(false);
  readonly query = signal('');
  readonly facultyFilter = signal('');
  readonly departmentFilter = signal('');
  readonly filterOpen = signal(false);
  readonly selected = signal<ManagedProgramme | null>(null);
  readonly detail = signal<ProgrammeWorkflowDetail | null>(null);
  readonly detailLoading = signal(false);
  readonly detailError = signal(false);
  readonly formVisible = signal(false);
  readonly summaryVisible = signal(false);
  readonly editingId = signal('');
  readonly pendingAction = signal<'delete' | 'workflow' | null>(null);
  readonly workflowSlug = signal('');
  model = this.emptyForm();
  readonly levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  emptyForm(): ProgrammeForm { return { title: '', code: '', level: 7, department: '', faculty: '', workflowSlug: '' }; }
  readonly filteredProgrammes = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.programmes().filter(programme => (!this.facultyFilter() || programme.faculty === this.facultyFilter())
      && (!this.departmentFilter() || programme.department === this.departmentFilter())
      && `${programme.title} ${programme.code} ${programme.departmentName ?? ''}`.toLowerCase().includes(query));
  });
  get availableDepartments() { return this.departments().filter(unit => unit.facultyId === this.model.faculty); }
  get filterDepartments() { return this.departments().filter(unit => !this.facultyFilter() || unit.facultyId === this.facultyFilter()); }
  get completedTasks() { return this.detail()?.tasks.filter(task => task.status === 'completed').length ?? 0; }
  get activeTasks() { return this.detail()?.tasks.filter(task => task.status === 'active') ?? []; }
  get currentStage() { return this.detail()?.definition?.stages.find(stage => stage.id === this.detail()?.process?.currentStageKey)?.name ?? this.detail()?.process?.currentStageKey ?? 'Not started'; }
  get workflowMessage() {
    return `Apply the latest published version of the selected workflow to ${this.selected()?.title}? Updating the current workflow keeps its process. Choosing a different workflow stops the current process and starts a new one; earlier history is retained.`;
  }
  ngOnInit() { this.loadProgrammes(); this.loadOptions(); }
  loadOptions() {
    this.optionsLoading.set(true);
    this.optionsError.set(false);
    forkJoin({ units: this.dashboard.metadata<{ faculties: ReturnType<typeof this.faculties>; departments: ReturnType<typeof this.departments> }>('institutional-units'), definitions: this.dashboard.metadata<WorkflowDefinitionSummary[]>('workflow-definitions') })
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: ({ units, definitions }) => {
          this.faculties.set(units.faculties);
          this.departments.set(units.departments);
          this.definitions.set(definitions.filter(definition => definition.status === 'active'));
          this.optionsLoading.set(false);
        },
        error: () => { this.optionsLoading.set(false); this.optionsError.set(true); },
      });
  }
  loadProgrammes() {
    this.loading.set(true);
    this.loadError.set(false);
    this.dashboard.request<ManagedProgramme[]>('GET', 'programmes').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: programmes => { this.programmes.set(programmes); this.loading.set(false); },
      error: () => { this.loading.set(false); this.loadError.set(true); },
    });
  }
  addProgramme() {
    this.closePanel();
    this.formVisible.set(true);
    this.model.workflowSlug = (this.definitions().find(definition => definition.isDefault) ?? this.definitions()[0])?.slug ?? '';
  }
  closePanel() {
    this.selected.set(null);
    this.detail.set(null);
    this.formVisible.set(false);
    this.summaryVisible.set(false);
    this.editingId.set('');
    this.model = this.emptyForm();
  }
  selectProgramme(programme: ManagedProgramme, edit = false) {
    this.selected.set(programme);
    this.formVisible.set(edit);
    this.summaryVisible.set(!edit);
    this.editingId.set(edit ? programme.id : '');
    this.model = { title: programme.title, code: programme.code, level: programme.level, faculty: programme.faculty, department: programme.department, workflowSlug: '' };
    if (!edit) this.loadDetail(programme.id);
  }
  requestDelete(programme: ManagedProgramme) {
    this.selected.set(programme);
    this.pendingAction.set('delete');
  }
  loadDetail(id: string) {
    this.detail.set(null);
    this.detailLoading.set(true);
    this.detailError.set(false);
    this.workflowSlug.set('');
    this.dashboard.request<ProgrammeWorkflowDetail>('GET', `programmes/${id}`).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: detail => {
        if (this.selected()?.id !== id) return;
        this.detail.set(detail);
        this.detailLoading.set(false);
        this.workflowSlug.set(detail.definition?.slug ?? '');
      },
      error: () => { if (this.selected()?.id === id) { this.detailLoading.set(false); this.detailError.set(true); } },
    });
  }
  saveProgramme() {
    if (this.saving() || this.optionsLoading() || this.optionsError() || !this.availableDepartments.some(unit => unit.id === this.model.department)) return;
    this.saving.set(true);
    const { workflowSlug, ...fields } = this.model;
    this.dashboard.request(this.editingId() ? 'PUT' : 'POST', this.editingId() ? `programmes/${this.editingId()}` : 'programmes',
      this.editingId() ? fields : { ...fields, workflowSlug }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => { this.saving.set(false); this.toast.success(this.editingId() ? 'Programme updated.' : 'Programme added.'); this.closePanel(); this.loadProgrammes(); },
        error: error => { this.saving.set(false); this.toast.error(error?.message ?? 'Programme could not be saved.'); },
      });
  }
  confirmAction() {
    const action = this.pendingAction();
    const programme = this.selected();
    this.pendingAction.set(null);
    if (!action || !programme || this.saving()) return;
    this.saving.set(true);
    this.dashboard.request(action === 'delete' ? 'DELETE' : 'PUT', `programmes/${programme.id}${action === 'workflow' ? '/workflow' : ''}`,
      action === 'workflow' ? { workflowSlug: this.workflowSlug() } : undefined).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.saving.set(false);
          this.toast.success(action === 'delete' ? 'Programme deleted.' : 'Programme workflow updated.');
          if (action === 'delete') this.closePanel(); else this.loadDetail(programme.id);
          this.loadProgrammes();
        },
        error: error => { this.saving.set(false); this.toast.error(error?.message ?? 'Action could not be completed.'); },
      });
  }
}
