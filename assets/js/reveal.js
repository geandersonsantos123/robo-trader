import { selectAll } from "./utils.js";

export function initReveals() {
  const elements = selectAll("[data-reveal]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!elements.length || reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  selectAll("[data-reveal-group]").forEach((group) => {
    selectAll("[data-reveal]", group).forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 65}ms`);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -7%" });

  document.documentElement.classList.add("js-enhanced");
  elements.forEach((element) => observer.observe(element));
}
