import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAnalysisConsultComponent } from './need-analysis-consult.component';

describe('NeedAnalysisConsultComponent', () => {
  let component: NeedAnalysisConsultComponent;
  let fixture: ComponentFixture<NeedAnalysisConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedAnalysisConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedAnalysisConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
