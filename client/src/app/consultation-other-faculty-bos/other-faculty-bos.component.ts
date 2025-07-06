import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { FileUploadComponent } from "../components/forms/file-upload/file-upload.component";

@Component({
  selector: 'consultations-other-faculty-bos',
  templateUrl: 'other-faculty-bos.component.html',
  imports: [FormsModule, FileUploadComponent]
})
export class OtherFacultyBosComponent implements OnInit {
  url = `${environment.apiUrl}/bos-senate/other-faculty-recommend`;
  model: any = {};
  consultationDate: Date;
  @Input() code: string;
  OtherFacultyName: string;
  recommendTo: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  // public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'other-faculty-recommendation' });

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onBuildItemForm = (item: any, form: any) => {
    //   form.append('devCode', this.model.programmeCode);
    //   form.append('date', this.model.consultationDate);
    //   form.append('OtherFacultyName', this.model.OtherFacultyName);
    //   form.append('recommendTo', this.model.recommendTo);
    // };
    // //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   console.log("FileUpload:successfully uploaded:", item, status, response);
    //   if (status == 201) {

    //     alert("FileUpload: successfully");

    //   }
    //   else {
    //     alert("FileUpload:" + response);

    //   }
    // };
  }

  onUpload() {
    this.fileUpload.onUpload({
      date: this.model.consultationDate,
      OtherFacultyName: this.model.OtherFacultyName,
      recommendTo: this.model.recommend
    });
  }

}
