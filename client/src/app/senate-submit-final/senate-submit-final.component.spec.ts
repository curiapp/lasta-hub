import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenateSubmitFinalComponent } from './senate-submit-final.component';

describe('SenateSubmitFinalComponent', () => {
  let component: SenateSubmitFinalComponent;
  let fixture: ComponentFixture<SenateSubmitFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenateSubmitFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenateSubmitFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
