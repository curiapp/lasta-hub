import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenateComponent } from './senate.component';

describe('SenateComponent', () => {
  let component: SenateComponent;
  let fixture: ComponentFixture<SenateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
