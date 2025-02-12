import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalStakeholdersConsultationCeuReviewComponent } from './internal-stakeholders-consultation-ceu-review.component';

describe('InternalStakeholdersConsultationCeuReviewComponent', () => {
  let component: InternalStakeholdersConsultationCeuReviewComponent;
  let fixture: ComponentFixture<InternalStakeholdersConsultationCeuReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalStakeholdersConsultationCeuReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalStakeholdersConsultationCeuReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
