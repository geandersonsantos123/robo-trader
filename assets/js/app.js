import { runtimeConfig } from "./runtime-config.js";
import { initAccordions } from "./faq.js";
import { initAssetCarousel } from "./asset-carousel.js";
import { initCertificatePreview } from "./certificate-preview.js";
import { initNavigation } from "./navigation.js";
import { initReveals } from "./reveal.js";
import { initStickyCTA } from "./sticky-cta.js";
import { initTimeline } from "./timeline.js";
import { initGlobalOrb } from "./global-orb.js";
import { initPreloader } from "./preloader.js";
import { initPromoCountdown } from "./promo-countdown.js";
import { appendAttribution, getMarketingConsent, initTracking, setMarketingConsent, track } from "./tracking.js";
import { initVideo } from "./video.js";
import { select, selectAll, setText, toSafeUrl } from "./utils.js";

const dialog = select("#integration-dialog");
const dialogTitle = select("#integration-title");
const dialogMessage = select("[data-dialog-message]");
let dialogReturnFocus = null;

function closeDialog() {
  if (!dialog) return;
  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
  document.body.classList.remove("dialog-open");
  dialogReturnFocus?.focus?.();
}

function showDialog({ title, message }) {
  if (!dialog) return;
  dialogReturnFocus = document.activeElement;
  setText(dialogTitle, title);
  setText(dialogMessage, message);
  document.body.classList.add("dialog-open");
  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
  select("[data-dialog-return]", dialog)?.focus();
}

function initDialog() {
  selectAll("[data-dialog-close], [data-dialog-return]", dialog).forEach((button) => button.addEventListener("click", closeDialog));
  dialog?.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeDialog();
  });
  dialog?.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !dialog.hasAttribute("open")) return;
    event.preventDefault();
    closeDialog();
  });
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
}

function handleCommercialAction(sourceSection) {
  const checkout = toSafeUrl(runtimeConfig.checkoutUrl, { allowRelative: false });

  if (!checkout) {
    showDialog({
      title: "Canal comercial preparado",
      message: "O checkout oficial ainda não foi confirmado. Nenhuma URL falsa foi aberta e nenhum evento de checkout real foi disparado."
    });
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
  initPreloader();
  initDialog();
  initTracking();
  initConsent();
  initNavigation();
  initAccordions();
  initAssetCarousel();
  initCertificatePreview();
  initTimeline();
  initGlobalOrb();
  initPromoCountdown();
  initVideo({ showDialog });
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
