import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgrammeComponent } from './create-programmme.component';

describe('CreateProgrammeComponent', () => {
  let component: CreateProgrammeComponent;
  let fixture: ComponentFixture<CreateProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateProgrammeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
