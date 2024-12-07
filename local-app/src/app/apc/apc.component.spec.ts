import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApcComponent } from './apc.component';

describe('ApcComponent', () => {
  let component: ApcComponent;
  let fixture: ComponentFixture<ApcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
