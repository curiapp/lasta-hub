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
var ResumeComponent = /** @class */ (function () {
    function ResumeComponent() {
        this.programmes = ['07BACS', '08BHSE', '09MSCS', '05DBMA'];
        this.showID = 0;
        this.delay = 60000;
        // currentPanel = localStorage.getItem("pannelID");
        // if(!currentPanel)
        //   this.pannelID = "1";
        // else
        //   this.pannelID = currentPanel;
    }
    ResumeComponent.prototype.changed = function (event) {
        this.programme = event;
    };
    ResumeComponent.prototype.titleID = function (stage_id) {
        //show box msg
        this.showID = stage_id;
        this.delay = 60000;
        //wait 60 Seconds and hide
        setTimeout(function () {
            this.showID = 0;
            console.log(this.showID);
        }.bind(this), this.delay);
    };
    //keep track of open panel
    ResumeComponent.prototype.ngAfterViewInit = function () {
        var currentPanel = localStorage.getItem("pannelID");
        if (!currentPanel)
            this.pannelID = "1";
        else
            this.pannelID = currentPanel;
    };
    ResumeComponent.prototype.openPannel = function (id) {
        localStorage.setItem("pannelID", id);
        this.pannelID = id;
    };
    ResumeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'resume',
            templateUrl: 'resume-programme.component.html',
        })
    ], ResumeComponent);
    return ResumeComponent;
}());
exports.ResumeComponent = ResumeComponent;
