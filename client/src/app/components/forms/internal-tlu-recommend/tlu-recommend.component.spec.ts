import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TLURecommendComponent } from './tlu-recommend.component';

describe('TluRecommendComponent', () => {
  let component: TLURecommendComponent;
  let fixture: ComponentFixture<TLURecommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TLURecommendComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TLURecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
