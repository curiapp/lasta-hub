import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalStakeholdersConsultationsComponent } from './external-stakeholders-consultations.component';

describe('ExternalStakeholdersConsultationsComponent', () => {
  let component: ExternalStakeholdersConsultationsComponent;
  let fixture: ComponentFixture<ExternalStakeholdersConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalStakeholdersConsultationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalStakeholdersConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
