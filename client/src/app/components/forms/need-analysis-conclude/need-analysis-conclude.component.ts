//import component, ElementRef, input and the oninit method from angular core
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../../services/toast.service';
import { FileUploadComponent } from "../file-upload/file-upload.component";

@Component({
  selector: 'need-analysis-conclude',
  templateUrl: 'need-analysis-conclude.component.html',
  imports: [
    FormsModule,
    FileUploadModule,
    FileUploadComponent
  ]
})
export class NeedAnalysisConcludeComponent {
  devCode: String;
  decision: String;
  url = `${environment.apiUrl}/need-analysis/conclude`;
  @Input() code?: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  constructor() { }


  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ "decission": decision });
  }

}
