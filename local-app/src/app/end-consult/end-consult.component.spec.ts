import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndConsultComponent } from './end-consult.component';

describe('EndConsultComponent', () => {
  let component: EndConsultComponent;
  let fixture: ComponentFixture<EndConsultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndConsultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
