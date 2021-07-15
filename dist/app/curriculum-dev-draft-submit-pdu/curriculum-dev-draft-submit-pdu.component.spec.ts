import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDevDraftSubmitPduComponent } from './curriculum-dev-draft-submit-pdu.component';

describe('CurriculumDevDraftSubmitPduComponent', () => {
  let component: CurriculumDevDraftSubmitPduComponent;
  let fixture: ComponentFixture<CurriculumDevDraftSubmitPduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumDevDraftSubmitPduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumDevDraftSubmitPduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
