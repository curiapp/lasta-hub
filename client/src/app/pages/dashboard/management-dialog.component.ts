import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'management-dialog',
  template: `
    <dialog #dialog class="modal" [attr.aria-label]="title" (close)="closed.emit()" (cancel)="onCancel($event)">
      <div class="modal-box w-11/12 max-w-3xl border border-base-300 p-5">
        <header class="mb-5 flex items-center justify-between gap-3">
          <h2 class="text-lg font-bold">{{ title }}</h2>
          <button type="button" class="btn btn-sm btn-circle btn-ghost" aria-label="Close dialog" [disabled]="busy" (click)="dialog.close()">
            <span class="material-symbols-rounded" aria-hidden="true">close</span>
          </button>
        </header>
        <ng-content />
      </div>
      <form method="dialog" class="modal-backdrop"><button [disabled]="busy" aria-label="Close dialog">Close</button></form>
    </dialog>
  `,
})
export class ManagementDialogComponent implements AfterViewInit, OnDestroy {
  @Input() title = '';
  @Input() busy = false;
  @Output() closed = new EventEmitter<void>();
  @ViewChild('dialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;
  ngAfterViewInit() { this.dialog.nativeElement.showModal(); }
  ngOnDestroy() { this.dialog.nativeElement.close(); }
  onCancel(event: Event) { if (this.busy) event.preventDefault(); }
}
