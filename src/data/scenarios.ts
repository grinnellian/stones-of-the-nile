import { Site, SiteType, TransportRoute } from '../types/world.js';
import { Contract } from '../types/contracts.js';
import { ResourceType } from '../types/resources.js';
import { GameConfig } from '../simulation/engine.js';
import { RECIPES } from './recipes.js';

/**
 * Scenario 1: The Foreman's First Contract
 * One quarry, one construction site, simple supply chain.
 * "Deliver dressed stone to the plateau."
 */
export function createForemanScenario(): GameConfig {
  const quarry: Site = {
    id: 'tura-quarry',
    name: 'Tura Limestone Quarry',
    type: SiteType.Quarry,
    position: { x: 3, y: 5 },
    onNile: false,
    distanceFromNile: 2,
    stockpile: {
      [ResourceType.CopperTools]: 10,
      [ResourceType.Limestone]: 0,
    },
    workers: {
      laborers: 20,
      craftsmen: 5,
      scribes: 0,
      satisfaction: 0.7,
    },
    producers: [
      {
        id: 'quarry-1',
        recipeId: 'quarry_limestone',
        capacity: 2,
        progress: 0,
        active: true,
      },
      {
        id: 'dresser-1',
        recipeId: 'dress_stone',
        capacity: 1,
        progress: 0,
        active: true,
      },
    ],
  };

  const constructionSite: Site = {
    id: 'giza-plateau',
    name: 'Giza Plateau',
    type: SiteType.ConstructionSite,
    position: { x: 1, y: 3 },
    onNile: false,
    distanceFromNile: 3,
    stockpile: {
      [ResourceType.DressedStone]: 0,
    },
    workers: {
      laborers: 30,
      craftsmen: 3,
      scribes: 0,
      satisfaction: 0.7,
    },
    producers: [],
  };

  const bakery: Site = {
    id: 'workers-village',
    name: "Workers' Village",
    type: SiteType.City,
    position: { x: 2, y: 4 },
    onNile: false,
    distanceFromNile: 1,
    stockpile: {
      [ResourceType.Grain]: 200,
      [ResourceType.Water]: 100,
      [ResourceType.Wood]: 50,
    },
    workers: {
      laborers: 10,
      craftsmen: 2,
      scribes: 0,
      satisfaction: 0.8,
    },
    producers: [
      {
        id: 'bakery-1',
        recipeId: 'bake_bread',
        capacity: 2,
        progress: 0,
        active: true,
      },
      {
        id: 'brewery-1',
        recipeId: 'brew_beer',
        capacity: 1,
        progress: 0,
        active: true,
      },
    ],
  };

  const quarryToSite: TransportRoute = {
    id: 'tura-to-giza',
    fromSiteId: 'tura-quarry',
    toSiteId: 'giza-plateau',
    viaNile: false,
    baseCapacity: 50,
    travelTime: 2,
    inTransit: [],
  };

  const contract: Contract = {
    id: 'foreman-first',
    name: "The Foreman's First Contract",
    description:
      'Prove yourself. Deliver dressed limestone blocks to the Giza plateau. Not once — sustain it.',
    requiredOutput: [{ type: ResourceType.DressedStone, quantity: 30 }],
    durationSeasons: 3,
    bonuses: [
      {
        id: 'perfect-delivery',
        description: 'Zero missed deliveries',
        condition: { type: 'zero_missed_deliveries' },
      },
      {
        id: 'happy-workers',
        description: 'Maintain worker satisfaction above 70%',
        condition: { type: 'min_satisfaction', threshold: 0.7 },
      },
    ],
  };

  return {
    sites: [quarry, constructionSite, bakery],
    routes: [quarryToSite],
    contracts: [contract],
    recipes: RECIPES,
    startYear: 1,
    floodSeed: 42,
    yearsToGenerate: 5,
  };
}
