import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadMultipleComponent } from '../../files/file-upload-multiple/file-upload-multiple.component';

@Component({
  selector: 'nqa-preparation',
  templateUrl: 'nqa-preparation.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, FileUploadModule, FileUploadMultipleComponent]
})
export class NqaPreparationComponent {
  url = `${environment.apiUrl}/nqa/preparation`;
  @Input() pid: string;
  fileTypeList = ["", "Final Senate Approved Document", "NQF Qualification Document", "Review Report", "Rationale Statement", "Letters of Supports", "Benchmarking"];
  @ViewChild(FileUploadMultipleComponent) fileUpload: FileUploadMultipleComponent;

  onUpload() {
  this.fileUpload?.onUpload({});
  }

}
