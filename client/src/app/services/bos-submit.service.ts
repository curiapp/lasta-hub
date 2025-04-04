import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from '../../environments/environment';
import { handleError } from '../functions';


@Injectable({
  providedIn: 'root'
})
export class BoSSubmitService {
  private _bosSubmitUrl = `${environment.apiUrl}/need-analysis/bos/start`;

  constructor(private _http: HttpClient) { }

  startNeedAnalysis(code: String, startDate: Date) {

    return this._http.post(this._bosSubmitUrl, { "devCode": code, "date": startDate }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      // map((response: any) => response.json()),
      catchError(handleError)
    )
  }
}
