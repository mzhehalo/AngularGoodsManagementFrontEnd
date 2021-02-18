import { TestBed } from '@angular/core/testing';

import { DropdownCategoriesService } from './dropdown-categories.service';

describe('DropdownMenuService', () => {
  let service: DropdownCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropdownCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
