import { selectAll } from "./utils.js";

const COLORS = {
  brand: "0, 230, 184",
  turquoise: "0, 216, 194",
  cyan: "0, 205, 232",
  text: "245, 247, 247"
};

const routePairs = [
  [[-23, -46], [40, -74]],
  [[-15, -47], [51, -0.1]],
  [[19, 72], [35, 139]],
  [[1.3, 103], [-33, 151]],
  [[-26, 28], [25, 55]],
  [[52, 13], [1.3, 103]]
];

const continentSeeds = [
  { lat: 45, lon: -100, w: 46, h: 28, count: 86 },
  { lat: -15, lon: -60, w: 28, h: 42, count: 66 },
  { lat: 52, lon: 15, w: 28, h: 20, count: 58 },
  { lat: 5, lon: 20, w: 34, h: 46, count: 82 },
  { lat: 34, lon: 86, w: 66, h: 30, count: 116 },
  { lat: -25, lon: 135, w: 26, h: 18, count: 34 },
  { lat: 68, lon: -42, w: 18, h: 10, count: 18 }
];

function createRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function toRad(value) {
  return (value * Math.PI) / 180;
}

function makePoints(isCompact) {
  const random = createRandom(72026);
  const scale = isCompact ? 0.58 : 1;
  const points = [];

  continentSeeds.forEach((seed) => {
    const count = Math.max(10, Math.round(seed.count * scale));
    for (let index = 0; index < count; index += 1) {
      const angle = random() * Math.PI * 2;
      const radius = Math.sqrt(random());
      const lat = seed.lat + Math.sin(angle) * radius * seed.h;
      const lon = seed.lon + Math.cos(angle) * radius * seed.w;
      if (lat > -68 && lat < 78) points.push({ lat, lon, glow: random() > 0.9 ? 1 : 0 });
    }
  });

  return points;
}

function makeRoute([from, to], segments = 56) {
  const [latA, lonA] = from;
  const [latB, lonB] = to;
  const points = [];

  for (let index = 0; index <= segments; index += 1) {
    const t = index / segments;
    const arc = Math.sin(Math.PI * t) * 18;
    points.push({
      lat: latA + (latB - latA) * t + arc * 0.18,
      lon: lonA + (lonB - lonA) * t
    });
  }

  return points;
}

function project({ lat, lon }, state, radius) {
  const latitude = toRad(lat);
  const longitude = toRad(lon + state.rotation);
  const cosLat = Math.cos(latitude);
  const x = cosLat * Math.sin(longitude);
  const y = Math.sin(latitude);
  const z = cosLat * Math.cos(longitude);
  const tiltX = state.tiltY * z;
  const tiltY = state.tiltX * z;
  const depth = 0.78 + (z + 1) * 0.13;

  return {
    x: (x + tiltX) * radius * depth,
    y: (-y + tiltY) * radius * depth,
    z,
    alpha: Math.max(0, Math.min(1, (z + 0.22) / 1.22)),
    depth
  };
}

function drawPolyline(ctx, projected, alpha, width, color) {
  const visible = projected.filter((point) => point.alpha > 0.03);
  if (visible.length < 2) return;

  ctx.beginPath();
  visible.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.strokeStyle = `rgba(${color}, ${alpha})`;
  ctx.lineWidth = width;
  ctx.stroke();
}

