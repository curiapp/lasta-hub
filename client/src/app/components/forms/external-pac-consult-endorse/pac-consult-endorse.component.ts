import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'external-pac-consult-endorse',
  templateUrl: 'pac-consult-endorse.component.html',
  imports: [FormsModule, FileUploadComponent]
})
export class PacConsultEndorseComponent {
  url = `${environment.apiUrl}/consultations/pac/consult`;
  model: any = {};
  consultationDate: Date;
  private fileMap = new Map();
  @Input() code: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ date: this.model.consultationDate, decision });
  }

}
