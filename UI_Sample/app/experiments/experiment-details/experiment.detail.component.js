"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ExperimentDetailComponent = /** @class */ (function () {
    function ExperimentDetailComponent() {
    }
    ExperimentDetailComponent.prototype.doExperiment = function () {
        this.experiment.completed += 1;
    };
    ;
    __decorate([
        core_1.Input()
    ], ExperimentDetailComponent.prototype, "experiment", void 0);
    ExperimentDetailComponent = __decorate([
        core_1.Component({
            selector: 'experiment',
            template: require('./experiment.detail.component.html'),
            styles: ["\n    .experiment {\n      cursor: pointer;\n      outline: 1px lightgray solid;\n      padding: 5px;\n      margin: 5px;\n    }\n  "]
        })
    ], ExperimentDetailComponent);
    return ExperimentDetailComponent;
}());
exports.ExperimentDetailComponent = ExperimentDetailComponent;
