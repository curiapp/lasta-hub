import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDevPACConsultComponent } from './curriculum-dev-pac-consult.component';

describe('CurriculumDevPacConsultComponent', () => {
  let component: CurriculumDevPACConsultComponent;
  let fixture: ComponentFixture<CurriculumDevPACConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumDevPACConsultComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumDevPACConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
