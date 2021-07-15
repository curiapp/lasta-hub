"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing files from the angular framework
var core_1 = require("@angular/core");
//import {Component, bootstrap, provide, NgFor} from 'angular2/angular2';
var forms_1 = require("@angular/forms");
var faculty_structure_1 = require("../_models/faculty-structure");
//Need Identification Component
var NeedIdentificationComponent = /** @class */ (function () {
    function NeedIdentificationComponent() {
        this.title = 'Departments in Faculties';
        this.faculties = [
            new faculty_structure_1.FacultyStructure('Faculty of Computing and Informatics', ['Computer Science', 'Informatics']),
            new faculty_structure_1.FacultyStructure('Faculty of Engineering', ['Civil and Environmental Engineering', 'Mining and Process Engineering', 'Electrical and Computer Engineering', 'Mechanical and Marine Engineering', 'Material Testing Institute']),
            new faculty_structure_1.FacultyStructure('Faculty of Health Sciences', ['Mathematics and Statistics', 'Health Sciences', 'Natural and Applied Sciences']),
            new faculty_structure_1.FacultyStructure('Faculty of Human Sciences', ['Communication', 'Social Sciences', 'Education and Languages']),
            new faculty_structure_1.FacultyStructure('Faculty of Management Sciences', ['Marketing and Logistics', 'Accounting', 'Economics and Finance', 'Hospitality and Tourism', 'Management']),
            new faculty_structure_1.FacultyStructure('Faculty of Natural Resources and Spatial Sciences', ['Architecture and Spatial Planning', 'Geo-Spatial Sciences and Technology', 'Land and Property Sciences'])
        ];
        this.selectedFaculty = 0;
    }
    NeedIdentificationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'NeedIdentification',
            templateUrl: 'need-identification.component.html',
            directives: [forms_1.FORM_DIRECTIVES]
        })
    ], NeedIdentificationComponent);
    return NeedIdentificationComponent;
}());
exports.NeedIdentificationComponent = NeedIdentificationComponent;
