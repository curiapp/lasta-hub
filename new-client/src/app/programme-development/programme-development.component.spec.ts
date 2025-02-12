import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeDevelopmentComponent } from './programme-development.component';

describe('ProgrammeDevelopmentComponent', () => {
  let component: ProgrammeDevelopmentComponent;
  let fixture: ComponentFixture<ProgrammeDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeDevelopmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
