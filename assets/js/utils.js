export const select = (selector, scope = document) => scope.querySelector(selector);
export const selectAll = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export function getFocusable(container) {
  return selectAll(
    'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
    container
  ).filter((element) => !element.hidden && element.getClientRects().length > 0);
}

export function safeStorage(storage, action, key, value) {
  try {
    if (action === "get") return storage.getItem(key);
    if (action === "set") storage.setItem(key, value);
    if (action === "remove") storage.removeItem(key);
  } catch {
    return null;
  }
  return null;
}

export function toSafeUrl(value, { allowRelative = true } = {}) {
  if (!value || typeof value !== "string") return null;
  try {
    const url = new URL(value, window.location.href);
    if (!allowRelative && url.origin === window.location.origin && !/^https?:/i.test(value)) return null;
    if (!new Set(["http:", "https:"]).has(url.protocol)) return null;
    return url;
  } catch {
    return null;
  }
}

export function setText(element, value) {
  if (element && typeof value === "string") element.textContent = value;
}
