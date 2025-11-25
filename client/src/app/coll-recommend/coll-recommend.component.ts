import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { ModalControlService } from '../services/modal-control.service';
import { ToastService } from '../services/toast.service';

@Component({
  //define the element to be selected from the html structure.
  selector: 'coll-recommend',
  templateUrl: 'coll-recommend.component.html',
  imports: [FormsModule, FileUploadModule]
})
export class COLLRecommendComponent implements OnInit {
  url = `${environment.apiUrl}/reviews/recommend`;
  model: any = {};
  @Input() pid: String;
  decision: String;
  modalControl = inject(ModalControlService);

  public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: 'file' });

  constructor(private router: Router, private _location: Location, private toast: ToastService) { }

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('programmeId', this.model.programmeCode);
      form.append('decision', this.decision);
      form.append('reviewUnit', "COLL");
    };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
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

  @ViewChild('selectedFile') selectedFile: any;
  clear() {
    this.model.programmeCode = "";
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


}
