import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeTableComponent } from './programme-table.component';

describe('ProgrammeTableComponent', () => {
  let component: ProgrammeTableComponent;
  let fixture: ComponentFixture<ProgrammeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