function initOrb(root) {
  const canvas = root.querySelector("canvas");
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext("2d", { alpha: true });
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state = {
    rotation: -20,
    tiltX: 0,
    tiltY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    inView: true,
    reduced: media.matches,
    hoverBoost: 0
  };
  let frame = null;
  let width = 0;
  let height = 0;
  let compact = false;
  let points = [];
  let routes = [];

  const resize = () => {
    const rect = root.getBoundingClientRect();
    const size = Math.max(260, Math.round(Math.min(rect.width, rect.height || rect.width)));
    const ratio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.35 : 1.7);
    width = size;
    height = size;
    compact = window.innerWidth < 680 || navigator.hardwareConcurrency <= 4;
    canvas.width = Math.round(size * ratio);
    canvas.height = Math.round(size * ratio);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    points = makePoints(compact);
    routes = routePairs.slice(0, compact ? 4 : 6).map((route) => makeRoute(route, compact ? 34 : 58));
  };

  const draw = (time = 0) => {
    const radius = Math.min(width, height) * 0.38;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height / 2);

    const pulse = state.reduced ? 0.25 : Math.sin(time / 1600) * 0.5 + 0.5;
    const halo = ctx.createRadialGradient(0, 0, radius * 0.6, 0, 0, radius * 1.35);
    halo.addColorStop(0, `rgba(${COLORS.brand}, ${0.08 + pulse * 0.03})`);
    halo.addColorStop(0.62, `rgba(${COLORS.cyan}, 0.08)`);
    halo.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 1.32, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(${COLORS.turquoise}, 0.22)`;
    ctx.lineWidth = 1;
    for (let lon = -120; lon <= 120; lon += 60) {
      const meridian = [];
      for (let lat = -72; lat <= 72; lat += 6) meridian.push(project({ lat, lon }, state, radius));
      drawPolyline(ctx, meridian, 0.16, 1, COLORS.turquoise);
    }
    for (let lat = -45; lat <= 45; lat += 22.5) {
      const parallel = [];
      for (let lon = -180; lon <= 180; lon += 8) parallel.push(project({ lat, lon }, state, radius));
      drawPolyline(ctx, parallel, 0.13, 1, COLORS.turquoise);
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${COLORS.brand}, 0.34)`;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    routes.forEach((route, routeIndex) => {
      const projected = route.map((point) => project(point, state, radius));
      drawPolyline(ctx, projected, compact ? 0.22 : 0.28, compact ? 1 : 1.2, routeIndex % 2 ? COLORS.cyan : COLORS.brand);

      if (!state.reduced) {
        const head = (time / (3600 + routeIndex * 280) + routeIndex * 0.17) % 1;
        const pulseIndex = Math.min(route.length - 1, Math.max(0, Math.round(head * (route.length - 1))));
        const point = project(route[pulseIndex], state, radius);
        if (point.alpha > 0.08) {
          ctx.fillStyle = `rgba(${COLORS.text}, ${0.52 * point.alpha})`;
          ctx.shadowColor = `rgba(${COLORS.cyan}, 0.9)`;
          ctx.shadowBlur = compact ? 10 : 18;
          ctx.beginPath();
          ctx.arc(point.x, point.y, compact ? 2.2 : 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    });

    points.forEach((point) => {
      const projected = project(point, state, radius);
      if (projected.alpha <= 0.015) return;
      const dot = point.glow ? 1.75 : 1;
      const size = (compact ? 1 : 1.25) * dot * projected.depth;
      const alpha = (point.glow ? 0.68 : 0.38) * projected.alpha * (1 + state.hoverBoost * 0.22);
      ctx.fillStyle = `rgba(${point.glow ? COLORS.cyan : COLORS.brand}, ${alpha})`;
      if (point.glow) {
        ctx.shadowColor = `rgba(${COLORS.brand}, 0.8)`;
        ctx.shadowBlur = compact ? 7 : 12;
      }
      ctx.beginPath();
      ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.restore();
  };

  const animate = (time) => {
    state.tiltX += (state.targetTiltX - state.tiltX) * 0.04;
    state.tiltY += (state.targetTiltY - state.tiltY) * 0.04;
    state.hoverBoost += ((state.targetTiltX || state.targetTiltY ? 1 : 0) - state.hoverBoost) * 0.05;
    if (!state.reduced && state.inView) state.rotation += compact ? 0.035 : 0.05;
    draw(time);
    if (state.reduced) {
      frame = null;
      return;
    }
    frame = window.requestAnimationFrame(animate);
  };

  const onPointerMove = (event) => {
    if (window.innerWidth < 900 || state.reduced) return;
    const rect = root.getBoundingClientRect();
    state.targetTiltY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.12;
    state.targetTiltX = ((event.clientY - rect.top) / rect.height - 0.5) * -0.1;
  };

  const onPointerLeave = () => {
    state.targetTiltX = 0;
    state.targetTiltY = 0;
  };

  const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
    state.inView = entry.isIntersecting;
  }, { threshold: 0.12 }) : null;

  media.addEventListener?.("change", (event) => {
    state.reduced = event.matches;
    if (state.reduced) draw();
    else if (!frame) frame = window.requestAnimationFrame(animate);
  });

  resize();
  root.classList.add("is-ready");
  root.addEventListener("pointermove", onPointerMove);
  root.addEventListener("pointerleave", onPointerLeave);
  window.addEventListener("resize", resize, { passive: true });
  observer?.observe(root);
  frame = window.requestAnimationFrame(animate);

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
    root.removeEventListener("pointermove", onPointerMove);
    root.removeEventListener("pointerleave", onPointerLeave);
    observer?.disconnect();
  };
}

export function initGlobalOrb() {
  selectAll("[data-global-orb]").forEach((root) => initOrb(root));
}
