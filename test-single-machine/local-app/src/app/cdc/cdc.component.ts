//import files from the angular framework
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Http, Response, Request, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Cdc } from '../models/cdc.interface';


@Component({
    selector: 'cdc',
    templateUrl: 'cdc.component.html'

})

export class CdcComponent implements OnInit {

    public myForm: FormGroup; // our form model
    postMyDataToServer: string;

    // we will use form builder to simplify our syntax
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
            lastName: ['',Validators.required],
            emailAddress: ['', Validators.required],
            cellphone: ['', [Validators.required, Validators.minLength(10)]],
            workNumber:['', Validators.required]
        });
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
