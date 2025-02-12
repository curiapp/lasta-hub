import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAnalysisConsultationsComponent } from './need-analysis-consultations.component';

describe('NeedAnalysisConsultationsComponent', () => {
  let component: NeedAnalysisConsultationsComponent;
  let fixture: ComponentFixture<NeedAnalysisConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedAnalysisConsultationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedAnalysisConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
