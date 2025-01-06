//import files from the angular framework
import { Component, OnInit } from '@angular/core';
import { DueForReview } from '../models/due-for-review';
import { InProgress } from '../models/in-progress';
import { RecentlyApproved } from '../models/recently-approved';
import {ShortSummary} from '../models/short-summary';
import {ShortSummaryService} from '../services/short-summary.service';


@Component({
    selector: 'course-due-for-review',
    standalone: true,
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
