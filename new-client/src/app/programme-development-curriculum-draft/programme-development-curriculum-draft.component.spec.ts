import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeDevelopmentCurriculumDraftComponent } from './programme-development-curriculum-draft.component';

describe('ProgrammeDevelopmentCurriculumDraftComponent', () => {
  let component: ProgrammeDevelopmentCurriculumDraftComponent;
  let fixture: ComponentFixture<ProgrammeDevelopmentCurriculumDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeDevelopmentCurriculumDraftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeDevelopmentCurriculumDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
