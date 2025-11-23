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
  @Input() pid: string = "defaultDevCode";
  pacAppointUrl: string = "curriculum-development/appoint/pac";
  ld = inject(LoadingService);

  pacForm = this.fb.group({
    id: [this.pid, [Validators.required, Validators.minLength(3)]],
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

  constructor(public http: ClientService, private toast: ToastService) { }

  removeItem(index: number): void {
    const itemsArray = this.pacForm.get('pac') as FormArray;
    itemsArray.removeAt(index);
  }

  addItem() {
    const itemArray = this.pacForm.get('pac') as FormArray;
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
    return this.pacForm.get('pac') as FormArray;
  }

  ngOnInit() {
    this.pacForm.get('id').setValue(this.pid);
  }

  onCellPhoneValueChanged(value: any, controlAtX: AbstractControl) {
    let phoneNumberControl = controlAtX;
    if (!value) {
      phoneNumberControl.setValidators([Validators.required, Validators.minLength(11)]);
    } else {
      phoneNumberControl.setValidators([]);
    }
    phoneNumberControl.updateValueAndValidity(); //Need to call this to trigger a update
    return null;
  }

  onSubmit() {
    this.http.post<any>(this.pacAppointUrl, this.pacForm.value)
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
