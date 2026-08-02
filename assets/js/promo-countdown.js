import { runtimeConfig } from "./runtime-config.js";
import { selectAll, setText } from "./utils.js";

const pad = (value) => String(value).padStart(2, "0");

function getRemaining(endAt) {
  const remaining = Math.max(0, endAt - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { remaining, days, hours, minutes, seconds };
}

function render(root, state) {
  setText(root.querySelector("[data-promo-days]"), pad(state.days));
  setText(root.querySelector("[data-promo-hours]"), pad(state.hours));
  setText(root.querySelector("[data-promo-minutes]"), pad(state.minutes));
  setText(root.querySelector("[data-promo-seconds]"), pad(state.seconds));
}

function setExpired(root) {
  root.classList.add("is-expired");
  document.body.classList.add("promo-expired");
  selectAll("[data-promo-cta]").forEach((button) => {
    button.disabled = true;
    button.setAttribute("aria-disabled", "true");
    setText(button, "Oferta encerrada");
  });
  selectAll("[data-promo-ended]").forEach((element) => {
    element.hidden = false;
  });
}

export function isPromoExpired() {
  const endAt = Date.parse(runtimeConfig.promoEndAt || "");
  return Number.isFinite(endAt) && Date.now() >= endAt;
}

export function initPromoCountdown() {
  const endAt = Date.parse(runtimeConfig.promoEndAt || "");
  if (!Number.isFinite(endAt)) return;

  selectAll("[data-promo-countdown]").forEach((root) => {
    const tick = () => {
      const state = getRemaining(endAt);
      render(root, state);
      if (state.remaining <= 0) {
        setExpired(root);
        return false;
      }
      return true;
    };

    if (!tick()) return;
    const interval = window.setInterval(() => {
      if (!tick()) window.clearInterval(interval);
    }, 1000);
  });
}
