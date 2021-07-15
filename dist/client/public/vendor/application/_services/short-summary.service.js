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
var ShortSummaryService = /** @class */ (function () {
    // err:String;
    function ShortSummaryService(http) {
        this.http = http;
        this.allShortSummaries = {};
        this.shortSummaryUrl = '/api/short-summary';
        this.loadedSummaries = false;
    }
    ShortSummaryService.prototype.loadShortSummary = function () {
        var _this = this;
        if (!this.loadedSummaries) {
            console.log("it is not loaded yet...");
            this.loadedSummaries = true;
            var authHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
            var authOptions = new http_1.RequestOptions({ headers: authHeaders });
            this.http.get(this.shortSummaryUrl, authOptions)
                .map(function (resp) { return resp.json(); })
                .subscribe(function (data) {
                console.log("got the data ...");
                _this.allShortSummaries = data;
            }, function (error) { _this.loadedSummaries = false; });
        }
    };
    ShortSummaryService.prototype.extractInProgress = function () {
        return this.allShortSummaries.inProgress;
    };
    ShortSummaryService.prototype.extractRecentlyApproved = function () {
        return this.allShortSummaries.recentlyApproved;
    };
    ShortSummaryService.prototype.extractDueForReview = function () {
        return this.allShortSummaries.dueForReview;
    };
    ShortSummaryService = __decorate([
        core_1.Injectable()
    ], ShortSummaryService);
    return ShortSummaryService;
}());
exports.ShortSummaryService = ShortSummaryService;
