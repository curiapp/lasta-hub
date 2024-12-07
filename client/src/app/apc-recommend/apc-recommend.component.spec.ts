import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApcRecommendComponent } from './apc-recommend.component';

describe('ApcRecommendComponent', () => {
  let component: ApcRecommendComponent;
  let fixture: ComponentFixture<ApcRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApcRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApcRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
