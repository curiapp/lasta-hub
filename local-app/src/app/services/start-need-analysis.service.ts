import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
//import {Observable} from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {Faculty} from '../models/faculty';
import {Department} from '../models/department';
import {StartNeedAnalysisStructure} from '../models/start-need-analysis-structure';
import { Observable,of,Subject } from 'rxjs';



@Injectable()
export class StartNeedAnalysisService {
  private _startNeedAnalysisUrl:string="/api/need-analysis/start";
  constructor(private _http: Http) {}

  startNeedAnalysis(initiator:string,programmeName: string, programmeCode: string,facultyName:string,departmentName:string,level:number) {
      let body =JSON.stringify({"initiator":initiator,"name":programmeName,"devCode":programmeCode,"faculty":facultyName,"department":departmentName,"level":level});
      let startHeaders = new Headers({'Content-Type': 'application/json'});
      let startOptions = new RequestOptions({headers: startHeaders,method:"post"});

      return this._http.post(this._startNeedAnalysisUrl, body, startOptions).pipe(map((response: Response) => {response= response.json();}));
 }
}
