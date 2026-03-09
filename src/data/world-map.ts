import { SiteType } from '../types/world.js';
import { ResourceType } from '../types/resources.js';

// ---------------------------------------------------------------------------
// Coordinate system
// ---------------------------------------------------------------------------
// Y axis: 0 = northern edge of the Delta, increases southward (upstream).
// X axis: 0 = center of the Nile at Memphis latitude; negative = west, positive = east.
// Scale: ~1 unit ≈ 1 km.  Full map spans roughly 0-1000 north-south
// (Delta coast to Aswan) and -400 to +400 east-west.
//
// Real-world reference anchors (approximate):
//   Memphis  ≈ (0, 150)   — 150 km south of the coast
//   Aswan    ≈ (0, 1000)  — ~850 km south of Memphis
//   Sinai    ≈ (350, 200) — ~350 km east of Memphis
//   Byblos   ≈ (250, -450) — ~600 km NNE via sea
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Types for world-map data
// ---------------------------------------------------------------------------

/** Historical era when a location becomes relevant to gameplay. */
export enum Era {
  /** Dynasty 3 — Djoser & Imhotep (~2686-2613 BCE) */
  Djoser = 'djoser',
  /** Dynasty 4, early — Sneferu (~2613-2589 BCE) */
  Sneferu = 'sneferu',
  /** Dynasty 4, peak — Khufu (~2589-2566 BCE) */
  Khufu = 'khufu',
  /** Available from the start of the game / all eras */
  Always = 'always',
}

/** The broad terrain zone a location sits in. */
export enum TerrainZone {
  /** The fertile Nile floodplain */
  BlackLand = 'black_land',
  /** The desert on either side */
  RedLand = 'red_land',
  /** The broad, marshy Delta */
  Delta = 'delta',
  /** The Mediterranean coast or overseas */
  Sea = 'sea',
  /** River surface */
  Nile = 'nile',
}

/** Extended site classification beyond the runtime SiteType. */
export type MapLocationType =
  | SiteType
  | 'quarry'
  | 'mine'
  | 'trade_post'
  | 'construction_site'
  | 'worker_village'
  | 'religious_center'
  | 'port'
  | 'farm'
  | 'city';

/** A location on the world map with historical metadata. */
export interface MapLocation {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Display name */
  name: string;
  /** Ancient Egyptian name, if known */
  ancientName?: string;
  /** Broad classification */
  type: MapLocationType;
  /** Map position */
  position: { x: number; y: number };
  /** Terrain zone */
  terrain: TerrainZone;
  /** On or directly adjacent to the Nile? */
  onNile: boolean;
  /** Distance from the Nile in map units (~km) */
  distanceFromNile: number;
  /** Which Nile bank (if relevant) */
  bank?: 'east' | 'west';
  /** Resources this location produces or provides */
  resources: ResourceType[];
  /** First era this location becomes significant */
  era: Era;
  /** Brief historical note for the encyclopedia */
  historicalNote: string;
  /** Region tag for grouping */
  region: 'delta' | 'memphis_necropolis' | 'middle_egypt' | 'upper_egypt' | 'eastern_desert' | 'western_desert' | 'sinai' | 'levant';
}

/** A waypoint on the Nile river path. */
export interface NileWaypoint {
  /** Map position */
  position: { x: number; y: number };
  /** Optional label */
  label?: string;
  /** Approximate width of the Nile at this point (in map units) */
  width: number;
}

/** The type of a trade route. */
export enum TradeRouteType {
  Nile = 'nile',
  Overland = 'overland',
  Sea = 'sea',
  Canal = 'canal',
}

/** A trade or transport route connecting locations. */
export interface TradeRoute {
  id: string;
  name: string;
  type: TradeRouteType;
  /** Ordered list of location ids along the route */
  waypoints: string[];
  /** Approximate travel time in game ticks (one-way) */
  travelTime: number;
  /** Is this route seasonal? (e.g. Nile routes depend on flood) */
  seasonal: boolean;
  /** Era when this route becomes active */
  era: Era;
  /** What goods typically flow along this route */
  typicalCargo: ResourceType[];
  historicalNote: string;
}

// ---------------------------------------------------------------------------
// Map locations
// ---------------------------------------------------------------------------

