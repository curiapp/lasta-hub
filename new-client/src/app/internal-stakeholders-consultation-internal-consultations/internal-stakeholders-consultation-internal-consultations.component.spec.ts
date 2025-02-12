import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalStakeholdersConsultationInternalConsultationsComponent } from './internal-stakeholders-consultation-internal-consultations.component';

describe('InternalStakeholdersConsultationInternalConsultationsComponent', () => {
  let component: InternalStakeholdersConsultationInternalConsultationsComponent;
  let fixture: ComponentFixture<InternalStakeholdersConsultationInternalConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalStakeholdersConsultationInternalConsultationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalStakeholdersConsultationInternalConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
