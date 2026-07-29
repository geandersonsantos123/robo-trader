import { runtimeConfig } from "./runtime-config.js";
import { track } from "./tracking.js";
import { select, toSafeUrl } from "./utils.js";

export function initVideo({ showDialog }) {
  const video = select("#vsl-video");
  const play = select("[data-video-play]");
  const status = select("[data-video-status]");
  if (!video || !play) return;

  if (runtimeConfig.videoPoster) video.poster = runtimeConfig.videoPoster;

  const bindProgress = () => {
    const reached = new Set();
    video.addEventListener("play", () => {
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

  play.addEventListener("click", async () => {
    const source = toSafeUrl(runtimeConfig.videoUrl);
    if (!source) {
      showDialog({
        title: "VSL preparada",
        message: "A estrutura do player está pronta, mas o vídeo oficial ainda não foi fornecido. Nenhum conteúdo externo foi carregado."
      });
      return;
    }

    if (!video.src) {
      video.src = source.href;
      video.controls = true;
      bindProgress();
    }
    play.hidden = true;
    if (status) status.textContent = "Vídeo carregado após sua interação.";
    try {
      await video.play();
    } catch {
      play.hidden = false;
      if (status) status.textContent = "Não foi possível iniciar o vídeo. Use os controles do player ou tente novamente.";
    }
  });
}
