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
let speed = 1; // ticks per frame
let tickCount = 0;

// --- 3D Pyramid View ---
let pyramidView: PyramidView | null = null;
let show3D = false;
const log: string[] = [];

function addLog(msg: string, cls: string = '') {
  log.unshift(`<span class="log-entry ${cls}">[Y${state.date.year} ${state.date.season} T${state.date.tick}] ${msg}</span>`);
  if (log.length > 100) log.pop();
}

// --- Auto-transport: move dressed stone from quarry to construction site ---
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
  // Auto-transport before tick
  autoTransport();

  const result = tick(state, config.contracts, config.recipes);
  state = result.state;
  tickCount++;

  // Log interesting events
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
    addLog(
      `=== Season ${result.report.date.season} ended ===`,
      'log-season'
    );
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

function toggle3D(): void {
  show3D = !show3D;
  const container = document.getElementById('pyramid-3d')!;
  container.style.display = show3D ? 'block' : 'none';

  if (show3D && !pyramidView) {
    pyramidView = new PyramidView({
      container,
      layers: 20,
      baseSize: 40,
      blocksPlaced: getDressedStoneAtGiza(),
    });
  }
  render();
}

/** Get total dressed stone delivered to construction site — drives 3D block count */
function getDressedStoneAtGiza(): number {
  const giza = state.sites.find((s) => s.id === 'giza-plateau');
  return Math.floor(giza?.stockpile[ResourceType.DressedStone] ?? 0);
}

// --- Rendering ---
function formatResource(name: string, qty: number | undefined): string {
  const q = qty ?? 0;
  const cls = q === 0 ? 'zero' : '';
  const displayName = name.replace(/_/g, ' ');
  return `<div class="resource-row"><span class="resource-name">${displayName}</span><span class="resource-qty ${cls}">${q.toFixed(1)}</span></div>`;
}

function renderStockpile(stockpile: Stockpile): string {
  const entries = Object.entries(stockpile).filter(
    ([_, v]) => v !== undefined
  );
  if (entries.length === 0) return '<div class="resource-row"><span class="resource-name">Empty</span></div>';
  return entries.map(([k, v]) => formatResource(k, v)).join('');
}

