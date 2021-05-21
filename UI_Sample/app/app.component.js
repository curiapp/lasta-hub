"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var contact_component_1 = require("./contact/contact.component");
var experiments_component_1 = require("./experiments/experiments.component");
var notifications_component_1 = require("./notifications/notifications.component");
var tutorials_component_1 = require("./tutorials/tutorials.component");
var home_component_1 = require("./home/home.component");
var state_service_1 = require("./common/state.service");
var experiments_service_1 = require("./common/experiments.service");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            template: require('./app.component.html'),
            styles: [require('./app.component.css')],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [state_service_1.StateService, experiments_service_1.ExperimentsService],
        }),
        Routes([
            { path: '/', component: home_component_1.HomeComponent },
            { path: '/home', component: home_component_1.HomeComponent },
            { path: '/notifications', component: notifications_component_1.NotificationsComponent },
            { path: '/tutorials', component: tutorials_component_1.TutorialsComponent },
            { path: '/contact', component: contact_component_1.ContactComponent },
            { path: '/experiments', component: experiments_component_1.ExperimentsComponent },
            { path: '/*', component: home_component_1.HomeComponent }
        ])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
