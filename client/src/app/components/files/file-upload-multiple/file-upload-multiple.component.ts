import { Component, inject, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { objectToFormData } from '../../../functions';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';
import { FileIconComponent } from "../../file-icon/file-icon.component";

@Component({
  selector: 'file-upload-multiple',
  imports: [FormsModule, FileUploadModule, FileIconComponent],
  templateUrl: './file-upload-multiple.component.html',
  styleUrl: './file-upload-multiple.component.css'
})
export class FileUploadMultipleComponent {
  @Input() pid: string;
  @Input() url = "";
  @Input() fileTypeList: string[] = [];
  documentType = "";
  selectedFiles: { documentType: string; fileName: string }[] = [];
  formData: any = {};
  uploader: FileUploader;
  isAttachShown = signal(true);
  modalControl = inject(ModalControlService);
  toast = inject(ToastService);
  apollo = inject(Apollo);

  toggle() {
    this.isAttachShown.update((isShown) => !isShown);
  }

  addFile() {
    let end = this.uploader.queue.length;
    this.selectedFiles.push({ documentType: this.documentType, fileName: this.uploader.queue[end - 1].file.name });
    let removeType = this.fileTypeList.indexOf(this.documentType.toString());
    this.fileTypeList.splice(removeType, 1);
    this.documentType = "";
  }

  removeFile(name: any, type: string) {
    this.fileTypeList.push(type);
    this.uploader.queue.forEach(element => {
      if (element.file.name == name) {
        this.uploader.removeFromQueue(element);
        this.selectedFiles = this.selectedFiles.filter((item) => item.fileName !== name);
      }
    });
    this.documentType = "";
  }

  onUpload(data) {
    this.formData = data;
    this.uploader.uploadAll();
    this.fileTypeList = [...this.fileTypeList, ...this.selectedFiles.map(item => item.documentType)];
  }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: this.url,
      method: 'POST',
      itemAlias: 'files',
      headers: [
        { name: 'Authorization', value: 'Bearer YOUR_TOKEN' }, // If using JWT authentication
        { name: 'X-Requested-With', value: 'XMLHttpRequest' },
      ],
      allowedFileType: ['image', 'pdf', 'doc', 'csv', 'txt', 'xls', 'ppt'],
      maxFileSize: 5 * 1024 * 1024, // 5MB,
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBeforeUploadItem = (file) => { file.withCredentials = false; };

    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('programmeId', this.pid);
      form.append('documentType', JSON.stringify(Object.fromEntries(this.selectedFiles.map(x => [x.documentType.toLowerCase().replace(" ", "-"), x.fileName]))));
      form.append('files', item._file);
      objectToFormData(this.formData, form);
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status === 201 || status === 200) {
        const res = JSON.parse(response);
        this.uploader.clearQueue();
        this.toast?.success(res?.message);
        this.modalControl.close();
        this.apollo.client.refetchQueries({
          include: ['GetProgrammePhase']
        });
      } else if (status == 500) {
        this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
        this.modalControl.close();
      } else {
        this.toast?.error("Oops! We couldn’t upload your file. Please try again.");
      }
    };
  }

}
