import { describe, it, expect } from 'vitest';
import {
  getResource,
  addResources,
  removeResources,
  hasResources,
  mergeStockpiles,
  stockpileFrom,
  isEmpty,
  totalQuantity,
} from '../simulation/stockpile.js';
import { ResourceType } from '../types/resources.js';

describe('getResource', () => {
  it('returns 0 for missing resource', () => {
    expect(getResource({}, ResourceType.Limestone)).toBe(0);
  });

  it('returns stored value', () => {
    expect(getResource({ [ResourceType.Limestone]: 50 }, ResourceType.Limestone)).toBe(50);
  });
});

describe('addResources', () => {
  it('adds to empty stockpile', () => {
    const result = addResources({}, { type: ResourceType.Limestone, quantity: 10 });
    expect(result[ResourceType.Limestone]).toBe(10);
  });

  it('adds to existing', () => {
    const result = addResources(
      { [ResourceType.Limestone]: 10 },
      { type: ResourceType.Limestone, quantity: 5 }
    );
    expect(result[ResourceType.Limestone]).toBe(15);
  });

  it('handles multiple resources', () => {
    const result = addResources(
      {},
      { type: ResourceType.Limestone, quantity: 10 },
      { type: ResourceType.Granite, quantity: 5 }
    );
    expect(result[ResourceType.Limestone]).toBe(10);
    expect(result[ResourceType.Granite]).toBe(5);
  });

  it('does not mutate original', () => {
    const original = { [ResourceType.Limestone]: 10 };
    addResources(original, { type: ResourceType.Limestone, quantity: 5 });
    expect(original[ResourceType.Limestone]).toBe(10);
  });
});

describe('removeResources', () => {
  it('removes available resources', () => {
    const result = removeResources(
      { [ResourceType.Limestone]: 10 },
      { type: ResourceType.Limestone, quantity: 3 }
    );
    expect(result).not.toBeNull();
    expect(result![ResourceType.Limestone]).toBe(7);
  });

  it('returns null when insufficient', () => {
    const result = removeResources(
      { [ResourceType.Limestone]: 2 },
      { type: ResourceType.Limestone, quantity: 5 }
    );
    expect(result).toBeNull();
  });

  it('returns null for missing resource', () => {
    const result = removeResources({}, { type: ResourceType.Limestone, quantity: 1 });
    expect(result).toBeNull();
  });
});

describe('hasResources', () => {
  it('returns true when sufficient', () => {
    expect(
      hasResources(
        { [ResourceType.Limestone]: 10 },
        { type: ResourceType.Limestone, quantity: 5 }
      )
    ).toBe(true);
  });

  it('returns false when insufficient', () => {
    expect(
      hasResources(
        { [ResourceType.Limestone]: 2 },
        { type: ResourceType.Limestone, quantity: 5 }
      )
    ).toBe(false);
  });
});

describe('mergeStockpiles', () => {
  it('merges two stockpiles', () => {
    const result = mergeStockpiles(
      { [ResourceType.Limestone]: 10 },
      { [ResourceType.Limestone]: 5, [ResourceType.Granite]: 3 }
    );
    expect(result[ResourceType.Limestone]).toBe(15);
    expect(result[ResourceType.Granite]).toBe(3);
  });
});

describe('stockpileFrom', () => {
  it('creates from resource amounts', () => {
    const result = stockpileFrom(
      { type: ResourceType.Limestone, quantity: 10 },
      { type: ResourceType.Granite, quantity: 5 }
    );
    expect(result[ResourceType.Limestone]).toBe(10);
    expect(result[ResourceType.Granite]).toBe(5);
  });
});

describe('isEmpty', () => {
  it('empty stockpile is empty', () => {
    expect(isEmpty({})).toBe(true);
  });

  it('zero-quantity stockpile is empty', () => {
    expect(isEmpty({ [ResourceType.Limestone]: 0 })).toBe(true);
  });

  it('non-empty stockpile is not empty', () => {
    expect(isEmpty({ [ResourceType.Limestone]: 1 })).toBe(false);
  });
});

describe('totalQuantity', () => {
  it('sums all resources', () => {
    expect(
      totalQuantity({
        [ResourceType.Limestone]: 10,
        [ResourceType.Granite]: 5,
      })
    ).toBe(15);
  });

  it('returns 0 for empty', () => {
    expect(totalQuantity({})).toBe(0);
  });
});
