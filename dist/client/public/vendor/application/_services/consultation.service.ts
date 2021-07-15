import {Injectable} from '@angular/core';
import {Http, Response, Headers,Request, RequestMethod, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ConsultationService {

 
    constructor(private _http: Http) {}

        
          consult(event:any,consultationDate:Date,organisation:string,programmeCode:number) {
              let fileList: FileList = event.target.files;
              if(fileList.length > 0) {
                  let file: File = fileList[0];
                  let formData:FormData = new FormData();
                  formData.append('uploadFile', file, file.name);
                  let authHeaders = new Headers({'Content-Type': 'application/json'});
                  let authOptions = new RequestOptions({ headers: authHeaders });
                  return this._http.post('/api/need-analysis/consult', {consultationDate:consultationDate,organisation:organisation,programmeCode:programmeCode,formData}, authOptions)
                      .map((response: Response) => { response.json();});
              }
          }



}


