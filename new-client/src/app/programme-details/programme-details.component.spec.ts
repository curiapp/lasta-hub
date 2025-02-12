import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeDetailsComponent } from './programme-details.component';

describe('ProgrammeDetailsComponent', () => {
  let component: ProgrammeDetailsComponent;
  let fixture: ComponentFixture<ProgrammeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
