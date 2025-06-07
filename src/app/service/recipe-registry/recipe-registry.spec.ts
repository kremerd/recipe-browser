import { TestBed } from '@angular/core/testing';

import { RecipeRegistry } from './recipe-registry';

describe('RecipeRegistry', () => {
  let service: RecipeRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
