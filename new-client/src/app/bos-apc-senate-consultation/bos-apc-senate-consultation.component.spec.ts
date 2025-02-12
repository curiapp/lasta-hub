import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BosApcSenateConsultationComponent } from './bos-apc-senate-consultation.component';

describe('BosApcSenateConsultationComponent', () => {
  let component: BosApcSenateConsultationComponent;
  let fixture: ComponentFixture<BosApcSenateConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BosApcSenateConsultationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BosApcSenateConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