function render(): void {
  const app = document.getElementById('app')!;
  const date = state.date;
  const floodLevel =
    state.floodSchedule.find((f) => f.year === date.year)?.level ?? 0.5;

  const seasonClass = `season-${date.season}`;

  // Contract display
  const contractHtml = state.contracts
    .map((cp) => {
      const contract = config.contracts.find((c) => c.id === cp.contractId)!;
      const statusCls = cp.completed
        ? 'status-completed'
        : cp.failed
          ? 'status-failed'
          : 'status-active';
      const statusText = cp.completed
        ? 'COMPLETED'
        : cp.failed
          ? 'FAILED'
          : 'ACTIVE';

      const pips = Array.from({ length: contract.durationSeasons }, (_, i) => {
        if (i < cp.seasonsFulfilled) return 'fulfilled';
        if (i < cp.seasonsAttempted) return 'missed';
        return 'pending';
      })
        .map((cls) => `<div class="progress-pip ${cls}"></div>`)
        .join('');

      const reqStr = contract.requiredOutput
        .map((r) => `${r.quantity} ${r.type.replace(/_/g, ' ')}`)
        .join(', ');

      return `
        <div style="margin-bottom:8px">
          <strong>${contract.name}</strong>
          <span class="contract-status ${statusCls}">${statusText}</span>
          <div style="font-size:0.8em;color:#8b7d6b;margin:2px 0">${contract.description}</div>
          <div style="font-size:0.8em">Required: ${reqStr}/season for ${contract.durationSeasons} seasons</div>
          <div class="progress-bar">${pips}</div>
          <div style="font-size:0.75em;color:#8b7d6b">${cp.seasonsFulfilled}/${contract.durationSeasons} fulfilled, ${cp.seasonsAttempted} attempted</div>
        </div>
      `;
    })
    .join('');

  // Sites
  const sitesHtml = state.sites
    .map((site) => {
      const producerHtml = site.producers
        .map((p) => {
          const recipe = config.recipes[p.recipeId];
          const statusCls = p.active ? 'producer-active' : 'producer-idle';
          const progressPct = recipe ? (p.progress / recipe.duration) * 100 : 0;
          return `<div class="producer-status">
            <span class="${statusCls}">${p.active ? '>' : 'x'}</span>
            ${recipe?.name ?? p.recipeId}
            ${p.active ? `[${progressPct.toFixed(0)}%]` : '[idle]'}
          </div>`;
        })
        .join('');

      const workerStr = `L:${site.workers.laborers} C:${site.workers.craftsmen} S:${site.workers.scribes} | Sat: ${(site.workers.satisfaction * 100).toFixed(0)}%`;

      return `
        <div class="panel">
          <div class="site-name">${site.name}</div>
          <div style="font-size:0.75em;color:#8b7d6b">${site.type} | Workers: ${workerStr}</div>
          ${producerHtml}
          <h2>Stockpile</h2>
          ${renderStockpile(site.stockpile)}
        </div>
      `;
    })
    .join('');

  // Transport
  const routesHtml = state.routes
    .map((r) => {
      const inTransitCount = r.inTransit.length;
      const batches = r.inTransit
        .map((b) => {
          const contents = Object.entries(b.resources)
            .map(([k, v]) => `${v} ${k.replace(/_/g, ' ')}`)
            .join(', ');
          return `<div style="font-size:0.75em;color:#a0a0c0">  ${contents} (${b.ticksRemaining} ticks away)</div>`;
        })
        .join('');
      return `<div style="margin-bottom:4px">
        <span style="color:#6db3f2">${r.fromSiteId} → ${r.toSiteId}</span>
        ${r.viaNile ? '🏛️ Nile' : 'overland'}
        | ${inTransitCount} batch${inTransitCount !== 1 ? 'es' : ''} in transit
        ${batches}
      </div>`;
    })
    .join('');

  // Update 3D pyramid view with current block count
  if (pyramidView && show3D) {
    pyramidView.setBlocksPlaced(getDressedStoneAtGiza());
  }

  app.innerHTML = `
    <div class="controls">
      <button onclick="window.__startGame()" ${running ? 'disabled' : ''}>Play</button>
      <button onclick="window.__stopGame()" ${!running ? 'disabled' : ''}>Pause</button>
      <button onclick="window.__tickOnce()" ${running ? 'disabled' : ''}>Step</button>
      <button class="danger" onclick="window.__resetGame()">Reset</button>
      <button onclick="window.__toggle3D()" style="margin-left:auto">${show3D ? 'Hide' : 'Show'} 3D View</button>
      <span class="speed-label">Speed:</span>
      <button onclick="window.__setSpeed(1)" ${speed === 1 ? 'disabled' : ''}>1x</button>
      <button onclick="window.__setSpeed(3)" ${speed === 3 ? 'disabled' : ''}>3x</button>
      <button onclick="window.__setSpeed(10)" ${speed === 10 ? 'disabled' : ''}>10x</button>
    </div>

    <div class="dashboard">
      <div class="panel">
        <h2>Calendar</h2>
        <div>Year <strong>${date.year}</strong> &mdash;
          <span class="season-indicator ${seasonClass}">${date.season.toUpperCase()}</span>
          &mdash; Tick ${date.tick + 1}/${TICKS_PER_SEASON}
        </div>
        <div style="margin-top:6px;font-size:0.85em">
          Nile Flood Level: ${(floodLevel * 100).toFixed(0)}%
          <div class="flood-bar"><div class="flood-fill" style="width:${floodLevel * 100}%"></div></div>
        </div>
        <div style="margin-top:4px;font-size:0.8em;color:#8b7d6b">Tick #${tickCount}</div>
      </div>

      <div class="panel">
        <h2>Contract</h2>
        ${contractHtml}
      </div>

      ${sitesHtml}

      <div class="panel">
        <h2>Transport</h2>
        ${routesHtml}
      </div>

      <div class="panel">
        <h2>Event Log</h2>
        <div class="log">${log.join('')}</div>
      </div>
    </div>
  `;
}

// Expose to window for button onclick handlers
(window as any).__startGame = startGame;
(window as any).__stopGame = stopGame;
(window as any).__tickOnce = gameTick;
(window as any).__setSpeed = setSpeed;
(window as any).__resetGame = resetGame;
(window as any).__toggle3D = toggle3D;

// Initial render
addLog('Welcome, Foreman. The Vizier expects results.', 'log-season');
addLog('Deliver 30 dressed stone/season to Giza for 3 seasons.', 'log-contract');
render();
