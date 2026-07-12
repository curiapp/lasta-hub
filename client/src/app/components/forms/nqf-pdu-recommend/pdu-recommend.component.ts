//import component, ElementRef, input and the oninit method from angular core
import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';

@Component({
  selector: 'nqf-pdu-recommend',
  templateUrl: 'pdu-recommend.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class PduRecommendComponent {
  url = `${environment.apiUrl}/nqa/recommend`;
  model: any = {};
  @Input() pid: string;
  showWarning: boolean = false;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ submissionType: this.model.type ? "initial-submission" : "resubmission", decision });
  }

}
