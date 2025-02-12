import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeSubNavComponent } from './programme-sub-nav.component';

describe('ProgrammeSubNavComponent', () => {
  let component: ProgrammeSubNavComponent;
  let fixture: ComponentFixture<ProgrammeSubNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeSubNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeSubNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
