import { getFocusable, select, selectAll } from "./utils.js";

export function initNavigation() {
  const toggle = select("[data-menu-toggle]");
  const nav = select("[data-site-nav]");
  const header = select("[data-site-header]");
  if (!toggle || !nav || !header) return;

  const desktop = window.matchMedia("(min-width: 60rem)");
  let open = false;

  const updateLabel = () => {
    const label = select(".sr-only", toggle);
    if (label) label.textContent = open ? "Fechar menu" : "Abrir menu";
  };

  const setOpen = (next, { restoreFocus = false } = {}) => {
    open = Boolean(next) && !desktop.matches;
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    nav.setAttribute("aria-hidden", desktop.matches ? "false" : String(!open));
    updateLabel();
    if (open) getFocusable(nav)[0]?.focus();
    if (!open && restoreFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => setOpen(!open, { restoreFocus: open }));
  selectAll("a", nav).forEach((link) => link.addEventListener("click", () => setOpen(false)));

  document.addEventListener("click", (event) => {
    if (open && !nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false, { restoreFocus: true });
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = getFocusable(nav);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const syncBreakpoint = () => setOpen(false);
  desktop.addEventListener?.("change", syncBreakpoint);
  syncBreakpoint();

  let ticking = false;
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateHeader);
    }
  }, { passive: true });
  updateHeader();
}
