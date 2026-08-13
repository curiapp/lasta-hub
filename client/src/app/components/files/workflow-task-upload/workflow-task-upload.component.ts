import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { WorkflowArtifactRecord } from '../../../types/programme-workflow';

@Component({
  selector: 'workflow-task-upload',
  imports: [CommonModule],
  templateUrl: './workflow-task-upload.component.html',
  styleUrls: ['./workflow-task-upload.component.css'],
})
export class WorkflowTaskUploadComponent implements OnChanges {
  private readonly http = inject(HttpClient);
  private readonly minimumUploadVisibleMs = 1000;
  private readonly attachmentRevealDelayMs = 170;
  private uploadStartedAt = 0;
  private uploadFinishTimer?: ReturnType<typeof setTimeout>;
  private attachmentRevealTimer?: ReturnType<typeof setTimeout>;

  @Input({ required: true }) taskId = '';
  @Input({ required: true }) type = 'attachment';
  @Input({ required: true }) title = 'Attachment';
  @Input() userId = '';
  @Input() disabled = false;
  @Input() multiple = false;
  @Input() maxFiles?: number;
  @Input() maxFileSizeMb = 20;
  @Input() uploadedCount = 0;
  @Input() attachments: WorkflowArtifactRecord[] = [];
  @Output() uploaded = new EventEmitter<WorkflowArtifactRecord>();
  @Output() removed = new EventEmitter<string>();

  selectedFiles = signal<File[]>([]);
  visibleAttachments = signal<WorkflowArtifactRecord[]>([]);
  error = signal('');
  isUploading = signal(false);
  uploadProgress = signal(0);
  isDeletingAll = signal(false);
  deletingIds = signal(new Set<string>());

  get remainingSlots() {
    const limit = this.multiple ? this.maxFiles : 1;
    return limit == null ? Number.POSITIVE_INFINITY : Math.max(limit - this.visibleAttachments().length - this.selectedFiles().length, 0);
  }

  get pickerLabel() {
    if (!this.remainingSlots) return 'Limit reached';
    return this.multiple ? 'Choose files' : 'Choose file';
  }

  get fileSizeLabel() {
    return `Max ${this.effectiveMaxFileSizeMb} MB`;
  }

  get selectedCount() {
    return this.selectedFiles().length;
  }

  get slotLabel() {
    return Number.isFinite(this.remainingSlots) ? `${this.remainingSlots} left` : 'No limit';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attachments']) {
      this.visibleAttachments.set([...this.attachments]);
    }
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.addFiles(files);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (this.disabled || !this.remainingSlots) return;
    this.addFiles(Array.from(event.dataTransfer?.files ?? []));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  removeAttachment(attachment: WorkflowArtifactRecord) {
    if (this.deletingIds().has(attachment.id) || this.isDeletingAll()) return;
    this.error.set('');
    this.setDeleting(attachment.id, true);
    this.deleteAttachmentRequest(attachment.id)
      .subscribe({
        next: () => {
          this.setDeleting(attachment.id, false);
          this.visibleAttachments.update((items) => items.filter((item) => item.id !== attachment.id));
          this.removed.emit(attachment.id);
        },
        error: (error) => {
          this.setDeleting(attachment.id, false);
          this.error.set(error?.error?.error || 'Attachment could not be removed.');
        },
      });
  }

  clearAttachments() {
    if (!this.visibleAttachments().length || this.isDeletingAll()) return;
    this.error.set('');
    this.isDeletingAll.set(true);
    const attachmentIds = this.visibleAttachments().map((attachment) => attachment.id);
    this.deletingIds.set(new Set([...this.deletingIds(), ...attachmentIds]));
    forkJoin(attachmentIds.map((id) => this.deleteAttachmentRequest(id))).subscribe({
      next: () => {
        attachmentIds.forEach((id) => {
          this.removed.emit(id);
        });
        this.deletingIds.update((ids) => {
          const next = new Set(ids);
          attachmentIds.forEach((id) => next.delete(id));
          return next;
        });
        this.visibleAttachments.set([]);
        this.isDeletingAll.set(false);
      },
      error: (error) => {
        this.deletingIds.update((ids) => {
          const next = new Set(ids);
          attachmentIds.forEach((id) => next.delete(id));
          return next;
        });
        this.isDeletingAll.set(false);
        this.error.set(error?.error?.error || 'Attachments could not be removed.');
      },
    });
  }

