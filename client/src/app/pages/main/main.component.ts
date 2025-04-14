import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ShortSummaryService } from '../../services/short-summary.service';

@Component({
  selector: 'client-main',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  providers: [ShortSummaryService],
})
export class MainComponent {
  title = 'PDU - Home'
  currentYear: number = new Date().getFullYear();
  currentUser: any;

  constructor(private _location: Location, private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
  }
  ngOnInit() {
    const appTitle = this.titleService.getTitle();
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
    this.loggedIn();
  }
  loggedIn() {
    let currentUser = JSON.parse(sessionStorage?.getItem('loggedInUser'));
    if (currentUser == null) {
      this.currentUser = null;
    } else {
      this.currentUser = currentUser;
    }
  }
  logout() {
    // console.log("User ..", JSON.parse(sessionStorage.getItem('loggedInUser')));
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(["/home"])
    window.location.reload();
  }

  isActive(path) {
    // console.log(this._location);
    return this._location.path().indexOf(path) > -1;
  }
  goBack() {
    this._location.back();
  }
}
