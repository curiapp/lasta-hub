import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, Subject } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastService } from '../../services/toast.service';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { ProgrammeManagementComponent } from './programme-management.component';

describe('Dashboard asynchronous rendering with signals', () => {
  let response: Subject<unknown>;

  beforeEach(async () => {
    response = new Subject();
    await TestBed.configureTestingModule({
      imports: [RegisterUserComponent, ProgrammeManagementComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: DashboardService, useValue: {
          request: () => response,
          metadata: (path: string) => of(path === 'institutional-units' ? { faculties: [], departments: [] } : []),
        } },
        { provide: AuthenticationService, useValue: { user: { id: 'pdqa', role: 'pdqa' } } },
        { provide: ToastService, useValue: { success: () => {}, error: () => {} } },
      ],
    }).compileComponents();
  });

  it('replaces the user skeleton after an asynchronous response without manual change detection', async () => {
    const fixture = TestBed.createComponent(RegisterUserComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[aria-label="Loading users"]')).not.toBeNull();
    response.next([{ id: 'user', firstName: 'Ada', lastName: 'Lovelace', email: 'ada@example.com', role: 'lecturer', department: 'department' }]);
    response.complete();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[aria-label="Loading users"]')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('ada@example.com');
    fixture.componentInstance.query.set('no matching user');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('No users found.');
  });

  it('replaces the user skeleton with a retry state after an error', async () => {
    const fixture = TestBed.createComponent(RegisterUserComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    response.error(new Error('Network failure'));
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[aria-label="Loading users"]')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Users could not be loaded.');
  });

  it('replaces the programme skeleton after an asynchronous response without manual change detection', async () => {
    const fixture = TestBed.createComponent(ProgrammeManagementComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[aria-label="Loading programmes"]')).not.toBeNull();
    response.next([{ id: 'programme', title: 'Computer Science', code: 'CS01', level: 7, status: 'in_progress', department: 'department', faculty: 'faculty' }]);
    response.complete();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[aria-label="Loading programmes"]')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Computer Science');
    fixture.componentInstance.facultyFilter.set('different-faculty');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('No programmes found.');
  });

  it('replaces the programme skeleton with a retry state after an error', async () => {
    const fixture = TestBed.createComponent(ProgrammeManagementComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    response.error(new Error('Network failure'));
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[aria-label="Loading programmes"]')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Programmes could not be loaded.');
  });
});
