import { Injectable } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable()
export class StartNeedAnalysisService {
  private _startNeedAnalysisUrl: string = "/api/need-analysis/start";
  constructor(private _http: HttpClient) { }

  startNeedAnalysis(initiator: string, programmeName: string, programmeCode: string, facultyName: string, departmentName: string, level: number) {
    let body = JSON.stringify({ "initiator": initiator, "name": programmeName, "devCode": programmeCode, "faculty": facultyName, "department": departmentName, "level": level });
    let startHeaders = new Headers({ 'Content-Type': 'application/json' });
    // let startOptions = new RequestOptions({headers: startHeaders,method:"post"});

    return this._http.post(this._startNeedAnalysisUrl, body, {}).pipe(map((response: HttpResponse<any>) => { response = response.body(); }));
  }
}
