import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, RouterLink]
})
export class LoginComponent {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private _location: Location
  ) { }

  model: { username: string, password: string } = {
    username: '',
    password: ''
  };
  isLoadig: boolean;
  message: string;
  private _loading = inject(LoadingService);
  isLoading = this?._loading.isLoading;

  onSubmit() {
    this.authService.login(this.model)
      .subscribe(
        {
          next: (data) => {
            console.log('Hi I am here', data);
            sessionStorage.setItem('loggedInUser', JSON.stringify(data));
            this.router.navigate(['/home']);
          },
          error: (error: any) => {
            this.message = "Invalid username or password";
          }
        }
      );

  }

  close() {
    console.log("closing the window...");
    this.model.username = "username";
    this.model.password = "password";
    //this.router.navigate(['/home']);
    this._location.back();
  }
}
