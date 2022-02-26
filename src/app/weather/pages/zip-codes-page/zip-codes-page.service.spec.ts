import { TestBed } from '@angular/core/testing';

import { ZipCodesPageService } from './zip-codes-page.service';

describe('ZipCodesPageService', () => {
  let service: ZipCodesPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZipCodesPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
