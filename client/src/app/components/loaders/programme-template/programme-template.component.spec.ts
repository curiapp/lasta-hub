import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeTemplateComponent } from './programme-template.component';

describe('ProgrammeTamplateComponent', () => {
  let component: ProgrammeTemplateComponent;
  let fixture: ComponentFixture<ProgrammeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammeTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
