import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NqaRecommendComponent } from './nqa-recommend.component';

describe('NqaRecommendComponent', () => {
  let component: NqaRecommendComponent;
  let fixture: ComponentFixture<NqaRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NqaRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NqaRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
