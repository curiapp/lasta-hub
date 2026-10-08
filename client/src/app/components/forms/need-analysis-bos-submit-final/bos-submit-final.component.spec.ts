import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BosSubmitFinalComponent } from './bos-submit-final.component';

describe('BosSubmitFinalComponent', () => {
  let component: BosSubmitFinalComponent;
  let fixture: ComponentFixture<BosSubmitFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BosSubmitFinalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BosSubmitFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
