# PROGRESSION MAP
## Career Stages Mapped to Geography, Timeline, and Supply Chains

This document reconciles the five career progression stages from the design doc with the 27 real historical locations and 16 trade routes defined in `src/data/world-map.ts`. For each stage it identifies active locations, available routes, supply chain topology, geographic constraints, unlock triggers, and historical reality checks.

---

## Quick Reference: Location and Route IDs

### Locations (27 total)
| ID | Name | Type | On Nile | Era | Region |
|----|------|------|---------|-----|--------|
| `buto` | Buto | city | yes | Always | delta |
| `sais` | Sais | city | yes | Always | delta |
| `bubastis` | Bubastis | city | yes | Always | delta |
| `delta-port` | Delta Sea Port | port | no | Always | delta |
| `heliopolis` | Heliopolis | religious_center | no | Always | memphis_necropolis |
| `memphis` | Memphis | city | yes | Always | memphis_necropolis |
| `giza-plateau` | Giza Plateau | construction_site | no | Khufu | memphis_necropolis |
| `giza-workers-village` | Giza Workers' Village | worker_village | no | Khufu | memphis_necropolis |
| `saqqara` | Saqqara | construction_site | no | Djoser | memphis_necropolis |
| `saqqara-workers-village` | Saqqara Workers' Settlement | worker_village | no | Djoser | memphis_necropolis |
| `abusir` | Abusir | construction_site | no | Khufu | memphis_necropolis |
| `dahshur` | Dahshur | construction_site | no | Sneferu | memphis_necropolis |
| `tura-quarry` | Tura Quarries | quarry | no | Djoser | memphis_necropolis |
| `aswan` | Aswan Granite Quarries | quarry | yes | Djoser | upper_egypt |
| `hatnub` | Hatnub Alabaster Quarries | quarry | no | Djoser | middle_egypt |
| `fayum-basalt` | Widan el-Faras Basalt Quarry | quarry | no | Djoser | western_desert |
| `fayum-farms` | Fayum Agricultural Region | farm | no | Always | western_desert |
| `meidum` | Meidum | construction_site | no | Sneferu | middle_egypt |
| `hermopolis` | Hermopolis Region | city | yes | Always | middle_egypt |
| `abydos` | Abydos | religious_center | no | Always | upper_egypt |
| `elephantine` | Elephantine Island | city | yes | Always | upper_egypt |
| `sinai-mines` | Sinai Copper & Turquoise Mines | mine | no | Djoser | sinai |
| `wadi-natrun` | Wadi Natrun | mine | no | Always | western_desert |
| `byblos` | Byblos | trade_post | no | Always | levant |
| `wadi-al-jarf` | Wadi al-Jarf | port | no | Khufu | eastern_desert |
| `delta-port` | Delta Sea Port | port | no | Always | delta |

### Trade Routes (16 total)
| ID | Name | Type | Seasonal | Era |
|----|------|------|----------|-----|
| `nile-delta-to-memphis` | Delta Grain Run | Nile | yes | Always |
| `nile-memphis-to-giza` | Memphis-Giza Supply Line | Canal | yes | Khufu |
| `nile-tura-to-giza` | Tura-Giza Casing Stone Ferry | Nile | no | Khufu |
| `nile-tura-to-saqqara` | Tura-Saqqara Casing Stone Route | Nile | no | Djoser |
| `nile-tura-to-dahshur` | Tura-Dahshur Casing Stone Route | Nile | no | Sneferu |
| `nile-aswan-to-memphis` | Aswan-Memphis Granite Run | Nile | yes | Djoser |
| `nile-memphis-to-dahshur` | Memphis-Dahshur Supply Line | Nile | no | Sneferu |
| `nile-memphis-to-meidum` | Memphis-Meidum Supply Line | Nile | no | Sneferu |
| `overland-memphis-to-sinai` | Sinai Expedition Road | Overland | yes | Djoser |
| `overland-memphis-to-wadi-natrun` | Wadi Natrun Caravan Route | Overland | no | Always |
| `overland-memphis-to-hatnub` | Hatnub Alabaster Expedition | Overland | yes | Djoser |
| `overland-fayum-basalt` | Fayum Basalt Road | Overland | no | Djoser |
| `sea-delta-to-byblos` | Byblos Cedar Run | Sea | yes | Always |
| `sea-wadi-jarf-to-sinai` | Wadi al-Jarf to Sinai (Red Sea) | Sea | yes | Khufu |

---

## Stage 1: Foreman — Mastabas (Tutorial)
**Era**: Pre-Djoser / `Era.Always` locations only
**Historical period**: Early Dynastic, before 2686 BCE
**Design goal**: One work site, one resource, manual worker assignment

### Active Locations (5)

| ID | Role in Stage |
|----|---------------|
| `saqqara` | **Construction site** — building a mastaba on the plateau edge. Note: Saqqara is coded as `Era.Djoser`, but mastabas predate Djoser here by centuries. The tutorial should grant early access to the Saqqara location specifically for mastaba construction before the Step Pyramid era begins. |
| `saqqara-workers-village` | **Worker housing** — where your small division lives and eats |
| `memphis` | **Supply hub** — source of bread, beer, grain, water, clay for mud bricks |
| `tura-quarry` | **Visible but NOT yet active** — the player can see Tura across the river but the tutorial doesn't require fine limestone. This creates desire. |
| `fayum-farms` | **Background** — the grain arriving at Memphis comes from somewhere; the Fayum and Delta are implied but not player-controlled yet |

### Active Routes (1-2)

| ID | Role |
|----|------|
| `nile-memphis-to-dahshur` | **Partially used** — the Memphis-to-Saqqara segment only (first two waypoints). Supplies flow from Memphis south to the Saqqara work site. Travel time: ~1 tick for this short segment. |

No other routes needed. The tutorial is hyper-local.

### Supply Chain Topology

```
Memphis (bread, beer, water, clay)
  |
  | ~5 km overland or short barge hop
  v
Saqqara Workers' Village (consumption: food/water)
  |
  | ~2 km overland
  v
Saqqara Plateau (construction: mud bricks from local clay + Nile mud)
```

**Primary resource**: Mud/clay from the Nile floodplain near Memphis and Saqqara. Mud bricks are made on-site from Nile mud + straw.

**Bottleneck**: Worker stamina. With only one resource type and a short supply chain, the constraint is how hard you push your division — food, water, rest cycles.

### Geographic Constraints

