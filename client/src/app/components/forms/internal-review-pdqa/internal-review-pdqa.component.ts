import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';

@Component({
    selector: 'internal-pdqa-review',
    templateUrl: './internal-review-pdqa.component.html',
    styleUrls: ['./internal-review-pdqa.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class InternalReviewPduComponent {
  url = `${environment.apiUrl}/reviews/submit`;
  @Input() pid: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ decision: decision, entity: "pdqa" });
  }

}
