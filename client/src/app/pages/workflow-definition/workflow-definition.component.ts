import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { WorkflowDefinitionService } from '../../services/workflow-definition.service';
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import {
  WorkflowDefinition,
  WorkflowDefinitionSummary,
  WorkflowField,
  WorkflowFieldType,
  WorkflowStage,
  WorkflowTask,
  WorkflowTransition,
} from '../../types/workflow-definition';

@Component({
  selector: 'client-workflow-definition',
  imports: [CommonModule, FormsModule],
  templateUrl: './workflow-definition.component.html',
  styleUrl: './workflow-definition.component.css',
})
export class WorkflowDefinitionComponent implements OnInit {
  private readonly workflowService = inject(WorkflowDefinitionService);
  private readonly viewContainer = inject(ViewContainerRef);

  definitions: WorkflowDefinitionSummary[] = [];
  definition = this.emptyDefinition();
  selectedTaskId = '';
  selectedStageId = '';
  editorVisible = true;
  movedTaskId = '';
  jsonText = '';
  jsonError = '';
  message = '';
  messageType: 'success' | 'error' = 'success';
  mode: 'builder' | 'json' = 'builder';
  loading = signal(true);
  publishing = signal(false);
  deleting = signal(false);
  readonly fieldTypes: Array<{ value: WorkflowFieldType; label: string }> = [
    { value: 'text', label: 'Text' },
    { value: 'textarea', label: 'Long text' },
    { value: 'date', label: 'Date' },
    { value: 'file', label: 'File' },
    { value: 'select', label: 'Select' },
    { value: 'radio', label: 'Radio group' },
    { value: 'number', label: 'Number' },
    { value: 'email', label: 'Email' },
    { value: 'tel', label: 'Telephone' },
    { value: 'url', label: 'URL' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'repeater', label: 'Repeatable group' },
    { value: 'user-search', label: 'User search' },
  ];
  readonly childFieldTypes = this.fieldTypes.filter((field) => field.value !== 'repeater');

  ngOnInit() {
    this.loadDefinitions();
  }

  get selectedTask() {
    return this.definition.tasks.find((task) => task.id === this.selectedTaskId);
  }

  get selectedStage() {
    return this.definition.stages.find((stage) => stage.id === this.selectedStageId);
  }

  get taskOptions() {
    return this.definition.tasks.map((task) => ({ id: task.id, name: task.name }));
  }

  get selectedDefinitionSummary() {
    return this.definitions.find((item) =>
      item.slug === this.definition.slug || item.id === this.definition.id || item.slug === this.definition.id);
  }

  selectedDefinitionSlug() {
    return this.selectedDefinitionSummary?.slug ?? this.definition.slug ?? this.definition.id;
  }

  get canDeleteDefinition() {
    return !!this.selectedDefinitionSummary && !this.loading() && !this.publishing() && !this.deleting();
  }

  loadDefinitions(slug?: string) {
    this.loading.set(true);
    this.workflowService.list().subscribe({
      next: (definitions) => {
        this.definitions = definitions;
        this.loadDefinition(slug);
      },
      error: () => {
        this.loading.set(false);
        this.showMessage('Could not load workflow definitions.', 'error');
      },
    });
  }

