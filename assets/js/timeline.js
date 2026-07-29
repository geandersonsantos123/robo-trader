import { selectAll } from "./utils.js";

export function initTimeline() {
  const steps = selectAll("[data-timeline-step]");
  if (!steps.length) return;
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    steps.forEach((step) => step.classList.add("is-active"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-active");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.55, rootMargin: "0px 0px -8%" });

  steps.forEach((step) => observer.observe(step));
}
