import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalStakeholdersComponent } from './internal-stakeholders.component';

describe('InternalStakeholdersComponent', () => {
  let component: InternalStakeholdersComponent;
  let fixture: ComponentFixture<InternalStakeholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalStakeholdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalStakeholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
