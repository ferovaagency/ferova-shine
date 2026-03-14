import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { Link } from 'react-router-dom';
import { GraduationCap, Target, BarChart3, Users, MessageCircle, Timer, Stethoscope, Zap, ArrowRight, Palette, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { getPaymentLink } from '@/lib/payment-links';
import { useToast } from '@/hooks/use-toast';

interface Props { lang?: 'es' | 'en'; }

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

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">{t.sub}</p>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 md:py-28" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16" style={{ color: 'hsl(45, 86%, 40%)' }}>{t.whatIncludes}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {t.features.map((f, i) => (
                <div key={i} className="glass-card p-8 hover:border-gold/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <f.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3" style={{ color: 'hsl(0, 0%, 95%)' }}>{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'hsl(0, 0%, 65%)' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing: Express + Impacto */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-6">{t.pricingTitle}</h2>
            <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-border w-fit mx-auto mb-14">
              <button onClick={() => setCurrency('usd')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>USD</button>
              <button onClick={() => setCurrency('cop')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>COP</button>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {t.plans.map((plan, i) => {
                const IconComp = plan.icon;
                return (
                  <div key={i} className={`glass-card p-8 relative flex flex-col transition-all duration-300 ${(plan as any).popular ? 'border-gold/50 gold-glow' : ''}`}>
                    {(plan as any).popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-gold text-primary-foreground">
                        {lang === 'es' ? 'Recomendado' : 'Recommended'}
                      </div>
                    )}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                      <IconComp className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-3">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.tagline}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-display font-bold">{formatPrice(plan.usd, plan.cop)}</span>
                      <span className="text-muted-foreground text-sm ml-1">{lang === 'es' ? '/ pago único' : '/ one-time'}</span>
                    </div>
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
                      onClick={() => handleCta(plan.key)}
                      className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${(plan as any).popular ? 'btn-gold !px-0' : 'border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground'}`}
                    >
                      <MessageCircle className="w-4 h-4" /> {plan.cta}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <AdBanner slot="service-asesorias" className="max-w-4xl mx-auto mb-20" />
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default AsesoriasMarketing;
