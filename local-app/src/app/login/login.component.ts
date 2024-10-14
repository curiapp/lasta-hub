import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {UserAuthenticationService} from '../services/authentication.service';
//import { triggerAsyncId } from 'async_hooks';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }

  model: any = {};
    returnUrl: string;

    constructor(private router: Router, private route: ActivatedRoute, private authService:UserAuthenticationService,
        private _location:Location) {}

    onSubmit() {
        console.log("started auth services")
        this.authService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    console.log('Hi I am here'+data);
                    alert("You have successfully logged in");
                    this.router.navigate(['/home']);
                    //this.router.navigate([this.returnUrl]);
                },
                error => {
                  if (Number.parseInt(status)> 500){
                    alert("Please make sure your password and username are correct");
                  }
                  else if (Number.parseInt(status) === 400){
                    alert("Invalid input format ");

                  }
                  else if (Number.parseInt(status) === 500){
                    alert("Internal server error");

                  }
                  else{


                    alert("Make sure your login details are correct and you are connected to the network");
                  }



                        //alert('Error ' + error);




                });
    }
    close() {
        console.log("closing the window...");
        this.model.username = "username";
        this.model.password = "password";
        //this.router.navigate(['/home']);
        this._location.back();
    }
}
