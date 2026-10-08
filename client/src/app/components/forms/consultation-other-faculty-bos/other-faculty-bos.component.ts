import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";

@Component({
  selector: 'consultations-other-faculty-bos',
  templateUrl: 'other-faculty-bos.component.html',
  imports: [FormsModule, FileUploadComponent]
})
export class OtherFacultyBosComponent {
  url = `${environment.apiUrl}/bos-senate/other-faculty-recommend`;
  model: any = {};
  consultationDate: Date;
  @Input() pid: string;
  recommendTo: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload({
      date: this.model.date,
      facultyName: this.model.facultyName,
      recommendedTo: this.model.recommendedTo
    });
  }

}
