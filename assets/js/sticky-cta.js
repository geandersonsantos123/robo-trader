import { track } from "./tracking.js";
import { select, setText } from "./utils.js";

export function initStickyCTA({ onCommercial }) {
  const sticky = select("[data-sticky-cta]");
  const button = select("[data-sticky-button]");
  const price = select("[data-sticky-price]");
  const kicker = select("[data-sticky-kicker]");
  const method = select("#metodo");
  const offer = select("#oferta");
  const offerCTA = select("[data-offer-cta]");
  const footer = select("[data-site-footer]");
  if (!sticky || !button || !method || !offer) return;

  const state = { methodReached: false, offerSeen: false, offerCTAVisible: false, footerVisible: false };
  const render = () => {
    const visible = state.methodReached && !state.offerCTAVisible && !state.footerVisible;
    sticky.classList.toggle("is-visible", visible);
    sticky.setAttribute("aria-hidden", String(!visible));
    price.hidden = !state.offerSeen;
    setText(kicker, state.offerSeen ? "Investimento total" : "Conheça a estrutura");
    setText(button, state.offerSeen ? "Quero acessar" : "Ver estrutura completa");
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

    const offerObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) state.offerSeen = true;
      render();
    }, { threshold: 0.08 });
    offerObserver.observe(offer);

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
    if (!state.offerSeen) {
      track("CTAInteraction", { cta_id: "sticky-primary", label: "Ver estrutura completa", section: "sticky", destination: "#entrega", action_type: "scroll" });
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.querySelector("#entrega")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      return;
    }
    track("CTAInteraction", { cta_id: "sticky-primary", label: "Quero acessar", section: "sticky", destination: "checkout", action_type: "commercial" });
    onCommercial("sticky");
  });

  render();
}
