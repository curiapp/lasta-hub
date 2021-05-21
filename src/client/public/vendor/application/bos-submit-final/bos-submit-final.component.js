"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import files from the angular framework
//import component, ElementRef, input and the oninit method from angular core
var core_1 = require("@angular/core");
//import the do function to be used with the http library.
require("rxjs/add/operator/do");
//import the map function to be used with the http library
require("rxjs/add/operator/map");
var BosSubmitFinalComponent = /** @class */ (function () {
    function BosSubmitFinalComponent(_dataService, router) {
        this._dataService = _dataService;
        this.router = router;
        this.model = {};
        this.dataService = _dataService;
    }
    BosSubmitFinalComponent.prototype.postDataToServer = function () {
        var _this = this;
        this._dataService.startNeedAnalysis(this.programmeCode, this.startDate)
            .subscribe(function (data) { return _this.postMyDataToServer = JSON.stringify(data); }, // put the data returned from the server in our variable
        function (// put the data returned from the server in our variable
        error) { return alert("Server: Error HTTP Post Service"); }, // in case of failure show this message
        function () { return alert("BOS session successfully started !"); } //run this code in all cases
        );
    };
    BosSubmitFinalComponent.prototype.clear = function () {
        this.model.programmeCode = "";
        this.model.bossubmissionDate = null;
    };
    BosSubmitFinalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'bos-submit-final',
            templateUrl: 'bos-submit-final.component.html'
        })
    ], BosSubmitFinalComponent);
    return BosSubmitFinalComponent;
}());
exports.BosSubmitFinalComponent = BosSubmitFinalComponent;
