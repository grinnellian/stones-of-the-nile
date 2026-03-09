# STONES OF THE NILE: Career Progression Design

## Narrative Arc Overview

The player's career replays the actual R&D arc of Egyptian pyramid building across roughly 100 years of the 3rd and 4th Dynasties (~2680-2560 BCE). The role evolves through five stages:

1. **Foreman** -- You are a pair of hands. You move workers, haul bricks, feel every bottleneck physically. Your world is one site, one material, one problem.
2. **Overseer** -- You are a policy writer. You stop touching individual workers and start defining rules, routes, ratios. You discover that vertical logistics is a different beast from horizontal.
3. **Governor** -- You are a firefighter. Two ambitious projects fail in front of you, and you must diagnose, salvage, and adapt. You learn that failure is data and that retrofitting a bad foundation is worse than starting over.
4. **Vizier** -- You are a strategist. You choose your construction philosophy and prove it works at scale. You plan across decades, not seasons. You begin to see pyramids not as endpoints but as nodes in a system.
5. **Pharaoh** -- You are a systems architect. Multiple pyramids, multiple generations, the entire kingdom as one interconnected supply web. Your system must outlive you.

The through-line: each stage forces the player to zoom out one level of abstraction while keeping lower levels running. You never abandon what you built -- you automate it, and then you must maintain it when it drifts.

---

## Stage 0: Tutorial -- Pre-Dynastic Village Life

### Design Intent
Following the model of Pharaoh and Children of the Nile, the game opens with several pre-construction tutorial scenarios that teach core systems before any monumental building begins. The player is a village administrator in a small settlement near Memphis, learning the rhythms of the Nile, the needs of workers, and the basics of resource gathering and transport. No pyramids, no mastabas -- just survival and optimization of daily life along the river.

These tutorials establish the mechanical vocabulary the player will use for the rest of the game. By the time the player is asked to build a mastaba, they should already understand food production, worker satisfaction, seasonal cycles, and overland transport.

### Tutorial 0a: "The Flood" -- Nile Cycle and Food Production
**Scope**: A single farming village on the Nile bank.
**Duration**: 3 seasons (one full year: Akhet, Peret, Shemu).

The player learns the three-season Egyptian calendar through direct experience:
- **Akhet (Flood)**: The Nile rises. Farmland floods. No planting possible, but the silt deposited will make next season's crops rich. Workers idle unless given other tasks. The player learns that flood season is NOT wasted time -- it is preparation time.
- **Peret (Growing)**: Waters recede. The player assigns workers to plant grain in the newly fertile soil. First resource chain: Water + fertile land + labor → Grain.
- **Shemu (Harvest)**: Grain is harvested. The player learns the processing chain: Grain → Bread, Grain → Beer. Workers consume Bread and Beer. If supply runs out, satisfaction drops and workers leave.

**Core lessons**: Seasonal rhythm as the game's heartbeat. Food as the prerequisite for all other activity. Worker satisfaction as a real constraint, not a cosmetic meter.

**Contract: "A Year on the Nile"**
```
Objective:      Survive 1 full year (3 seasons). End with positive food stores.
Resources:      Water, Grain, Bread, Beer
Workers:        1 division (~20 villagers)
Constraints:    Worker satisfaction >= 40% at year-end
Bonus:          End with >= 50 Grain in stockpile (surplus for next year)
```

### Tutorial 0b: "Clay and Mud" -- Resource Gathering and Simple Construction
**Scope**: Same village, expanded to include a clay pit and a mud-brick yard.
**Duration**: 2 seasons.

The player learns resource extraction and basic processing:
- Assign workers to the clay pit: labor → Clay
- Build a mud-brick yard: Clay + Water + Straw → MudBricks
- Use MudBricks to build village houses (improving worker satisfaction)

This tutorial introduces the concept of processing chains (raw → processed) and the idea that construction requires sustained input, not one-off effort. The player also experiences their first resource bottleneck: the clay pit and the brick yard compete for workers.

**Core lessons**: Resource extraction. Processing chains. Worker allocation trade-offs. Construction as a sustained activity.

**Contract: "Shelter from the Sun"**
```
Objective:      Build 3 mud-brick houses (20 MudBricks each)
Resources:      Clay, Water, Straw, MudBricks
Workers:        1 division (~20 villagers), split between extraction and production
Constraints:    Worker satisfaction >= 45% throughout
Bonus:          Complete in 1 season instead of 2
```

### Tutorial 0c: "The Road to Memphis" -- Transport and Multi-Site Logistics
**Scope**: The village plus a distant resource node (a small quarry or a Memphis market). Introduces overland transport.
**Duration**: 2 seasons.

The player learns that resources at one location must be moved to another:
- A small limestone outcrop is 2 ticks away from the village by overland path
- Workers must be assigned to haul stone from the outcrop to the village
- Transport takes time: a worker hauling stone is not available for farming or brick-making
- The player must balance production workers vs. transport workers

This tutorial also introduces CopperTools for the first time: the limestone outcrop requires tools to quarry. Tools wear out. The player must acquire tools (provided from Memphis in this tutorial) and manage their consumption.

**Core lessons**: Transport as a cost (time and labor). Multi-site coordination. Tool consumption as a recurring drain. The tension between production and logistics.

**Contract: "Stone for the Village"**
```
Objective:      Deliver 20 Limestone blocks to the village
Resources:      Limestone, CopperTools (provided), MudBricks, Bread, Beer
Workers:        1.5 divisions (~30 villagers)
Constraints:    Worker satisfaction >= 45%
                CopperTools must not reach 0 (resupply available from Memphis)
Bonus:          Maintain zero idle ticks on the quarry (continuous extraction)
```

### Tutorial Completion
Completing all three tutorials unlocks Stage 1 (Foreman). The player has demonstrated mastery of:
- The seasonal Nile cycle and its impact on all activity
- Food production and worker sustenance
- Resource extraction and processing chains
- Overland transport and multi-site coordination
- Tool consumption management
- Worker satisfaction as a binding constraint

The narrative hook: a minor noble has noticed the player's competence and offers a commission -- build a mastaba tomb at Saqqara. This is the player's first real construction project, and it requires everything they learned in the tutorials working together.

---

## Stage 1: Foreman -- Mastabas at Saqqara

### Historical Site
**Early dynastic mastabas at Saqqara** (~2680 BCE). Flat-topped rectangular tombs of mud brick and rubble, the standard elite burial for centuries. The player builds a mastaba for a minor noble -- functional, modest, achievable.

### Construction Theory
**Basic manual hauling** (pre-theory baseline). Levers, sledges, human muscle. No ramps needed -- mastabas are 4-8 meters tall. Workers carry mud bricks by hand or drag small limestone blocks on sledges. This is the control case against which all later theories are measured.

### Core Challenge
**First logistics: the resource triangle.** The player learns the fundamental three-way dependency: materials (MudBricks, Limestone), labor (workers with needs), and sustenance (Bread, Beer, Water). If any vertex fails, the system stops. The Nile's seasonal cycle is introduced as the heartbeat underlying everything.

### Contract Structure

**Contract: "A Worthy Tomb"**
```
Required output:  100 MudBricks + 20 Limestone → Saqqara mastaba site
Duration:         2 seasons (tutorial pace -- less than 1 flood cycle)
Resources:        MudBricks, Limestone, Clay, Water, Bread, Beer, Grain, CopperTools
Constraints:      Worker satisfaction >= 50%
Sites:            1 clay pit, 1 small quarry, 1 construction site, 1 workers' camp
Workers:          2 divisions (~40 laborers), 1 craftsman team (5 masons)
```

