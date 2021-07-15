"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import files from the angular framework
var core_1 = require("@angular/core");
var start_need_analysis_service_1 = require("../_services/start-need-analysis.service");
var forms_1 = require("@angular/forms");
var StartNeedAnalysisComponent = /** @class */ (function () {
    function StartNeedAnalysisComponent(_dataService, router) {
        this._dataService = _dataService;
        this.router = router;
        this.levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.dataService = _dataService;
        var user = localStorage.getItem("currentUser");
        if (!user) {
            this.initiator = "Ndina";
            this.facultyName = "Computing and Informatics";
            this.departmentName = "Computer Science";
            console.log("user not loggen in, we are using default values...");
        }
        else {
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.initiator = currentUser.username;
            this.facultyName = currentUser.facultyName;
            this.departmentName = currentUser.departmentName;
        }
    }
    StartNeedAnalysisComponent.prototype.changed = function (event) {
        this.level = event;
    };
    // extractUserDetails(){
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     this.initiator = currentUser.username;
    //     this.facultyName=currentUser.facultyName;
    //     this.departmentName=currentUser.departmentName;
    //   }
    StartNeedAnalysisComponent.prototype.postDataToServer = function () {
        var _this = this;
        this._dataService.startNeedAnalysis(this.initiator, this.programmeName, this.programmeCode, this.facultyName, this.departmentName, this.level)
            .subscribe(function (data) { return _this.postMyDataToServer = JSON.stringify(data); }, // put the data returned from the server in our variable
        function (// put the data returned from the server in our variable
        error) { return console.log("Error HTTP Post Service"); }, // in case of failure show this message
        function () { return console.log("Job Done Post !"); } //run this code in all cases
        );
    };
    StartNeedAnalysisComponent.prototype.close = function () {
        console.log("closing the window...");
        this.router.navigate(['/home']);
    };
    StartNeedAnalysisComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'StartNeedAnalysis',
            templateUrl: 'start-need-analysis.component.html',
            //styleUrls: ['about-us.component.css']
            providers: [start_need_analysis_service_1.StartNeedAnalysisService],
            directives: [forms_1.FORM_DIRECTIVES]
        })
    ], StartNeedAnalysisComponent);
    return StartNeedAnalysisComponent;
}());
exports.StartNeedAnalysisComponent = StartNeedAnalysisComponent;
