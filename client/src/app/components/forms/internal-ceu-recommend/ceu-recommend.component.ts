//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
//import the file-upload plugin
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { HttpClient as Http } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from "../file-upload/file-upload.component";
import { environment } from '../../../../environments/environment';

//create the component properties
@Component({
  //define the element to be selected from the html structure.
  selector: 'ceu-recommend',
  templateUrl: 'ceu-recommend.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class CEURecommendComponent {
  url = `${environment.apiUrl}/reviews/recommend`;
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ decision: decision, reviewUnit: "CE" });
  }

}
