import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'client-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {

  @Input() action: 'edit' | 'delete' | 'accept' | 'view' = 'edit';
  @Input() message: string = 'confirm';

  @Output() onConfirm = new EventEmitter<string>();

  confirm() {
    this.onConfirm.emit("confirmed");
    const dialog: any = document.getElementById('confirm_modal');
    dialog?.close();
  }

  ngOnInit() {
    console.log("Testing");
    const dialog: any = document.getElementById('confirm_modal');
    dialog?.showModal();
  }

}
