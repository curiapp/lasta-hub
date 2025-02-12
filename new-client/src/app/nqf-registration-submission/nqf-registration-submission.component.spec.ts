import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NqfRegistrationSubmissionComponent } from './nqf-registration-submission.component';

describe('NqfRegistrationSubmissionComponent', () => {
  let component: NqfRegistrationSubmissionComponent;
  let fixture: ComponentFixture<NqfRegistrationSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NqfRegistrationSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NqfRegistrationSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
