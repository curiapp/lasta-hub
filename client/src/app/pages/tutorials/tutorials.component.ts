import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ModalComponent } from '../../components/modal/modal.component';
import { V2_GET_WORKFLOW_DEFINITION } from '../../graphql/graphql.queries.v2';
import {
  WorkflowArtifactRequirement,
  WorkflowDefinition,
  WorkflowField,
  WorkflowStage,
  WorkflowTask,
  WorkflowTransition,
} from '../../types/workflow-definition';

type SupportTask = WorkflowTask & {
  stageName: string;
  roleNames: string[];
}

type SupportStage = WorkflowStage & {
  tasks: SupportTask[];
}

@Component({
  selector: 'Tutorial',
  templateUrl: 'tutorials.component.html',
  styleUrl: 'tutorials.component.css',
  imports: [FormsModule, ModalComponent],
})
export class TutorialComponent implements OnInit {
  private readonly apollo = inject(Apollo);

  loading = signal(true);
  error = signal('');
  searchQuery = signal('');
  definition = signal<WorkflowDefinition | null>(null);
  selectedStageId = signal('');
  selectedTaskId = signal('');
  stageContentVisible = signal(true);
  helpPanelVisible = signal(true);
  helpAnimationAlt = signal(false);

  stages = computed<SupportStage[]>(() => {
    const definition = this.definition();
    if (!definition) return [];

    const roleNames = new Map((definition.roles ?? []).map((role) => [role.id, role.name]));
    const search = this.searchQuery().trim().toLowerCase();

    return [...(definition.stages ?? [])]
      .sort((a, b) => a.order - b.order)
      .map((stage) => {
        const tasks = (definition.tasks ?? [])
          .filter((task) => task.stageId === stage.id)
          .map((task) => ({
            ...task,
            stageName: stage.name,
            roleNames: task.ownerRoles.map((role) => roleNames.get(role) ?? role),
          }));

        return { ...stage, tasks };
      })
      .filter((stage) => {
        if (!search) return true;
        return [
          stage.name,
          ...stage.tasks.flatMap((task) => [
            task.name,
            ...task.roleNames,
            ...(task.form ?? []).map((field) => field.label),
            ...(task.artifacts ?? []).map((artifact) => artifact.label),
          ]),
        ].some((value) => value?.toLowerCase().includes(search));
      });
  });

  selectedStage = computed(() => {
    const stages = this.stages();
    return stages.find((stage) => stage.id === this.selectedStageId()) ?? stages[0] ?? null;
  });

  selectedTask = computed(() => {
    const stage = this.selectedStage();
    if (!stage) return null;
    return stage.tasks.find((task) => task.id === this.selectedTaskId()) ?? stage.tasks[0] ?? null;
  });

  stageCount = computed(() => this.definition()?.stages?.length ?? 0);
  taskCount = computed(() => this.definition()?.tasks?.length ?? 0);

  ngOnInit() {
    this.apollo.query<{ workflowDefinition: WorkflowDefinition }>({
      query: V2_GET_WORKFLOW_DEFINITION,
      fetchPolicy: 'network-only',
    }).subscribe({
      next: ({ data }) => {
        this.definition.set(data.workflowDefinition);
        const firstStage = [...(data.workflowDefinition?.stages ?? [])].sort((a, b) => a.order - b.order)[0];
        const firstTask = (data.workflowDefinition?.tasks ?? []).find((task) => task.stageId === firstStage?.id);
        this.selectedStageId.set(firstStage?.id ?? '');
        this.selectedTaskId.set(firstTask?.id ?? '');
        this.loading.set(false);
      },
      error: () => {
        this.error.set('The process guide could not be loaded. Please try again later.');
        this.loading.set(false);
      },
    });
  }

  selectStage(stage: SupportStage) {
    this.stageContentVisible.set(false);
    this.helpPanelVisible.set(false);
    setTimeout(() => {
      this.selectedStageId.set(stage.id);
      this.selectedTaskId.set(stage.tasks[0]?.id ?? '');
      this.stageContentVisible.set(true);
      this.helpPanelVisible.set(true);
    });
  }

  selectTask(task: SupportTask) {
    this.selectedStageId.set(task.stageId);
    this.selectedTaskId.set(task.id);
    this.helpPanelVisible.set(true);
    this.helpAnimationAlt.update((value) => !value);
  }

  setSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  fieldTypeLabel(type: WorkflowField['type']) {
    const labels: Record<WorkflowField['type'], string> = {
      checkbox: 'Checklist',
      date: 'Date',
      email: 'Email',
      file: 'File upload',
      number: 'Number',
      radio: 'Single choice',
      repeater: 'Repeatable group',
      select: 'Dropdown',
      tel: 'Phone number',
      text: 'Short text',
      textarea: 'Long text',
      url: 'Web link',
    };
    return labels[type] ?? type;
  }

  fieldHelp(field: WorkflowField): string {
    const details = [this.fieldTypeLabel(field.type)];
    if (field.required) details.push('required');
    if (field.options?.length) details.push(`${field.options.length} option${field.options.length === 1 ? '' : 's'}`);
    if (field.type === 'repeater') {
      if (field.minItems != null) details.push(`minimum ${field.minItems}`);
      if (field.maxItems != null) details.push(`maximum ${field.maxItems}`);
    }
    if (field.type === 'file') {
      if (field.acceptedFileTypes?.length) details.push(field.acceptedFileTypes.join(', '));
      details.push(`up to ${field.maxFileSizeMb ?? 20} MB`);
    }
    return details.join(' - ');
  }

  artifactHelp(artifact: WorkflowArtifactRequirement) {
    const details = [];
    details.push(artifact.required ? 'Required' : 'Optional');
    details.push(artifact.multiple ? 'Multiple files' : 'Single file');
    if (artifact.maxFiles) details.push(`maximum ${artifact.maxFiles}`);
    details.push(`up to ${artifact.maxFileSizeMb ?? 20} MB`);
    return details.join(' - ');
  }

  transitionHelp(transition: WorkflowTransition) {
    const target = Array.isArray(transition.to) ? transition.to.join(', ') : transition.to;
    if (target === 'END') return 'Completes the process';
    const task = this.definition()?.tasks?.find((item) => item.id === target);
    const targetText = task?.name ?? target;
    if (transition.when?.field) {
      return `When ${transition.when.field} matches the configured decision, it moves to ${targetText}.`;
    }
    return `Moves to ${targetText}.`;
  }
}
