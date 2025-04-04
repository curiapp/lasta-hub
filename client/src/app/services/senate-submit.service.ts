import { Injectable } from '@angular/core';
import { HttpClient as Http } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SenateSubmitService {
  private _senateSubmitUrl: string = `${environment.apiUrl}/bos-senate/start-senate`;
  constructor(private _http: Http) { }

  startNeedAnalysis(programmeCode: string, startDate: Date) {
    return this._http.post(this._senateSubmitUrl, { "devCode": programmeCode, "date": startDate }, {});
  }




}
