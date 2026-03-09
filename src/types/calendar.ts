/**
 * The Egyptian calendar drives everything.
 * Three seasons of ~4 months each, subdivided into ticks.
 */
export enum Season {
  /** Flood season — peak construction labor, high river transport, farms underwater */
  Akhet = 'akhet',
  /** Growing season — planting, labor splits between farm and construction */
  Peret = 'peret',
  /** Harvest season — food production peaks, labor scarce, hot */
  Shemu = 'shemu',
}

export const SEASONS_IN_ORDER: Season[] = [Season.Akhet, Season.Peret, Season.Shemu];

/** How many ticks per season (granularity of simulation) */
export const TICKS_PER_SEASON = 12;

/** A point in game time */
export interface GameDate {
  year: number;
  season: Season;
  tick: number; // 0 to TICKS_PER_SEASON-1
}

/** Nile flood level for a given year — affects everything */
export interface FloodLevel {
  year: number;
  /** 0-1 scale. 0.5 is normal. <0.3 is drought, >0.8 is major flood */
  level: number;
}

/** Season modifiers based on current season and flood level */
export interface SeasonModifiers {
  /** Multiplier on farming labor availability (farmers go to construction in flood) */
  farmLaborAvailability: number;
  /** Multiplier on construction labor availability */
  constructionLaborPool: number;
  /** Multiplier on river transport capacity */
  riverTransportCapacity: number;
  /** Multiplier on quarry output (can't quarry flooded areas) */
  quarryEfficiency: number;
  /** Multiplier on worker heat/fatigue */
  workerEfficiency: number;
  /** Multiplier on farm output */
  farmOutput: number;
}
