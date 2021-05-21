//import files from the angular framework
import { Component, OnInit } from '@angular/core';
import { DueForReview } from '../_models/due-for-review';
import { InProgress } from '../_models/in-progress';
import { RecentlyApproved } from '../_models/recently-approved';
import {ShortSummary} from '../_models/short-summary';
import {ShortSummaryService} from '../_services/short-summary.service';


@Component({
    moduleId: module.id,
    selector: 'course-due-for-review',
    templateUrl: 'course-due-for-review.component.html',
    styleUrls: ['course-due-for-review.component.css']
})

export class CourseDueForReviewComponent implements OnInit {
    defaultCount = 0;

    constructor(private shortSummaryService:ShortSummaryService){}

    ngOnInit() {
       this.shortSummaryService.loadShortSummary();
    }

    extract() {
        return this.shortSummaryService.extractDueForReview();
    }
}
