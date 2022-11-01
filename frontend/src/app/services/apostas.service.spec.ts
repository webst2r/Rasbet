import { TestBed } from '@angular/core/testing';

import { ApostasService } from './apostas.service';

describe('ApostasService', () => {
  let service: ApostasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApostasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
