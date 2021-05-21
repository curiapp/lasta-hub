import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumDevPacStartComponent } from './curriculum-dev-pac-start.component';

describe('CurriculumDevPacStartComponent', () => {
  let component: CurriculumDevPacStartComponent;
  let fixture: ComponentFixture<CurriculumDevPacStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumDevPacStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumDevPacStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
