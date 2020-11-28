import { TestBed } from '@angular/core/testing';

import { WishlistResolverService } from './wishlist-resolver.service';

describe('WishlistResolverService', () => {
  let service: WishlistResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
