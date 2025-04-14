import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalReviewPduComponent } from './internal-review-pdqa.component';

describe('InternalReviewPduComponent', () => {
  let component: InternalReviewPduComponent;
  let fixture: ComponentFixture<InternalReviewPduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InternalReviewPduComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InternalReviewPduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
