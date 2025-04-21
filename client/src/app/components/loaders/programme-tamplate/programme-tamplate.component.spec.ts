import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeTamplateComponent } from './programme-tamplate.component';

describe('ProgrammeTamplateComponent', () => {
  let component: ProgrammeTamplateComponent;
  let fixture: ComponentFixture<ProgrammeTamplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeTamplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeTamplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
