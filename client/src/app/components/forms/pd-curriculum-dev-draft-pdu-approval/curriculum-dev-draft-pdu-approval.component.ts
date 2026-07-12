import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';

@Component({
  selector: 'pd-curriculum-dev-draft-pdu-approval',
  templateUrl: 'curriculum-dev-draft-pdu-approval.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, FileUploadComponent]
})
export class CurriculumDevDraftPduApprovalComponent {
  url = `${environment.apiUrl}/curriculum-development/draft/validate`;
  model: any = {};
  devCode: String;
  decision: String;
  @Input() pid: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ decision });
  }

}
