// Configuração segura da landing page. Integrações desconhecidas permanecem vazias.
// Este arquivo roda no navegador e não pode conter segredos.
const localHostnames = new Set(["localhost", "127.0.0.1", "[::1]"]);
export const CHECKOUT_URL = "https://pay.hotmart.com/B96582866Y?checkoutMode=10&bid=1791143827797";

export const runtimeConfig = Object.freeze({
  metaPixelId: "",
  checkoutUrl: CHECKOUT_URL,
  whatsappNumber: "",
  whatsappMessage: "",
  videoUrl: "",
  videoPoster: "assets/images/posters/vsl-humanoid-poster.webp",
  productName: "ROBÔ TRADER",
  productId: "robo-trader",
  price: 247,
  installmentCount: 12,
  installmentPrice: 25.55,
  regularPrice: null,
  currency: "BRL",
  companyName: "",
  supportEmail: "",
  consentRequired: true,
  showTestimonials: false,
  debug: localHostnames.has(window.location.hostname)
});
