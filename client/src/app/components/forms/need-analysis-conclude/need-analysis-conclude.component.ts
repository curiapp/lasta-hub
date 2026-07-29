//import component, ElementRef, input and the oninit method from angular core
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../../services/toast.service';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';

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
  url = `${environment.apiUrl}/need-analysis/conclude`;
  @Input() pid?: string;
  @Output() completed = new EventEmitter<void>();
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ "decision": decision });
  }

}
