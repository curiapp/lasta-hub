"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var SenateService = /** @class */ (function () {
    function SenateService(_http) {
        this._http = _http;
    }
    SenateService.prototype.consult = function (event, consultationDate, programmeCode) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            var formData = new FormData();
            formData.append('uploadFile', file, file.name);
            var authHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
            var authOptions = new http_1.RequestOptions({ headers: authHeaders });
            return this._http.post('/api/need-analysis/senate', { consultationDate: consultationDate, programmeCode: programmeCode, formData: formData }, authOptions)
                .map(function (response) { response.json(); });
        }
    };
    SenateService = __decorate([
        core_1.Injectable()
    ], SenateService);
    return SenateService;
}());
exports.SenateService = SenateService;
