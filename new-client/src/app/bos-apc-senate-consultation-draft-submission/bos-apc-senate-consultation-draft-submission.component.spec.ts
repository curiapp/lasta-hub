import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BosApcSenateConsultationDraftSubmissionComponent } from './bos-apc-senate-consultation-draft-submission.component';

describe('BosApcSenateConsultationDraftSubmissionComponent', () => {
  let component: BosApcSenateConsultationDraftSubmissionComponent;
  let fixture: ComponentFixture<BosApcSenateConsultationDraftSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BosApcSenateConsultationDraftSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BosApcSenateConsultationDraftSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