- **Distance**: Memphis to Saqqara is ~20 km along the Nile, ~15 km overland. The workers' village is only 3 km from the Nile, making supply straightforward.
- **Transport**: Overland only for mud bricks (too short for barges to matter). The player doesn't interact with the Nile as transport infrastructure yet — it's just the source of water and mud.
- **Flood season**: Akhet floods the low-lying areas near Saqqara workers' village. Mud collection is easy (material everywhere) but the construction site on the plateau stays dry. The tutorial should introduce the flood cycle as a rhythm — "work hard in Akhet when the farmers supplement your labor; slow down in Shemu when it's hot" — without punishing the player.

### New Locations That Unlock on Completion

Completing Stage 1 (building the mastaba) promotes the player to Overseer and unlocks the **Djoser era**:
- `saqqara` transitions from mastaba site to Step Pyramid site
- `tura-quarry` becomes active (fine limestone now needed)
- `aswan` becomes visible on the map (granite — foreshadowing)
- `sinai-mines` becomes visible (copper tools — foreshadowing)

### Reality Check

| Bend | Justification | Verdict |
|------|---------------|---------|
| Saqqara used for the tutorial mastaba even though its era is `Djoser` | Mastabas were built at Saqqara for centuries before Djoser. The location is historically correct for mastaba construction. | **Good bend** — align the data by adding a `tutorial` sub-state for Saqqara, or simply allow `construction_site` locations to host different building types across eras. |
| Only one location in play | Historically, mastabas were built all over Egypt. Constraining to Saqqara is a gameplay decision. | **Good bend** — keeps the tutorial focused. The player doesn't need to see the full map yet. |
| No fine limestone or copper tools | Mastabas used rough stone and mud brick. Copper tools existed but weren't critical for mud brick construction. | **Historically accurate** — no bend needed. |

---

## Stage 2: Overseer — Step Pyramid at Saqqara (Djoser/Imhotep)
**Era**: `Era.Djoser` (~2686-2613 BCE)
**Design goal**: Multiple work sites, supply chain between them, introducing the Nile as transport

### Active Locations (11)

| ID | Role in Stage |
|----|---------------|
| `saqqara` | **Primary construction site** — the Step Pyramid |
| `saqqara-workers-village` | **Worker housing** — expanded from tutorial |
| `memphis` | **Administrative hub and food processing** — bread, beer, grain distribution |
| `tura-quarry` | **NEW — Fine limestone quarry** — casing stones for the Step Pyramid |
| `buto` | **Grain source** — Delta surplus feeds the workforce |
| `sais` | **Grain + papyrus source** — papyrus enables bureaucracy (automation unlocks) |
| `bubastis` | **Eastern Delta staging** — grain, and the gateway toward Sinai (visible, not yet critical) |
| `heliopolis` | **Religious legitimacy** — theological backing for the pyramid project; papyrus source |
| `fayum-farms` | **Grain + rope grass** — supplementary food and raw material for rope |
| `aswan` | **NEW — Granite quarry** — small amounts of granite for Djoser's burial chamber |
| `sinai-mines` | **NEW — Copper source** — copper tools now essential for cutting limestone |

### Active Routes (7)

| ID | Role | Seasonal? |
|----|------|-----------|
| `nile-delta-to-memphis` | Grain from the Delta to Memphis | **Yes** — flood season boosts capacity; this is the player's first encounter with seasonal throughput variation |
| `nile-tura-to-saqqara` | **Critical path** — casing stone from Tura to Saqqara | No — year-round, but overland haul from river to plateau adds labor cost |
| `nile-aswan-to-memphis` | Granite from Aswan | **Yes** — flood season only for the heavy loads; 14 ticks travel time is enormous; player must plan far ahead |
| `nile-memphis-to-dahshur` | Memphis to Saqqara segment for supplies | No — short hop |
| `overland-memphis-to-sinai` | Copper expedition to Sinai | **Yes** — winter/spring only; 20 ticks round trip |
| `overland-memphis-to-wadi-natrun` | Natron from Wadi Natrun | No |
| `overland-fayum-basalt` | Basalt from Fayum (for mortuary temple pavement) | No |

### Supply Chain Topology

```
FOOD WEB:
  Buto/Sais/Bubastis (grain, papyrus)
    |
    | nile-delta-to-memphis [seasonal, 4 ticks]
    v
  Memphis (processes grain -> bread + beer)
    |
    | short Nile hop [~1 tick]
    v
  Saqqara Workers' Village (consumption)


STONE WEB:
  Tura Quarry (limestone, dressed stone)
    |
    | nile-tura-to-saqqara [2 ticks, year-round]
    v
  Saqqara (construction)

  Aswan (granite) --[14 ticks, seasonal]--> Memphis --[1 tick]--> Saqqara
    (granite for burial chamber — small quantities but LONG lead time)

  Fayum Basalt --[overland, 3 ticks]--> Fayum Farms --[Nile]--> Memphis --> Saqqara
    (basalt for mortuary temple — secondary priority)


TOOLS WEB:
  Sinai Mines (copper ore)
    |
    | overland-memphis-to-sinai [20 ticks, seasonal]
    v
  Memphis (smelting -> copper tools)
    |
    v
  Tura Quarry (tool consumption — chisels wear out)
  Saqqara (tool consumption — dressing stone)
```

**Bottleneck**: **Copper tools**. The Sinai expedition takes 20 ticks round-trip and is seasonal. Copper tools wear out at the quarry. If the player doesn't plan Sinai expeditions well in advance, Tura production stalls because chisels are blunt and there's no copper to replace them. This is the stage's central logistics puzzle.

**Secondary bottleneck**: The Aswan granite run (14 ticks, seasonal). The player needs only a small amount of granite for Djoser's chambers, but it must be ordered far in advance. This teaches long-lead-time planning that pays off in later stages.

### Geographic Constraints

- **Tura to Saqqara**: ~20 km by river (east bank to west bank + south). Blocks ferry across the Nile, then haul ~5 km overland from the river landing to the plateau. The overland segment is the labor-intensive part.
- **Aswan to Memphis**: 850 km downstream. The current helps (downstream = north), but the sheer distance means 2-3 week transit. Only viable during high Nile (Akhet) for the heaviest blocks.
- **Sinai**: 350 km overland through desert. Expeditions are major logistical undertakings — hundreds of donkeys, military escorts, water supplies. Not a routine supply chain; more like a seasonal expedition that returns with a year's worth of copper.
- **Flood season dynamics**: During Akhet, the Nile reaches closer to the Saqqara plateau, reducing the overland haul distance for stone. BUT the low-lying workers' village may flood. The player must manage this tension — peak transport capacity coincides with housing disruption.

### New Locations That Unlock on Completion

Completing Stage 2 (sustaining supply for 3 flood cycles) promotes the player to Governor and unlocks the **Sneferu era**:
- `meidum` — Sneferu's first pyramid site
- `dahshur` — Sneferu's second and third pyramid site
- Routes: `nile-tura-to-dahshur`, `nile-memphis-to-dahshur`, `nile-memphis-to-meidum`

