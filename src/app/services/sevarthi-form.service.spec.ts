import { TestBed } from '@angular/core/testing';

import { SevarthiFormService } from './sevarthi-form.service';

describe('SevarthiFormService', () => {
  let service: SevarthiFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SevarthiFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
