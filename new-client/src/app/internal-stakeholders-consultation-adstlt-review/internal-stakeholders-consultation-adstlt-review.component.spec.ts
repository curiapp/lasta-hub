import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalStakeholdersConsultationAdstltReviewComponent } from './internal-stakeholders-consultation-adstlt-review.component';

describe('InternalStakeholdersConsultationAdstltReviewComponent', () => {
  let component: InternalStakeholdersConsultationAdstltReviewComponent;
  let fixture: ComponentFixture<InternalStakeholdersConsultationAdstltReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalStakeholdersConsultationAdstltReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalStakeholdersConsultationAdstltReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
