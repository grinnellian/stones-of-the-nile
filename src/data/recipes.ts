import { Recipe, ResourceType } from '../types/resources.js';

/** Core production recipes */
export const RECIPES: Record<string, Recipe> = {
  quarry_limestone: {
    id: 'quarry_limestone',
    name: 'Quarry Limestone',
    inputs: [{ type: ResourceType.CopperTools, quantity: 0.1 }], // tools wear out
    outputs: [{ type: ResourceType.Limestone, quantity: 10 }],
    duration: 2,
    skillRequirement: 0.1,
  },

  dress_stone: {
    id: 'dress_stone',
    name: 'Dress Stone Blocks',
    inputs: [
      { type: ResourceType.Limestone, quantity: 10 },
      { type: ResourceType.CopperTools, quantity: 0.2 },
    ],
    outputs: [{ type: ResourceType.DressedStone, quantity: 5 }],
    duration: 3,
    skillRequirement: 0.4,
  },

  quarry_granite: {
    id: 'quarry_granite',
    name: 'Quarry Granite',
    inputs: [{ type: ResourceType.CopperTools, quantity: 0.3 }], // very hard on tools
    outputs: [{ type: ResourceType.Granite, quantity: 3 }],
    duration: 4,
    skillRequirement: 0.5,
  },

  make_copper_tools: {
    id: 'make_copper_tools',
    name: 'Forge Copper Tools',
    inputs: [
      { type: ResourceType.Copper, quantity: 5 },
      { type: ResourceType.Wood, quantity: 2 },
    ],
    outputs: [{ type: ResourceType.CopperTools, quantity: 3 }],
    duration: 2,
    skillRequirement: 0.5,
  },

  make_mud_bricks: {
    id: 'make_mud_bricks',
    name: 'Make Mud Bricks',
    inputs: [
      { type: ResourceType.Clay, quantity: 5 },
      { type: ResourceType.Water, quantity: 2 },
    ],
    outputs: [{ type: ResourceType.MudBricks, quantity: 20 }],
    duration: 1,
    skillRequirement: 0.0,
  },

  bake_bread: {
    id: 'bake_bread',
    name: 'Bake Bread',
    inputs: [
      { type: ResourceType.Grain, quantity: 5 },
      { type: ResourceType.Water, quantity: 1 },
      { type: ResourceType.Wood, quantity: 0.5 },
    ],
    outputs: [{ type: ResourceType.Bread, quantity: 10 }],
    duration: 1,
    skillRequirement: 0.1,
  },

  brew_beer: {
    id: 'brew_beer',
    name: 'Brew Beer',
    inputs: [
      { type: ResourceType.Grain, quantity: 8 },
      { type: ResourceType.Water, quantity: 3 },
    ],
    outputs: [{ type: ResourceType.Beer, quantity: 10 }],
    duration: 2,
    skillRequirement: 0.2,
  },

  grow_grain: {
    id: 'grow_grain',
    name: 'Farm Grain',
    inputs: [{ type: ResourceType.Water, quantity: 3 }],
    outputs: [{ type: ResourceType.Grain, quantity: 15 }],
    duration: 4, // slow — farming takes time
    skillRequirement: 0.1,
  },

  make_rope: {
    id: 'make_rope',
    name: 'Make Rope',
    inputs: [{ type: ResourceType.RopeGrass, quantity: 5 }],
    outputs: [{ type: ResourceType.Rope, quantity: 3 }],
    duration: 1,
    skillRequirement: 0.1,
  },

  build_barge: {
    id: 'build_barge',
    name: 'Build Barge',
    inputs: [
      { type: ResourceType.Wood, quantity: 20 },
      { type: ResourceType.Rope, quantity: 5 },
    ],
    outputs: [{ type: ResourceType.Barges, quantity: 1 }],
    duration: 6,
    skillRequirement: 0.6,
  },

  mix_geopolymer: {
    id: 'mix_geopolymer',
    name: 'Mix Geopolymer',
    inputs: [
      { type: ResourceType.Limestone, quantity: 8 },
      { type: ResourceType.Water, quantity: 4 },
      { type: ResourceType.Gypsum, quantity: 2 },
    ],
    outputs: [{ type: ResourceType.GeopolymerMix, quantity: 5 }],
    duration: 3,
    skillRequirement: 0.6,
  },
};
