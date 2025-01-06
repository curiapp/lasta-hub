import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultBenchmarkComponent } from './consult-benchmark.component';

describe('ConsultBenchmarkComponent', () => {
  let component: ConsultBenchmarkComponent;
  let fixture: ComponentFixture<ConsultBenchmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultBenchmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultBenchmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
