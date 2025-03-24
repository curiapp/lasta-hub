import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  messages: string[] = [];
  type: string;
  classes = "";
  show(message: string, type?: string) {
    // switch (type) {
    //   case 'success':
    //     this.classes = "alert-success text-white";
    //     break;
    //   case 'error':
    //     this.classes = "alert-danger text-white";
    //     break;
    //   case 'info':
    //     this.classes = "alert-info text-white";
    //     break;
    //   case 'warning':
    //     this.classes = "alert-warning text-white";
    //     break;
    //   default:
    //     this.classes = "bg-primary text-black";
    //     break;
    // }
    this.messages.push(message);
  }

  clear(value: string) {
    this.messages = this.messages.filter(message => message !== value);
  }

  clearAll(){
    this.messages = [];
  }

  error(message: string) {
    this.show(message, 'error');
  }

  success(message: string) {
    this.show(message, 'success');
  }
  info(message: string) {
    this.show(message, 'info');
  }
  warning(message: string) {
    this.show(message, 'warning');
  }

}
