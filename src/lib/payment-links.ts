const WA = (msg: string) =>
  `https://wa.link/jvbd4j?text=${encodeURIComponent(msg)}`;

export const paymentLinks = {
  // ===== B2B High-ticket (modelo principal) =====
  consultoriaEstrategica: {
    usd: WA('Hello Ferova, I want info about Strategy Advisory.'),
    cop: WA('Hola Ferova, quiero info sobre Mentoría y Asesoría Estratégica.'),
    brl: WA('Olá Ferova, quero info sobre Mentoria e Assessoria Estratégica.'),
  },
  capacitacionIA: {
    usd: WA('Hello Ferova, I want a quote for AI Training in my company.'),
    cop: WA('Hola Ferova, quiero cotizar Capacitación IA para mi empresa.'),
    brl: WA('Olá Ferova, quero orçamento para Treinamento em IA na minha empresa.'),
  },

  // ===== Agencia (Upsell) — 5 servicios activos =====
  webDevelopment: {
    usd: WA('Hi Ferova, I want info on Web / E-commerce Development ($1200 USD).'),
    cop: WA('Hola Ferova, quiero info sobre Desarrollo Web / E-commerce.'),
    brl: WA('Olá Ferova, quero info sobre Desenvolvimento Web / E-commerce.'),
  },
  seoMonthly: {
    usd: WA('Hi Ferova, I want the Monthly SEO / AIO plan ($500 USD/mo).'),
    cop: WA('Hola Ferova, quiero el plan SEO / AIO Mensual.'),
    brl: WA('Olá Ferova, quero o plano SEO / AIO Mensal.'),
  },
  brandingEssential: {
    usd: WA('Hi Ferova, I want the Branding Essential plan ($250 USD).'),
    cop: WA('Hola Ferova, me interesa el plan Branding Essential.'),
    brl: WA('Olá Ferova, tenho interesse no Branding Essential.'),
  },
  linkedinOptimization: {
    usd: WA('Hi Ferova, I want the LinkedIn Optimization plan ($250 USD).'),
    cop: WA('Hola Ferova, me interesa Optimización de LinkedIn.'),
    brl: WA('Olá Ferova, tenho interesse na Otimização de LinkedIn.'),
  },
  linkedinContent: {
    usd: WA('Hi Ferova, I want LinkedIn Content Creation ($400 USD/mo).'),
    cop: WA('Hola Ferova, quiero el plan de Creación de Contenido LinkedIn.'),
    brl: WA('Olá Ferova, quero o plano de Criação de Conteúdo LinkedIn.'),
  },

  // ===== Asesorías rápidas (legacy soportado) =====
  asesoria30: {
    usd: WA('Hi, I want to book a 30-min Express Consultation.'),
    cop: WA('Hola, quiero agendar una Asesoría Express de 30 min.'),
    brl: WA('Olá, quero agendar uma Assessoria Express de 30 min.'),
  },
  asesoria60: {
    usd: WA('Hi, I want to book a 60-min Impact Consultation.'),
    cop: WA('Hola, quiero agendar una Asesoría Impacto de 60 min.'),
    brl: WA('Olá, quero agendar uma Assessoria Impacto de 60 min.'),
  },
} as const;

export type PaymentLinkKey = keyof typeof paymentLinks;

export function getPaymentLink(
  key: PaymentLinkKey,
  currency: 'usd' | 'cop' | 'brl'
): string {
  return paymentLinks[key][currency];
}
