import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseDueForReviewComponent } from "../course-due-for-review/course-due-for-review.component";
import { CourseInProgressComponent } from "../course-in-progress/course-in-progress.component";
import { CourseRecentlyApprovedComponent } from "../course-recently-approved/course-recently-approved.component";
import { programmes } from '../static';
import { Programme } from '../types';
import { ProgrammeTableComponent } from '../programme-table/programme-table.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterModule, FormsModule, CourseDueForReviewComponent, CourseInProgressComponent, CourseRecentlyApprovedComponent, ProgrammeTableComponent]
})
export class HomeComponent implements OnInit {
  username: string;
  faculty: string;
  department: string;
  dates: { day: string, date: string, dayOfMonth: string }[] = [];
  today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  programmes: Programme[] = programmes;
  programme: string;
  greetingMessage: string = '';
  programmeTools: string[] = ["Need Analysis Decision", "Programme Development Decision", "External Stakeholders Consultation Decision", "Internal Stakeholders Consultation Decision"];
  user: string;
  showAll = false;
  currentUser: any

  constructor() { }

  toggleView() {
    this.showAll = !this.showAll;
    this.updateDisplayedPrograms();
  }

  updateDisplayedPrograms() {
    if (this.showAll) {
      this.programmes = [...programmes];
    } else {
      this.programmes = programmes.slice(0, 10);
    }
  }

  ngOnInit() {
    this.greetingMessage = this.getGreeting();
    this.dates = this.generateNext7Days()
    this.updateDisplayedPrograms();
    this.loggedIn();
  }

  changed(event) {
    this.programme = event;
  }
  loggedIn() {
    let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    console.log(currentUser);

    if (currentUser) {
      this.currentUser = currentUser;
    } else {
      this.currentUser = null;
    }
  }

  getGreeting(): string {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
      return 'Good Morning!';
    } else if (hours < 18) {
      return 'Good Afternoon!';
    } else {
      return 'Good Evening!';
    }
  }

  generateNext7Days() {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);

      const dayOfWeek = nextDay.toLocaleDateString('en-US', { weekday: 'short' });
      const dayOfMonth = nextDay.getDate();
      const formattedDate = nextDay.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

      dates.push({
        day: dayOfWeek,
        dayOfMonth: dayOfMonth,
        date: formattedDate,
      });
    }

    return dates;
  }

  upComingEvents = [
    {
      "id": "event-1",
      "title": "Programme Review Workshop: Computer Science Curriculum",
      "date": "2025-03-15",
      "location": "Faculty of Computing, Room 201",
      "description": "Collaborative workshop to review and update the Computer Science undergraduate curriculum based on industry trends and student feedback.",
      "category": "Programme Review"
    },
    {
      "id": "event-2",
      "title": "Progress Meeting: Engineering Programme Accreditation",
      "date": "2025-03-28",
      "location": "Faculty of Engineering, Dean's Office",
      "description": "Progress meeting to discuss the status of documentation and preparations for the upcoming engineering programme accreditation visit.",
      "category": "Programme Progress"
    },
    {
      "id": "event-3",
      "title": "Faculty-Wide Programme Review Training",
      "date": "2025-03-05",
      "location": "University Main Auditorium",
      "description": "Training session for all faculty members on the new programme review guidelines and best practices for conducting effective reviews.",
      "category": "Programme Review"
    }
  ]
}
