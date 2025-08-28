import { TestBed } from '@angular/core/testing';

import { DishApi } from './dish-api';

describe('DishApiService', () => {
  let service: DishApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
