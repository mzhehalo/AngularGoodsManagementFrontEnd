import { TestBed } from '@angular/core/testing';

import { EditCategoriesService } from './edit-categories.service';

describe('EditCategoriesService', () => {
  let service: EditCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
