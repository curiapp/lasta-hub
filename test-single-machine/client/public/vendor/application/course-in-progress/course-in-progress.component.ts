//import files from the angular framework
import { Component, OnInit } from '@angular/core';
import {ShortSummaryService} from '../_services/short-summary.service';


@Component({
    moduleId: module.id,
    selector: 'course-in-progress',
    templateUrl: 'course-in-progress.component.html',
    styleUrls: ['course-in-progress.component.css']
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
