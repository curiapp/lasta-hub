import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeuRecommendComponent } from './ceu-recommend.component';

describe('CeuRecommendComponent', () => {
  let component: CeuRecommendComponent;
  let fixture: ComponentFixture<CeuRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeuRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeuRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
