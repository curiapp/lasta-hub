import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAnalysisEditProgramComponent } from './need-analysis-edit-program.component';

describe('NeedAnalysisEditProgramComponent', () => {
  let component: NeedAnalysisEditProgramComponent;
  let fixture: ComponentFixture<NeedAnalysisEditProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedAnalysisEditProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeedAnalysisEditProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
