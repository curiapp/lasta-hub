
//import files from the angular framework
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StartNeedAnalysisService } from '../services/start-need-analysis.service';
import { Faculty } from '../models/faculty';
import { Department } from '../models/department';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS,
//          LocationStrategy, HashLocationStrategy,} from '@angular/router';

@Component({
    //moduleId: module.id,
    selector: 'StartNeedAnalysis',
    templateUrl: 'start-need-analysis.component.html',
    //styleUrls: ['about-us.component.css']
    providers: [StartNeedAnalysisService],
    imports: [FormsModule]
    //directives: [ ]
})

export class StartNeedAnalysisComponent implements OnInit {
  ngOnInit() {
  }
  levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



  dataService: StartNeedAnalysisService;
  initiator: string;
  //username:  string;
  programmeName: string;
  programmeCode: string;
  facultyName: string;
  departmentName: string;
  level: number;

  postMyDataToServer: string;

  constructor(private _dataService: StartNeedAnalysisService, private router: Router) {
    this.dataService = _dataService;
    let user = localStorage.getItem("currentUser");
    if (!user) {
      this.initiator = "Ndina";
      this.facultyName = "Computing and Informatics";
      this.departmentName = "Computer Science";
      console.log("user not loggen in, we are using default values...");

    }
    else {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.initiator = currentUser.username
      this.facultyName = currentUser.usrUnit.faculty;
      this.departmentName = currentUser.usrUnit.department;

    }
  }


  changed(event) {
    this.level = event;
  }
  // extractUserDetails(){
  //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //     this.initiator = currentUser.username;
  //     this.facultyName=currentUser.facultyName;
  //     this.departmentName=currentUser.departmentName;
  //   }

  postDataToServer() {
    this._dataService.startNeedAnalysis(this.initiator, this.programmeName, this.programmeCode,
      this.facultyName, this.departmentName, this.level)
      .subscribe(data => this.postMyDataToServer = JSON.stringify(data), // put the data returned from the server in our variable
        error => console.log("Error HTTP Post Service"), // in case of failure show this message
        () => alert(" New programme created")
        //run this code in all cases
      );
  }


  close() {
    console.log("closing the window...");
    this.router.navigate(['/home']);
  }
}
