import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';

@Component({
  selector: 'tlu-recommend',
  templateUrl: 'tlu-recommend.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class TLURecommendComponent {
  url = `${environment.apiUrl}/reviews/submit`;
  @Input() pid: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ decision: decision, entity: "adstlt" });
  }

}
