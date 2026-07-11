import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { WorkflowDefinitionService } from '../../services/workflow-definition.service';
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

  definitions: WorkflowDefinitionSummary[] = [];
  definition = this.emptyDefinition();
  selectedTaskId = '';
  roleEditor = '';
  jsonText = '';
  jsonError = '';
  message = '';
  messageType: 'success' | 'error' = 'success';
  mode: 'builder' | 'json' = 'builder';
  loading = true;
  publishing = false;
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
  ];
  readonly childFieldTypes = this.fieldTypes.filter((field) => field.value !== 'repeater');

  ngOnInit() {
    this.loadDefinitions();
  }

  get selectedTask() {
    return this.definition.tasks.find((task) => task.id === this.selectedTaskId);
  }

  get taskOptions() {
    return this.definition.tasks.map((task) => ({ id: task.id, name: task.name }));
  }

  loadDefinitions(slug?: string) {
    this.loading = true;
    this.workflowService.list().subscribe({
      next: (definitions) => {
        this.definitions = definitions;
        this.loadDefinition(slug ?? definitions[0]?.slug);
      },
      error: () => {
        this.loading = false;
        this.showMessage('Could not load workflow definitions.', 'error');
      },
    });
  }

  loadDefinition(slug?: string) {
    this.loading = true;
    this.workflowService.get(slug).pipe(finalize(() => this.loading = false)).subscribe({
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
      this.publishing = true;
      this.workflowService.publish(definition)
        .pipe(finalize(() => this.publishing = false))
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
    this.updateRoleEditor();
    this.builderChanged();
  }

  addStage() {
    const index = this.definition.stages.length + 1;
    const stage: WorkflowStage = { id: `stage-${index}`, name: `Stage ${index}`, order: index };
    this.definition.stages.push(stage);
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

  addTask() {
    const index = this.definition.tasks.length + 1;
    const task: WorkflowTask = {
      id: `task-${index}`,
      name: `Task ${index}`,
      stageId: this.definition.stages[0]?.id ?? '',
      ownerRoles: this.definition.roles[0]?.id ? [this.definition.roles[0].id] : [],
      form: [],
      artifacts: [],
      transitions: [{ event: 'submit', label: 'Continue', to: 'END', outcome: 'completed' }],
    };
    this.definition.tasks.push(task);
    this.selectedTaskId = task.id;
    if (!this.definition.initialTask) this.definition.initialTask = task.id;
    this.updateRoleEditor();
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
    this.updateRoleEditor();
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
    this.selectedTaskId = taskId;
    this.updateRoleEditor();
  }

  applyOwnerRoles() {
    const task = this.selectedTask;
    if (!task) return;
    task.ownerRoles = this.roleEditor.split(',').map((role) => role.trim()).filter(Boolean);
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
      field.acceptedFileTypes ??= ['.pdf', '.doc', '.docx'];
      field.maxFileSizeMb ??= 10;
    } else if (type === 'repeater') {
      delete field.options;
      delete field.acceptedFileTypes;
      delete field.maxFileSizeMb;
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
    }
    this.builderChanged();
  }

  fieldOptions(field: WorkflowField) {
    return field.options?.join(', ') ?? '';
  }

  setFieldOptions(field: WorkflowField, value: string) {
    field.options = value.split(',').map((option) => option.trim()).filter(Boolean);
    this.builderChanged();
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
    this.updateRoleEditor();
    this.syncJson();
  }

  private normalizeDefinition() {
    this.definition.roles ??= [];
    this.definition.stages ??= [];
    this.definition.tasks ??= [];
    this.definition.description ??= '';
    this.definition.tasks.forEach((task) => {
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

  private updateRoleEditor() {
    this.roleEditor = this.selectedTask?.ownerRoles.join(', ') ?? '';
  }

  private syncJson() {
    this.jsonText = JSON.stringify(this.definition, null, 2);
    this.jsonError = '';
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
      stages: [{ id: 'stage-1', name: 'Stage 1', order: 1 }],
      tasks: [],
    };
  }
}
