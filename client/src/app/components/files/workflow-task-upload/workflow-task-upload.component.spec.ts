import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTaskUploadComponent } from './workflow-task-upload.component';

describe('WorkflowTaskUploadComponent', () => {
  let component: WorkflowTaskUploadComponent;
  let fixture: ComponentFixture<WorkflowTaskUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowTaskUploadComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowTaskUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
