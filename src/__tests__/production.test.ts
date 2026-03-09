import { describe, it, expect } from 'vitest';
import { tickProducer } from '../simulation/production.js';
import { ResourceType, Recipe } from '../types/resources.js';
import { Producer, WorkerPool } from '../types/world.js';
import { SeasonModifiers } from '../types/calendar.js';

const simpleRecipe: Recipe = {
  id: 'test_recipe',
  name: 'Test Recipe',
  inputs: [{ type: ResourceType.Limestone, quantity: 10 }],
  outputs: [{ type: ResourceType.DressedStone, quantity: 5 }],
  duration: 2,
  skillRequirement: 0.1,
};

const defaultWorkers: WorkerPool = {
  laborers: 10,
  craftsmen: 5,
  scribes: 0,
  satisfaction: 0.8,
};

const defaultModifiers: SeasonModifiers = {
  farmLaborAvailability: 0.5,
  constructionLaborPool: 0.8,
  riverTransportCapacity: 0.7,
  quarryEfficiency: 0.9,
  workerEfficiency: 1.0,
  farmOutput: 0.5,
};

function makeProducer(overrides?: Partial<Producer>): Producer {
  return {
    id: 'test-producer',
    recipeId: 'test_recipe',
    capacity: 1,
    progress: 0,
    active: true,
    ...overrides,
  };
}

describe('tickProducer', () => {
  it('consumes inputs on first tick and advances progress', () => {
    const stockpile = { [ResourceType.Limestone]: 20 };
    const result = tickProducer(
      makeProducer(),
      simpleRecipe,
      stockpile,
      defaultWorkers,
      defaultModifiers
    );

    expect(result.consumed[ResourceType.Limestone]).toBe(10);
    expect(result.stockpile[ResourceType.Limestone]).toBe(10);
    expect(result.producer.progress).toBeGreaterThan(0);
  });

  it('does nothing when inactive', () => {
    const stockpile = { [ResourceType.Limestone]: 20 };
    const result = tickProducer(
      makeProducer({ active: false }),
      simpleRecipe,
      stockpile,
      defaultWorkers,
      defaultModifiers
    );

    expect(result.stockpile[ResourceType.Limestone]).toBe(20);
    expect(result.producer.progress).toBe(0);
  });

  it('does nothing when inputs missing', () => {
    const result = tickProducer(
      makeProducer(),
      simpleRecipe,
      {},
      defaultWorkers,
      defaultModifiers
    );

    expect(result.producer.progress).toBe(0);
    expect(result.produced).toEqual({});
  });

  it('produces output when batch completes', () => {
    const stockpile = { [ResourceType.Limestone]: 20 };

    // Tick until production completes
    let result = tickProducer(
      makeProducer(),
      simpleRecipe,
      stockpile,
      defaultWorkers,
      defaultModifiers
    );

    // Keep ticking until we get output
    let iterations = 0;
    while (
      !result.produced[ResourceType.DressedStone] &&
      iterations < 10
    ) {
      result = tickProducer(
        result.producer,
        simpleRecipe,
        result.stockpile,
        defaultWorkers,
        defaultModifiers
      );
      iterations++;
    }

    expect(result.produced[ResourceType.DressedStone]).toBe(5);
    expect(result.producer.progress).toBe(0); // reset for next batch
  });

  it('scales with capacity', () => {
    const stockpile = { [ResourceType.Limestone]: 100 };
    const result = tickProducer(
      makeProducer({ capacity: 3 }),
      simpleRecipe,
      stockpile,
      defaultWorkers,
      defaultModifiers
    );

    // Should consume 3x inputs
    expect(result.consumed[ResourceType.Limestone]).toBe(30);
  });

  it('worker efficiency affects production speed', () => {
    const stockpile = { [ResourceType.Limestone]: 20 };
    const slowModifiers = { ...defaultModifiers, workerEfficiency: 0.5 };

    const fast = tickProducer(
      makeProducer(),
      simpleRecipe,
      stockpile,
      defaultWorkers,
      defaultModifiers
    );
    const slow = tickProducer(
      makeProducer(),
      simpleRecipe,
      { ...stockpile },
      defaultWorkers,
      slowModifiers
    );

    expect(fast.producer.progress).toBeGreaterThan(slow.producer.progress);
  });
});
