import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { ClientService } from '../../services/client.service';
import { ToastService } from '../../services/toast.service';
import { Apollo } from 'apollo-angular';
import { AuthenticationService } from '../../services/authentication.service';

type TargetType = { id: string; name: string; type?: string };

@Component({
  selector: 'action-buttons',
  imports: [],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.css'
})
export class ActionButtonsComponent {
  // @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;
  @Input() actions = [];
  @Input() target: TargetType = { name: '', id: '' };
  viewContainer = inject(ViewContainerRef);
  http = inject(ClientService);
  toast = inject(ToastService);
  apollo = inject(Apollo);
  auth = inject(AuthenticationService);
  deleting = false;

  onDelete() {
    const componentRef = this.viewContainer.createComponent(ConfirmModalComponent);
    componentRef.instance.action = "delete"
    componentRef.instance.message = "Are you sure you want to delete this item?";
    componentRef.instance.onClose.subscribe(() => {
      if (!componentRef.hostView.destroyed) componentRef.destroy();
    });

    componentRef.instance.onConfirm.subscribe((res) => {
      if (res === "confirmed" && this.target?.type === "programme") {
        this.deleting = true;
        this.http.delete(`programmes/${this.target.id}?actorId=${encodeURIComponent(this.auth.user?.id ?? '')}`).subscribe({
          next: data => {
            this.deleting = false;
            this.toast.success(data?.message || "Item deleted successfully");
            this.apollo.client.refetchQueries({
              include: ['GetProgrammes', 'GetBootstrap']
            });
            if (!componentRef.hostView.destroyed) componentRef.destroy();
          },
          error: error => {
            this.deleting = false;
            this.toast.error(error?.error?.message || error?.message || "Deletion failed. Please try again.");
            if (!componentRef.hostView.destroyed) componentRef.destroy();
          }
        })
      } else {
        if (!componentRef.hostView.destroyed) componentRef.destroy();
      }
    });
  }

  onDownload() {
    this.http.downloadFile<Blob>(`download/${this.target.id}`).subscribe({
      next: data => {
        const url = window.URL.createObjectURL(data as unknown as Blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.target.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: error => {
        this.toast.error(`Download failed. Please try again.`);
      }
    })
  }
}
