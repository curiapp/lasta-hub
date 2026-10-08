import { TestBed } from '@angular/core/testing';

import { ModalControlService } from './modal-control.service';

describe('ModalControlService', () => {
  let service: ModalControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