export const MAP_LOCATIONS: MapLocation[] = [
  // =========================================================================
  // LOWER EGYPT — THE DELTA
  // =========================================================================
  {
    id: 'buto',
    name: 'Buto',
    ancientName: 'Per-Wadjet',
    type: 'city',
    position: { x: -30, y: 30 },
    terrain: TerrainZone.Delta,
    onNile: true,
    distanceFromNile: 0,
    bank: 'west',
    resources: [ResourceType.Grain, ResourceType.Papyrus, ResourceType.Water],
    era: Era.Always,
    historicalNote:
      'Ancient capital of Lower Egypt and seat of the cobra-goddess Wadjet. ' +
      'By the Old Kingdom it served as a key administrative center in the western Delta, ' +
      'channeling grain surpluses southward toward the construction sites.',
    region: 'delta',
  },
  {
    id: 'sais',
    name: 'Sais',
    ancientName: 'Sau',
    type: 'city',
    position: { x: -20, y: 40 },
    terrain: TerrainZone.Delta,
    onNile: true,
    distanceFromNile: 0,
    bank: 'west',
    resources: [ResourceType.Grain, ResourceType.Papyrus],
    era: Era.Always,
    historicalNote:
      'Cult center of the goddess Neith, patroness of weaving and war. ' +
      'Sais controlled important Delta marshlands that yielded papyrus, flax, and fowl.',
    region: 'delta',
  },
  {
    id: 'bubastis',
    name: 'Bubastis',
    ancientName: 'Per-Bastet',
    type: 'city',
    position: { x: 30, y: 50 },
    terrain: TerrainZone.Delta,
    onNile: true,
    distanceFromNile: 0,
    bank: 'east',
    resources: [ResourceType.Grain, ResourceType.Water],
    era: Era.Always,
    historicalNote:
      'Eastern Delta city sacred to the cat-goddess Bastet. ' +
      'An important staging point for expeditions into the Sinai and for receiving Levantine trade goods.',
    region: 'delta',
  },
  {
    id: 'delta-port',
    name: 'Delta Sea Port',
    ancientName: 'unknown',
    type: 'port',
    position: { x: 10, y: 5 },
    terrain: TerrainZone.Sea,
    onNile: false,
    distanceFromNile: 10,
    resources: [ResourceType.Wood],
    era: Era.Always,
    historicalNote:
      'A marshy harbor at the edge of the Mediterranean where sea-going ships from Byblos ' +
      'transferred cedar logs onto Nile barges. Recent discoveries at Wadi al-Jarf suggest ' +
      'multiple harbors serviced the Old Kingdom pyramid projects.',
    region: 'delta',
  },

  // =========================================================================
  // HELIOPOLIS & THE APEX OF THE DELTA
  // =========================================================================
  {
    id: 'heliopolis',
    name: 'Heliopolis',
    ancientName: 'Iunu',
    type: 'religious_center',
    position: { x: 15, y: 120 },
    terrain: TerrainZone.BlackLand,
    onNile: false,
    distanceFromNile: 10,
    bank: 'east',
    resources: [ResourceType.Papyrus, ResourceType.Grain],
    era: Era.Always,
    historicalNote:
      'The most important religious center in Old Kingdom Egypt, home to the sun cult of Ra-Atum. ' +
      'The Heliopolitan priesthood provided theological legitimacy for pyramid construction as ' +
      'solar monuments. The Benben stone — a sacred pointed pillar — stood here and may have ' +
      'inspired the pyramidion form. Located at the apex of the Delta, just northeast of Memphis.',
    region: 'memphis_necropolis',
  },

  // =========================================================================
  // MEMPHIS & THE NECROPOLIS BAND (Giza → Dahshur)
  // =========================================================================
  {
    id: 'memphis',
    name: 'Memphis',
    ancientName: 'Inbu-Hedj (White Walls)',
    type: 'city',
    position: { x: 0, y: 150 },
    terrain: TerrainZone.BlackLand,
    onNile: true,
    distanceFromNile: 0,
    bank: 'west',
    resources: [ResourceType.Grain, ResourceType.Bread, ResourceType.Beer, ResourceType.Water, ResourceType.Clay],
    era: Era.Always,
    historicalNote:
      'Capital of unified Egypt from the Early Dynastic period through the Old Kingdom. ' +
      'Strategically positioned at the junction of Upper and Lower Egypt, Memphis was the ' +
      'administrative heart from which pharaohs coordinated the vast labor and supply chains ' +
      'needed for pyramid construction. Its harbor was the busiest in Egypt, receiving grain ' +
      'barges from the Delta and stone shipments from the south.',
    region: 'memphis_necropolis',
  },
  {
    id: 'giza-plateau',
    name: 'Giza Plateau',
    ancientName: 'Kher-Neter',
    type: 'construction_site',
    position: { x: -8, y: 140 },
    terrain: TerrainZone.RedLand,
    onNile: false,
    distanceFromNile: 8,
    bank: 'west',
    resources: [ResourceType.Limestone, ResourceType.Sand],
    era: Era.Khufu,
    historicalNote:
      'The desert plateau west of Memphis chosen by Khufu for his Great Pyramid (~2589-2566 BCE). ' +
      'The local bedrock provided the bulk of the roughly 2.3 million limestone blocks; only the ' +
      'outer casing came from Tura across the river. A harbor basin and canal connected the plateau ' +
      'to the Nile during the annual inundation, allowing delivery of granite from Aswan and ' +
      'supplies from across the kingdom.',
    region: 'memphis_necropolis',
  },
  {
    id: 'giza-workers-village',
    name: 'Giza Workers\' Village',
    ancientName: 'Heit el-Ghurab',
    type: 'worker_village',
    position: { x: -6, y: 142 },
    terrain: TerrainZone.BlackLand,
    onNile: false,
    distanceFromNile: 6,
    bank: 'west',
    resources: [ResourceType.Bread, ResourceType.Beer],
    era: Era.Khufu,
    historicalNote:
      'Discovered 400 m south of the Sphinx, this settlement housed the pyramid workforce ' +
      'during the reigns of Khafre and Menkaure. Excavations by Mark Lehner (AERA) revealed ' +
      'galleries (barracks), bakeries, breweries, a copper workshop, and vast quantities of ' +
      'cattle, sheep, and fish bones — an estimated 4,000 lbs of meat consumed daily. ' +
      'A similar but as-yet-undiscovered settlement likely existed during Khufu\'s reign.',
    region: 'memphis_necropolis',
  },
  {
    id: 'saqqara',
    name: 'Saqqara',
    ancientName: 'Saqqara',
    type: 'construction_site',
    position: { x: -10, y: 170 },
    terrain: TerrainZone.RedLand,
    onNile: false,
    distanceFromNile: 5,
    bank: 'west',
    resources: [ResourceType.Limestone, ResourceType.Sand],
    era: Era.Djoser,
    historicalNote:
      'The great necropolis of Memphis, stretching 6 km along the desert edge. Imhotep, ' +
      'vizier and architect to King Djoser (c. 2670 BCE), built the Step Pyramid here — ' +
      'Egypt\'s first monumental stone structure and the world\'s oldest large-scale cut-stone ' +
      'construction. The complex includes a mortuary temple, serdab, and a vast enclosure wall ' +
      'imitating the palace facade in fine Tura limestone.',
    region: 'memphis_necropolis',
  },
  {
    id: 'saqqara-workers-village',
    name: 'Saqqara Workers\' Settlement',
    type: 'worker_village',
    position: { x: -7, y: 172 },
    terrain: TerrainZone.BlackLand,
    onNile: false,
    distanceFromNile: 3,
    bank: 'west',
    resources: [ResourceType.Bread, ResourceType.Beer, ResourceType.Grain],
    era: Era.Djoser,
    historicalNote:
      'A settlement near the Step Pyramid where workers lived during Djoser\'s construction ' +
      'program. Archaeological evidence suggests organized provisioning by the state, with ' +
      'bakeries and breweries supplying the workforce.',
    region: 'memphis_necropolis',
  },
  {
    id: 'abusir',
    name: 'Abusir',
    ancientName: 'Per-Usir',
    type: 'construction_site',
    position: { x: -9, y: 160 },
    terrain: TerrainZone.RedLand,
    onNile: false,
    distanceFromNile: 5,
    bank: 'west',
    resources: [ResourceType.Limestone],
    era: Era.Khufu,
    historicalNote:
      'Necropolis between Giza and Saqqara used primarily by 5th Dynasty pharaohs. ' +
      'The Abusir Papyri, found here, provide the best surviving administrative records ' +
      'of Old Kingdom temple management, offering invaluable insight into the bureaucratic ' +
      'machinery that sustained pyramid complexes.',
    region: 'memphis_necropolis',
  },
  {
    id: 'dahshur',
    name: 'Dahshur',
    ancientName: 'Dahshur',
    type: 'construction_site',
    position: { x: -12, y: 185 },
    terrain: TerrainZone.RedLand,
    onNile: false,
    distanceFromNile: 5,
    bank: 'west',
    resources: [ResourceType.Limestone, ResourceType.Sand],
    era: Era.Sneferu,
    historicalNote:
      'Site of Sneferu\'s two great pyramids (~2613-2589 BCE). The Bent Pyramid changed angle ' +
      'mid-construction (from ~54° to ~43°), probably due to structural concerns — a dramatic ' +
      'lesson in engineering. The Red Pyramid, built afterward, was the first true smooth-sided ' +
      'pyramid and proved the design that Khufu would perfect at Giza. Together, Sneferu\'s ' +
      'pyramids at Dahshur contain more stone than the Great Pyramid itself.',
    region: 'memphis_necropolis',
  },

  // =========================================================================
  // QUARRIES — LIMESTONE
  // =========================================================================
  {
    id: 'tura-quarry',
    name: 'Tura Quarries',
    ancientName: 'Tura/Ma\'sara',
    type: 'quarry',
    position: { x: 15, y: 155 },
    terrain: TerrainZone.RedLand,
    onNile: false,
    distanceFromNile: 3,
    bank: 'east',
    resources: [ResourceType.Limestone, ResourceType.DressedStone],
    era: Era.Djoser,
    historicalNote:
      'The premier source of fine white limestone in all of Egypt, located on the east bank ' +
      'of the Nile opposite Memphis. Tura-Ma\'sara\'s underground galleries extend 6 km along ' +
      'the Mokattam ridge. The brilliant white casing stones of the Step Pyramid, Bent Pyramid, ' +
      'Red Pyramid, and Great Pyramid all came from these quarries. Blocks were dragged to the ' +
      'river bank and loaded onto barges for the short crossing to the west bank construction sites.',
    region: 'memphis_necropolis',
  },

  // =========================================================================
  // QUARRIES — GRANITE (Aswan)
  // =========================================================================
  {
    id: 'aswan',
    name: 'Aswan Granite Quarries',
    ancientName: 'Swenet',
    type: 'quarry',
    position: { x: 5, y: 1000 },
    terrain: TerrainZone.RedLand,
    onNile: true,
    distanceFromNile: 0,
    bank: 'east',
    resources: [ResourceType.Granite],
    era: Era.Djoser,
    historicalNote:
      'Egypt\'s sole source of high-quality red and grey granite, located at the First Cataract ' +
      '~850 km south of Memphis. Granite was used for kings\' chamber beams (Khufu\'s chamber ' +
      'has nine slabs weighing up to 80 tons each), sarcophagi, and obelisks. Quarrying involved ' +
      'pounding dolerite balls along channels to isolate blocks — a laborious process. Blocks ' +
      'were loaded onto massive barges and floated downstream, a journey of 2-3 weeks aided by ' +
      'the current. The famous Unfinished Obelisk still lies in these quarries.',
    region: 'upper_egypt',
  },

  // =========================================================================
  // QUARRIES — ALABASTER (Hatnub)
  // =========================================================================
  {
    id: 'hatnub',
    name: 'Hatnub Alabaster Quarries',
    ancientName: 'Hatnub',
    type: 'quarry',
    position: { x: 65, y: 520 },
    terrain: TerrainZone.RedLand,
    onNile: false,
    distanceFromNile: 65,
    bank: 'east',
    resources: [ResourceType.Gypsum],
    era: Era.Djoser,
    historicalNote:
      'Located in the Eastern Desert about 65 km southeast of el-Minya, Hatnub was the ' +
      'principal source of Egyptian travertine ("alabaster"). This luminous stone was prized ' +
      'for sarcophagi, canopic jars, statuary, and temple floors. Old Kingdom graffiti at the ' +
      'site record expeditions by Khufu and later pharaohs. A recently discovered ramp system ' +
      'with post-holes suggests an innovative hauling technique that may shed light on pyramid ' +
      'construction methods. The quarry operated seasonally, with workers camping nearby.',
    region: 'middle_egypt',
  },

  // =========================================================================
  // QUARRIES — BASALT (Fayum)
  // =========================================================================
  {
    id: 'fayum-basalt',
    name: 'Widan el-Faras Basalt Quarry',
    ancientName: 'Widan el-Faras',
    type: 'quarry',
    position: { x: -50, y: 200 },
    terrain: TerrainZone.RedLand,
    onNile: false,
    distanceFromNile: 50,
    bank: 'west',
    resources: [ResourceType.Granite], // basalt re-uses granite type
    era: Era.Djoser,
    historicalNote:
      'One of the world\'s oldest known quarry roads connects these basalt flows on Gebel Qatrani ' +
      'to Lake Moeris via a 10 km paved road — among Egypt\'s earliest engineered roadways. ' +
      'Basalt was shipped across the lake, through a canal to the Nile, and then north to ' +
      'Memphis. It was used for mortuary temple pavements, including Khufu\'s. Located about ' +
      '60 km southwest of Cairo in the northern Fayum depression.',
    region: 'western_desert',
  },

  // =========================================================================
  // FAYUM — AGRICULTURE
  // =========================================================================
  {
    id: 'fayum-farms',
    name: 'Fayum Agricultural Region',
    ancientName: 'Ta-she (Land of the Lake)',
    type: 'farm',
    position: { x: -40, y: 210 },
    terrain: TerrainZone.BlackLand,
    onNile: false,
    distanceFromNile: 30,
    bank: 'west',
    resources: [ResourceType.Grain, ResourceType.Water, ResourceType.RopeGrass],
    era: Era.Always,
    historicalNote:
      'The Fayum depression, fed by a branch of the Nile (the Bahr Yussef canal), contained ' +
      'Lake Moeris and some of Egypt\'s most fertile land. During the Old Kingdom the region ' +
      'was a major grain producer. Its marshes also yielded waterfowl, fish, and papyrus. ' +
      'The lake served as a natural reservoir that moderated flood levels.',
    region: 'western_desert',
  },

  // =========================================================================
  // MEIDUM — Sneferu's first pyramid
  // =========================================================================
  {
    id: 'meidum',
    name: 'Meidum',
    ancientName: 'Meidum',
    type: 'construction_site',
    position: { x: -5, y: 215 },
    terrain: TerrainZone.RedLand,
    onNile: false,
    distanceFromNile: 5,
    bank: 'west',
    resources: [ResourceType.Limestone, ResourceType.Sand],
    era: Era.Sneferu,
    historicalNote:
      'Site of Sneferu\'s first pyramid, originally begun as a step pyramid (possibly by Huni, ' +
      'last king of the 3rd Dynasty) and later converted to a true pyramid form. The outer ' +
      'casing eventually collapsed — possibly during or after construction — leaving the ' +
      'distinctive tower-like ruin visible today. The lessons learned here directly informed ' +
      'the design changes at Dahshur. Located about 65 km south of Memphis on the west bank.',
    region: 'middle_egypt',
  },

  // =========================================================================
  // MIDDLE EGYPT — AGRICULTURAL
  // =========================================================================
  {
    id: 'hermopolis',
    name: 'Hermopolis Region',
    ancientName: 'Khmunu',
    type: 'city',
    position: { x: 5, y: 450 },
    terrain: TerrainZone.BlackLand,
    onNile: true,
    distanceFromNile: 0,
    bank: 'west',
    resources: [ResourceType.Grain, ResourceType.Clay, ResourceType.Water],
    era: Era.Always,
    historicalNote:
      'Capital of the 15th nome of Upper Egypt and cult center of Thoth, god of writing ' +
      'and knowledge. During the Old Kingdom it was a significant administrative center ' +
      'coordinating grain collection for the Middle Egyptian nomes. Located near modern el-Ashmunein.',
    region: 'middle_egypt',
  },

  // =========================================================================
  // UPPER EGYPT
  // =========================================================================
  {
    id: 'abydos',
    name: 'Abydos',
    ancientName: 'Abdju',
    type: 'religious_center',
    position: { x: -10, y: 650 },
    terrain: TerrainZone.BlackLand,
    onNile: false,
    distanceFromNile: 10,
    bank: 'west',
    resources: [ResourceType.Grain],
    era: Era.Always,
    historicalNote:
      'Sacred city of Osiris and burial place of Egypt\'s earliest kings. The royal tombs of ' +
      'the 1st and 2nd Dynasties lie here. By the Old Kingdom, Abydos was a major pilgrimage ' +
      'destination and an important Upper Egyptian administrative center, controlling grain ' +
      'surpluses from the fertile nomes of the Thinite region.',
    region: 'upper_egypt',
  },
  {
    id: 'elephantine',
    name: 'Elephantine Island',
    ancientName: 'Abu',
    type: 'city',
    position: { x: -2, y: 995 },
    terrain: TerrainZone.BlackLand,
    onNile: true,
    distanceFromNile: 0,
    resources: [ResourceType.Granite, ResourceType.Water],
    era: Era.Always,
    historicalNote:
      'Island fortress at the First Cataract, Egypt\'s traditional southern frontier. ' +
      'The nome governor here controlled trade with Nubia (gold, ivory, ebony, incense) ' +
      'and oversaw the granite quarry expeditions. A nilometer on the island measured the ' +
      'annual flood — critical data for predicting harvests and tax revenue across the kingdom.',
    region: 'upper_egypt',
  },

  // =========================================================================
  // MINING — SINAI
  // =========================================================================
  {
    id: 'sinai-mines',
    name: 'Sinai Copper & Turquoise Mines',
    ancientName: 'Biau / Mefkat',
    type: 'mine',
    position: { x: 350, y: 200 },
    terrain: TerrainZone.RedLand,
    onNile: false,
    distanceFromNile: 350,
    resources: [ResourceType.Copper],
    era: Era.Djoser,
    historicalNote:
      'The mines at Wadi Maghara and Serabit el-Khadim in the southwestern Sinai Peninsula ' +
      'were Egypt\'s primary source of copper and turquoise from the Early Dynastic period onward. ' +
      'Old Kingdom reliefs at Wadi Maghara show pharaohs Djoser, Sneferu, and Khufu smiting ' +
      'enemies — propaganda to assert royal control over these strategic resources. Expeditions ' +
      'were mounted seasonally (winter/spring) with hundreds of workers, donkey caravans, and ' +
      'military escorts. Copper was essential for the chisels and saws that cut pyramid stone.',
    region: 'sinai',
  },

  // =========================================================================
  // WADI NATRUN — NATRON
  // =========================================================================
  {
    id: 'wadi-natrun',
    name: 'Wadi Natrun',
    ancientName: 'Sekhet-Hemat (Field of Natron)',
    type: 'mine',
    position: { x: -100, y: 90 },
    terrain: TerrainZone.RedLand,
    onNile: false,
    distanceFromNile: 80,
    bank: 'west',
    resources: [ResourceType.Gypsum], // natron approximated as gypsum
    era: Era.Always,
    historicalNote:
      'A chain of salt lakes in the Western Desert, about 100 km northwest of Memphis, that ' +
      'yielded natron — a naturally occurring mineral salt (sodium carbonate/bicarbonate) ' +
      'essential for mummification, ritual purification, and glassmaking. Caravans of donkeys ' +
      'carried natron to Memphis and the Delta. The name "natron" itself derives from the ' +
      'ancient Egyptian "neter" via this location.',
    region: 'western_desert',
  },

  // =========================================================================
  // BYBLOS — TIMBER IMPORTS
  // =========================================================================
  {
    id: 'byblos',
    name: 'Byblos',
    ancientName: 'Kbn (Kubna)',
    type: 'trade_post',
    position: { x: 250, y: -450 },
    terrain: TerrainZone.Sea,
    onNile: false,
    distanceFromNile: 600,
    resources: [ResourceType.Wood],
    era: Era.Always,
    historicalNote:
      'The Lebanese port city of Byblos (modern Jbeil) was Egypt\'s most important overseas ' +
      'trading partner throughout the Old Kingdom. Cedar of Lebanon was the most prized import — ' +
      'Egypt had almost no native timber suitable for large construction. Cedar was used for ' +
      'ship masts, roofing beams, the King\'s Chamber\'s "relieving chambers" at Giza, and ' +
      'prestigious coffins. Egyptian artifacts found at Byblos (including objects inscribed with ' +
      'the names of Khufu and Khafre) attest to the close relationship. The Egyptians called ' +
      'seagoing ships "Byblos boats" (kbnt). In return, Egypt exported gold, papyrus, linen, and grain.',
    region: 'levant',
  },

  // =========================================================================
  // WADI AL-JARF — RED SEA PORT
  // =========================================================================
  {
    id: 'wadi-al-jarf',
    name: 'Wadi al-Jarf',
    type: 'port',
    position: { x: 180, y: 300 },
    terrain: TerrainZone.RedLand,
    onNile: false,
    distanceFromNile: 180,
    bank: 'east',
    resources: [ResourceType.Copper],
    era: Era.Khufu,
    historicalNote:
      'A Red Sea port discovered in 2013, with the world\'s oldest known papyri — the diary ' +
      'of an inspector named Merer who transported limestone from Tura to Giza during Khufu\'s ' +
      'reign. The port also served as a staging area for Sinai mining expeditions. Stone-lined ' +
      'storage galleries cut into the hillside held dismantled boats and supplies between expeditions.',
    region: 'eastern_desert',
  },
];

