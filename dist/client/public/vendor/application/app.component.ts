// importing files from the angular framework
import {Component} from '@angular/core';
import { Ng2Datetime } from 'ng2-datetime-picker';
import {Location} from '@angular/common';
Ng2Datetime.firstDayOfWeek = 0; //e.g. 1, or 6

// Root Component
@Component({
    moduleId: module.id,
    selector: 'pdu',
    templateUrl: 'app.component.html',
    styleUrls: ['pdu.component.css']
})

export class AppComponent{
   username:  string;
   faculty:   string;
   department:string;

    constructor(private _location: Location) {


      }

    loggedIn(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser == null) {
          return false;
        } else {
          this.username = currentUser.username;
          this.faculty=currentUser.faculty;
          this.department=currentUser.department;
          return true;
        }
      }


    extractUserDetails(){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.faculty=currentUser.faculty;
        this.department=currentUser.department;
        console.log(localStorage.getItem("currentUser"));
      }
      logout() {
          localStorage.removeItem('currentUser');
      }
      isActive (path) {
        console.log(this._location);
          return this._location.path().indexOf(path) > -1;
      }
      goBack() {
        this._location.back();
      }

}
