import { track } from "./tracking.js";
import { select, setText } from "./utils.js";

export function initStickyCTA() {
  const sticky = select("[data-sticky-cta]");
  const button = select("[data-sticky-button]");
  const kicker = select("[data-sticky-kicker]");
  const method = select("#metodo");
  const offer = select("#oferta");
  const offerCTA = select("[data-offer-cta]");
  const footer = select("[data-site-footer]");
  if (!sticky || !button || !method || !offer) return;

  const state = { methodReached: false, offerCTAVisible: false, footerVisible: false };
  const render = () => {
    const visible = state.methodReached && !state.offerCTAVisible && !state.footerVisible;
    sticky.classList.toggle("is-visible", visible);
    sticky.setAttribute("aria-hidden", String(!visible));
    setText(kicker, document.body.classList.contains("promo-expired") ? "Condição promocional encerrada" : "OFERTA LIMITADA • 1 HORA");
    setText(button, "Comprar agora");
  };

  if ("IntersectionObserver" in window) {
    const methodObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        state.methodReached = true;
        methodObserver.disconnect();
        render();
      }
    }, { threshold: 0.12 });
    methodObserver.observe(method);

    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === offerCTA) state.offerCTAVisible = entry.isIntersecting;
        if (entry.target === footer) state.footerVisible = entry.isIntersecting;
      });
      render();
    }, { threshold: 0.2 });
    if (offerCTA) visibilityObserver.observe(offerCTA);
    if (footer) visibilityObserver.observe(footer);
  }

  button.addEventListener("click", () => {
    track("CTAInteraction", { cta_id: "sticky-primary", label: "Comprar agora", section: "sticky", destination: "#oferta", action_type: "scroll" });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    offer.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  });

  render();
}
