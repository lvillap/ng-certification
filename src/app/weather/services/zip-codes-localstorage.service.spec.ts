import { TestBed } from '@angular/core/testing';

import { ZipCodesLocalstorageService } from './zip-codes-localstorage.service';

describe('ZipCodesLocalstorageService', () => {
  let service: ZipCodesLocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipCodesLocalstorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
