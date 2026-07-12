import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ReportTaskTracking, ReportProgramme, ReportsReviewsData } from '../../types/reports-reviews';

@Component({
  selector: 'reports-reviews',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './reports-reviews.component.html',
})
export class ReportsReviewsComponent implements OnInit {
  private readonly http = inject(ClientService);

  data = signal<ReportsReviewsData | null>(null);
  search = signal('');
  startDate = signal('');
  endDate = signal('');
  status = signal('');
  stage = signal('');
  decision = signal('');
  loading = signal(true);
  error = signal('');

  ngOnInit() {
    this.http.get<ReportsReviewsData>('reports-reviews').subscribe({
      next: (data) => {
        this.data.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Reports and reviews could not be loaded.');
        this.loading.set(false);
      },
    });
  }

  get filteredProgrammes() {
    const term = this.search().trim().toLowerCase();
    return (this.data()?.programmes ?? []).filter((programme) =>
      this.inSelectedPeriod(programme.lastActivity)
      && (!this.status() || programme.workflowStatus === this.status())
      && (!this.stage() || programme.currentStage === this.stage())
      && (!term || [programme.title, programme.code, programme.facultyName, programme.departmentName, programme.responsiblePerson, programme.responsibleUnit]
        .some((value) => String(value ?? '').toLowerCase().includes(term))));
  }

  get filteredTasks() {
    const term = this.search().trim().toLowerCase();
    return (this.data()?.taskTracking ?? []).filter((task) =>
      this.inSelectedPeriod(task.date)
      && (!this.status() || task.status === this.status())
      && (!this.stage() || task.stage === this.stage())
      && (!this.decision() || task.decision === this.decision())
      && (!term || [task.programmeTitle, task.programmeCode, task.taskName, task.stage, task.status, task.decision, task.responsiblePerson, task.responsibleUnit]
        .some((value) => String(value ?? '').toLowerCase().includes(term))));
  }

  get filteredDeferments() {
    const term = this.search().trim().toLowerCase();
    return (this.data()?.deferments ?? []).filter((item) =>
      this.inSelectedPeriod(item.date)
      && (!this.stage() || item.stage === this.stage())
      && (!this.decision() || item.decision === this.decision())
      && (!term || [item.programmeTitle, item.programmeCode, item.taskName, item.stage, item.reason, item.responsiblePerson, item.responsibleUnit]
        .some((value) => String(value ?? '').toLowerCase().includes(term))));
  }

  get processedInSelectedPeriod() {
    return this.filteredProgrammes.length;
  }

  get statusOptions() {
    return [...new Set([
      ...(this.data()?.programmes ?? []).map((programme) => programme.workflowStatus),
      ...(this.data()?.taskTracking ?? []).map((task) => task.status),
    ].filter(Boolean))].sort();
  }

  get stageOptions() {
    return [...new Set([
      ...(this.data()?.programmes ?? []).map((programme) => programme.currentStage),
      ...(this.data()?.taskTracking ?? []).map((task) => task.stage),
    ].filter(Boolean) as string[])].sort();
  }

  get decisionOptions() {
    return [...new Set((this.data()?.taskTracking ?? []).map((task) => task.decision).filter(Boolean))].sort();
  }

  clearFilters() {
    this.search.set('');
    this.startDate.set('');
    this.endDate.set('');
    this.status.set('');
    this.stage.set('');
    this.decision.set('');
  }

  statusClass(status: string) {
    if (status === 'completed') return 'badge badge-success badge-sm capitalize';
    if (status === 'running' || status === 'in_progress') return 'badge badge-warning badge-sm capitalize';
    if (status === 'rejected' || status === 'stopped') return 'badge badge-error badge-sm capitalize';
    return 'badge badge-ghost badge-sm capitalize';
  }

  stageLabel(stage?: string) {
    return stage ? stage.replaceAll('-', ' ').replaceAll('_', ' ') : 'Not started';
  }

  progress(programme: ReportProgramme) {
    const total = programme.activeTasks + programme.completedTasks;
    return total ? Math.round((programme.completedTasks / total) * 100) : 0;
  }

  taskDate(task: ReportTaskTracking) {
    return task.completedAt ?? task.date;
  }

  private inSelectedPeriod(value?: string) {
    if (!value) return !this.startDate() && !this.endDate();
    const date = new Date(value);
    if (this.startDate() && date < new Date(this.startDate())) return false;
    if (this.endDate()) {
      const end = new Date(this.endDate());
      end.setHours(23, 59, 59, 999);
      if (date > end) return false;
    }
    return true;
  }
}
