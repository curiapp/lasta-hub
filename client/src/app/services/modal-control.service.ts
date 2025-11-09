import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalControlService {
  private closeFn?: () => void;

  register(closeFn: () => void) {
    this.closeFn = closeFn;
  }

  close() {
    this.closeFn?.();
  }
}
