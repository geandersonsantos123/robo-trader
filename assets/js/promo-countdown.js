import { selectAll, setText } from "./utils.js";

const DURATION_MS = 60 * 60 * 1000;
const STORAGE_KEY = "roboTraderPromoEndAt";
let fallbackEndAt = null;
let activeEndAt = null;

const pad = (value) => String(value).padStart(2, "0");

function readStoredEndAt() {
  let stored = null;
  try {
    stored = window.localStorage?.getItem(STORAGE_KEY);
  } catch {
    stored = fallbackEndAt;
  }
  const endAt = Number(stored);
  return Number.isFinite(endAt) && endAt > 0 ? endAt : null;
}

function writeEndAt(endAt) {
  fallbackEndAt = String(endAt);
  activeEndAt = endAt;
  try {
    window.localStorage?.setItem(STORAGE_KEY, fallbackEndAt);
  } catch {
    /* Storage can be unavailable in restricted browser contexts. */
  }
  return endAt;
}

function createEndAt() {
  return writeEndAt(Date.now() + DURATION_MS);
}

function ensureEndAt() {
  const storedEndAt = readStoredEndAt();
  if (storedEndAt && storedEndAt > Date.now()) {
    activeEndAt = storedEndAt;
    return storedEndAt;
  }

  return createEndAt();
}

function getRemaining(endAt) {
  const remaining = Math.max(0, endAt - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { remaining, hours, minutes, seconds };
}

function formatClock(state) {
  return `${pad(state.hours)}:${pad(state.minutes)}:${pad(state.seconds)}`;
}

function render(state) {
  const clock = formatClock(state);
  selectAll("[data-countdown-clock]").forEach((element) => {
    setText(element, clock);
  });
}

function restartCountdown() {
  activeEndAt = createEndAt();
  window.setTimeout(() => {
    render(getRemaining(activeEndAt));
  }, 250);
}

export function initPromoCountdown() {
  const clocks = selectAll("[data-countdown-clock]");
  if (!clocks.length) return;

  activeEndAt = ensureEndAt();
  const tick = () => {
    const state = getRemaining(activeEndAt);
    render(state);
    if (state.remaining <= 0) restartCountdown();
  };

  tick();
  window.setInterval(tick, 1000);
}
