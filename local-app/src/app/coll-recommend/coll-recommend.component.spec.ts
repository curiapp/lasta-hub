import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollRecommendComponent } from './coll-recommend.component';

describe('CollRecommendComponent', () => {
  let component: CollRecommendComponent;
  let fixture: ComponentFixture<CollRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
