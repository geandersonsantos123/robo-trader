// Copie somente valores confirmados para runtime-config.js.
// Este arquivo é público: nunca coloque segredos, tokens privados ou credenciais aqui.
export const CHECKOUT_URL = "";

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
  consentRequired: false,
  showTestimonials: false,
  debug: false
});
