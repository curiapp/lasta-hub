"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing files from the angular framework
var core_1 = require("@angular/core");
var ng2_datetime_picker_1 = require("ng2-datetime-picker");
ng2_datetime_picker_1.Ng2Datetime.firstDayOfWeek = 0; //e.g. 1, or 6
// Root Component
var AppComponent = /** @class */ (function () {
    function AppComponent(_location) {
        this._location = _location;
    }
    AppComponent.prototype.loggedIn = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser == null) {
            return false;
        }
        else {
            this.username = currentUser.username;
            this.faculty = currentUser.faculty;
            this.department = currentUser.department;
            return true;
        }
    };
    AppComponent.prototype.extractUserDetails = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.faculty = currentUser.faculty;
        this.department = currentUser.department;
        console.log(localStorage.getItem("currentUser"));
    };
    AppComponent.prototype.logout = function () {
        localStorage.removeItem('currentUser');
    };
    AppComponent.prototype.isActive = function (path) {
        console.log(this._location);
        return this._location.path().indexOf(path) > -1;
    };
    AppComponent.prototype.goBack = function () {
        this._location.back();
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pdu',
            templateUrl: 'app.component.html',
            styleUrls: ['pdu.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
