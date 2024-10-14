import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { DueForReview } from '../_models/due-for-review';
// import { InProgress } from '../_models/in-progress';
// import { RecentlyApproved } from '../_models/recently-approved';
// import {ShortSummary} from '../_models/short-summary';

 @Injectable()
 export class ShortSummaryService {
     allShortSummaries: any = {};
     shortSummaryUrl = '/api/short-summary';
     loadedSummaries: boolean = false


   // err:String;
   constructor(private http: HttpClient) {}

   loadShortSummary() {
       if (!this.loadedSummaries) {
           console.log("it is not loaded yet...")
           this.loadedSummaries = true;

           let authHeaders = new HttpHeaders({'Content-Type': 'application/json'});
          //  let authOptions = new RequestOptions({headers: authHeaders});
           this.http.get(this.shortSummaryUrl, {})
          //  .map((resp: Response) => resp.json())
           .subscribe(data => {
               console.log("got the data ...");
               this.allShortSummaries = data;
           }, error => {this.loadedSummaries = false;});
       }
   }

   extractInProgress() {
       return this.allShortSummaries.inProgress;
   }

   extractRecentlyApproved() {
       return this.allShortSummaries.recentlyApproved;
   }

   extractDueForReview() {
       return this.allShortSummaries.dueForReview;
   }
}
