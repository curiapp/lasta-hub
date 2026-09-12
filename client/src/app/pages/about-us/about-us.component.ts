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

  teamMembers = [
    {
      name: "Dr COLEN TUAUNDU",
      role: "Director",
      image: "assets/images/staff/Dr-Colen-Tuaundu.png",
      email: "ctuaundu@nust.na",
      office: "Office: 405A PDU Building",
      phone: "+264612070000"
    },
    {
      name: "ESTER JOHANNES",
      role: "Senior Programme Development Coordinator",
      image: "assets/images/staff/Ms-Ester-Johannes.png",
      email: "ejohannes@nust.na",
      office: "Office: 118 PDU Building",
      phone: "+264612070000"
    },
    {
      name: "LUSIA SHIKONGO",
      role: "Programme Development Coordinator",
      image: "assets/images/staff/lusia-shikongo.png",
      email: "lshikongo@nust.na",
      office: "Office: 305 PDU Building",
      phone: "+264612070000"
    },
    {
      name: "OLIVIA ITENGE",
      role: "Programme Development Coordinator",
      image: "assets/images/staff/olivia-itenge.jpg",
      email: "oitenge@nust.na",
      office: "Office: 105X PDU Building",
      phone: "+264612070000"
    },
    {
      name: "CHRISTINE AITANA",
      role: "Office Administrator",
      image: "assets/images/staff/Ms-Christine-Aitana.png",
      email: "caitana@nust.na",
      office: "Office: 895.2 PDU Building",
      phone: "+264612070000"
    },

  ];

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
