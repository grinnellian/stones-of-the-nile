import { createGameState, tick, GameConfig } from './simulation/engine.js';
import { GameState } from './types/world.js';
import { Contract } from './types/contracts.js';
import { Recipe, ResourceType, Stockpile } from './types/resources.js';
import { Season, TICKS_PER_SEASON } from './types/calendar.js';
import { loadTransport } from './simulation/transport.js';
import { getSeasonModifiers } from './simulation/calendar.js';
import { createForemanScenario } from './data/scenarios.js';
import { PyramidView } from './rendering/pyramid-view.js';

// --- Game State ---
const config = createForemanScenario();
let state = createGameState(config);
let running = false;
let speed = 1;
let tickCount = 0;

// --- 3D Pyramid View (always on) ---
let pyramidView: PyramidView | null = null;
const log: string[] = [];

// --- Panel fold state ---
const collapsed: Record<string, boolean> = {};

function addLog(msg: string, cls: string = '') {
  log.unshift(`<span class="log-entry ${cls}">[Y${state.date.year} ${state.date.season} T${state.date.tick}] ${msg}</span>`);
  if (log.length > 100) log.pop();
}

// --- Auto-transport ---
function autoTransport(): void {
  const quarry = state.sites.find((s) => s.id === 'tura-quarry');
  const route = state.routes.find((r) => r.id === 'tura-to-giza');
  if (!quarry || !route) return;

  const dressedStone = quarry.stockpile[ResourceType.DressedStone] ?? 0;
  if (dressedStone >= 5) {
    const floodLevel =
      state.floodSchedule.find((f) => f.year === state.date.year)?.level ?? 0.5;
    const modifiers = getSeasonModifiers(state.date.season, floodLevel);
    const toSend = Math.min(dressedStone, 20);
    const result = loadTransport(
      route,
      quarry.stockpile,
      [{ type: ResourceType.DressedStone, quantity: toSend }],
      modifiers
    );
    if (result.loaded) {
      quarry.stockpile = result.fromStockpile;
      const routeIndex = state.routes.findIndex((r) => r.id === route.id);
      state.routes[routeIndex] = result.route;
      addLog(`Shipped ${toSend} dressed stone → Giza`, 'log-transport');
    }
  }
}

// --- Game Loop ---
function gameTick(): void {
  autoTransport();
  const result = tick(state, config.contracts, config.recipes);
  state = result.state;
  tickCount++;

  for (const [key, pr] of result.report.production) {
    for (const [type, qty] of Object.entries(pr.produced)) {
      if (qty && qty > 0) {
        addLog(`${key.split(':')[0]}: produced ${qty} ${type}`, 'log-production');
      }
    }
  }

  for (const [routeId, delivered] of result.report.deliveries) {
    for (const [type, qty] of Object.entries(delivered)) {
      if (qty && qty > 0) {
        addLog(`Delivered ${qty} ${type} via ${routeId}`, 'log-transport');
      }
    }
  }

  if (result.report.seasonEnd) {
    addLog(`=== Season ${result.report.date.season} ended ===`, 'log-season');
    for (const cp of result.report.contractUpdates) {
      const contract = config.contracts.find((c) => c.id === cp.contractId);
      if (contract) {
        addLog(
          `Contract "${contract.name}": ${cp.seasonsFulfilled}/${contract.durationSeasons} seasons fulfilled`,
          'log-contract'
        );
        if (cp.completed) {
          addLog(`CONTRACT COMPLETED!`, 'log-contract');
        }
      }
    }
  }

  render();
}

let intervalId: number | null = null;

function startGame(): void {
  if (running) return;
  running = true;
  intervalId = window.setInterval(gameTick, Math.max(50, 500 / speed));
  render();
}

function stopGame(): void {
  running = false;
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  render();
}

function setSpeed(s: number): void {
  speed = s;
  if (running) {
    stopGame();
    startGame();
  }
  render();
}

function resetGame(): void {
  stopGame();
  state = createGameState(config);
  tickCount = 0;
  log.length = 0;
  addLog('Game reset. A new day on the Nile.', 'log-season');
  if (pyramidView) {
    pyramidView.setBlocksPlaced(0);
  }
  render();
}

function togglePanel(id: string): void {
  collapsed[id] = !collapsed[id];
  render();
}

