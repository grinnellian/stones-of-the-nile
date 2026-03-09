# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Stones of the Nile** — A browser-based ancient Egypt economy tycoon where you build pyramids by designing and debugging logistics networks. Each pyramid construction theory is a different systems architecture to optimize.

See `docs/DESIGN.md` for the full design document.

## Tech Stack

- TypeScript, Vite, Vitest
- Phaser 3 for rendering (2D isometric)
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
- `src/rendering/` — Phaser scenes, sprites, UI. Consumes simulation state.
- `src/types/` — Shared type definitions
- `src/data/` — Static game data (resource definitions, building costs, theory parameters)

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
