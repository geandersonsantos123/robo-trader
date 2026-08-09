import { runtimeConfig } from "./runtime-config.js";
import { track } from "./tracking.js";
import { select, selectAll, toSafeUrl } from "./utils.js";

export function initVideo() {
  const video = select("#vsl-video");
  const playButtons = selectAll("[data-video-play]");
  const status = select("[data-video-status]");
  if (!video) return;

  if (runtimeConfig.videoPoster) video.poster = runtimeConfig.videoPoster;
  video.preload = "none";

  let progressBound = false;
  const bindProgress = () => {
    if (progressBound) return;
    progressBound = true;
    const reached = new Set();

    video.addEventListener("play", () => {
      playButtons.forEach((button) => {
        button.hidden = true;
      });
      track("VideoStart", { video_id: "vsl", source_section: "hero" }, { dedupKey: "VideoStart:vsl" });
    });

    video.addEventListener("timeupdate", () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      const progress = (video.currentTime / video.duration) * 100;
      [25, 50, 75].forEach((threshold) => {
        if (progress < threshold || reached.has(threshold)) return;
        reached.add(threshold);
        track(`VideoProgress${threshold}`, { video_id: "vsl", progress: threshold }, { dedupKey: `VideoProgress:vsl:${threshold}` });
      });
    });

    video.addEventListener("ended", () => {
      track("VideoComplete", { video_id: "vsl", progress: 100 }, { dedupKey: "VideoComplete:vsl" });
    });
  };

  const lazySource = video.dataset.videoSrc || runtimeConfig.videoUrl;

  if (!playButtons.length) return;

  const handlePlayClick = async () => {
    const source = toSafeUrl(lazySource);
    if (!source) {
      if (status) status.textContent = "Não foi possível localizar o vídeo oficial.";
      return;
    }

    if (!video.currentSrc && !video.src) {
      video.src = source.href;
      video.controls = true;
      bindProgress();
    }

    playButtons.forEach((button) => {
      button.hidden = true;
    });
    if (status) status.textContent = "Vídeo carregado após sua interação.";

    try {
      await video.play();
    } catch {
      playButtons.forEach((button) => {
        button.hidden = false;
      });
      if (status) status.textContent = "Não foi possível iniciar o vídeo. Use os controles do player ou tente novamente.";
    }
  };

  playButtons.forEach((button) => {
    button.addEventListener("click", handlePlayClick);
  });
}
