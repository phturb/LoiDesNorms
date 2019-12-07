import { TestBed } from '@angular/core/testing';

import { SummonersInfoService } from './summoners-info.service';

describe('SummonersInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummonersInfoService = TestBed.get(SummonersInfoService);
    expect(service).toBeTruthy();
  });
});