// ---------------------------------------------------------------------------
// Nile river path — waypoints from the Delta coast to Aswan
// ---------------------------------------------------------------------------

export const NILE_PATH: NileWaypoint[] = [
  // Delta branches fan out broadly; we trace the main western (Rosetta) branch
  { position: { x: -30, y: 0 },   label: 'Rosetta Mouth',       width: 8 },
  { position: { x: -20, y: 20 },  label: 'Western Delta',       width: 12 },
  { position: { x: -10, y: 50 },                                 width: 15 },
  { position: { x: 0, y: 80 },    label: 'Delta Apex',          width: 10 },
  // Eastern branch (Pelusiac)
  // { position: { x: 40, y: 0 },  label: 'Pelusiac Mouth', width: 6 },
  // Main Nile south of the Delta
  { position: { x: 5, y: 100 },                                  width: 6 },
  { position: { x: 3, y: 120 },   label: 'Near Heliopolis',     width: 5 },
  { position: { x: 0, y: 150 },   label: 'Memphis',             width: 5 },
  { position: { x: -2, y: 170 },  label: 'Saqqara reach',       width: 5 },
  { position: { x: -3, y: 185 },  label: 'Dahshur reach',       width: 5 },
  { position: { x: -2, y: 210 },  label: 'Meidum reach',        width: 4 },
  { position: { x: 0, y: 250 },                                  width: 4 },
  { position: { x: 5, y: 300 },                                  width: 4 },
  { position: { x: 8, y: 350 },                                  width: 4 },
  { position: { x: 5, y: 400 },   label: 'Asyut region',        width: 4 },
  { position: { x: 5, y: 450 },   label: 'Hermopolis',          width: 4 },
  { position: { x: 3, y: 500 },                                  width: 4 },
  { position: { x: 0, y: 550 },                                  width: 3 },
  { position: { x: -5, y: 600 },                                 width: 3 },
  { position: { x: -8, y: 650 },  label: 'Abydos',              width: 3 },
  { position: { x: -5, y: 700 },                                 width: 3 },
  { position: { x: 0, y: 750 },                                  width: 3 },
  { position: { x: 5, y: 800 },   label: 'Edfu region',         width: 3 },
  { position: { x: 3, y: 850 },                                  width: 3 },
  { position: { x: 0, y: 900 },                                  width: 3 },
  { position: { x: -2, y: 950 },  label: 'Kom Ombo',            width: 3 },
  { position: { x: 0, y: 1000 },  label: 'Aswan / 1st Cataract', width: 2 },
];

