import { Router } from '@angular/router';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'external-curriculum-dev-pac-start',
  templateUrl: 'curriculum-dev-pac-start.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class CurriculumDevPACStartComponent {
  url = `${environment.apiUrl}/consultations/pac/start`;
  model: any = {};
  consultationDate: Date;
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload({ date: this.model.consultationDate });
  }

}
