import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadMultipleComponent } from '../../files/file-upload-multiple/file-upload-multiple.component';

@Component({
  selector: 'nqa-submit',
  templateUrl: 'nqa-submit.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadMultipleComponent]
})
export class NqaSubmitComponent {
  url = `${environment.apiUrl}/nqa/submit`;
  @Input() pid: string;
  model: any = {};
  fileTypeList = ["", "Qualification Document", "Response"];
  @ViewChild(FileUploadMultipleComponent) fileUpload: FileUploadMultipleComponent;

  onUpload() {
    this.fileUpload.onUpload({ submissionType: this.model.type ? "initial-submission" : "resubmission" });
  }
}