### Reality Check

| Bend | Justification | Verdict |
|------|---------------|---------|
| Aswan granite available in Djoser era | Historically accurate — Djoser's Step Pyramid does contain granite elements, and Aswan was quarried from the Early Dynastic period. | **No bend** — this is real. |
| Sinai copper in Djoser era | Historically confirmed — Djoser reliefs at Wadi Maghara. | **No bend** |
| Fayum basalt for Djoser | The Fayum basalt road dates to the Old Kingdom, but whether it was used specifically for Djoser's complex is uncertain. Basalt pavements are confirmed for Khufu's mortuary temple. | **Minor bend** — could restrict `fayum-basalt` to `Era.Sneferu` or `Era.Khufu` for stricter historicity, but keeping it available as an optional luxury resource is fine for gameplay. |
| All Delta cities active simultaneously | The player doesn't govern the Delta yet — these cities are background grain sources. They become meaningful in Stage 3+. | **No bend** — they're just suppliers on the `nile-delta-to-memphis` route. |

---

## Stage 3: Governor — Sneferu's Failures (Meidum & Bent Pyramid)
**Era**: `Era.Sneferu` (~2613-2589 BCE)
**Design goal**: Regional management, multiple construction sites, dramatic failure events

### Active Locations (16)

All Stage 2 locations plus:

| ID | Role in Stage |
|----|---------------|
| `meidum` | **Act 1 construction site** — converting a step pyramid to a true pyramid |
| `dahshur` | **Act 2 construction site** — Bent Pyramid, then Red Pyramid prep |
| `wadi-natrun` | **Natron supply** — relevant for mortar/gypsum needs at scale. **If hybrid casting is discovered**: becomes the feedstock source for casting operations. Small-scale natron orders begin here for the Stage 3 casting experiment. |
| `fayum-basalt` | **Basalt quarry** — temple pavements at Dahshur |
| `fayum-farms` | **Elevated importance** — feeding workers at TWO distant construction sites simultaneously |
| `hermopolis` | **Middle Egypt waypoint** — grain collection hub for sites south of Memphis |

### Active Routes (12)

All Stage 2 routes plus:

| ID | Role | Seasonal? |
|----|------|-----------|
| `nile-tura-to-dahshur` | **Critical** — fine casing stone to Dahshur | No |
| `nile-memphis-to-dahshur` | Food and tools to Dahshur | No |
| `nile-memphis-to-meidum` | Food and tools to Meidum (65 km south of Memphis) | No |
| `overland-memphis-to-hatnub` | Alabaster for sarcophagi and ritual objects | Yes — seasonal expedition |
| `overland-fayum-basalt` | Basalt for temple floors | No |

### Supply Chain Topology

```
ACT 1 — MEIDUM:
                                   Tura (limestone)
                                     |
                                     | nile-tura-to-dahshur [2 ticks]
                                     | (passes Dahshur to reach Meidum)
                                     v
  Memphis (food, tools) --[4 ticks]--> Meidum (construction)
                                     ^
                                     |
                         Fayum Farms (supplementary grain)
                         [overland ~30 km to Nile, then barge]

  THE COLLAPSE EVENT:
  When Meidum's casing fails, the player must:
  1. Salvage usable blocks from the debris
  2. Redirect Tura supply chain (cancel or reroute shipments in transit)
  3. Manage worker morale crisis
  4. Decide: abandon Meidum or attempt repairs?


ACT 2 — DAHSHUR (BENT PYRAMID):
  Same supply web, but destination shifts 50 km north to Dahshur.

  Tura (casing) --[2 ticks]--> Dahshur
  Memphis (food, tools) --[2 ticks]--> Dahshur
  Aswan (granite) --[14 ticks, seasonal]--> Memphis --> Dahshur
  Local Dahshur quarry (bulk limestone from plateau itself)

  THE ANGLE CHANGE EVENT:
  When the Bent Pyramid must change from 54 to 43 degrees:
  1. Block dimensions change — quarry orders must be updated
  2. Ramp geometry changes — existing ramp infrastructure partially wasted
  3. Throughput requirement drops (less volume needed at shallower angle)
  4. BUT existing pipeline has blocks of the wrong size in transit
  5. Worker retraining: different cutting specs

  THE FLOOD DISCOVERY EVENT (after angle change, next Akhet):
  Workers returning to the Dahshur quarry find hardened crusts where
  quarry dust was pooled with floodwater. If the player investigates:
  1. Small research crew (~20 workers, 1 season)
  2. Deliberately mixes quarry dust + natron + water in controlled batches
  3. Produces test blocks → hybrid casting unlocked as composable technique
  4. Wadi Natrun route importance elevates from "mortar ingredient" to
     "casting feedstock source" (small scale at first)
```

**Primary bottleneck**: **Simultaneous site management**. The player must keep Meidum supplied while also preparing Dahshur. After Meidum fails, the resource pivot to Dahshur must be fast — but there are barges in transit, quarry orders already cut, workers stationed at the wrong site. The logistics of CHANGING PLANS is the challenge.

**Secondary bottleneck**: **Copper tool supply**. Two active quarry sites (Tura for casing + local quarries at each site) consume tools faster than one. The 20-tick Sinai round trip becomes a serious constraint.

**Tertiary bottleneck**: **Distance to Meidum**. At 65 km south of Memphis (4 ticks by Nile), Meidum is the player's first experience with a construction site that's NOT adjacent to the capital. Supply delays are real. Spoilage of bread/beer becomes a concern.

### Geographic Constraints

- **Meidum is far**: 65 km south of Memphis. The `nile-memphis-to-meidum` route passes through Saqqara and Dahshur (4 ticks). This is significantly longer than the Saqqara supply chain from Stage 2. Food preservation matters.
- **Dahshur is moderate**: 35 km south of Memphis (2 ticks). Closer than Meidum, which is one reason Sneferu preferred it for his second attempt.
- **Tura serves both sites**: Tura quarry (east bank) must now split output between Dahshur and potentially Meidum. The `nile-tura-to-dahshur` route (2 ticks) is manageable, but adding Meidum requires routing further south — there's no direct `nile-tura-to-meidum` route in the data.
- **Suggestion**: Add a `nile-tura-to-meidum` route (travel time ~3 ticks, non-seasonal, `Era.Sneferu`), or let the player compose it from existing segments: Tura -> Dahshur reach -> Meidum reach. The current `nile-memphis-to-meidum` route passes through Saqqara and Dahshur, so Tura stone could theoretically join at the Dahshur waypoint.
- **Fayum farms to Meidum**: The Fayum is geographically close to Meidum (~40 km west). There's no direct route in the data. Consider adding an overland or canal route `fayum-farms-to-meidum` to reflect the geographical reality that Fayum grain was likely used to feed Meidum workers, bypassing the Memphis bottleneck.

