import { TestBed } from '@angular/core/testing';

import { WishlistProductsResolverService } from './wishlist-products-resolver.service';

describe('WishlistProductsResolverService', () => {
  let service: WishlistProductsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistProductsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
