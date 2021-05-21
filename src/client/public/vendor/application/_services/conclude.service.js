"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
//import 'rxjs/add/operator/subscribe';
var ConcludeService = /** @class */ (function () {
    function ConcludeService(_http) {
        this._http = _http;
    }
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
    ConcludeService.prototype.conclude = function (fileList, decission, ProgrammeCode) {
        //let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var formData = new FormData();
            console.log(file.name);
            console.log(file.size);
            formData.append('survey', file);
            formData.append('decision', decission);
            formData.append('devCode', ProgrammeCode);
            //   let authHeaders = new Headers({'enctype': 'multipart/form-data'});
            //   let authOptions = new RequestOptions({ headers: authHeaders });
            return this._http.post('/api/need-analysis/conclude', { formData: formData })
                .map(function (response) { return response.json(); })
                .subscribe(function (data) { return console.log('success'); }, function (error) { return console.log(error); });
        }
    };
    ConcludeService = __decorate([
        core_1.Injectable()
    ], ConcludeService);
    return ConcludeService;
}());
exports.ConcludeService = ConcludeService;
