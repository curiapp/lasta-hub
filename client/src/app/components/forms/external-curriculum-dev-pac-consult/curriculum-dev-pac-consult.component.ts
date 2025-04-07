import { Router } from '@angular/router';
//import component, ElementRef, input and the oninit method from angular core
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
//import the file-upload plugin
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { environment } from '../../../../environments/environment';

//create the component properties
@Component({
  //define the element to be selected from the html structure.
  selector: 'external-curriculum-dev-pac-consult',
  //location of our template rather than writing inline templates.
  templateUrl: 'curriculum-dev-pac-consult.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class CurriculumDevPACConsultComponent {
  url = `${environment.apiUrl}/consultations/pac/consult`;
  model: any = {};
  consultationDate: Date;
  private fileMap = new Map();
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload({ date: this.model.consultationDate });
  }
}
