import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { FileUploadComponent } from "../components/forms/file-upload/file-upload.component";
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'consultation-faculty-bos-final',
  templateUrl: 'faculty-bos-final.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class FacultyBosFinalComponent implements OnInit {
  url = `${environment.apiUrl}/bos-senate/faculty-bos-recommend`;
  model: any = {};
  consultationDate: Date;
  @Input() code: string;
  toast = inject(ToastService);
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  // public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'faculty-bos' });

  ngOnInit() {
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onBuildItemForm = (item: any, form: any) => {
    //   form.append('devCode', this.code);
    //   form.append('date', this.model.consultationDate);
    //   form.append('status', this.model.status);
    //   form.append('recommend', this.model.recommend);
    // };

    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   console.log("FileUpload:successfully uploaded:", item, status, response);
    //   if (status == 201) {
    //     this.toast.success("Faculty BOS Recommendations successfully uploaded");
    //   } else if (status == 500) {
    //     this.toast.error("Failed BOS REcommendations");
    //   } else {
    //     this.toast.error("Faculty BOS Recommendations response:");
    //   }
    // };
  }


  onUpload() {
    this.fileUpload.onUpload({
      date: this.model.consultationDate,
      status: this.model.status,
      recommend: this.model.recommend
    });
  }

}
