import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NQARegComponent } from './nqa-reg.component';

describe('NqaRegComponent', () => {
  let component: NQARegComponent;
  let fixture: ComponentFixture<NQARegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NQARegComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NQARegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
