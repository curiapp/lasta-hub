import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NeedAnalysisConcludeComponent } from './need-analysis-conclude.component';

describe('NeedAnalysisConcludeComponent', () => {
  let component: NeedAnalysisConcludeComponent;
  let fixture: ComponentFixture<NeedAnalysisConcludeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedAnalysisConcludeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedAnalysisConcludeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
