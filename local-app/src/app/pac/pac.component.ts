//import files from the angular framework
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Pac } from '../models/pac.interface';


@Component({
  selector: 'pac',
  standalone: true,
  templateUrl: 'pac.component.html'

})

export class PacComponent implements OnInit {

  public myForm: FormGroup; // our form model
  postMyDataToServer: string;

  // we will use form builder to simplify our syntax
  constructor(private _fb: FormBuilder, public http: HttpClient) { }


  ngOnInit() {
    // we will initialize our form here
    this.myForm = this._fb.group({
      devCode: ['', [Validators.required, Validators.minLength(3)]],
      pac: this._fb.array([
        this.initAddress(),
      ])
    });

    //Listen to email value and update validators of phoneNumber accordingly
    // this.myForm.controls.pac.get('cellphone').valueChanges.subscribe(data => this.onCellPhoneValueChanged(data));

  }

  onCellPhoneValueChanged(value: any, controlAtX: AbstractControl) {
    console.log(value)
    let phoneNumberControl = controlAtX;

    // Using setValidators to add and remove validators. No better support for adding and removing validators to controller atm.
    // See issue: https://github.com/angular/angular/issues/10567
    if (!value) {
      phoneNumberControl.setValidators([Validators.required, Validators.minLength(11)]);
    } else {
      phoneNumberControl.setValidators([]);
    }

    phoneNumberControl.updateValueAndValidity(); //Need to call this to trigger a update
    return null;
  }

  initAddress() {
    // initialize our address
    return this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      organisation: ['', Validators.required],
      occupation: ['', Validators.required],
      qualification: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.minLength(10)]],
      workNumber: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  addAddress() {
    // add address to the list
    const control = <FormArray>this.myForm.controls['pac'];
    control.push(this.initAddress());
  }

  removeAddress(i: number) {
    // remove address from the list
    const control = <FormArray>this.myForm.controls['pac'];
    control.removeAt(i);
  }

  save(model: Pac) {

    // call API to save customer
    // console.log(model);
    console.log(this.myForm.value);
    alert(this.myForm.value);
  }

  private pacAppointUrl: string = "/api/curriculum-development/appoint/pac";

  startNeedAnalysis(model: Pac) {
    console.log(this.myForm.value);
    let body = JSON.stringify(this.myForm.value);
    // let startHeaders = new Headers({ 'Content-Type': 'application/json' });

    return this.http.post(this.pacAppointUrl, body,
      // { headers: startHeaders }
    );
  }


  postDataToServer() {
    this.startNeedAnalysis(this.myForm.value)
      .subscribe(data => this.postMyDataToServer = JSON.stringify(data), // put the data returned from the server in our variable
        error => console.log("Error HTTP Post Service"), // in case of failure show this message
        () => console.log("Job Done Post !")//run this code in all cases
      );
  }


}
