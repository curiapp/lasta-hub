import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDevDraftReviseComponent } from './curriculum-dev-draft-revise.component';

describe('CurriculumDevDraftReviseComponent', () => {
  let component: CurriculumDevDraftReviseComponent;
  let fixture: ComponentFixture<CurriculumDevDraftReviseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumDevDraftReviseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumDevDraftReviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
