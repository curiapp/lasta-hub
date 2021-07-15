//import files from the angular framework
import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'Tutorial',
    templateUrl: 'tutorial.component.html',
    styleUrls: ['tutorial.component.css']
})

export class TutorialComponent {
  currentId:string;

  VideoChanges(id:string){
    if(this.currentId != null){
      (<HTMLVideoElement>document.getElementById(this.currentId)).pause();
      this.currentId = id;
    }
    else
      this.currentId = id;

    //(<HTMLVideoElement>document.getElementById(id)).play();

    console.log(this.currentId);
    console.log(id);
    /*var vid = document.getElementBy
    Id("myVideo");
    vid.onplaying = function() {*/
    //alert("The video is now playing");
  }
}
