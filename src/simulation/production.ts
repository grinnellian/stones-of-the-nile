import { Recipe, Stockpile, ResourceType } from '../types/resources.js';
import { Producer, WorkerPool } from '../types/world.js';
import { SeasonModifiers } from '../types/calendar.js';
import { hasResources, removeResources, addResources } from './stockpile.js';

/** Result of running production for one tick */
export interface ProductionResult {
  /** Updated stockpile after production */
  stockpile: Stockpile;
  /** Updated producer state */
  producer: Producer;
  /** Resources consumed this tick */
  consumed: Stockpile;
  /** Resources produced this tick */
  produced: Stockpile;
}

/**
 * Run one tick of production for a single producer.
 * Returns updated stockpile and producer, or null if production can't proceed.
 */
export function tickProducer(
  producer: Producer,
  recipe: Recipe,
  stockpile: Stockpile,
  workers: WorkerPool,
  modifiers: SeasonModifiers
): ProductionResult {
  const consumed: Stockpile = {};
  const produced: Stockpile = {};

  if (!producer.active) {
    return { stockpile, producer, consumed, produced };
  }

  // Check if we have enough skilled workers
  const availableSkill = workers.craftsmen > 0
    ? Math.min(1.0, workers.craftsmen / (producer.capacity * 2))
    : workers.laborers > 0
      ? Math.min(0.5, workers.laborers / (producer.capacity * 4))
      : 0;

  if (availableSkill < recipe.skillRequirement) {
    return { stockpile, producer, consumed, produced };
  }

  let currentStockpile = stockpile;
  let updatedProducer = { ...producer };

  // If starting new batch, consume inputs
  if (updatedProducer.progress === 0) {
    // Scale inputs by capacity (how many parallel operations)
    const scaledInputs = recipe.inputs.map((input) => ({
      ...input,
      quantity: input.quantity * producer.capacity,
    }));

    if (!hasResources(currentStockpile, ...scaledInputs)) {
      return { stockpile, producer, consumed, produced };
    }

    const afterRemoval = removeResources(currentStockpile, ...scaledInputs);
    if (!afterRemoval) {
      return { stockpile, producer, consumed, produced };
    }

    currentStockpile = afterRemoval;
    for (const input of scaledInputs) {
      consumed[input.type] = (consumed[input.type] ?? 0) + input.quantity;
    }
  }

  // Advance progress, modified by worker efficiency and season
  const efficiencyMultiplier = modifiers.workerEfficiency * availableSkill;
  updatedProducer.progress += efficiencyMultiplier;

  // Check if batch complete
  if (updatedProducer.progress >= recipe.duration) {
    updatedProducer.progress = 0;

    // Produce outputs, scaled by capacity
    const scaledOutputs = recipe.outputs.map((output) => ({
      ...output,
      quantity: output.quantity * producer.capacity,
    }));

    currentStockpile = addResources(currentStockpile, ...scaledOutputs);
    for (const output of scaledOutputs) {
      produced[output.type] = (produced[output.type] ?? 0) + output.quantity;
    }
  }

  return {
    stockpile: currentStockpile,
    producer: updatedProducer,
    consumed,
    produced,
  };
}
