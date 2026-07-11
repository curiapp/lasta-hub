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
import { ToastService } from '../../services/toast.service';
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
  private readonly toastService = inject(ToastService);
  private readonly definitionService = inject(WorkflowDefinitionService);
  private readonly http = inject(ClientService);

  detail?: ProgrammeWorkflowDetail;
  definition?: WorkflowDefinition;
  selectedStageId = '';
  selectedTaskKey = '';
  inbox: WorkflowInboxItem[] = [];
  formData: Record<string, any> = {};
  formErrors: Record<string, string> = {};
  artifacts: WorkflowArtifactInput[] = [];
  artifactAttachmentMap: Record<string, WorkflowArtifactRecord[]> = {};
  readonly emptyAttachments: WorkflowArtifactRecord[] = [];
  loading = true;
  completing = false;
  reopeningTask = false;
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

  get canReopenSelectedTask() {
    const task = this.selectedTaskInstance;
    const isCoordinator = this.programme?.initiatorUser?.id === this.currentUserId;
    return task?.status === 'completed'
      && (this.currentUserRole === 'admin'
        || this.currentUserRole === 'pdqa'
        || isCoordinator
        || task.ownerRoles.map((role) => role.toLowerCase()).includes(this.currentUserRole));
  }

  get selectedTaskDecision() {
    const value = this.selectedTaskInstance?.decision || this.formData['decision'];
    return String(value ?? '').trim();
  }

  get selectedTaskNeedsReview() {
    if (this.selectedTaskInstance?.status !== 'completed') return false;
    const decision = this.selectedTaskDecision.toLowerCase();
    return decision === 'decline' || decision === 'declined';
  }

  get selectedTaskReviewMessage() {
    const decision = this.selectedTaskDecision || 'the recorded decision';
    return `Review this task because the previous decision was ${decision}. The existing details are kept for amendment.`;
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
    return this.definition?.name || 'No development path assigned';
  }

  get canSwitchWorkflow() {
    return this.canManageWorkflow && this.completedTaskCount === 0 && Boolean(this.detail?.process);
  }

  get selectedTaskArtifacts(): WorkflowArtifactRecord[] {
    return (this.detail?.artifacts ?? []).filter((artifact) => artifact.taskId === this.selectedTaskInstance?.id);
  }

  get selectedTaskAttachmentGroups(): Array<{ type: string; title: string; attachments: WorkflowArtifactRecord[] }> {
    const groups = new Map<string, { type: string; title: string; attachments: WorkflowArtifactRecord[] }>();
    for (const attachment of this.selectedTaskArtifacts) {
      const requirement = this.artifacts.find((artifact) => artifact.type === attachment.type);
      const title = requirement?.title || attachment.type || 'Documents';
      const group = groups.get(attachment.type) ?? { type: attachment.type, title, attachments: [] };
      group.attachments.push(attachment);
      groups.set(attachment.type, group);
    }
    return [...groups.values()];
  }

  taskArtifacts(taskKey: string): WorkflowArtifactRecord[] {
    const task = this.taskInstance(taskKey);
    return (this.detail?.artifacts ?? []).filter((artifact) => artifact.taskId === task?.id);
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
        this.showMessage('Programme details could not be loaded.', 'error');
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
        this.showMessage('Programme development started.', 'success');
        this.loadProgramme();
      },
      error: (error) => {
        this.starting = false;
        this.showMessage(error?.message ?? 'Programme development could not be started.', 'error');
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
        this.showMessage('Programme development path updated.', 'success');
        this.loadProgramme();
      },
      error: (error) => {
        this.switchingWorkflow = false;
        this.showMessage(error?.message ?? 'Programme development path could not be updated.', 'error');
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
    this.formErrors = {};
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
      type: artifact.key,
      title: artifact.label,
      reference: '',
      required: artifact.required === true,
      multiple: artifact.multiple === true,
      maxFiles: artifact.multiple ? artifact.maxFiles : 1,
      maxFileSizeMb: Math.max(Number(artifact.maxFileSizeMb) || 20, 1),
    }));
    this.refreshArtifactAttachmentMap();
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
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const errorKey = this.fieldErrorKey(field, target);
    delete this.formErrors[errorKey];

    if (!file) {
      (target ?? this.formData)[field.key] = '';
      return;
    }

    const maxBytes = (field.maxFileSizeMb ?? 0) * 1024 * 1024;
    if (maxBytes > 0 && file.size > maxBytes) {
      this.formErrors[errorKey] = `${field.label} must be ${field.maxFileSizeMb} MB or smaller.`;
      input.value = '';
      (target ?? this.formData)[field.key] = '';
      return;
    }

    if (!this.fileTypeAllowed(field, file)) {
      this.formErrors[errorKey] = `${field.label} must be one of: ${field.acceptedFileTypes?.join(', ')}.`;
      input.value = '';
      (target ?? this.formData)[field.key] = '';
      return;
    }

    (target ?? this.formData)[field.key] = file.name;
  }

  fileAccept(field: WorkflowField) {
    return field.acceptedFileTypes?.join(',') ?? '';
  }

  fileHelpText(field: WorkflowField) {
    const parts = [];
    if (field.acceptedFileTypes?.length) parts.push(`Accepted: ${field.acceptedFileTypes.join(', ')}`);
    if (field.maxFileSizeMb) parts.push(`Max ${field.maxFileSizeMb} MB`);
    return parts.join(' | ');
  }

  fieldError(field: WorkflowField, target?: Record<string, any>) {
    return this.formErrors[this.fieldErrorKey(field, target)] ?? '';
  }

  setArtifactFile(artifact: WorkflowArtifactInput, event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    artifact.reference = file.name;
    artifact.title = file.name;
  }

  attachmentUploaded(artifact: WorkflowArtifactRecord) {
    const taskId = artifact.taskId || this.selectedTaskInstance?.id;
    const uploaded = {
      ...artifact,
      taskId: taskId ?? artifact.taskId,
      status: artifact.status ?? 'draft',
    };
    if (this.detail) {
      this.detail.artifacts = [
        ...this.detail.artifacts.filter((item) => item.id !== uploaded.id),
        uploaded,
      ];
    }
    this.refreshArtifactAttachmentMap();
    this.showMessage(`${artifact.reference || artifact.title} uploaded.`, 'success');
  }

  artifactUploadCount(artifact: WorkflowArtifactInput) {
    return this.artifactAttachmentMap[artifact.type]?.length ?? 0;
  }

  artifactAttachments(artifact: WorkflowArtifactInput) {
    return this.artifactAttachmentMap[artifact.type] ?? this.emptyAttachments;
  }

  artifactUploadLimit(artifact: WorkflowArtifactInput) {
    return artifact.multiple ? artifact.maxFiles : 1;
  }

  canUploadArtifact(artifact: WorkflowArtifactInput) {
    const limit = this.artifactUploadLimit(artifact);
    return limit == null || this.artifactUploadCount(artifact) < limit;
  }

  artifactHelpText(artifact: WorkflowArtifactInput) {
    const count = this.artifactUploadCount(artifact);
    const limit = this.artifactUploadLimit(artifact);
    const fileCount = artifact.multiple
      ? limit == null ? `${count} files uploaded` : `${count} of ${limit} files uploaded`
      : `${count} of 1 file uploaded`;
    return `${fileCount} | Max ${artifact.maxFileSizeMb ?? 20} MB each`;
  }

  attachmentUrl(artifact: WorkflowArtifactRecord) {
    return `${environment.apiUrl}/attachments/${artifact.id}/download`;
  }

  attachmentRemoved(attachmentId: string) {
    if (this.detail) {
      this.detail.artifacts = this.detail.artifacts.filter((artifact) => artifact.id !== attachmentId);
    }
    this.refreshArtifactAttachmentMap();
    this.showMessage('Attachment removed.', 'success');
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
    this.completing = true;
    this.syncLatestProgrammeBeforeComplete(task.id);
  }

  reopenSelectedTask() {
    const task = this.selectedTaskInstance;
    if (!task || !this.canReopenSelectedTask || this.reopeningTask) return;
    this.reopeningTask = true;
    this.http.post(`tasks/${task.id}/reopen`, {
      actor: {
        id: this.currentUserId,
        role: this.currentUserRole,
      },
    }).subscribe({
      next: () => {
        this.reopeningTask = false;
        this.showMessage('Task reopened for amendments.', 'success');
        this.loadProgramme();
      },
      error: (error) => {
        this.reopeningTask = false;
        this.showMessage(error?.message ?? 'Task could not be reopened.', 'error');
      },
    });
  }

  private syncLatestProgrammeBeforeComplete(taskId: string) {
    const programmeId = this.route.snapshot.paramMap.get('id');
    if (!programmeId) {
      this.completing = false;
      return;
    }

    this.apollo.query<{ programmeWorkflow: ProgrammeWorkflowDetail }>({
      query: V2_GET_PROGRAMME_WORKFLOW,
      variables: { programmeId },
      fetchPolicy: 'network-only',
    }).subscribe({
      next: ({ data }) => {
        this.detail = data.programmeWorkflow;
        this.refreshArtifactAttachmentMap();
        this.submitCompletedTask(taskId);
      },
      error: () => {
        this.completing = false;
        this.showMessage('Programme attachments could not be checked. Please try again.', 'error');
      },
    });
  }

  private submitCompletedTask(taskId: string) {
    if (Object.keys(this.formErrors).length) {
      this.completing = false;
      this.showMessage('Fix the file selection before completing this task.', 'error');
      return;
    }
    this.refreshArtifactAttachmentMap();
    const missingArtifact = this.artifacts.find((artifact) =>
      artifact.required && !(this.artifactAttachmentMap[artifact.type]?.length));
    if (missingArtifact) {
      this.completing = false;
      this.showMessage(`${missingArtifact.title} is required.`, 'error');
      return;
    }
    const exceededArtifact = this.artifacts.find((artifact) =>
      this.artifactUploadLimit(artifact) != null && this.artifactUploadCount(artifact) > this.artifactUploadLimit(artifact)!);
    if (exceededArtifact) {
      this.completing = false;
      this.showMessage(`${exceededArtifact.title} allows at most ${this.artifactUploadLimit(exceededArtifact)} file(s).`, 'error');
      return;
    }

    const user = this.auth.user;
    const actor = {
      ...(user?.id ? { id: user.id } : {}),
      role: this.currentUserRole,
    };
    this.apollo.mutate({
      mutation: V2_COMPLETE_TASK,
      variables: {
        taskId,
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
        this.showMessage('Task completed and the next step opened.', 'success');
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
    this.toastService.add(message, type);
  }

  private refreshArtifactAttachmentMap() {
    const next: Record<string, WorkflowArtifactRecord[]> = {};
    for (const attachment of this.selectedTaskArtifacts) {
      next[attachment.type] = [...(next[attachment.type] ?? []), attachment];
    }
    this.artifactAttachmentMap = next;
  }

  private fileTypeAllowed(field: WorkflowField, file: File) {
    if (!field.acceptedFileTypes?.length) return true;
    const fileName = file.name.toLowerCase();
    const mimeType = file.type.toLowerCase();
    return field.acceptedFileTypes.some((type) => {
      const accepted = type.trim().toLowerCase();
      if (!accepted) return false;
      if (accepted.startsWith('.')) return fileName.endsWith(accepted);
      if (accepted.endsWith('/*')) return mimeType.startsWith(accepted.slice(0, -1));
      return mimeType === accepted;
    });
  }

  private fieldErrorKey(field: WorkflowField, target?: Record<string, any>) {
    if (!target) return field.key;
    return `${field.key}-${this.repeaterTargetIndex(target)}`;
  }

  private repeaterTargetIndex(target: Record<string, any>) {
    for (const value of Object.values(this.formData)) {
      if (Array.isArray(value)) {
        const index = value.indexOf(target);
        if (index >= 0) return index;
      }
    }
    return 'item';
  }
}
