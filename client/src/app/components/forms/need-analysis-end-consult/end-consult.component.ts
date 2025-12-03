import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';


@Component({
  selector: 'end-consult',
  templateUrl: 'end-consult.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class EndConsultComponent {
  decision: String;
  url = `${environment.apiUrl}/need-analysis/survey`;
  @Input() pid?: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  constructor() { }

  onUpload() {
    this.fileUpload.uploader.uploadAll()
  }
}
