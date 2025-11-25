import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, ElementRef, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { FileItem, FileUploader, FileUploadModule } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { FilePipe } from "../../../pipes/file.pipe";
import { FileExtensionPipe } from "../../../pipes/file-extension.pipe";
import { ToastService } from '../../../services/toast.service';
import { environment } from '../../../../environments/environment';
import { ModalControlService } from '../../../services/modal-control.service';

@Component({
  selector: 'need-analysis-consult',
  templateUrl: 'need-analysis-consult.component.html',
  imports: [FormsModule, FileUploadModule, FilePipe, FileExtensionPipe]
})
export class NeedAnalysisConsultationComponent implements OnInit {
  url = `${environment.apiUrl}/need-analysis/consult`;
  @Input() pid: string;
  toast = inject(ToastService);
  modalControl = inject(ModalControlService);
  isStakeholderShown = signal(false);
  isShown = signal(false);

  constructor(private router: Router, private _location: Location) { }

  toggleAdd() {
    this.isStakeholderShown.update((isShown) => !isShown);
  }

  toggle() {
    this.isShown.update((isShown) => !isShown);
  }

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
    itemAlias: 'files',
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


  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: FileItem, form: any) => {
      form.append('programmeId', this.pid);
      form.append('startDate', this.needAnalysis.startDate);
      form.append('endDate', this.needAnalysis.endDate);
      form.append('organizations', JSON.stringify(this.needAnalysis.organisationList));
    };


    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 201 || status === 200) {
        const res = JSON.parse(response);
        this.toast?.success(res?.message);
        this.uploader.clearQueue();
        this.modalControl.close();
      } else if (status == 500) {
        this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
        this.modalControl.close();
      } else {
        this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
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
