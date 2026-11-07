import { TestBed } from '@angular/core/testing';
import { BuscadorService } from './buscador';

describe('BuscadorService', () => {
  let service: BuscadorService;

  beforeEach(() => {
    service = TestBed.inject(BuscadorService);
  });

  it('returns the K most popular prefix matches in descending order', () => {
    service.insert({ name: 'air max', popularity: 90 });
    service.insert({ name: 'air force', popularity: 95 });
    service.insert({ name: 'air jordan', popularity: 85 });
    service.insert({ name: 'adidas boost', popularity: 80 });

    expect(service.searchTopK('air', 2)).toEqual([
      { name: 'air force', popularity: 95 },
      { name: 'air max', popularity: 90 },
    ]);
  });

  it('returns an empty list for invalid K values', () => {
    service.insert({ name: 'air max', popularity: 90 });

    expect(service.searchTopK('air', 0)).toEqual([]);
    expect(service.searchTopK('air', -1)).toEqual([]);
    expect(service.searchTopK('air', 1.5)).toEqual([]);
  });
});
