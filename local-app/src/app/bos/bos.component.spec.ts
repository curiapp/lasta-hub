import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BosComponent } from './bos.component';

describe('BosComponent', () => {
  let component: BosComponent;
  let fixture: ComponentFixture<BosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
