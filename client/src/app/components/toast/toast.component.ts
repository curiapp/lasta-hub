import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  toastService = inject(ToastService);
  url = {
    success:"/assets/face.svg",
    info:"/assets/exclamation-point.svg",
    error:"/assets/circled-x.svg",
    warning:"/assets/balloon.svg",
  }

  close = (id: string) => {
    this.toastService.remove(id)
  };

}
