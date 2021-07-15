import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string;
  faculty: string;
  department: string;
  constructor() { }

  ngOnInit() {
    console.log("starting ...");
  }

  // loggedIn() {
  //   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   if (currentUser == null) {
  //     return false;
  //   } else {
  //     this.username = currentUser.username;
  //     this.faculty = currentUser.faculty;
  //     this.department = currentUser.department;
  //     return true;
  //   }
  // }
}
