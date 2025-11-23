import { AfterViewInit, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
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
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  sizes = { sm: 'w-11/12 max-w-5xl', md: '', lg: 'w-6/12', xl: 'w-10/12' };

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
