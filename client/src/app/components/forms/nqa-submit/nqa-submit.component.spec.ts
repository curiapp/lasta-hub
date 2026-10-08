import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NqaSubmitComponent } from './nqa-submit.component';

describe('NqaSubmitComponent', () => {
  let component: NqaSubmitComponent;
  let fixture: ComponentFixture<NqaSubmitComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [ NqaSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NqaSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
