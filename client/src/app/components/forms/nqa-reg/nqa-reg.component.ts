import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';

@Component({
  selector: 'nqa-registration',
  templateUrl: 'nqa-reg.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class NQARegComponent {
  url = `${environment.apiUrl}/nqa/register`;
  model: any = {};
  @Input() pid: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload({
      'date': this.model.regDate,
      'nqfId': this.model.nqfId,
      'qualificationTitle': this.model.qualificationTitle
    });
  }

}
