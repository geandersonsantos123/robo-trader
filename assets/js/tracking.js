import { runtimeConfig } from "./runtime-config.js";
import { safeStorage, selectAll } from "./utils.js";

const CONSENT_KEY = "roboTraderMarketingConsent.v1";
const UTM_KEY = "roboTraderAttribution.v1";
const UTM_ALLOWLIST = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const STANDARD_EVENTS = new Set(["PageView", "ViewContent", "Search", "Lead", "Contact", "CompleteRegistration", "AddToCart", "AddToWishlist", "InitiateCheckout", "Purchase"]);
const trackedKeys = new Set();
let pixelReady = false;

export function getMarketingConsent() {
  return safeStorage(window.localStorage, "get", CONSENT_KEY) || (runtimeConfig.consentRequired ? "unset" : "accepted");
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
    script.fetchPriority = "high";
    script.crossOrigin = "anonymous";
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.append(script);
  }
  if (!window.__roboTraderMetaPixelInitialized) {
    window.fbq("init", runtimeConfig.metaPixelId);
    window.__roboTraderMetaPixelInitialized = true;
  }
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
  if (window.__roboTraderMetaPixelPageView) {
    if (!trackedKeys.has("PageView")) {
      trackedKeys.add("PageView");
      dispatchLocal("PageView", {});
    }
  } else {
    track("PageView", {}, { dedupKey: "PageView" });
    window.__roboTraderMetaPixelPageView = true;
  }
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

function observeSections() {
  const sections = selectAll("main section[id]");
  if (!sections.length || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.45) return;
      const section = entry.target;
      track("SectionView", {
        section_id: section.id,
        section_label: section.getAttribute("aria-labelledby") || section.id
      }, { dedupKey: `SectionView:${section.id}` });
      observer.unobserve(section);
    });
  }, { threshold: [0.45, 0.65] });
  sections.forEach((section) => observer.observe(section));
}

function bindScrollDepth() {
  const thresholds = [25, 50, 75, 90];
  const reached = new Set();
  const update = () => {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const current = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
    thresholds.forEach((threshold) => {
      if (current < threshold || reached.has(threshold)) return;
      reached.add(threshold);
      track("ScrollDepth", { depth: threshold }, { dedupKey: `ScrollDepth:${threshold}` });
    });
    if (reached.size === thresholds.length) window.removeEventListener("scroll", update);
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function bindFAQInteractions() {
  selectAll(".accordion__trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const willOpen = trigger.getAttribute("aria-expanded") !== "true";
      if (!willOpen) return;
      track("FAQOpen", {
        question: trigger.textContent.trim().replace(/\s+/g, " ").slice(0, 120),
        accordion_id: trigger.getAttribute("aria-controls") || "unknown"
      });
    });
  });
}

export function initTracking() {
  captureAttribution();
  bindCTAs();
  bindFAQInteractions();
  bindScrollDepth();
  observeOffer();
  observeSections();
  window.addEventListener("robo:consent-change", (event) => {
    if (event.detail?.value === "accepted") activateMarketing();
  });
  if (getMarketingConsent() === "accepted") activateMarketing();
}
