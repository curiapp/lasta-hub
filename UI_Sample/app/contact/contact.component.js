"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ContactComponent = /** @class */ (function () {
    function ContactComponent(_stateService) {
        this._stateService = _stateService;
        this.title = 'Contact Us Page';
        this.body = 'This is the Contact Us page body';
    }
    ContactComponent.prototype.ngOnInit = function () {
        this.message = this._stateService.getMessage();
    };
    ContactComponent.prototype.updateMessage = function (m) {
        this._stateService.setMessage(m);
    };
    ContactComponent = __decorate([
        core_1.Component({
            selector: 'contact',
            template: require('./contact.component.html')
        })
    ], ContactComponent);
    return ContactComponent;
}());
exports.ContactComponent = ContactComponent;
