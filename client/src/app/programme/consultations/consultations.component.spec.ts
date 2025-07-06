import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenateConsultationsComponent } from './consultations.component';

describe('SenateConsultationsComponent', () => {
  let component: SenateConsultationsComponent;
  let fixture: ComponentFixture<SenateConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenateConsultationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenateConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
