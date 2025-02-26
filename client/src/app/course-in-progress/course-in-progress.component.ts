//import files from the angular framework
import { Component, OnInit } from '@angular/core';
import {ShortSummaryService} from '../services/short-summary.service';


@Component({
    selector: 'course-in-progress',
    standalone: true,
    templateUrl: 'course-in-progress.component.html',
    styleUrls: ['course-in-progress.component.scss']
})

export class CourseInProgressComponent implements OnInit{
    defaultCount = 0;

  constructor(private shortSummaryService: ShortSummaryService){}

  ngOnInit() {
    this.shortSummaryService.loadShortSummary();
  }

  extract() {
      return this.shortSummaryService.extractInProgress();
  }
}
