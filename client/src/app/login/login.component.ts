import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UserAuthenticationService } from '../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
//import { triggerAsyncId } from 'async_hooks';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, RouterLink]
})
export class LoginComponent {

  model: { username: string, password: string } = {
    username: '',
    password: ''
  };
  returnUrl: string;
  message: string;
  loading: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private authService: UserAuthenticationService,
    private _location: Location) { }

  getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  onSubmit() {
    console.log("started auth services")
    console.log("Username ", this.model.username)
    console.log("Password ", this.model.password)
    this.loading = true;

    const count = setTimeout(() => {
      this.loading = false;

      const users = this.getUsers();

      const user = users.find(u => u.email === this.model.username && u.password === this.model.password);

      if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        this.router.navigate(['/home']);
      } else {
        this.message = 'Invalid email or password.';
      }

    }, 2000);



    // this.authService.login(this.model.username, this.model.password)
    //   .subscribe(
    //     data => {
    //       console.log('Hi I am here' + data);
    //       alert("You have successfully logged in");
    //       this.router.navigate(['/home']);
    //       //this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       if (Number.parseInt(status) > 500) {
    //         alert("Please make sure your password and username are correct");
    //       }
    //       else if (Number.parseInt(status) === 400) {
    //         alert("Invalid input format ");

    //       }
    //       else if (Number.parseInt(status) === 500) {
    //         alert("Internal server error");

    //       }
    //       else {


    //         alert("Make sure your login details are correct and you are connected to the network");
    //       }

    //       //alert('Error ' + error);
    //     });
  }
  close() {
    console.log("closing the window...");
    this.model.username = "username";
    this.model.password = "password";
    //this.router.navigate(['/home']);
    this._location.back();
  }
}
