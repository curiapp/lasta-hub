import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDevDraftSubmitPDUComponent } from './curriculum-dev-draft-submit-pdu.component';

describe('CurriculumDevDraftSubmitPduComponent', () => {
  let component: CurriculumDevDraftSubmitPDUComponent;
  let fixture: ComponentFixture<CurriculumDevDraftSubmitPDUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumDevDraftSubmitPDUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumDevDraftSubmitPDUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
