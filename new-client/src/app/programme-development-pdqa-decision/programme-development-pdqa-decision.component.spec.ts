import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeDevelopmentPdqaDecisionComponent } from './programme-development-pdqa-decision.component';

describe('ProgrammeDevelopmentPdqaDecisionComponent', () => {
  let component: ProgrammeDevelopmentPdqaDecisionComponent;
  let fixture: ComponentFixture<ProgrammeDevelopmentPdqaDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeDevelopmentPdqaDecisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeDevelopmentPdqaDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
