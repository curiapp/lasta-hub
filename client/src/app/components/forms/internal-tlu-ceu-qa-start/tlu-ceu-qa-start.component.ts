import { Router } from '@angular/router';

//import component, ElementRef, input and the oninit method from angular core
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
//import the file-upload plugin
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Model } from './model';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../file-upload/file-upload.component";

@Component({
  selector: 'tlu-ceu-qa-start',
  templateUrl: 'tlu-ceu-qa-start.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class TLUCEUQAStartComponent implements OnInit {
  url = `${environment.apiUrl}/reviews/start`;
  model: Model = new Model();
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  ngOnInit() { }
  //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  constructor(private http: HttpClient, private el: ElementRef, private router: Router, private _location: Location) { }

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