### New Locations That Unlock on Completion

Completing Stage 3 (surviving both failures, delivering a completed Bent Pyramid at Dahshur) promotes the player to Vizier and unlocks:
- Dahshur remains active for the **Red Pyramid** (Stage 4, Act 1)
- `giza-plateau` becomes visible (foreshadowing)
- `giza-workers-village` becomes visible
- Theory B (Internal Spiral Ramp) and Theory C (Hydraulic) become available choices

### Reality Check

| Bend | Justification | Verdict |
|------|---------------|---------|
| Meidum collapse is scripted as a gameplay event | Whether Meidum collapsed during or after construction is debated. The game treats it as during. | **Acceptable bend** — the drama serves the "failure is data" design pillar. Note it in the encyclopedia. |
| Bent Pyramid angle change is presented as a crisis | Historically, the angle change may have been planned more gradually. The game compresses it into a crisis moment. | **Good bend** — teaches the player about mid-build adaptation. The historical uncertainty gives creative license. |
| Player manages Meidum and Dahshur simultaneously | Historically, Meidum was likely abandoned before Dahshur began (or they slightly overlapped). The game compresses the timeline. | **Worth it for gameplay** — managing the transition between sites is the core challenge. |
| No direct Tura-to-Meidum route | Geographically, stone would have been barged south along the Nile to Meidum. The current route data requires routing through Memphis. | **Data gap** — add a `nile-tura-to-meidum` route or allow route composition. |

---

## Stage 4: Vizier — Red Pyramid & the Path to Giza
**Era**: Late `Era.Sneferu` transitioning to `Era.Khufu` (~2590-2570 BCE)
**Design goal**: Kingdom-wide scope, theory selection, preparing for the Great Pyramid

### Active Locations (20)

All Stage 3 locations plus:

| ID | Role in Stage |
|----|---------------|
| `dahshur` | **Red Pyramid construction** — Sneferu's successful third pyramid |
| `giza-plateau` | **NEW — Survey and preparation** — unlocked late in the stage for Khufu's project planning |
| `giza-workers-village` | **NEW — Under construction** — building the infrastructure for Stage 5 |
| `abusir` | **NEW — Visible** — the necropolis between Giza and Saqqara; potential secondary site |
| `abydos` | **Grain hub for Upper Egypt** — now relevant as the player manages kingdom-wide food distribution |
| `elephantine` | **Aswan administration** — the player can now appoint a governor here to manage granite expeditions directly |
| `delta-port` | **NEW — Active** — cedar imports from Byblos become critical for large-scale barge construction |
| `byblos` | **NEW — Active** — timber trade partner |

### Active Routes (16 — all routes now available)

New routes activated:

| ID | Role | Seasonal? |
|----|------|-----------|
| `nile-memphis-to-giza` | **Late stage** — canal construction begins for Khufu's project | Yes |
| `nile-tura-to-giza` | **Late stage** — surveying the Tura-to-Giza casing stone route | No |
| `sea-delta-to-byblos` | **NEW — Critical** — cedar of Lebanon for large barge construction | Yes — sailing season |
| `sea-wadi-jarf-to-sinai` | **NEW — Alternative copper route** via Red Sea | Yes |

### Supply Chain Topology

```
RED PYRAMID PHASE (first half of stage):
  Same as Dahshur supply web from Stage 3, but OPTIMIZED.
  The player applies lessons from the Bent Pyramid:
  - Conservative 43-degree angle = predictable block dimensions
  - Established Tura-Dahshur route runs smoothly
  - Worker infrastructure already in place

  Key addition: THEORY SELECTION + HYBRID CASTING SCALE-UP
  ┌─────────────────────────────────────────────────────┐
  │ Theory B (Internal Ramp):                           │
  │   Requires: more skilled masons, fewer bulk haulers │
  │   Supply: precision-cut blocks, trained specialists │
  │   Bottleneck: skilled labor training pipeline       │
  │                                                     │
  │ Theory C (Hydraulic):                               │
  │   Requires: canal infrastructure, water management  │
  │   Supply: massive water infrastructure investment   │
  │   Bottleneck: seasonal water availability           │
  │                                                     │
  │ Theory A (External Ramp — carry-over):              │
  │   Requires: enormous fill material volumes          │
  │   The player proved this works at 43 degrees        │
  │   but must solve the Giza-scale problem themselves  │
  │                                                     │
  │ HYBRID CASTING (composable, any quarry-based theory)│
  │   If discovered Stage 3 or researched here:         │
  │   Casting fraction slider (0-35%) for block mix     │
  │   Pounding pit at Dahshur quarry (year-round)       │
  │   Wadi Natrun route elevates to ACTIVE supply chain │
  │   ~140 donkey-loads/day natron at 25% casting       │
  │   Seasonal rhythm: pound dry, cast during flood     │
  └─────────────────────────────────────────────────────┘


GIZA PREPARATION PHASE (second half of stage):
  Memphis (central hub)
    |
    ├──> Giza Plateau: survey, foundation prep, canal digging
    ├──> Giza Workers' Village: bakeries, breweries, barracks
    ├──> Tura Quarry: stockpiling casing stone
    |
  Byblos (cedar) --[sea, 12 ticks]--> Delta Port --[Nile]--> Memphis
    |
    v
  Barge construction (wood -> barges at Memphis shipyard)
    The Great Pyramid will require a FLEET of barges.
    Building that fleet requires imported cedar.
    Cedar import requires sea-going ships.
    This is a nested supply chain: wood -> ships -> more wood -> barges -> stone delivery.
```

**Primary bottleneck**: **Barge fleet construction**. The Great Pyramid will need sustained stone delivery at unprecedented scale. The player must begin building barges NOW, which requires cedar from Byblos (12-tick seasonal sea route). If they wait until Stage 5 to build the fleet, they'll lose years.

**Secondary bottleneck**: **Theory-dependent infrastructure**. Each theory requires different preparation:
- Theory B: training pipeline for skilled masons (takes years)
- Theory C: canal construction at Giza (massive labor investment during preparation phase)
- Theory A: stockpiling fill material (straightforward but enormous volume)
- Theory E: understanding the cascading build pattern (intellectual unlock, but requires the player to plan all three Giza pyramids simultaneously)

**Tertiary bottleneck (if hybrid casting active)**: **Wadi Natrun supply chain scale-up**. At the Red Pyramid's scale with a 10-15% casting fraction, natron demand is modest (~4-5 tons/day, ~60-70 donkey-loads). But the player must establish the route infrastructure NOW that will support 25%+ casting at Giza: water stations along the 100km desert route, donkey breeding/acquisition, stockpile buffers at both ends. The `overland-memphis-to-wadi-natrun` route transitions from "occasional mortar ingredient" to "dedicated supply chain" during this stage.

