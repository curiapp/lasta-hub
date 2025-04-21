import { Injectable, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ToastMessage } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  duration = 10000;
  messages = signal<ToastMessage[]>([]);
  type: string;
  classes = "";
  add(message: string, type: string = 'info') {
    const id = uuidv4();
    this.messages.update((currentMessages) => [...currentMessages, { id, message, type }]);
    // this.removeAfterTimeout(id);
  }

  remove(id: string): void {
    this.messages.update((currentMessages) =>
      currentMessages.filter((msg) => msg.id !== id)
    );
  }

  removeAll() {
    this.messages.set([]);
  }

  error(message: string) {
    this.add(message, 'error');
  }

  success(message: string) {
    this.add(message, 'success');
  }
  info(message: string) {
    this.add(message, 'info');
  }
  warning(message: string) {
    this.add(message, 'warning');
  }

  private removeAfterTimeout(id: string): void {
    setTimeout(() => {
      this.remove(id);
    }, this.duration);
  }

}