function getDressedStoneAtGiza(): number {
  const giza = state.sites.find((s) => s.id === 'giza-plateau');
  return Math.floor(giza?.stockpile[ResourceType.DressedStone] ?? 0);
}

// --- Rendering helpers ---
function formatResource(name: string, qty: number | undefined): string {
  const q = qty ?? 0;
  const cls = q === 0 ? 'zero' : '';
  const displayName = name.replace(/_/g, ' ');
  return `<div class="resource-row"><span class="resource-name">${displayName}</span><span class="resource-qty ${cls}">${q.toFixed(1)}</span></div>`;
}

function renderStockpile(stockpile: Stockpile): string {
  const entries = Object.entries(stockpile).filter(([_, v]) => v !== undefined);
  if (entries.length === 0) return '<div class="resource-row"><span class="resource-name">Empty</span></div>';
  return entries.map(([k, v]) => formatResource(k, v)).join('');
}

function panel(id: string, title: string, bodyHtml: string): string {
  const isClosed = collapsed[id];
  return `
    <div class="panel ${isClosed ? 'collapsed' : ''}">
      <div class="panel-header" onclick="window.__togglePanel('${id}')">
        <h2>${title}</h2>
        <span class="panel-toggle">▼</span>
      </div>
      <div class="panel-body">${bodyHtml}</div>
    </div>`;
}

