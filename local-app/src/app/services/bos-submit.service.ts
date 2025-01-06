import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class BoSSubmitService {
  private _bosSubmitUrl:string="/api/need-analysis/bos/start";
  constructor(private _http: HttpClient) {}

  startNeedAnalysis(programmeCode:String,startDate:Date) {
      let body =JSON.stringify({"devCode":programmeCode,"date":startDate});
      let startHeaders = new Headers({'Content-Type': 'application/json'});
      // let startOptions = new RequestOptions({headers: startHeaders,method:"post"});

      return this._http.post(this._bosSubmitUrl, body, {})
          .subscribe((response: HttpResponse<any>) => {
            response = response.body;
          });
    }
}
