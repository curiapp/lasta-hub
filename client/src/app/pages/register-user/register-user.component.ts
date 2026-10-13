import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { DashboardService, ManagedUser } from '../../services/dashboard.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ConfirmModalComponent } from '../../components/modals/confirm-modal/confirm-modal.component';
import { ManagementDialogComponent } from '../dashboard/management-dialog.component';

type RegisterUserForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  department: string;
};

type InstitutionalUnit = { id: string; name: string };
type Department = InstitutionalUnit & { facultyId: string | null };

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'register-user',
  imports: [FormsModule, ConfirmModalComponent, ManagementDialogComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent implements OnInit {
  private readonly toast = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dashboard = inject(DashboardService);
  readonly auth = inject(AuthenticationService);
  readonly users = signal<ManagedUser[]>([]);
  readonly usersLoading = signal(true);
  readonly usersError = signal(false);
  readonly query = signal('');
  readonly editingId = signal('');
  readonly formVisible = signal(false);
  readonly pendingDelete = signal<ManagedUser | null>(null);
  readonly deleting = signal(false);

  readonly filteredUsers = computed(() => {
    const query = this.query().trim().toLowerCase();
    return this.users().filter(user => `${user.firstName} ${user.lastName} ${user.email} ${user.role} ${user.departmentName ?? ''}`.toLowerCase().includes(query));
  });

  loadUsers() {
    this.usersLoading.set(true);
    this.usersError.set(false);
    this.dashboard.request<ManagedUser[]>('GET', 'users').pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: users => { this.users.set(users); this.usersLoading.set(false); },
      error: () => { this.usersLoading.set(false); this.usersError.set(true); },
    });
  }

  editUser(user: ManagedUser) {
    this.formVisible.set(true);
    this.editingId.set(user.id);
    this.selectedFacultyId.set(this.departments().find(unit => unit.id === user.department)?.facultyId ?? '');
    this.model = { firstName: user.firstName ?? '', lastName: user.lastName ?? '', email: user.email, role: user.role, department: user.department ?? '', password: '' };
    if (!this.departments().length) this.loadDepartments();
  }

  cancelEdit() {
    this.formVisible.set(false);
    this.editingId.set('');
    this.model = { firstName: '', lastName: '', email: '', password: '', role: 'lecturer', department: '' };
    this.selectedFacultyId.set('');
  }

  addUser() {
    this.cancelEdit();
    this.formVisible.set(true);
    if (!this.departments().length) this.loadDepartments();
  }

  deleteUser() {
    const user = this.pendingDelete();
    this.pendingDelete.set(null);
    if (!user || this.deleting()) return;
    this.deleting.set(true);
    this.dashboard.request('DELETE', `users/${user.id}`).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => { this.deleting.set(false); if (this.editingId() === user.id) this.cancelEdit(); this.toast.success('User deleted.'); this.loadUsers(); },
      error: error => { this.deleting.set(false); this.toast.error(error?.message ?? 'User could not be deleted.'); },
    });
  }

  readonly faculties = signal<InstitutionalUnit[]>([]);
  readonly departments = signal<Department[]>([]);
  readonly selectedFacultyId = signal('');
  readonly loadingDepartments = signal(true);
  readonly departmentsError = signal(false);

  readonly availableDepartments = computed(() => {
    return this.departments().filter(department => !this.selectedFacultyId() || department.facultyId === this.selectedFacultyId());
  });

  ngOnInit() {
    this.loadUsers();
  }

  loadDepartments() {
    this.loadingDepartments.set(true);
    this.departmentsError.set(false);
    this.dashboard.metadata<{ faculties: InstitutionalUnit[]; departments: Department[] }>('institutional-units')
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: units => {
          this.faculties.set(units.faculties ?? []);
          this.departments.set((units.departments ?? []).sort((a, b) => a.name.localeCompare(b.name)));
          if (this.editingId()) this.selectedFacultyId.set(this.departments().find(unit => unit.id === this.model.department)?.facultyId ?? '');
          this.loadingDepartments.set(false);
        },
        error: () => {
          this.loadingDepartments.set(false);
          this.departmentsError.set(true);
        },
      });
  }

  changeFaculty() {
    this.model.department = '';
  }

  readonly saving = signal(false);
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
    if (this.saving() || this.deleting() || this.loadingDepartments() || !this.availableDepartments().some(department => department.id === this.model.department)
      || !this.model.firstName.trim() || !this.model.lastName.trim() || !this.model.email.trim() || (!this.editingId() && !this.model.password)) return;
    this.saving.set(true);
    const editingId = this.editingId();
    this.dashboard.request(editingId ? 'PUT' : 'POST', editingId ? `users/${editingId}` : 'users', {
      ...this.model,
      email: this.model.email.trim().toLowerCase(),
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.saving.set(false);
        this.toast.success(editingId ? 'User updated. They must sign in again.' : 'User created successfully.');
        this.cancelEdit();
        if (editingId === this.auth.user?.id) { this.auth.logout(); return; }
        this.loadUsers();
      },
      error: (error) => {
        this.saving.set(false);
        this.toast.error(error?.message ?? 'User could not be created.');
      },
    });
  }
}
