import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { ClientService } from '../../services/client.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'action-buttons',
  imports: [],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css'
})
export class ActionButtonsComponent {
  // @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;
  @Input() actions = [];
  @Input() fileId = { name: '', id: '' };
  viewContainer = inject(ViewContainerRef);
  http = inject(ClientService);
  toast = inject(ToastService);

  onDelete() {
    console.log("onDelete");
    const componentRef = this.viewContainer.createComponent(ConfirmModalComponent);
    componentRef.instance.action = "delete"
    componentRef.instance.message = "Are you sure you want to delete this item?";
  }

  onDownload() {
    this.http.downloadFile<Blob>(`download/${this.fileId.id}`).subscribe({
      next: data => {
        const url = window.URL.createObjectURL(data as unknown as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.fileId.name;
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
