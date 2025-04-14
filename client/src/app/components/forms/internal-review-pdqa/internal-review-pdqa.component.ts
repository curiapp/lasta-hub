import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
    selector: 'internal-pdqa-review',
    templateUrl: './internal-review-pdqa.component.html',
    styleUrls: ['./internal-review-pdqa.component.scss'],
    imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class InternalReviewPduComponent {
  url = `${environment.apiUrl}/reviews/recommend`;
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ decision: decision, reviewUnit: "PDQA" });
  }

}
