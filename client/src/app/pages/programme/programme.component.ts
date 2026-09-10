import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {
  COMPLETE_TASK,
  GET_ACTIVE_TASKS,
  GET_PROGRAMME_WORKFLOW,
  START_PROCESS,
} from '../../graphql/graphql.queries';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';
import { WorkflowDefinitionService } from '../../services/workflow-definition.service';
import { ClientService } from '../../services/client.service';
import { environment } from '../../../environments/environment';
import { WorkflowTaskUploadComponent } from '../../components/files/workflow-task-upload/workflow-task-upload.component';
import { NQFLevel } from '../../static';
import {
  WorkflowCondition,
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

type WorkflowUserOption = {
  id: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: string;
  departmentName?: string;
  facultyName?: string;
};

type EmailRecipient = {
  id?: string;
  email: string;
  name?: string;
  role?: string;
  departmentName?: string;
  facultyName?: string;
};

type EmailComposerState = {
  open: boolean;
  title: string;
  recipients: EmailRecipient[];
  selectedEmails: string[];
  subject: string;
  body: string;
  subjectTemplate: string;
  bodyTemplate: string;
};

type ProgrammeEditForm = {
  title: string;
  code: string;
  level: number;
};

@Component({
  selector: 'programme',
  imports: [CommonModule, FormsModule, WorkflowTaskUploadComponent],
  templateUrl: './programme.component.html',
  styleUrls: ['./programme.component.css'],
})
export class ProgrammeComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly apollo = inject(Apollo);
  private readonly auth = inject(AuthenticationService);
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
  userSearchText: Record<string, string> = {};
  userSearchResults: Record<string, WorkflowUserOption[]> = {};
  userSearchLoading: Record<string, boolean> = {};
  artifacts: WorkflowArtifactInput[] = [];
  artifactAttachmentMap: Record<string, WorkflowArtifactRecord[]> = {};
  readonly emptyAttachments: WorkflowArtifactRecord[] = [];
  loading = signal(true);
  completing = signal(false);
  reopeningTask = signal(false);
  starting = signal(false);
  switchingWorkflow = signal(false);
  workflowDefinitions: WorkflowDefinitionSummary[] = [];
  selectedWorkflowSlug = '';
  workflowDefinitionsLoading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';
  programmeEditOpen = signal(false);
  updatingProgramme = signal(false);
  programmeEditForm = signal<ProgrammeEditForm>({
    title: '',
    code: '',
    level: 1,
  });
  readonly levels = NQFLevel;
  emailComposer = signal<EmailComposerState>({
    open: false,
    title: '',
    recipients: [],
    selectedEmails: [],
    subject: '',
    body: '',
    subjectTemplate: '',
    bodyTemplate: '',
  });
  sendingEmail = signal(false);
  private readonly taskCompletionTransitionMs = 850;
  private taskCompletionTimer?: ReturnType<typeof setTimeout>;

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
    return (this.definition?.tasks ?? [])
      .filter((task) => task.stageId === this.selectedStageId && this.taskVisible(task));
  }

  get mobileVisibleStages() {
    return this.visibleMobileItems(this.stages, this.selectedStageId, 3);
  }

  get mobileOverflowStages() {
    const visibleIds = new Set(this.mobileVisibleStages.map((stage) => stage.id));
    return this.stages.filter((stage) => !visibleIds.has(stage.id));
  }

  get mobileVisibleTasks() {
    return this.visibleMobileItems(this.stageTaskDefinitions, this.selectedTaskKey, 2);
  }

  get mobileOverflowTasks() {
    const visibleIds = new Set(this.mobileVisibleTasks.map((task) => task.id));
    return this.stageTaskDefinitions.filter((task) => !visibleIds.has(task.id));
  }

  get selectedTaskDefinition() {
    return this.definition?.tasks.find((task) => task.id === this.selectedTaskKey);
  }

  get selectedTaskDefinitionView() {
    const task = this.selectedTaskDefinition;
    return task ? [task] : [];
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

  get canEditProgrammeDetails() {
    const isCoordinator = this.programme?.initiatorUser?.id === this.currentUserId;
    return this.currentUserRole === 'admin' || this.currentUserRole === 'pdqa' || isCoordinator;
  }

  get workflowDisplayName() {
    return this.definition?.name || 'No development path assigned';
  }

  get canSwitchWorkflow() {
    return this.canManageWorkflow
      && this.completedTaskCount === 0
      && Boolean(this.detail?.process)
      && !this.workflowDefinitionsLoading;
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
    this.loading.set(true);

    this.apollo.query<{ programmeWorkflow: ProgrammeWorkflowDetail }>({
      query: GET_PROGRAMME_WORKFLOW,
      variables: { programmeId },
      fetchPolicy: 'network-only',
    }).subscribe({
      next: ({ data }) => {
        this.detail = data.programmeWorkflow;
        if (this.canManageWorkflow) this.loadWorkflowDefinitions();
        if (this.detail.definition) {
          this.applyDefinition(this.detail.definition);
        } else {
          this.definitionService.get().subscribe({
            next: (definition) => this.applyDefinition(definition),
          });
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.showMessage('Programme details could not be loaded.', 'error');
      },
    });
  }

  startWorkflow() {
    if (!this.programme || this.starting()) return;
    this.starting.set(true);
    this.apollo.mutate({
      mutation: START_PROCESS,
      variables: {
        programmeId: this.programme.id,
        actorId: this.auth.user?.id,
      },
    }).subscribe({
      next: () => {
        this.starting.set(false);
        this.showMessage('Programme development started.', 'success');
        this.loadProgramme();
      },
      error: (error) => {
        this.starting.set(false);
        this.showMessage(error?.message ?? 'Programme development could not be started.', 'error');
      },
    });
  }

  loadWorkflowDefinitions() {
    this.workflowDefinitionsLoading = true;
    this.definitionService.list().subscribe({
      next: (definitions) => {
        this.workflowDefinitions = definitions.filter((item) => item.status === 'active');
        this.selectedWorkflowSlug = this.resolveSelectedWorkflowSlug();
        this.workflowDefinitionsLoading = false;
      },
      error: () => {
        this.workflowDefinitions = [];
        this.selectedWorkflowSlug = this.resolveSelectedWorkflowSlug();
        this.workflowDefinitionsLoading = false;
      },
    });
  }

  switchWorkflow() {
    if (!this.programme || !this.canSwitchWorkflow || !this.selectedWorkflowSlug || this.switchingWorkflow()) return;
    this.switchingWorkflow.set(true);
    this.http.put(`programmes/${this.programme.id}/workflow`, {
      workflowSlug: this.selectedWorkflowSlug,
      actorId: this.currentUserId,
    }).subscribe({
      next: () => {
        this.switchingWorkflow.set(false);
        this.showMessage('Programme development path updated.', 'success');
        this.loadProgramme();
      },
      error: (error) => {
        this.switchingWorkflow.set(false);
        this.showMessage(error?.message ?? 'Programme development path could not be updated.', 'error');
      },
    });
  }

  openProgrammeEdit() {
    if (!this.programme) return;
    this.programmeEditForm.set({
      title: this.programme.title ?? '',
      code: this.programme.code ?? '',
      level: Number(this.programme.level) || 1,
    });
    this.programmeEditOpen.set(true);
  }

  closeProgrammeEdit() {
    if (this.updatingProgramme()) return;
    this.programmeEditOpen.set(false);
  }

  updateProgrammeField<K extends keyof ProgrammeEditForm>(field: K, value: ProgrammeEditForm[K]) {
    this.programmeEditForm.update((form) => ({ ...form, [field]: value }));
  }

  saveProgrammeDetails() {
    if (!this.programme || this.updatingProgramme()) return;
    const form = this.programmeEditForm();
    const title = form.title.trim();
    const code = form.code.trim();
    const level = Number(form.level);
    if (!title || !code || !Number.isInteger(level)) {
      this.showMessage('Programme title, code and NQF level are required.', 'error');
      return;
    }

    this.updatingProgramme.set(true);
    this.http.put(`programmes/${this.programme.id}`, {
      title,
      code,
      level,
      actorId: this.currentUserId,
    }).subscribe({
      next: (result) => {
        this.updatingProgramme.set(false);
        this.programmeEditOpen.set(false);
        if (this.detail && result?.programme) {
          this.detail = {
            ...this.detail,
            programme: {
              ...this.detail.programme,
              ...result.programme,
            },
          };
        }
        this.showMessage(result?.message ?? 'Programme details updated.', 'success');
      },
      error: (error) => {
        this.updatingProgramme.set(false);
        this.showMessage(error?.message ?? 'Programme details could not be updated.', 'error');
      },
    });
  }

  selectStage(stage: WorkflowStage) {
    this.selectedStageId = stage.id;
    const stageTasks = this.stageTaskDefinitions;
    const active = stageTasks.find((definition) =>
      this.detail?.tasks.some((instance) => instance.taskKey === definition.id && instance.status === 'active'));
    this.selectTask(active?.id ?? stageTasks[0]?.id ?? '');
  }

  selectStageById(stageId: string) {
    const stage = this.stages.find((candidate) => candidate.id === stageId);
    if (stage) this.selectStage(stage);
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
      if (field.type === 'user-search' && field.multiple && !Array.isArray(this.formData[field.key])) {
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
      query: GET_ACTIVE_TASKS,
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
      item[child.key] = (child.type === 'checkbox' && child.options?.length) || (child.type === 'user-search' && child.multiple) ? [] : '';
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

  visibleFields(fields: WorkflowField[] | undefined, target?: Record<string, any>) {
    return (fields ?? []).filter((field) => this.fieldVisible(field, target));
  }

  fieldVisible(field: WorkflowField, target?: Record<string, any>) {
    return this.conditionMatches(field.visibleWhen, target ?? this.formData, this.formData);
  }

  taskVisible(task: { id: string; visibleWhen?: WorkflowCondition }) {
    if (this.taskInstance(task.id)) return true;
    const context = this.processFormDataContext();
    return this.conditionMatches(task.visibleWhen, context, context);
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

  searchUsers(field: WorkflowField, event: Event, target?: Record<string, any>) {
    const query = (event.target as HTMLInputElement).value.trim();
    const key = this.fieldErrorKey(field, target);
    this.userSearchText[key] = query;
    if (query.length < 2) {
      this.userSearchResults[key] = [];
      return;
    }
    this.userSearchLoading[key] = true;
    this.http.getAll<WorkflowUserOption>(`users/search?q=${encodeURIComponent(query)}`).subscribe({
      next: (users) => {
        this.userSearchResults[key] = users;
        this.userSearchLoading[key] = false;
      },
      error: () => {
        this.userSearchResults[key] = [];
        this.userSearchLoading[key] = false;
      },
    });
  }

  selectUser(field: WorkflowField, user: WorkflowUserOption, target?: Record<string, any>) {
    const record = target ?? this.formData;
    const selected = {
      id: user.id,
      displayName: this.userLabel(user),
      email: user.email,
      role: user.role,
      departmentName: user.departmentName,
      facultyName: user.facultyName,
    };
    if (field.multiple) {
      const users = Array.isArray(record[field.key]) ? record[field.key] : [];
      if (!users.some((item: WorkflowUserOption) => item.id === selected.id)) {
        record[field.key] = [...users, selected];
      }
    } else {
      record[field.key] = selected;
    }
    const key = this.fieldErrorKey(field, target);
    this.userSearchText[key] = '';
    this.userSearchResults[key] = [];
  }

  clearSelectedUser(field: WorkflowField, target?: Record<string, any>) {
    (target ?? this.formData)[field.key] = field.multiple ? [] : '';
    const key = this.fieldErrorKey(field, target);
    this.userSearchText[key] = '';
    this.userSearchResults[key] = [];
  }

  removeSelectedUser(field: WorkflowField, userId: string, target?: Record<string, any>) {
    const record = target ?? this.formData;
    record[field.key] = Array.isArray(record[field.key])
      ? record[field.key].filter((user: WorkflowUserOption) => user.id !== userId)
      : '';
  }

  selectedUserLabel(field: WorkflowField, target?: Record<string, any>) {
    const value = (target ?? this.formData)[field.key];
    if (!value) return '';
    if (Array.isArray(value)) return value.map((user) => this.userLabel(user)).join(', ');
    if (typeof value === 'string') return value;
    return this.userLabel(value as WorkflowUserOption);
  }

  selectedUsers(field: WorkflowField, target?: Record<string, any>) {
    const value = (target ?? this.formData)[field.key];
    if (Array.isArray(value)) return value as WorkflowUserOption[];
    return value && typeof value === 'object' ? [value as WorkflowUserOption] : [];
  }

  userLabel(user: Partial<WorkflowUserOption>) {
    return user.displayName
      || [user.firstName, user.lastName].filter(Boolean).join(' ')
      || user.email
      || 'Selected user';
  }

  userFieldResults(field: WorkflowField, target?: Record<string, any>) {
    return this.userSearchResults[this.fieldErrorKey(field, target)] ?? [];
  }

  userFieldLoading(field: WorkflowField, target?: Record<string, any>) {
    return this.userSearchLoading[this.fieldErrorKey(field, target)] === true;
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
      return value.map((item) => {
        if (item && typeof item === 'object' && 'id' in item && ('displayName' in item || 'email' in item)) {
          const user = item as Partial<WorkflowUserOption>;
          return [this.userLabel(user), user.email, user.role].filter(Boolean).join(' · ');
        }
        return typeof item === 'object'
        ? Object.entries(item as Record<string, unknown>)
          .map(([key, entry]) => `${key}: ${this.displayValue(entry)}`).join(', ')
        : String(item);
      }).join('; ');
    }
    if (typeof value === 'object') {
      const user = value as Partial<WorkflowUserOption>;
      if (user.id && (user.displayName || user.email)) {
        return [this.userLabel(user), user.email, user.role].filter(Boolean).join(' · ');
      }
      return JSON.stringify(value, null, 2);
    }
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  }

  userDisplayCards(value: unknown): Partial<WorkflowUserOption>[] {
    if (!value) return [];
    const values = Array.isArray(value) ? value : [value];
    return values.filter((item): item is Partial<WorkflowUserOption> =>
      !!item && typeof item === 'object' && ('id' in item || 'displayName' in item || 'email' in item)
    );
  }

  canComposeEmail(field: WorkflowField) {
    return field.emailAction === true && (field.type === 'email' || field.type === 'user-search');
  }

  fieldEmailRecipients(field: WorkflowField, target?: Record<string, any>) {
    if (!this.canComposeEmail(field)) return [];
    const source = target ?? this.formData;
    return this.emailRecipientsFromValue(source[field.key], source);
  }

  repeaterEmailRecipients(group: WorkflowField, child: WorkflowField) {
    if (!this.canComposeEmail(child)) return [];
    return this.uniqueEmailRecipients(
      this.repeaterItems(group).flatMap((item) => this.emailRecipientsFromValue(item[child.key], item))
    );
  }

  openEmailComposer(title: string, recipients: EmailRecipient[], field?: WorkflowField) {
    const uniqueRecipients = this.uniqueEmailRecipients(recipients);
    if (!uniqueRecipients.length) {
      this.showMessage('No email address is available for this field.', 'error');
      return;
    }
    const subjectTemplate = field?.emailSubject || (this.programme?.title ? `Programme: ${this.programme.title}` : '');
    const bodyTemplate = field?.emailMessage || '';
    const previewRecipient = uniqueRecipients.length === 1 ? uniqueRecipients[0] : this.groupEmailRecipient(uniqueRecipients);
    this.emailComposer.set({
      open: true,
      title,
      recipients: uniqueRecipients,
      selectedEmails: uniqueRecipients.map((recipient) => recipient.email),
      subject: this.renderEmailTemplate(subjectTemplate, previewRecipient),
      body: this.renderEmailTemplate(bodyTemplate, previewRecipient),
      subjectTemplate,
      bodyTemplate,
    });
  }

  openUserEmailComposer(user: Partial<WorkflowUserOption>, field?: WorkflowField) {
    this.openEmailComposer(this.userLabel(user), this.emailRecipientsFromValue(user), field);
  }

  closeEmailComposer() {
    this.emailComposer.update((composer) => ({ ...composer, open: false }));
  }

  updateEmailSubject(subject: string) {
    this.emailComposer.update((composer) => ({ ...composer, subject, subjectTemplate: subject }));
  }

  updateEmailBody(body: string) {
    this.emailComposer.update((composer) => ({ ...composer, body, bodyTemplate: body }));
  }

  recipientSelected(email: string) {
    return this.emailComposer().selectedEmails.includes(email);
  }

  toggleEmailRecipient(email: string, selected: boolean) {
    this.emailComposer.update((composer) => {
      const selectedEmails = new Set(composer.selectedEmails);
      if (selected) selectedEmails.add(email);
      else selectedEmails.delete(email);
      return this.emailComposerWithRenderedTemplate({ ...composer, selectedEmails: [...selectedEmails] });
    });
  }

  selectAllEmailRecipients() {
    this.emailComposer.update((composer) => this.emailComposerWithRenderedTemplate({
      ...composer,
      selectedEmails: composer.recipients.map((recipient) => recipient.email),
    }));
  }

  clearEmailRecipients() {
    this.emailComposer.update((composer) => this.emailComposerWithRenderedTemplate({ ...composer, selectedEmails: [] }));
  }

  get selectedEmailRecipients() {
    const composer = this.emailComposer();
    return composer.recipients.filter((recipient) => composer.selectedEmails.includes(recipient.email));
  }

  sendGroupEmail() {
    const composer = this.emailComposer();
    const recipient = this.groupEmailRecipient(composer.recipients);
    this.openMailClient(
      composer.recipients,
      this.renderEmailTemplate(composer.subjectTemplate || composer.subject, recipient),
      this.renderEmailTemplate(composer.bodyTemplate || composer.body, recipient),
    );
  }

  sendSelectedEmail() {
    const composer = this.emailComposer();
    if (!this.selectedEmailRecipients.length) {
      this.showMessage('Select at least one recipient.', 'error');
      return;
    }
    const recipient = this.selectedEmailRecipients.length === 1
      ? this.selectedEmailRecipients[0]
      : this.groupEmailRecipient(this.selectedEmailRecipients);
    this.openMailClient(
      this.selectedEmailRecipients,
      this.renderEmailTemplate(composer.subjectTemplate || composer.subject, recipient),
      this.renderEmailTemplate(composer.bodyTemplate || composer.body, recipient),
    );
  }

  sendIndividualEmail(recipient: EmailRecipient) {
    const composer = this.emailComposer();
    this.openMailClient(
      [recipient],
      this.renderEmailTemplate(composer.subjectTemplate || composer.subject, recipient),
      this.renderEmailTemplate(composer.bodyTemplate || composer.body, recipient),
    );
  }

  completeTask() {
    const task = this.selectedTaskInstance;
    if (!task || !this.canCompleteSelectedTask || this.completing()) return;
    if (this.taskCompletionTimer) clearTimeout(this.taskCompletionTimer);
    this.completing.set(true);
    this.syncLatestProgrammeBeforeComplete(task.id);
  }

  reopenSelectedTask() {
    const task = this.selectedTaskInstance;
    if (!task || !this.canReopenSelectedTask || this.reopeningTask()) return;
    this.reopeningTask.set(true);
    this.http.post(`tasks/${task.id}/reopen`, {
      actor: {
        id: this.currentUserId,
        role: this.currentUserRole,
      },
    }).subscribe({
      next: () => {
        this.reopeningTask.set(false);
        this.showMessage('Task reopened for amendments.', 'success');
        this.loadProgramme();
      },
      error: (error) => {
        this.reopeningTask.set(false);
        this.showMessage(error?.message ?? 'Task could not be reopened.', 'error');
      },
    });
  }

  private syncLatestProgrammeBeforeComplete(taskId: string) {
    const programmeId = this.route.snapshot.paramMap.get('id');
    if (!programmeId) {
      this.completing.set(false);
      return;
    }

    this.apollo.query<{ programmeWorkflow: ProgrammeWorkflowDetail }>({
      query: GET_PROGRAMME_WORKFLOW,
      variables: { programmeId },
      fetchPolicy: 'network-only',
    }).subscribe({
      next: ({ data }) => {
        this.detail = data.programmeWorkflow;
        this.refreshArtifactAttachmentMap();
        this.submitCompletedTask(taskId);
      },
      error: () => {
        this.completing.set(false);
        this.showMessage('Programme attachments could not be checked. Please try again.', 'error');
      },
    });
  }

  private submitCompletedTask(taskId: string) {
    this.clearHiddenFieldErrors(this.selectedTaskDefinition?.form ?? [], this.formData);
    if (Object.keys(this.formErrors).length) {
      this.completing.set(false);
      this.showMessage('Fix the file selection before completing this task.', 'error');
      return;
    }
    this.refreshArtifactAttachmentMap();
    const missingArtifact = this.artifacts.find((artifact) =>
      artifact.required && !(this.artifactAttachmentMap[artifact.type]?.length));
    if (missingArtifact) {
      this.completing.set(false);
      this.showMessage(`${missingArtifact.title} is required.`, 'error');
      return;
    }
    const exceededArtifact = this.artifacts.find((artifact) =>
      this.artifactUploadLimit(artifact) != null && this.artifactUploadCount(artifact) > this.artifactUploadLimit(artifact)!);
    if (exceededArtifact) {
      this.completing.set(false);
      this.showMessage(`${exceededArtifact.title} allows at most ${this.artifactUploadLimit(exceededArtifact)} file(s).`, 'error');
      return;
    }

    const user = this.auth.user;
    const actor = {
      ...(user?.id ? { id: user.id } : {}),
      role: this.currentUserRole,
    };
    this.apollo.mutate({
      mutation: COMPLETE_TASK,
      variables: {
        taskId,
        input: {
          event: 'submit',
          actor,
          formData: this.visibleFormData(this.selectedTaskDefinition?.form ?? [], this.formData),
          artifacts: [],
        },
      },
    }).subscribe({
      next: () => {
        this.completing.set(false);
        this.showMessage('Task completed and the next step opened.', 'success');
        this.taskCompletionTimer = setTimeout(() => {
          this.loadProgramme();
          this.taskCompletionTimer = undefined;
        }, this.taskCompletionTransitionMs);
      },
      error: (error) => {
        this.completing.set(false);
        this.showMessage(error?.message ?? 'Task could not be completed.', 'error');
      },
    });
  }

  private applyDefinition(definition: WorkflowDefinition) {
    this.definition = definition;
    this.selectedWorkflowSlug = this.resolveSelectedWorkflowSlug();
    const activeTask = this.detail?.tasks.find((task) => task.status === 'active');
    const preferredStage = activeTask?.stageKey
      ?? this.detail?.process?.currentStageKey
      ?? definition.stages?.[0]?.id
      ?? '';
    const stage = definition.stages.find((candidate) => candidate.id === preferredStage);
    if (stage) this.selectStage(stage);
    this.loadInbox();
  }

  private resolveSelectedWorkflowSlug() {
    const current = this.detail?.definition;
    if (!current) return this.selectedWorkflowSlug;
    const matched = this.workflowDefinitions.find((definition) =>
      definition.slug === current.slug
      || definition.slug === current.id
      || definition.id === current.definitionId
      || definition.id === current.id);
    return matched?.slug ?? current.slug ?? current.id ?? this.selectedWorkflowSlug;
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

  private emailRecipientsFromValue(value: unknown, context?: Record<string, any>): EmailRecipient[] {
    if (!value) return [];
    if (Array.isArray(value)) {
      return this.uniqueEmailRecipients(value.flatMap((item) => this.emailRecipientsFromValue(item, context)));
    }
    if (typeof value === 'string') {
      const name = this.recipientNameFromRecord(context);
      return value
        .split(/[;,]/)
        .map((email) => email.trim())
        .filter((email) => this.looksLikeEmail(email))
        .map((email) => ({ email, name }));
    }
    if (typeof value === 'object') {
      const user = value as Partial<WorkflowUserOption>;
      if (!user.email || !this.looksLikeEmail(user.email)) return [];
      return [{
        id: user.id,
        email: user.email,
        name: this.userLabel(user),
        role: user.role,
        departmentName: user.departmentName,
        facultyName: user.facultyName,
      }];
    }
    return [];
  }

  private uniqueEmailRecipients(recipients: EmailRecipient[]) {
    const seen = new Set<string>();
    return recipients.filter((recipient) => {
      const email = recipient.email.trim().toLowerCase();
      if (!email || seen.has(email)) return false;
      seen.add(email);
      recipient.email = email;
      return true;
    });
  }

  private looksLikeEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  private recipientNameFromRecord(record?: Record<string, any>) {
    if (!record) return '';
    return String(
      record['displayName']
      || record['name']
      || [record['firstName'], record['lastName']].filter(Boolean).join(' ')
      || [record['firstName'], record['surname']].filter(Boolean).join(' ')
      || [record['first_name'], record['last_name']].filter(Boolean).join(' ')
      || ''
    ).trim();
  }

  private emailComposerWithRenderedTemplate(composer: EmailComposerState): EmailComposerState {
    const recipients = composer.recipients.filter((recipient) => composer.selectedEmails.includes(recipient.email));
    const previewRecipient = recipients.length === 1 ? recipients[0] : this.groupEmailRecipient(recipients);
    return {
      ...composer,
      subject: this.renderEmailTemplate(composer.subjectTemplate, previewRecipient),
      body: this.renderEmailTemplate(composer.bodyTemplate, previewRecipient),
    };
  }

  private groupEmailRecipient(recipients: EmailRecipient[]): EmailRecipient {
    return {
      email: '',
      name: recipients.length ? 'PAC member' : '',
      role: recipients.length > 1 ? 'group' : recipients[0]?.role,
    };
  }

  private renderEmailTemplate(template: string, recipient?: EmailRecipient) {
    const values: Record<string, string> = {
      programmeTitle: this.programme?.title ?? '',
      programmeCode: this.programme?.code ?? '',
      initiator: this.initiatorName,
      recipientName: recipient?.name ?? '',
      recipientEmail: recipient?.email ?? '',
      recipientRole: recipient?.role ?? '',
      departmentName: recipient?.departmentName ?? this.programme?.department ?? '',
      facultyName: recipient?.facultyName ?? this.programme?.faculty ?? '',
    };
    return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => values[key] ?? '');
  }

  private openMailClient(recipients: EmailRecipient[], subject: string, body: string) {
    if (this.sendingEmail()) return;
    this.sendingEmail.set(true);
    this.http.post('communications/send', {
      programmeId: this.programme?.id,
      senderId: this.currentUserId,
      scope: this.programme?.id ? 'programme' : 'system',
      subject,
      body,
      sendEmail: true,
      recipients: recipients.map((recipient) => ({
        id: recipient.id,
        email: recipient.email,
        name: recipient.name,
      })),
    }).subscribe({
      next: (result) => {
        this.sendingEmail.set(false);
        const email = result?.email;
        if (email?.failed) {
          this.showMessage(`Message saved, but ${email.failed} email${email.failed === 1 ? '' : 's'} could not be sent.`, 'error');
          return;
        }
        if (email?.skipped) {
          this.showMessage('Message saved. Email sending is not configured on the server yet.', 'success');
          this.closeEmailComposer();
          return;
        }
        this.showMessage('Message sent successfully.', 'success');
        this.closeEmailComposer();
      },
      error: (error) => {
        this.sendingEmail.set(false);
        this.showMessage(error?.message ?? 'Message could not be sent.', 'error');
      },
    });
  }

  private visibleMobileItems<T extends { id: string }>(items: T[], selectedId: string, limit: number) {
    if (items.length <= limit) return items;
    const visible = items.slice(0, limit);
    if (!selectedId || visible.some((item) => item.id === selectedId)) return visible;
    const selected = items.find((item) => item.id === selectedId);
    return selected ? [...visible.slice(0, Math.max(1, limit - 1)), selected] : visible;
  }

  private visibleFormData(fields: WorkflowField[], values: Record<string, any>, rootValues = this.formData) {
    const cleaned: Record<string, any> = {};
    for (const field of fields) {
      if (!this.conditionMatches(field.visibleWhen, values, rootValues)) continue;
      const value = values[field.key];
      if (field.type === 'repeater' && Array.isArray(value)) {
        cleaned[field.key] = value.map((item) =>
          this.visibleFormData(field.fields ?? [], item as Record<string, any>, rootValues));
      } else {
        cleaned[field.key] = value;
      }
    }
    return cleaned;
  }

  private processFormDataContext() {
    const context: Record<string, any> = {};
    for (const task of this.detail?.tasks ?? []) {
      if (task.formData && typeof task.formData === 'object' && !Array.isArray(task.formData)) {
        Object.assign(context, task.formData);
      }
    }
    return { ...context, ...this.formData };
  }

  private clearHiddenFieldErrors(fields: WorkflowField[], values: Record<string, any>, rootValues = this.formData) {
    for (const field of fields) {
      if (!this.conditionMatches(field.visibleWhen, values, rootValues)) {
        delete this.formErrors[this.fieldErrorKey(field, values === this.formData ? undefined : values)];
        continue;
      }
      const value = values[field.key];
      if (field.type === 'repeater' && Array.isArray(value)) {
        value.forEach((item) =>
          this.clearHiddenFieldErrors(field.fields ?? [], item as Record<string, any>, rootValues));
      }
    }
  }

  private conditionMatches(condition: WorkflowCondition | undefined, values: Record<string, any>, rootValues: Record<string, any>) {
    if (!condition) return true;
    const value = Object.hasOwn(values, condition.field) ? values[condition.field] : rootValues[condition.field];
    if (Object.hasOwn(condition, 'equals')) return this.sameConditionValue(value, condition.equals);
    if (Object.hasOwn(condition, 'notEquals')) return !this.sameConditionValue(value, condition.notEquals);
    if (Array.isArray(condition.in)) {
      const selected = Array.isArray(value) ? value : [value];
      return selected.some((item) => condition.in?.some((option) => this.sameConditionValue(item, option)));
    }
    return false;
  }

  private sameConditionValue(left: unknown, right: unknown) {
    if (Array.isArray(left)) return left.some((item) => String(item) === String(right));
    return String(left) === String(right);
  }

  fieldErrorKey(field: WorkflowField, target?: Record<string, any>) {
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