// ---------------------------------------------------------------------------
// Trade & transport routes
// ---------------------------------------------------------------------------

export const TRADE_ROUTES: TradeRoute[] = [
  // ---- NILE ROUTES ----
  {
    id: 'nile-delta-to-memphis',
    name: 'Delta Grain Run',
    type: TradeRouteType.Nile,
    waypoints: ['buto', 'sais', 'bubastis', 'heliopolis', 'memphis'],
    travelTime: 4,
    seasonal: true,
    era: Era.Always,
    typicalCargo: [ResourceType.Grain, ResourceType.Papyrus, ResourceType.Water],
    historicalNote:
      'The main artery of the Egyptian state. Grain barges from the Delta traveled south ' +
      '(upstream) to Memphis, often towed by rowing or sailing against the current — though ' +
      'the prevailing north wind aided southward travel. During the inundation, canal access ' +
      'improved dramatically. Return trips (downstream) carried administrative orders, tools, ' +
      'and manufactured goods.',
  },
  {
    id: 'nile-memphis-to-giza',
    name: 'Memphis–Giza Supply Line',
    type: TradeRouteType.Canal,
    waypoints: ['memphis', 'giza-workers-village', 'giza-plateau'],
    travelTime: 1,
    seasonal: true,
    era: Era.Khufu,
    typicalCargo: [ResourceType.Limestone, ResourceType.Granite, ResourceType.DressedStone, ResourceType.Bread, ResourceType.Beer],
    historicalNote:
      'A harbor basin and canal system connected the Nile to the foot of the Giza plateau. ' +
      'During the inundation (June-September), water levels rose high enough for barges carrying ' +
      'multi-ton stone blocks to reach delivery ramps at the construction site. The Merer Papyri ' +
      'from Wadi al-Jarf describe this route in remarkable detail.',
  },
  {
    id: 'nile-tura-to-giza',
    name: 'Tura–Giza Casing Stone Ferry',
    type: TradeRouteType.Nile,
    waypoints: ['tura-quarry', 'giza-plateau'],
    travelTime: 1,
    seasonal: false,
    era: Era.Khufu,
    typicalCargo: [ResourceType.Limestone, ResourceType.DressedStone],
    historicalNote:
      'The short but critical crossing from the Tura quarries on the east bank to the Giza ' +
      'plateau on the west. Fine white casing blocks were loaded onto barges at riverside quays ' +
      'and ferried across — a distance of only about 15 km but requiring careful handling of ' +
      'blocks weighing 2-15 tons. Merer\'s papyrus diary records making this round trip ' +
      'multiple times per day.',
  },
  {
    id: 'nile-tura-to-saqqara',
    name: 'Tura–Saqqara Casing Stone Route',
    type: TradeRouteType.Nile,
    waypoints: ['tura-quarry', 'saqqara'],
    travelTime: 2,
    seasonal: false,
    era: Era.Djoser,
    typicalCargo: [ResourceType.Limestone, ResourceType.DressedStone],
    historicalNote:
      'Tura casing stone for Djoser\'s Step Pyramid was ferried across and slightly south along ' +
      'the Nile to landing points near Saqqara, then hauled overland to the plateau edge.',
  },
  {
    id: 'nile-tura-to-dahshur',
    name: 'Tura–Dahshur Casing Stone Route',
    type: TradeRouteType.Nile,
    waypoints: ['tura-quarry', 'dahshur'],
    travelTime: 2,
    seasonal: false,
    era: Era.Sneferu,
    typicalCargo: [ResourceType.Limestone, ResourceType.DressedStone],
    historicalNote:
      'Fine Tura limestone was transported south across the river and about 20 km downstream ' +
      'to Dahshur for Sneferu\'s Bent and Red Pyramids.',
  },
  {
    id: 'nile-aswan-to-memphis',
    name: 'Aswan–Memphis Granite Run',
    type: TradeRouteType.Nile,
    waypoints: ['aswan', 'elephantine', 'abydos', 'hermopolis', 'memphis'],
    travelTime: 14,
    seasonal: true,
    era: Era.Djoser,
    typicalCargo: [ResourceType.Granite],
    historicalNote:
      'The longest supply route in the kingdom: ~850 km from Aswan to Memphis. Granite blocks ' +
      'weighing up to 80 tons were loaded onto specially built barges and floated downstream ' +
      'with the current. The journey took 2-3 weeks. The trip was best made during the inundation ' +
      'when the river was deepest and the current strongest. Return trips upstream (carrying ' +
      'supplies and tools) took much longer, requiring sailing, rowing, and sometimes towing from shore.',
  },
  {
    id: 'nile-memphis-to-dahshur',
    name: 'Memphis–Dahshur Supply Line',
    type: TradeRouteType.Nile,
    waypoints: ['memphis', 'saqqara', 'dahshur'],
    travelTime: 2,
    seasonal: false,
    era: Era.Sneferu,
    typicalCargo: [ResourceType.Grain, ResourceType.Bread, ResourceType.Beer, ResourceType.CopperTools],
    historicalNote:
      'The supply line from Memphis south to Sneferu\'s construction sites at Dahshur, ' +
      'carrying food provisions, tools, and administrative personnel.',
  },
  {
    id: 'nile-memphis-to-meidum',
    name: 'Memphis–Meidum Supply Line',
    type: TradeRouteType.Nile,
    waypoints: ['memphis', 'saqqara', 'dahshur', 'meidum'],
    travelTime: 4,
    seasonal: false,
    era: Era.Sneferu,
    typicalCargo: [ResourceType.Grain, ResourceType.CopperTools, ResourceType.Bread, ResourceType.Beer],
    historicalNote:
      'The route south from Memphis to Meidum (~65 km), carrying supplies for the conversion ' +
      'of Meidum\'s step pyramid into a true pyramid under Sneferu.',
  },

  // ---- OVERLAND ROUTES ----
  {
    id: 'overland-memphis-to-sinai',
    name: 'Sinai Expedition Road',
    type: TradeRouteType.Overland,
    waypoints: ['memphis', 'bubastis', 'sinai-mines'],
    travelTime: 20,
    seasonal: true,
    era: Era.Djoser,
    typicalCargo: [ResourceType.Copper],
    historicalNote:
      'The overland route to the Sinai copper and turquoise mines crossed the eastern Delta ' +
      'and traversed the arid Sinai Peninsula — roughly 350 km. Expeditions were mounted in ' +
      'winter and spring to avoid lethal summer heat. Donkey caravans of 100-200 animals carried ' +
      'water, food, and tools out, and returned with copper ore and turquoise. Military escorts ' +
      'protected against Bedouin raids. The journey took approximately 2-3 weeks each way.',
  },
  {
    id: 'overland-memphis-to-wadi-natrun',
    name: 'Wadi Natrun Caravan Route',
    type: TradeRouteType.Overland,
    waypoints: ['memphis', 'wadi-natrun'],
    travelTime: 6,
    seasonal: false,
    era: Era.Always,
    typicalCargo: [ResourceType.Gypsum],
    historicalNote:
      'A well-worn desert track leading ~100 km northwest from Memphis to the natron-rich ' +
      'salt lakes of Wadi Natrun. Donkey caravans made the journey regularly, carrying natron ' +
      'back for use in mummification, purification rituals, and as a cleaning agent.',
  },
  {
    id: 'overland-memphis-to-hatnub',
    name: 'Hatnub Alabaster Expedition',
    type: TradeRouteType.Overland,
    waypoints: ['hermopolis', 'hatnub'],
    travelTime: 8,
    seasonal: true,
    era: Era.Djoser,
    typicalCargo: [ResourceType.Gypsum],
    historicalNote:
      'Alabaster quarrying at Hatnub required expeditions into the Eastern Desert, about 65 km ' +
      'from the Nile. Workers carved blocks in remote quarries and dragged them on sledges back ' +
      'to the river for barge transport. A recently discovered ramp with post-holes suggests ' +
      'an innovative pulley-like hauling system. Expeditions could number in the hundreds of men.',
  },
  {
    id: 'overland-fayum-basalt',
    name: 'Fayum Basalt Road',
    type: TradeRouteType.Overland,
    waypoints: ['fayum-basalt', 'fayum-farms'],
    travelTime: 3,
    seasonal: false,
    era: Era.Djoser,
    typicalCargo: [ResourceType.Granite],
    historicalNote:
      'One of the world\'s oldest paved roads — a 10 km track of sandstone and petrified wood ' +
      'slabs — connected the Widan el-Faras basalt quarries to the shores of Lake Moeris. ' +
      'From there, basalt blocks were shipped across the lake by boat, through a canal to the ' +
      'Nile, and north to the Memphis necropolis. This road dates to the Old Kingdom and ' +
      'represents an early triumph of logistics engineering.',
  },

  // ---- SEA ROUTES ----
  {
    id: 'sea-delta-to-byblos',
    name: 'Byblos Cedar Run',
    type: TradeRouteType.Sea,
    waypoints: ['delta-port', 'byblos'],
    travelTime: 12,
    seasonal: true,
    era: Era.Always,
    typicalCargo: [ResourceType.Wood],
    historicalNote:
      'The sea route from the Egyptian Delta to Byblos (~600 km) was among the ancient world\'s ' +
      'most important trade lanes. Egyptian "Byblos boats" (kbnt) — large, sail-powered vessels ' +
      'up to 20 m long — hugged the Levantine coast. They carried gold, grain, papyrus, and ' +
      'linen north, returning with cedar of Lebanon, olive oil, and wine. Cedar logs were often ' +
      'towed in rafts behind the ships. The journey took roughly 1-2 weeks depending on wind.',
  },
  {
    id: 'sea-wadi-jarf-to-sinai',
    name: 'Wadi al-Jarf to Sinai (Red Sea)',
    type: TradeRouteType.Sea,
    waypoints: ['wadi-al-jarf', 'sinai-mines'],
    travelTime: 8,
    seasonal: true,
    era: Era.Khufu,
    typicalCargo: [ResourceType.Copper],
    historicalNote:
      'An alternative route to the Sinai mines via the Red Sea, discovered through the ' +
      'Wadi al-Jarf papyri. Ships were assembled at the port from pre-fabricated parts stored ' +
      'in rock-cut galleries, sailed across the Gulf of Suez, and returned with copper. ' +
      'This maritime route avoided the harsh overland crossing of the Sinai.',
  },
];

