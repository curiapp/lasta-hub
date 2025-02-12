import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAnalysisAddStakeholderComponent } from './need-analysis-add-stakeholder.component';

describe('NeedAnalysisAddStakeholderComponent', () => {
  let component: NeedAnalysisAddStakeholderComponent;
  let fixture: ComponentFixture<NeedAnalysisAddStakeholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedAnalysisAddStakeholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedAnalysisAddStakeholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
