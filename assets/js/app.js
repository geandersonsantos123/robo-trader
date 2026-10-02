import { runtimeConfig } from "./runtime-config.js";
import { initAccordions } from "./faq.js";
import { initAssetCarousel } from "./asset-carousel.js";
import { initCertificatePreview } from "./certificate-preview.js";
import { initNavigation } from "./navigation.js";
import { initReveals } from "./reveal.js";
import { initStickyCTA } from "./sticky-cta.js";
import { initTimeline } from "./timeline.js";
import { initPreloader } from "./preloader.js";
import { initPromoCountdown } from "./promo-countdown.js";
import { appendAttribution, getMarketingConsent, initTracking, setMarketingConsent, track } from "./tracking.js";
import { initVideo } from "./video.js";
import { formatPrice, select, selectAll, toSafeUrl, setText } from "./utils.js";

function handleCommercialAction(sourceSection) {
  const checkout = toSafeUrl(runtimeConfig.checkoutUrl, { allowRelative: false });

  if (!checkout) {
    console.warn("[Robô Trader] Checkout oficial indisponível.");
    return;
  }

  track("InitiateCheckout", {
    content_name: runtimeConfig.productName,
    content_ids: [runtimeConfig.productId],
    value: runtimeConfig.price,
    currency: runtimeConfig.currency,
    source_section: sourceSection
  });
  window.location.assign(appendAttribution(checkout.href));
}

function initCommercialActions() {
  selectAll("[data-commercial-action]").forEach((button) => {
    button.addEventListener("click", () => handleCommercialAction(button.dataset.section || "unknown"));
  });
}

function renderConfiguredPrice() {
  const price = formatPrice(runtimeConfig.price, runtimeConfig.currency);
  const installmentPrice = formatPrice(runtimeConfig.installmentPrice, runtimeConfig.currency);
  selectAll("[data-price]").forEach((element) => setText(element, price));
  selectAll("[data-installment-count]").forEach((element) => setText(element, String(runtimeConfig.installmentCount)));
  selectAll("[data-installment-price]").forEach((element) => setText(element, installmentPrice));
  selectAll("[data-price-template]").forEach((element) => {
    setText(element, element.dataset.priceTemplate.replace("{price}", price));
  });
}

function initConsent() {
  const banner = select("[data-consent-banner]");
  if (!banner) return;

  const show = () => {
    banner.hidden = false;
    document.body.classList.add("consent-open");
  };
  const hide = () => {
    banner.hidden = true;
    document.body.classList.remove("consent-open");
  };

  selectAll("[data-consent]", banner).forEach((button) => {
    button.addEventListener("click", () => {
      setMarketingConsent(button.dataset.consent);
      hide();
    });
  });
  selectAll("[data-consent-settings]").forEach((button) => button.addEventListener("click", show));

  if (runtimeConfig.consentRequired && getMarketingConsent() === "unset") show();
}

function init() {
  document.documentElement.classList.remove("no-js");
  renderConfiguredPrice();
  initPreloader();
  initTracking();
  initConsent();
  initNavigation();
  initAccordions();
  initAssetCarousel();
  initCertificatePreview();
  initTimeline();
  initPromoCountdown();
  initVideo();
  initCommercialActions();
  initStickyCTA({ onCommercial: handleCommercialAction });
  initReveals();
}

try {
  init();
} catch (error) {
  document.documentElement.classList.add("no-js");
  document.documentElement.classList.remove("js-enhanced");
  selectAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
  if (runtimeConfig.debug) console.error("[Robô Trader] Falha de aprimoramento progressivo", error);
}
