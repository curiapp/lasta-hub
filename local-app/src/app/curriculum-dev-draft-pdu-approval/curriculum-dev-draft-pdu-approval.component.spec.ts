import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDevDraftPduApprovalComponent } from './curriculum-dev-draft-pdu-approval.component';

describe('CurriculumDevDraftPduApprovalComponent', () => {
  let component: CurriculumDevDraftPduApprovalComponent;
  let fixture: ComponentFixture<CurriculumDevDraftPduApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumDevDraftPduApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumDevDraftPduApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
