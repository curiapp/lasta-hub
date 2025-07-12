//import component, ElementRef, input and the oninit method from angular core
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../file-upload/file-upload.component";

@Component({
  selector: 'nqa-submit',
  templateUrl: 'nqa-submit.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class NqaSubmitComponent {

  url = `${environment.apiUrl}/nqa/submit`;
  model: any = {};
  @Input() code: string;
  decision: string;
  showWarning: boolean = false;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload({ submissionType: this.model.type });
  }

}
