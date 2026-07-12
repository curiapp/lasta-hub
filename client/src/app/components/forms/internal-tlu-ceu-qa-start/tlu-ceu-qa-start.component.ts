import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from "../../files/file-upload/file-upload.component";

type Form = {
  date: Date;
  recommendedTo: string[];
  includesWilComponent: boolean;
}

@Component({
  selector: 'tlu-ceu-qa-start',
  templateUrl: 'tlu-ceu-qa-start.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [FormsModule, FileUploadModule, FileUploadComponent]
})
export class TLUCEUQAStartComponent {
  url = `${environment.apiUrl}/reviews/start`;
  @Input() pid: string;
  @ViewChild(FileUploadComponent) fileUpload: FileUploadComponent;
  model: Form = {
    date: new Date(),
    recommendedTo: [],
    includesWilComponent: false
  };

  onUpload() {
    this.fileUpload.onUpload({ ...this.model });
  }

  onChecked(event: Event) {
    const isChecked = (event.target as HTMLInputElement).value
    if (this.model.recommendedTo.includes(isChecked)) {
      var index = this.model.recommendedTo.indexOf(isChecked);
      this.model.recommendedTo.splice(index, 1)
    } else
      this.model.recommendedTo.push(isChecked)
  }
}