// ---------------------------------------------------------------------------
// Convenience lookups
// ---------------------------------------------------------------------------

/** Look up a location by id */
export function getLocation(id: string): MapLocation | undefined {
  return MAP_LOCATIONS.find((loc) => loc.id === id);
}

/** Get all locations available in a given era (inclusive of earlier eras) */
export function getLocationsForEra(era: Era): MapLocation[] {
  const eraOrder: Era[] = [Era.Always, Era.Djoser, Era.Sneferu, Era.Khufu];
  const maxIndex = eraOrder.indexOf(era);
  return MAP_LOCATIONS.filter((loc) => eraOrder.indexOf(loc.era) <= maxIndex);
}

/** Get all locations of a given type */
export function getLocationsByType(type: MapLocationType): MapLocation[] {
  return MAP_LOCATIONS.filter((loc) => loc.type === type);
}

/** Get all locations that produce a given resource */
export function getLocationsByResource(resource: ResourceType): MapLocation[] {
  return MAP_LOCATIONS.filter((loc) => loc.resources.includes(resource));
}

/** Get all trade routes active in a given era */
export function getRoutesForEra(era: Era): TradeRoute[] {
  const eraOrder: Era[] = [Era.Always, Era.Djoser, Era.Sneferu, Era.Khufu];
  const maxIndex = eraOrder.indexOf(era);
  return TRADE_ROUTES.filter((route) => eraOrder.indexOf(route.era) <= maxIndex);
}
