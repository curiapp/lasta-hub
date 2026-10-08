import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacConsultEndorseComponent } from './pac-consult-endorse.component';

describe('PacConsultEndorseComponent', () => {
  let component: PacConsultEndorseComponent;
  let fixture: ComponentFixture<PacConsultEndorseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacConsultEndorseComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacConsultEndorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
