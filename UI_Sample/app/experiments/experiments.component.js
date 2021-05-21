"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var experiment_detail_component_1 = require("./experiment-details/experiment.detail.component");
var ExperimentsComponent = /** @class */ (function () {
    function ExperimentsComponent(_stateService, _experimentsService) {
        this._stateService = _stateService;
        this._experimentsService = _experimentsService;
        this.title = 'Experiments Page';
        this.body = 'This is the about experiments body';
    }
    ExperimentsComponent.prototype.ngOnInit = function () {
        this.experiments = this._experimentsService.getExperiments();
        this.message = this._stateService.getMessage();
    };
    ExperimentsComponent.prototype.updateMessage = function (m) {
        this._stateService.setMessage(m);
    };
    ExperimentsComponent = __decorate([
        core_1.Component({
            selector: 'experiments',
            template: require('./experiments.component.html'),
            directives: [experiment_detail_component_1.ExperimentDetailComponent]
        })
    ], ExperimentsComponent);
    return ExperimentsComponent;
}());
exports.ExperimentsComponent = ExperimentsComponent;
