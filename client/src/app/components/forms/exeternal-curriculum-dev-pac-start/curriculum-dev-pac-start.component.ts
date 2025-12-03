import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";

@Component({
  selector: 'external-curriculum-dev-pac-start',
  templateUrl: 'curriculum-dev-pac-start.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class CurriculumDevPACStartComponent {
  url = `${environment.apiUrl}/consultations/pac/start`;
  model: any = {};
  consultationDate: Date;
  @Input() pid: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload({ date: this.model.consultationDate });
  }

}
