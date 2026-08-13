import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'client-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @ViewChild('confirmDialog') private readonly confirmDialog?: ElementRef<HTMLDialogElement>;

  @Input() action: 'edit' | 'delete' | 'accept' | 'view' = 'edit';
  @Input() message: string = 'confirm';

  @Output() onConfirm = new EventEmitter<string>();
  @Output() onClose = new EventEmitter<void>();

  get title() {
    return this.action === 'delete' ? 'Delete item'
      : this.action === 'accept' ? 'Confirm action'
      : this.action === 'view' ? 'View item'
      : 'Confirm changes';
  }

  get icon() {
    return this.action === 'delete' ? 'delete'
      : this.action === 'accept' ? 'check_circle'
      : this.action === 'view' ? 'visibility'
      : 'edit';
  }

  confirm() {
    this.onConfirm.emit("confirmed");
    this.confirmDialog?.nativeElement.close();
  }

  ngAfterViewInit() {
    this.confirmDialog?.nativeElement.showModal();
  }

  closed() {
    this.onClose.emit();
  }

}
