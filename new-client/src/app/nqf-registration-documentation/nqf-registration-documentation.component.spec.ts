import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NqfRegistrationDocumentationComponent } from './nqf-registration-documentation.component';

describe('NqfRegistrationDocumentationComponent', () => {
  let component: NqfRegistrationDocumentationComponent;
  let fixture: ComponentFixture<NqfRegistrationDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NqfRegistrationDocumentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NqfRegistrationDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
