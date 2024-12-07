import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacConsultDraftComponent } from './pac-consult-draft.component';

describe('PacConsultDraftComponent', () => {
  let component: PacConsultDraftComponent;
  let fixture: ComponentFixture<PacConsultDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacConsultDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacConsultDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
