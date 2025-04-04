import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BosSubmitFinalComponent } from './bos-submit-final.component';

describe('BosSubmitFinalComponent', () => {
  let component: BosSubmitFinalComponent;
  let fixture: ComponentFixture<BosSubmitFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BosSubmitFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BosSubmitFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
