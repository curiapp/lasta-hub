import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NqaRegComponent } from './nqa-reg.component';

describe('NqaRegComponent', () => {
  let component: NqaRegComponent;
  let fixture: ComponentFixture<NqaRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NqaRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NqaRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
