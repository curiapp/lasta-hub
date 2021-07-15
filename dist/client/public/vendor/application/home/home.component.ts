//import files from the angular framework
import {Component} from '@angular/core';


@Component({
    moduleId: module.id,
    selector: 'Home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent {
  programmes: String[] = ['07BACS', '08BHSE', '09MSCS'];
  programme: string;
  loggedIn(){
        let user = localStorage.getItem("currentUser");
    if (!user){
        console.log("user not loggen in...");
      return false;
    }
    else
      return true;
  }
  changed(event) {
        this.programme = event;
    }

}