### Geographic Constraints

- **Giza is close to Memphis**: Only ~10 km north of Memphis, 8 km from the Nile. The `nile-memphis-to-giza` canal (1 tick, seasonal) is the shortest construction supply route in the game. This is historically accurate and gameplay-significant: Khufu chose Giza partly BECAUSE of the excellent logistics position.
- **Tura to Giza**: A direct ~15 km ferry crossing (1 tick, year-round). Merer's papyrus records multiple daily round trips. This is the tightest, most efficient supply chain in the game — a reward for reaching this stage.
- **Byblos**: 600 km by sea. The 12-tick seasonal route means cedar orders placed in one year may not arrive until the next. Long-term planning essential.
- **Wadi al-Jarf**: 180 km from the Nile into the Eastern Desert. The Red Sea port offers an alternative copper route that bypasses the overland Sinai crossing. The player can choose between the 20-tick overland route and the 8-tick sea route (but must first establish the port).

### New Locations That Unlock on Completion

Completing Stage 4 (Red Pyramid complete, Giza preparation underway) promotes the player to Pharaoh:
- Full access to `giza-plateau` for construction
- `giza-workers-village` operational
- `abusir` available (post-game / 5th Dynasty content?)
- All routes fully active
- The Giza complex construction begins

### Reality Check

| Bend | Justification | Verdict |
|------|---------------|---------|
| Red Pyramid at Dahshur uses Theory B or C | Historically, we don't know how the Red Pyramid was built. Any theory is speculative. | **Fine** — the uncertainty is the game's creative space. |
| Wadi al-Jarf unlocks here (Khufu era) | The Merer Papyri date to Khufu's reign, which is late Stage 4 / Stage 5. Unlocking it here as preparation is slightly early. | **Minor bend** — could restrict to Stage 5 only, but allowing it in late Stage 4 as the Khufu transition begins makes gameplay sense. |
| Byblos trade starting in Stage 4 | Cedar trade with Byblos existed from the Early Dynastic period. Making it gameplay-relevant only now is a simplification. | **Acceptable** — earlier stages didn't need large timber. The mechanical need (barge fleet) drives the unlock. Cedar was always theoretically available via `Era.Always` on the route. |
| All 16 routes active | By Stage 4, all data in `world-map.ts` is in play. | **Good** — the full complexity of the kingdom unfolds as the player's scope expands. |

---

## Stage 5: Pharaoh — The Giza Complex (Khufu/Khafre/Menkaure)
**Era**: `Era.Khufu` (~2589-2503 BCE, spanning three reigns)
**Design goal**: Dynastic scale, the full kingdom as one integrated supply web, legacy systems

### Active Locations (All 27)

Every location in `world-map.ts` is now active. The player governs the entire kingdom.

Key location roles:

| ID | Role in Stage |
|----|---------------|
| `giza-plateau` | **THE construction site** — Great Pyramid, then Khafre, then Menkaure, temples, causeways, the Sphinx |
| `giza-workers-village` | **Workforce hub** — 20,000-30,000 workers fed daily |
| `tura-quarry` | **Casing stone factory** — 67,000-115,000 fine white blocks over 20 years |
| `memphis` | **Capital and logistics nerve center** |
| `aswan` | **Granite for the King's Chamber** — 9 slabs up to 80 tons each, plus sarcophagi |
| `byblos` | **Cedar supply** — roofing beams for relieving chambers, barge maintenance |
| `sinai-mines` | **Copper pipeline** — thousands of chisels consumed per year |
| `elephantine` | **Southern frontier governor** — manages Aswan quarry operations and Nubian trade |
| `abydos` | **Grain and political loyalty** — Upper Egyptian surplus and religious legitimacy |
| `hermopolis` | **Middle Egypt grain relay** — waypoint on the Aswan-Memphis route |
| `wadi-al-jarf` | **Red Sea logistics hub** — alternative Sinai copper route |
| `hatnub` | **Alabaster** — for the sarcophagus and ritual objects |
| `wadi-natrun` | **Natron supply** — mortar ingredient for all theories. **With hybrid casting (D+E blend)**: becomes a **critical** supply node. At 25% casting fraction, ~8-10 tons/day of natron, ~140 donkey-loads daily, ~500-800 donkeys continuously in transit on the 100km route. The `overland-memphis-to-wadi-natrun` route transitions from secondary to primary logistics commitment. |
| `fayum-farms` | **Bread basket** — grain for the massive workforce |
| `fayum-basalt` | **Basalt** — mortuary temple pavement |

### Active Routes (All 16)

Every route in `world-map.ts` is active. Key flows:

**High-volume, continuous routes** (the arteries):
- `nile-tura-to-giza` — casing stone, year-round, multiple daily trips
- `nile-memphis-to-giza` — food, tools, workers; seasonal canal but critical
- `nile-delta-to-memphis` — grain from the Delta; seasonal

**High-value, long-distance routes** (the veins):
- `nile-aswan-to-memphis` — granite; seasonal, 14 ticks, requires advance planning measured in years
- `sea-delta-to-byblos` — cedar; seasonal, 12 ticks
- `overland-memphis-to-sinai` — copper; seasonal, 20 ticks

**Seasonal restriction summary**:
| Season | Effect on Routes |
|--------|-----------------|
| **Akhet (Flood)** | Nile routes at peak capacity. Canal to Giza navigable. Granite barges from Aswan arrive. Delta grain shipments surge. BUT quarrying slows in flooded areas. |
| **Peret (Growing)** | Nile normalizes. Canal may be too shallow for heavy loads. Quarrying resumes at full capacity. Sinai expeditions depart. Byblos ships sail. |
| **Shemu (Harvest)** | Labor scarce (harvest). Heat reduces worker efficiency. Stockpile for next flood. Byblos return shipments arrive. Sinai expeditions return. |

### Supply Chain Topology — Theory E (Canonical Path)

