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
var URL = '/api/bos-senate/faculty-bos-recommend';
//create the component properties
var FacultyBosFinalComponent = /** @class */ (function () {
    //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
    function FacultyBosFinalComponent(http, el, router, _location) {
        this.http = http;
        this.el = el;
        this.router = router;
        this._location = _location;
        this.model = {};
        //declare a property called fileuploader and assign it to an instance of a new fileUploader.
        //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL, itemAlias: 'faculty-bos' });
        //This is the default title property created by the angular cli. Its responsible for the app works
        this.title = 'app works!';
    }
    FacultyBosFinalComponent.prototype.ngOnInit = function () {
        var _this = this;
        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        this.uploader.onAfterAddingFile = function (file) { file.withCredentials = false; };
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('devCode', _this.model.programmeCode);
            form.append('date', _this.model.consultationDate);
            console.log(_this.model.status);
            form.append('status', _this.model.status);
        };
        //overide the onCompleteItem property of the uploader so we are
        //able to deal with the server response.
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log("FileUpload:successfully uploaded:", item, status, response);
            if (status == 201) {
                alert("Faculty BOS Recommendations successfully uploaded");
            }
            else {
                alert("Faculty BOS Recommendations responce:" + response);
            }
        };
    };
    FacultyBosFinalComponent.prototype.clear = function () {
        this.model.programmeCode = "";
        this.model.consultationDate = null;
        this.model.status = "";
        this.selectedFile.nativeElement.value = '';
        document.getElementById("file-name").value = "";
    };
    FacultyBosFinalComponent.prototype.updateFile = function () {
        document.getElementById("file-name").value = "";
        for (var i = 0; i < this.uploader.queue.length; i++) {
            if (i != 0)
                document.getElementById("file-name").value += " ; " + this.uploader.queue[i].file.name;
            else
                document.getElementById("file-name").value = this.uploader.queue[i].file.name;
            console.log(this.uploader.queue[i].file.name);
        }
    };
    FacultyBosFinalComponent.prototype.close = function () {
        console.log("closing the window...");
        this.router.navigate(['/home']);
    };
    FacultyBosFinalComponent.prototype.removefile = function () {
        document.getElementById("file-name").value = "";
    };
    FacultyBosFinalComponent.prototype.backClicked = function () {
        this._location.back();
    };
    __decorate([
        core_1.ViewChild('selectedFile')
    ], FacultyBosFinalComponent.prototype, "selectedFile", void 0);
    FacultyBosFinalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //define the element to be selected from the html structure.
            selector: 'faculty-bos-final',
            //location of our template rather than writing inline templates.
            templateUrl: 'faculty-bos-final.component.html',
        })
    ], FacultyBosFinalComponent);
    return FacultyBosFinalComponent;
}());
exports.FacultyBosFinalComponent = FacultyBosFinalComponent;
