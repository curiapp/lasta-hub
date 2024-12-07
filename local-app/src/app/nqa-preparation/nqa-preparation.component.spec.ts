import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NqaPreparationComponent } from './nqa-preparation.component';

describe('NqaPreparationComponent', () => {
  let component: NqaPreparationComponent;
  let fixture: ComponentFixture<NqaPreparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NqaPreparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NqaPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
