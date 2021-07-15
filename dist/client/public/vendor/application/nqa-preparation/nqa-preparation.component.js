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
var URL = '/api/nqa/preparation';
//create the component properties
var NqaPreparationComponent = /** @class */ (function () {
    //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
    function NqaPreparationComponent(http, el) {
        this.http = http;
        this.el = el;
        this.model = {};
        //  form: FormGroup;
        //declare a property called fileuploader and assign it to an instance of a new fileUploader.
        //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
        this.uploader = new ng2_file_upload_1.FileUploader({ url: URL, itemAlias: 'nqa-pre' });
        //This is the default title property created by the angular cli. Its responsible for the app works
        this.title = 'app works!';
    }
    NqaPreparationComponent.prototype.ngOnInit = function () {
        var _this = this;
        //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
        //this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onAfterAddingAll = function (addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('devCode', _this.model.programmeCode);
        };
        //overide the onCompleteItem property of the uploader so we are
        //able to deal with the server response.
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            console.log("submission:successfully uploaded:", item, status, response);
            if (status == 201) {
                alert("FileUpload: successfully");
            }
            else {
                alert("FileUpload:" + response);
            }
        };
    };
    NqaPreparationComponent.prototype.clear = function () {
        this.model.programmeCode = "";
        document.getElementById("qualification-doc").value = "";
        document.getElementById("support-file").value = "";
    };
    NqaPreparationComponent.prototype.updateFile = function (id) {
        for (var i = 0; i < this.uploader.queue.length - 1; i++) {
            console.log(this.uploader.queue[i]);
        }
        document.getElementById(id).value = "";
        if (this.uploader.queue.length > 2) {
            for (var i = 0; i < this.uploader.queue.length - 1; i++) {
                this.uploader.queue[i] = this.uploader.queue[i + 1];
                console.log(this.uploader.queue[i]);
            }
            this.uploader.queue[2].remove();
        }
        document.getElementById(id).value = this.uploader.queue[this.uploader.queue.length - 1].file.name;
    };
    NqaPreparationComponent.prototype.removefile = function (id) {
        var label = document.getElementById(id).value;
        for (var i = 0; i < this.uploader.queue.length; i++) {
            if (this.uploader.queue[i].file.name === label) {
                this.uploader.queue[i].remove();
                break;
            }
        }
        document.getElementById(id).value = "";
    };
    NqaPreparationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //define the element to be selected from the html structure.
            selector: 'nqa-preparation',
            //location of our template rather than writing inline templates.
            templateUrl: 'nqa-preparation.component.html',
        })
    ], NqaPreparationComponent);
    return NqaPreparationComponent;
}());
exports.NqaPreparationComponent = NqaPreparationComponent;