**Bonus objectives:**
- Complete with zero idle ticks (no worker downtime)
- Maintain satisfaction >= 70% throughout
- Finish in 1 season instead of 2

### Unlocks
- **Task assignment queues** -- workers follow standing orders instead of individual commands
- **Seasonal forecast overlay** -- see the coming flood level (low/normal/high) one season in advance
- **Limestone quarrying** -- access to basic quarry operations with CopperTools
- **Access to Saqqara necropolis** for Stage 2

### Failure Narrative
No historical failure event here. The mastaba is simple and proven. The purpose is to let the player feel mastery -- and then feel the ceiling. "I've optimized this completely. There is nothing more to squeeze out of a mud brick rectangle. What's next?"

The implicit failure is stagnation. If the player lingers, they see that mastabas are commoditized -- any foreman can build one. Promotion requires demonstrating something more.

---

## Stage 2: Overseer -- The Step Pyramid at Saqqara

### Historical Site
**Djoser's Step Pyramid at Saqqara** (~2670 BCE). Imhotep's revolutionary concept: stack mastabas on top of each other, each smaller than the last. The first monumental stone building in history. Originally planned as a mastaba, then expanded through at least 6 design revisions.

Historically, this was the moment Egypt stopped thinking horizontally and started thinking vertically. The player should feel that same pivot.

### Construction Theory
**Accretion layers** (proto-Theory E). Each step is essentially a mastaba the player already knows how to build, but leaning inward at ~75 degrees and stacked. The ramps are simple inclined planes of rubble built against each step face. The key insight: the ramps become part of the structure's mass, not waste to be removed. This plants the seed of Theory E without naming it.

### Core Challenge
**Vertical logistics and supply chain coordination.** Getting stone UP, not just across. The player must simultaneously supply:
- The quarry floor (cutting blocks)
- The staging area (dressing and sorting)
- Multiple rising work faces (steps 1-6, each at different heights)
- The ramp construction itself (fill material)

Each step requires different block dimensions. Deliveries must flow to the right step at the right time. For the first time, the player experiences the difference between throughput (total blocks/season) and routing (right blocks to right places).

### Contract Structure

**Contract: "Imhotep's Vision"**
```
Required output:  200 Limestone blocks/season → Saqqara plateau
Duration:         3 flood cycles (9 seasons)
Resources:        Limestone, DressedStone, MudBricks, Sand, CopperTools,
                  Wood (sledges/levers), Rope, Bread, Beer, Water, Grain
Constraints:
  - Maintain supply to all 6 step levels simultaneously
  - Worker satisfaction >= 55%
  - No more than 1 season of interrupted supply to any level
Sites:            Saqqara quarry (local limestone), Saqqara plateau (construction),
                  Workers' village, Nile landing (first river access)
Workers:          2 phyles (~400 laborers), 3 craftsman teams (~60 masons)
```

**Bonus objectives:**
- Complete with 5+ seasons of uninterrupted supply to all levels (sustained system, not burst)
- Average delivery variance < 15% season-to-season
- Zero tool stockouts (CopperTools never hit 0)
- Build all 6 steps with dressed stone facing, not just rubble core

### Unlocks
- **Route automation** -- define transport routes with capacity/priority, they run without manual intervention
- **Stockpile thresholds** -- trigger production changes automatically (e.g., "if CopperTools < 5, switch 1 craftsman to toolmaking")
- **Nile barge transport** -- can now move goods by river (unlocked because the player has proven they can manage multi-node logistics)
- **Granite access** -- Aswan quarries become known (distant, expensive, but Granite is needed for chamber construction in later pyramids)
- **Phyle management** -- manage groups of ~200 instead of individual divisions
- **Access to Meidum** for Stage 3

### Failure Narrative
The Step Pyramid's historical revisions are mirrored in gameplay. Partway through construction (after completing steps 1-3), Imhotep revises the plan upward. The contract changes mid-execution:

**"Design Change" event (triggered after step 3):**
> Imhotep has revised the design. The mastaba plan is abandoned. Four additional steps are required, each with dressed limestone facing. Your supply routes must be restructured.

This is not a failure -- it is the first experience of changing requirements mid-project. The player's system, built to supply a 3-step structure, must scale to 6 steps. Routes that worked at 12 meters of height become inadequate at 60 meters. The player learns: build systems that can adapt, not just systems that work for today's spec.

---

## Stage 3: Governor -- Sneferu's Failures (Meidum & Bent Pyramid)

This stage is split into two acts, both under Pharaoh Sneferu (~2613-2589 BCE), Egypt's greatest pyramid experimenter. Sneferu built more pyramid mass than any other pharaoh, including Khufu. He also failed more spectacularly.

### Act 1: The Meidum Pyramid -- "Production Incident #1"

