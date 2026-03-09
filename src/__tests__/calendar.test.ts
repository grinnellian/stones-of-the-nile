import { describe, it, expect } from 'vitest';
import {
  advanceTick,
  isSeasonStart,
  isSeasonEnd,
  totalTicks,
  generateFloodSchedule,
  getSeasonModifiers,
} from '../simulation/calendar.js';
import { Season, TICKS_PER_SEASON } from '../types/calendar.js';

describe('advanceTick', () => {
  it('increments tick within a season', () => {
    const date = { year: 1, season: Season.Akhet, tick: 0 };
    const next = advanceTick(date);
    expect(next).toEqual({ year: 1, season: Season.Akhet, tick: 1 });
  });

  it('rolls over to next season', () => {
    const date = { year: 1, season: Season.Akhet, tick: TICKS_PER_SEASON - 1 };
    const next = advanceTick(date);
    expect(next).toEqual({ year: 1, season: Season.Peret, tick: 0 });
  });

  it('rolls over to next year', () => {
    const date = { year: 1, season: Season.Shemu, tick: TICKS_PER_SEASON - 1 };
    const next = advanceTick(date);
    expect(next).toEqual({ year: 2, season: Season.Akhet, tick: 0 });
  });

  it('advances through a full year correctly', () => {
    let date = { year: 1, season: Season.Akhet, tick: 0 };
    const totalTicksInYear = 3 * TICKS_PER_SEASON;
    for (let i = 0; i < totalTicksInYear; i++) {
      date = advanceTick(date);
    }
    expect(date).toEqual({ year: 2, season: Season.Akhet, tick: 0 });
  });
});

describe('isSeasonStart / isSeasonEnd', () => {
  it('detects season start', () => {
    expect(isSeasonStart({ year: 1, season: Season.Akhet, tick: 0 })).toBe(true);
    expect(isSeasonStart({ year: 1, season: Season.Akhet, tick: 1 })).toBe(false);
  });

  it('detects season end', () => {
    expect(
      isSeasonEnd({ year: 1, season: Season.Akhet, tick: TICKS_PER_SEASON - 1 })
    ).toBe(true);
    expect(isSeasonEnd({ year: 1, season: Season.Akhet, tick: 0 })).toBe(false);
  });
});

describe('totalTicks', () => {
  it('returns 0 for year 0, Akhet, tick 0', () => {
    expect(totalTicks({ year: 0, season: Season.Akhet, tick: 0 })).toBe(0);
  });

  it('increments correctly', () => {
    const a = totalTicks({ year: 1, season: Season.Akhet, tick: 0 });
    const b = totalTicks({ year: 1, season: Season.Akhet, tick: 1 });
    expect(b - a).toBe(1);
  });

  it('season boundaries are contiguous', () => {
    const endOfAkhet = totalTicks({
      year: 1,
      season: Season.Akhet,
      tick: TICKS_PER_SEASON - 1,
    });
    const startOfPeret = totalTicks({ year: 1, season: Season.Peret, tick: 0 });
    expect(startOfPeret - endOfAkhet).toBe(1);
  });
});

describe('generateFloodSchedule', () => {
  it('generates correct number of years', () => {
    const schedule = generateFloodSchedule(1, 10);
    expect(schedule).toHaveLength(10);
    expect(schedule[0].year).toBe(1);
    expect(schedule[9].year).toBe(10);
  });

  it('flood levels are within bounds', () => {
    const schedule = generateFloodSchedule(1, 100);
    for (const flood of schedule) {
      expect(flood.level).toBeGreaterThanOrEqual(0.1);
      expect(flood.level).toBeLessThanOrEqual(0.9);
    }
  });

  it('is deterministic with same seed', () => {
    const a = generateFloodSchedule(1, 10, 42);
    const b = generateFloodSchedule(1, 10, 42);
    expect(a).toEqual(b);
  });

  it('varies with different seeds', () => {
    const a = generateFloodSchedule(1, 10, 42);
    const b = generateFloodSchedule(1, 10, 99);
    expect(a).not.toEqual(b);
  });
});

describe('getSeasonModifiers', () => {
  it('Akhet has no farm output', () => {
    const mods = getSeasonModifiers(Season.Akhet, 0.5);
    expect(mods.farmOutput).toBe(0);
  });

  it('Shemu has full farm output', () => {
    const mods = getSeasonModifiers(Season.Shemu, 0.5);
    expect(mods.farmOutput).toBe(1.0);
  });

  it('high flood increases Akhet river transport', () => {
    const low = getSeasonModifiers(Season.Akhet, 0.2);
    const high = getSeasonModifiers(Season.Akhet, 0.8);
    expect(high.riverTransportCapacity).toBeGreaterThan(low.riverTransportCapacity);
  });

  it('high flood reduces Akhet quarry efficiency', () => {
    const low = getSeasonModifiers(Season.Akhet, 0.2);
    const high = getSeasonModifiers(Season.Akhet, 0.8);
    expect(high.quarryEfficiency).toBeLessThan(low.quarryEfficiency);
  });
});
