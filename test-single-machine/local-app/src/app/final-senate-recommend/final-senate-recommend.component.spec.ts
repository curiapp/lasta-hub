import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSenateRecommendComponent } from './final-senate-recommend.component';

describe('FinalSenateRecommendComponent', () => {
  let component: FinalSenateRecommendComponent;
  let fixture: ComponentFixture<FinalSenateRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalSenateRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalSenateRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
