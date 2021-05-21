"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ExperimentsService = /** @class */ (function () {
    function ExperimentsService() {
        this.experiments = [
            { name: 'Experiment 1', description: 'This is an experiment', completed: 0 },
            { name: 'Experiment 2', description: 'This is an experiment', completed: 0 },
            { name: 'Experiment 3', description: 'This is an experiment', completed: 0 },
            { name: 'Experiment 4', description: 'This is an experiment', completed: 0 }
        ];
    }
    ExperimentsService.prototype.getExperiments = function () {
        return this.experiments;
    };
    ;
    ExperimentsService = __decorate([
        core_1.Injectable()
    ], ExperimentsService);
    return ExperimentsService;
}());
exports.ExperimentsService = ExperimentsService;
