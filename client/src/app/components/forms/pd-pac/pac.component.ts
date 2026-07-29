import { Component, inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ClientService } from '../../../services/client.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalControlService } from '../../../services/modal-control.service';
import { ToastService } from '../../../services/toast.service';

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
  http = inject(ClientService);
  apollo = inject(Apollo);
  toast = inject(ToastService);
  modalControl = inject(ModalControlService);

  pacForm = this.fb.group({
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

  removeItem(index: number): void {
    const itemsArray = this.pacForm.get('members') as FormArray;
    itemsArray.removeAt(index);
  }

  addItem() {
    const itemArray = this.pacForm.get('members') as FormArray;
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
    return this.pacForm.get('members') as FormArray;
  }

  ngOnInit() {
    this.pacForm.get('programmeId').setValue(this.pid);
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
          // console.log("data", data);
          this.modalControl.close();
          this.toast.success(data.message);
          this.apollo.client.refetchQueries({
            include: ['GetProgrammePhase']
          });
        },
        error: error => {
          this.modalControl.close();
          // console.log("Error HTTP Post Service", error);
          this.toast.error(`Error HTTP Post Service`);
        }
      });
  }

}
