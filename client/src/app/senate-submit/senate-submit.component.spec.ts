import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenateSubmitComponent } from './senate-submit.component';

describe('SenateSubmitComponent', () => {
  let component: SenateSubmitComponent;
  let fixture: ComponentFixture<SenateSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenateSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenateSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
