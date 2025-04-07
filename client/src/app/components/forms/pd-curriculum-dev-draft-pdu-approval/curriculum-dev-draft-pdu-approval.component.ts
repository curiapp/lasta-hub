import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'pd-curriculum-dev-draft-pdu-approval',
  templateUrl: 'curriculum-dev-draft-pdu-approval.component.html',
  imports: [FormsModule, FileUploadComponent]
})
export class CurriculumDevDraftPDUApprovComponent implements OnInit {
  url = `${environment.apiUrl}/curriculum-development/draft/validate`;
  model: any = {};
  devCode: String;
  decision: String;
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  constructor() { }

  ngOnInit() { }

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ decision });
  }

}
