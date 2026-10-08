import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = signal(false);
  private activeRequests = 0;

  setLoading(isLoading: boolean) {
    this.activeRequests = isLoading ? Math.max(this.activeRequests, 1) : 0;
    this.isLoading.set(isLoading);
  }

  begin() {
    this.activeRequests += 1;
    this.isLoading.set(true);
  }

  end() {
    this.activeRequests = Math.max(this.activeRequests - 1, 0);
    this.isLoading.set(this.activeRequests > 0);
  }

}
