# STONES OF THE NILE
## Design Document — Browser-Based Ancient Egypt Economy Tycoon

### Elevator Pitch

A browser-based economy tycoon where you build pyramids by designing and debugging logistics networks across ancient Egypt. Each pyramid construction theory (ramps, water shafts, cast-in-place) is a different systems architecture with different bottlenecks to optimize. You don't just *win* — you build systems that sustain output over time, like a distributed systems engineer wearing a linen kilt.

"Pharaoh meets Factorio meets SpaceChem, in a browser."

---

### Core Design Pillars

1. **Einmal ist keinmal** — One-off solutions don't count. Your system must sustain output across multiple flood cycles. Getting 500 limestone blocks to Giza once is a tutorial. Delivering 500/season for 5 years while the Nile floods differently each time? That's the game.

2. **Zoom of gameplay** — You do it by hand, you scrounge, you automate, you zoom out, you repeat. Each career stage is a new level of abstraction over the same fundamental problem: right stuff, right place, right time.

3. **The theory IS the gameplay** — Each pyramid construction method isn't cosmetic. It's a fundamentally different architecture that requires different supply chains, different labor, different infrastructure. Choosing a theory is choosing your tech stack.

4. **Programming thinly disguised** — The player is designing systems. The Nile is an async message queue with seasonal throughput. Cities are microservices. The pyramid is the SLA. Drought is a cascading failure. But it *feels* like governing ancient Egypt.

---

### Career Progression (Zoom Levels)

Ripped from Pharaoh's tribal-leader-to-pharaoh arc, but reframed: each stage is a new scope of responsibility. You don't abandon lower levels — you automate them.

#### Stage 1: Foreman (Tutorial / "Hello World")
- **Scope**: One work site, one resource
- **Gameplay**: Manual worker assignment. You drag people to tasks. You feel every bottleneck in your bones.
- **Contract**: "Deliver 100 mud bricks to the construction site" — a one-off to learn the ropes
- **What you learn**: Basic resource flow, worker needs (food, water, rest), seasonal Nile cycle
- **Automation unlock**: Task assignment queues — workers follow standing orders instead of individual commands

#### Stage 2: Overseer
- **Scope**: Multiple work sites, supply chain between them
- **Gameplay**: You stop moving individual workers. You define routes, ratios, priorities. You're writing policies.
- **Contract**: "Sustain 200 limestone blocks/season to the plateau for 3 flood cycles"
- **What you learn**: Transport logistics, Nile as infrastructure, stockpile management, seasonal planning
- **Automation unlock**: Route automation, stockpile thresholds that trigger production changes

#### Stage 3: Governor
- **Scope**: A region with multiple cities, quarries, and the Nile transport network
- **Gameplay**: City-level management. Each city is a node in your network. You allocate between them.
- **Contract**: "Supply Giza with limestone from Tura AND granite from Aswan. Maintain worker satisfaction above 60% across all sites. Sustain for 5 flood cycles."
- **What you learn**: Multi-node logistics, competing resource demands, labor economics, trade
- **Automation unlock**: Governor policies — cities run themselves according to rules you set, you intervene when things break

#### Stage 4: Vizier
- **Scope**: Kingdom-wide. Multiple mega-projects. Diplomatic/economic considerations.
- **Gameplay**: You're choosing WHICH pyramid theory to pursue, allocating the kingdom's resources across competing priorities. Individual blocks are a rounding error.
- **Contract**: "Complete the Great Pyramid using [chosen theory]. Maintain kingdom stability. You have 20 years."
- **What you learn**: Strategic resource allocation, long-term planning, theory trade-offs
- **Automation unlock**: Regional governance — appoint governors (AI or player-defined policy sets) to manage regions

#### Stage 5: Pharaoh (Endgame / Sandbox)
- **Scope**: Dynastic. Multiple pyramids, temples, the entire kingdom over generations.
- **Gameplay**: Legacy planning. Your systems outlive individual workers, governors, even you. Design for resilience.
- **Contract**: Open-ended. Build your legacy. The Nile doesn't care about your plans.

---

### The Contract System

Inspired by SpaceChem: missions aren't "collect X and you're done." They're **sustained output contracts**.

