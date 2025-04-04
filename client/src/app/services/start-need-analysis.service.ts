import { Injectable } from '@angular/core';
//import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Programme } from '../types';
import { handleError } from '../functions';


@Injectable()
export class StartNeedAnalysisService {
  private _startNeedAnalysisUrl: string = `${environment.apiUrl}/need-analysis/start`;

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
}
