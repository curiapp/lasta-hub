import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements AfterViewInit, OnDestroy {
  private readonly scrollKey = 'pdqa-about-us-scroll-y';
  private readonly isBrowser: boolean;
  private restoreTimers: number[] = [];

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    const savedPosition = Number(sessionStorage.getItem(this.scrollKey) || 0);
    if (!savedPosition) return;

    [0, 120, 320, 700].forEach((delay) => {
      const timer = window.setTimeout(() => {
        window.scrollTo({ top: savedPosition, behavior: 'auto' });
      }, delay);
      this.restoreTimers.push(timer);
    });
  }

  ngOnDestroy() {
    if (!this.isBrowser) return;
    this.saveScrollPosition();
    this.restoreTimers.forEach((timer) => window.clearTimeout(timer));
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.saveScrollPosition();
  }

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    this.saveScrollPosition();
  }

  private saveScrollPosition() {
    if (!this.isBrowser) return;
    sessionStorage.setItem(this.scrollKey, String(window.scrollY));
  }
}
