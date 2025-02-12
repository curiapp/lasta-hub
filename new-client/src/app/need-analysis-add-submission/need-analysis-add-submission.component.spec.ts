import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAnalysisAddSubmissionComponent } from './need-analysis-add-submission.component';

describe('NeedAnalysisAddSubmissionComponent', () => {
  let component: NeedAnalysisAddSubmissionComponent;
  let fixture: ComponentFixture<NeedAnalysisAddSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedAnalysisAddSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedAnalysisAddSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
