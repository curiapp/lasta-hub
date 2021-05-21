"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import component, ElementRef, input and the oninit method from angular core
var core_1 = require("@angular/core");
//import the file-upload plugin
var ng2_file_upload_1 = require("ng2-file-upload/ng2-file-upload");
//import the do function to be used with the http library.
require("rxjs/add/operator/do");
//import the map function to be used with the http library
require("rxjs/add/operator/map");
var URL = '/api/consultations/benchmark';
//create the component properties
var ConsultBenchmarkComponent = /** @class */ (function () {
    //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
    function ConsultBenchmarkComponent(http, el) {
        this.http = http;
        this.el = el;
        this.model = {};
        //  form: FormGroup;
        //declare a property called fileuploader and assign it to an instance of a new fileUploader.
        //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL, itemAlias: 'benchmark' });
        //This is the default title property created by the angular cli. Its responsible for the app works
        this.title = 'app works!';
    }
    ConsultBenchmarkComponent.prototype.ngOnInit = function () {
        var _this = this;
        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = function (file) { file.withCredentials = false; };
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('devCode', _this.model.programmeCode);
            form.append('decision', _this.decision);
        };
        //overide the onCompleteItem property of the uploader so we are
        //able to deal with the server response.
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log("Response:", item, status, response);
            if (status == 201) {
                alert("Benchmark Report successfully uploaded");
            }
            else {
                alert("File Upload:" + response);
            }
        };
    };
    ConsultBenchmarkComponent.prototype.clear = function () {
        this.model.programmeCode = "";
        this.selectedFile.nativeElement.value = '';
        document.getElementById("file-name").value = "";
    };
    ConsultBenchmarkComponent.prototype.updateFile = function () {
        document.getElementById("file-name").value = "";
        for (var i = 0; i < this.uploader.queue.length; i++) {
            if (i != 0)
                document.getElementById("file-name").value += " ; " + this.uploader.queue[i].file.name;
            else
                document.getElementById("file-name").value = this.uploader.queue[i].file.name;
            console.log(this.uploader.queue[i].file.name);
        }
    };
    ConsultBenchmarkComponent.prototype.setDecission = function (dec) {
        this.decision = dec;
        console.log(this.decision);
    };
    ConsultBenchmarkComponent.prototype.removefile = function () {
        document.getElementById("file-name").value = "";
    };
    __decorate([
        core_1.ViewChild('selectedFile')
    ], ConsultBenchmarkComponent.prototype, "selectedFile", void 0);
    ConsultBenchmarkComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //define the element to be selected from the html structure.
            selector: 'consult-benchmark',
            //location of our template rather than writing inline templates.
            templateUrl: 'consult-benchmark.component.html',
        })
    ], ConsultBenchmarkComponent);
    return ConsultBenchmarkComponent;
}());
exports.ConsultBenchmarkComponent = ConsultBenchmarkComponent;
