import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NqfRegistrationComponent } from './nqf-registration.component';

describe('NqfRegistrationComponent', () => {
  let component: NqfRegistrationComponent;
  let fixture: ComponentFixture<NqfRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NqfRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NqfRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
