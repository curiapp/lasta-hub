"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var operators_1 = require("rxjs/operators");
var UserAuthenticationService = /** @class */ (function () {
    function UserAuthenticationService(commer) {
        this.commer = commer;
    }
    UserAuthenticationService.prototype.login = function (loginName, loginPass) {
        var authHeaders = new http_1.Headers({ 'Content-Type': 'application/json' });
        var authOptions = new http_1.RequestOptions({ headers: authHeaders });
        return this.commer.post('/api/users/authenticate', { username: loginName, password: loginPass }, authOptions).pipe(operators_1.map(function (response) {
            var user = response.json();
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        }));
    };
    UserAuthenticationService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
    };
    UserAuthenticationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserAuthenticationService);
    return UserAuthenticationService;
}());
exports.UserAuthenticationService = UserAuthenticationService;
