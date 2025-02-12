import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAnalysisSenateRecommendationComponent } from './need-analysis-senate-recommendation.component';

describe('NeedAnalysisSenateRecommendationComponent', () => {
  let component: NeedAnalysisSenateRecommendationComponent;
  let fixture: ComponentFixture<NeedAnalysisSenateRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedAnalysisSenateRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedAnalysisSenateRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
