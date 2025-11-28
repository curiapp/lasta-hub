import { Router, ActivatedRoute } from '@angular/router';
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input, inject } from '@angular/core';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { HttpClient as Http } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'consultation-apc-recommend',
  templateUrl: 'apc-recommend.component.html',
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class ApcRecommendComponent implements OnInit {
  url = `${environment.apiUrl}/bos-senate/apc-recommend`;
  model: any = {};
  @Input() pid: string;
  decision: string;
  consultationDate: Date;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;
  public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'apc-recommendation' });
  @ViewChild('selectedFile') selectedFile: any;
  modalControl = inject(ModalControlService);
  toast = inject(ToastService);

  clear() {
    this.model.programmeCode = "";
    this.model.ConsultationDate = null;
    this.selectedFile.nativeElement.value = '';
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
  }
  updateFile() {
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
    for (var i = 0; i < this.uploader.queue.length; i++) {
      if (i != 0)
        (<HTMLInputElement>document.getElementById("file-name")).value += " ; " + this.uploader.queue[i].file.name;
      else
        (<HTMLInputElement>document.getElementById("file-name")).value = this.uploader.queue[i].file.name;
      console.log(this.uploader.queue[i].file.name);
    }
  }

  setDecission(dec: string) {
    this.decision = dec;
    console.log(this.decision);
  }
  removefile() {
    (<HTMLInputElement>document.getElementById("file-name")).value = "";
  }

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({
      date: this.model.consultationDate,
      decision: decision
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('programmeId', this.pid);
      form.append('decision', this.decision);
      form.append('date', this.model.consultationDate);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 201 || status === 200) {
        const res = JSON.parse(response);
        this.toast?.success(res?.message);
        this.uploader.clearQueue();
        this.modalControl.close();
      } else if (status == 500) {
        this.toast?.error("Failed upload file");
        this.modalControl.close();
      }
    };
  }

}
