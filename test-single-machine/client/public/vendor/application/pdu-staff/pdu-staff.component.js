"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import component, ElementRef, input and the oninit method from angular core
var core_1 = require("@angular/core");
//import the do function to be used with the http library.
require("rxjs/add/operator/do");
//import the map function to be used with the http library
require("rxjs/add/operator/map");
var URL = '/api/need-analysis/senate/recommend';
//create the component properties
var PDUStaffComponent = /** @class */ (function () {
    function PDUStaffComponent() {
    }
    PDUStaffComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //define the element to be selected from the html structure.
            selector: 'pdu-staff',
            //location of our template rather than writing inline templates.
            templateUrl: 'pdu-staff.component.html',
        })
    ], PDUStaffComponent);
    return PDUStaffComponent;
}());
exports.PDUStaffComponent = PDUStaffComponent;
