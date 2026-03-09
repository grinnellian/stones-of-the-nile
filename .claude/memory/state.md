# Current State

Updated: 2026-03-09

## What exists
- Playable prototype with simulation engine, DOM dashboard, and toggleable 3D pyramid view
- 51 passing tests across calendar, stockpile, production, contracts
- One scenario: Foreman's First Contract (deliver dressed stone to Giza)
- 3D view: Three.js InstancedMesh renders pyramid blocks as they're delivered to Giza
- World map data: 27 locations, 27 Nile waypoints, 16 trade routes (`src/data/world-map.ts`)
- Auto-transport moves dressed stone from quarry to construction site

## What's next
- World map not yet wired into gameplay (data exists, no rendering or site selection UI)
- Only one scenario — need career progression stages
- Production rate is slow by design (player needs to optimize)
- 3D view rebuilds entire mesh on every render tick — could optimize with incremental updates
