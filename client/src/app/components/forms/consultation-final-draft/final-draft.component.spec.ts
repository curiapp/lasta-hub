import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalDraftComponent } from './final-draft.component';

describe('FinalDraftComponent', () => {
  let component: FinalDraftComponent;
  let fixture: ComponentFixture<FinalDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalDraftComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
