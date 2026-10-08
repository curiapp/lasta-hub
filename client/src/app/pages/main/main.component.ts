import { Location } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { NotificationComponent } from "../../components/page/notification/notification.component";
import { ProfileComponent } from "../../components/page/profile/profile.component";
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingService } from '../../services/loading.service';
import { User } from '../../types';

@Component({
  selector: 'client-main',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NotificationComponent, ProfileComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  title = 'PDU - Home'
  currentYear: number = new Date().getFullYear();
  hasScrolled = false;
  user: User;
  auth = inject(AuthenticationService);
  router = inject(Router);
  _location = inject(Location);
  _loading = inject(LoadingService);
  activatedRoute = inject(ActivatedRoute);
  titleService = inject(Title);


  ngOnInit() {
    const appTitle = this.titleService.getTitle();
    this.user = this.auth.user;
    this.updateScrollState();

    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
        this.updateScrollState();
      });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.updateScrollState();
  }

  get isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  get isPdqa() {
    return String(this.user?.role ?? '').trim().toLowerCase() === 'pdqa';
  }

  get isGuestHome() {
    const url = this.router.url.split('?')[0].split('#')[0];
    return !this.isLoggedIn && url === '/';
  }

  private updateScrollState() {
    this.hasScrolled = typeof window !== 'undefined' && window.scrollY > 24;
  }

}
