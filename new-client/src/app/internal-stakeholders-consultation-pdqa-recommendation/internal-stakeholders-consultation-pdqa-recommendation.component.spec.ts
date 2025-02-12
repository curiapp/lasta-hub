import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalStakeholdersConsultationPdqaRecommendationComponent } from './internal-stakeholders-consultation-pdqa-recommendation.component';

describe('InternalStakeholdersConsultationPdqaRecommendationComponent', () => {
  let component: InternalStakeholdersConsultationPdqaRecommendationComponent;
  let fixture: ComponentFixture<InternalStakeholdersConsultationPdqaRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalStakeholdersConsultationPdqaRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalStakeholdersConsultationPdqaRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
