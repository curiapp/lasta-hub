import { Component, Input } from '@angular/core';

@Component({
  selector: 'client-confirm-modal',
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {

  @Input() action: 'edit' | 'delete' | 'accept' | 'view' = 'edit';
  @Input() message: string = 'confirm';

  ngOnInit() {
    console.log("Testing");
    const dialog: any = document.getElementById('confirm_modal');
    dialog?.showModal();
  }

}
