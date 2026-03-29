export const paymentLinks = {
  asesoria30: {
    usd: 'https://ferova.lemonsqueezy.com/checkout/buy/6acec4f4-474c-4ee3-8c8c-8018151503d5',
    cop: 'https://mpago.li/2m3o1ow',
    brl: 'https://wa.me/17865787671',
  },
  asesoria60: {
    usd: 'https://ferova.lemonsqueezy.com/checkout/buy/6653a2a4-b465-45c5-b633-52fc987f4f94',
    cop: 'https://mpago.li/2QdXv3N',
    brl: 'https://wa.me/17865787671',
  },
  brandingEssential: {
    usd: 'https://ferova.lemonsqueezy.com/checkout/buy/88f0cdf8-7c81-4ea2-a3c3-14f16dce0b24',
    cop: 'https://mpago.li/1EsHYki',
    brl: 'https://wa.me/17865787671',
  },
  seoGeoLocal: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  webEconomico: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  webPro: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  webEcommerce: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  webServicios: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  webEcommerceFull: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  seoWebapps: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  seoCms: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  pautaEsencial: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  pautaEstrategico: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  pautaPremium: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  whatsapp1: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  whatsapp10: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
  whatsapp20: {
    usd: 'https://wa.me/17865787671',
    cop: 'https://wa.me/17865787671',
    brl: 'https://wa.me/17865787671',
  },
} as const;

export type PaymentLinkKey = keyof typeof paymentLinks;

export function getPaymentLink(key: PaymentLinkKey, currency: 'usd' | 'cop' | 'brl'): string {
  return paymentLinks[key][currency];
}
