import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalReviewPduComponent } from './internal-review-pdu.component';

describe('InternalReviewPduComponent', () => {
  let component: InternalReviewPduComponent;
  let fixture: ComponentFixture<InternalReviewPduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalReviewPduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalReviewPduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
