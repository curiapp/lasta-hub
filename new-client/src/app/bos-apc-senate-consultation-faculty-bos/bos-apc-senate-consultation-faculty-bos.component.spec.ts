import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BosApcSenateConsultationFacultyBosComponent } from './bos-apc-senate-consultation-faculty-bos.component';

describe('BosApcSenateConsultationFacultyBosComponent', () => {
  let component: BosApcSenateConsultationFacultyBosComponent;
  let fixture: ComponentFixture<BosApcSenateConsultationFacultyBosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BosApcSenateConsultationFacultyBosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BosApcSenateConsultationFacultyBosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
