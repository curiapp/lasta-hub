"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var home_component_1 = require("./home.component");
testing_1.describe('Home Component', function () {
    testing_1.it('should be named `HomeComponent`', function () {
        testing_1.expect(home_component_1.HomeComponent['name']).toBe('HomeComponent');
    });
    testing_1.it('should have a method called `updateMessage`', function () {
        testing_1.expect(home_component_1.HomeComponent.prototype.updateMessage).toBeDefined();
    });
});
