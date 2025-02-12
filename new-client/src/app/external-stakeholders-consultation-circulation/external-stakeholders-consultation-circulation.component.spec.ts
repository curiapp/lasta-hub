import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalStakeholdersConsultationCirculationComponent } from './external-stakeholders-consultation-circulation.component';

describe('ExternalStakeholdersConsultationCirculationComponent', () => {
  let component: ExternalStakeholdersConsultationCirculationComponent;
  let fixture: ComponentFixture<ExternalStakeholdersConsultationCirculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalStakeholdersConsultationCirculationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalStakeholdersConsultationCirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
