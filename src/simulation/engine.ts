import { GameState, Site, TransportRoute } from '../types/world.js';
import { GameDate, Season, FloodLevel } from '../types/calendar.js';
import { Contract, ContractProgress } from '../types/contracts.js';
import { Recipe } from '../types/resources.js';
import {
  advanceTick,
  isSeasonEnd,
  getSeasonModifiers,
  generateFloodSchedule,
} from './calendar.js';
import { tickProducer, ProductionResult } from './production.js';
import { tickTransport } from './transport.js';
import { evaluateSeasonDelivery } from './contracts.js';
import { mergeStockpiles } from './stockpile.js';
import { Stockpile } from '../types/resources.js';

export interface TickReport {
  date: GameDate;
  production: Map<string, ProductionResult>;
  deliveries: Map<string, Stockpile>;
  seasonEnd: boolean;
  contractUpdates: ContractProgress[];
}

export interface GameConfig {
  sites: Site[];
  routes: TransportRoute[];
  contracts: Contract[];
  recipes: Record<string, Recipe>;
  startYear: number;
  floodSeed?: number;
  yearsToGenerate: number;
}

/** Create initial game state from config */
export function createGameState(config: GameConfig): GameState {
  return {
    date: { year: config.startYear, season: Season.Akhet, tick: 0 },
    sites: config.sites.map((s) => ({ ...s })),
    routes: config.routes.map((r) => ({ ...r, inTransit: [] })),
    contracts: config.contracts.map((c) => ({
      contractId: c.id,
      seasonsFulfilled: 0,
      seasonsAttempted: 0,
      deliveryHistory: [],
      active: true,
      completed: false,
      failed: false,
    })),
    floodSchedule: generateFloodSchedule(
      config.startYear,
      config.yearsToGenerate,
      config.floodSeed
    ),
    stats: {
      totalResourcesProduced: {},
      totalResourcesTransported: {},
      totalContractsCompleted: 0,
      totalContractsFailed: 0,
    },
  };
}

/** Get flood level for a given year */
function getFloodLevel(state: GameState): number {
  const flood = state.floodSchedule.find((f) => f.year === state.date.year);
  return flood?.level ?? 0.5;
}

/**
 * Run one tick of the simulation.
 * This is the heartbeat of the game.
 */
export function tick(
  state: GameState,
  contracts: Contract[],
  recipes: Record<string, Recipe>
): { state: GameState; report: TickReport } {
  const floodLevel = getFloodLevel(state);
  const modifiers = getSeasonModifiers(state.date.season, floodLevel);

  const productionResults = new Map<string, ProductionResult>();
  const deliveryResults = new Map<string, Stockpile>();

  // Deep copy sites for mutation
  const updatedSites = new Map<string, Site>();
  for (const site of state.sites) {
    updatedSites.set(site.id, {
      ...site,
      stockpile: { ...site.stockpile },
      workers: { ...site.workers },
      producers: site.producers.map((p) => ({ ...p })),
    });
  }

  // 1. Run production at each site
  for (const [siteId, site] of updatedSites) {
    for (let i = 0; i < site.producers.length; i++) {
      const producer = site.producers[i];
      const recipe = recipes[producer.recipeId];
      if (!recipe) continue;

      const result = tickProducer(
        producer,
        recipe,
        site.stockpile,
        site.workers,
        modifiers
      );

      site.stockpile = result.stockpile;
      site.producers[i] = result.producer;
      productionResults.set(`${siteId}:${producer.id}`, result);

      // Track global stats
      state.stats.totalResourcesProduced = mergeStockpiles(
        state.stats.totalResourcesProduced,
        result.produced
      );
    }
  }

  // 2. Run transport
  const updatedRoutes: TransportRoute[] = [];
  for (const route of state.routes) {
    const fromSite = updatedSites.get(route.fromSiteId);
    const toSite = updatedSites.get(route.toSiteId);
    if (!fromSite || !toSite) {
      updatedRoutes.push(route);
      continue;
    }

    const result = tickTransport(route, fromSite.stockpile, toSite.stockpile, modifiers);
    fromSite.stockpile = result.fromStockpile;
    toSite.stockpile = result.toStockpile;
    updatedRoutes.push(result.route);

    if (Object.keys(result.delivered).length > 0) {
      deliveryResults.set(route.id, result.delivered);
      state.stats.totalResourcesTransported = mergeStockpiles(
        state.stats.totalResourcesTransported,
        result.delivered
      );
    }
  }

  // 3. Evaluate contracts at season end
  const seasonEnd = isSeasonEnd(state.date);
  let updatedContracts = state.contracts;

  if (seasonEnd) {
    updatedContracts = state.contracts.map((progress) => {
      const contract = contracts.find((c) => c.id === progress.contractId);
      if (!contract || !progress.active) return progress;

      // Sum all deliveries to construction sites this season
      // For now, use the construction site stockpile as "delivered"
      const constructionSites = Array.from(updatedSites.values()).filter(
        (s) => s.type === 'construction_site'
      );
      const totalDelivered: Stockpile = {};
      for (const site of constructionSites) {
        for (const [type, qty] of Object.entries(site.stockpile)) {
          if (qty) {
            totalDelivered[type as keyof Stockpile] =
              (totalDelivered[type as keyof Stockpile] ?? 0) + qty;
          }
        }
      }

      return evaluateSeasonDelivery(contract, progress, totalDelivered);
    });
  }

  // 4. Advance time
  const newDate = advanceTick(state.date);

  const newState: GameState = {
    date: newDate,
    sites: Array.from(updatedSites.values()),
    routes: updatedRoutes,
    contracts: updatedContracts,
    floodSchedule: state.floodSchedule,
    stats: state.stats,
  };

  return {
    state: newState,
    report: {
      date: state.date, // report reflects the tick that just ran
      production: productionResults,
      deliveries: deliveryResults,
      seasonEnd,
      contractUpdates: updatedContracts,
    },
  };
}
