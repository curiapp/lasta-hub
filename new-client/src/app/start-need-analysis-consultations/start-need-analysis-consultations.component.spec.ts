import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNeedAnalysisConsultationsComponent } from './start-need-analysis-consultations.component';

describe('StartNeedAnalysisConsultationsComponent', () => {
  let component: StartNeedAnalysisConsultationsComponent;
  let fixture: ComponentFixture<StartNeedAnalysisConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartNeedAnalysisConsultationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartNeedAnalysisConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
