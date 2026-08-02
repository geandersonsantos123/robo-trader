import { selectAll, setText } from "./utils.js";

const DURATION_MS = 60 * 60 * 1000;
const STORAGE_KEY = "roboTraderPromoEndAt";
let fallbackEndAt = null;

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

function ensureEndAt() {
  const storedEndAt = readStoredEndAt();
  if (storedEndAt) return storedEndAt;

  const endAt = Date.now() + DURATION_MS;
  fallbackEndAt = String(endAt);
  try {
    window.localStorage?.setItem(STORAGE_KEY, fallbackEndAt);
  } catch {
    /* Storage can be unavailable in restricted browser contexts. */
  }
  return endAt;
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

function setExpired() {
  document.body.classList.add("promo-expired");
  selectAll("[data-promo-countdown]").forEach((root) => root.classList.add("is-expired"));
  selectAll("[data-offer-cta]").forEach((button) => {
    button.disabled = true;
    button.setAttribute("aria-disabled", "true");
    setText(button, "Condição promocional encerrada");
  });
  selectAll("[data-promo-ended]").forEach((element) => {
    element.hidden = false;
  });
}

export function isPromoExpired() {
  const endAt = readStoredEndAt();
  return Boolean(endAt && Date.now() >= endAt);
}

export function initPromoCountdown() {
  const clocks = selectAll("[data-countdown-clock]");
  if (!clocks.length) return;

  const endAt = ensureEndAt();
  const tick = () => {
    const state = getRemaining(endAt);
    render(state);
    if (state.remaining <= 0) {
      setExpired();
      return false;
    }
    return true;
  };

  if (!tick()) return;
  const interval = window.setInterval(() => {
    if (!tick()) window.clearInterval(interval);
  }, 1000);
}
