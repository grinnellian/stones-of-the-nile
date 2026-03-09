import {
  GameDate,
  Season,
  SEASONS_IN_ORDER,
  TICKS_PER_SEASON,
  FloodLevel,
  SeasonModifiers,
} from '../types/calendar.js';

/** Advance the game date by one tick */
export function advanceTick(date: GameDate): GameDate {
  const nextTick = date.tick + 1;
  if (nextTick < TICKS_PER_SEASON) {
    return { ...date, tick: nextTick };
  }

  // Season rollover
  const seasonIndex = SEASONS_IN_ORDER.indexOf(date.season);
  const nextSeasonIndex = (seasonIndex + 1) % SEASONS_IN_ORDER.length;
  const nextYear = nextSeasonIndex === 0 ? date.year + 1 : date.year;

  return {
    year: nextYear,
    season: SEASONS_IN_ORDER[nextSeasonIndex],
    tick: 0,
  };
}

/** Check if we just entered a new season (tick 0) */
export function isSeasonStart(date: GameDate): boolean {
  return date.tick === 0;
}

/** Check if this is the last tick of a season */
export function isSeasonEnd(date: GameDate): boolean {
  return date.tick === TICKS_PER_SEASON - 1;
}

/** Get the total tick count (useful for ordering) */
export function totalTicks(date: GameDate): number {
  const seasonIndex = SEASONS_IN_ORDER.indexOf(date.season);
  return (
    date.year * SEASONS_IN_ORDER.length * TICKS_PER_SEASON +
    seasonIndex * TICKS_PER_SEASON +
    date.tick
  );
}

/** Generate flood levels for a range of years with natural variance */
export function generateFloodSchedule(
  startYear: number,
  numYears: number,
  seed?: number
): FloodLevel[] {
  // Simple seeded pseudo-random for deterministic floods
  let s = seed ?? Math.floor(Math.random() * 100000);
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };

  return Array.from({ length: numYears }, (_, i) => ({
    year: startYear + i,
    // Normal-ish distribution centered on 0.5, range ~0.15-0.85
    level: Math.max(0.1, Math.min(0.9, 0.5 + (rand() - 0.5) * 0.7)),
  }));
}

/** Calculate season modifiers based on current season and flood level */
export function getSeasonModifiers(
  season: Season,
  floodLevel: number
): SeasonModifiers {
  switch (season) {
    case Season.Akhet:
      // Flood season: farmers available for construction, good river transport
      // but quarries may flood, farms underwater
      return {
        farmLaborAvailability: 0.1, // farms are underwater
        constructionLaborPool: 1.0 + floodLevel * 0.5, // flood brings surplus labor
        riverTransportCapacity: 0.8 + floodLevel * 0.4, // high water = better transport
        quarryEfficiency: Math.max(0.2, 1.0 - floodLevel), // high flood disrupts quarries
        workerEfficiency: 0.9, // moderate weather
        farmOutput: 0.0, // no farming during flood
      };

    case Season.Peret:
      // Growing season: labor splits, normal river, planting
      return {
        farmLaborAvailability: 0.8, // most farmers return to fields
        constructionLaborPool: 0.6, // reduced workforce
        riverTransportCapacity: 0.6 + floodLevel * 0.2, // receding waters
        quarryEfficiency: 0.9, // good quarrying conditions
        workerEfficiency: 0.95, // nice weather
        farmOutput: 0.3, // crops planted but not yet harvested
      };

    case Season.Shemu:
      // Harvest season: labor very scarce, hot, but food production peaks
      return {
        farmLaborAvailability: 1.0, // all hands harvesting
        constructionLaborPool: 0.4, // skeleton crew
        riverTransportCapacity: 0.4 + floodLevel * 0.1, // low water
        quarryEfficiency: 0.7, // heat reduces efficiency
        workerEfficiency: 0.7, // brutal heat
        farmOutput: 1.0, // harvest time
      };
  }
}
