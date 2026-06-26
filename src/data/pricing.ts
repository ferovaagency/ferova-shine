// Centralized pricing data — all prices in USD, converted in runtime.
// TRMs base: May 23, 2026
export const EXCHANGE_RATES = {
  USD: 1,
  COP: 3667,
  BRL: 5.65,
  EUR: 0.86,
} as const;

export type Currency = keyof typeof EXCHANGE_RATES;

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: 'US$',
  COP: 'COP $',
  BRL: 'R$',
  EUR: '€',
};

export const formatPrice = (usdPrice: number, currency: Currency) => {
  const converted = usdPrice * EXCHANGE_RATES[currency];
  const formatter = new Intl.NumberFormat(
    currency === 'COP' ? 'es-CO' :
    currency === 'BRL' ? 'pt-BR' :
    currency === 'EUR' ? 'es-ES' : 'en-US',
    { maximumFractionDigits: currency === 'COP' ? 0 : 2 },
  );
  return `${CURRENCY_SYMBOLS[currency]}${formatter.format(converted)}`;
};

export interface Plan {
  name: string;
  priceUsd: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export const WEB_APPS_PLANS: Plan[] = [
  {
    name: 'Starter',
    priceUsd: 49,
    period: '/mes',
    description: 'Para emprendedores que arrancan',
    features: [
      'Hasta 50 productos',
      'Generador de fichas con IA (50/mes)',
      'Blog básico',
      'Dominio incluido',
      'Soporte por email',
      'Pagos: Wompi/MercadoPago',
    ],
    cta: 'Empezar',
  },
  {
    name: 'Growth',
    priceUsd: 99,
    period: '/mes',
    description: 'Para negocios que ya facturan',
    features: [
      'Productos ilimitados',
      'Generador de fichas con IA ilimitado',
      'Blog con SEO + GEO',
      'Asesor IA integrado',
      'Multi-categoría',
      'Soporte prioritario WhatsApp',
      'Métricas y analytics',
    ],
    cta: 'Más popular',
    highlighted: true,
  },
  {
    name: 'Scale',
    priceUsd: 199,
    period: '/mes',
    description: 'Para ecommerce que ya venden',
    features: [
      'Todo lo de Growth',
      'Portal de distribuidores B2B',
      'Multi-idioma (ES/EN/PT)',
      'Integraciones custom',
      'A/B testing',
      'Account manager dedicado',
      'Reportes mensuales',
    ],
    cta: 'Hablar con asesor',
  },
];

export const SEO_PLANS: Plan[] = [
  {
    name: 'Auditoría SEO + GEO',
    priceUsd: 297,
    period: 'pago único',
    description: 'Diagnóstico completo de tu sitio',
    features: [
      'Auditoría técnica completa',
      'Análisis de keywords',
      'Análisis de competencia',
      'Plan de acción de 90 días',
      'Sesión de presentación 1h',
    ],
    cta: 'Solicitar auditoría',
  },
  {
    name: 'SEO + GEO + IAO Mensual',
    priceUsd: 597,
    period: '/mes',
    description: 'Posicionamiento continuo',
    features: [
      'Optimización on-page mensual',
      '4 blogs SEO/GEO al mes',
      'Link building white hat',
      'Optimización para ChatGPT, Claude, Perplexity',
      'Reporte mensual con métricas',
      'Llamada estratégica mensual',
    ],
    cta: 'Empezar a posicionarme',
    highlighted: true,
  },
  {
    name: 'SEO Premium',
    priceUsd: 1297,
    period: '/mes',
    description: 'Para sectores competitivos',
    features: [
      'Todo lo del plan Mensual',
      '12 blogs/mes',
      'Estrategia de contenido pillar',
      'PR digital y backlinks premium',
      'Reportes semanales',
      'Soporte 24/7',
    ],
    cta: 'Hablar con asesor',
  },
];
// WHATSAPP_PLANS removido — el servicio de WhatsApp IA Bot fue descontinuado.

