import { Location } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { FileItem, FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileExtensionPipe } from "../../../pipes/file-extension.pipe";
import { FilePipe } from "../../../pipes/file.pipe";
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';

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
  apollo = inject(Apollo);


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
    stakeholder: { name: string, organisation: string };
  } = {
      startDate: new Date(),
      endDate: new Date(),
      stakeholder: { name: '', organisation: '' },
    }

  stakeholders: { name: string, organisation: string }[] = []

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
    this.stakeholders.push(this.needAnalysis.stakeholder);
    this.needAnalysis.stakeholder = { name: '', organisation: '' };
  }

  removeOrganisation(value: string) {
    this.stakeholders = this.stakeholders.filter((item) => item.organisation !== value);
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: FileItem, form: any) => {
      form.append('programmeId', this.pid);
      form.append('startDate', this.needAnalysis.startDate);
      form.append('endDate', this.needAnalysis.endDate);
      form.append('organizations', JSON.stringify(this.stakeholders));
      form.append('files', item._file);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 201 || status === 200) {
        const res = JSON.parse(response);
        this.modalControl.close();
        this.uploader.clearQueue();
        this.toast?.success(res?.message);

        this.apollo.client.refetchQueries({
          include: ['GetProgrammePhase']
        });

      } else if (status == 500) {
        this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
        this.modalControl.close();
      } else {
        this.modalControl.close();
        this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
      }
    };
  }

  removeFile(item: any) {
    this.uploader.removeFromQueue(item);
  }

  uploadAll(item: any) {
    this.uploader.uploadAll();
  }

}
