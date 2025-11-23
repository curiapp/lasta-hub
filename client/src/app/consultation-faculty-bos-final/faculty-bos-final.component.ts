import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { FileUploadComponent } from "../components/forms/file-upload/file-upload.component";
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'consultation-faculty-bos-final',
  templateUrl: 'faculty-bos-final.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class FacultyBosFinalComponent {
  url = `${environment.apiUrl}/bos-senate/faculty-bos-recommend`;
  model: any = {};
  consultationDate: Date;
  @Input() pid: string;
  toast = inject(ToastService);
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload({
      date: this.model.consultationDate,
      status: this.model.status,
      recommend: this.model.recommend
    });
  }

}
