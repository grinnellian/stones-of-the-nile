# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Do NOT use auto-memory.** All persistent memory lives in `.claude/memory/`. Read `.claude/memory/INDEX.md` at session start. Update memory files as you learn things — keep them current.

## Project

**Stones of the Nile** — Browser-based ancient Egypt economy tycoon. Distributed systems debugging in an Egypt costume.

- Repo: https://github.com/grinnellian/stones-of-the-nile
- Design doc: `docs/DESIGN.md`

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
- `src/rendering/` — Three.js scenes, instanced block meshes, camera. Consumes simulation state.
- `src/types/` — Shared type definitions
- `src/data/` — Static game data (recipes, scenarios, world map)

## Team Roles

Agent definitions in `.claude/agents/` (ai-lindale pattern): TPM, Architect, Dev, Egyptologist.

## Issue Prefixes

FEAT, BUG, EPIC, DOCS, INFRA, DX

## Conventions

- Simulation logic must be pure functions with no side effects where possible
- All simulation code must have tests
- Seasonal tick is the fundamental unit of game time
- Resources use a consistent `ResourceType` enum
- Contracts are the core progression mechanic — sustained output, not one-off goals