```
PHASE 1: GREAT PYRAMID BUILD-UP (Years 1-15)

  Delta (grain) ──────────────────────> Memphis ──> Giza Workers' Village
  Fayum (grain) ─────────────────────/     |
  Byblos (cedar) ──> Delta Port ───/       |
                                           v
  Tura (fine limestone) ──────────────> GIZA PLATEAU
  Giza local quarry (bulk limestone) ──/   (Great Pyramid — overbuilt as
  Aswan (granite) ──> Memphis ────────/     massive stepped trapezoid)
  Sinai (copper) ──> Memphis (tools) ──> Tura + Giza


PHASE 2: GREAT PYRAMID CARVE-DOWN + KHAFRE BUILD-UP (Years 12-22)

  GIZA PLATEAU:
  ┌──────────────────────────────────────────────────────┐
  │  Great Pyramid (carving down to final form)          │
  │    |                                                  │
  │    | carved excess material (~cascading output)       │
  │    v                                                  │
  │  Khafre site (receiving material + fresh quarry stone)│
  │    |                                                  │
  │    | Khafre also overbuilt as trapezoid               │
  │    v                                                  │
  │  (stored for Phase 3)                                │
  └──────────────────────────────────────────────────────┘

  External supply continues but at REDUCED rate:
  - Tura: casing stone for Khafre (reduced — some from Great Pyramid carve-down)
  - Aswan: granite for Khafre's valley temple
  - Food supply must SUSTAIN — workforce transitions from haulers to precision cutters

  HYBRID CASTING LAYER (D+E blend, if active):
  ┌──────────────────────────────────────────────────────┐
  │  Quarry waste (dust, chips, rubble from Giza quarry) │
  │    |                                                  │
  │    v                                                  │
  │  Pounding pits (year-round, animal-powered)          │
  │    |                                                  │
  │    v                                                  │
  │  Aggregate stockpile (dry months → build up)         │
  │    |                                                  │
  │    + Natron (Wadi Natrun, 100km, ~140 loads/day)     │
  │    + Kaolinite clay (Nile floodplain, local)         │
  │    + Water (flood season, Nile → plateau)            │
  │    |                                                  │
  │    v                                                  │
  │  Mixing stations on overbuild working face           │
  │    |                                                  │
  │    v                                                  │
  │  Cast blocks (0-35% of overbuild, player-controlled) │
  │                                                      │
  │  QUALITY PROPAGATION:                                │
  │  Cast overbuild → carve-down → cascade to Khafre    │
  │  → reconstituted material, easier to recast          │
  │  → but quality degrades with each generation         │
  │  → casting fraction at Khufu constrains Khafre opts  │
  └──────────────────────────────────────────────────────┘


PHASE 3: KHAFRE CARVE-DOWN + MENKAURE + TEMPLES (Years 20-30+)

  ┌──────────────────────────────────────────────────────┐
  │  Khafre (carving down)                               │
  │    |                                                  │
  │    | excess material                                  │
  │    v                                                  │
  │  Menkaure site (smaller pyramid)                     │
  │    |                                                  │
  │    | excess material                                  │
  │    v                                                  │
  │  Temples, causeways, enclosure walls                 │
  │    |                                                  │
  │    v                                                  │
  │  (Total quarried = total complex. No waste.)         │
  └──────────────────────────────────────────────────────┘

  External supply TAPERS:
  - Tura: minimal (casing for Menkaure + temples)
  - Aswan: minimal (Menkaure's granite elements)
  - Food: sustained but workforce SHRINKS as the project approaches completion
```

**Primary bottleneck (Theory E)**: **Downstream absorption / backpressure**. When the Great Pyramid carve-down begins, it generates a flood of material. If Khafre's construction site isn't ready to receive, material piles up with nowhere to go. The player must coordinate the TIMING of carve-down initiation with downstream readiness. This is the Theory E endgame puzzle.

**Secondary bottleneck**: **Workforce phase transition**. Build-up requires bulk haulers (20,000+). Carve-down requires precision masons (fewer but more skilled). The transition between phases is a workforce retooling event spanning years. Workers must be retrained, or new specialists recruited, while the hauler workforce is gradually released back to farming.

**Tertiary bottleneck**: **Generational continuity**. The project spans three pharaohs' reigns (Khufu -> Khafre -> Menkaure). Leadership transitions mean policy changes, funding uncertainty, and potential priority shifts. The player's automation and governance systems must survive these transitions.

### Geographic Constraints

- **Giza's logistics advantage**: 8 km from the Nile, 15 km from Tura, ~10 km from Memphis. The tightest supply triangle in the game. This is NOT an accident — Khufu chose this site for logistics reasons. The game should make the player feel this advantage after struggling with the Meidum distance in Stage 3.
- **The Great Pyramid's local quarry**: The Giza plateau bedrock provided ~95% of the bulk limestone. Only casing stone came from Tura. This means the vast majority of stone transport is measured in HUNDREDS OF METERS, not kilometers. The bottleneck is vertical, not horizontal.
- **Aswan granite at Giza scale**: Khufu's King's Chamber needs 9 granite slabs weighing 25-80 tons each, transported 850 km. These are the largest, heaviest objects ever moved in the ancient world. Each slab is a solo project — a single barge, a single journey, with catastrophic consequences if it sinks. The 14-tick travel time per slab means the player must begin ordering granite in Year 1 for chambers that won't be built until Year 10+.
- **Flood season as construction season**: During Akhet, farmers become available as laborers (corvee labor). The canal to Giza fills, allowing barge delivery right to the plateau base. This 4-month window is when the most stone moves. The other 8 months focus on quarrying, processing, and stockpiling.

### Reality Check

| Bend | Justification | Verdict |
|------|---------------|---------|
| Theory E as canonical path | Theory E (accretion overbuild) is a modern hypothesis, not proven. The game presents it as the "true" method. | **The game's core creative premise** — explicitly disclosed. Other theories are playable. The design doc is clear this is a "what if?" that makes the best gameplay. |
| Three pyramids as one continuous project | Historically, each pharaoh commissioned their own pyramid independently. The material cascade from Khufu to Khafre to Menkaure is the Theory E hypothesis. | **Core to the game's identity** — this IS the game. |
| 30-year timeline compressed | The Giza complex was built over ~60-80 years across three reigns. The game compresses this. | **Necessary for gameplay** — 80 real-time years is too long. Compress to 20-30 game-years with accelerated tick rate. |
| Player as continuous Pharaoh across three reigns | Historically, three different pharaohs. The player persists. | **Good bend** — the game is about systems that outlast individuals. The player IS the system, not any one pharaoh. Leadership transitions are events, not game-overs. |

---

## Unused Locations and Routes

### Locations with Weak Stage Assignments

