import { Component, ViewContainerRef } from '@angular/core';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'action-buttons',
  imports: [],
  templateUrl: './action-buttons.component.html',
  styleUrl: './action-buttons.component.scss'
})
export class ActionButtonsComponent {
  // @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  constructor(private viewContainer: ViewContainerRef) { }
  onDelete() {
    console.log("onDelete");
    const componentRef = this.viewContainer.createComponent(ConfirmModalComponent);
    componentRef.instance.action =  "delete"
    componentRef.instance.message = "Are you sure you want to delete this item?";
  }
}
