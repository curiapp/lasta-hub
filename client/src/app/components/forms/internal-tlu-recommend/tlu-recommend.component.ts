import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'tlu-recommend',
  templateUrl: 'tlu-recommend.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class TLURecommendComponent {
  url = `${environment.apiUrl}/reviews/recommend`;
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ decision: decision, reviewUnit: "TLA" });
  }

}
