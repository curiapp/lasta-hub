import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacComponent } from './pac.component';

describe('PacComponent', () => {
  let component: PacComponent;
  let fixture: ComponentFixture<PacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
