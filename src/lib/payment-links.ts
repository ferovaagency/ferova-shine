const WA = (msg: string) =>
  `https://wa.me/17865787671?text=${encodeURIComponent(msg)}`;

export const paymentLinks = {
  asesoria30: {
    usd: WA('Hola, quiero agendar una Asesoría Express de 30 min. ¿Cómo procedo?'),
    cop: WA('Hola, quiero agendar una Asesoría Express de 30 min. ¿Cómo procedo?'),
    brl: WA('Olá, quero agendar uma Assessoria Express de 30 min. Como procedo?'),
  },
  asesoria60: {
    usd: WA('Hola, quiero agendar una Asesoría Impacto de 60 min. ¿Cómo procedo?'),
    cop: WA('Hola, quiero agendar una Asesoría Impacto de 60 min. ¿Cómo procedo?'),
    brl: WA('Olá, quero agendar uma Assessoria Impacto de 60 min. Como procedo?'),
  },
  brandingEssential: {
    usd: WA('Hola, me interesa el servicio de Branding Essential. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa el servicio de Branding Essential. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse no serviço de Branding Essential. Como começamos?'),
  },
  seoGeoLocal: {
    usd: WA('Hola, me interesa el servicio de SEO & GEO Local. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa el servicio de SEO & GEO Local. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse no serviço de SEO & GEO Local. Como começamos?'),
  },
  webEconomico: {
    usd: WA('Hola, me interesa la Web Económica. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa la Web Económica. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse na Web Econômica. Como começamos?'),
  },
  webServicios: {
    usd: WA('Hola, me interesa la WebApp de Servicios. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa la WebApp de Servicios. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse na WebApp de Serviços. Como começamos?'),
  },
  webEcommerce: {
    usd: WA('Hola, me interesa la WebApp E-Commerce. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa la WebApp E-Commerce. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse na WebApp E-Commerce. Como começamos?'),
  },
  webEcommerceFull: {
    usd: WA('Hola, me interesa la WebApp E-Commerce Full. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa la WebApp E-Commerce Full. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse na WebApp E-Commerce Full. Como começamos?'),
  },
  webPro: {
    usd: WA('Hola, me interesa la WebApp Pro. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa la WebApp Pro. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse na WebApp Pro. Como começamos?'),
  },
  seoWebapps: {
    usd: WA('Hola, me interesa el SEO para WebApps. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa el SEO para WebApps. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse no SEO para WebApps. Como começamos?'),
  },
  seoCms: {
    usd: WA('Hola, me interesa el SEO para CMS. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa el SEO para CMS. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse no SEO para CMS. Como começamos?'),
  },
  pautaEsencial: {
    usd: WA('Hola, me interesa el plan de Pauta Esencial. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa el plan de Pauta Esencial. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse no plano de Anúncios Essencial. Como começamos?'),
  },
  pautaEstrategico: {
    usd: WA('Hola, me interesa el plan de Pauta Estratégico 360°. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa el plan de Pauta Estratégico 360°. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse no plano Estratégico 360°. Como começamos?'),
  },
  pautaPremium: {
    usd: WA('Hola, me interesa el plan de Pauta Premium Full Service. ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa el plan de Pauta Premium Full Service. ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse no plano Premium Full Service. Como começamos?'),
  },
  whatsapp1: {
    usd: WA('Hola, me interesa la optimización de WhatsApp Business (1 producto). ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa la optimización de WhatsApp Business (1 producto). ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse na otimização do WhatsApp Business (1 produto). Como começamos?'),
  },
  whatsapp10: {
    usd: WA('Hola, me interesa la optimización de WhatsApp Business (10 productos). ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa la optimización de WhatsApp Business (10 productos). ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse na otimização do WhatsApp Business (10 produtos). Como começamos?'),
  },
  whatsapp20: {
    usd: WA('Hola, me interesa la optimización de WhatsApp Business (20 productos). ¿Cómo empezamos?'),
    cop: WA('Hola, me interesa la optimización de WhatsApp Business (20 productos). ¿Cómo empezamos?'),
    brl: WA('Olá, tenho interesse na otimização do WhatsApp Business (20 produtos). Como começamos?'),
  },
} as const;

export type PaymentLinkKey = keyof typeof paymentLinks;

export function getPaymentLink(
  key: PaymentLinkKey,
  currency: 'usd' | 'cop' | 'brl'
): string {
  return paymentLinks[key][currency];
}
