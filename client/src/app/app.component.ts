import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    if (!localStorage?.getItem('users')) {
      const initialUsers = [
        {
          id: '1',
          email: 'pdqa@example.com',
          password: 'password123',
          faculty: 'Faculty of Computing',
          department: 'Computer Science',
          name: 'Mr. John PDQA',
          role: 'PDQA',
        },
        {
          id: '2',
          email: 'lecturer@example.com',
          password: 'securepass',
          faculty: 'Faculty of Engineering',
          department: 'Electrical Engineering',
          name: 'Mrs. Jane Lecturer',
          role: 'LECTURER',
        },
        {
          id: '3',
          email: 'another@example.com',
          password: 'anotherpass',
          faculty: 'Faculty of Science',
          department: 'Biology',
          name: 'Mr. Bob example',
          role: 'LECTURER',
        },
        {
          id: '4',
          email: 'another2@example.com',
          password: 'anotherpass2',
          faculty: 'Faculty of Arts',
          department: 'History',
          name: 'Ms. Alice Smith',
          role: 'LECTURER',
        },
        {
          "id": "5",
          "email": "another3@example.com",
          "password": "anotherpass3",
          "faculty": "Faculty of Medicine",
          "department": "Surgery",
          "name": "Dr. David Lee",
          "role": "LECTURER"
        }
      ]
      localStorage?.setItem('users', JSON.stringify(initialUsers));
    }
  }
}
