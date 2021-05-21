import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'local-app';
  username: string;
  faculty: string;
  department: string;

  constructor(private _location: Location) {


  }
  loggedIn() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) {
      return false;
    } else {
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
