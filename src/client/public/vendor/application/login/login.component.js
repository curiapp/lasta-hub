"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
//import files from the angular framework
var core_1 = require("@angular/core");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, route, authService, _location) {
        this.router = router;
        this.route = route;
        this.authService = authService;
        this._location = _location;
        this.model = {};
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        this.authService.login(this.model.username, this.model.password)
            .subscribe(function (data) {
            console.log('Hi I am here' + data);
            _this.router.navigate(['/home']);
            //this.router.navigate([this.returnUrl]);
        }, function (error) {
            console.log('check the console');
        });
    };
    LoginComponent.prototype.close = function () {
        console.log("closing the window...");
        this.model.username = "username";
        this.model.password = "password";
        //this.router.navigate(['/home']);
        this._location.back();
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }),
        __param(2, core_1.Inject)
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
