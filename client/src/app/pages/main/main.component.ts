import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
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
      });
  }

}
