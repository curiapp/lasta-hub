//import files from the angular framework
import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { ToastService } from '../../../services/toast.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';

@Component({
  selector: 'pd-cdc',
  templateUrl: 'cdc.component.html',
  imports: [ReactiveFormsModule]
})

export class CdcComponent implements OnInit {
  private fb = inject(FormBuilder);
  private url = "curriculum-development/appoint/cdc";
  @Input() pid = "";
  ld = inject(LoadingService);
  http = inject(ClientService);
  toast = inject(ToastService);
  modalControl = inject(ModalControlService);

  cdcForm = this.fb.group({
    programmeId: [this.pid, [Validators.required, Validators.minLength(3)]],
    members: this.fb.array([
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

  addItem() {
    const itemArray = this.cdcForm.get('members') as FormArray;
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
    const itemsArray = this.cdcForm.get('members') as FormArray;
    itemsArray.removeAt(index);
  }


  get items(): FormArray {
    return this.cdcForm.get('members') as FormArray;
  }

  ngOnInit() {
    this.cdcForm.get('programmeId').setValue(this.pid);
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
    this.http.post<any>(this.url, this.cdcForm.value)
      .subscribe({
        next: data => {
          // console.log("data", data);
          this.modalControl.close();
          this.toast.success(data.message);
        },
        error: error => {
          this.modalControl.close();
          // console.log("Error HTTP Post Service", error)
          this.toast.error(`Error HTTP Post Service`);
        }
      });
  }
}
