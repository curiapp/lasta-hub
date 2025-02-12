import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeDevelopmentCdcPacComponent } from './programme-development-cdc-pac.component';

describe('ProgrammeDevelopmentCdcPacComponent', () => {
  let component: ProgrammeDevelopmentCdcPacComponent;
  let fixture: ComponentFixture<ProgrammeDevelopmentCdcPacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeDevelopmentCdcPacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeDevelopmentCdcPacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
