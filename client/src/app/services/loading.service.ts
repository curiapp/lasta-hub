import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = signal(false);

  setLoading(isLoading: boolean) {
    this.isLoading.set(isLoading);
  }

}
