import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeProgrammeComponent } from './resume-programme.component';

describe('ResumeProgrammeComponent', () => {
  let component: ResumeProgrammeComponent;
  let fixture: ComponentFixture<ResumeProgrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeProgrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
