/**
 * Core resource types in the game.
 * Raw resources are gathered/mined, processed resources are crafted from raws.
 */
export enum ResourceType {
  // Raw resources
  Limestone = 'limestone',
  Granite = 'granite',
  Copper = 'copper',
  Wood = 'wood',
  Grain = 'grain',
  Water = 'water',
  Clay = 'clay',
  Papyrus = 'papyrus',
  RopeGrass = 'rope_grass',
  Sand = 'sand',
  Gypsum = 'gypsum',

  // Processed resources
  DressedStone = 'dressed_stone',
  CopperTools = 'copper_tools',
  Bread = 'bread',
  Beer = 'beer',
  MudBricks = 'mud_bricks',
  Rope = 'rope',
  Barges = 'barges',
  GeopolymerMix = 'geopolymer_mix',
}

/** A quantity of a single resource */
export interface ResourceAmount {
  type: ResourceType;
  quantity: number;
}

/** A stockpile maps resource types to quantities */
export type Stockpile = Partial<Record<ResourceType, number>>;

/** Recipe: inputs consumed to produce outputs */
export interface Recipe {
  id: string;
  name: string;
  inputs: ResourceAmount[];
  outputs: ResourceAmount[];
  /** Ticks (sub-season) to complete one batch */
  duration: number;
  /** Skill level required (0-1) */
  skillRequirement: number;
}
