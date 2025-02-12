import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAnalysisBosConsultationComponent } from './need-analysis-bos-consultation.component';

describe('NeedAnalysisBosConsultationComponent', () => {
  let component: NeedAnalysisBosConsultationComponent;
  let fixture: ComponentFixture<NeedAnalysisBosConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedAnalysisBosConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedAnalysisBosConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
