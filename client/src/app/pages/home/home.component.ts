import { Component, OnInit } from '@angular/core';
import { User } from '../../types';
import { HomeAuthenticatedComponent } from './components/home-authenticated/home-authenticated.component';
import { HomeGuestComponent } from './components/home-guest/home-guest.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [HomeGuestComponent, HomeAuthenticatedComponent],
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;

  ngOnInit() {
    this.currentUser = this.readLoggedInUser();
  }

  private readLoggedInUser(): User | null {
    if (typeof sessionStorage === 'undefined') return null;
    try {
      const raw = sessionStorage.getItem('loggedInUser');
      return raw ? JSON.parse(raw) as User : null;
    } catch {
      return null;
    }
  }
}
