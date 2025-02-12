import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalStakeholdersConsultationBenchmarkingComponent } from './external-stakeholders-consultation-benchmarking.component';

describe('ExternalStakeholdersConsultationBenchmarkingComponent', () => {
  let component: ExternalStakeholdersConsultationBenchmarkingComponent;
  let fixture: ComponentFixture<ExternalStakeholdersConsultationBenchmarkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalStakeholdersConsultationBenchmarkingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalStakeholdersConsultationBenchmarkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
