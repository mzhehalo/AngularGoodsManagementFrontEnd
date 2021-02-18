import { TestBed } from '@angular/core/testing';

import { ProductsCategoryResolverService } from './products-category-resolver.service';

describe('ProductsCategoryResolverService', () => {
  let service: ProductsCategoryResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsCategoryResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
