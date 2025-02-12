import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NqfRegistrationRegistrationComponent } from './nqf-registration-registration.component';

describe('NqfRegistrationRegistrationComponent', () => {
  let component: NqfRegistrationRegistrationComponent;
  let fixture: ComponentFixture<NqfRegistrationRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NqfRegistrationRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NqfRegistrationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
