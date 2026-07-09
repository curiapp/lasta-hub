import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { ReportProgramme, ReportsReviewsData } from '../../types/reports-reviews';

@Component({
  selector: 'reports-reviews',
  imports: [CommonModule],
  templateUrl: './reports-reviews.component.html',
})
export class ReportsReviewsComponent implements OnInit {
  private readonly http = inject(ClientService);

  data = signal<ReportsReviewsData | null>(null);
  search = signal('');
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
    if (!term) return this.data()?.programmes ?? [];
    return (this.data()?.programmes ?? []).filter((programme) =>
      [programme.title, programme.code, programme.facultyName, programme.departmentName]
        .some((value) => String(value ?? '').toLowerCase().includes(term)));
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
}
