import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAnalysisApcRecommendationComponent } from './need-analysis-apc-recommendation.component';

describe('NeedAnalysisApcRecommendationComponent', () => {
  let component: NeedAnalysisApcRecommendationComponent;
  let fixture: ComponentFixture<NeedAnalysisApcRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedAnalysisApcRecommendationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedAnalysisApcRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
