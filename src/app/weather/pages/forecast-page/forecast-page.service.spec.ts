import { TestBed } from '@angular/core/testing';

import { ForecastPageService } from './forecast-page.service';

describe('ForecastPageService', () => {
  let service: ForecastPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
