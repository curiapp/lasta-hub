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
var SenateSubmitService = /** @class */ (function () {
    function SenateSubmitService(_http) {
        this._http = _http;
        this._senateSubmitUrl = "/api/bos-senate/start-senate";
    }
    SenateSubmitService.prototype.startNeedAnalysis = function (programmeCode, startDate) {
        var body = JSON.stringify({ "devCode": programmeCode, "date": startDate });
        var startHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var startOptions = new http_1.RequestOptions({ headers: startHeaders, method: "post" });
        return this._http.post(this._senateSubmitUrl, body, startOptions)
            .map(function (response) { response = response.json(); });
    };
    SenateSubmitService = __decorate([
        core_1.Injectable()
    ], SenateSubmitService);
    return SenateSubmitService;
}());
exports.SenateSubmitService = SenateSubmitService;
