import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalStakeholdersConsultationsComponent } from './internal-stakeholders-consultations.component';

describe('InternalStakeholdersConsultationsComponent', () => {
  let component: InternalStakeholdersConsultationsComponent;
  let fixture: ComponentFixture<InternalStakeholdersConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalStakeholdersConsultationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalStakeholdersConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
