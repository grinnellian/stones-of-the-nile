# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Do NOT use auto-memory.** All persistent memory lives in this file and in the repo. Do not read or write to the `~/.claude/projects/` memory directory.

## Project

**Stones of the Nile** — A browser-based ancient Egypt economy tycoon where you build pyramids by designing and debugging logistics networks. Core metaphor: distributed systems debugging wearing an ancient Egypt costume.

- Repo: https://github.com/grinnellian/stones-of-the-nile
- See `docs/DESIGN.md` for the full design document

## Owner

- GitHub: grinnellian (Ian Bone, Portland OR)
- Amazon alum (2010+), thinks in distributed systems
- Prefers "programming thinly disguised as games"
- Top played: The Perfect Tower II, Elite Dangerous, ONI, KSP, Factorio

## Workflow Preferences

- Run autonomously, trust git + async human judgement
- Push commits as they're made (no force push / history rewriting)
- Keep commits focused and well-described

## Tech Stack

- TypeScript, Vite, Vitest
- Three.js for 3D rendering (InstancedMesh for pyramid blocks)
- All client-side, no backend

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server with hot reload
npm run build        # Production build
npm test             # Run tests (vitest)
npm run lint         # ESLint
```

## Architecture

The game separates simulation from rendering:

- `src/simulation/` — Pure logic: economy engine, resource model, seasonal ticks, contract evaluation. No rendering dependencies. Testable in isolation.
- `src/rendering/` — Three.js scenes, instanced block meshes, camera, UI overlay. Consumes simulation state.
- `src/types/` — Shared type definitions
- `src/data/` — Static game data (recipes, scenarios, world map with 27 locations and 16 trade routes)

## Key Design Decisions

- "Einmal ist keinmal" — contracts require sustained multi-season output, not one-off delivery
- Zoom of gameplay: foreman → overseer → governor → vizier → pharaoh
- Pyramid theories as different "tech stacks" (external ramp, internal ramp, hydraulic, geopolymer, accretion overbuild)
- Nile as async message bus with seasonal throughput variance
- Cities persist and degrade when unattended — revisiting is gameplay

## Team Roles

Agent definitions live in `.claude/agents/`. This project uses the ai-lindale multi-agent pattern:

- **TPM** — Creates issues, manages requirements, tracks progress. Only role that creates GH issues.
- **Architect** — Read-only. Reviews issues, creates TDD implementation plans. Cannot modify code.
- **Dev** — Implements features following architect plans. Works in worktree isolation. TDD red/green commits.
- **Egyptologist** — Domain consultant for historical accuracy and pyramid construction theories.

## Issue Prefixes

FEAT, BUG, EPIC, DOCS, INFRA, DX

## Conventions

- Simulation logic must be pure functions with no side effects where possible
- All simulation code must have tests
- Seasonal tick is the fundamental unit of game time
- Resources use a consistent `ResourceType` enum
- Contracts are the core progression mechanic — sustained output, not one-off goals

## Current State

- Playable prototype with simulation engine, DOM dashboard, and toggleable 3D pyramid view
- 51 passing tests across calendar, stockpile, production, contracts
- One scenario: Foreman's First Contract (deliver dressed stone to Giza)
- World map data: 27 locations, 27 Nile waypoints, 16 trade routes (`src/data/world-map.ts`)
