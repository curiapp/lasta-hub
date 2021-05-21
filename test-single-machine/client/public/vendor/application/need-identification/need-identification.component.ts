// importing files from the angular framework
import {Component} from '@angular/core';
//import {Component, bootstrap, provide, NgFor} from 'angular2/angular2';
import { FORM_DIRECTIVES } from '@angular/forms';
import {Router, RouterUrlSerializer} from '@angular/router';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS,
         LocationStrategy, HashLocationStrategy,} from 'angular/router';

import {FacultyStructure} from '../_models/faculty-structure';

//Need Identification Component
@Component({
    moduleId: module.id,
    selector: 'NeedIdentification',
    templateUrl: 'need-identification.component.html',
    directives: [ FORM_DIRECTIVES]
})

export class NeedIdentificationComponent {
  title = 'Departments in Faculties';
  faculties = [
    new FacultyStructure('Faculty of Computing and Informatics', ['Computer Science','Informatics']),
    new FacultyStructure('Faculty of Engineering', ['Civil and Environmental Engineering','Mining and Process Engineering','Electrical and Computer Engineering','Mechanical and Marine Engineering','Material Testing Institute']),
    new FacultyStructure('Faculty of Health Sciences', ['Mathematics and Statistics','Health Sciences','Natural and Applied Sciences']),
    new FacultyStructure('Faculty of Human Sciences', ['Communication','Social Sciences', 'Education and Languages']),
    new FacultyStructure('Faculty of Management Sciences', ['Marketing and Logistics','Accounting', 'Economics and Finance','Hospitality and Tourism','Management']),
    new FacultyStructure('Faculty of Natural Resources and Spatial Sciences', ['Architecture and Spatial Planning','Geo-Spatial Sciences and Technology','Land and Property Sciences'])
  ];
  selectedFaculty = 0;
}
