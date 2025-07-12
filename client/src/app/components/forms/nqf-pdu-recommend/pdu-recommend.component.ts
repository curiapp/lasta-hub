//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
//import the file-upload plugin
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../file-upload/file-upload.component';

//create the component properties
@Component({
  selector: 'nqf-pdu-recommend',
  templateUrl: 'pdu-recommend.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class PduRecommendComponent {
  url = `${environment.apiUrl}/nqa/pdu-recommend`;
  model: any = {};
  @Input() code: string;
  decision: string;
  showWarning: boolean = false;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ submissionType: this.model.type, decision });
  }

}
