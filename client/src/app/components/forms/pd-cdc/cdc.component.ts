//import files from the angular framework
import { HttpClient as Http } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cdc } from '../../../models/cdc.interface';


@Component({
  selector: 'pd-cdc',
  standalone: true,
  templateUrl: 'cdc.component.html'
})

export class CdcComponent implements OnInit {

  public myForm: FormGroup; // our form model
  postMyDataToServer: string;
  // we will use form builder to simplify our syntax
  @Input() code: string = "defaultDevCode";

  constructor(private _fb: FormBuilder, public http: Http) { }


  ngOnInit() {
    // we will initialize our form here
    this.myForm = this._fb.group({
      devCode: ['', [Validators.required, Validators.minLength(3)]],
      cdc: this._fb.array([
        this.initAddress(),
      ])
    });


  }

  initAddress() {
    // initialize our address
    return this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.minLength(10)]],
      workNumber: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onCellPhoneValueChanged(value: any, controlAtX: AbstractControl) {
    console.log(value)
    let phoneNumberControl = controlAtX;
    if (!value) {
      phoneNumberControl.setValidators([Validators.required, Validators.minLength(11)]);
    } else {
      phoneNumberControl.setValidators([]);
    }

    phoneNumberControl.updateValueAndValidity(); //Need to call this to trigger a update
    return null;
  }

  addAddress() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['cdc'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['cdc'];
    control.removeAt(i);
  }

  save(model: Cdc) {
    // call API to save customer
    // console.log(model);
    console.log(this.myForm.value);
    alert(this.myForm.value);
  }

  private pacAppointUrl: string = "/api/curriculum-development/appoint/cdc";

  startNeedAnalysis(model: Cdc) {

    let body = JSON.stringify(this.myForm.value);
    // let startHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    // let startOptions = new RequestOptions({ headers: startHeaders, method: "post" });

    return this.http.post(this.pacAppointUrl, body)
    // .map((response: any) => { response = response.json(); });

  }


  postDataToServer() {
    this.startNeedAnalysis(this.myForm.value)
      .subscribe(data => this.postMyDataToServer = JSON.stringify(data), // put the data returned from the server in our variable
        error => console.log("Error HTTP Post Service"), // in case of failure show this message
        () => alert("CDC names added !")//run this code in all cases
      );
  }
}
