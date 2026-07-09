import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { WorkflowArtifactRecord } from '../../../types/programme-workflow';

@Component({
  selector: 'workflow-task-upload',
  imports: [CommonModule, FileUploadModule],
  templateUrl: './workflow-task-upload.component.html',
})
export class WorkflowTaskUploadComponent implements OnChanges {
  @Input({ required: true }) taskId = '';
  @Input({ required: true }) type = 'attachment';
  @Input({ required: true }) title = 'Attachment';
  @Input() userId = '';
  @Input() disabled = false;
  @Output() uploaded = new EventEmitter<WorkflowArtifactRecord>();

  uploader = this.createUploader();
  error = '';

  ngOnChanges() {
    this.uploader = this.createUploader();
  }

  private createUploader() {
    const uploader = new FileUploader({
      url: `${environment.apiUrl}/tasks/${this.taskId}/attachments`,
      itemAlias: 'file',
      autoUpload: true,
      maxFileSize: 20 * 1024 * 1024,
    });
    uploader.onBuildItemForm = (_, form) => {
      form.append('type', this.type);
      form.append('title', this.title);
      form.append('userId', this.userId);
    };
    uploader.onSuccessItem = (_, response) => {
      this.error = '';
      this.uploaded.emit(JSON.parse(response) as WorkflowArtifactRecord);
      uploader.clearQueue();
    };
    uploader.onErrorItem = (_, response) => {
      try {
        this.error = JSON.parse(response)?.error || 'Upload failed.';
      } catch {
        this.error = 'Upload failed.';
      }
    };
    return uploader;
  }
}