```
CONTRACT: "The Tura Connection"
  Required output: 300 fine limestone blocks/season → Giza plateau
  Duration: 5 flood cycles (years)
  Constraints:
    - Worker satisfaction ≥ 50%
    - No more than 2 transport barges
  Bonus objectives:
    - Complete with ≥ 70% satisfaction
    - Average delivery variance < 10% season-to-season
    - Zero missed deliveries
```

**Key design choice**: The contract isn't fulfilled until the system runs for the full duration. You can't cheese it with a burst of manual effort. Your *system* has to work.

**Failure modes are interesting, not binary:**
- A missed delivery isn't game over — it's a penalty, a reputation hit, a plot beat
- Cascading failures are possible and dramatic (drought → crop failure → workers leave → quarry stops → no blocks → contract missed)
- Recovery is gameplay — diagnosing and fixing a broken supply chain is as satisfying as building one

---

### The Nile: Your Message Bus

The Nile is the central infrastructure of the game. It's not a decoration — it's your primary transport layer with real characteristics:

- **Seasonal throughput**: Flood season (Akhet, ~June-Sept) transforms the river. Higher water = can transport heavier loads closer to build sites. But flooding also disrupts farming and low-lying work sites.
- **Directional flow**: Downstream (north) is easy/fast. Upstream (south) requires wind (sails) or manpower. This is asymmetric bandwidth.
- **Capacity limits**: The river can only handle so many barges. Congestion is real.
- **Seasonal variability**: Some years flood more than others. Your system needs to handle variance, not just average case.

**Transport model:**
- Barges carry goods between river nodes (cities/quarries with Nile access)
- Overland transport from Nile to work sites (slower, more labor-intensive)
- The player designs routes and schedules, not individual barge movements

---

### Pyramid Construction Theories (Your "Tech Stack" Choice)

Each theory is a fundamentally different architecture. Choosing one reshapes your entire logistics problem.

#### Theory A: External Ramp
- **Concept**: A massive straight or wrap-around ramp of earth/rubble, raised as the pyramid grows
- **Supply chain**: Enormous quantities of fill material (almost as much as the pyramid itself), plus the actual building stone
- **Labor**: Brute force. Huge workforce needed.
- **Bottleneck**: Material volume. You're building two structures — the pyramid and the ramp.
- **Player archetype**: The brute-force optimizer. Parallelize everything.

#### Theory B: Internal Spiral Ramp (Houdin)
- **Concept**: A ramp built inside the pyramid structure itself, spiraling upward
- **Supply chain**: Less fill material, but requires precise engineering and skilled labor
- **Labor**: Smaller but more skilled workforce. Mistakes are costlier.
- **Bottleneck**: Skilled worker supply. Training pipeline matters.
- **Player archetype**: The elegant architect. Fewer resources, more planning.

#### Theory C: Water Shaft / Hydraulic
- **Concept**: Using water channels and locks to float blocks upward
- **Supply chain**: Massive water infrastructure investment. Canal construction.
- **Labor**: Engineering-heavy. Canal builders, lock operators.
- **Bottleneck**: Water supply (Nile-dependent), canal maintenance. Seasonal.
- **Player archetype**: The infrastructure builder. Front-load investment, reap efficiency.

#### Theory D: Geopolymer (Cast-in-Place)
- **Concept**: Blocks aren't quarried — they're cast from a limestone aggregate mixture on-site
- **Supply chain**: Completely different. Raw aggregate,iteiteite binder, water, molds. Chemistry, not quarrying.
- **Labor**: Skilled chemists/mixers instead of quarry workers. Different specialization tree.
- **Bottleneck**: Recipe consistency, mold production, curing time.
- **Player archetype**: The process engineer. Optimize the recipe and the pipeline.

