import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PacComponent } from './pac.component';

describe('PacComponent', () => {
  let component: PacComponent;
  let fixture: ComponentFixture<PacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
