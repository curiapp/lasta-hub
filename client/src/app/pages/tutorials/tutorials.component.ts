//import files from the angular framework
import { Component } from '@angular/core';
import { TutorialProcess, TutorialStage } from '../../types';
import { TUTORIAL_DATA } from '../../static';
import { SearchTutorialPipe } from "../../pipes/search-tutorial.pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'Tutorial',
  standalone: true,
  templateUrl: 'tutorials.component.html',
  imports: [SearchTutorialPipe, FormsModule]
})

export class TutorialComponent {
  currentId: string;
  stages: TutorialStage[] = TUTORIAL_DATA;
  searchQuery = '';
  selectedStage: TutorialStage | null = null;
  selectedProcess: TutorialProcess | null = null;

  scrollToStage(stage: TutorialStage) {
    document.getElementById('stage-' + stage.id)?.scrollIntoView({ behavior: 'smooth' });
  }

  selectProcess(stage: TutorialStage, process: TutorialProcess) {
    this.selectedStage = stage;
    this.selectedProcess = process;
  }

  VideoChanges(id: string) {
    if (this.currentId != null) {
      (<HTMLVideoElement>document.getElementById(this.currentId)).pause();
      this.currentId = id;
    }
    else {
      this.currentId = id;
    }
    // console.log(this.currentId);
    // console.log(id);
  }
}
