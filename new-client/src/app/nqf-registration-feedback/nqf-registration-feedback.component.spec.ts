import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NqfRegistrationFeedbackComponent } from './nqf-registration-feedback.component';

describe('NqfRegistrationFeedbackComponent', () => {
  let component: NqfRegistrationFeedbackComponent;
  let fixture: ComponentFixture<NqfRegistrationFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NqfRegistrationFeedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NqfRegistrationFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
