import { Component, inject, Input } from '@angular/core';
import { User } from '../../../types';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  @Input() user: User;
  auth = inject(AuthenticationService);
}
