import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeOverviewComponent } from './programme-overview.component';

describe('ProgrammeOverviewComponent', () => {
  let component: ProgrammeOverviewComponent;
  let fixture: ComponentFixture<ProgrammeOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