#### Historical Site
**Meidum Pyramid** (~2600 BCE), 100km south of Cairo. Originally a 7-step pyramid (possibly started by Huni, Sneferu's predecessor), Sneferu attempted to convert it into Egypt's first true smooth-sided pyramid by filling in the steps with packing stone and adding a limestone casing.

Today, only the inner steps remain standing -- the outer casing and fill collapsed, leaving a tower-like core surrounded by a mountain of rubble. The collapse may have occurred during construction or shortly after.

#### Construction Theory
**External ramp (Theory A), first encounter.** The player uses straight and zigzag ramps of mudbrick and rubble to haul casing blocks up the existing step structure. The theory is presented as the obvious approach: you need to get heavy blocks up high, so you build a ramp. Simple.

The ramp problem is manageable here because the step pyramid core already exists -- the player is only adding casing, not building from scratch. This makes Theory A feel adequate. Its limits are not yet apparent.

#### Core Challenge
**Multi-source logistics and the retrofitting trap.** For the first time, the player coordinates multiple quarry sources:
- Local limestone for packing fill
- Tura limestone (via Nile barge) for fine outer casing
- CopperTools from Sinai supply chain

The deeper lesson is about technical debt. The step pyramid core was not designed for smooth-sided conversion. The fill material does not bond properly to the original stepped surfaces. The player may notice (via inspection mechanics) that structural integrity scores are declining as casing goes up -- but the contract pushes them to keep building.

#### Contract Structure

**Contract: "Sneferu's Ambition"**
```
Required output:  300 Limestone blocks/season (mixed: 200 local fill + 100 Tura casing)
                  → Meidum construction site
Duration:         4 flood cycles (12 seasons)
Resources:        Limestone, DressedStone, Sand, Gypsum (mortar), CopperTools,
                  Wood, Rope, Barges (first barge logistics), Bread, Beer, Water, Grain
Constraints:
  - Maintain dual supply chain (local quarry + Tura via Nile)
  - Worker satisfaction >= 55%
  - Barge fleet: start with 2, may build up to 4
Sites:            Meidum quarry (local), Tura quarry (distant, Nile-connected),
                  Meidum plateau (construction), Nile landing x2,
                  Workers' villages x2
Workers:          1 crew (~2,000 across all sites)
```

#### The Collapse Event (triggered at ~60% completion)

**"Structural Failure at Meidum":**
> Cracks propagate through the southeast face. The outer casing separates from the step core and slides. 40% of placed casing is lost. 12 workers injured. Sneferu is furious.

This is NOT game over. It is a production incident. The player must:

1. **Diagnose**: Inspection reveals the fill packing was not bonded to the original steps. The smooth-sided conversion was applied to a structure not designed for it.
2. **Salvage**: Recover usable blocks from the rubble field. ~25% of collapsed casing is recoverable.
3. **Manage fallout**: Worker satisfaction drops 20 points. Sneferu's confidence meter (new mechanic) drops. The player must stabilize morale and present a recovery plan.
4. **Choose**: Attempt to rebuild the casing (risky, expensive) or abandon Meidum and convince Sneferu to start fresh (costs political capital but is the historically correct choice).

**The lesson**: Retrofitting a system not designed for your new requirements is dangerous. Sometimes the right answer is to start over. The player who tries to patch Meidum will spend resources and time for a fragile result. The player who convinces Sneferu to move on proceeds to Act 2 with more resources and goodwill.

### Act 2: The Bent Pyramid at Dahshur -- "Hotfix in Production"

#### Historical Site
**The Bent Pyramid at Dahshur** (~2600 BCE). Sneferu starts fresh. A true pyramid from the ground up, planned at a steep 54-degree angle that would make it taller than anything ever built. Partway up (~47m of 105m planned height), cracks appear. The angle is reduced to ~43 degrees, creating the distinctive "bent" profile visible today.

The Bent Pyramid is unique in that it visibly records its own mid-construction failure. The angle change is architectural panic, frozen in stone.

#### Construction Theory
**External ramp (Theory A), stress-tested.** The player builds a full external ramp system for the steep 54-degree face. At this angle, the ramp's slope must be steep too, or it extends absurdly far from the base. The player feels the theory's scaling problem directly:

- At 54 degrees, a ramp at 8% gradient must extend 600+ meters to reach the work face at 47m
- The ramp volume is approaching 30% of the pyramid volume already, and they are not even halfway up
- Sledge teams struggle on the steep ramp surface; accident rate increases

This is where Theory A hits its ceiling. The player should think: "There has to be a better way."

#### Core Challenge
**Failure recovery and mid-build adaptation.** The player must redesign a live system. When the angle change is forced, everything cascades:

- Block dimensions change (different angle = different cutting templates)
- Ramp angles and routes must be recalculated
- Supply of pre-cut blocks at the old angle becomes waste or must be re-dressed
- Worker teams trained for 54-degree placement must retrain
- The timeline extends (shallower angle = wider base at upper courses = more material)

This is the first time the player experiences a forced system redesign under pressure, with a half-built structure that cannot be abandoned.

#### Contract Structure

**Contract: "Sneferu's Redemption"**
```
Required output:  Phase 1 (seasons 1-6): 400 Limestone + 50 DressedStone/season at 54°
                  Phase 2 (seasons 7-15): 350 Limestone + 75 DressedStone/season at 43°
                  + 8 Granite blocks/season (interior chambers, from Aswan -- flood season only)
Duration:         5 flood cycles (15 seasons)
Resources:        Limestone, DressedStone, Granite, Sand, Gypsum, CopperTools,
                  Wood, Rope, Barges, Bread, Beer, Water, Grain
Constraints:
  - Manage Aswan granite supply (934km upstream, flood-season-only transport)
  - Worker satisfaction >= 60% across all sites
  - Survive the angle-change event without more than 2 consecutive missed deliveries
  - Sneferu's Confidence >= 40% (new mechanic: drops from failures, rises from milestones)
Sites:            Dahshur quarry (local), Tura quarry, Aswan quarry (new, distant),
                  Dahshur plateau (construction), Nile landings x3,
                  Workers' villages x3, tool forge
Workers:          1.5 crews (~3,000 across all sites)
```

#### The Angle-Change Event (triggered at ~45% completion)

**"Cracks in the Foundation":**
> Structural survey reveals internal cracking along the southeast corner. At the current 54-degree angle, the pyramid will not support its own weight above 50 meters. Chief architect recommends reducing the angle to 43 degrees immediately.

The player receives this as an urgent event with a 2-season deadline to implement the change. They must:

1. **Reconfigure production**: All DressedStone cutting templates switch to 43-degree specifications. Existing 54-degree stock must be re-cut (costly) or repurposed for interior fill.
2. **Redesign ramps**: External ramp geometry changes. Some ramp sections can be repurposed; others are abandoned.
3. **Manage the workforce transition**: Workers lose efficiency during the changeover. Satisfaction dips from uncertainty.
4. **Keep Sneferu confident**: Two major failures in a row. The player must show progress quickly after the angle change to maintain royal support.

### The Flood Discovery: Hybrid Casting Emerges (triggered after Bent Pyramid angle change)

After the Bent Pyramid crisis and the next flood season, the following event fires:

**"Hardened Dust" event:**
> Workers returning to the Dahshur quarry after the flood find something unusual. Where loose limestone dust and rubble had covered the quarry floor, the ground is hard -- patches of what was powder now feel like stone. The foreman reports that floodwater pooled over the waste piles and left behind consolidated crusts. One worker broke off a piece and says it is as strong as the blocks they cut.

This is a scripted discovery event, not a random occurrence. The player receives a choice:

1. **Investigate** (costs: 1 season of a small research crew, ~20 workers + a senior mason): The crew experiments with deliberately mixing quarry dust, natron (already available for mortar), and water in controlled batches. After several attempts, they produce small test blocks that cure to usable strength. The player unlocks **hybrid casting** as a composable technique -- not a full theory, but a tool that can layer onto their existing approach.

2. **Ignore** (no cost): The observation is filed away. Hybrid casting remains locked until Stage 4, where it can be unlocked through a more expensive deliberate research investment.

If the player investigates, they receive a small-scale demonstration: a batch of 10-20 cast blocks placed alongside quarried blocks in a non-critical section of the Bent Pyramid's upper courses. The blocks perform adequately. The technique is proven in principle but not yet at scale.

**Design intent**: The discovery emerges from the game's existing systems (flood cycle, quarry waste, natron supply) rather than appearing as an arbitrary unlock. The player has already encountered all the ingredients -- limestone dust at the quarry, natron on the Wadi Natrun route, floodwater every Akhet. The event connects dots the player has seen but not combined. This is the "of course" moment -- not "here is a new thing" but "I should have seen this coming."

### Stage 3 Unlocks (after completing both acts)

- **Governor policies** -- cities and quarries run themselves according to player-defined rules; the player intervenes only when alerts fire
- **Multi-region management** -- the map expands from a single site to a regional view with multiple interconnected nodes
- **Crew-level workforce management** -- manage ~2,000 workers as a unit
- **Failure diagnostics** -- structural inspection tools, supply chain health dashboards
- **Granite logistics** -- proven capability to manage long-distance Aswan supply
- **Theory selection** -- upon completing Stage 3, the player is presented with the choice of construction theories for Stage 4. Theory A (external ramp) remains available but its limits have been demonstrated. Theory B (internal ramp) and Theory C (hydraulic) become available. Theory D (geopolymer) is available as an experimental option.
- **Hybrid casting** (if investigated) -- available as a composable technique that can layer onto any quarry-based theory chosen for Stage 4. Not a theory itself -- a tool.
- **Access to the Red Pyramid at Dahshur** for Stage 4

### Stage 3 Failure Narratives

The entire stage IS a failure narrative. Both acts teach through failure:

| Historical Failure | Gameplay Event | Lesson |
|---|---|---|
| Meidum outer casing collapse | Structural failure at 60% completion; casing separates from step core | Don't retrofit a system not designed for your requirements |
| Bent Pyramid angle change | Forced redesign at 45% completion; 54° to 43° | Brute-force approaches (steep angle, external ramp) hit scaling limits |
| Sneferu's persistence | Player serves same pharaoh through two failures | Failure is data, not defeat. Each failure narrows the solution space |

---

## Stage 4: Vizier -- The Red Pyramid at Dahshur

### Historical Site
**The Red Pyramid at Dahshur** (~2590 BCE). Sneferu's third pyramid and Egypt's first successful true smooth-sided pyramid. Built at a conservative 43-degree angle (the same angle the Bent Pyramid was corrected to), using lessons from both prior failures. Named for the reddish hue of its exposed limestone core.

The Red Pyramid represents the moment Egyptian engineering got it right. Not through brilliance, but through accumulated failure. The conservative angle is not timidity -- it is hard-won wisdom.

### Construction Theory
**Player's choice.** This is the first stage where the player selects their construction theory. The choice reshapes the entire logistics problem:

**Option A: External Ramp (refined)**
- The player knows its limits from Stage 3. At 43 degrees, the ramp problem is manageable (unlike 54 degrees). The player must solve the material volume problem: ramp fill approaches 40% of pyramid volume.
- Resource emphasis: massive quantities of MudBricks, Sand, Clay for ramp fill, plus building stone.
- Labor emphasis: large unskilled workforce for hauling. 5,000+ laborers.
- Bottleneck: raw material throughput. Two supply chains running in parallel (pyramid stone + ramp fill).

**Option B: Internal Spiral Ramp (Houdin)**
- Lower third (~40m) via conventional external ramp. Upper two-thirds via internal spiral ramp ~1.6m wide with open corner notches for turning blocks.
- Resource emphasis: less fill material, but DressedStone must be cut to precise internal-ramp specifications. More CopperTools consumed (precision cutting).
- Labor emphasis: smaller but more skilled workforce. 2,000 skilled masons + 1,500 laborers.
- Bottleneck: skilled worker pipeline. Training time matters. A skilled mason who dies in an accident takes seasons to replace.
- New mechanic: **Corner notch management** -- blocks must be rotated 90 degrees at each corner. Requires specialized rigging crews. Throughput at corners limits overall build rate.

**Option C: Hydraulic Lift**
- Water channels and locks built into/around the pyramid to float blocks upward on barges or rafts.
- Resource emphasis: massive water infrastructure investment. Canals, locks, cisterns, pumps. Wood for lock gates. Gypsum for waterproof mortar.
- Labor emphasis: engineering-heavy. Canal builders, lock operators, water managers. 1,000 engineers + 2,500 laborers.
- Bottleneck: water supply. Dependent on Nile flood levels. A drought year can shut down vertical transport entirely. The player must build cisterns and reservoirs for drought resilience.
- New mechanic: **Water management** -- track water levels in canal system separately from Nile levels. Evaporation, leakage, seasonal refill.

**Option D: Geopolymer (experimental)**
- Blocks cast in place from aggregate mixture. No quarrying for upper courses -- raw materials hauled up in baskets (20-30kg) instead of blocks (2,500kg).
- Resource emphasis: Limestone aggregate, Gypsum, Water, Clay (as binder). Completely different supply chain from quarried stone.
- Labor emphasis: chemists/mixers instead of quarry workers. 500 skilled mixers + 2,000 basket carriers.
- Bottleneck: recipe consistency and curing time. Bad batches produce weak blocks. Temperature and humidity affect curing. Seasonal variation matters.
- New mechanic: **Quality control** -- each batch has a quality score based on ingredient ratios, mixing time, and curing conditions. Low-quality blocks degrade over time.

**Hybrid Casting at the Red Pyramid** (available if discovered in Stage 3, or discoverable here through deliberate research):

If the player discovered hybrid casting at Stage 3, it is now a proven technique available for systematic use. The player can allocate a **casting fraction** -- a percentage of blocks (0-35%) that will be cast from quarry waste rather than quarried as finished blocks. At the Red Pyramid's scale, even a modest casting fraction (10-15%) produces meaningful savings in quarry throughput and hauling labor.

The Red Pyramid is an ideal testing ground for hybrid casting at scale:
- Its conservative 43-degree angle means generous mass relative to height -- lots of interior volume where cast blocks serve well
- If using Theory E geometry, the overbuild mass is the natural candidate for casting
- The Wadi Natrun route is already established (natron has been used for mortar since Stage 2)
- The pounding pit can be set up at the Dahshur quarry to process waste year-round

New mechanics introduced:
- **Pounding pit**: Assign unskilled workers or animals (donkeys/oxen) to break quarry rubble into graded aggregate. The pit runs year-round, stockpiling processed aggregate for flood-season casting. This is the lowest-skill operation in the game -- break rocks into smaller rocks.
- **Casting fraction control**: The player sets what percentage of blocks to cast vs. quarry. Higher fractions reduce hauling burden but increase natron consumption and introduce quality variance.
- **Seasonal casting rhythm**: Pound aggregate during Peret and Shemu (dry months). Cast during Akhet when floodwater delivers water to the plateau and idle farmers provide basket-carrier labor.

If the player did NOT discover hybrid casting in Stage 3, a **deliberate research event** is available: invest 2 seasons and ~50 workers in systematic experimentation with quarry waste, natron, and water. This is more expensive than the Stage 3 organic discovery but achieves the same result.

### Core Challenge
**Strategic theory selection and proving it at scale.** The player must commit to a theory and build the infrastructure to support it. This is no longer about reacting to problems -- it is about making an architectural decision that constrains everything downstream. If hybrid casting is available, the player must also decide how aggressively to adopt it -- a casting fraction that works at the Red Pyramid's scale may not be optimal for Giza.

The Red Pyramid is the proving ground. At 105m tall and 220m base, it is large enough to stress-test any theory but not so large that mistakes are unrecoverable. The player should feel confident in their chosen theory by the end -- or realize they chose wrong and must adapt for Stage 5.

Secondary challenge: **long-term planning.** The contract runs for 8 flood cycles. The player must think in years, not seasons. Tool supply chains, worker training pipelines, food stockpiles for drought years -- all require planning horizons longer than anything in previous stages.

### Contract Structure

**Contract: "The Red Crown"**
```
Required output:  Varies by theory:
                  Theory A: 500 Limestone + 80 DressedStone + 200 MudBricks/season
                  Theory B: 400 Limestone + 120 DressedStone/season (precision emphasis)
                  Theory C: 450 Limestone + 60 DressedStone/season + water infrastructure milestones
                  Theory D: 300 Limestone aggregate + 150 GeopolymerMix/season
                  All theories: 5 Granite/season (interior chambers, flood-season Aswan transport)
Duration:         8 flood cycles (24 seasons)
Resources:        Full resource set. Theory-dependent emphasis:
                  All: Limestone, DressedStone, Granite, CopperTools, Wood, Rope,
                       Bread, Beer, Water, Grain, Gypsum, Sand
                  Theory A adds: Clay, MudBricks (ramp fill)
                  Theory C adds: Wood (lock gates), Gypsum (waterproof mortar)
                  Theory D adds: GeopolymerMix, Clay (binder)
Constraints:
  - Worker satisfaction >= 60%
  - No more than 3 missed delivery seasons across the full 24
  - Maintain Aswan granite supply without interruption during flood seasons
  - Theory-specific: (A) ramp gradient <= 10%, (B) corner throughput >= 20 blocks/season,
    (C) water reserves >= 3 seasons' supply, (D) batch quality >= 70% average
Sites:            Dahshur quarry, Tura quarry, Aswan quarry, Sinai copper outpost,
                  Dahshur plateau (construction), Nile landings x4,
                  Workers' villages x4, tool forges x2, granaries x3
Workers:          2 crews (~4,000 across all sites)
```

**Bonus objectives:**
- Complete in 6 flood cycles instead of 8 (requires sustained peak efficiency)
- Zero structural defects (all inspection checks pass)
- Maintain worker satisfaction >= 75% (requires robust food/beer supply chain)
- Deliver Sneferu's sarcophagus (single 25-ton Granite block from Aswan -- special logistics challenge)

### The Transition to Giza

After the Red Pyramid is complete, a narrative transition occurs. Sneferu dies. His son Khufu ascends the throne. Khufu's ambition exceeds his father's: he wants a pyramid complex at Giza that will dwarf everything before it.

**"Khufu's Commission" event:**
> The new pharaoh summons you. He has chosen the Giza plateau. He wants not one pyramid but a complex: the Great Pyramid, mortuary temple, valley temple, causeways, and satellite pyramids. The scale is unprecedented. Your current methods will need to evolve.

The player is tasked with a planning phase: survey the Giza plateau, estimate material requirements, design a logistics network connecting Giza to quarries across Egypt, and -- critically -- evaluate whether their chosen theory can scale to Khufu's vision.

**The planning phase reveals the numbers:**
- Great Pyramid: ~2.3 million blocks, 6.1 million tons
- At the Red Pyramid's best sustained rate, the Great Pyramid alone would take 40+ years
- Khufu wants it in 20

This gap between current capability and required capability is the motivation for Theory E. If the player is using Theory A, they see that the ramp would be larger than the pyramid itself. If Theory B, the internal ramp's corner bottleneck limits throughput at scale. If Theory C, the water infrastructure investment is staggering. If Theory D, the mixing capacity required is enormous.

Theory E is presented not as a tech-tree unlock but as an emergent insight: "What if the pyramid's overbuild IS the construction infrastructure, and the carved-away excess IS the material for the next structure?"

### Unlocks
- **Regional governance** -- appoint AI governors (player-defined policy sets) to manage regions autonomously
- **Long-range planning tools** -- multi-year Gantt-style scheduling, resource forecasting across flood cycles
- **Theory E availability** -- accretion overbuild with cascading material becomes a choosable approach for Stage 5
- **Kingdom-wide map** -- full Egypt from Delta to Aswan, all quarry sources, all Nile nodes
- **Diplomatic mechanics** -- trade with Lebanon (cedar wood), Sinai (copper), Nubia (gold, labor)
- **Alabaster and Gold** -- luxury resources for temple interiors and royal burial goods
- **Access to the Giza Plateau** for Stage 5

### Failure Narrative
The Red Pyramid historically succeeded. There is no structural failure event. Instead, the failures here are operational:

- **Theory-specific stress events**: Each theory has a characteristic failure mode that manifests during the Red Pyramid build. These are manageable -- the purpose is to teach the player their theory's weakness before Giza, where the same weakness could be fatal.
  - Theory A: A flood-season storm destroys the upper portion of the external ramp. Rebuilding it costs 2 seasons.
  - Theory B: A corner notch collapses, killing 8 workers and blocking the internal ramp for 1 season. Skilled-worker shortage follows.
  - Theory C: A 2-year drought drops water reserves below operational levels. Vertical transport halts for 3 seasons.
  - Theory D: A bad batch of geopolymer weakens an entire course of blocks. 200 blocks must be replaced.

- **The Sneferu transition**: Sneferu's death is not a failure, but the loss of a known patron. Khufu is younger, more demanding, less patient with delays. The player's relationship with power changes.

---

## Stage 5: Pharaoh -- The Giza Complex

### Historical Site
**The Giza Plateau** (~2560-2510 BCE). The entire complex as one interconnected system:

| Structure | Pharaoh | Base (m) | Height (m) | Estimated Blocks | Estimated Mass (tons) |
|---|---|---|---|---|---|
| Great Pyramid | Khufu | 230 | 146 | 2,300,000 | 6,100,000 |
| Khafre's Pyramid | Khafre | 215 | 143 | 1,800,000 | 4,800,000 |
| Menkaure's Pyramid | Menkaure | 103 | 65 | 200,000 | 530,000 |
| Mortuary temples (x3) | Various | -- | -- | ~50,000 | ~130,000 |
| Valley temples (x3) | Various | -- | -- | ~30,000 | ~80,000 |
| Causeways (x3) | Various | -- | -- | ~40,000 | ~100,000 |
| Satellite pyramids (x6) | Various | ~20-45 | ~15-30 | ~30,000 | ~80,000 |
| The Sphinx + temple | Khafre | 73(L) | 20 | carved in situ | -- |
| Workers' village | -- | -- | -- | -- | -- |
| Enclosure walls/mastabas | Various | -- | -- | ~50,000 | ~130,000 |

**Total complex mass: ~12 million tons** (excluding Sphinx, which is carved from bedrock)

### Construction Theory
**All theories remain playable.** The player continues with their Stage 4 choice, or switches to Theory E. Each path creates a fundamentally different Stage 5 experience:

#### Theory E Path (Canonical / Recommended) -- with D+E Hybrid Casting Blend

The Giza complex becomes a **directed acyclic graph (DAG)** of material flow:

```
Quarries → Great Pyramid (overbuild)
              ↓ carve-down
           Khafre's Pyramid (overbuild)
              ↓ carve-down
           Menkaure's Pyramid (overbuild)
              ↓ carve-down
           Temples, causeways, walls, mastabas
```

**Phase structure per pyramid:**

1. **Build-up phase**: Construct a massive stepped trapezoid larger than the final pyramid form. Ramps are integrated into the overbuild mass -- not separate infrastructure. Bulk hauling operations: large unskilled workforce, maximum throughput.
   - Great Pyramid overbuild: ~8.5 million tons total (final pyramid + excess)
   - Excess material after carve-down: ~2.4 million tons → feeds Khafre

2. **Carve-down phase**: Skilled stonecutters work top-down, removing excess to reveal the final smooth pyramid faces. The removed stone is dressed and transported to the next structure's staging area.
   - Workforce shift: haulers → precision masons. Retooling event.
   - Output: steady stream of pre-cut blocks flowing downstream in the DAG
   - Bottleneck: downstream absorption. If Khafre's site is not ready to receive, you have a backpressure problem.

**The key coordination challenge**: The Great Pyramid's carve-down produces material for Khafre, but Khafre's build-up must be timed to absorb that material. Meanwhile, Khafre's eventual carve-down feeds Menkaure. The player must orchestrate a pipeline where each node transitions from consumer to producer at the right moment.

**The D+E Blend -- Ultimate Construction Method:**

If the player has unlocked hybrid casting (Stage 3 discovery or Stage 4 research), the Theory E path gains its deepest strategic layer. This is the game's canonical endgame system.

**The casting fraction slider** (0-35%) is now a primary strategic control for each pyramid in the cascade:
- At 0%: Pure Theory E. All blocks quarried and hauled. Maximum quality, maximum hauling cost.
- At 15-20%: Moderate hybrid. Overbuild mass is partially cast from quarry waste. Noticeable reduction in hauling labor. Natron supply chain from Wadi Natrun becomes a real logistical commitment (~140 donkey-loads/day).
- At 30-35%: Aggressive hybrid. Most overbuild is cast. Dramatic hauling savings. But natron dependency is high, cast blocks produce lower-quality cascade material, and the pounding pit / mixing operations dominate the workforce.

**Pounding pit operations at Giza scale:**
The pounding pit is the game's lowest-skill operation. Workers (or donkeys/oxen driving grinding stones) break quarry rubble into graded aggregate: ~60% coarse (10-30mm) and ~40% fine (<10mm). The pit runs year-round:
- **Peret and Shemu** (dry months): Pound aggregate and stockpile it. Animal labor frees humans for quarrying.
- **Akhet** (flood season): Consume stockpiled aggregate for casting. Floodwater delivers water to mixing stations. Idle farmers serve as basket carriers.

This seasonal decoupling -- produce aggregate when water is scarce, consume it when water is abundant -- is a natural rhythm that the player manages through stockpile sizing.

**The 4-tier workforce** under the D+E blend:
1. **Pounding pit** (unskilled/animal): Break rocks into smaller rocks. Year-round. Can use donkeys/oxen.
2. **Basket carriers** (seasonal unskilled): Carry slurry, fill molds, fetch water. Flood-season farmer labor.
3. **Mixers and casters** (semi-skilled): Manage ratios, binder prep, cure monitoring, mold setting. Learnable craft, developed within work gangs.
4. **Skilled permanent workers**: Casing stones, corner geometry, chamber construction, survey alignment, quality control. The titled workforce from the Wadi al-Jarf papyri.

**Quality propagation through the cascade DAG:**
This is the game's deepest long-range strategic trade-off. Cast overbuild blocks are reconstituted limestone -- structurally adequate but not identical to quarried stone. When the Great Pyramid's overbuild is carved down and the material cascades to Khafre:
- Quarried blocks from the carve-down arrive as premium pre-processed stone (same as pure Theory E)
- Cast blocks from the carve-down arrive as reconstituted limestone -- already partially disaggregated, easier to recast, but slightly lower quality with each generation
- The player can recast this material at Khafre (it is actually easier to disaggregate than fresh quarried stone), but each recasting degrades quality slightly
- A player who set the Great Pyramid's casting fraction to 35% sends mostly reconstituted material downstream, constraining quality options at Khafre
- A player who kept casting at 10-15% pays more at the Great Pyramid but sends premium material downstream, preserving strategic flexibility

The cascade DAG does not just flow material downstream -- it flows **consequences**. The casting fraction at Khufu shapes what is possible at Khafre and Menkaure. This is the kind of long-horizon strategic depth that rewards planning across the full Giza complex, not just one pyramid at a time.

**Natron supply chain from Wadi Natrun:**
At 25% casting fraction across the Great Pyramid's overbuild:
- ~8-10 tons of natron per day (vs. ~33 tons/day for full Theory D)
- ~140 donkey-loads daily, ~500-800 donkeys continuously in transit on the 100km Wadi Natrun route
- A dedicated logistics operation: route maintenance, water stations for animals, stockpile buffer against disruption
- Not as extreme as full Theory D, but a real commitment that the player must plan and maintain
- Alternative alkali sources (burned plant ash, natron-rich flood crusts) can supplement but not replace the Wadi Natrun supply

#### Theory A Path (External Ramp at Giza Scale)

The player must solve the ramp volume problem. A straight ramp to 146m at 8% gradient extends 1.8km. Options:
- Spiral wrap-around ramp (obscures alignment -- new challenge mechanic)
- Multiple shorter ramps for different height zones
- Ramp material: ~2.6 million cubic meters, nearly matching the pyramid itself

This path emphasizes raw material throughput above all else. The player is running two mega-projects simultaneously: the pyramid and the ramp. Success requires the largest workforce and the highest sustained output.

#### Theory B Path (Internal Ramp at Giza Scale)

The internal ramp works elegantly up to ~100m. Above that, the ramp becomes very narrow and corner turns become the binding constraint. The player must solve:
- Corner throughput: at 4 corners, each with a 90-degree turn, the maximum block-per-hour rate is fixed by turning speed
- Grand Gallery counterweight system for the heaviest granite beams (60-80 tons)
- Skilled worker pipeline: 800+ precision masons needed, 3-season training pipeline

This path emphasizes workforce quality over quantity. Smaller teams, higher skill, catastrophic consequences for accidents.

#### Theory C Path (Hydraulic at Giza Scale)

The water infrastructure investment is immense but transforms vertical transport:
- Canal system from Nile to Giza harbor (historically confirmed)
- Internal water channels with lock systems
- Cistern network for drought resilience (minimum 3 years' water reserve)

This path emphasizes infrastructure investment. The first 5 flood cycles are mostly canal/lock construction with minimal pyramid work. Then, once the hydraulic system is operational, block placement accelerates dramatically. High variance: great flood years = peak output; drought years = near-zero.

#### Theory D Path (Geopolymer at Giza Scale)

Cast-in-place at this scale requires industrial-scale mixing operations:
- 50+ mixing stations on the pyramid work face
- Thousands of wooden molds, replaced every 20-30 uses
- Quality control across 2.3 million blocks
- Raw material supply: aggregate from local quarries, Gypsum from Fayum, natron from Wadi Natrun

This path emphasizes process engineering and quality control. The supply chain is lighter (baskets instead of sledges), but the manufacturing process is complex and failure-prone at scale.

### Core Challenge
**Multi-generational systems design.** The Giza complex spans three pharaohs' reigns:

| Pharaoh | Approximate Reign | Primary Structure |
|---|---|---|
| Khufu | 23 years | Great Pyramid |
| Djedefre | 8 years | (builds at Abu Rawash -- offscreen but affects resource allocation) |
| Khafre | 26 years | Khafre's Pyramid, Sphinx |
| Menkaure | 18 years | Menkaure's Pyramid |

The player's system must survive:
- **Leadership transitions**: Each new pharaoh has different priorities, patience, and resource budgets. Khufu is ambitious and generous. Djedefre redirects resources to Abu Rawash (supply disruption). Khafre is competitive (wants his pyramid to look taller than Khufu's). Menkaure is pragmatic (smaller pyramid, granite casing on lower courses).
- **Workforce turnover**: A 20-year project means the workforce turns over. Experienced workers retire or die. New workers must be trained. Institutional knowledge degrades without scribes and record-keeping (Papyrus as critical resource).
- **Infrastructure decay**: Barges rot, canals silt up, ramps erode, tools wear out. Maintenance is not optional -- it is a permanent resource drain.
- **Nile variance**: Over 50+ flood cycles, the player will experience droughts, mega-floods, and everything between. Systems must be resilient to the full range.

### Contract Structure

**Contract: "Horizon of Khufu"**

This is a multi-phase, multi-generation contract -- the only one in the game that spans multiple pharaohs.

```
Phase 1 -- Khufu's Great Pyramid (20 flood cycles / 60 seasons):
  Required output:  Theory-dependent, approximately:
    - 800 Limestone + 150 DressedStone + 15 Granite/season (sustained average)
    - Peak seasons may require 1,200+ Limestone (build-up) or 200+ DressedStone (carve-down)
  Key resources:    Limestone, DressedStone, Granite, Gypsum, CopperTools,
                    Wood, Rope, Barges, Bread, Beer, Water, Grain, Sand,
                    Alabaster (sarcophagus chamber), Gold (burial goods)
  Constraints:
    - Worker satisfaction >= 60% (kingdom-wide average)
    - Maximum 5 missed delivery seasons across 60
    - Aswan granite: minimum 8 blocks/season during flood, zero tolerance for missed granite
    - Alabaster: 20 blocks total from Hatnub (Middle Egypt) for chamber lining
    - Gold: 50 units total from Nubia for burial goods
  Workers:          4 crews (~8,000 permanent) + 15,000 seasonal corvee during Akhet
  Sites:            Giza plateau, Giza local quarry, Tura quarry, Aswan quarry,
                    Hatnub quarry, Sinai copper mines, Wadi Natrun (natron, Theory D),
                    Lebanon cedar trade post, Nubia gold trade post,
                    Nile landings x8, workers' villages x6, bakeries x4,
                    breweries x3, granaries x6, tool forges x3
```

```
Phase 2 -- Khafre's Pyramid (18 flood cycles / 54 seasons):
  Required output:  ~600 Limestone + 120 DressedStone + 10 Granite/season
  Special:          Granite casing on lowest 2 courses (Aswan logistics critical)
                    The Sphinx carved from bedrock (dedicated skilled crew, minimal material logistics)
  Constraints:
    - Maintain all Phase 1 constraints
    - Sphinx completion within first 8 flood cycles of Phase 2
    - Theory E: absorb carve-down output from Great Pyramid without backpressure
```

```
Phase 3 -- Menkaure's Pyramid (12 flood cycles / 36 seasons):
  Required output:  ~200 Limestone + 50 DressedStone + 20 Granite/season
  Special:          Granite casing on lower 16 courses (proportionally more granite-intensive)
                    Smaller pyramid but higher granite ratio makes Aswan logistics critical
  Constraints:
    - Maintain satisfaction >= 55% (smaller workforce, less margin)
    - Complete all remaining temples, causeways, and enclosure walls
    - Theory E: absorb Khafre carve-down and distribute to all remaining structures
```

```
Phase 4 -- Legacy (open-ended):
  Complete all ancillary structures. Ensure the complex can be maintained by a skeleton crew.
  The player's system must demonstrate it can run without active intervention for 4 consecutive
  flood cycles (the "legacy test").
```

**Bonus objectives (across all phases):**
- Complete the Great Pyramid in 18 flood cycles or fewer
- Zero worker fatalities from structural failures (requires robust safety inspections)
- Achieve "Eternal System" rating: all supply chains self-sustaining for 8+ flood cycles without intervention
- Complete Theory E cascading pipeline with zero backpressure events (no downstream site at full stockpile when upstream carve-down delivers)
- Achieve maximum pharaoh confidence with all three pharaohs
- Build all six satellite pyramids (optional -- for queen burials)

### Unlocks
Stage 5 is the final stage. There are no unlocks in the traditional sense. Instead, the rewards are:

- **Completion rankings** (SpaceChem-style): total flood cycles to complete, peak throughput achieved, minimum satisfaction maintained, theory used. Leaderboard comparison with other players.
- **Sandbox mode**: Unlimited resources, any site, any theory. Build whatever you want.
- **New Game+**: Replay the full career with harder constraints (tighter contracts, more Nile variance, higher satisfaction thresholds).
- **Theory mastery badges**: Completing Giza with each theory demonstrates mastery of that playstyle.

### Failure Narratives

Stage 5 does not have a single scripted failure event. Instead, the scale and duration create emergent failure opportunities. The design provides several historically-grounded crisis events that may trigger based on game state:

**"The Drought of Year 12":**
Triggered if: the player has not built adequate water reserves (cisterns < 2 years' supply) by flood cycle 12.
> The Nile floods at 60% of normal. Crop yields collapse. Food stores deplete within 2 seasons. Workers begin leaving. Quarry output drops 40%.

The player must triage: reduce workforce to match food supply, activate emergency grain imports from Delta granaries, and scale back construction temporarily. Theory C players are hit hardest (no water = no vertical transport). Theory D players suffer quality problems (geopolymer needs water for mixing and curing).

**"The Granite Crisis":**
Triggered if: the player has not secured redundant Aswan transport by flood cycle 8.
> A barge carrying 3 granite beams for the King's Chamber sinks in the First Cataract. The beams are irreplaceable in the current flood season. The King's Chamber timeline slips by 1 year.

This forces the player to reckon with single points of failure in long-distance supply chains. The lesson: critical-path resources need redundancy.

**"Pharaoh's Death":**
Triggered at historically appropriate points (Khufu dies after ~23 years, Khafre after ~26 years).
> The pharaoh is dead. Construction halts for 70 days of mourning. The new pharaoh's priorities differ. Resource allocations shift. Some governors are replaced. Your policies may be overridden.

Each succession is a stress test for the player's system. Well-automated systems survive with minimal disruption. Fragile, manually-managed systems may collapse during the transition.

**"The Workers' Strike":**
Triggered if: satisfaction drops below 45% for 2 consecutive seasons at any major site.
> Workers at [site] refuse to work. They demand better rations, rest days, and medical care. Production halts until demands are met or 1 season passes (whichever comes first).

Historically grounded: the earliest recorded labor strike occurred at Deir el-Medina during the reign of Ramesses III, but labor disputes certainly occurred earlier. This event teaches that worker satisfaction is not a vanity metric -- it is a production constraint.

---

## Resource Progression Summary

How the resource palette expands across stages:

| Resource | Stage 0 | Stage 1 | Stage 2 | Stage 3 | Stage 4 | Stage 5 |
|---|---|---|---|---|---|---|
| Water | core | yes | yes | yes | yes | yes |
| Grain | core | yes | yes | yes | yes | yes |
| Bread | intro (0a) | core | yes | yes | yes | yes |
| Beer | intro (0a) | core | yes | yes | yes | yes |
| Clay | intro (0b) | core | yes | yes | yes | yes |
| MudBricks | intro (0b) | core | yes | yes | yes | yes |
| Limestone | intro (0c) | core | core | yes | yes | yes |
| CopperTools | intro (0c) | yes | core | yes | yes | yes |
| DressedStone | -- | -- | intro | core | yes | yes |
| Sand | -- | -- | intro | yes | yes | yes |
| Wood | -- | -- | intro | yes | yes | yes |
| Rope | -- | -- | intro | yes | yes | yes |
| Gypsum | -- | -- | -- | intro | yes | yes |
| Barges | -- | -- | -- | intro | yes | yes |
| Granite | -- | -- | -- | intro | core | yes |
| Papyrus | -- | -- | -- | -- | intro | core |
| GeopolymerMix | -- | -- | -- | -- | Theory D | Theory D |
| CrushedAggregate | -- | -- | -- | -- | hybrid | hybrid/core |
| Natron (casting) | -- | -- | -- | discovery | hybrid | hybrid/core |
| Alabaster | -- | -- | -- | -- | -- | intro |
| Gold | -- | -- | -- | -- | -- | intro |

"core" = central to the stage's challenge. "intro" = first appears. "yes" = available and relevant. "hybrid" = available when hybrid casting is active. "discovery" = first discoverable.

**New resources not in current ResourceType enum:**
- **Alabaster** (raw) -- from Hatnub, Middle Egypt. Used for chamber linings and luxury items. Rare, expensive to transport. Needed only in Stage 5 for pharaonic burial chambers.
- **Gold** (raw) -- from Nubia, far south. Used for burial goods, temple decoration, and diplomatic gifts. Extremely limited supply. Needed only in Stage 5.
- **CrushedAggregate** -- processed quarry waste from pounding pits. Graded to 60% coarse (10-30mm) / 40% fine (<10mm). Produced year-round by pounding pit labor (unskilled workers or animals). Consumed during flood-season casting operations. First available at Stage 3 (discovery) or Stage 4 (research unlock).
- **Natron (casting-scale)** -- same material as mortar-grade natron, but at much higher volume. At 25% casting fraction, ~8-10 tons/day vs. the trace amounts used for mortar. Requires dedicated Wadi Natrun supply chain commitment from Stage 4 onward.

Note: Alabaster and Gold are referenced in the existing DESIGN.md resource model and should be added to the ResourceType enum. CrushedAggregate and casting-scale Natron should be added when hybrid casting is implemented.

### Pounding Pit and Hybrid Casting Workforce

The pounding pit introduces a new workforce tier that sits below all existing labor categories. It is the game's simplest operation and the first to use animal labor as a primary production method.

| Role | Workers/Animals | Skill Level | Stage Available | Seasonal Pattern |
|---|---|---|---|---|
| **Pounding pit operators** | 50-200 workers OR 20-80 donkeys/oxen | Unskilled / animal | Stage 3 (discovery) | Year-round. Stockpile aggregate during dry months. |
| **Aggregate screeners** | 20-50 workers | Unskilled | Stage 3 (discovery) | Year-round. Screen pounded rubble through reed baskets for size grading. |
| **Basket carriers (casting)** | 500-2,000 workers | Unskilled | Stage 4 (scale-up) | Akhet only. Idle farmers carry slurry to pour points. |
| **Mixers** | 100-400 workers | Semi-skilled | Stage 4 (scale-up) | Akhet primarily. Manage ratios, binder prep, mix consistency. 1-2 weeks training. |
| **Casting supervisors** | 20-50 workers | Skilled | Stage 4 (scale-up) | Akhet primarily. Mold geometry, cure monitoring, quality control. Drawn from existing mason pool. |

At Stage 5 (Giza) with a 25% casting fraction under the D+E blend, the hybrid casting workforce adds roughly 1,500-3,000 workers to the base Theory E workforce during flood season, plus year-round pounding pit operations (which can be largely animal-powered). The pounding pit's animal labor is significant: donkeys or oxen driving grinding stones in circular pits, the same principle as contemporary grain milling. This means aggregate production scales without competing for the human labor needed in higher-skill roles.

### Quarrying Methods and Tool Alternatives

CopperTools appear in Stage 0c and remain present throughout, but historically copper/bronze tools were NOT the only quarrying method. The game should model multiple quarrying techniques as a strategic choice for the player:

- **Copper/bronze tools** (chisels, saws): Fast, precise, essential for fine dressing and limestone cutting. But they wear out and require the Sinai supply chain (20-tick overland or 8-tick via Wadi al-Jarf). Best for: Tura casing stone, precision work, DressedStone production.

- **Dolerite pounders**: Nearly indestructible stone balls used to pound granite into shape. Historically confirmed at Aswan. Extremely slow and labor-intensive, but require no consumable supply chain. Best for: Aswan granite quarrying where copper tools are ineffective against the hardness anyway.

- **Fire-setting**: Heat rock faces with fire, then douse with water to fracture. Effective for hard stone and initial block extraction. Requires Wood (fuel, imported/scarce) and Water (seasonal). Best for: granite quarrying, opening new quarry faces.

- **Wooden wedge expansion**: Drill holes along a desired fracture line, insert dry wooden wedges, soak with water. The expanding wood cracks the stone cleanly. Minimal consumables but slow (requires soaking/curing time). Best for: controlled limestone block extraction at local quarries.

**Design implication**: Different quarry sites should favor different methods. Aswan granite is too hard for copper tools -- dolerite pounders and fire-setting are required. Tura limestone yields to copper chisels efficiently. Local limestone can be extracted with wooden wedges to conserve copper. The player's choice of method at each quarry site becomes a strategic decision: spend copper for speed, or conserve copper by using slower alternatives? This turns the Sinai copper pipeline from a binary constraint into one factor in a richer optimization problem.

The CopperTools row in the resource table above should be understood as representing the general "quarrying tools/methods" budget, with copper being the fastest but not the only option.

---

## Theory-to-Site Pairing Summary

| Stage | Site | Theory | Why This Pairing Works |
|---|---|---|---|
| 1 | Mastabas at Saqqara | Manual hauling (baseline) | Simple structure, no height challenge, establishes fundamentals |
| 2 | Step Pyramid at Saqqara | Accretion layers (proto-E) | Stacking mastabas = accretion concept. Ramps become part of structure. Seeds Theory E |
| 3a | Meidum Pyramid | External ramp (Theory A) | Retrofitting a step pyramid with casing requires external access. Theory A is the obvious choice -- and it fails |
| 3b | Bent Pyramid at Dahshur | External ramp (Theory A) | Steep angle maximally stresses external ramps. The theory's scaling limit becomes visceral |
| 4 | Red Pyramid at Dahshur | Player's choice (A/B/C/D) | Conservative angle = manageable scale for any theory. Proving ground before Giza |
| 5 | Giza Complex | Player's choice (A/B/C/D/E) | Maximum scale. Theory E emerges as the synthesis of all prior lessons |

The pairing is designed so that the player experiences Theory A's failure organically (Stages 3a and 3b), is offered alternatives (Stage 4), and then confronts the ultimate scaling challenge (Stage 5) where Theory E's cascading-material insight becomes the elegant solution to every problem they have encountered.

---

## Automation Progression

Each stage introduces new automation capabilities that let the player manage increasing scope:

| Stage | New Automation | What It Replaces |
|---|---|---|
| 0 (Tutorial) | None (fully manual) | -- |
| 1 (Foreman) | Task queues | Manual worker-to-task assignment |
| 2 (Overseer) | Route automation, stockpile thresholds | Manual transport dispatching, manual production switching |
| 3 (Governor) | Governor policies, alert systems | Manual monitoring of all sites, manual crisis response |
| 4 (Vizier) | Regional governance (AI governors), multi-year planning | Manual policy management per site |
| 5 (Pharaoh) | Full delegation, legacy systems | Everything. The player designs the system; the system runs itself |

The critical design principle: **automation is never taken away.** Each stage adds a layer. The player can always zoom back down to any previous level of control. But the game rewards designing systems that do not require constant manual intervention.

---

## Timing and Pacing

| Stage | Duration (flood cycles) | Duration (seasons) | Approx. Real Play Time |
|---|---|---|---|
| 0 (Tutorial) | ~2 | ~7 | 20-40 minutes |
| 1 (Foreman) | < 1 | 2 | 15-30 minutes |
| 2 (Overseer) | 3 | 9 | 1-2 hours |
| 3 (Governor) | 4 + 5 = 9 | 12 + 15 = 27 | 3-5 hours |
| 4 (Vizier) | 8 + planning | 24 + planning | 4-6 hours |
| 5 (Pharaoh) | 50+ | 150+ | 10-20+ hours |
| **Total** | **~72+** | **~217+** | **~21-36+ hours** |

Stage 5 is intentionally the longest by a wide margin. It is the endgame. The player has spent 10-15 hours learning systems, and now they deploy everything they know across a multi-generational megaproject.

---

## Difficulty Scaling Levers

For tuning difficulty across stages and difficulty settings:

1. **Nile variance**: Low floods can be +-10% (easy) to +-40% (hard). Drought frequency: every 8-12 cycles (easy) to every 4-6 cycles (hard).
2. **Contract strictness**: Missed delivery tolerance ranges from 20% (easy) to 5% (hard). Satisfaction thresholds range from 40% (easy) to 70% (hard).
3. **Tool wear rate**: CopperTools consumption per block: 0.05 (easy) to 0.3 (hard). Note: this applies to copper tool methods; dolerite pounders and wooden wedges have separate (slower but non-consumable or low-consumable) effectiveness curves. See "Quarrying Methods and Tool Alternatives" above.
4. **Worker turnover**: Retirement/death rate per flood cycle: 2% (easy) to 8% (hard). Training time for skilled workers: 1 season (easy) to 4 seasons (hard).
5. **Event severity**: Failure events (Meidum collapse, Bent Pyramid cracks) can destroy 20% (easy) to 60% (hard) of completed work.
6. **Pharaoh patience**: Confidence drain per missed delivery: 2% (easy) to 10% (hard).
