import { runtimeConfig } from "./runtime-config.js";
import { track } from "./tracking.js";
import { select, selectAll, toSafeUrl } from "./utils.js";

export function initVideo({ showDialog }) {
  const video = select("#vsl-video");
  const playButtons = selectAll("[data-video-play]");
  const status = select("[data-video-status]");
  if (!video) return;

  if (runtimeConfig.videoPoster) video.poster = runtimeConfig.videoPoster;

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

  const inlineSource = video.querySelector("source")?.src || video.currentSrc || video.src;
  if (inlineSource) bindProgress();

  if (!playButtons.length) return;

  const handlePlayClick = async () => {
    const source = toSafeUrl(runtimeConfig.videoUrl) || toSafeUrl(inlineSource);
    if (!source) {
      showDialog({
        title: "VSL preparada",
        message: "A estrutura do player está pronta, mas o vídeo oficial ainda não foi fornecido. Nenhum conteúdo externo foi carregado."
      });
      return;
    }

    if (!video.currentSrc && !video.src) {
      video.src = source.href;
      video.controls = true;
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
