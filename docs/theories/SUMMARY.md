# Construction Theories: Comparative Summary

Quick-reference synthesis of the five theory deep dives plus the hybrid casting composable technique. Individual files have the detail; this is for side-by-side comparison and design decisions.

---

## 1. Side-by-Side Comparison

| Parameter | A: External Ramp | B: Internal Spiral | C: Hydraulic Lift | D: Geopolymer | E: Accretion Overbuild |
|---|---|---|---|---|---|
| **Peak workforce** | 25,000-30,000 | 20,000-25,000 (Phase 1), 8,000-12,000 (Phase 2) | 20,000-30,000 (incl. ~2,100 hydraulic specialists) | 7,000-12,000 | 20,000-30,000 (build-up), 7,000-12,000 (carve-down) |
| **Peak resource demand** | Ramp fill (~2.7M m3 for straight), wood for sledges/cross-timbers, rope | Skilled masons for corridor construction, timber for sledges + lamps/oil | Water (38,000 m3/day with recycling), timber for sluice gates, stone for shaft walls | Natron (~33 tons/day), crushed aggregate, kaolinite clay, lime | Stone volume 38-50% above final pyramid mass, copper tools for carve-down |
| **Seasonal dependency** | Moderate. Akhet = peak hauling (labor available). Quarrying year-round. | Moderate. Same Akhet labor surge for Phase 1. Phase 2 less seasonal (smaller skilled crew). | Extreme. Hydraulic lift tied to Nile flood levels. Drought = full shutdown. | Low. Heat accelerates curing. Clay collection better in Akhet. Natron supply year-round. | Moderate. Standard Akhet labor surge. Carve-down can proceed year-round with skilled crew. |
| **Time estimate (Great Pyramid)** | 13-23 years | 17-21 years | 20+ years (hybrid approach assumed) | ~20 years | 18-22 years (excludes downstream cascade) |
| **Scaling behavior** | Degrades sharply. Ramp volume grows cubically with height; past ~60m ramp dominates project. | Improves. Internal ramp corridor stays constant cross-section; shorter revolutions at height. | Mixed. Lock cycle time is fixed per chamber; throughput hits hard ceiling regardless of workforce. | Degrades linearly. Carry distance increases with height but offset by fewer blocks per course. | Favorable. Ramps widen where volume is greatest; narrow where volume is least. |
| **Critical bottleneck** | Ramp-vs-pyramid resource competition (labor, water, wood, management bandwidth) | Skilled labor pipeline (masons who can build corridor, corner-notch crews) | Water supply and shaft integrity (single point of failure) | Natron supply from Wadi Natrun (100km donkey caravan, ~470 loads/day) | Downstream absorption rate (carve-down output must match next structure's build-up intake) |
| **Unique mechanic** | Dual competing supply chains (pyramid + ramp) that invert over time | Two-phase system with workforce skill transition; Grand Gallery counterweight | Front-loaded infrastructure; seasonal burst operations; dual supply chain (stone + water) | Process engineering (recipe tuning, curing schedules); basket carriers replace sledge teams | Bidirectional material flow; structures as both consumer and producer; cascading DAG across complex |

### Hybrid Casting -- Composable Technique (not a standalone theory)

Hybrid casting is not Theory F. It is a **composable technique** that layers onto any quarry-based theory (A, B, C, or E). It converts quarry waste -- the ~30% of extracted limestone that becomes dust, chips, and rubble during cutting and dressing -- into cast-in-place blocks using a geopolymer reaction (natron + kaolinite clay + water + crushed limestone aggregate). See `hybrid-casting.md` for the full treatment.

| Parameter | Hybrid Casting (composable) |
|---|---|
| **What it replaces** | A fraction (0-35%) of quarried blocks, player-controlled via a casting fraction slider |
| **Peak additional workforce** | Pounding pit crew (unskilled/animal), seasonal basket carriers, semi-skilled mixers. Adds 1,000-4,000 workers to the base theory's workforce depending on casting fraction |
| **Peak additional resource demand** | Natron (~8-10 tons/day at 25% casting fraction), water (flood-season dependent), pounding pit infrastructure |
| **Seasonal dependency** | High. Casting is best during Akhet: flood delivers water to the plateau, idle farmers provide basket-carrier labor, aggregate stockpiled during dry months is consumed |
| **Critical bottleneck** | Natron supply from Wadi Natrun (100km donkey caravan, ~140 loads/day at 25% fraction -- substantial but not the ~470/day that full Theory D requires) |
| **Unique mechanic** | Casting fraction slider (strategic trade-off), pounding pit operations (lowest-skill work in the game, animal-powered), quality propagation through the cascade DAG |
| **Best composition** | Theory E (accretion overbuild). Overbuild mass is the ideal casting candidate -- interior, temporary, high-volume, at the working face. Cast overbuild is cheaper to build up and easier to carve down |

---

## 2. Supply Chain Topology

### A: External Ramp -- **Dual Pipeline (competing)**

Two parallel pipelines drawing from overlapping resource pools:

```
Quarry ──→ Sledge ──→ Ramp ascent ──→ Placement    (pyramid chain)
Rubble/Mud ──→ Ramp extension ──→ Ramp surface      (ramp chain)
```

Topology: two hub-and-spoke systems sharing a common labor/water/wood hub. Starts as primary + trivial secondary; ends as two co-equal pipelines competing for the same inputs. The inversion point (~60m height) is the key design event.

### B: Internal Spiral -- **Sequential Pipeline with Phase Gate**

```
Phase 1: Quarry ──→ External ramp ──→ Placement (brute-force, parallel)
              └──→ Build corridor into each course (concurrent)
Phase 2: Quarry ──→ Internal ramp mouth ──→ Corridor ascent ──→ Exit onto course ──→ Placement (serial, single-file)
              └──→ Grand Gallery counterweight (granite only, Phase 1)
```

Topology: pipeline with a hard phase transition at ~43m. Phase 1 is wide/parallel; Phase 2 is narrow/serial with corner-notch chokepoints. The Grand Gallery is a side-channel for heavy loads only.

### C: Hydraulic Lift -- **Dual Pipeline (complementary)**

```
Stone chain: Quarry ──→ Staging ──→ Shaft base ──→ Lock ascent ──→ Course placement
Water chain: Nile ──→ Canal ──→ Settling basin ──→ Shaft feed ──→ Lock chambers ──→ Drain ──→ Return/recycle
```

Topology: two independent pipelines that converge at the shaft. Opposite seasonal profiles (stone quarried dry season, lifted wet season). Staging area is the buffer absorbing the mismatch. Single point of failure at shaft.

### D: Geopolymer -- **Web / DAG (multi-input convergence)**

```
Disaggregation site ──→ Crushed aggregate ──┐
Wadi Natrun ──→ Natron ──────────────────────┼──→ Binder prep ──→ Mixing station ──→ Pour point
Nile floodplain ──→ Kaolinite clay ──────────┤
Lime kilns ──→ Quicklime ───────────────────┘
Nile ──→ Water ──→ (binder prep + mixing + curing)
```

Topology: convergent DAG. Five distinct input streams from four geographic sources merge at mixing stations on the pyramid itself. No single heavy-object transport -- the heaviest unit is a 25kg basket. The natron stream is the critical path; all others have slack.

### E: Accretion Overbuild -- **Inter-structure DAG (cascading)**

```
Quarry ──→ Great Pyramid trapezoid (build-up) ──→ Carve-down output ──→ Khafre trapezoid ──→ Carve-down ──→ Menkaure ──→ Temples
```

Topology: directed acyclic graph across the entire complex. Each structure is a node with two phases (consumer during build-up, producer during carve-down). Material flows bidirectionally on each structure (up during build-up, down during carve-down) and unidirectionally between structures. The quarry supplements, not dominates, the inter-structure flow for downstream nodes.

### Hybrid Casting Layer (composable onto any quarry-based topology)

```
                                        ┌──→ Pounding pit ──→ Graded aggregate ──┐
Quarry waste (dust, chips, rubble) ─────┤                                         ├──→ Mixing station ──→ Pour point
                                        └──→ Direct fine dust ───────────────────┘          ↑
Wadi Natrun ──→ Natron ─────────────────────────────────────────────────────────────────────┤
Nile floodplain ──→ Kaolinite clay ─────────────────────────────────────────────────────────┤
Nile ──→ Water (flood season) ──────────────────────────────────────────────────────────────┘
```

Topology: a secondary convergent DAG that taps the quarry waste stream of the base theory. The pounding pit is a buffer/processing node that decouples waste generation (year-round) from casting consumption (flood season). When composed with Theory E, the mixing station sits on the overbuild working face -- slurry carry distance is minimal because you are casting blocks exactly where they are needed.

---

## 3. Gameplay Differentiation

### A: External Ramp -- "The Slow Inversion"

**Core puzzle**: The ramp starts as a trivial side project and ends as the dominant logistics challenge. The player must anticipate a crossover that happens gradually, then suddenly. Early optimization of pyramid throughput is undone by ramp scaling. The player who ignores the ramp for the first 5 years hits a wall at year 8.

**Feels like**: Managing two growing businesses that share one bank account. The "side hustle" (ramp) eats the "main business" (pyramid).

### B: Internal Spiral -- "The Precision Bottleneck"

**Core puzzle**: You trade material problems for people problems. The corridor must be built perfectly into every course -- errors are buried under stone and cannot be corrected. Skilled masons are the bottleneck, and training them takes time. The Grand Gallery counterweight is a one-shot operation (all granite must be placed before ~60m).

**Feels like**: Running a software team where senior engineers are scarce. You can hire juniors, but they produce bugs. Shipping granite via the Grand Gallery is your database migration -- do it now or do it never.

### C: Hydraulic Lift -- "The Infrastructure Bet"

**Core puzzle**: Massive up-front investment before any block moves vertically. The shaft, locks, canals, and reservoirs consume years of labor before they produce output. Then throughput is gated by the Nile -- a variable you cannot control. A drought year after heavy investment is devastating.

**Feels like**: Building a data center before you have customers. When the traffic comes (flood season), your system either handles it or it doesn't. No partial credit.

### D: Geopolymer -- "The Factory Floor"

**Core puzzle**: Replace the heavy-lift problem with a chemistry/process-engineering problem. The bottleneck is the natron supply chain (100km donkey caravan, single source). Recipe consistency determines block quality -- a bad batch weakens structures invisibly, with consequences weeks later. No sledge teams, no ramps, no coordination of heavy objects.

**Feels like**: Running a concrete plant. Raw material ratios, quality control, supply chain for a critical reagent from a distant source. Your workers carry baskets, not boulders.

### E: Accretion Overbuild -- "The Living Pipeline"

**Core puzzle**: Every overbuild decision propagates. More overbuild = easier ramps but longer carve-down and more material to absorb downstream. The build-up-to-carve-down transition is a workforce retooling event. Material flows between structures, creating backpressure if timing is off. The whole complex is one system.

**Feels like**: Factorio's production chains, where output from one factory feeds the next. The satisfaction of the carve-down reveal -- watching the smooth pyramid emerge from the rough trapezoid -- is the payoff for years of unglamorous bulk hauling.

### D+E Blend -- "The Ultimate System"

**Core puzzle**: Theory E provides the construction geometry (overbuild trapezoid, integrated ramps, cascade DAG). Hybrid casting provides the material efficiency (cast the overbuild from quarry waste instead of hauling every block as a 2.5-ton monolith). The player controls the casting fraction slider (0-35%), balancing cost savings against quality trade-offs that propagate through the entire cascade DAG.

The strategic depth comes from quality propagation: cheap cast overbuild at Khufu is easy to build and easy to carve, but when that carved material cascades to Khafre, it arrives as lower-quality reconstituted limestone. The player can recast it (easier than recasting quarried stone -- already disaggregated), but each recasting generation degrades slightly. A player who cranks the casting slider to 35% at Khufu builds fast and cheap, but constrains their options at Khafre and Menkaure. A player who keeps casting at 15% pays more for the Great Pyramid but sends premium material downstream. This is the game's deepest long-range strategic trade-off.

**Feels like**: Theory E's Factorio pipeline, but now each factory node has a quality dial. Turning it toward "cheap" makes your current factory easier but degrades the input stream for every downstream factory. The player who thinks one pyramid ahead wins.

---

## 4. Resource Overlap and Divergence

### Shared Across All Theories

| Resource | Notes |
|---|---|
| **Limestone** | Core building material in every theory, though form differs (cut blocks vs. crushed aggregate in D) |
| **Copper tools** | Universal for quarrying/cutting. Wear rate is a constant pressure across all theories. |
| **Wood** | Sledges, levers, structural timber. Every theory consumes it; supply is always imported/constrained. |
| **Food (bread, beer)** | Worker sustenance. Scales with workforce size. |
| **Water (basic)** | Drinking, mortar mixing. Universal minimum. |
| **Rope** | Hauling consumable (3-7 day lifespan). Less critical for D (no sledge hauling). |
| **Labor (unskilled)** | Seasonal conscripts during Akhet. Size varies by theory. |

### Theory-Specific Resources

| Resource | Theory | Role |
|---|---|---|
| **Ramp fill** (rubble, tafla, mudbrick) | A | Enormous quantities for external ramp construction. Not needed by B/C/D/E. |
| **Skilled masons** (corridor builders) | B | Must build ramp corridor into every course. Training pipeline is the bottleneck. |
| **Oil/fuel for lamps** | B | Interior ramp lighting. Unique operational cost. |
| **Water (industrial-scale)** | C | 38,000 m3/day for lock operations. Orders of magnitude beyond other theories' water needs. |
| **Shaft infrastructure** (fitted stone, sluice gates, waterproofing) | C | Canal, settling basin, lock chambers. No other theory needs this. |
| **Natron** | D | Alkali activator from Wadi Natrun. ~33 tons/day. Entire theory depends on this single reagent. |
| **Kaolinite clay** | D | Aluminosilicate source for geopolymer binder. Abundant but requires organized collection. |
| **Quicklime** | D | Burned limestone for binder. Requires fuel (wood/dung) for kilns. |
| **Wooden forms/molds** | D | 340-680 active form sets, continuously cycled. Form wear is a unique resource drain. |
| **Overbuild stone** (pre-processed blocks from upstream structure) | E | The cascading material. Not a raw resource -- it is generated by the carve-down phase. |
| **Survey instruments** (plumb bobs, sighting rods, string lines) | E | Precision carve-down requires survey reference systems not needed by bulk-build theories. |
| **Natron** (partial) | Hybrid casting | Alkali activator, same as D but at reduced scale (~8-10 tons/day at 25% casting fraction vs. ~33 tons/day for full D). Wadi Natrun supply chain required. |
| **Crushed aggregate** (from pounding pit) | Hybrid casting | Processed quarry waste. Pounding pit reduces rubble to graded aggregate (60% coarse / 40% fine). Lowest-skill operation; can use animal labor. |
| **Pounding pit labor** (unskilled/animal) | Hybrid casting | Donkeys or oxen driving grinding stones in circular pits. Year-round operation, stockpiling aggregate for flood-season casting. |

### Resource Pressure Map

```
                 A     B     C     D     E     E+Hybrid
Copper tools:    +++   ++    ++    +     +++   ++    (casting fraction reduces cutting)
Wood:            +++   ++    +++   ++    ++    ++    (tension molds, not timber formwork)
Water:           ++    +     +++++  +    ++    +++   (casting needs flood-season water)
Unskilled labor: +++++ +++   +++   ++    ++++ +++++ (pounding pit + basket carriers)
Skilled labor:   ++    +++++ ++    +++   ++++ +++   (mixers are semi-skilled, not master masons)
Rope:            +++++ +++   ++    +     ++++ +++   (less sledge hauling for cast blocks)
Natron:          -     -     -     +++++ -    +++   (scaled to casting fraction)
```

---

## 5. Theory-to-Stage Mapping Recommendation

Based on PROGRESSION.md's five career stages and the narrative arc of "replaying Egypt's R&D history."

| Career Stage | Recommended Theory | Why |
|---|---|---|
| **Stage 1: Foreman** (Mastabas) | Pre-theory baseline | No theory needed. Manual hauling. Teaches resource triangle. The control case. |
| **Stage 2: Overseer** (Step Pyramid) | Proto-Theory E (accretion layers) | Step pyramid = stacked mastabas with inward-leaning accretion layers. Ramps become part of the structure. Plants the seed of the overbuild concept without naming it. Introduces vertical logistics. |
| **Stage 3: Governor** (Meidum + Bent Pyramid) | **Theory A** (External Ramp) + **Hybrid casting discovery** | The Bent Pyramid is the canonical external-ramp scenario. Theory A proves its limits. After the Bent Pyramid crisis, the hybrid casting discovery event fires: workers notice hardened dust after the flood. The player can invest in investigating, leading to a small-scale casting experiment. This is a composable technique discovery, not a theory switch. |
| **Stage 4: Vizier** (Red Pyramid + Giza prep) | **Theory B** or **Theory C** (player's choice) + **Hybrid casting available** | After external ramps fail at the Bent Pyramid, the player needs a new approach. Theory B, C, or D become available. Hybrid casting is now a proven technique: the player can allocate a fraction of blocks to casting with any quarry-based theory. The Red Pyramid's generous mass (especially under Theory E geometry) is ideal for testing hybrid casting at scale. |
| **Stage 5: Pharaoh** (Giza Complex) | **Theory E** (Accretion Overbuild) + **D+E blend** -- canonical path | The full complex demands multi-structure coordination. Theory E provides the construction geometry; hybrid casting provides material efficiency. The D+E blend is the game's ultimate construction method: quarried stone for permanent core/casing, cast stone for overbuild mass, cascade flows increasingly process-ready material downstream. The casting fraction slider, pounding pit operations, and quality propagation through the cascade DAG create the deepest strategic layer. All other theories remain playable for alternative runs. |

### Why This Ordering Works

The progression follows the historical logic of Egyptian engineering:

1. **Mastabas** teach horizontal logistics (move stuff across).
2. **Step Pyramid** teaches vertical logistics (move stuff up) and hints at integrated ramps.
3. **Bent Pyramid** exposes external ramp limits through lived failure.
4. **Red Pyramid** is the safe-bet recovery where a new approach proves itself.
5. **Giza** demands the synthesis. Theory E emerges not as an arbitrary unlock but as the answer to every problem the player has personally encountered.

Theory D (geopolymer) doesn't map to a specific historical site. It fits best as an alternative path available from Stage 3 onward -- the "what if?" route for players who want a radically different experience. Its low workforce requirement and process-engineering gameplay offer a contrast to the hauling-army default.

Hybrid casting emerges organically at Stage 3 via the flood discovery mechanism. It is not a theory choice -- it is a composable technique that the player discovers and can adopt incrementally. The discovery is tied to the Bent Pyramid crisis: after the angle change, the next flood season reveals hardened waste at the quarry. The player who investigates unlocks small-scale casting experiments. By Stage 4, it is proven and available as a strategic option. By Stage 5, it composes with Theory E to form the game's ultimate construction method.

---

## 6. Theory Blending: Composable Techniques

### The Composability Principle

Theories A through E are **construction geometries** -- they define how material moves through space and how the structure grows. Hybrid casting is a **material formation technique** -- it defines how some of that material is made. These are orthogonal concerns, which is why hybrid casting composes with any quarry-based theory rather than competing with them.

| Base Theory | Hybrid Casting Composition | Quality of Fit |
|---|---|---|
| A: External Ramp | Cast ramp fill from quarry waste instead of hauling rubble. Reduces ramp material logistics. | Moderate -- ramp fill is low-quality anyway, so casting waste into fill is efficient but not transformative. |
| B: Internal Spiral | Cast upper-course blocks from waste hauled in baskets through the corridor. Reduces the weight problem at height. | Moderate -- the corridor is still the bottleneck, but lighter basket loads are easier than 2.5-ton blocks at 100m+. |
| C: Hydraulic Lift | Cast blocks at height from aggregate delivered by the hydraulic system. Aggregate in baskets floats as easily as blocks. | Weak to moderate -- the hydraulic system already solves the vertical transport problem; casting adds complexity without solving C's core issue (water dependency). |
| **E: Accretion Overbuild** | **Cast overbuild mass from quarry waste. The overbuild is interior, temporary, high-volume, and at the working face -- the ideal casting candidate.** | **Excellent -- this is the game's ultimate construction method. See below.** |

### The D+E Blend in Detail

The D+E blend is the synthesis of Theory E's construction geometry with hybrid casting's material efficiency. It is the canonical endgame method for players on the Theory E path.

**What Theory E provides:**
- Overbuild trapezoid geometry (integrated ramps, working platforms)
- The cascade DAG (material flows between structures)
- The carve-down reveal (overbuild removed top-down)
- Bidirectional material flow (up during build-up, down during carve-down)

**What hybrid casting provides:**
- A use for the ~30% quarry waste stream (dust, chips, rubble)
- Cast blocks for the overbuild mass (cheaper, faster than hauling quarried blocks)
- Pounding pit operations (lowest-skill work, animal-powered, year-round stockpiling)
- 4-tier workforce stratification (pounding pit / basket carriers / mixers / skilled masons)
- Seasonal rhythm: pound aggregate in dry months, cast during flood when water is abundant

**The combined system:**
1. Quarried blocks form the permanent core and precision casing elements
2. Cast blocks from quarry waste form a player-controlled fraction (0-35%) of the overbuild mass
3. The overbuild serves as integrated ramps during build-up
4. Carve-down of the overbuild produces both reusable quarried blocks and re-castable aggregate for the downstream structure
5. The casting fraction can increase naturally through the cascade as material becomes more process-ready with each generation
6. Quality propagation: cheap choices at Khufu constrain quality options at Khafre and Menkaure

**The casting fraction slider** is the player's primary strategic control. At 0%, the D+E blend reduces to pure Theory E. At 35%, nearly all overbuild is cast from waste, dramatically reducing hauling but creating natron dependency and sending lower-quality cascade material downstream. The optimal setting depends on the player's long-range plan for the entire Giza complex.

---

## 7. Cross-Theory Insights

Things multiple deep dives agree on, regardless of which theory you believe.

### The "Last 30%" Problem

Every theory struggles with the top 30% of the pyramid's height (which contains only ~3% of its volume):

- **A**: Ramp volume exceeds remaining pyramid volume. 92:1 ratio at 120m.
- **B**: Scales best here (shorter revolutions, same corridor), but throughput still drops to 10-30 blocks/day.
- **C**: Lock cycle time is fixed; height doesn't help or hurt, but the shaft pressure problem intensifies.
- **D**: Carry distance increases, but few blocks needed. Least affected.
- **E**: Narrow ramps at height, but volume demand is minimal. Carve-down starts from the top anyway.

All five acknowledge that the upper courses are a fundamentally different problem than the lower courses. Most lean toward hybrid approaches for this range.

### Seasonal Labor Patterns

All five theories assume the same Akhet surge / Peret decline / Shemu minimum cycle:

- Peak workforce during inundation: 20,000-30,000 (A, C, E) or 7,000-12,000 (B Phase 2, D)
- Minimum workforce: 4,000-10,000 permanent skilled workers year-round
- Quarrying continues during Peret/Shemu to build stockpiles for the next Akhet construction push

Theory C is the most seasonally extreme (hydraulic lift tied directly to flood levels). Theory D is the least seasonal (heat helps curing; natron supply is year-round).

### Copper Tool Pressure

Every theory that involves cutting stone (A, B, C, E -- all except D) faces the same consumable drain:

- Copper chisels wear out rapidly against limestone, faster against granite
- Sinai copper supply is distant and finite
- Tool sharpening/recasting requires dedicated metalworkers
- 10,000+ chisels estimated for the Great Pyramid under any quarry-based theory

Theory D sidesteps this almost entirely (disaggregation uses stone mauls, not copper). Theory E doubles it (cutting during build-up AND carve-down).

### The 70% Threshold

Multiple theories converge on the ~43-50m height (roughly 30% of the Great Pyramid's 146.6m) as a critical transition point:

- **A**: Below 50m, the external ramp is manageable. Above 50m, it begins to dominate.
- **B**: The external-to-internal ramp handoff happens at ~43m.
- **C**: The hybrid model uses ramps below 50m and hydraulics above.
- **E**: The lower 50m contains ~70% of total volume and uses the widest integrated ramps.

This convergence suggests that any plausible construction method involves a phase transition somewhere around the 30-50m mark. The game should treat this as a universal design beat, regardless of theory.

### Wood as the Universal Constraint

Every theory is bottlenecked on wood at some point:

- **A**: Sledges (2-4 week lifespan), ramp cross-timbers, levers
- **B**: Sledges, levers, lamp fuel (oil), corner-turning bollards
- **C**: Sluice gates, floats/rafts, sledges
- **D**: Wooden forms (340-680 active sets), fuel for lime kilns
- **E**: Sledges, levers, same as A but for a longer period

Egypt's domestic timber (acacia, sycamore) was limited. Cedar from Lebanon was the premium import. Every theory competes for the same constrained wood supply, making timber trade a universal strategic concern.

### Block Delivery Rate Convergence

Despite wildly different mechanisms, all theories converge on roughly the same average throughput requirement: **~340 blocks/day** over 20 years to place 2.3 million blocks. Peak rates vary (500-800 for A in Phase 1, 30-50 for B in Phase 2 upper courses), but the arithmetic is unyielding. The constraint is the target, not the method.

### Hybrid Consensus

No single theory claims to handle the entire pyramid alone at Great Pyramid scale without qualification:

- **A** concedes it likely served only the lower 30-60m
- **B** explicitly pairs with an external ramp for Phase 1
- **C** works best as a supplement to ramps, not a replacement
- **D** may pre-cast upper-course blocks at ground level
- **E** is the most self-contained but still requires conventional methods for chamber construction

The real question is not "which theory is right?" but "which combination, and where do the transitions happen?" This is a design feature for the game: the player should be encouraged to mix methods, with each theory dominating a different height range or construction phase.
