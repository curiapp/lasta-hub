import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherFacultyBosComponent } from './other-faculty-bos.component';

describe('OtherFacultyBosComponent', () => {
  let component: OtherFacultyBosComponent;
  let fixture: ComponentFixture<OtherFacultyBosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherFacultyBosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherFacultyBosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
