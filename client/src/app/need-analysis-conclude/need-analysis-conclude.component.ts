//import component, ElementRef, input and the oninit method from angular core
import { Component, Input } from '@angular/core';
//import the file-upload plugin
// import { FileUploader, FileUploadModule } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { FormsModule } from '@angular/forms';
// import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
//import the do function to be used with the http library.

const link = `${environment.apiUrl}/api/need-analysis/conclude`;

//create the component properties
@Component({
  selector: 'need-analysis-conclude',
  //location of our template rather than writing inline templates.
  templateUrl: 'need-analysis-conclude.component.html',
  imports: [
    FormsModule,
    FileUploadModule
  ]
})
export class NeedAnalysisConcludeComponent {
  model: any = {};
  devCode: String;
  decision: String;
  public filename = "NO FILE SELECTED"
  @Input() code?: string;
  //  form: FormGroup;

  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.

  public uploader: FileUploader = new FileUploader({ url: link, itemAlias: 'check-list' });
  //This is the default title property created by the angular cli. Its responsible for the app works
  title = 'app works!';
  // @ViewChild('selectedFile') selectedFile: any;

  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    // this.uploader.onBuildItemForm = (item: any, form: any) => {
    //   form.append('devCode', this.model.programmeCode);
    //   form.append('decission', this.decision);
    // };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    //   console.log("FileUpload:successfully uploaded:", item, status, response);
    //   if (status == 201) {

    //     alert("FileUpload: successfully");

    //   }
    //   else {
    //     alert("FileUpload:" + response);

    //   }

    // };
    this.model["programmeCode"] = this.code;
  }
  //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  // constructor(private http: HttpClient, private el: ElementRef) {}
  // clear() {
  //   this.model.programmeCode = "";
  //   this.selectedFile.nativeElement.value = '';
  //   (<HTMLInputElement>document.getElementById("file-name")).value = "";
  // }

  setDecission(dec: string) {
    this.decision = dec;
    console.log(this.decision);
  }
  // removefile() {
  //   (<HTMLInputElement>document.getElementById("file-name")).value = "";
  // }


}
