import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Faculty} from '../_models/faculty';
import {Department} from '../_models/department';
import {StartNeedAnalysisStructure} from '../_models/start-need-analysis-structure';

@Injectable()
export class StartNeedAnalysisService {
  private _startNeedAnalysisUrl:string="/api/need-analysis/start";
  constructor(private _http: Http) {}

  startNeedAnalysis(initiator:string,programmeName: string, programmeCode: number,facultyName:string,departmentName:string,level:number) {
      let body =JSON.stringify({"initiator":initiator,"programmeName":programmeCode,"facultyName":facultyName,"departmentName":departmentName,"level":level});
      let startHeaders = new Headers({'Content-Type': 'application/json'});
      let startOptions = new RequestOptions({headers: startHeaders,method:"post"});

      return this._http.post(this._startNeedAnalysisUrl, body, startOptions)
          .map((response: Response) => {response= response.json();});

          }




}