#### Theory E: Accretion Overbuild (THE GAME'S PREFERRED THEORY)
- **Concept**: Build each pyramid as a massive stepped trapezoid significantly larger than the final form, with ramps integrated directly into the overbuild mass. Then carve down to the final smooth faces. The removed material cascades to become the building material for the next structure in the complex.
- **The key insight**: The Great Pyramid's overbuild mass ≈ Khafre's pyramid + overbuild. Khafre's overbuild ≈ Menkaure + overbuild. Menkaure's overbuild ≈ temples, causeways, enclosure walls. Total quarried material = total complex mass. No waste, no mystery surplus.
- **Why this is the game's preferred theory**: It transforms the Giza complex from isolated hub-and-spoke projects into a **supply web / DAG**. Every structure is both consumer and producer. The pyramid IS the stockpile for the next project.
- **Supply chain**: Two distinct phases per structure:
  1. **Build-up phase**: Bulk hauling, same as external ramp theory but ramps are structural, not separate infrastructure
  2. **Carve-down phase**: Precision stonecutting, completely different labor (skilled cutters, not haulers), generates massive material output that downstream logistics must absorb
- **Labor**: Phase-dependent. Build-up = bulk haulers. Carve-down = precision masons. The transition between phases is a workforce retooling event.
- **Bottleneck**: Downstream absorption. When you carve the Great Pyramid, you generate a flood of material. If Khafre's site isn't ready to receive, you have a backpressure problem. Timing and coordination across the complex is everything.
- **Player archetype**: The systems thinker. You're not optimizing one pyramid — you're optimizing the whole complex as an interconnected pipeline.
- **Game structure implications**:
  - The "revisit and revise" mechanic becomes STRUCTURAL, not optional — you must return to carve down
  - Every node in the complex is both a consumer and producer
  - No terminal node until the last wall is finished
  - Creates natural multi-site gameplay from the core construction mechanic itself
  - The player's overbuild decisions propagate through the entire complex DAG

**Design goal**: Each theory should feel like a legitimately different game to play, not just reskinned numbers. The supply chains, labor requirements, failure modes, and optimization strategies should be distinct. Theory E is the game's canonical approach and should receive the deepest implementation, with other theories available as alternative playstyles.

---

### Resource Model

#### Raw Resources
- **Limestone** (Tura, local quarries) — primary building material
- **Granite** (Aswan) — used for internal chambers, hard to transport
- **Copper** (Sinai) — for tools, wears out
- **Wood** (imported from Lebanon / local acacia) — for sledges, rollers, barges, scaffolding
- **Food** (Nile delta farms) — grain, bread, beer. Workers need it.
- **Water** — from the Nile, for drinking, construction (wet sand reduces friction!), and hydraulic theory
- **Mud/Clay** — for bricks, fill material, ramp construction
- **Gypsum/Ite** — for morite and geopolymer theory
- **Papyrus** — for record-keeping (enables automation/bureaucracy upgrades?)
- **Rope** (papyrus/palm fiber) — critical for hauling

#### Processed Resources
- **Dressed stone** (limestone → cut and shaped blocks)
- **Copper tools** (copper → chisels, saws — they wear out!)
- **Bread & beer** (grain → worker sustenance)
- **Barges** (wood → transport capacity)
- **Mud bricks** (mud + straw → building material)
- **Geopolymer mix** (aggregate + binder + water → cast blocks, Theory D only)

#### Abstract Resources
- **Labor** — workers with different skill levels
- **Satisfaction** — fed, watered, rested, paid workers work better
- **Knowledge** — accumulated expertise that improves efficiency
- **Bureaucracy** — your ability to manage at scale (unlocked via papyrus/scribes?)

---

### Seasonal Cycle (The Heartbeat)

The Egyptian year in three seasons drives everything:

1. **Akhet (Flood)** — ~4 months
   - Nile floods. Farmland underwater. Farmers available as construction labor.
   - River transport capacity HIGH (water closer to sites)
   - Can't quarry in flooded areas
   - **This is your peak construction season**

2. **Peret (Growing)** — ~4 months
   - Waters recede. Planting season. Farmers return to fields.
   - Labor supply drops. River transport normalizes.
   - Quarrying resumes
   - **Balance farming vs. construction labor**

3. **Shemu (Harvest)** — ~4 months
   - Harvest. Food production peaks.
   - Labor scarce (harvesting)
   - Hot. Worker efficiency drops.
   - **Stockpile season — build reserves for next flood**

