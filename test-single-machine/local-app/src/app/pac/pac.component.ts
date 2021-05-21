//import files from the angular framework
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Pac } from '../models/pac.interface';


@Component({
    selector: 'pac',
    templateUrl: 'pac.component.html'

})

export class PacComponent implements OnInit {

    public myForm: FormGroup; // our form model
    postMyDataToServer: string;

    // we will use form builder to simplify our syntax
    constructor(private _fb: FormBuilder, public http: Http) { }


    ngOnInit() {
        // we will initialize our form here
        this.myForm = this._fb.group({
            devCode: ['', [Validators.required, Validators.minLength(3)]],
            pac: this._fb.array([
                this.initAddress(),
            ])
        });


    }

    initAddress() {
        // initialize our address
        return this._fb.group({
            firstName: ['', Validators.required],
            lastName: ['',Validators.required],
            organisation: ['', Validators.required],
            occupation: ['', Validators.required],
            emailAddress: ['', Validators.required],
            cellphone: ['',Validators.required, [ Validators.minLength(10)]],
             workNumber:['',Validators.required]
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
        let startHeaders = new Headers({ 'Content-Type': 'application/json' });
        let startOptions = new RequestOptions({ headers: startHeaders, method: "post" });

        return this.http.post(this.pacAppointUrl, body, startOptions)
            .map((response: Response) => { response = response.json(); });

    }


    postDataToServer() {
        this.startNeedAnalysis(this.myForm.value)
            .subscribe(data => this.postMyDataToServer = JSON.stringify(data), // put the data returned from the server in our variable
            error => console.log("Error HTTP Post Service"), // in case of failure show this message
            () => console.log("Job Done Post !")//run this code in all cases
            );
    }


}
