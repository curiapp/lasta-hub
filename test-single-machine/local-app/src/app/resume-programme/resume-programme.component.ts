import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'resume',
  templateUrl: './resume-programme.component.html',
  styleUrls: ['./resume-programme.component.scss']
})
export class ResumeProgrammeComponent implements OnInit {

  programmes: String[] = ['07BACS', '08BHSE', '09MSCS', '05DBMA'];
  programme: string;
  public showID = 0;
  public delay = 60000;
  public pannelID: Number;
  constructor() { }

  ngOnInit() {
  }

  changed(event) {
    this.programme = event;
  }
  titleID(stage_id: number) {
    //show box msg
    this.showID = stage_id;
    this.delay = 60000;
    //wait 60 Seconds and hide
    setTimeout(function () {
      this.showID = 0;
      console.log(this.showID);
    }.bind(this), this.delay);
  }
  //keep track of open panel
  ngAfterViewInit() {
    let currentPanel = localStorage.getItem("pannelID");
    if (!currentPanel)
      this.pannelID = 1;
    else
      this.pannelID = Number(currentPanel);
  }
  openPannel(id: Number) {
    localStorage.setItem("pannelID", String(id));
    this.pannelID = id;
  }

}
