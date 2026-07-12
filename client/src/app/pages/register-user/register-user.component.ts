import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { ToastService } from '../../services/toast.service';

type RegisterUserForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  department: string;
};

@Component({
  selector: 'register-user',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './register-user.component.html',
})
export class RegisterUserComponent {
  private readonly client = inject(ClientService);
  private readonly toast = inject(ToastService);

  saving = false;
  model: RegisterUserForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'lecturer',
    department: '',
  };

  roles = ['lecturer', 'hod', 'initiator', 'cdc', 'pac', 'bos', 'apc', 'senate', 'adstlt', 'ceu', 'nqa', 'pdqa', 'admin'];

  createUser() {
    if (this.saving) return;
    this.saving = true;
    this.client.post('user/create', {
      ...this.model,
      email: this.model.email.trim().toLowerCase(),
    }).subscribe({
      next: () => {
        this.saving = false;
        this.toast.success('Test user created.');
        this.model = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'lecturer',
          department: '',
        };
      },
      error: (error) => {
        this.saving = false;
        this.toast.error(error?.message ?? 'User could not be created.');
      },
    });
  }
}
