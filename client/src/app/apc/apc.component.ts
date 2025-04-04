import { Component, Input, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { FileUploadComponent } from "../components/forms/file-upload/file-upload.component";
import { SharedModule } from '../shared.module';

@Component({
  selector: 'apc-recommend',
  templateUrl: 'apc.component.html',
  imports: [SharedModule, FileUploadComponent]
})
export class ApcComponent {
  url = `${environment.apiUrl}/need-analysis/apc/recommend`;
  model: any = {};
  consultationDate: Date;
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload(this.model);
  }

}
