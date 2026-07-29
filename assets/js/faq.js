import { select, selectAll } from "./utils.js";

export function initAccordions() {
  selectAll("[data-accordion]").forEach((accordion) => {
    const items = selectAll(".accordion__item", accordion);
    const single = accordion.dataset.accordionMode === "single";

    const setItem = (item, open) => {
      const trigger = select(".accordion__trigger", item);
      const panelId = trigger?.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!trigger || !panel) return;
      trigger.setAttribute("aria-expanded", String(open));
      panel.hidden = !open;
    };

    items.forEach((item, index) => {
      setItem(item, index === 0);
      const trigger = select(".accordion__trigger", item);
      trigger?.addEventListener("click", () => {
        const willOpen = trigger.getAttribute("aria-expanded") !== "true";
        if (single && willOpen) items.forEach((other) => setItem(other, false));
        setItem(item, willOpen);
      });
    });
  });
}
