import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAnalysisPdqaDecisionComponent } from './need-analysis-pdqa-decision.component';

describe('NeedAnalysisPdqaDecisionComponent', () => {
  let component: NeedAnalysisPdqaDecisionComponent;
  let fixture: ComponentFixture<NeedAnalysisPdqaDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedAnalysisPdqaDecisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedAnalysisPdqaDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
