// Configuração segura do protótipo. Integrações desconhecidas permanecem vazias.
// Este arquivo roda no navegador e não pode conter segredos.
const localHostnames = new Set(["localhost", "127.0.0.1", "[::1]"]);

export const runtimeConfig = Object.freeze({
  metaPixelId: "",
  checkoutUrl: "",
  whatsappNumber: "",
  whatsappMessage: "",
  videoUrl: "",
  videoPoster: "assets/images/posters/vsl-placeholder.svg",
  productName: "ROBÔ TRADER",
  productId: "robo-trader",
  price: 197,
  currency: "BRL",
  companyName: "",
  supportEmail: "",
  consentRequired: true,
  showTestimonials: false,
  debug: localHostnames.has(window.location.hostname)
});
