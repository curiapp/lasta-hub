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
var CourseInProgressComponent = /** @class */ (function () {
    function CourseInProgressComponent(shortSummaryService) {
        this.shortSummaryService = shortSummaryService;
        this.defaultCount = 0;
    }
    CourseInProgressComponent.prototype.ngOnInit = function () {
        this.shortSummaryService.loadShortSummary();
    };
    CourseInProgressComponent.prototype.extract = function () {
        return this.shortSummaryService.extractInProgress();
    };
    CourseInProgressComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'course-in-progress',
            templateUrl: 'course-in-progress.component.html',
            styleUrls: ['course-in-progress.component.css']
        })
    ], CourseInProgressComponent);
    return CourseInProgressComponent;
}());
exports.CourseInProgressComponent = CourseInProgressComponent;
