import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalStakeholdersComponent } from './external-stakeholders.component';

describe('ExternalStakeholdersComponent', () => {
  let component: ExternalStakeholdersComponent;
  let fixture: ComponentFixture<ExternalStakeholdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalStakeholdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExternalStakeholdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
