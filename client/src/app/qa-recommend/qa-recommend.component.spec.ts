import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaRecommendComponent } from './qa-recommend.component';

describe('QaRecommendComponent', () => {
  let component: QaRecommendComponent;
  let fixture: ComponentFixture<QaRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
