import { TestBed } from '@angular/core/testing';

import { StatisticsResolverService } from './statistics-resolver.service';

describe('StatisticsResolverService', () => {
  let service: StatisticsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
