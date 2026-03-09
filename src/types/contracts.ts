import { ResourceAmount } from './resources.js';

/**
 * Contracts are the core progression mechanic.
 * They require SUSTAINED output, not one-off delivery.
 * "Einmal ist keinmal" — once is never.
 */
export interface Contract {
  id: string;
  name: string;
  description: string;

  /** What must be delivered each season */
  requiredOutput: ResourceAmount[];

  /** How many full seasons the output must be sustained */
  durationSeasons: number;

  /** Optional constraints */
  constraints?: ContractConstraint[];

  /** Bonus objectives for extra rewards */
  bonuses?: ContractBonus[];
}

export interface ContractConstraint {
  type: 'min_satisfaction' | 'max_workers' | 'max_barges' | 'no_resource';
  value: number | string;
  description: string;
}

export interface ContractBonus {
  id: string;
  description: string;
  condition: ContractBonusCondition;
}

export type ContractBonusCondition =
  | { type: 'min_satisfaction'; threshold: number }
  | { type: 'delivery_variance'; maxVariancePercent: number }
  | { type: 'zero_missed_deliveries' }
  | { type: 'complete_early'; seasonsEarly: number };

/** Tracks a contract's progress over time */
export interface ContractProgress {
  contractId: string;
  /** How many seasons have been successfully fulfilled */
  seasonsFulfilled: number;
  /** How many seasons have been attempted */
  seasonsAttempted: number;
  /** Delivery amounts per season for variance tracking */
  deliveryHistory: ResourceAmount[][];
  /** Is the contract currently active? */
  active: boolean;
  /** Did the contract complete successfully? */
  completed: boolean;
  /** Did the contract fail? */
  failed: boolean;
}
