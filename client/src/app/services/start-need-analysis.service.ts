import { Injectable } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Programme } from '../types';
import { handleError } from '../functions';


@Injectable(
  {
      providedIn: 'root'
  }
)
export class StartNeedAnalysisService {
  private _startNeedAnalysisUrl: string = `${environment.apiUrl}/need-analysis/start`;
  private _updateNeedAnalysisUrl: string = `${environment.apiUrl}/need-analysis/update`;

  constructor(private _http: HttpClient) { }

  startNeedAnalysis({ code, name, faculty, department, initiator, level }: Programme) {
    let body = { "initiator": initiator, "name": name, "devCode": code, "faculty": faculty, "department": department, "level": level };

    return this._http.post(this._startNeedAnalysisUrl, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(handleError)
    );
  }

  updateNeedAnalysis({ code, name, level }: Programme) {
    let body = { "name": name, "devCode": code,  "level": level };

    return this._http.put(this._updateNeedAnalysisUrl, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(handleError)
    );
  }
}
