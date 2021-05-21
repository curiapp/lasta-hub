import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDevPacConsultComponent } from './curriculum-dev-pac-consult.component';

describe('CurriculumDevPacConsultComponent', () => {
  let component: CurriculumDevPacConsultComponent;
  let fixture: ComponentFixture<CurriculumDevPacConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumDevPacConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumDevPacConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
