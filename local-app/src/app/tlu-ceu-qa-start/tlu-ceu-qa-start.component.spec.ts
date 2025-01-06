import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TluCeuQaStartComponent } from './tlu-ceu-qa-start.component';

describe('TluCeuQaStartComponent', () => {
  let component: TluCeuQaStartComponent;
  let fixture: ComponentFixture<TluCeuQaStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TluCeuQaStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TluCeuQaStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
