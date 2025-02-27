import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseDueForReviewComponent } from "../course-due-for-review/course-due-for-review.component";
import { CourseInProgressComponent } from "../course-in-progress/course-in-progress.component";
import { CourseRecentlyApprovedComponent } from "../course-recently-approved/course-recently-approved.component";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [RouterModule, FormsModule, CourseDueForReviewComponent, CourseInProgressComponent, CourseRecentlyApprovedComponent]
})
export class HomeComponent implements OnInit {
  username: string;
  faculty: string;
  department: string;
  dates: { day: string, date: string, dayOfMonth: string }[] = [];
  today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  programmes = [
    {
      "name": "Project Phoenix",
      "stage": "Active",
      "members": [
        "Alice Johnson",
        "Bob Williams",
        "Charlie Davis"
      ],
      "description": "Develop a new cloud-based platform for data analytics.",
      "created_date": "2023-10-26",
      "actions": ["Review Code", "Deploy to Test", "Schedule Meeting"]
    },
    {
      "name": "Operation Evergreen",
      "stage": "Completed",
      "members": [
        "David Smith",
        "Eve Brown"
      ],
      "description": "Migrate legacy systems to a modern infrastructure.",
      "created_date": "2022-05-15",
      "actions": ["Archive Project", "Generate Report"]
    },
    {
      "name": "Innovation Lab",
      "stage": "In Development",
      "members": [
        "Frank Miller",
        "Grace Wilson",
        "Henry Moore",
        "Ivy Taylor"
      ],
      "description": "Research and develop cutting-edge AI technologies.",
      "created_date": "2024-01-03",
      "actions": ["Conduct Research", "Prototype Design", "Run Experiments"]
    },
    {
      "name": "Client Portal Revamp",
      "stage": "On Hold",
      "members": [
        "Jack Anderson",
        "Kelly Thomas"
      ],
      "description": "Redesign the client portal for improved user experience.",
      "created_date": "2023-08-10",
      "actions": ["Reschedule Planning", "Reallocate Resources"]
    },
    {
      "name": "Security Enhancement Initiative",
      "stage": "Need Analysis",
      "members": [
        "Liam Jackson",
        "Mia White",
        "Noah Harris"
      ],
      "description": "Strengthen security measures across all platforms.",
      "created_date": "2023-11-22",
      "actions": ["Gather Requirements", "Conduct Risk Assessment", "Interview Stakeholders"]
    },
    {
      "name": "Mobile App Launch",
      "stage": "Planned",
      "members": [
        "Olivia Martin",
        "Peter Thompson"
      ],
      "description": "Launch a new mobile application for our services.",
      "created_date": "2024-03-01",
      "actions": ["Market Research", "Design UI/UX", "Develop MVP"]
    }
  ];
  programme: string;
  greetingMessage: string = '';



  constructor() { }

  ngOnInit() {
    this.greetingMessage = this.getGreeting();
    this.dates = this.generateNext7Days()
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
}
