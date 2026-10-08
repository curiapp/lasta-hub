import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { handleError } from '../functions';
import { Programme } from '../types';

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
