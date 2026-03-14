/**
 * Centralized payment links placeholder config.
 * Replace each TODO_URL with the actual payment gateway link.
 */
export const paymentLinks = {
  asesoria30: {
    usd: 'https://wa.link/asesoria30',      // TODO: replace with USD payment link
    cop: 'https://wa.link/asesoria30',      // TODO: replace with COP payment link
  },
  asesoria60: {
    usd: 'https://wa.link/asesoria60',      // TODO: replace with USD payment link
    cop: 'https://wa.link/asesoria60',      // TODO: replace with COP payment link
  },
  brandingEssential: {
    usd: 'https://wa.link/branding',        // TODO: replace with USD payment link
    cop: 'https://wa.link/branding',        // TODO: replace with COP payment link
  },
  seoGeoLocal: {
    usd: 'https://wa.link/seogeo',          // TODO: replace with USD payment link
    cop: 'https://wa.link/seogeo',          // TODO: replace with COP payment link
  },
} as const;

export type PaymentLinkKey = keyof typeof paymentLinks;

export function getPaymentLink(key: PaymentLinkKey, currency: 'usd' | 'cop'): string {
  return paymentLinks[key][currency];
}
