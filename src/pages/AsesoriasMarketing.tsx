import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import AdBanner from '@/components/ui/ad-banner';
import { GraduationCap, Target, BarChart3, Users, MessageCircle, Timer, Stethoscope, Zap, ArrowRight, Palette, Clock, X } from 'lucide-react';
import { CtaBand, FeraButton, IconTile, PageHero, Panel, Section, SectionHeading } from '@/components/fx/primitives';
import { useState } from 'react';
import { getPaymentLink } from '@/lib/payment-links';
import { useToast } from '@/hooks/use-toast';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const AsesoriasMarketing = ({ lang = 'es' }: Props) => {
  const [currency, setCurrency] = useState<'usd' | 'cop'>('usd');
  const { toast } = useToast();

  const handleCta = (key: 'asesoria30' | 'asesoria60') => {
    const link = getPaymentLink(key, currency);
    window.open(link, '_blank', 'noopener,noreferrer');
    toast({
      title: lang === 'es' ? '¡Confirmado!' : 'Confirmed!',
      description: lang === 'es'
        ? '¡Cita confirmada! En Ferova Agency estamos listos para empezar.'
        : 'Appointment confirmed! At Ferova Agency we are ready to start.',
    });
  };

  const formatPrice = (usd: number, cop: number) => {
    if (currency === 'cop') return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(cop);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd);
  };

  const t = lang === 'es' ? {
    title: 'Asesorías de Marketing Virtual',
    sub: 'Consultoría estratégica personalizada para escalar tu negocio digital con un plan de acción claro y medible.',
    whatIncludes: '¿Qué incluye nuestro servicio?',
    features: [
      { icon: Target, title: 'Diagnóstico digital completo', desc: 'Análisis profundo de tu presencia online, competencia y oportunidades de crecimiento.' },
      { icon: BarChart3, title: 'Estrategia de crecimiento', desc: 'Plan personalizado con KPIs claros, timeline y acciones priorizadas.' },
      { icon: Users, title: 'Sesiones 1-a-1', desc: 'Reuniones virtuales personalizadas con nuestros expertos en marketing digital.' },
      { icon: GraduationCap, title: 'Capacitación', desc: 'Te enseñamos a usar las herramientas y métricas para que puedas escalar de forma independiente.' },
    ],
    pricingTitle: 'Planes de Asesoría',
    noInclude: 'No incluye:',
    plans: [
      {
        key: 'asesoria30' as const,
        icon: Timer,
        name: 'Asesoría Express',
        tagline: '¿Llevas días dando vueltas a un problema? Ferova Agency entra en tu negocio para eliminar el ruido y darte la respuesta exacta.',
        usd: 35, cop: 140000,
        includes: [
          { icon: Zap, text: 'Diagnóstico rápido (30 min)' },
          { icon: Stethoscope, text: 'Solución a 1 bloqueo específico' },
          { icon: Clock, text: 'Grabación de la sesión' },
        ],
        excludes: ['Implementación técnica', 'Seguimiento posterior', 'Plan estratégico completo'],
        cta: 'Agendar mi espacio',
      },
      {
        key: 'asesoria60' as const,
        icon: Stethoscope,
        name: 'Asesoría Impacto',
        tagline: 'No es una charla, es una cirugía a tu estrategia. Ferova Agency audita y reconstruye tu hoja de ruta para que traiga dinero.',
        usd: 55, cop: 220000,
        popular: true,
        includes: [
          { icon: Zap, text: 'Auditoría de estrategia (60 min)' },
          { icon: ArrowRight, text: 'Plan de acción inmediato' },
          { icon: Palette, text: 'Guía de herramientas recomendadas' },
        ],
        excludes: ['Implementación técnica', 'Gestión de campañas', 'Diseño de activos'],
        cta: 'Hablar con un Consultor',
      },
    ],
  } : {
    title: 'Marketing Consulting',
    sub: 'Personalized strategic consulting to scale your digital business with a clear and measurable action plan.',
    whatIncludes: 'What does our service include?',
    features: [
      { icon: Target, title: 'Complete digital diagnosis', desc: 'Deep analysis of your online presence, competition and growth opportunities.' },
      { icon: BarChart3, title: 'Growth strategy', desc: 'Personalized plan with clear KPIs, timeline and prioritized actions.' },
      { icon: Users, title: '1-on-1 sessions', desc: 'Personalized virtual meetings with our digital marketing experts.' },
      { icon: GraduationCap, title: 'Training', desc: 'We teach you to use tools and metrics so you can scale independently.' },
    ],
    pricingTitle: 'Consulting Plans',
    noInclude: 'Does not include:',
    plans: [
      {
        key: 'asesoria30' as const,
        icon: Timer,
        name: 'Express Consulting',
        tagline: 'Been going back and forth on a problem? Ferova Agency steps into your business to cut the noise and give you the exact answer.',
        usd: 35, cop: 140000,
        includes: [
          { icon: Zap, text: 'Quick diagnosis (30 min)' },
          { icon: Stethoscope, text: 'Solution to 1 specific blocker' },
          { icon: Clock, text: 'Session recording' },
        ],
        excludes: ['Technical implementation', 'Follow-up', 'Full strategic plan'],
        cta: 'Book my spot',
      },
      {
        key: 'asesoria60' as const,
        icon: Stethoscope,
        name: 'Impact Consulting',
        tagline: 'It\'s not a chat, it\'s surgery on your strategy. Ferova Agency audits and rebuilds your roadmap to bring in revenue.',
        usd: 55, cop: 220000,
        popular: true,
        includes: [
          { icon: Zap, text: 'Strategy audit (60 min)' },
          { icon: ArrowRight, text: 'Immediate action plan' },
          { icon: Palette, text: 'Recommended tools guide' },
        ],
        excludes: ['Technical implementation', 'Campaign management', 'Asset design'],
        cta: 'Talk to a Consultant',
      },
    ],
  };

  const es = lang === 'es';
  const path = lang === 'en' ? '/en/services/marketing-consulting' : lang === 'pt' ? '/pt/consultorias' : '/servicios/asesorias-marketing';
  const home = lang === 'en' ? { name: 'Home', path: '/en' } : lang === 'pt' ? { name: 'Início', path: '/pt' } : { name: 'Inicio', path: '/' };
  const crumbs = [{ name: t.title, path }];
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t.title,
    description: t.sub,
    url: `https://seoparaecommerce.co${path}`,
    provider: { '@type': 'Organization', '@id': 'https://seoparaecommerce.co/#organization', name: 'Ferova Agency' },
    offers: t.plans.map((plan) => ({ '@type': 'Offer', name: plan.name, price: String(plan.usd), priceCurrency: 'USD' })),
  };

  return (
    <div className="fx-site min-h-screen">
      <SEO
        title={`${t.title} — Ferova Agency`}
        description={t.sub}
        path={path}
        lang={lang}
        jsonLd={serviceLd}
        breadcrumbs={[home, ...crumbs]}
      />
      <Header lang={lang} />
      <main id="contenido-principal" className="pt-20">
        <PageHero eyebrow={t.pricingTitle} title={t.title} intro={t.sub} breadcrumbs={crumbs} lang={lang}>
          <a href="#planes" className="fx-btn">{t.pricingTitle}<ArrowRight aria-hidden="true" /></a>
        </PageHero>

        {/* Features */}
        <Section>
          <SectionHeading title={t.whatIncludes} />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {t.features.map((f) => (
              <Panel key={f.title}>
                <IconTile icon={f.icon} />
                <h3>{f.title}</h3>
                <p className="fx-muted mt-3 leading-relaxed">{f.desc}</p>
              </Panel>
            ))}
          </div>
        </Section>

        {/* Pricing: Express + Impacto */}
        <Section tone="surface" id="planes">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl leading-tight sm:text-4xl lg:text-5xl">{t.pricingTitle}</h2>
            <div className="mt-6 flex w-fit items-center gap-2" role="group" aria-label={es ? 'Moneda' : 'Currency'}>
              <button type="button" aria-pressed={currency === 'usd'} onClick={() => setCurrency('usd')} className="pill-filter">USD</button>
              <button type="button" aria-pressed={currency === 'cop'} onClick={() => setCurrency('cop')} className="pill-filter">COP</button>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {t.plans.map((plan) => {
              const IconComp = plan.icon;
              const popular = 'popular' in plan && plan.popular;
              return (
                <div key={plan.key} className={`fx-light relative flex flex-col rounded-[1.25rem] bg-white p-8 shadow-[0_24px_60px_rgb(47_45_86/13%)] ${popular ? 'border-t-[3px] border-[#541014]' : ''}`}>
                  {popular && (
                    <span className="status-badge absolute right-6 top-6 !text-xs">
                      {es ? 'Recomendado' : 'Recommended'}
                    </span>
                  )}
                  <span className="icon-tile !mb-6 !bg-[#f6f5fb]"><IconComp aria-hidden="true" strokeWidth={1.5} /></span>
                  <h3 className="text-2xl">{plan.name}</h3>
                  <p className="fx-muted mt-3 text-sm leading-relaxed">{plan.tagline}</p>
                  <p className="mt-6">
                    <span className="text-4xl font-semibold tabular-nums" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>{formatPrice(plan.usd, plan.cop)}</span>
                    <span className="fx-muted ml-1 text-sm">{es ? '/ pago único' : '/ one-time'}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.includes.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <li key={item.text} className="flex items-start gap-3 text-sm">
                          <ItemIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#541014]" /> {item.text}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mb-8 mt-6 border-t border-[#dfdcea] pt-4">
                    <p className="fx-muted mb-2 text-xs font-semibold">{t.noInclude}</p>
                    <ul className="space-y-1.5">
                      {plan.excludes.map((ex) => (
                        <li key={ex} className="fx-muted flex items-center gap-2 text-xs">
                          <X aria-hidden="true" className="h-3 w-3 shrink-0 opacity-60" /> {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCta(plan.key)}
                    className={`fx-btn w-full ${popular ? '' : 'fx-btn--outline'}`}
                  >
                    <MessageCircle aria-hidden="true" /> {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
          <AdBanner slot="service-asesorias" className="mx-auto mt-16 max-w-4xl" />
        </Section>

        <CtaBand
          title={es ? '¿No sabes qué asesoría elegir?' : 'Not sure which session fits?'}
          body={es ? 'Cuéntale a Fera qué te está frenando y una persona te confirma el formato adecuado.' : 'Tell Fera what is blocking you and a person will confirm the right format.'}
        >
          <FeraButton source="service_marketing_consulting" prompt={t.title}>
            {es ? 'Hablar con Fera' : 'Talk to Fera'}
          </FeraButton>
        </CtaBand>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default AsesoriasMarketing;
