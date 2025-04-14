import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TluRecommendComponent } from './tlu-recommend.component';

describe('TluRecommendComponent', () => {
  let component: TluRecommendComponent;
  let fixture: ComponentFixture<TluRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TluRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TluRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
