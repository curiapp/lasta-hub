import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ModalControlService } from '../../services/modal-control.service';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('dialog', { static: true }) dialogRef!: ElementRef<HTMLDialogElement>;
  modalControl = inject(ModalControlService);

  open() {
    this.dialogRef.nativeElement.showModal();
  }

  close() {
    this.dialogRef.nativeElement.close();
  }

  ngAfterViewInit() {
    this.modalControl.register(() => this.close());
  }

}
