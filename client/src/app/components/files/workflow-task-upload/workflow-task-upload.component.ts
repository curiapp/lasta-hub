import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { forkJoin } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { WorkflowArtifactRecord } from '../../../types/programme-workflow';

@Component({
  selector: 'workflow-task-upload',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './workflow-task-upload.component.html',
})
export class WorkflowTaskUploadComponent implements OnChanges {
  private readonly http = inject(HttpClient);

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

  selectedFiles: File[] = [];
  visibleAttachments: WorkflowArtifactRecord[] = [];
  error = '';
  isUploading = false;
  uploadProgress = 0;
  isDeletingAll = false;
  deletingIds = new Set<string>();

  get remainingSlots() {
    const limit = this.multiple ? this.maxFiles : 1;
    return limit == null ? Number.POSITIVE_INFINITY : Math.max(limit - this.visibleAttachments.length - this.selectedFiles.length, 0);
  }

  get pickerLabel() {
    if (!this.remainingSlots) return 'Limit reached';
    return this.multiple ? 'Choose files' : 'Choose file';
  }

  get fileSizeLabel() {
    return `Max ${this.effectiveMaxFileSizeMb} MB`;
  }

  get selectedCount() {
    return this.selectedFiles.length;
  }

  get slotLabel() {
    return Number.isFinite(this.remainingSlots) ? `${this.remainingSlots} left` : 'No limit';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['attachments']) {
      this.visibleAttachments = [...this.attachments];
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
    if (this.deletingIds.has(attachment.id) || this.isDeletingAll) return;
    this.error = '';
    this.deletingIds.add(attachment.id);
    this.deleteAttachmentRequest(attachment.id)
      .subscribe({
        next: () => {
          this.deletingIds.delete(attachment.id);
          this.visibleAttachments = this.visibleAttachments.filter((item) => item.id !== attachment.id);
          this.removed.emit(attachment.id);
        },
        error: (error) => {
          this.deletingIds.delete(attachment.id);
          this.error = error?.error?.error || 'Attachment could not be removed.';
        },
      });
  }

  clearAttachments() {
    if (!this.visibleAttachments.length || this.isDeletingAll) return;
    this.error = '';
    this.isDeletingAll = true;
    const attachmentIds = this.visibleAttachments.map((attachment) => attachment.id);
    attachmentIds.forEach((id) => this.deletingIds.add(id));
    forkJoin(attachmentIds.map((id) => this.deleteAttachmentRequest(id))).subscribe({
      next: () => {
        attachmentIds.forEach((id) => {
          this.deletingIds.delete(id);
          this.removed.emit(id);
        });
        this.visibleAttachments = [];
        this.isDeletingAll = false;
      },
      error: (error) => {
        attachmentIds.forEach((id) => this.deletingIds.delete(id));
        this.isDeletingAll = false;
        this.error = error?.error?.error || 'Attachments could not be removed.';
      },
    });
  }

  isDeleting(attachmentId: string) {
    return this.deletingIds.has(attachmentId);
  }

  private addFiles(files: File[]) {
    this.error = '';
    if (!files.length) return;

    const remaining = this.remainingSlots;
    if (remaining <= 0) {
      this.error = 'The file limit has already been reached.';
      return;
    }

    const acceptedFiles = Number.isFinite(remaining) ? files.slice(0, remaining) : files;
    const oversized = acceptedFiles.find((file) => file.size > this.effectiveMaxFileSizeMb * 1024 * 1024);
    if (oversized) {
      this.error = `File is too large. Please select a file smaller than ${this.effectiveMaxFileSizeMb} MB.`;
      return;
    }

    this.selectedFiles = this.multiple ? [...this.selectedFiles, ...acceptedFiles] : acceptedFiles.slice(0, 1);
    if (Number.isFinite(remaining) && files.length > acceptedFiles.length) {
      this.error = `Only ${remaining} more file${remaining === 1 ? '' : 's'} can be uploaded.`;
    }
    this.uploadSelected();
  }

  uploadSelected() {
    if (!this.selectedFiles.length || this.isUploading) return;
    this.error = '';
    this.isUploading = true;
    this.uploadProgress = 0;

    const form = new FormData();
    this.selectedFiles.forEach((file) => form.append('file', file, file.name));
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
          this.uploadProgress = event.total ? Math.round((event.loaded / event.total) * 100) : 0;
          return;
        }
        if (event.type === HttpEventType.Response) {
          const body = event.body ?? [];
          const uploadedArtifacts = Array.isArray(body) ? body : [body];
          this.uploadProgress = 100;
          this.selectedFiles = [];
          this.visibleAttachments = [...this.visibleAttachments, ...uploadedArtifacts];
          this.isUploading = false;
          uploadedArtifacts.forEach((artifact) => this.uploaded.emit(artifact));
        }
      },
      error: (error) => {
        this.error = error?.error?.error || 'Upload failed.';
        this.isUploading = false;
        this.uploadProgress = 0;
      },
    });
  }

  clearSelected() {
    this.error = '';
    this.selectedFiles = [];
    this.uploadProgress = 0;
  }

  private get effectiveMaxFileSizeMb() {
    return Math.max(Number(this.maxFileSizeMb) || 20, 1);
  }

  private deleteAttachmentRequest(attachmentId: string) {
    const userId = encodeURIComponent(this.userId);
    return this.http.delete(`${environment.apiUrl}/tasks/${this.taskId}/attachments/${attachmentId}?userId=${userId}`);
  }
}
