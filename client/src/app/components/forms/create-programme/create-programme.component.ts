
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { StartNeedAnalysisService } from '../../../services/start-need-analysis.service';
import { ToastService } from '../../../services/toast.service';
import { Programme, User } from '../../../types';
import { WorkflowDefinitionSummary } from '../../../types/workflow-definition';
import { WorkflowDefinitionService } from '../../../services/workflow-definition.service';

@Component({
  selector: 'create-programme',
  templateUrl: 'create-programme.component.html',
  providers: [StartNeedAnalysisService],
  imports: [FormsModule]
})

export class CreateProgrammeComponent implements OnInit {
  levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  programme: Programme = { code: "", title: "", faculty: "", department: "", initiator: "", level: 0 };
  private codeEditedManually = false;
  private generatedCode = "";
  workflowDefinitions: WorkflowDefinitionSummary[] = [];
  selectedWorkflowSlug = '';
  workflowDefinitionsLoading = signal(true);
  _loading = inject(LoadingService);
  _http = inject(ClientService);
  router = inject(Router);
  toast = inject(ToastService);
  apollo = inject(Apollo);
  modalControl = inject(ModalControlService);
  workflowDefinitionService = inject(WorkflowDefinitionService);
  currentUser?: User;

  ngOnInit(): void {
    let user = sessionStorage.getItem("loggedInUser");
    if (user) {
      this.currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
      this.programme.initiator = this.currentUser?.id
      this.programme.faculty = this.currentUser?.faculty?.id;
      this.programme.department = this.currentUser?.department?.id;
    }
    this.loadWorkflowDefinitions();
  }

  get selectedWorkflow() {
    return this.workflowDefinitions.find((definition) => definition.slug === this.selectedWorkflowSlug);
  }

  loadWorkflowDefinitions() {
    this.workflowDefinitionsLoading.set(true);
    this.workflowDefinitionService.list().subscribe({
      next: (definitions) => {
        this.workflowDefinitions = definitions.filter((definition) => definition.status === 'active');
        const current = this.workflowDefinitions.find((definition) => definition.isDefault)
          ?? this.workflowDefinitions[0];
        this.selectedWorkflowSlug = current?.slug ?? '';
        this.workflowDefinitionsLoading.set(false);
      },
      error: () => {
        this.workflowDefinitions = [];
        this.selectedWorkflowSlug = '';
        this.workflowDefinitionsLoading.set(false);
        this.toast.error('Development paths could not be loaded.');
      },
    });
  }

  workflowOptionLabel(definition: WorkflowDefinitionSummary) {
    const current = definition.isDefault ? ' · Current' : '';
    return `${definition.name} · v${definition.version}${current}`;
  }

  onTitleChange(title: string) {
    this.programme.title = title;

    if (!this.codeEditedManually || this.programme.code === this.generatedCode) {
      this.regenerateCode();
    }
  }

  onCodeChange(code: string) {
    const value = this.formatCode(code);
    this.programme.code = value;
    this.codeEditedManually = value.length > 0 && value !== this.generatedCode;
  }

  regenerateCode() {
    this.generatedCode = this.generateProgrammeCode(this.programme.title);
    this.programme.code = this.generatedCode;
    this.codeEditedManually = false;
  }

  private generateProgrammeCode(title: string): string {
    const ignoredWords = new Set(['a', 'an', 'and', 'for', 'in', 'of', 'the', 'to']);
    const words = title
      .replace(/[^a-zA-Z0-9\s]/g, ' ')
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(Boolean);

    const meaningfulWords = words.filter((word) => !ignoredWords.has(word.toLowerCase()));
    const sourceWords = meaningfulWords.length ? meaningfulWords : words;

    if (sourceWords.length <= 1) {
      return this.formatCode(sourceWords[0]?.slice(0, 4) ?? '');
    }

    return this.formatCode(sourceWords.map((word) => word[0]).join('').slice(0, 8));
  }

  private formatCode(code: string): string {
    return code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  }

  onSubmit(form: NgForm) {
    this._http.post('programmes', {
      ...this.programme,
      workflowSlug: this.selectedWorkflowSlug || undefined,
      actor: {
        id: this.currentUser?.id,
        role: this.currentUser?.role,
      },
    })
      .subscribe({
        next: (data) => {
          form.reset();
          this.toast.success(data?.message ?? "Programme created and workflow started");
          this.modalControl.close();
          this.apollo.client.refetchQueries({
            include: ['GetProgrammes', 'GetBootstrap']
          });
          this.codeEditedManually = false;
          this.generatedCode = "";
        },
        error: (error) => {
          this.modalControl.close();
          this.toast?.error("Failed to create new programme ")
        }
      });
  }

}
