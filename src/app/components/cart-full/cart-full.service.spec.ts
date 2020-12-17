import { TestBed } from '@angular/core/testing';

import { CartFullService } from './cart-full.service';

describe('CartFullService', () => {
  let service: CartFullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartFullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
