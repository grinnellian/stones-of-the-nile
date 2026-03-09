import { Stockpile, ResourceAmount, ResourceType } from '../types/resources.js';

/** Get a resource quantity from a stockpile, defaulting to 0 */
export function getResource(stockpile: Stockpile, type: ResourceType): number {
  return stockpile[type] ?? 0;
}

/** Add resources to a stockpile (returns new stockpile) */
export function addResources(
  stockpile: Stockpile,
  ...amounts: ResourceAmount[]
): Stockpile {
  const result = { ...stockpile };
  for (const { type, quantity } of amounts) {
    result[type] = (result[type] ?? 0) + quantity;
  }
  return result;
}

/** Remove resources from a stockpile. Returns null if insufficient. */
export function removeResources(
  stockpile: Stockpile,
  ...amounts: ResourceAmount[]
): Stockpile | null {
  const result = { ...stockpile };
  for (const { type, quantity } of amounts) {
    const current = result[type] ?? 0;
    if (current < quantity) return null;
    result[type] = current - quantity;
  }
  return result;
}

/** Check if a stockpile has at least the given amounts */
export function hasResources(
  stockpile: Stockpile,
  ...amounts: ResourceAmount[]
): boolean {
  return amounts.every(({ type, quantity }) => (stockpile[type] ?? 0) >= quantity);
}

/** Merge two stockpiles */
export function mergeStockpiles(a: Stockpile, b: Stockpile): Stockpile {
  const result = { ...a };
  for (const [type, qty] of Object.entries(b)) {
    if (qty !== undefined) {
      result[type as ResourceType] = (result[type as ResourceType] ?? 0) + qty;
    }
  }
  return result;
}

/** Create a stockpile from resource amounts */
export function stockpileFrom(...amounts: ResourceAmount[]): Stockpile {
  const result: Stockpile = {};
  for (const { type, quantity } of amounts) {
    result[type] = (result[type] ?? 0) + quantity;
  }
  return result;
}

/** Check if stockpile is empty (all values 0 or missing) */
export function isEmpty(stockpile: Stockpile): boolean {
  return Object.values(stockpile).every((v) => !v || v <= 0);
}

/** Get total quantity across all resources */
export function totalQuantity(stockpile: Stockpile): number {
  return Object.values(stockpile).reduce((sum, v) => sum + (v ?? 0), 0);
}
