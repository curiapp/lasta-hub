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
  private _updateNeedAnalysisUrl: string = `${environment.apiUrl}/need-analysis/start`;

  constructor(private _http: HttpClient) { }

  updateNeedAnalysis({ code, title, level, id }: Programme) {
    let body = { "title": title, "code": code, "level": level };

    return this._http.put(`${this._updateNeedAnalysisUrl}/${id}`, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(handleError)
    );
  }
}
