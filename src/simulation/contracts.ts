import { Contract, ContractProgress } from '../types/contracts.js';
import { Stockpile, ResourceAmount, ResourceType } from '../types/resources.js';
import { getResource } from './stockpile.js';

/** Create initial progress tracking for a contract */
export function initContractProgress(contract: Contract): ContractProgress {
  return {
    contractId: contract.id,
    seasonsFulfilled: 0,
    seasonsAttempted: 0,
    deliveryHistory: [],
    active: true,
    completed: false,
    failed: false,
  };
}

/**
 * Evaluate a contract at end of season.
 * Check if the required output was delivered to the destination stockpile.
 */
export function evaluateSeasonDelivery(
  contract: Contract,
  progress: ContractProgress,
  deliveredThisSeason: Stockpile
): ContractProgress {
  if (!progress.active) return progress;

  const updated = { ...progress };
  updated.seasonsAttempted += 1;

  // Record what was delivered
  const deliveryRecord: ResourceAmount[] = contract.requiredOutput.map((req) => ({
    type: req.type,
    quantity: getResource(deliveredThisSeason, req.type),
  }));
  updated.deliveryHistory = [...updated.deliveryHistory, deliveryRecord];

  // Check if all requirements met
  const fulfilled = contract.requiredOutput.every(
    (req) => getResource(deliveredThisSeason, req.type) >= req.quantity
  );

  if (fulfilled) {
    updated.seasonsFulfilled += 1;
  }

  // Check completion
  if (updated.seasonsFulfilled >= contract.durationSeasons) {
    updated.completed = true;
    updated.active = false;
  }

  return updated;
}

/** Check if bonus conditions are met */
export function evaluateBonuses(
  contract: Contract,
  progress: ContractProgress,
  averageSatisfaction: number
): string[] {
  const achieved: string[] = [];

  for (const bonus of contract.bonuses ?? []) {
    switch (bonus.condition.type) {
      case 'zero_missed_deliveries':
        if (progress.seasonsFulfilled === progress.seasonsAttempted) {
          achieved.push(bonus.id);
        }
        break;

      case 'min_satisfaction':
        if (averageSatisfaction >= bonus.condition.threshold) {
          achieved.push(bonus.id);
        }
        break;

      case 'delivery_variance': {
        if (progress.deliveryHistory.length < 2) break;
        const maxVariance = bonus.condition.maxVariancePercent / 100;
        const allWithinVariance = contract.requiredOutput.every((req) => {
          const deliveries = progress.deliveryHistory.map(
            (season) =>
              season.find((d) => d.type === req.type)?.quantity ?? 0
          );
          const avg =
            deliveries.reduce((a, b) => a + b, 0) / deliveries.length;
          if (avg === 0) return false;
          return deliveries.every(
            (d) => Math.abs(d - avg) / avg <= maxVariance
          );
        });
        if (allWithinVariance) achieved.push(bonus.id);
        break;
      }

      case 'complete_early':
        if (
          progress.completed &&
          progress.seasonsAttempted <=
            contract.durationSeasons - bonus.condition.seasonsEarly
        ) {
          achieved.push(bonus.id);
        }
        break;
    }
  }

  return achieved;
}
