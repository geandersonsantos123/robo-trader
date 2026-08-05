import { select, selectAll } from "./utils.js";

function getStep(track) {
  const card = select("[data-carousel-card]", track);
  if (!card) return 0;
  const styles = window.getComputedStyle(track);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
  return card.getBoundingClientRect().width + gap;
}

function getActiveIndex(viewport, track) {
  const step = getStep(track);
  if (!step) return 0;
  return Math.round(viewport.scrollLeft / step);
}

export function initAssetCarousel() {
  selectAll("[data-asset-carousel]").forEach((root) => {
    const viewport = select("[data-carousel-viewport]", root);
    const track = select("[data-carousel-track]", root);
    const previous = select("[data-carousel-prev]", root);
    const next = select("[data-carousel-next]", root);
    const dots = select("[data-carousel-dots]", root);
    const progress = select("[data-carousel-progress]", root);
    const cards = selectAll("[data-carousel-card]", root);

    if (!viewport || !track || !cards.length) return;

    const dotButtons = cards.map((card, index) => {
      card.id ||= `asset-card-${index + 1}`;
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Ver ativo ${index + 1}`);
      button.setAttribute("aria-controls", card.id);
      button.addEventListener("click", () => {
        viewport.scrollTo({ left: getStep(track) * index, behavior: "smooth" });
      });
      dots?.append(button);
      return button;
    });

    const update = () => {
      const activeIndex = Math.max(0, Math.min(cards.length - 1, getActiveIndex(viewport, track)));
      const maxScroll = viewport.scrollWidth - viewport.clientWidth - 2;
      const progressRatio = maxScroll > 0 ? Math.min(1, Math.max(0, viewport.scrollLeft / maxScroll)) : 1;
      previous?.toggleAttribute("disabled", viewport.scrollLeft <= 2);
      next?.toggleAttribute("disabled", viewport.scrollLeft >= maxScroll);
      progress?.style.setProperty("transform", `scaleX(${Math.max(0.18, progressRatio)})`);
      dotButtons.forEach((button, index) => {
        button.classList.toggle("is-active", index === activeIndex);
        button.setAttribute("aria-current", index === activeIndex ? "true" : "false");
      });
    };

    previous?.addEventListener("click", () => {
      viewport.scrollBy({ left: -getStep(track), behavior: "smooth" });
    });

    next?.addEventListener("click", () => {
      viewport.scrollBy({ left: getStep(track), behavior: "smooth" });
    });

    viewport.addEventListener("scroll", () => window.requestAnimationFrame(update), { passive: true });
    window.addEventListener("resize", update);
    update();
  });
}
