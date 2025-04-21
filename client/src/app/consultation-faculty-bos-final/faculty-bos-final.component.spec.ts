import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyBosFinalComponent } from './faculty-bos-final.component';

describe('FacultyBosFinalComponent', () => {
  let component: FacultyBosFinalComponent;
  let fixture: ComponentFixture<FacultyBosFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyBosFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyBosFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
