import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";

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
      date: this.model.date,
      deferTo: this.model.deferTo,
      recommendedTo: this.model.recommend
    });
  }

}
