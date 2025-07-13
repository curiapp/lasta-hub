import { Component, Input } from '@angular/core';
import { FileExtensionPipe } from "../../pipes/file-extension.pipe";

@Component({
  selector: 'file-icon',
  imports: [FileExtensionPipe],
  templateUrl: './file-icon.component.html',
  styleUrl: './file-icon.component.scss'
})
export class FileIconComponent {
  @Input() fileName: string;
}
