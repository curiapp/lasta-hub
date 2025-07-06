//import files from the angular framework
import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';


@Component({
  selector: 'pd-pac',
  templateUrl: 'pac.component.html',
  imports: [FormsModule, ReactiveFormsModule]
})

export class PacComponent implements OnInit {
  private fb = inject(FormBuilder);
  @Input() code: string = "defaultDevCode";
  pacAppointUrl: string = "curriculum-development/appoint/pac";
  ld = inject(LoadingService);

  myForm = this.fb.group({
    devCode: [this.code, [Validators.required, Validators.minLength(3)]],
    pac: this.fb.array([
      this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        organization: ['', Validators.required],
        occupation: ['', Validators.required],
        qualification: ['', Validators.required],
        emailAddress: ['', [Validators.required, Validators.email]],
        cellphone: ['', [Validators.minLength(10)]],
        workNumber: ['', [Validators.required, Validators.minLength(10)]]
      })
    ])
  })

  // we will use form builder to simplify our syntax
  constructor(public http: ClientService, private toast: ToastService) { }


  removeItem(index: number): void {
    const itemsArray = this.myForm.get('pac') as FormArray;
    itemsArray.removeAt(index);
  }

  addItem() {
    const itemArray = this.myForm.get('pac') as FormArray;
    const newItem = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      organization: ['', Validators.required],
      occupation: ['', Validators.required],
      qualification: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.minLength(10)]],
      workNumber: ['', [Validators.required, Validators.minLength(10)]]
    })
    itemArray.push(newItem);
  }


  get items(): FormArray {
    return this.myForm.get('pac') as FormArray;
  }

  ngOnInit() {
    this.myForm.get('devCode').setValue(this.code);
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

  onSubmit() {
    this.http.post<any>(this.pacAppointUrl, this.myForm.value)
      .subscribe({
        next: data => {
          console.log("data", data);
          this.toast.success("PAC successfully submitted!");
        },
        error: error => {
          console.log("Error HTTP Post Service", error)
          this.toast.error(`Error HTTP Post Service`);
        }
      });
  }

}
