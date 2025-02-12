import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalStakeholdersConsultationRecommendationsComponent } from './external-stakeholders-consultation-recommendations.component';

describe('ExternalStakeholdersConsultationRecommendationsComponent', () => {
  let component: ExternalStakeholdersConsultationRecommendationsComponent;
  let fixture: ComponentFixture<ExternalStakeholdersConsultationRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalStakeholdersConsultationRecommendationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalStakeholdersConsultationRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
