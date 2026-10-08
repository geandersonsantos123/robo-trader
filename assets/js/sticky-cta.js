import { track } from "./tracking.js";
import { select, setText } from "./utils.js";

export function initStickyCTA({ onCommercial } = {}) {
  const sticky = select("[data-sticky-cta]");
  const button = select("[data-sticky-button]");
  const price = select("[data-sticky-price]");
  const kicker = select("[data-sticky-kicker]");
  const method = select("#metodo");
  const offerCTA = select("[data-offer-cta]");
  const footer = select("[data-site-footer]");
  if (!sticky || !button || !method) return;

  const state = { methodReached: false, offerCTAVisible: false, footerVisible: false };
  const render = () => {
    const visible = state.methodReached && !state.offerCTAVisible && !state.footerVisible;
    sticky.classList.toggle("is-visible", visible);
    sticky.setAttribute("aria-hidden", String(!visible));
    setText(kicker, "OFERTA LIMITADA • 1 HORA");
    if (price) price.hidden = false;
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
    track("CTAInteraction", { cta_id: "sticky-primary", label: "Comprar agora", section: "sticky", destination: "checkout", action_type: "commercial" });
    if (typeof onCommercial === "function") onCommercial("sticky");
  });

  render();
}
