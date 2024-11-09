import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseDueForReviewComponent } from "../course-due-for-review/course-due-for-review.component";
import { CourseInProgressComponent } from "../course-in-progress/course-in-progress.component";
import { CourseRecentlyApprovedComponent } from "../course-recently-approved/course-recently-approved.component";

@Component({
  selector: 'home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterModule, FormsModule, CourseDueForReviewComponent, CourseInProgressComponent, CourseRecentlyApprovedComponent]
})
export class HomeComponent implements OnInit {
  username: string;
  faculty: string;
  department: string;
  programmes: String[] = ['07BACS', '08BHSE', '09MSCS', '05DBMA'];
  programme: string;
  constructor() { }

  ngOnInit() {
    console.log("starting ...");
  }

  changed(event) {
    this.programme = event;
  }
  loggedIn() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser == null) {
      return false;
    } else {
      this.username = currentUser.username;
      this.faculty = currentUser.faculty;
      this.department = currentUser.department;
      return true;
    }
  }
}
