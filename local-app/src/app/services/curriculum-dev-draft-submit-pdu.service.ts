import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';


@Injectable()
export class CurriculumDevDraftSubmitPduService {
  private _pduSubmitUrl: string = "/api/curriculum-development/draft/submit";
  constructor(private _http: HttpClient) { }

  startNeedAnalysis(programmeCode: String, startDate: Date) {
    let body = JSON.stringify({ "devCode": programmeCode, "date": startDate });
    let startHeaders = new Headers({ 'Content-Type': 'application/json' });
    // let startOptions = new RequestOptions({headers: startHeaders,method:"post"});

    return this._http.post(this._pduSubmitUrl, body, {});
  }

}
