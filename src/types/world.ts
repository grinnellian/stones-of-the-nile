import { Stockpile } from './resources.js';
import { GameDate, FloodLevel } from './calendar.js';
import { ContractProgress } from './contracts.js';

/**
 * A site is any location that produces, consumes, or stores resources.
 * Quarries, farms, workshops, construction sites, cities.
 */
export interface Site {
  id: string;
  name: string;
  type: SiteType;
  /** Position on the map (Nile-relative) */
  position: { x: number; y: number };
  /** Is this site on the Nile? (affects transport) */
  onNile: boolean;
  /** Distance from Nile if not directly on it */
  distanceFromNile: number;
  /** Current resource stockpile at this site */
  stockpile: Stockpile;
  /** Workers assigned here */
  workers: WorkerPool;
  /** Production buildings/capabilities at this site */
  producers: Producer[];
}

export enum SiteType {
  Quarry = 'quarry',
  Farm = 'farm',
  Workshop = 'workshop',
  ConstructionSite = 'construction_site',
  City = 'city',
  Port = 'port',
}

/** A producer transforms inputs to outputs at a site */
export interface Producer {
  id: string;
  recipeId: string;
  /** How many parallel operations can run */
  capacity: number;
  /** Current progress through the recipe (0 to recipe.duration) */
  progress: number;
  /** Is this producer active? */
  active: boolean;
}

/** Workers at a site */
export interface WorkerPool {
  /** Unskilled laborers */
  laborers: number;
  /** Skilled craftspeople (stone cutters, tool makers, etc.) */
  craftsmen: number;
  /** Scribes (enable bureaucracy/automation) */
  scribes: number;
  /** Overall satisfaction 0-1 */
  satisfaction: number;
}

/** A transport route between two sites */
export interface TransportRoute {
  id: string;
  fromSiteId: string;
  toSiteId: string;
  /** Is this route via the Nile? */
  viaNile: boolean;
  /** Base capacity per tick (modified by season) */
  baseCapacity: number;
  /** Travel time in ticks */
  travelTime: number;
  /** Resources currently in transit */
  inTransit: TransportBatch[];
}

export interface TransportBatch {
  resources: Stockpile;
  /** Ticks remaining until arrival */
  ticksRemaining: number;
}

/** Top-level game state */
export interface GameState {
  date: GameDate;
  sites: Site[];
  routes: TransportRoute[];
  contracts: ContractProgress[];
  floodSchedule: FloodLevel[];
  /** Global stats */
  stats: {
    totalResourcesProduced: Stockpile;
    totalResourcesTransported: Stockpile;
    totalContractsCompleted: number;
    totalContractsFailed: number;
  };
}
