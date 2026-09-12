import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterLink]
})
export class LoginComponent {

  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthenticationService);
  _location = inject(Location);
  loadingService = inject(LoadingService);

  model: { email: string, password: string } = {
    email: '',
    password: ''
  };
  isLoadig: boolean;
  message = signal("");
  private _loading = inject(LoadingService);
  isLoading = this?._loading.isLoading;
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.message.set("");

    this.authService.login(this.model)
      .subscribe(
        {
          next: (data) => {
            sessionStorage.setItem('loggedInUser', JSON.stringify(data));
            this.router.navigate(['/']);
          },
          error: (error: any) => {
            this.message.set(error.message);
          }
        }
      );

  }

}