  isDeleting(attachmentId: string) {
    return this.deletingIds().has(attachmentId);
  }

  private addFiles(files: File[]) {
    this.error.set('');
    if (!files.length) return;

    const remaining = this.remainingSlots;
    if (remaining <= 0) {
      this.error.set('The file limit has already been reached.');
      return;
    }

    const acceptedFiles = Number.isFinite(remaining) ? files.slice(0, remaining) : files;
    const oversized = acceptedFiles.find((file) => file.size > this.effectiveMaxFileSizeMb * 1024 * 1024);
    if (oversized) {
      this.error.set(`File is too large. Please select a file smaller than ${this.effectiveMaxFileSizeMb} MB.`);
      return;
    }

    this.selectedFiles.set(this.multiple ? [...this.selectedFiles(), ...acceptedFiles] : acceptedFiles.slice(0, 1));
    if (Number.isFinite(remaining) && files.length > acceptedFiles.length) {
      this.error.set(`Only ${remaining} more file${remaining === 1 ? '' : 's'} can be uploaded.`);
    }
    this.uploadSelected();
  }

  uploadSelected() {
    if (!this.selectedFiles().length || this.isUploading()) return;
    if (this.uploadFinishTimer) clearTimeout(this.uploadFinishTimer);
    if (this.attachmentRevealTimer) clearTimeout(this.attachmentRevealTimer);
    this.error.set('');
    this.isUploading.set(true);
    this.uploadProgress.set(0);
    this.uploadStartedAt = Date.now();

    const form = new FormData();
    this.selectedFiles().forEach((file) => form.append('file', file, file.name));
    form.append('type', this.type);
    form.append('title', this.title);
    form.append('userId', this.userId);
    form.append('multiple', String(this.multiple));
    if (this.maxFiles != null) form.append('maxFiles', String(this.maxFiles));
    form.append('maxFileSizeMb', String(this.effectiveMaxFileSizeMb));

    this.http.post<WorkflowArtifactRecord[] | WorkflowArtifactRecord>(
      `${environment.apiUrl}/tasks/${this.taskId}/attachments`,
      form,
      { observe: 'events', reportProgress: true },
    ).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress.set(event.total ? Math.round((event.loaded / event.total) * 100) : 0);
          return;
        }
        if (event.type === HttpEventType.Response) {
          const body = event.body ?? [];
          const uploadedArtifacts = Array.isArray(body) ? body : [body];
          this.uploadProgress.set(100);
          this.finishUploadAfterMinimumDelay(uploadedArtifacts);
        }
      },
      error: (error) => {
        this.finishUploadAfterMinimumDelay([], error?.error?.error || 'Upload failed.');
      },
    });
  }

  clearSelected() {
    this.error.set('');
    this.selectedFiles.set([]);
    this.uploadProgress.set(0);
  }

  private get effectiveMaxFileSizeMb() {
    return Math.max(Number(this.maxFileSizeMb) || 20, 1);
  }

  private finishUploadAfterMinimumDelay(uploadedArtifacts: WorkflowArtifactRecord[], errorMessage = '') {
    const elapsed = Date.now() - this.uploadStartedAt;
    const remainingDelay = Math.max(this.minimumUploadVisibleMs - elapsed, 0);
    this.uploadFinishTimer = setTimeout(() => {
      this.isUploading.set(false);
      if (errorMessage) {
        this.error.set(errorMessage);
        this.uploadProgress.set(0);
        this.uploadFinishTimer = undefined;
        return;
      } else {
        this.selectedFiles.set([]);
        this.attachmentRevealTimer = setTimeout(() => {
          this.visibleAttachments.update((attachments) => [...attachments, ...uploadedArtifacts]);
          uploadedArtifacts.forEach((artifact) => this.uploaded.emit(artifact));
          this.attachmentRevealTimer = undefined;
        }, this.attachmentRevealDelayMs);
      }
      this.uploadFinishTimer = undefined;
    }, remainingDelay);
  }

  private deleteAttachmentRequest(attachmentId: string) {
    const userId = encodeURIComponent(this.userId);
    return this.http.delete(`${environment.apiUrl}/tasks/${this.taskId}/attachments/${attachmentId}?userId=${userId}`);
  }

  private setDeleting(attachmentId: string, deleting: boolean) {
    this.deletingIds.update((ids) => {
      const next = new Set(ids);
      if (deleting) next.add(attachmentId);
      else next.delete(attachmentId);
      return next;
    });
  }
}
