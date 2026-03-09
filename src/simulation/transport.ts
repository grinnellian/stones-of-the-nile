import { TransportRoute, TransportBatch } from '../types/world.js';
import { Stockpile, ResourceType, ResourceAmount } from '../types/resources.js';
import { SeasonModifiers } from '../types/calendar.js';
import { removeResources, mergeStockpiles, totalQuantity } from './stockpile.js';

/** Result of ticking transport for one route */
export interface TransportTickResult {
  route: TransportRoute;
  fromStockpile: Stockpile;
  toStockpile: Stockpile;
  /** Resources that arrived at destination this tick */
  delivered: Stockpile;
}

/**
 * Advance all in-transit batches by one tick.
 * Batches that arrive get added to the destination stockpile.
 */
export function tickTransport(
  route: TransportRoute,
  fromStockpile: Stockpile,
  toStockpile: Stockpile,
  modifiers: SeasonModifiers
): TransportTickResult {
  const delivered: Stockpile = {};
  let updatedToStockpile = { ...toStockpile };

  // Advance existing batches
  const remainingBatches: TransportBatch[] = [];
  for (const batch of route.inTransit) {
    const updated = { ...batch, ticksRemaining: batch.ticksRemaining - 1 };
    if (updated.ticksRemaining <= 0) {
      // Arrived! Add to destination
      updatedToStockpile = mergeStockpiles(updatedToStockpile, batch.resources);
      for (const [type, qty] of Object.entries(batch.resources)) {
        if (qty) {
          delivered[type as ResourceType] = (delivered[type as ResourceType] ?? 0) + qty;
        }
      }
    } else {
      remainingBatches.push(updated);
    }
  }

  return {
    route: { ...route, inTransit: remainingBatches },
    fromStockpile,
    toStockpile: updatedToStockpile,
    delivered,
  };
}

/**
 * Load resources onto a transport route.
 * Respects capacity limits modified by season.
 */
export function loadTransport(
  route: TransportRoute,
  fromStockpile: Stockpile,
  resources: ResourceAmount[],
  modifiers: SeasonModifiers
): { route: TransportRoute; fromStockpile: Stockpile; loaded: boolean } {
  // Calculate current capacity
  const capacityMultiplier = route.viaNile ? modifiers.riverTransportCapacity : 1.0;
  const maxCapacity = route.baseCapacity * capacityMultiplier;

  // Check how much is already in transit
  const currentLoad = route.inTransit.reduce(
    (sum, batch) => sum + totalQuantity(batch.resources),
    0
  );
  const availableCapacity = maxCapacity - currentLoad;

  // Check if we can load everything
  const totalToLoad = resources.reduce((sum, r) => sum + r.quantity, 0);
  if (totalToLoad > availableCapacity) {
    return { route, fromStockpile, loaded: false };
  }

  // Remove from source
  const afterRemoval = removeResources(fromStockpile, ...resources);
  if (!afterRemoval) {
    return { route, fromStockpile, loaded: false };
  }

  // Create transit batch
  const batchResources: Stockpile = {};
  for (const { type, quantity } of resources) {
    batchResources[type] = (batchResources[type] ?? 0) + quantity;
  }

  const travelTime = route.viaNile
    ? route.travelTime // Nile travel time already accounts for distance
    : Math.ceil(route.travelTime / modifiers.workerEfficiency); // Overland slower when hot

  const newBatch: TransportBatch = {
    resources: batchResources,
    ticksRemaining: travelTime,
  };

  return {
    route: { ...route, inTransit: [...route.inTransit, newBatch] },
    fromStockpile: afterRemoval,
    loaded: true,
  };
}
