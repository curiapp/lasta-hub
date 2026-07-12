import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../files/file-upload/file-upload.component';

@Component({
  selector: 'external-pac-consult-endorse',
  templateUrl: 'pac-consult-endorse.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, FileUploadComponent]
})
export class PacConsultEndorseComponent {
  url = `${environment.apiUrl}/consultations/pac/final-draft`;
  model: any = {};
  consultationDate: Date;
  @Input() pid: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;

  onUpload(decision: string = "") {
    this.fileUpload.onUpload({ date: this.model.consultationDate, decision });
  }

}
