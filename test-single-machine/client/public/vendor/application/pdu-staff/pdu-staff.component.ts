import {Router, RouterUrlSerializer} from '@angular/router';
import {RouteConfig,  ROUTER_DIRECTIVES, ROUTER_PROVIDERS,
         LocationStrategy, HashLocationStrategy,} from 'angular/router';
//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
//import the file-upload plugin
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
//import the native angular http and respone libraries
import { Http, Response } from '@angular/http';
//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
const URL = '/api/need-analysis/senate/recommend';

//create the component properties
@Component({
    moduleId: module.id,
    //define the element to be selected from the html structure.
    selector: 'pdu-staff',
    //location of our template rather than writing inline templates.
    templateUrl: 'pdu-staff.component.html',

})
export class  PDUStaffComponent implements OnInit {
   

}
