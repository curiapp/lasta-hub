import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CEURecommendComponent } from './ceu-recommend.component';

describe('CeuRecommendComponent', () => {
  let component: CEURecommendComponent;
  let fixture: ComponentFixture<CEURecommendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CEURecommendComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CEURecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
