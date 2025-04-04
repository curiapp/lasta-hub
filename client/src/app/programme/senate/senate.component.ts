import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { FileUploadComponent } from '../../components/forms/file-upload/file-upload.component';

@Component({
  selector: 'senate-recommend',
  templateUrl: 'senate.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class SenateComponent {
  url = `${environment.apiUrl}/need-analysis/senate/recommend`;
  model: any = {};
  consultationDate: Date;
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload(this.model);
  }
}
