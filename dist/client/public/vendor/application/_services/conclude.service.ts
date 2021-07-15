import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/subscribe';

@Injectable()
export class ConcludeService {
    constructor(private _http: Http) {}


    // conclude(decission: string,ProgrammeCode:number) {
    //     let authHeaders = new Headers({'Content-Type': 'application/json'});
    //     let authOptions = new RequestOptions({headers: authHeaders});
    //
    //     return this._http.post('/api/need-analysis/conclude', {decission: decission,ProgrammeCode:ProgrammeCode}, authOptions)
    //         .map((response: Response) => { response.json();});
    //         }

//     conclude(event:any,decission: string,ProgrammeCode:number) {
//     let fileList: FileList = event.target.files;
//     if(fileList.length > 0) {
//         let file: File = fileList[0];
//         let formData:FormData = new FormData();
//         formData.append('uploadFile', file, file.name);
//         let headers = new Headers();
//         headers.append('Content-Type', 'multipart/form-data');
//         headers.append('Accept', 'application/json');
//         let options = new RequestOptions({ headers: headers });
//         this._http.post('/api/need-analysis/conclude', {decission: decission,ProgrammeCode:ProgrammeCode,formData}, options)
//             .map(res => res.json())
//             .catch(error => Observable.throw(error))
//             .subscribe(
//                 data => console.log('success'),
//                 error => console.log(error)
//             )
//     }
// }
            conclude(fileList:any,decission: String,ProgrammeCode:String) {
              //let fileList: FileList = event.target.files;
              if(fileList.length > 0) {
                  let file: File = fileList[0];
                  let formData:FormData = new FormData();
                  console.log(file.name);
                  console.log(file.size);
                  formData.append('survey', file);
                  formData.append('decision',decission);
                  formData.append('devCode',ProgrammeCode);
                //   let authHeaders = new Headers({'enctype': 'multipart/form-data'});
                //   let authOptions = new RequestOptions({ headers: authHeaders });
                  return this._http.post('/api/need-analysis/conclude', {formData})
                      .map((response: Response) => response.json())
                      .subscribe(data => console.log('success'),error => console.log(error));
              }
          }

}
