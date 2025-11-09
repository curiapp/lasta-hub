import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartNeedAnalysisComponent } from './start-need-analysis.component';

describe('StartNeedAnalysisComponent', () => {
  let component: StartNeedAnalysisComponent;
  let fixture: ComponentFixture<StartNeedAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartNeedAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartNeedAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
