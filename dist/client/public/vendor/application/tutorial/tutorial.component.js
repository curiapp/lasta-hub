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
var TutorialComponent = /** @class */ (function () {
    function TutorialComponent() {
    }
    TutorialComponent.prototype.VideoChanges = function (id) {
        if (this.currentId != null) {
            document.getElementById(this.currentId).pause();
            this.currentId = id;
        }
        else
            this.currentId = id;
        //(<HTMLVideoElement>document.getElementById(id)).play();
        console.log(this.currentId);
        console.log(id);
        /*var vid = document.getElementBy
        Id("myVideo");
        vid.onplaying = function() {*/
        //alert("The video is now playing");
    };
    TutorialComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Tutorial',
            templateUrl: 'tutorial.component.html',
            styleUrls: ['tutorial.component.css']
        })
    ], TutorialComponent);
    return TutorialComponent;
}());
exports.TutorialComponent = TutorialComponent;
