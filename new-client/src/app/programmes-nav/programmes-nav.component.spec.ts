import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesNavComponent } from './programmes-nav.component';

describe('ProgrammesNavComponent', () => {
  let component: ProgrammesNavComponent;
  let fixture: ComponentFixture<ProgrammesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammesNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
