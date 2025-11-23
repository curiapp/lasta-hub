
//import files from the angular framework
import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StartNeedAnalysisService } from '../../../services/start-need-analysis.service';
import { Faculty } from '../../../models/faculty';
import { Department } from '../../../models/department';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Programme } from '../../../types';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';
// import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS,
//          LocationStrategy, HashLocationStrategy,} from '@angular/router';

@Component({
  selector: 'start-need-analysis',
  templateUrl: 'start-need-analysis.component.html',
  styleUrls: ['start-need-analysis.component.css'],
  providers: [StartNeedAnalysisService],
  imports: [FormsModule]
  //directives: [ ]
})

export class StartNeedAnalysisComponent implements OnInit {
  levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  programme: Programme = { code: "", title: "", faculty: "", department: "", initiator: "", level: 0 };
  postMyDataToServer: string;
  _loading = inject(LoadingService);

  constructor(private _dataService: StartNeedAnalysisService, private router: Router, private toast: ToastService) { }

  ngOnInit(): void {
    let user = sessionStorage.getItem("loggedInUser");
    if (!user) {
      this.programme["initiator"] = "Ndina";
      this.programme["Faculty"] = "Computing and Informatics";
      this.programme["department"] = "Computer Science";
    }
    else {
      let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
      this.programme.initiator = currentUser?.id
      this.programme.faculty = currentUser?.id;
      this.programme.department = currentUser?.id;
    }
  }

  onSubmit(form: NgForm) {

    this._dataService.startNeedAnalysis(this.programme)
      .subscribe({
        next: (data) => {
          this.postMyDataToServer = JSON.stringify(data)
          // console.log("Data: ", this.postMyDataToServer);
          form.reset();
          this.toast.success("New programme created")
        },
        error: (error) => {
          this.toast?.error("Failed to create new programme ")
        }, // in case of failure show this message
      });
  }


  close() {
    console.log("closing the window...");
    this.router.navigate(['/home']);
  }
}
