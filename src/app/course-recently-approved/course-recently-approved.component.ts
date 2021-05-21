//import files from the angular framework
import { Component, OnInit } from '@angular/core';
import {ShortSummaryService} from '../services/short-summary.service';


@Component({
    selector: 'course-recently-approved',
    templateUrl: 'course-recently-approved.component.html',
    styleUrls: ['course-recently-approved.component.css']
})

export class CourseRecentlyApprovedComponent implements OnInit{
    defaultCount = 0;

    constructor(private shortSummaryService:ShortSummaryService){}

    ngOnInit() {
        this.shortSummaryService.loadShortSummary();
    }

    extract() {
        return this.shortSummaryService.extractRecentlyApproved();
    }
}
