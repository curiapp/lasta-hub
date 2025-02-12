import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BosApcSenateConsultationSenateRecommendationComponent } from './bos-apc-senate-consultation-senate-recommendation.component';

describe('BosApcSenateConsultationSenateRecommendationComponent', () => {
  let component: BosApcSenateConsultationSenateRecommendationComponent;
  let fixture: ComponentFixture<BosApcSenateConsultationSenateRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BosApcSenateConsultationSenateRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BosApcSenateConsultationSenateRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
