import { Router } from '@angular/router';
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { environment } from '../../../../environments/environment';

//create the component properties
@Component({
  //define the element to be selected from the html structure.
  selector: 'pd-curriculum-revise',
  //location of our template rather than writing inline templates.
  templateUrl: 'curriculum-dev-draft-revise.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class CurriculumDevDraftReviseComponent implements OnInit {
  url = `${environment.apiUrl}/curriculum-development/draft/revise`;
  model: any = {};
  endDate: Date;
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  constructor() { }

  ngOnInit() {
  }

  @ViewChild('selectedFile') selectedFile: any;

  onUpload() {
    this.fileUpload.onUpload({});
  }

}
