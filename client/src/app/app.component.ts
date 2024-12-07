import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, RouterLink, RouterLinkActive]
})
export class AppComponent {
  title = 'PDU - Home'
  username: string;
  faculty: string;
  department: string;

  currentYear: number = new Date().getFullYear();
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
  }
  loggedIn() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) {
      return false;
    } else {
      console.log("INSIDE HERE");
      this.username = currentUser.usrUnit.username;
      this.faculty = currentUser.usrUnit.faculty;
      this.department = currentUser.usrUnit.department;
      return true;
    }
  }
  extractUserDetails() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.usrUnit.username;
    this.faculty = currentUser.usrUnit.faculty;
    this.department = currentUser.usrUnit.department;
    console.log(localStorage.getItem("currentUser"));
  }
  logout() {
    console.log("User ..", JSON.parse(localStorage.getItem('currentUser')));
    localStorage.removeItem('currentUser');
  }
  isActive(path) {
    console.log(this._location);
    return this._location.path().indexOf(path) > -1;
  }
  goBack() {
    this._location.back();
  }
}
