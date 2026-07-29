import { runtimeConfig } from "./runtime-config.js";
import { safeStorage, selectAll } from "./utils.js";

const CONSENT_KEY = "roboTraderMarketingConsent.v1";
const UTM_KEY = "roboTraderAttribution.v1";
const UTM_ALLOWLIST = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const STANDARD_EVENTS = new Set(["PageView", "ViewContent", "VideoStart", "ViewOffer", "InitiateCheckout", "Contact"]);
const trackedKeys = new Set();
let pixelReady = false;

export function getMarketingConsent() {
  return safeStorage(window.localStorage, "get", CONSENT_KEY) || "unset";
}

export function setMarketingConsent(value) {
  const normalized = value === "accepted" ? "accepted" : "rejected";
  safeStorage(window.localStorage, "set", CONSENT_KEY, normalized);
  window.dispatchEvent(new CustomEvent("robo:consent-change", { detail: { value: normalized } }));
  return normalized;
}

function debug(eventName, parameters) {
  if (runtimeConfig.debug) console.info(`[Robô Trader] ${eventName}`, parameters);
}

function dispatchLocal(eventName, parameters) {
  window.dispatchEvent(new CustomEvent("robo:tracking", { detail: { eventName, parameters } }));
  debug(eventName, parameters);
}

function loadMetaPixel() {
  if (pixelReady || !runtimeConfig.metaPixelId || getMarketingConsent() !== "accepted") return false;
  if (!window.fbq) {
    const fbq = function (...args) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.append(script);
  }
  window.fbq("init", runtimeConfig.metaPixelId);
  pixelReady = true;
  return true;
}

function sendMeta(eventName, parameters) {
  if (!pixelReady || getMarketingConsent() !== "accepted" || typeof window.fbq !== "function") return;
  const method = STANDARD_EVENTS.has(eventName) ? "track" : "trackCustom";
  window.fbq(method, eventName, parameters);
}

export function track(eventName, parameters = {}, { dedupKey = "" } = {}) {
  if (dedupKey && trackedKeys.has(dedupKey)) return false;
  if (dedupKey) trackedKeys.add(dedupKey);
  const safeParameters = { ...parameters };
  dispatchLocal(eventName, safeParameters);
  sendMeta(eventName, safeParameters);
  return true;
}

function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const current = Object.fromEntries(UTM_ALLOWLIST.filter((key) => params.has(key)).map((key) => [key, params.get(key)]));
  if (Object.keys(current).length) safeStorage(window.sessionStorage, "set", UTM_KEY, JSON.stringify(current));
  return current;
}

export function getAttribution() {
  const stored = safeStorage(window.sessionStorage, "get", UTM_KEY);
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored);
    return Object.fromEntries(UTM_ALLOWLIST.filter((key) => typeof parsed[key] === "string").map((key) => [key, parsed[key]]));
  } catch {
    return {};
  }
}

export function appendAttribution(url) {
  const destination = new URL(url, window.location.href);
  Object.entries(getAttribution()).forEach(([key, value]) => {
    if (!destination.searchParams.has(key)) destination.searchParams.set(key, value);
  });
  return destination.href;
}

function activateMarketing() {
  if (!loadMetaPixel()) return;
  track("PageView", {}, { dedupKey: "PageView" });
  track("ViewContent", { content_name: runtimeConfig.productName, content_type: "product" }, { dedupKey: "ViewContent" });
}

function observeOffer() {
  const offer = document.querySelector("[data-offer]");
  if (!offer || !("IntersectionObserver" in window)) return;
  let timer = null;
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    window.clearTimeout(timer);
    if (!entry?.isIntersecting || entry.intersectionRatio < 0.5) return;
    timer = window.setTimeout(() => {
      track("ViewOffer", {
        content_name: runtimeConfig.productName,
        content_ids: [runtimeConfig.productId],
        value: runtimeConfig.price,
        currency: runtimeConfig.currency
      }, { dedupKey: "ViewOffer" });
      observer.disconnect();
    }, 1000);
  }, { threshold: [0, 0.5, 0.75] });
  observer.observe(offer);
}

function bindCTAs() {
  selectAll("[data-cta]").forEach((element) => {
    element.addEventListener("click", () => {
      track("CTAInteraction", {
        cta_id: element.dataset.ctaId || "unknown",
        label: element.textContent.trim().replace(/\s+/g, " ").slice(0, 100),
        section: element.dataset.section || "unknown",
        destination: element.dataset.destination || "unknown",
        action_type: element.dataset.actionType || "unknown"
      });
    });
  });
}

export function initTracking() {
  captureAttribution();
  bindCTAs();
  observeOffer();
  window.addEventListener("robo:consent-change", (event) => {
    if (event.detail?.value === "accepted") activateMarketing();
  });
  if (getMarketingConsent() === "accepted") activateMarketing();
}
