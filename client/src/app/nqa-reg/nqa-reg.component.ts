import { Component, Input, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { FileUploadComponent } from '../components/forms/file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

@Component({
  selector: 'nqa-registration',
  templateUrl: 'nqa-reg.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class NQARegComponent {
  url = `${environment.apiUrl}/nqa/register`;
  model: any = {};
  @Input() code: string;
  regDate: Date;
  courseName: string;
  courseCode: string;
  showWarning: boolean = false;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload({
      'devCode': this.code,
      'date': this.model.regDate,
      'courseName': this.model.courseName,
      'courseCode': this.model.courseCode,
      'nqfId': this.model.nqfId,
      'qtitle': this.model.qtitle
    });
  }

}
