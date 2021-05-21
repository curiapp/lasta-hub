//import files from the angular framework
import {Component,AfterViewInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'resume',
    templateUrl: 'resume-programme.component.html',
    //styleUrls: ['resume-programme.component.css']
})

export class ResumeComponent {
  programmes: String[] = ['07BACS', '08BHSE', '09MSCS','05DBMA'];
  programme: string;
  public showID =0;
  public delay = 60000;
  public pannelID:string;

  constructor(){
    // currentPanel = localStorage.getItem("pannelID");
    // if(!currentPanel)
    //   this.pannelID = "1";
    // else
    //   this.pannelID = currentPanel;
  }
  changed(event) {
        this.programme = event;
  }
  titleID(stage_id:number){
    //show box msg
   this.showID = stage_id;
   this.delay = 60000;
   //wait 60 Seconds and hide
   setTimeout(function() {
       this.showID = 0;
       console.log(this.showID);
   }.bind(this), this.delay);
  }
  //keep track of open panel
  ngAfterViewInit() {
    let currentPanel = localStorage.getItem("pannelID");
    if(!currentPanel)
      this.pannelID = "1";
    else
      this.pannelID = currentPanel;
  }
  openPannel(id:string){
    localStorage.setItem("pannelID",id);
    this.pannelID = id;
  }

}
