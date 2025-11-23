import { Router } from '@angular/router';
//import component, ElementRef, input and the oninit method from angular core
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
//import the file-upload plugin
import { FileUploadModule } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { Model } from './model';

@Component({
  selector: 'tlu-ceu-qa-start',
  templateUrl: 'tlu-ceu-qa-start.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class TLUCEUQAStartComponent {
  url = `${environment.apiUrl}/reviews/start`;
  model: Model = new Model();
  @Input() pid: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload() {
    this.fileUpload.onUpload({ ...this.model });
  }

  onChecked(event: Event) {
    const isChecked = (event.target as HTMLInputElement).value
    if (this.model.recommendto.includes(isChecked)) {
      var index = this.model.recommendto.indexOf(isChecked);
      this.model.recommendto.splice(index, 1)
    } else
      this.model.recommendto.push(isChecked)
  }
}
