import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BosSubmitComponent } from './bos-submit.component';

describe('BosSubmitComponent', () => {
  let component: BosSubmitComponent;
  let fixture: ComponentFixture<BosSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BosSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BosSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
