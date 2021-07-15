//import files from the angular framework
import {Component,Inject } from '@angular/core';
import {Location} from '@angular/common';
import {Router, ActivatedRoute} from '@angular/router';
import {UserAuthenticationService} from '../_services/authentication.service';


@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent {
    model: any = {};
    returnUrl: string;

    constructor(private router: Router, private route: ActivatedRoute, @Inject private authService:UserAuthenticationService,
        private _location:Location) {}

    onSubmit() {
        this.authService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    console.log('Hi I am here'+data);
                    this.router.navigate(['/home']);
                    //this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log('check the console');
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
