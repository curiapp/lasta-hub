import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PduRecommendComponent } from './pdu-recommend.component';

describe('PduRecommendComponent', () => {
  let component: PduRecommendComponent;
  let fixture: ComponentFixture<PduRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PduRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PduRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
