import { describe, it, expect } from 'vitest';
import {
  initContractProgress,
  evaluateSeasonDelivery,
  evaluateBonuses,
} from '../simulation/contracts.js';
import { Contract } from '../types/contracts.js';
import { ResourceType } from '../types/resources.js';

const sampleContract: Contract = {
  id: 'test-contract',
  name: 'The Tura Connection',
  description: 'Deliver limestone to Giza',
  requiredOutput: [{ type: ResourceType.DressedStone, quantity: 100 }],
  durationSeasons: 3,
  bonuses: [
    {
      id: 'perfect',
      description: 'Zero missed deliveries',
      condition: { type: 'zero_missed_deliveries' },
    },
    {
      id: 'consistent',
      description: 'Delivery variance under 10%',
      condition: { type: 'delivery_variance', maxVariancePercent: 10 },
    },
  ],
};

describe('initContractProgress', () => {
  it('creates initial state', () => {
    const progress = initContractProgress(sampleContract);
    expect(progress.contractId).toBe('test-contract');
    expect(progress.seasonsFulfilled).toBe(0);
    expect(progress.seasonsAttempted).toBe(0);
    expect(progress.active).toBe(true);
    expect(progress.completed).toBe(false);
  });
});

describe('evaluateSeasonDelivery', () => {
  it('fulfills when requirements met', () => {
    const progress = initContractProgress(sampleContract);
    const result = evaluateSeasonDelivery(sampleContract, progress, {
      [ResourceType.DressedStone]: 100,
    });
    expect(result.seasonsFulfilled).toBe(1);
    expect(result.seasonsAttempted).toBe(1);
  });

  it('does not fulfill when requirements not met', () => {
    const progress = initContractProgress(sampleContract);
    const result = evaluateSeasonDelivery(sampleContract, progress, {
      [ResourceType.DressedStone]: 50,
    });
    expect(result.seasonsFulfilled).toBe(0);
    expect(result.seasonsAttempted).toBe(1);
  });

  it('completes after enough fulfilled seasons', () => {
    let progress = initContractProgress(sampleContract);
    const delivery = { [ResourceType.DressedStone]: 100 };

    for (let i = 0; i < 3; i++) {
      progress = evaluateSeasonDelivery(sampleContract, progress, delivery);
    }

    expect(progress.completed).toBe(true);
    expect(progress.active).toBe(false);
    expect(progress.seasonsFulfilled).toBe(3);
  });

  it('einmal ist keinmal — one delivery is not enough', () => {
    let progress = initContractProgress(sampleContract);

    // Deliver once, then miss twice
    progress = evaluateSeasonDelivery(sampleContract, progress, {
      [ResourceType.DressedStone]: 100,
    });
    progress = evaluateSeasonDelivery(sampleContract, progress, {
      [ResourceType.DressedStone]: 0,
    });
    progress = evaluateSeasonDelivery(sampleContract, progress, {
      [ResourceType.DressedStone]: 0,
    });

    expect(progress.completed).toBe(false);
    expect(progress.seasonsFulfilled).toBe(1);
    expect(progress.seasonsAttempted).toBe(3);
  });

  it('tracks delivery history', () => {
    let progress = initContractProgress(sampleContract);
    progress = evaluateSeasonDelivery(sampleContract, progress, {
      [ResourceType.DressedStone]: 105,
    });
    progress = evaluateSeasonDelivery(sampleContract, progress, {
      [ResourceType.DressedStone]: 95,
    });

    expect(progress.deliveryHistory).toHaveLength(2);
    expect(progress.deliveryHistory[0][0].quantity).toBe(105);
    expect(progress.deliveryHistory[1][0].quantity).toBe(95);
  });
});

describe('evaluateBonuses', () => {
  it('awards zero missed deliveries when all fulfilled', () => {
    let progress = initContractProgress(sampleContract);
    const delivery = { [ResourceType.DressedStone]: 100 };
    for (let i = 0; i < 3; i++) {
      progress = evaluateSeasonDelivery(sampleContract, progress, delivery);
    }

    const bonuses = evaluateBonuses(sampleContract, progress, 0.8);
    expect(bonuses).toContain('perfect');
  });

  it('does not award zero missed when some missed', () => {
    let progress = initContractProgress(sampleContract);
    progress = evaluateSeasonDelivery(sampleContract, progress, {
      [ResourceType.DressedStone]: 100,
    });
    progress = evaluateSeasonDelivery(sampleContract, progress, {
      [ResourceType.DressedStone]: 50, // miss
    });

    const bonuses = evaluateBonuses(sampleContract, progress, 0.8);
    expect(bonuses).not.toContain('perfect');
  });

  it('awards consistency bonus when variance is low', () => {
    let progress = initContractProgress(sampleContract);
    // Deliver very consistent amounts
    for (const qty of [100, 102, 98]) {
      progress = evaluateSeasonDelivery(sampleContract, progress, {
        [ResourceType.DressedStone]: qty,
      });
    }

    const bonuses = evaluateBonuses(sampleContract, progress, 0.8);
    expect(bonuses).toContain('consistent');
  });

  it('does not award consistency when variance is high', () => {
    let progress = initContractProgress(sampleContract);
    for (const qty of [100, 200, 50]) {
      progress = evaluateSeasonDelivery(sampleContract, progress, {
        [ResourceType.DressedStone]: qty,
      });
    }

    const bonuses = evaluateBonuses(sampleContract, progress, 0.8);
    expect(bonuses).not.toContain('consistent');
  });
});
