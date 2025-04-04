import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FileItem, FileUploader, FileUploadModule } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { FilePipe } from "../../../pipes/file.pipe";
import { FileExtensionPipe } from "../../../pipes/file-extension.pipe";
import { ToastService } from '../../../services/toast.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'need-analysis-consult',
  templateUrl: 'need-analysis-consult.component.html',
  imports: [FormsModule, FileUploadModule, FilePipe, FileExtensionPipe]
})
export class NeedAnalysisConsultationComponent implements OnInit {
  url = `${environment.apiUrl}/need-analysis/consult`;
  devCode: String;
  @Input() code: string;

  needAnalysis: {
    startDate: Date;
    endDate: Date;
    organisationList: string[];
    organisation;
  } = {
      startDate: new Date(),
      endDate: new Date(),
      organisationList: [],
      organisation: ""
    }


  uploader: FileUploader = new FileUploader({
    url: this.url,
    itemAlias: 'consultation',
    maxFileSize: 50 * 1024 * 1024,
    method: 'POST',
    headers: [
      { name: 'Authorization', value: 'Bearer YOUR_TOKEN' }, // If using JWT authentication
      { name: 'X-Requested-With', value: 'XMLHttpRequest' },
    ]
  });

  addOrganisation() {
    this.needAnalysis.organisationList.push(this.needAnalysis.organisation);
    // console.log(this.organisationList);
    this.needAnalysis.organisation = '';
  }

  removeOrganisation(value: string) {
    this.needAnalysis.organisationList = this.needAnalysis.organisationList.filter((item) => item !== value);
  }

  constructor(private router: Router, private _location: Location, private toast: ToastService) { }

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: FileItem, form: any) => {
      form.append('devCode', this.code);
      form.append('sDate', this.needAnalysis.startDate);
      form.append('eDate', this.needAnalysis.endDate);
      form.append('organizationList', JSON.stringify(this.needAnalysis.organisationList));
    };


    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status == 201) {
        this.toast?.success("FileUpload: successfully");
        this.uploader.clearQueue();
      } else if (status == 500) {
        this.toast?.error("Failed upload file");
      } else {
        this.toast?.error("Failed upload");
      }
    };
  }

  close() {
    this.router.navigate(['/home']);
  }
  removeFile(item: any) {
    this.uploader.removeFromQueue(item);
  }
  backClicked() {
    this._location.back();
  }

  submitInfo(item: any) {
    this.uploader.uploadAll();
  }

}
