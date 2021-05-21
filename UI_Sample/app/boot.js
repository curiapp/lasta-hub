"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js");
require("zone.js/dist/zone");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    router_1.ROUTER_PROVIDERS
]);