| ID | Current Usage | Suggestion |
|----|---------------|------------|
| `abusir` | Listed as `Era.Khufu` but no progression stage explicitly features it | **Post-game / sandbox content**: Abusir was used by 5th Dynasty pharaohs. It could be a Stage 5 secondary site or an epilogue stage. The Abusir Papyri found there provide administrative records — could unlock a "bureaucracy efficiency" bonus if the player establishes operations there. Alternatively, use it as a **practice site** in Stage 4 where the player tests their chosen theory at smaller scale before committing to Giza. |
| `heliopolis` | Listed as active from Stage 2 but has no material supply chain role | **Religious legitimacy mechanic**: Heliopolis provides theological approval for pyramid projects. If the player neglects Heliopolis (fails to send offerings or maintain the temple), worker morale and political stability suffer. This makes Heliopolis a non-material but mechanically important node. Also a papyrus source for bureaucracy upgrades. |
| `abydos` | Listed from `Era.Always` but only becomes relevant in Stage 4-5 as a grain hub | **Stage 3 religious event**: Abydos as pilgrimage destination could create a labor drain — workers want to visit Abydos, reducing available construction labor. Managing pilgrimage leave becomes a satisfaction mechanic. |
| `wadi-natrun` | Has a route from Stage 1 (`Era.Always`). Previously weak integration. | **RESOLVED by hybrid casting**: Natron serves as mortar ingredient (small quantities, Stage 2+) and as the alkali activator for hybrid casting (large quantities, Stage 4+). With the D+E blend at Stage 5, Wadi Natrun becomes a **critical** supply node: ~8-10 tons/day at 25% casting fraction, requiring ~500-800 donkeys continuously in transit. The route transitions from optional background to dedicated supply chain across Stages 3-5, giving it a clear narrative arc. |
| `hermopolis` | Waypoint on the Aswan-Memphis granite route; passive role | **Middle Egypt governor seat in Stage 4-5**: When the player manages kingdom-wide grain collection, Hermopolis becomes the administrative hub for Middle Egyptian nomes. The player appoints a governor here. Hermopolis also controls access to `hatnub` quarries. |
| `elephantine` | Gateway to Aswan; passive in current data | **Nilometer mechanic**: Elephantine's nilometer measured the annual flood. Give the player advance flood predictions based on Elephantine readings — but only if they maintain a garrison/governor there. This creates a "pay for information" trade-off: invest resources at Elephantine for better seasonal planning. |

### Routes with Weak Stage Assignments

