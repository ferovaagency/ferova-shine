import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { Check, X, Clock, Zap, MapPin, Palette, ArrowRight, MessageCircle, Timer, Stethoscope, Map, Paintbrush } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getPaymentLink, type PaymentLinkKey } from '@/lib/payment-links';

interface Props { lang?: 'es' | 'en'; }

interface Plan {
  icon: React.ElementType;
  name: string;
  tagline: string;
  priceUsd: number;
  priceCop: number;
  recurring?: string;
  includes: { icon: React.ElementType; text: string }[];
  excludes: string[];
  cta: string;
  paymentKey: PaymentLinkKey;
  urgency?: string;
  popular?: boolean;
}

interface Category {
  title: string;
  plans: Plan[];
}

const Precios = ({ lang = 'es' }: Props) => {
  const [currency, setCurrency] = useState<'cop' | 'usd'>('usd');
  const { toast } = useToast();

  const handleCta = (key: PaymentLinkKey) => {
    const link = getPaymentLink(key, currency);
    window.open(link, '_blank', 'noopener,noreferrer');
    toast({
      title: lang === 'es' ? '¡Confirmado!' : 'Confirmed!',
      description: lang === 'es'
        ? '¡Cita confirmada! En Ferova Agency estamos listos para empezar.'
        : 'Appointment confirmed! At Ferova Agency we are ready to start.',
    });
  };

  const formatPrice = (amount: number) => {
    if (currency === 'cop') return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const categories: Category[] = lang === 'es' ? [
    {
      title: 'Asesorías Virtuales',
      plans: [
        {
          icon: Timer, name: 'Asesoría Express',
          tagline: '¿Llevas días dando vueltas a un problema? Ferova Agency entra en tu negocio para eliminar el ruido y darte la respuesta exacta.',
          priceUsd: 35, priceCop: 140000,
          includes: [
            { icon: Zap, text: 'Diagnóstico rápido (30 min)' },
            { icon: Stethoscope, text: 'Solución a 1 bloqueo específico' },
            { icon: Clock, text: 'Grabación de la sesión' },
          ],
          excludes: ['Implementación técnica', 'Seguimiento posterior', 'Plan estratégico completo'],
          cta: 'Agendar mi espacio', paymentKey: 'asesoria30',
        },
        {
          icon: Stethoscope, name: 'Asesoría Impacto',
          tagline: 'No es una charla, es una cirugía a tu estrategia. Ferova Agency audita y reconstruye tu hoja de ruta para que traiga dinero.',
          priceUsd: 55, priceCop: 220000,
          includes: [
            { icon: Zap, text: 'Auditoría de estrategia (60 min)' },
            { icon: ArrowRight, text: 'Plan de acción inmediato' },
            { icon: Palette, text: 'Guía de herramientas recomendadas' },
          ],
          excludes: ['Implementación técnica', 'Gestión de campañas', 'Diseño de activos'],
          cta: 'Hablar con un Consultor', paymentKey: 'asesoria60', popular: true,
        },
      ],
    },
    {
      title: 'SEO Especializado',
      plans: [
        {
          icon: Map, name: 'SEO & GEO Local',
          tagline: 'Si no estás en el mapa, no existes. Ferova Agency convierte tu perfil de Google en una máquina de atraer clientes.',
          priceUsd: 150, priceCop: 600000, recurring: '/mes',
          includes: [
            { icon: MapPin, text: 'Optimización de Google Business Profile' },
            { icon: Zap, text: 'Estrategia de 5 keywords locales' },
            { icon: Stethoscope, text: 'Auditoría de visibilidad local' },
          ],
          excludes: ['Pauta publicitaria (Ads)', 'Creación de contenido para redes', 'Diseño web'],
          cta: 'Iniciar Optimización', paymentKey: 'seoGeoLocal',
          urgency: 'Solo 3 cupos disponibles por mes para garantizar resultados.',
        },
      ],
    },
    {
      title: 'Branding',
      plans: [
        {
          icon: Paintbrush, name: 'Branding Essential',
          tagline: 'Tu marca es lo que dicen de ti cuando no estás. Ferova Agency crea una identidad que proyecta autoridad y profesionalismo.',
          priceUsd: 150, priceCop: 600000,
          includes: [
            { icon: Palette, text: 'Logo principal + variaciones' },
            { icon: Zap, text: 'Paleta de colores + tipografía' },
            { icon: ArrowRight, text: 'Archivos editables (AI/SVG)' },
          ],
          excludes: ['Registro legal de marca', 'Manual de marca extendido', 'Papelería corporativa'],
          cta: 'Completar Briefing', paymentKey: 'brandingEssential',
        },
      ],
    },
  ] : [
    {
      title: 'Virtual Consulting',
      plans: [
        {
          icon: Timer, name: 'Express Consulting',
          tagline: 'Been going back and forth on a problem? Ferova Agency steps into your business to cut the noise and give you the exact answer.',
          priceUsd: 35, priceCop: 140000,
          includes: [
            { icon: Zap, text: 'Quick diagnosis (30 min)' },
            { icon: Stethoscope, text: 'Solution to 1 specific blocker' },
            { icon: Clock, text: 'Session recording' },
          ],
          excludes: ['Technical implementation', 'Follow-up', 'Full strategic plan'],
          cta: 'Book my spot', paymentKey: 'asesoria30',
        },
        {
          icon: Stethoscope, name: 'Impact Consulting',
          tagline: 'It\'s not a chat, it\'s surgery on your strategy. Ferova Agency audits and rebuilds your roadmap to bring in revenue.',
          priceUsd: 55, priceCop: 220000,
          includes: [
            { icon: Zap, text: 'Strategy audit (60 min)' },
            { icon: ArrowRight, text: 'Immediate action plan' },
            { icon: Palette, text: 'Recommended tools guide' },
          ],
          excludes: ['Technical implementation', 'Campaign management', 'Asset design'],
          cta: 'Talk to a Consultant', paymentKey: 'asesoria60', popular: true,
        },
      ],
    },
    {
      title: 'Specialized SEO',
      plans: [
        {
          icon: Map, name: 'SEO & GEO Local',
          tagline: 'If you\'re not on the map, you don\'t exist. Ferova Agency turns your Google profile into a client-attracting machine.',
          priceUsd: 150, priceCop: 600000, recurring: '/mo',
          includes: [
            { icon: MapPin, text: 'Google Business Profile optimization' },
            { icon: Zap, text: '5 local keyword strategy' },
            { icon: Stethoscope, text: 'Local visibility audit' },
          ],
          excludes: ['Ad spend (Ads)', 'Social media content', 'Web design'],
          cta: 'Start Optimization', paymentKey: 'seoGeoLocal',
          urgency: 'Only 3 spots available per month to guarantee results.',
        },
      ],
    },
    {
      title: 'Branding',
      plans: [
        {
          icon: Paintbrush, name: 'Branding Essential',
          tagline: 'Your brand is what people say about you when you\'re not in the room. Ferova Agency creates an identity that projects authority.',
          priceUsd: 150, priceCop: 600000,
          includes: [
            { icon: Palette, text: 'Main logo + variations' },
            { icon: Zap, text: 'Color palette + typography' },
            { icon: ArrowRight, text: 'Editable files (AI/SVG)' },
          ],
          excludes: ['Legal trademark registration', 'Extended brand manual', 'Corporate stationery'],
          cta: 'Complete Briefing', paymentKey: 'brandingEssential',
        },
      ],
    },
  ];

  const t = lang === 'es' ? {
    title: 'Planes y Precios',
    sub: 'Servicios diseñados para impulsar tu negocio con estrategia, claridad y resultados medibles.',
    noInclude: 'No incluye:',
    faq: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Cómo agendo una asesoría?', a: 'Al hacer clic en el botón, serás redirigido a WhatsApp donde coordinaremos fecha y hora.' },
      { q: '¿El SEO Local es un pago mensual?', a: 'Sí, el servicio de SEO & GEO Local es una suscripción mensual para mantener tu posicionamiento activo.' },
      { q: '¿Qué formatos recibo en Branding?', a: 'Recibes archivos editables en AI y SVG, además de versiones PNG y JPG para uso digital.' },
      { q: '¿Ofrecen reembolsos?', a: 'Sí, ofrecemos garantía de satisfacción en todos nuestros servicios.' },
    ],
  } : {
    title: 'Plans & Pricing',
    sub: 'Services designed to drive your business with strategy, clarity and measurable results.',
    noInclude: 'Does not include:',
    faq: 'FAQ',
    faqs: [
      { q: 'How do I book a consultation?', a: 'Clicking the button redirects you to WhatsApp where we\'ll coordinate date and time.' },
      { q: 'Is Local SEO a monthly payment?', a: 'Yes, SEO & GEO Local is a monthly subscription to keep your positioning active.' },
      { q: 'What formats do I receive in Branding?', a: 'You receive editable AI and SVG files, plus PNG and JPG versions for digital use.' },
      { q: 'Do you offer refunds?', a: 'Yes, we offer a satisfaction guarantee on all our services.' },
    ],
  };

  return (
    <PageTransition>
      <Header currentLang={lang} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">{t.sub}</p>
            </AnimatedSection>
            <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-border w-fit mx-auto">
              <button onClick={() => setCurrency('usd')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>USD</button>
              <button onClick={() => setCurrency('cop')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>COP</button>
            </div>
          </div>
        </section>

        {/* Categories */}
        {categories.map((cat, ci) => (
          <section key={ci} className="py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-14">{cat.title}</h2>
              </AnimatedSection>
              <StaggerContainer className={`grid gap-8 max-w-5xl mx-auto ${cat.plans.length === 1 ? 'max-w-lg' : 'md:grid-cols-2'}`}>
                {cat.plans.map((plan, pi) => {
                  const IconComp = plan.icon;
                  return (
                    <StaggerItem key={pi}>
                      <ScaleOnHover>
                        <div className={`glass-card p-8 relative h-full flex flex-col transition-all duration-300 ${plan.popular ? 'border-gold/50 gold-glow' : ''}`}>
                          {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-gold text-primary-foreground">
                              {lang === 'es' ? 'Recomendado' : 'Recommended'}
                            </div>
                          )}
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                            <IconComp className="w-7 h-7 text-gold" />
                          </div>
                          <h3 className="text-2xl font-display font-bold mb-3 text-foreground">{plan.name}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.tagline}</p>
                          <div className="mb-6">
                            <span className="text-4xl font-display font-bold text-foreground">{formatPrice(currency === 'usd' ? plan.priceUsd : plan.priceCop)}</span>
                            <span className="text-muted-foreground text-sm ml-1">{plan.recurring || (lang === 'es' ? '/ pago único' : '/ one-time')}</span>
                          </div>
                          {plan.urgency && (
                            <div className="mb-6 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2" style={{ background: 'hsla(356, 68%, 20%, 0.15)', color: 'hsl(356, 68%, 55%)' }}>
                              <Clock className="w-3.5 h-3.5" /> {plan.urgency}
                            </div>
                          )}
                          <ul className="space-y-3 mb-6 flex-1">
                            {plan.includes.map((item, ii) => {
                              const ItemIcon = item.icon;
                              return (
                                <li key={ii} className="flex items-start gap-3 text-sm text-foreground">
                                  <ItemIcon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {item.text}
                                </li>
                              );
                            })}
                          </ul>
                          <div className="mb-8 pt-4 border-t border-border">
                            <p className="text-xs font-semibold text-muted-foreground mb-2">{t.noInclude}</p>
                            <ul className="space-y-1.5">
                              {plan.excludes.map((ex, ei) => (
                                <li key={ei} className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <X className="w-3 h-3 flex-shrink-0 opacity-50" /> {ex}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button
                            onClick={() => handleCta(plan.paymentKey)}
                            className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${plan.popular ? 'btn-gold !px-0' : 'border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground'}`}
                          >
                            <MessageCircle className="w-4 h-4" /> {plan.cta}
                          </button>
                        </div>
                      </ScaleOnHover>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-gold">{t.faq}</h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {t.faqs.map((faq, i) => (
                <details key={i} className="glass-card p-6 group">
                  <summary className="font-display font-semibold cursor-pointer list-none flex items-center justify-between text-foreground">
                    {faq.q}
                    <ArrowRight className="w-4 h-4 transition-transform group-open:rotate-90 text-gold" />
                  </summary>
                  <p className="text-sm mt-4 leading-relaxed text-muted-foreground">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </PageTransition>
  );
};

export default Precios;
