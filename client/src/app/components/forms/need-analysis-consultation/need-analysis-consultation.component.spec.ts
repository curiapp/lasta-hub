import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAnalysisConsultationComponent } from './need-analysis-consultation.component';

describe('NeedAnalysisConsultationComponent', () => {
  let component: NeedAnalysisConsultationComponent;
  let fixture: ComponentFixture<NeedAnalysisConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedAnalysisConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedAnalysisConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