| ID | Issue | Suggestion |
|----|-------|------------|
| `overland-memphis-to-wadi-natrun` | **RESOLVED by hybrid casting**: Now has a clear progression arc. Optional in Stage 2 (mortar), active in Stage 3 (casting discovery), elevated in Stage 4 (casting scale-up), **critical** in Stage 5 (D+E blend at Giza scale). See Wadi Natrun location entry above. | -- |
| `overland-fayum-basalt` | Available from `Era.Djoser` but basalt is a luxury material | Make basalt pavement a contract bonus objective: "Complete the mortuary temple with basalt flooring for +reputation." |
| `overland-memphis-to-hatnub` | Available from `Era.Djoser` but alabaster use is minor | Alabaster sarcophagus as a required contract deliverable in Stage 3+ (Sneferu's burial goods). |

### Missing Routes (Gaps in the Data)

| Suggested Route | Justification |
|-----------------|---------------|
| `nile-tura-to-meidum` | Tura casing stone was used at Meidum. Currently no direct route; stone must route through Memphis. Add as `Era.Sneferu`, 3 ticks, non-seasonal. |
| `nile-fayum-to-meidum` or `overland-fayum-to-meidum` | Fayum grain to feed Meidum workers. Geographically close (~40 km) but no route exists. Add as `Era.Sneferu`. |
| `nile-delta-to-giza` (direct) | During the inundation, Delta barges could sail directly to the Giza harbor basin without stopping at Memphis. This would be a seasonal shortcut route. Consider as a Stage 5 optimization the player can discover. |
| `overland-giza-to-tura` (short ferry alternative) | During low Nile, barges from Tura might not reach the Giza canal. An overland backup route (~15 km) via the riverbank could serve as a low-water fallback. |

---

## Summary: Stage-by-Location Matrix

| Location | S0 | S1 | S2 | S3 | S4 | S5 |
|----------|----|----|----|----|----|----|
| `memphis` | implied | active | active | active | active | active |
| `saqqara` | -- | active | **primary** | background | background | background |
| `saqqara-workers-village` | -- | active | active | background | background | background |
| `tura-quarry` | -- | visible | **active** | active | active | **critical** |
| `buto` | -- | -- | active | active | active | active |
| `sais` | -- | -- | active | active | active | active |
| `bubastis` | -- | -- | active | active | active | active |
| `heliopolis` | -- | -- | active | active | active | active |
| `fayum-farms` | -- | implied | active | **elevated** | active | active |
| `aswan` | -- | -- | active | active | active | **critical** |
| `sinai-mines` | -- | -- | active | active | active | **critical** |
| `wadi-natrun` | -- | -- | optional | active/discovery | active | **critical** (D+E blend) |
| `fayum-basalt` | -- | -- | optional | active | active | active |
| `hatnub` | -- | -- | -- | optional | active | active |
| `hermopolis` | -- | -- | -- | active | active | active |
| `meidum` | -- | -- | -- | **primary** | background | background |
| `dahshur` | -- | -- | -- | **primary** | **primary** | background |
| `abydos` | -- | -- | -- | -- | active | active |
| `elephantine` | -- | -- | -- | -- | active | active |
| `delta-port` | -- | -- | -- | -- | **active** | active |
| `byblos` | -- | -- | -- | -- | **active** | **critical** |
| `giza-plateau` | -- | -- | -- | -- | preparation | **PRIMARY** |
| `giza-workers-village` | -- | -- | -- | -- | building | **active** |
| `abusir` | -- | -- | -- | -- | visible | optional |
| `wadi-al-jarf` | -- | -- | -- | -- | active | active |

**Legend**: `--` = not yet visible, `visible` = on map but not interactive, `optional` = available but not required, `active` = in play, `**primary**` = main construction focus, `**critical**` = essential supply node, `**PRIMARY**` = THE endgame site

---

## Summary: Stage-by-Route Matrix

| Route | S0 | S1 | S2 | S3 | S4 | S5 |
|-------|----|----|----|----|----|----|
| `nile-delta-to-memphis` | -- | -- | active | active | active | **critical** |
| `nile-tura-to-saqqara` | -- | -- | **critical** | background | background | -- |
| `nile-aswan-to-memphis` | -- | -- | active | active | active | **critical** |
| `nile-memphis-to-dahshur` | -- | partial | -- | **critical** | **critical** | background |
| `nile-memphis-to-meidum` | -- | -- | -- | **critical** | background | -- |
| `nile-tura-to-meidum` | -- | -- | -- | **active** | -- | -- |
| `nile-fayum-to-meidum` | -- | -- | -- | **active** | -- | -- |
| `nile-meidum-to-dahshur` | -- | -- | -- | **active** | background | -- |
| `nile-tura-to-dahshur` | -- | -- | -- | **critical** | **critical** | background |
| `overland-memphis-to-sinai` | -- | -- | active | active | active | **critical** |
| `overland-memphis-to-wadi-natrun` | -- | -- | optional | active/discovery | **active** | **CRITICAL** (D+E blend) |
| `overland-fayum-basalt` | -- | -- | optional | active | active | active |
| `overland-memphis-to-hatnub` | -- | -- | -- | optional | active | active |
| `sea-delta-to-byblos` | -- | -- | -- | -- | **active** | **critical** |
| `nile-memphis-to-giza` | -- | -- | -- | -- | preparation | **CRITICAL** |
| `nile-tura-to-giza` | -- | -- | -- | -- | preparation | **CRITICAL** |
| `sea-wadi-jarf-to-sinai` | -- | -- | -- | -- | active | active |

---

## Design Recommendations

1. ~~**Add missing routes**~~ — **RESOLVED.** Committed to `world-map.ts`: `nile-tura-to-meidum` (3 ticks), `nile-fayum-to-meidum` (2 ticks), `nile-meidum-to-dahshur` (2 ticks). All three routes are now in the data.

2. **Pre-construction tutorial stages** — **REVISED (was: Saqqara era adjustment).** The mastaba should NOT be the first tutorial. Following the model of Pharaoh and Children of the Nile, several pre-dynastic tutorial levels should teach basic systems (resource gathering, Nile flood cycle, feeding workers, simple overland transport) before any monumental construction begins. The mastaba becomes the culmination of the tutorial arc or the start of Act 2 — the player's first real "build something" moment, earned after mastering fundamentals. This also resolves the original Saqqara era concern: tutorials are set in a generic village context near Memphis and do not require Saqqara access. See PROGRESSION.md Stage 0 (Tutorial) for the detailed tutorial stage design.

3. **Elephantine nilometer** — **ACCEPTED.** Implement as an information-purchasing mechanic. The player invests in maintaining Elephantine's nilometer garrison and receives flood predictions 1-2 seasons early. This makes a passive waypoint into an active strategic choice.

4. **Heliopolis religious legitimacy** — **ACCEPTED with constraint.** Implement as a satisfaction/morale modifier, but only activate the mechanic during the appropriate era and zoom level. This should NOT come online during tutorials or Stage 1. It belongs at Stage 3 (Governor) or later, when the player governs enough sites to care about legitimacy and morale across a region. At that scale, neglecting Heliopolis reduces worker willingness and increases the chance of political events (rival claimants, worker strikes). Sending offerings and maintaining the temple provides a morale bonus. Introducing it too early would add noise before the player understands the core systems it modifies.

5. **Abusir as test site** — **ACCEPTED.** In Stage 4, let the player build a small pyramid at Abusir to test their chosen theory before committing to Giza. This mirrors the historical reality that Abusir sits between Giza and Saqqara — a convenient location for a "staging" build — and gives the player a low-stakes environment to practice Theory B/C/E mechanics.

6. **Seasonal route calendar** — **ACCEPTED.** Create a visual calendar showing which routes are at peak/reduced/closed capacity across the three seasons. This is the player's primary planning tool from Stage 2 onward. The current `seasonal: boolean` flag in the route data should be expanded to specify WHICH seasons are affected and HOW (capacity multiplier, not just on/off).

7. ~~**Fayum-Meidum geographic shortcut**~~ — **RESOLVED.** Addressed by recommendation #1. The `nile-fayum-to-meidum` (2 ticks) route is now in `world-map.ts`, creating the strategic bypass option around Memphis.

8. **Quarrying methods as a universal constraint** — **REVISED (was: Copper tool decay).** Tool/method consumption should be the ticking clock across all stages from Stage 2 onward, but copper tools were NOT the only quarrying method historically. The game should model multiple quarrying techniques with different trade-offs:

   | Method | Used For | Consumable | Speed | Notes |
   |--------|----------|------------|-------|-------|
   | **Copper/bronze tools** (chisels, saws) | Limestone dressing, fine cutting | CopperTools (wear out) | Fast | Best for precision work. Sinai supply chain (20-tick or 8-tick via Wadi al-Jarf) creates logistical pressure. |
   | **Dolerite pounders** | Granite quarrying, rough shaping | None (durable) | Slow | Historically confirmed for Aswan granite. The pounder itself is nearly indestructible but the work is labor-intensive. Trade-off: no supply chain pressure, but much higher labor-hours per block. |
   | **Fire-setting** (heat rock, douse with water) | Hard stone quarrying, initial fracturing | Wood + Water | Medium | Effective for granite and hard limestone. Requires fuel (wood is imported/scarce) and water (seasonal). Creates an interesting resource triangle: wood from Byblos, water from the Nile, applied at inland quarries. |
   | **Wooden wedge expansion** | Limestone block extraction | Wood (minimal) | Medium | Drill holes, insert dry wooden wedges, soak with water. Wood expands and cracks the stone along a controlled line. Low consumable cost but requires patience (curing time). |

   Design implication: different quarry types should consume different tool/method types. The player can choose methods with different trade-offs — copper tools for speed (but constant supply chain pressure from Sinai), dolerite pounders for reliability (but slower output and more labor), fire-setting for hard stone (but wood and water cost), wooden wedges for economy (but slower). This turns quarry management into a strategic choice rather than a single constraint, and ties more of the map's resource nodes into the quarrying pipeline.

9. **Wadi Natrun route activation progression** — **NEW.** The `overland-memphis-to-wadi-natrun` route now has a clear activation arc tied to hybrid casting:

   | Stage | Wadi Natrun Role | Natron Volume | Route Status |
   |-------|-----------------|---------------|--------------|
   | S2 | Mortar ingredient (small quantities) | Trace | Optional |
   | S3 | Hybrid casting discovery (if player investigates) | ~1-2 tons/day (experiment scale) | Active |
   | S4 | Hybrid casting at Red Pyramid scale | ~4-5 tons/day at 10-15% casting fraction (~60-70 donkey-loads) | **Active** — dedicated supply chain |
   | S5 | D+E blend at Giza scale | ~8-10 tons/day at 25% casting fraction (~140 donkey-loads, ~500-800 donkeys in transit) | **CRITICAL** — major logistics commitment |

   The route transitions from a background mortar supply to the game's second-most-important overland route (after the Sinai copper road). This progression should be reflected in route capacity upgrades: the player must invest in water stations along the 100km desert route, donkey herds, and stockpile infrastructure at both Wadi Natrun (harvesting side) and Giza (consumption side). Disruption of the Wadi Natrun route at Stage 5 should be a significant crisis event — analogous to losing copper supply from Sinai, but affecting the casting fraction rather than quarrying.

   Alternative natron sources (burned plant ash from agricultural waste, natron-rich crusts from seasonal evaporite deposits near the Nile) can serve as emergency backup at reduced efficiency, preventing total casting shutdown but degrading block quality. This gives the player a strategic buffer without removing the supply chain pressure entirely.
