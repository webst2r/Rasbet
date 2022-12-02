import { TestBed } from '@angular/core/testing';

import { OpcaoApostaService } from './opcao-aposta.service';

describe('OpcaoApostaService', () => {
  let service: OpcaoApostaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcaoApostaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