  loadDefinition(slug?: string) {
    this.loading.set(true);
    this.workflowService.get(slug).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (definition) => this.setDefinition(definition),
      error: () => this.showMessage('Could not load this workflow definition.', 'error'),
    });
  }

  createWorkflow() {
    this.setDefinition(this.emptyDefinition());
    this.mode = 'builder';
    this.showMessage('New workflow draft created.', 'success');
  }

  setMode(mode: 'builder' | 'json') {
    if (mode === 'json') this.syncJson();
    this.mode = mode;
  }

  builderChanged() {
    this.normalizeDefinition();
    this.syncJson();
  }

  applyJson() {
    try {
      const parsed = JSON.parse(this.jsonText) as WorkflowDefinition;
      if (!parsed.id || !parsed.name || !parsed.initialTask || !Array.isArray(parsed.tasks)) {
        throw new Error('Definition requires id, name, initialTask, and tasks.');
      }
      this.setDefinition(parsed);
      this.jsonError = '';
      this.mode = 'builder';
      this.showMessage('JSON applied to the builder.', 'success');
    } catch (error) {
      this.jsonError = error instanceof Error ? error.message : 'Invalid JSON.';
    }
  }

  publish() {
    this.builderChanged();
    try {
      const definition = JSON.parse(this.jsonText) as WorkflowDefinition;
      this.publishing.set(true);
      this.workflowService.publish(definition)
        .pipe(finalize(() => this.publishing.set(false)))
        .subscribe({
          next: (saved) => {
            this.setDefinition(saved);
            this.showMessage(`Version ${saved.version} published.`, 'success');
            this.loadDefinitions(saved.id);
          },
          error: (error) => this.showMessage(error?.error?.error ?? 'Workflow could not be published.', 'error'),
        });
    } catch {
      this.showMessage('Fix the JSON before publishing.', 'error');
    }
  }

  deleteWorkflow() {
    const selected = this.selectedDefinitionSummary;
    if (!selected || this.deleting()) return;
    const componentRef = this.viewContainer.createComponent(ConfirmModalComponent);
    componentRef.instance.action = 'delete';
    componentRef.instance.message = `Delete "${selected.name}"? This cannot be undone.`;
    componentRef.instance.onClose.subscribe(() => {
      if (!componentRef.hostView.destroyed) componentRef.destroy();
    });
    componentRef.instance.onConfirm.subscribe((res) => {
      if (res !== 'confirmed') return;
      this.deleting.set(true);
      this.workflowService.delete(selected.slug)
        .pipe(finalize(() => this.deleting.set(false)))
        .subscribe({
          next: (result) => {
            this.showMessage(result.message || 'Workflow definition deleted.', 'success');
            const nextDefinition = this.definitions.find((item) => item.slug !== selected.slug);
            this.loadDefinitions(nextDefinition?.slug);
          },
          error: (error) => this.showMessage(error?.error?.error ?? 'Workflow definition could not be deleted.', 'error'),
        });
    });
  }

  addRole() {
    const index = this.definition.roles.length + 1;
    this.definition.roles.push({ id: `role-${index}`, name: `Role ${index}` });
    this.builderChanged();
  }

  removeRole(index: number) {
    const role = this.definition.roles[index];
    this.definition.roles.splice(index, 1);
    this.definition.tasks.forEach((task) => {
      task.ownerRoles = task.ownerRoles.filter((id) => id !== role.id);
    });
    this.builderChanged();
  }

  renameRole(index: number, id: string) {
    const role = this.definition.roles[index];
    const previousId = role.id;
    role.id = id;
    this.definition.tasks.forEach((task) => {
      task.ownerRoles = task.ownerRoles.map((ownerRole) => ownerRole === previousId ? id : ownerRole);
    });
    this.builderChanged();
  }

  addStage() {
    const index = this.definition.stages.length + 1;
    const stage: WorkflowStage = { id: `stage-${index}`, name: `Stage ${index}`, description: '', order: index };
    this.definition.stages.push(stage);
    this.showStageEditor(stage.id);
    this.builderChanged();
  }

  removeStage(index: number) {
    const stage = this.definition.stages[index];
    if (this.definition.tasks.some((task) => task.stageId === stage.id)) {
      this.showMessage('Move or remove this stage’s tasks first.', 'error');
      return;
    }
    this.definition.stages.splice(index, 1);
    this.definition.stages.forEach((item, itemIndex) => item.order = itemIndex + 1);
    if (this.selectedStageId === stage.id) {
      this.selectedStageId = this.definition.stages[0]?.id ?? '';
    }
    this.builderChanged();
  }

  renameStage(stage: WorkflowStage, id: string) {
    const previousId = stage.id;
    stage.id = id;
    this.definition.tasks.forEach((task) => {
      if (task.stageId === previousId) task.stageId = id;
    });
    this.builderChanged();
  }

  moveStage(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= this.definition.stages.length) return;
    const [stage] = this.definition.stages.splice(index, 1);
    this.definition.stages.splice(targetIndex, 0, stage);
    this.definition.stages.forEach((item, itemIndex) => item.order = itemIndex + 1);
    this.builderChanged();
  }

  stageTasks(stageId: string) {
    return this.definition.tasks.filter((task) => task.stageId === stageId);
  }

  addTask(stageId = this.selectedStageId || this.definition.stages[0]?.id || '') {
    const index = this.definition.tasks.length + 1;
    const task: WorkflowTask = {
      id: `task-${index}`,
      name: `Task ${index}`,
      description: '',
      stageId,
      ownerRoles: this.definition.roles[0]?.id ? [this.definition.roles[0].id] : [],
      form: [],
      artifacts: [],
      transitions: [{ event: 'submit', label: 'Continue', to: 'END', outcome: 'completed' }],
    };
    this.definition.tasks.push(task);
    this.showTaskEditor(task.id);
    if (!this.definition.initialTask) this.definition.initialTask = task.id;
    this.builderChanged();
  }

  removeTask(taskId: string) {
    this.definition.tasks = this.definition.tasks.filter((task) => task.id !== taskId);
    this.definition.tasks.forEach((task) => {
      task.transitions = task.transitions.filter((transition) => transition.to !== taskId);
    });
    if (this.definition.initialTask === taskId) {
      this.definition.initialTask = this.definition.tasks[0]?.id ?? '';
    }
    this.selectedTaskId = this.definition.tasks[0]?.id ?? '';
    this.builderChanged();
  }

  canMoveTask(task: WorkflowTask, direction: -1 | 1) {
    const tasks = this.stageTasks(task.stageId);
    const index = tasks.findIndex((item) => item.id === task.id);
    const targetIndex = index + direction;
    return index >= 0 && targetIndex >= 0 && targetIndex < tasks.length;
  }

  moveTask(taskId: string, direction: -1 | 1) {
    const task = this.definition.tasks.find((item) => item.id === taskId);
    if (!task || !this.canMoveTask(task, direction)) return;

    const reorderedStageTasks = this.stageTasks(task.stageId);
    const currentIndex = reorderedStageTasks.findIndex((item) => item.id === taskId);
    const targetIndex = currentIndex + direction;
    const [movedTask] = reorderedStageTasks.splice(currentIndex, 1);
    reorderedStageTasks.splice(targetIndex, 0, movedTask);

    let nextStageTaskIndex = 0;
    this.definition.tasks = this.definition.tasks.map((item) =>
      item.stageId === task.stageId ? reorderedStageTasks[nextStageTaskIndex++] : item
    );
    this.selectedTaskId = taskId;
    this.flashMovedTask(taskId);
    this.builderChanged();
  }

  renameTask(task: WorkflowTask, id: string) {
    const previousId = task.id;
    task.id = id;
    this.definition.tasks.forEach((item) => {
      item.transitions.forEach((transition) => {
        if (Array.isArray(transition.to)) {
          transition.to = transition.to.map((target) => target === previousId ? id : target);
        } else if (transition.to === previousId) {
          transition.to = id;
        }
      });
    });
    if (this.definition.initialTask === previousId) this.definition.initialTask = id;
    if (this.selectedTaskId === previousId) this.selectedTaskId = id;
    this.builderChanged();
  }

  selectTask(taskId: string) {
    if (this.selectedTaskId === taskId && this.editorVisible) return;
    this.showTaskEditor(taskId);
  }

  selectStage(stageId: string) {
    if (this.selectedStageId === stageId && !this.selectedTaskId && this.editorVisible) return;
    this.showStageEditor(stageId);
  }

  ownsRole(task: WorkflowTask, roleId: string) {
    return task.ownerRoles?.includes(roleId) ?? false;
  }

  ownerRoleSummary(task: WorkflowTask) {
    const selectedRoles = this.definition.roles.filter((role) => task.ownerRoles?.includes(role.id));
    if (selectedRoles.length === 0) return 'Select owner roles';
    if (selectedRoles.length === 1) return selectedRoles[0].name;
    return `${selectedRoles.length} roles selected`;
  }

  toggleOwnerRole(task: WorkflowTask, roleId: string, enabled: boolean) {
    const roles = new Set(task.ownerRoles ?? []);
    if (enabled) roles.add(roleId);
    else roles.delete(roleId);
    task.ownerRoles = [...roles];
    this.builderChanged();
  }

  addField(type: WorkflowFieldType = 'text') {
    const task = this.selectedTask;
    if (!task) return;
    const index = (task.form?.length ?? 0) + 1;
    task.form ??= [];
    task.form.push({
      key: `field-${index}`,
      label: `Field ${index}`,
      type,
      required: false,
    });
    this.setFieldType(task.form[task.form.length - 1], type);
    this.builderChanged();
  }

  removeField(index: number) {
    this.selectedTask?.form?.splice(index, 1);
    this.builderChanged();
  }

  setFieldType(field: WorkflowField, type: WorkflowFieldType) {
    field.type = type;
    if (type === 'select' || type === 'radio') {
      field.options ??= ['Option 1', 'Option 2'];
      delete field.acceptedFileTypes;
      delete field.maxFileSizeMb;
    } else if (type === 'checkbox') {
      field.options ??= [];
      delete field.acceptedFileTypes;
      delete field.maxFileSizeMb;
    } else if (type === 'file') {
      delete field.options;
      delete field.fields;
      delete field.minItems;
      delete field.maxItems;
      delete field.emailAction;
      delete field.emailSubject;
      delete field.emailMessage;
      field.acceptedFileTypes ??= ['.pdf', '.doc', '.docx'];
      field.maxFileSizeMb ??= 20;
    } else if (type === 'user-search') {
      delete field.options;
      delete field.fields;
      delete field.minItems;
      delete field.maxItems;
      delete field.acceptedFileTypes;
      delete field.maxFileSizeMb;
      field.multiple ??= false;
    } else if (type === 'repeater') {
      delete field.options;
      delete field.acceptedFileTypes;
      delete field.maxFileSizeMb;
      delete field.multiple;
      delete field.emailAction;
      delete field.emailSubject;
      delete field.emailMessage;
      field.fields ??= [
        { key: 'organisation', label: 'Organisation', type: 'text', required: true },
        { key: 'firstName', label: 'First Name', type: 'text', required: true },
        { key: 'lastName', label: 'Last Name', type: 'text', required: true },
        { key: 'email', label: 'Email', type: 'email', required: true },
        { key: 'cell', label: 'Cell Number', type: 'tel', required: false },
      ];
      field.minItems ??= 1;
    } else {
      delete field.options;
      delete field.fields;
      delete field.minItems;
      delete field.maxItems;
      delete field.acceptedFileTypes;
      delete field.maxFileSizeMb;
      delete field.multiple;
      if (type !== 'email') {
        delete field.emailAction;
        delete field.emailSubject;
        delete field.emailMessage;
      }
    }
    this.builderChanged();
  }

  canConfigureEmailAction(field: WorkflowField) {
    return field.type === 'email' || field.type === 'user-search';
  }

  setUserSearchMode(field: WorkflowField, multiple: boolean) {
    field.multiple = multiple;
    this.builderChanged();
  }

  fieldOptions(field: WorkflowField) {
    return field.options?.join(', ') ?? '';
  }

  setFieldOptions(field: WorkflowField, value: string) {
    field.options = value.split(',').map((option) => option.trim()).filter(Boolean);
    this.builderChanged();
  }

  conditionFieldOptions(currentField: WorkflowField, localFields?: WorkflowField[], parentFields?: WorkflowField[]) {
    const options = [...(parentFields ?? []), ...(localFields ?? [])]
      .filter((field) => field !== currentField && field.key && field.type !== 'repeater');
    return options.filter((field, index) => options.findIndex((item) => item.key === field.key) === index);
  }

  conditionFieldGroups(currentField: WorkflowField, localFields?: WorkflowField[], parentFields?: WorkflowField[]) {
    const fields = this.conditionFieldOptions(currentField, localFields, parentFields);
    return fields.length
      ? [{ taskId: this.selectedTask?.id ?? 'current-task', taskName: this.selectedTask?.name ?? 'Current task', fields }]
      : [];
  }

  workflowConditionFieldOptions() {
    return this.workflowConditionFieldGroups().flatMap((group) => group.fields);
  }

  workflowConditionFieldGroups() {
    return this.definition.tasks
      .map((task) => ({
        taskId: task.id,
        taskName: task.name,
        fields: this.flattenFields(task.form ?? [])
          .filter((field) => field.type !== 'repeater' && field.key),
      }))
      .filter((group) => group.fields.length);
  }

  toggleTaskVisibilityRule(task: WorkflowTask, enabled: boolean) {
    if (!enabled) {
      delete task.visibleWhen;
      this.builderChanged();
      return;
    }
    const firstOption = this.workflowConditionFieldOptions()[0];
    task.visibleWhen = {
      field: firstOption?.key ?? '',
      equals: this.defaultConditionValue(firstOption),
    };
    this.builderChanged();
  }

  setTaskVisibilityField(task: WorkflowTask, controllingKey: string) {
    const controllingField = this.findDefinitionField(controllingKey);
    task.visibleWhen = {
      field: controllingKey,
      equals: this.defaultConditionValue(controllingField),
    };
    this.builderChanged();
  }

  setTaskVisibilityValue(task: WorkflowTask, value: string) {
    task.visibleWhen ??= { field: '', equals: '' };
    task.visibleWhen.equals = value;
    delete task.visibleWhen.notEquals;
    delete task.visibleWhen.in;
    this.builderChanged();
  }

  taskVisibilityValueOptions(task: WorkflowTask) {
    const controllingField = task.visibleWhen?.field ? this.findDefinitionField(task.visibleWhen.field) : undefined;
    if (controllingField?.options?.length) return controllingField.options;
    if (controllingField?.type === 'checkbox') return ['true', 'false'];
    return [];
  }

  toggleFieldVisibilityRule(field: WorkflowField, enabled: boolean, localFields?: WorkflowField[], parentFields?: WorkflowField[]) {
    if (!enabled) {
      delete field.visibleWhen;
      this.builderChanged();
      return;
    }
    const firstOption = this.conditionFieldOptions(field, localFields, parentFields)[0];
    field.visibleWhen = {
      field: firstOption?.key ?? '',
      equals: this.defaultConditionValue(firstOption),
    };
    this.builderChanged();
  }

  setVisibilityField(field: WorkflowField, controllingKey: string) {
    const controllingField = this.findDefinitionField(controllingKey);
    field.visibleWhen = {
      field: controllingKey,
      equals: this.defaultConditionValue(controllingField),
    };
    this.builderChanged();
  }

  setVisibilityValue(field: WorkflowField, value: string) {
    field.visibleWhen ??= { field: '', equals: '' };
    field.visibleWhen.equals = value;
    delete field.visibleWhen.notEquals;
    delete field.visibleWhen.in;
    this.builderChanged();
  }

  visibilityValueOptions(field: WorkflowField) {
    const controllingField = field.visibleWhen?.field ? this.findDefinitionField(field.visibleWhen.field) : undefined;
    if (controllingField?.options?.length) return controllingField.options;
    if (controllingField?.type === 'checkbox') return ['true', 'false'];
    return [];
  }

  private defaultConditionValue(field?: WorkflowField) {
    if (field?.options?.length) return field.options[0];
    if (field?.type === 'checkbox') return 'true';
    return '';
  }

  private findDefinitionField(key: string) {
    for (const field of this.definition.tasks.flatMap((task) => task.form ?? [])) {
      if (field.key === key) return field;
      const child = field.fields?.find((item) => item.key === key);
      if (child) return child;
    }
    return undefined;
  }

  private flattenFields(fields: WorkflowField[]): WorkflowField[] {
    return fields.flatMap((field) => field.type === 'repeater'
      ? [field, ...(field.fields ?? [])]
      : [field]);
  }

  fieldAcceptedTypes(field: WorkflowField) {
    return field.acceptedFileTypes?.join(', ') ?? '';
  }

  setFieldAcceptedTypes(field: WorkflowField, value: string) {
    field.acceptedFileTypes = value.split(',').map((type) => type.trim()).filter(Boolean);
    this.builderChanged();
  }

  addChildField(group: WorkflowField) {
    group.fields ??= [];
    const index = group.fields.length + 1;
    group.fields.push({
      key: `detail-${index}`,
      label: `Detail ${index}`,
      type: 'text',
      required: false,
    });
    this.builderChanged();
  }

  removeChildField(group: WorkflowField, index: number) {
    group.fields?.splice(index, 1);
    this.builderChanged();
  }

  addArtifact() {
    const task = this.selectedTask;
    if (!task) return;
    task.artifacts ??= [];
    const index = task.artifacts.length + 1;
    task.artifacts.push({
      key: `document-${index}`,
      label: `Document ${index}`,
      required: true,
      multiple: false,
      maxFiles: 1,
      maxFileSizeMb: 20,
    });
    this.builderChanged();
  }

  removeArtifact(index: number) {
    this.selectedTask?.artifacts?.splice(index, 1);
    this.builderChanged();
  }

  setArtifactMode(index: number, multiple: boolean) {
    const artifact = this.selectedTask?.artifacts?.[index];
    if (!artifact) return;
    artifact.multiple = multiple;
    if (multiple) {
      if (artifact.maxFiles === 1) delete artifact.maxFiles;
    } else {
      artifact.maxFiles = 1;
    }
    this.builderChanged();
  }

  updateArtifactMaxFiles(index: number) {
    const artifact = this.selectedTask?.artifacts?.[index];
    if (!artifact) return;
    if (artifact.multiple && (artifact.maxFiles == null || Number(artifact.maxFiles) <= 0)) {
      delete artifact.maxFiles;
      this.builderChanged();
      return;
    }
    const minimum = 1;
    artifact.maxFiles = Math.max(Number(artifact.maxFiles) || minimum, minimum);
    if (!artifact.multiple) artifact.maxFiles = 1;
    this.builderChanged();
  }

  updateArtifactMaxFileSize(index: number) {
    const artifact = this.selectedTask?.artifacts?.[index];
    if (!artifact) return;
    artifact.maxFileSizeMb = Math.max(Number(artifact.maxFileSizeMb) || 1, 1);
    this.builderChanged();
  }

  addTransition() {
    this.selectedTask?.transitions.push({
      event: 'submit',
      label: 'Continue',
      to: 'END',
      outcome: 'completed',
    });
    this.builderChanged();
  }

  removeTransition(index: number) {
    this.selectedTask?.transitions.splice(index, 1);
    this.builderChanged();
  }

  notifiesRole(transition: WorkflowTransition, roleId: string) {
    return transition.notifyRoles?.includes(roleId) ?? false;
  }

  toggleNotificationRole(transition: WorkflowTransition, roleId: string, enabled: boolean) {
    const roles = new Set(transition.notifyRoles ?? []);
    if (enabled) roles.add(roleId);
    else roles.delete(roleId);
    transition.notifyRoles = [...roles];
    this.builderChanged();
  }

  transitionTarget(transition: WorkflowTransition) {
    return Array.isArray(transition.to) ? transition.to[0] ?? 'END' : transition.to;
  }

  setTransitionTarget(transition: WorkflowTransition, target: string) {
    transition.to = target;
    if (target !== 'END') delete transition.outcome;
    if (target === 'END' && !transition.outcome) transition.outcome = 'completed';
    this.builderChanged();
  }

  trackById(_: number, item: { id: string }) {
    return item.id;
  }

  private setDefinition(definition: WorkflowDefinition) {
    this.definition = structuredClone(definition);
    this.normalizeDefinition();
    this.selectedTaskId = this.definition.tasks[0]?.id ?? '';
    this.selectedStageId = this.selectedTask?.stageId ?? this.definition.stages[0]?.id ?? '';
    this.syncJson();
  }

  private normalizeDefinition() {
    this.definition.roles ??= [];
    this.definition.stages ??= [];
    this.definition.tasks ??= [];
    this.definition.description ??= '';
    this.definition.stages.forEach((stage) => stage.description ??= '');
    this.definition.tasks.forEach((task) => {
      task.description ??= '';
      task.ownerRoles ??= [];
      task.transitions ??= [];
      task.form ??= [];
      task.artifacts ??= [];
      task.artifacts.forEach((artifact) => {
        artifact.maxFileSizeMb ??= 20;
        if (!artifact.multiple) artifact.maxFiles ??= 1;
      });
    });
  }

  private syncJson() {
    this.jsonText = JSON.stringify(this.definition, null, 2);
    this.jsonError = '';
  }

  private showTaskEditor(taskId: string) {
    const task = this.definition.tasks.find((item) => item.id === taskId);
    this.selectedTaskId = taskId;
    this.selectedStageId = task?.stageId ?? this.selectedStageId;
    this.replayEditorAnimation();
  }

  private showStageEditor(stageId: string) {
    this.selectedStageId = stageId;
    this.selectedTaskId = '';
    this.replayEditorAnimation();
  }

  private replayEditorAnimation() {
    this.editorVisible = false;
    requestAnimationFrame(() => {
      this.editorVisible = true;
    });
  }

  private flashMovedTask(taskId: string) {
    this.movedTaskId = '';
    requestAnimationFrame(() => {
      this.movedTaskId = taskId;
      window.setTimeout(() => {
        if (this.movedTaskId === taskId) this.movedTaskId = '';
      }, 650);
    });
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
  }

  private emptyDefinition(): WorkflowDefinition {
    return {
      id: 'new-workflow',
      version: 0,
      name: 'New Workflow',
      description: '',
      initialTask: '',
      roles: [{ id: 'owner', name: 'Workflow Owner' }],
      stages: [{ id: 'stage-1', name: 'Stage 1', description: '', order: 1 }],
      tasks: [],
    };
  }
}
