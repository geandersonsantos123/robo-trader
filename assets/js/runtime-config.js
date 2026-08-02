// Configuração segura do protótipo. Integrações desconhecidas permanecem vazias.
// Este arquivo roda no navegador e não pode conter segredos.
const localHostnames = new Set(["localhost", "127.0.0.1", "[::1]"]);

export const runtimeConfig = Object.freeze({
  metaPixelId: "",
  checkoutUrl: "https://pay.hotmart.com/B96582866Y?off=6k2dunwv&hotfeature=51&_hi=eyJjaWQiOiIxNzU5NTg4MjYzNjM2Mjk5NzMxNDA4MjE3NTY5MDAwIiwiYmlkIjoiMTc1OTU4ODI2MzYzNjI5OTczMTQwODIxNzU2OTAwMCIsInNpZCI6IjgyM2YwMWZhNzMzMjRjMjRiY2U5ZDk0NzdlYjkyNzk0In0=.1785681452775&bid=1785681454245",
  whatsappNumber: "",
  whatsappMessage: "",
  videoUrl: "",
  videoPoster: "assets/images/posters/vsl-humanoid-poster.webp",
  productName: "ROBÔ TRADER",
  productId: "robo-trader",
  price: 147,
  regularPrice: 697.9,
  promoEndAt: "2026-08-05T14:40:12.625Z",
  currency: "BRL",
  companyName: "",
  supportEmail: "",
  consentRequired: true,
  showTestimonials: false,
  debug: localHostnames.has(window.location.hostname)
});
