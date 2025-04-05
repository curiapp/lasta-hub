// import {
//   RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS,
//   LocationStrategy, HashLocationStrategy,
// } from 'angular/router';
//import component, ElementRef, input and the oninit method from angular core
import { Component, Input, ViewChild } from '@angular/core';
//import the file-upload plugin
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../file-upload/file-upload.component';


@Component({
  selector: 'end-consult',
  templateUrl: 'end-consult.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class EndConsultComponent {
  devCode: String;
  decision: String;
  url = `${environment.apiUrl}/need-analysis/survey`;
  @Input() code?: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  constructor() { }

  onUpload() {
    this.fileUpload.uploader.uploadAll()
  }
}
