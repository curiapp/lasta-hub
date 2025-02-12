import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewProgrammeComponent } from './create-new-programme.component';

describe('CreateNewProgrammeComponent', () => {
  let component: CreateNewProgrammeComponent;
  let fixture: ComponentFixture<CreateNewProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewProgrammeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
