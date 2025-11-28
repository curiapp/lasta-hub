import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";

@Component({
  selector: 'pd-curriculum-revise',
  templateUrl: 'curriculum-dev-draft-revise.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class CurriculumDevDraftReviseComponent {
  url = `${environment.apiUrl}/curriculum-development/draft/revise`;
  model: any = {};
  endDate: Date;
  @Input() pid: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload({});
  }

}
