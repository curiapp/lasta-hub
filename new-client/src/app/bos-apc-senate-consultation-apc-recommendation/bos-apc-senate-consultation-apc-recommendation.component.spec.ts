import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BosApcSenateConsultationApcRecommendationComponent } from './bos-apc-senate-consultation-apc-recommendation.component';

describe('BosApcSenateConsultationApcRecommendationComponent', () => {
  let component: BosApcSenateConsultationApcRecommendationComponent;
  let fixture: ComponentFixture<BosApcSenateConsultationApcRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BosApcSenateConsultationApcRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BosApcSenateConsultationApcRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
