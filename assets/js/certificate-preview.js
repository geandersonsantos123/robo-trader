import { select, selectAll } from "./utils.js";

export function initCertificatePreview() {
  const dialog = select("[data-certificate-dialog]");
  const openButtons = selectAll("[data-certificate-open]");
  if (!dialog || openButtons.length === 0) return;

  let returnFocus = null;

  const close = () => {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("dialog-open");
    returnFocus?.focus?.();
  };

  const open = (trigger) => {
    returnFocus = trigger;
    document.body.classList.add("dialog-open");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    select("[data-certificate-close]", dialog)?.focus();
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", () => open(button));
  });

  selectAll("[data-certificate-close]", dialog).forEach((button) => {
    button.addEventListener("click", close);
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) close();
  });
}
