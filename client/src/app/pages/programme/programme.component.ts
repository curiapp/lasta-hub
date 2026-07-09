import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  V2_COMPLETE_TASK,
  V2_GET_ACTIVE_TASKS,
  V2_GET_PROGRAMME_WORKFLOW,
  V2_START_PROCESS,
} from '../../graphql/graphql.queries.v2';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingService } from '../../services/loading.service';
import { WorkflowDefinitionService } from '../../services/workflow-definition.service';
import { ClientService } from '../../services/client.service';
import { environment } from '../../../environments/environment';
import { WorkflowTaskUploadComponent } from '../../components/files/workflow-task-upload/workflow-task-upload.component';
import {
  WorkflowDefinition,
  WorkflowDefinitionSummary,
  WorkflowField,
  WorkflowStage,
} from '../../types/workflow-definition';
import {
  ProgrammeWorkflowDetail,
  WorkflowArtifactRecord,
  WorkflowArtifactInput,
  WorkflowInboxItem,
} from '../../types/programme-workflow';

@Component({
  selector: 'programme',
  imports: [CommonModule, FormsModule, WorkflowTaskUploadComponent],
  templateUrl: './programme.component.html',
})
export class ProgrammeComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly apollo = inject(Apollo);
  private readonly auth = inject(AuthenticationService);
  private readonly loadingService = inject(LoadingService);
  private readonly definitionService = inject(WorkflowDefinitionService);
  private readonly http = inject(ClientService);

  detail?: ProgrammeWorkflowDetail;
  definition?: WorkflowDefinition;
  selectedStageId = '';
  selectedTaskKey = '';
  inbox: WorkflowInboxItem[] = [];
  formData: Record<string, any> = {};
  artifacts: WorkflowArtifactInput[] = [];
  loading = true;
  completing = false;
  starting = false;
  switchingWorkflow = false;
  workflowDefinitions: WorkflowDefinitionSummary[] = [];
  selectedWorkflowSlug = '';
  message = '';
  messageType: 'success' | 'error' = 'success';
  readonly defaultWorkflowSlug = 'lasta-programme-development';

  ngOnInit() {
    this.loadProgramme();
  }

  get programme() {
    return this.detail?.programme;
  }

  get stages() {
    return [...(this.definition?.stages ?? [])].sort((a, b) => a.order - b.order);
  }

  get selectedStage() {
    return this.stages.find((stage) => stage.id === this.selectedStageId);
  }

  get stageTaskDefinitions() {
    return (this.definition?.tasks ?? []).filter((task) => task.stageId === this.selectedStageId);
  }

  get selectedTaskDefinition() {
    return this.definition?.tasks.find((task) => task.id === this.selectedTaskKey);
  }

  get selectedTaskInstance() {
    return this.detail?.tasks.find((task) => task.taskKey === this.selectedTaskKey);
  }

  get activeTaskCount() {
    return this.detail?.tasks.filter((task) => task.status === 'active').length ?? 0;
  }

  get completedTaskCount() {
    return this.detail?.tasks.filter((task) => task.status === 'completed').length ?? 0;
  }

  get currentStageName() {
    const stageKey = this.detail?.process?.currentStageKey;
    return this.definition?.stages.find((stage) => stage.id === stageKey)?.name ?? 'Not started';
  }

  get initiatorName() {
    const user = this.programme?.initiatorUser;
    return user?.displayName
      || [user?.firstName, user?.lastName].filter(Boolean).join(' ')
      || user?.email
      || 'Not available';
  }

  get canCompleteSelectedTask() {
    const task = this.selectedTaskInstance;
    const isCoordinator = this.programme?.initiatorUser?.id === this.currentUserId;
    return task?.status === 'active'
      && (this.currentUserRole === 'admin'
        || this.currentUserRole === 'pdqa'
        || isCoordinator
        || task.ownerRoles.map((role) => role.toLowerCase()).includes(this.currentUserRole));
  }

  get currentUserRole() {
    return String(this.auth.user?.role ?? '').trim().toLowerCase();
  }

  get currentUserId() {
    return this.auth.user?.id ?? '';
  }

  get canManageWorkflow() {
    return this.currentUserRole === 'pdqa';
  }

  get workflowDisplayName() {
    return this.definition?.name || 'No workflow assigned';
  }

  get canSwitchWorkflow() {
    return this.canManageWorkflow && this.completedTaskCount === 0 && Boolean(this.detail?.process);
  }

  get selectedTaskArtifacts(): WorkflowArtifactRecord[] {
    return (this.detail?.artifacts ?? []).filter((artifact) => artifact.taskId === this.selectedTaskInstance?.id);
  }

  get isReadOnly() {
    return this.selectedTaskInstance?.status === 'completed' || !this.canCompleteSelectedTask;
  }

  loadProgramme() {
    const programmeId = this.route.snapshot.paramMap.get('id');
    if (!programmeId) return;
    this.loading = true;
    this.loadingService.isLoading.set(true);

    this.apollo.query<{ programmeWorkflow: ProgrammeWorkflowDetail }>({
      query: V2_GET_PROGRAMME_WORKFLOW,
      variables: { programmeId },
      fetchPolicy: 'network-only',
    }).subscribe({
      next: ({ data }) => {
        this.detail = data.programmeWorkflow;
        this.selectedWorkflowSlug = this.detail.definition?.id ?? '';
        if (this.canManageWorkflow) this.loadWorkflowDefinitions();
        if (this.detail.definition) {
          this.applyDefinition(this.detail.definition);
        } else {
          this.definitionService.get(this.defaultWorkflowSlug).subscribe({
            next: (definition) => this.applyDefinition(definition),
          });
        }
        this.loading = false;
        this.loadingService.isLoading.set(false);
      },
      error: () => {
        this.loading = false;
        this.loadingService.isLoading.set(false);
        this.showMessage('Programme workflow could not be loaded.', 'error');
      },
    });
  }

  startWorkflow() {
    if (!this.programme || this.starting) return;
    this.starting = true;
    this.apollo.mutate({
      mutation: V2_START_PROCESS,
      variables: {
        programmeId: this.programme.id,
        actorId: this.auth.user?.id,
        workflowSlug: this.defaultWorkflowSlug,
      },
    }).subscribe({
      next: () => {
        this.starting = false;
        this.showMessage('Programme workflow started.', 'success');
        this.loadProgramme();
      },
      error: (error) => {
        this.starting = false;
        this.showMessage(error?.message ?? 'Workflow could not be started.', 'error');
      },
    });
  }

  loadWorkflowDefinitions() {
    this.definitionService.list().subscribe({
      next: (definitions) => this.workflowDefinitions = definitions.filter((item) => item.status === 'active'),
      error: () => this.workflowDefinitions = [],
    });
  }

  switchWorkflow() {
    if (!this.programme || !this.canSwitchWorkflow || !this.selectedWorkflowSlug || this.switchingWorkflow) return;
    this.switchingWorkflow = true;
    this.http.put(`programmes/${this.programme.id}/workflow`, {
      workflowSlug: this.selectedWorkflowSlug,
      actorId: this.currentUserId,
    }).subscribe({
      next: () => {
        this.switchingWorkflow = false;
        this.showMessage('Programme workflow updated.', 'success');
        this.loadProgramme();
      },
      error: (error) => {
        this.switchingWorkflow = false;
        this.showMessage(error?.message ?? 'Programme workflow could not be updated.', 'error');
      },
    });
  }

  selectStage(stage: WorkflowStage) {
    this.selectedStageId = stage.id;
    const stageTasks = this.definition?.tasks.filter((task) => task.stageId === stage.id) ?? [];
    const active = stageTasks.find((definition) =>
      this.detail?.tasks.some((instance) => instance.taskKey === definition.id && instance.status === 'active'));
    this.selectTask(active?.id ?? stageTasks[0]?.id ?? '');
  }

  selectTask(taskKey: string) {
    this.selectedTaskKey = taskKey;
    const instance = this.detail?.tasks.find((task) => task.taskKey === taskKey);
    this.formData = instance?.formData ? structuredClone(instance.formData) : {};
    const definition = this.selectedTaskDefinition;
    for (const field of definition?.form ?? []) {
      if (field.type === 'repeater' && !Array.isArray(this.formData[field.key])) {
        this.formData[field.key] = [];
      }
      if (field.type === 'checkbox' && field.options?.length && !Array.isArray(this.formData[field.key])) {
        this.formData[field.key] = [];
      }
    }
    this.artifacts = (definition?.artifacts ?? []).map((artifact) => ({
      type: String(artifact['key']),
      title: String(artifact['label']),
      reference: '',
      required: artifact['required'] === true,
    }));
  }

  taskInstance(taskKey: string) {
    return this.detail?.tasks.find((task) => task.taskKey === taskKey);
  }

  stageState(stageId: string) {
    const tasks = this.detail?.tasks.filter((task) => task.stageKey === stageId) ?? [];
    if (tasks.some((task) => task.status === 'active')) return 'active';
    if (tasks.some((task) => task.status === 'completed')) return 'completed';
    return 'pending';
  }

  statusClasses(status?: string) {
    const base = 'badge badge-sm capitalize font-semibold';
    if (status === 'active' || status === 'running') return `${base} badge-warning`;
    if (status === 'completed') return `${base} badge-success`;
    if (status === 'rejected' || status === 'stopped') return `${base} badge-error`;
    return `${base} badge-ghost`;
  }

  stageClasses(stage: WorkflowStage) {
    const selected = stage.id === this.selectedStageId
      ? 'border-primary bg-base-100 shadow-sm'
      : 'border-transparent hover:border-base-300 hover:bg-base-100';
    return `grid w-full grid-cols-[2rem_minmax(0,1fr)_0.75rem] items-center gap-2 rounded-md border p-2 text-left transition-colors ${selected}`;
  }

  loadInbox() {
    if (!this.currentUserRole) return;
    this.apollo.query<{ tasks: WorkflowInboxItem[] }>({
      query: V2_GET_ACTIVE_TASKS,
      variables: { role: this.currentUserRole },
      fetchPolicy: 'network-only',
    }).subscribe({
      next: ({ data }) => this.inbox = data.tasks ?? [],
      error: () => this.inbox = [],
    });
  }

  openInboxTask(item: WorkflowInboxItem) {
    if (item.programme.id !== this.programme?.id) {
      this.router.navigate(['/programme', item.programme.id]);
      return;
    }
    const definition = this.definition?.tasks.find((task) => task.id === item.task.taskKey);
    const stage = this.stages.find((candidate) => candidate.id === definition?.stageId);
    if (stage) this.selectedStageId = stage.id;
    this.selectTask(item.task.taskKey);
  }

  addRepeaterItem(field: WorkflowField) {
    const values = this.formData[field.key] as Array<Record<string, unknown>>;
    const item: Record<string, unknown> = {};
    for (const child of field.fields ?? []) {
      item[child.key] = child.type === 'checkbox' && child.options?.length ? [] : '';
    }
    values.push(item);
  }

  removeRepeaterItem(field: WorkflowField, index: number) {
    (this.formData[field.key] as unknown[])?.splice(index, 1);
  }

  repeaterItems(field: WorkflowField) {
    const items = this.formData[field.key];
    return Array.isArray(items) ? items as Array<Record<string, any>> : [];
  }

  checkboxSelected(field: WorkflowField, option: string, target?: Record<string, any>) {
    const values = (target ?? this.formData)[field.key];
    return Array.isArray(values) && values.includes(option);
  }

  toggleCheckboxOption(field: WorkflowField, option: string, checked: boolean, target?: Record<string, any>) {
    const record = target ?? this.formData;
    const values = new Set<string>(Array.isArray(record[field.key]) ? record[field.key] : []);
    if (checked) values.add(option);
    else values.delete(option);
    record[field.key] = [...values];
  }

  setFileField(field: WorkflowField, event: Event, target?: Record<string, any>) {
    const file = (event.target as HTMLInputElement).files?.[0];
    (target ?? this.formData)[field.key] = file?.name ?? '';
  }

  setArtifactFile(artifact: WorkflowArtifactInput, event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    artifact.reference = file.name;
    artifact.title = file.name;
  }

  attachmentUploaded(artifact: WorkflowArtifactRecord) {
    if (this.detail) this.detail.artifacts = [...this.detail.artifacts, artifact];
    this.showMessage(`${artifact.reference || artifact.title} uploaded.`, 'success');
  }

  attachmentUrl(artifact: WorkflowArtifactRecord) {
    return `${environment.apiUrl}/attachments/${artifact.id}/download`;
  }

  displayValue(value: unknown): string {
    if (value === null || value === undefined || value === '') return 'Not provided';
    if (Array.isArray(value)) {
      return value.map((item) => typeof item === 'object'
        ? Object.entries(item as Record<string, unknown>)
          .map(([key, entry]) => `${key}: ${this.displayValue(entry)}`).join(', ')
        : String(item)).join('; ');
    }
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  }

  completeTask() {
    const task = this.selectedTaskInstance;
    if (!task || !this.canCompleteSelectedTask || this.completing) return;
    const uploadedTypes = new Set(this.selectedTaskArtifacts.map((artifact) => artifact.type));
    const missingArtifact = this.artifacts.find((artifact) => artifact.required && !uploadedTypes.has(artifact.type));
    if (missingArtifact) {
      this.showMessage(`${missingArtifact.title} is required.`, 'error');
      return;
    }

    const user = this.auth.user;
    const actor = {
      ...(user?.id ? { id: user.id } : {}),
      role: this.currentUserRole,
    };
    this.completing = true;
    this.apollo.mutate({
      mutation: V2_COMPLETE_TASK,
      variables: {
        taskId: task.id,
        input: {
          event: 'submit',
          actor,
          formData: this.formData,
          artifacts: [],
        },
      },
    }).subscribe({
      next: () => {
        this.completing = false;
        this.showMessage('Task completed and workflow advanced.', 'success');
        this.loadProgramme();
      },
      error: (error) => {
        this.completing = false;
        this.showMessage(error?.message ?? 'Task could not be completed.', 'error');
      },
    });
  }

  private applyDefinition(definition: WorkflowDefinition) {
    this.definition = definition;
    const activeTask = this.detail?.tasks.find((task) => task.status === 'active');
    const preferredStage = activeTask?.stageKey
      ?? this.detail?.process?.currentStageKey
      ?? definition.stages?.[0]?.id
      ?? '';
    const stage = definition.stages.find((candidate) => candidate.id === preferredStage);
    if (stage) this.selectStage(stage);
    this.loadInbox();
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
  }
}
