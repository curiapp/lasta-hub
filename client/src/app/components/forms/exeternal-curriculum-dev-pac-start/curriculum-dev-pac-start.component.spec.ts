import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDevPACStartComponent } from './curriculum-dev-pac-start.component';

describe('CurriculumDevPacStartComponent', () => {
  let component: CurriculumDevPACStartComponent;
  let fixture: ComponentFixture<CurriculumDevPACStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumDevPACStartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumDevPACStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
