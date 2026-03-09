# Design Decisions

- "Einmal ist keinmal" — contracts require sustained multi-season output, not one-off delivery
- Zoom of gameplay: foreman → overseer → governor → vizier → pharaoh
- Pyramid theories as different "tech stacks" (external ramp, internal ramp, hydraulic, geopolymer, accretion overbuild)
- Theory E (accretion overbuild) is the game's preferred theory — creates economic web not hub-and-spoke
- Nile as async message bus with seasonal throughput variance
- Cities persist and degrade when unattended — revisiting is gameplay
- Historical progression through failure: Meidum collapse, Bent Pyramid hotfix, discoveries through gameplay
- Each historical pyramid pairs with a different plausible construction theory
- Heavily but optionally educational: game works as abstract numbers, but encyclopedia/tooltips teach real Egyptology to players who want it. Theories docs in docs/theories/ will feed in-game encyclopedia and contextual tooltips.
- Three.js chosen over Babylon (overkill), OGL (sparse docs), raw WebGL (too low), Pixi3D (wrong tool)
