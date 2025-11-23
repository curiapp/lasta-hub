//import files from the angular framework
import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'pd-cdc',
  templateUrl: 'cdc.component.html',
  imports: [ReactiveFormsModule]
})

export class CdcComponent implements OnInit {
  private fb = inject(FormBuilder);
  private pacAppointUrl: string = "curriculum-development/appoint/cdc";
  @Input() pid: string = "";
  ld = inject(LoadingService);
  http = inject(ClientService);
  toast = inject(ToastService);

  cdcForm = this.fb.group({
    id: [this.pid, [Validators.required, Validators.minLength(3)]],
    cdc: this.fb.array([
      this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        organization: ['', Validators.required],
        qualification: ['', Validators.required],
        emailAddress: ['', [Validators.required, Validators.email]],
        cellphone: ['', [Validators.minLength(10)]],
        workNumber: ['', [Validators.required, Validators.minLength(10)]]
      })
    ])
  })

  addItem() {
    const itemArray = this.cdcForm.get('cdc') as FormArray;
    const newItem = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      organization: ['', Validators.required],
      qualification: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.minLength(10)]],
      workNumber: ['', [Validators.required, Validators.minLength(10)]]
    })
    itemArray.push(newItem);
  }

  removeItem(index: number): void {
    const itemsArray = this.cdcForm.get('cdc') as FormArray;
    itemsArray.removeAt(index);
  }


  get items(): FormArray {
    return this.cdcForm.get('cdc') as FormArray;
  }

  ngOnInit() {
    this.cdcForm.get('id').setValue(this.pid);
  }

  onCellPhoneValueChanged(value: any, controlAtX: AbstractControl) {
    let phoneNumberControl = controlAtX;
    if (!value) {
      phoneNumberControl.setValidators([Validators.required, Validators.minLength(11)]);
    } else {
      phoneNumberControl.setValidators([]);
    }
    phoneNumberControl.updateValueAndValidity();
    return null;
  }

  onSubmit() {
    this.http.post<any>(this.pacAppointUrl, this.cdcForm.value)
      .subscribe({
        next: data => {
          console.log("data", data);
          this.toast.success("CDC successfully submitted!");
        },
        error: error => {
          console.log("Error HTTP Post Service", error)
          this.toast.error(`Error HTTP Post Service`);
        }
      });
  }
}
