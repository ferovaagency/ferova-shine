/**
 * Centralized payment links config — Ferova Agency
 * COP: MercadoPago | USD: LemonSqueezy
 */
export const paymentLinks = {

  // ── ASESORÍAS ─────────────────────────────────────────────────
  asesoria30: {
    usd: 'https://ferova.lemonsqueezy.com/checkout/buy/6acec4f4-474c-4ee3-8c8c-8018151503d5',
    cop: 'https://mpago.li/2m3o1ow',
  },
  asesoria60: {
    usd: 'https://ferova.lemonsqueezy.com/checkout/buy/6653a2a4-b465-45c5-b633-52fc987f4f94',
    cop: 'https://mpago.li/2QdXv3N',
  },

  // ── DISEÑO DE LOGOS / BRANDING ────────────────────────────────
  brandingEssential: {
    usd: 'https://ferova.lemonsqueezy.com/checkout/buy/88f0cdf8-7c81-4ea2-a3c3-14f16dce0b24',
    cop: 'https://mpago.li/1EsHYki',
  },

  // ── SEO ───────────────────────────────────────────────────────
  seoGeoLocal: {
    usd: 'https://wa.link/seogeo', // TODO: reemplazar con link de pago USD
    cop: 'https://wa.link/seogeo', // TODO: reemplazar con link de pago COP
  },

  // ── DISEÑO WEB / WEBAPP ───────────────────────────────────────
  webEconomico: {
    usd: 'https://wa.link/web-economico', // TODO
    cop: 'https://wa.link/web-economico', // TODO
  },
  webPro: {
    usd: 'https://wa.link/web-pro', // TODO
    cop: 'https://wa.link/web-pro', // TODO
  },
  webEcommerce: {
    usd: 'https://wa.link/web-ecommerce', // TODO
    cop: 'https://wa.link/web-ecommerce', // TODO
  },

  // ── PAUTA DIGITAL ─────────────────────────────────────────────
  pautaEsencial: {
    usd: 'https://wa.link/pauta-esencial', // TODO
    cop: 'https://wa.link/pauta-esencial', // TODO
  },
  pautaEstrategico: {
    usd: 'https://wa.link/pauta-estrategico', // TODO
    cop: 'https://wa.link/pauta-estrategico', // TODO
  },
  pautaPremium: {
    usd: 'https://wa.link/pauta-premium', // TODO
    cop: 'https://wa.link/pauta-premium', // TODO
  },

  // ── OPTIMIZACIÓN WHATSAPP BUSINESS ────────────────────────────
  whatsapp1: {
    usd: 'https://wa.link/wp-1prod', // TODO
    cop: 'https://wa.link/wp-1prod', // TODO
  },
  whatsapp10: {
    usd: 'https://wa.link/wp-10prod', // TODO
    cop: 'https://wa.link/wp-10prod', // TODO
  },
  whatsapp20: {
    usd: 'https://wa.link/wp-20prod', // TODO
    cop: 'https://wa.link/wp-20prod', // TODO
  },

} as const;

export type PaymentLinkKey = keyof typeof paymentLinks;

export function getPaymentLink(key: PaymentLinkKey, currency: 'usd' | 'cop'): string {
  return paymentLinks[key][currency];
}