// --- Main render ---
function render(): void {
  const overlay = document.getElementById('ui-overlay')!;
  const date = state.date;
  const floodLevel =
    state.floodSchedule.find((f) => f.year === date.year)?.level ?? 0.5;
  const seasonClass = `season-${date.season}`;

  // Update 3D pyramid
  if (pyramidView) {
    pyramidView.setBlocksPlaced(getDressedStoneAtGiza());
  }

  // --- Contract panel ---
  const contractBody = state.contracts
    .map((cp) => {
      const contract = config.contracts.find((c) => c.id === cp.contractId)!;
      const statusCls = cp.completed ? 'status-completed' : cp.failed ? 'status-failed' : 'status-active';
      const statusText = cp.completed ? 'COMPLETED' : cp.failed ? 'FAILED' : 'ACTIVE';
      const pips = Array.from({ length: contract.durationSeasons }, (_, i) => {
        if (i < cp.seasonsFulfilled) return 'fulfilled';
        if (i < cp.seasonsAttempted) return 'missed';
        return 'pending';
      }).map((cls) => `<div class="progress-pip ${cls}"></div>`).join('');
      const reqStr = contract.requiredOutput
        .map((r) => `${r.quantity} ${r.type.replace(/_/g, ' ')}`)
        .join(', ');
      return `
        <strong>${contract.name}</strong>
        <span class="contract-status ${statusCls}">${statusText}</span>
        <div style="font-size:0.75em;color:#8b7d6b;margin:2px 0">${contract.description}</div>
        <div style="font-size:0.75em">${reqStr}/season for ${contract.durationSeasons} seasons</div>
        <div class="progress-bar">${pips}</div>
        <div style="font-size:0.7em;color:#8b7d6b">${cp.seasonsFulfilled}/${contract.durationSeasons} fulfilled</div>`;
    }).join('');

  // --- Sites panels ---
  const sitePanels = state.sites.map((site) => {
    const producerHtml = site.producers.map((p) => {
      const recipe = config.recipes[p.recipeId];
      const statusCls = p.active ? 'producer-active' : 'producer-idle';
      const progressPct = recipe ? (p.progress / recipe.duration) * 100 : 0;
      return `<div class="producer-status">
        <span class="${statusCls}">${p.active ? '▸' : '×'}</span>
        ${recipe?.name ?? p.recipeId}
        ${p.active ? `[${progressPct.toFixed(0)}%]` : '[idle]'}
      </div>`;
    }).join('');

    const workerStr = `L:${site.workers.laborers} C:${site.workers.craftsmen} S:${site.workers.scribes} | ${(site.workers.satisfaction * 100).toFixed(0)}%`;

    const body = `
      <div style="font-size:0.7em;color:#8b7d6b;margin-bottom:4px">${site.type} | ${workerStr}</div>
      ${producerHtml}
      <div class="site-separator"></div>
      ${renderStockpile(site.stockpile)}`;

    return panel(`site-${site.id}`, site.name, body);
  }).join('');

  // --- Transport panel ---
  const routesBody = state.routes.map((r) => {
    const inTransitCount = r.inTransit.length;
    const batches = r.inTransit.map((b) => {
      const contents = Object.entries(b.resources)
        .map(([k, v]) => `${v} ${k.replace(/_/g, ' ')}`)
        .join(', ');
      return `<div style="font-size:0.7em;color:#a0a0c0;padding-left:8px">${contents} (${b.ticksRemaining}t)</div>`;
    }).join('');
    return `<div style="margin-bottom:4px">
      <span style="color:#6db3f2;font-size:0.8em">${r.fromSiteId} → ${r.toSiteId}</span>
      <span style="font-size:0.7em">${r.viaNile ? 'Nile' : 'overland'} | ${inTransitCount} batch${inTransitCount !== 1 ? 'es' : ''}</span>
      ${batches}
    </div>`;
  }).join('');

  // --- Calendar panel ---
  const calendarBody = `
    <div>Year <strong>${date.year}</strong> —
      <span class="season-indicator ${seasonClass}">${date.season.toUpperCase()}</span>
      — Tick ${date.tick + 1}/${TICKS_PER_SEASON}
    </div>
    <div style="margin-top:4px;font-size:0.8em">
      Flood: ${(floodLevel * 100).toFixed(0)}%
      <div class="flood-bar"><div class="flood-fill" style="width:${floodLevel * 100}%"></div></div>
    </div>
    <div style="margin-top:2px;font-size:0.7em;color:#8b7d6b">Tick #${tickCount}</div>`;

  // --- Assemble overlay ---
  overlay.innerHTML = `
    <div class="top-bar">
      <span class="title">STONES OF THE NILE</span>
      <span class="date-display">
        Y${date.year}
        <span class="season-indicator ${seasonClass}" style="font-size:0.75em">${date.season.toUpperCase()}</span>
        T${date.tick + 1}/${TICKS_PER_SEASON}
      </span>
      <button onclick="window.__startGame()" ${running ? 'disabled' : ''}>▶</button>
      <button onclick="window.__stopGame()" ${!running ? 'disabled' : ''}>⏸</button>
      <button onclick="window.__tickOnce()" ${running ? 'disabled' : ''}>⏭</button>
      <span class="speed-label">Speed:</span>
      <button class="btn-sm" onclick="window.__setSpeed(1)" ${speed === 1 ? 'disabled' : ''}>1×</button>
      <button class="btn-sm" onclick="window.__setSpeed(3)" ${speed === 3 ? 'disabled' : ''}>3×</button>
      <button class="btn-sm" onclick="window.__setSpeed(10)" ${speed === 10 ? 'disabled' : ''}>10×</button>
      <button class="danger btn-sm" onclick="window.__resetGame()">Reset</button>
    </div>

    <div class="panels-area">
      <div class="sidebar-left">
        ${panel('calendar', 'Calendar', calendarBody)}
        ${panel('contract', 'Contract', contractBody)}
        ${panel('transport', 'Transport', routesBody)}
      </div>
      <div class="sidebar-right">
        ${sitePanels}
      </div>
    </div>

    <div class="bottom-bar ${collapsed['log'] ? 'collapsed' : ''}">
      <div class="panel-header" onclick="window.__togglePanel('log')">
        <h2 style="color:#c9a85c;font-size:0.85em;margin:0;border:none;padding:0">Event Log</h2>
        <span class="panel-toggle" style="color:#8b7d6b;font-size:0.8em">▼</span>
      </div>
      <div class="log">${log.join('')}</div>
    </div>
  `;
}

// --- Init 3D view (always on) ---
function init3D(): void {
  const container = document.getElementById('pyramid-3d')!;
  pyramidView = new PyramidView({
    container,
    layers: 20,
    baseSize: 40,
    blocksPlaced: getDressedStoneAtGiza(),
  });
}

// Expose to window
(window as any).__startGame = startGame;
(window as any).__stopGame = stopGame;
(window as any).__tickOnce = gameTick;
(window as any).__setSpeed = setSpeed;
(window as any).__resetGame = resetGame;
(window as any).__togglePanel = togglePanel;

// Boot
addLog('Welcome, Foreman. The Vizier expects results.', 'log-season');
addLog('Deliver 30 dressed stone/season to Giza for 3 seasons.', 'log-contract');
init3D();
render();