The player must design systems that handle this rhythm. A system that works in Akhet but collapses in Peret is a bad system.

**Year-to-year variance**: Flood levels vary. A low flood means less farmland, less food, fewer surplus laborers, but also less disruption to quarries. A high flood means great transport but potential damage to infrastructure. The player's system must be resilient to variance.

---

### Revisiting & Revision Mechanic

Key design innovation: **Cities persist and evolve. You leave and come back.**

- When you're promoted from Overseer to Governor, your old work sites don't vanish. They run on the automation you set up (or they degrade).
- You can revisit any city/site at any time, dropping back down to that zoom level.
- **Things drift**: Left unattended, systems slowly degrade. Workers get complacent, routes become inefficient, tools wear out.
- **Coming back is gameplay**: Diagnosing why your Tura quarry output dropped 30% since you left is a puzzle. Was it tool wear? A population shift? A bad harvest?

This creates a natural rhythm: set up systems, zoom out, monitor from above, zoom back in when something breaks. Like checking your dashboards and then SSH-ing into a box when the metrics look wrong.

---

### Tech Stack (Actual)

- **Language**: TypeScript
- **Rendering**: Phaser 3 or Pixi.js (2D/isometric)
- **State management**: Custom ECS or simple tick-based simulation
- **Build**: Vite
- **Deployment**: Static site (GitHub Pages, Netlify, etc.)
- **Data**: All client-side. Save to localStorage / IndexedDB. Export/import JSON.
- **No backend required** for v1

#### Prototype Priority
1. **Economy simulation engine** — resources, production, transport, consumption as pure logic (no graphics)
2. **Seasonal tick system** — the flood cycle driving everything
3. **Contract evaluation** — can the system sustain output?
4. **Basic UI** — numbers, graphs, controls. Ugly is fine.
5. **One playable scenario** — Foreman level, one quarry, one build site, one contract
6. **Then**: isometric rendering, multiple cities, theory selection, etc.

---

### Worker Organization (Historical Basis)

Based on Lehner's excavations at the Giza workers' village and the Merer papyri:

- **Crews** (~2,000 men) — the largest unit. Named: "Friends of Khufu," "Drunkards of Menkaure"
- **Phyles** (~200 men) — subdivisions of a crew
- **Divisions** (~20 men) — the working unit you actually manage at Foreman level

**Game implications**: At Foreman zoom, you manage divisions directly. At Overseer, you manage phyles. At Governor, crews. This mirrors the historical structure and creates natural automation boundaries.

Workers are NOT slaves — they're paid laborers and seasonal corvée workers. Well-fed (bread, beer, meat, fish), with medical care. Satisfaction is a real mechanic, not just flavor.

---

### Historical Grounding Notes

See `docs/RESEARCH.md` for full reference material.

Key numbers that inform game balance:
- Great Pyramid: ~2.3 million blocks, ~340 blocks/day over 20 years
- Peak workforce: 20,000-30,000 (not Herodotus's exaggerated 100,000)
- Tura casing stone: 13-17km by barge, 67,000-115,000 blocks
- Aswan granite: 934km upstream, 25-80 ton blocks, flood season only
- Merer's crew: ~40 men, multi-day round trips Tura↔Giza
- Wetting sand reduces sledge friction ~50% (confirmed 2014, U Amsterdam)

---

### Open Questions

- **Multiplayer?** Probably not for v1, but the contract/leaderboard model (SpaceChem-style: "here's how your throughput compares to other players") could work well
- **Procedural generation?** Map layout, flood patterns, contract parameters could all be procedural for replayability
- **Difficulty tuning**: How much variance in floods? How tight are contracts? Need playtesting.
- **Art style**: Pharaoh's sprite art is beloved. Stylized 2D isometric? Pixel art? Minimalist/abstract? TBD.
- **Name**: "Stones of the Nile" is a placeholder. Could be better.
- **Bazaar walker mechanic?** Pharaoh's bazaar traders walking routes to distribute goods is iconic. Could adapt: scribes walking routes to distribute orders/automation?
- **Housing evolution?** Pharaoh's multi-tier housing (needs more goods to upgrade) maps to worker satisfaction tiers
