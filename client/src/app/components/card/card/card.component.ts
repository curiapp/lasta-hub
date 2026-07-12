import { Component, inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActionButtonsComponent } from "../../action-buttons/action-buttons.component";
import { CardLoaderComponent } from "../../loaders/card-loader/card-loader.component";
import { ClientService } from '../../../services/client.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'card',
  imports: [CardLoaderComponent],
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title;
  @Input() descriptions = [];
  @Input() documents = [];
  @Input() loading = false;
  http = inject(ClientService);
  toast = inject(ToastService);



  onDownload(name: string, id: string) {

    console.log("Test name, ", name, id);

    this.http.downloadFile<Blob>(`download/${id}`).subscribe({
      next: data => {
        const url = window.URL.createObjectURL(data as unknown as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: error => {
        this.toast.error(`Error HTTP Post Service`);
      }
    })
  }
}
