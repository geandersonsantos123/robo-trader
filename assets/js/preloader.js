import { select, setText } from "./utils.js";

const STORAGE_KEY = "roboTraderPreloaderShown";
const MIN_VISIBLE_MS = 1800;
const READY_PULSE_MS = 220;
const EXIT_FADE_MS = 120;
const NORMAL_PROGRESS_MS = 1800;

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function hasSeenPreloader() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function markPreloaderSeen() {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // Private browsing or blocked storage should not keep the overlay on screen.
  }
}

function waitForPageLoad() {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
}

function setProgress(bar, percent, value) {
  const nextValue = Math.max(0, Math.min(100, Math.round(value)));
  bar?.style.setProperty("transform", `scaleX(${nextValue / 100})`);
  setText(percent, `${nextValue}%`);
}

function easeInOut(progress) {
  return progress < 0.5 ? 2 * progress * progress : 1 - ((-2 * progress + 2) ** 2) / 2;
}

export function initPreloader() {
  const root = document.documentElement;
  const preloader = select("[data-preloader]");
  if (!preloader) return;

  const shouldShow = root.classList.contains("preloader-pending") && !hasSeenPreloader();
  if (!shouldShow) {
    root.classList.remove("preloader-pending");
    preloader.remove();
    return;
  }

  const bar = select("[data-preloader-bar]", preloader);
  const percent = select("[data-preloader-percent]", preloader);
  const status = select("[data-preloader-status]", preloader);
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  let completed = false;
  let frame = 0;
  const startedAt = window.performance.now();

  const animateProgress = (timestamp) => {
    if (completed) return;
    const elapsed = timestamp - startedAt;
    const softCap = reducedMotion ? 88 : 98;
    const progress = Math.min(1, elapsed / NORMAL_PROGRESS_MS);
    const nextProgress = easeInOut(progress) * softCap;
    setProgress(bar, percent, nextProgress);
    frame = window.requestAnimationFrame(animateProgress);
  };

  setProgress(bar, percent, 0);
  frame = window.requestAnimationFrame(animateProgress);

  Promise.all([delay(MIN_VISIBLE_MS), waitForPageLoad()]).then(async () => {
    completed = true;
    window.cancelAnimationFrame(frame);
    setProgress(bar, percent, 100);
    setText(status, "SISTEMA PRONTO");
    preloader.classList.add("is-ready");
    preloader.setAttribute("aria-busy", "false");
    markPreloaderSeen();

    await delay(reducedMotion ? 80 : READY_PULSE_MS);
    root.classList.remove("preloader-pending");
    preloader.classList.add("is-hiding");
    preloader.setAttribute("aria-hidden", "true");

    await delay(reducedMotion ? 40 : EXIT_FADE_MS);
    preloader.remove();
  });
}
