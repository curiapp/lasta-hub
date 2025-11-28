import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TLUCEUQAStartComponent } from './tlu-ceu-qa-start.component';

describe('TluCeuQaStartComponent', () => {
  let component: TLUCEUQAStartComponent;
  let fixture: ComponentFixture<TLUCEUQAStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TLUCEUQAStartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TLUCEUQAStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
