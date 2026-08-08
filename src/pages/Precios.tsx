import SEO from '@/components/SEO';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Check, MessageCircle, Lock, Zap, Map, Cog, Sparkles } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const WA = 'https://wa.me/17865787671';

type Tier = {
  id: string;
  icon: typeof Zap;
  badge?: string;
  title: string;
  price: string;
  priceNote: string;
  copy: string;
  bullets: string[];
  cta: string;
  highlighted?: boolean;
  waText: string;
};

const COPY: Record<'es' | 'en' | 'pt', {
  badge: string;
  h1a: string;
  h1b: string;
  sub: string;
  tiers: Tier[];
  exclusivityTitle: string;
  exclusivityCopy: string;
  exclusivityCta: string;
  decoyLabel: string;
}> = {
  es: {
    badge: 'Consultoría B2B de IA y Estrategia',
    h1a: 'Tres modelos. Una sola decisión: ',
    h1b: 'dejar de perder dinero.',
    sub: 'Sin retainers eternos, sin entregables decorativos. Cada formato resuelve un nivel distinto de fricción comercial.',
    decoyLabel: 'La más lógica',
    tiers: [
      {
        id: 'express',
        icon: Zap,
        title: 'Asesoría Express (El Destrabe)',
        price: '$600.000 COP',
        priceNote: '60 minutos · pago único',
        copy: 'Una sesión. Una decisión crítica destrabada. 60 minutos directos a la yugular de tu problema de ventas. Cero PDFs de relleno, pura estrategia accionable.',
        bullets: [
          'Diagnóstico verbal en vivo',
          'Plan de acción inmediato',
          'Sin entregables decorativos',
          'Cero filtros, cero relleno',
        ],
        cta: 'Reservar 60 min',
        waText: 'Hola, quiero agendar la Asesoría Express ($600.000 COP).',
      },
      {
        id: 'premium',
        icon: Map,
        badge: 'La más lógica',
        title: 'Auditoría Premium (El Mapa)',
        price: '$1.800.000 COP',
        priceNote: '4 horas · diagnóstico profundo',
        copy: 'Diagnóstico profundo de 4 horas. Desnudamos tus procesos comerciales y te entregamos un plan táctico de 30 días para automatizar ventas con IA. Deja de perder dinero por no saber delegar a la tecnología.',
        bullets: [
          'Auditoría completa de procesos comerciales',
          'Plan táctico de 30 días',
          'Mapa de automatización con IA',
          'Stack técnico recomendado',
          'Priorización por ROI',
        ],
        cta: 'Agendar Auditoría',
        highlighted: true,
        waText: 'Hola, quiero agendar la Auditoría Premium ($1.800.000 COP).',
      },
      {
        id: 'sprint',
        icon: Cog,
        title: 'Sprint In-Company (La Máquina)',
        price: '$5.000.000 COP',
        priceNote: 'Sesión presencial · 4 horas',
        copy: 'Entramos a tu empresa por 4 horas. Tu equipo comercial entra siendo tradicional y sale operando sistemas automatizados de prospección B2B. Operaciones inteligentes y cero horas muertas.',
        bullets: [
          'Implementación en vivo con tu equipo',
          'Sistemas automatizados de prospección B2B',
          'Playbooks personalizados',
          'Tu equipo sale operando, no aprendiendo',
          'Soporte post-sprint 14 días',
        ],
        cta: 'Cotizar Sprint',
        waText: 'Hola, quiero cotizar el Sprint In-Company ($5.000.000 COP).',
      },
    ],
    exclusivityTitle: '¿Buscas que nosotros operemos toda tu infraestructura?',
    exclusivityCopy: '¿Buscas que nosotros operemos toda tu infraestructura IA y SEO? Retainers desde $4.000.000 COP/mes. Solo por invitación tras Auditoría.',
    exclusivityCta: 'Conversar después de la Auditoría',
  },
  en: {
    badge: 'B2B AI & Growth Strategy Consultancy',
    h1a: 'Three formats. One single decision: ',
    h1b: 'stop bleeding money.',
    sub: 'No eternal retainers, no decorative deliverables. Each format solves a different layer of commercial friction.',
    decoyLabel: 'Most logical',
    tiers: [
      {
        id: 'express',
        icon: Zap,
        title: 'Express Advisory (The Unblock)',
        price: '$150 USD',
        priceNote: '60 minutes · one-time',
        copy: 'One session. One critical decision unblocked. 60 minutes straight to the jugular of your sales problem. Zero filler PDFs, pure actionable strategy.',
        bullets: ['Live verbal diagnosis', 'Immediate action plan', 'No decorative deliverables', 'Zero filters, zero filler'],
        cta: 'Book 60 min',
        waText: 'Hi, I want to book the Express Advisory ($150 USD).',
      },
      {
        id: 'premium',
        icon: Map,
        badge: 'Most logical',
        title: 'Premium Audit (The Map)',
        price: '$450 USD',
        priceNote: '4 hours · deep diagnosis',
        copy: 'Deep 4-hour diagnosis. We strip down your commercial processes and hand you a 30-day tactical plan to automate sales with AI. Stop losing money because you don\'t know how to delegate to technology.',
        bullets: ['Full audit of commercial processes', '30-day tactical plan', 'AI automation map', 'Recommended tech stack', 'ROI-based prioritization'],
        cta: 'Book the Audit',
        highlighted: true,
        waText: 'Hi, I want to book the Premium Audit ($450 USD).',
      },
      {
        id: 'sprint',
        icon: Cog,
        title: 'In-Company Sprint (The Machine)',
        price: '$1,250 USD',
        priceNote: 'On-site session · 4 hours',
        copy: 'We walk into your company for 4 hours. Your sales team walks in traditional and walks out operating automated B2B prospecting systems. Smart operations, zero idle hours.',
        bullets: ['Live implementation with your team', 'Automated B2B prospecting systems', 'Custom playbooks', 'Team leaves operating, not learning', '14-day post-sprint support'],
        cta: 'Quote the Sprint',
        waText: 'Hi, I want to quote the In-Company Sprint ($1,250 USD).',
      },
    ],
    exclusivityTitle: 'Looking for us to run your full infrastructure?',
    exclusivityCopy: 'Want us to operate your entire AI + SEO infrastructure? Retainers from $1,000 USD/month. By invitation only — after Audit.',
    exclusivityCta: 'Talk after the Audit',
  },
  pt: {
    badge: 'Consultoria B2B de IA e Estratégia',
    h1a: 'Três formatos. Uma única decisão: ',
    h1b: 'parar de perder dinheiro.',
    sub: 'Sem retainers eternos, sem entregáveis decorativos. Cada formato resolve um nível diferente de fricção comercial.',
    decoyLabel: 'A mais lógica',
    tiers: [
      {
        id: 'express',
        icon: Zap,
        title: 'Assessoria Express (O Destravamento)',
        price: 'R$ 750',
        priceNote: '60 minutos · pagamento único',
        copy: 'Uma sessão. Uma decisão crítica destravada. 60 minutos direto à jugular do seu problema de vendas. Zero PDFs de enchimento, pura estratégia acionável.',
        bullets: ['Diagnóstico verbal ao vivo', 'Plano de ação imediato', 'Sem entregáveis decorativos', 'Zero filtros, zero enchimento'],
        cta: 'Reservar 60 min',
        waText: 'Olá, quero agendar a Assessoria Express (R$ 750).',
      },
      {
        id: 'premium',
        icon: Map,
        badge: 'A mais lógica',
        title: 'Auditoria Premium (O Mapa)',
        price: 'R$ 2.250',
        priceNote: '4 horas · diagnóstico profundo',
        copy: 'Diagnóstico profundo de 4 horas. Desnudamos seus processos comerciais e entregamos um plano tático de 30 dias para automatizar vendas com IA.',
        bullets: ['Auditoria completa de processos', 'Plano tático de 30 dias', 'Mapa de automação com IA', 'Stack técnico recomendado', 'Priorização por ROI'],
        cta: 'Agendar Auditoria',
        highlighted: true,
        waText: 'Olá, quero agendar a Auditoria Premium (R$ 2.250).',
      },
      {
        id: 'sprint',
        icon: Cog,
        title: 'Sprint In-Company (A Máquina)',
        price: 'R$ 6.250',
        priceNote: 'Sessão presencial · 4 horas',
        copy: 'Entramos na sua empresa por 4 horas. Seu time comercial entra tradicional e sai operando sistemas automatizados de prospecção B2B.',
        bullets: ['Implementação ao vivo com seu time', 'Prospecção B2B automatizada', 'Playbooks personalizados', 'Time sai operando', 'Suporte pós-sprint 14 dias'],
        cta: 'Cotar Sprint',
        waText: 'Olá, quero cotar o Sprint In-Company (R$ 6.250).',
      },
    ],
    exclusivityTitle: 'Quer que operemos toda sua infraestrutura?',
    exclusivityCopy: 'Quer que operemos toda sua infraestrutura de IA e SEO? Retainers a partir de R$ 5.000/mês. Apenas por convite após Auditoria.',
    exclusivityCta: 'Conversar após a Auditoria',
  },
};

const Precios = ({ lang = 'es' }: Props) => {
  const t = COPY[lang];
  const seoTitle = lang === 'en' ? 'Pricing — B2B AI Consultancy | Ferova Agency' : lang === 'pt' ? 'Preços — Consultoria B2B de IA | Ferova Agency' : 'Precios — Consultoría B2B de IA | Ferova Agency';

  const handleClick = (tier: Tier) => {
    trackEvent('pricing_card_clicked', { tier: tier.id, lang });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title={seoTitle}
        description={t.sub}
        path={lang === 'en' ? '/en/pricing' : lang === 'pt' ? '/pt/precos' : '/precios'}
        lang={lang}
      />
      <Header lang={lang} />

      <main className="flex-1">
        {/* HERO */}
        <section
          className="relative overflow-hidden dark-section pt-24 pb-16 md:pt-32 md:pb-20"
          style={{ background: 'linear-gradient(135deg, hsl(243,31%,10%) 0%, hsl(243,31%,14%) 60%, hsl(356,68%,15%) 100%)' }}
        >
          <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium bg-white/5 border border-white/10 text-white/80">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              {t.badge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-white mb-6">
              {t.h1a}<span className="text-gradient-gold">{t.h1b}</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">{t.sub}</p>
          </div>
        </section>

        {/* TIERS */}
        <section className="py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 items-stretch">
            {t.tiers.map((tier) => {
              const Icon = tier.icon;
              const isHi = tier.highlighted;
              return (
                <div
                  key={tier.id}
                  className={`relative rounded-2xl p-7 md:p-8 flex flex-col transition-all ${
                    isHi
                      ? 'border-2 border-gold bg-gradient-to-b from-gold/10 via-background to-background shadow-[0_0_60px_-10px_rgba(212,175,55,0.45)] md:-translate-y-3 md:scale-[1.02]'
                      : 'border border-border bg-card hover:border-gold/40 hover:-translate-y-1'
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold text-[#1a1530] text-[11px] font-bold uppercase tracking-wider shadow-lg">
                      {tier.badge}
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${isHi ? 'bg-gold/20 text-gold' : 'bg-muted text-foreground'}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">{tier.title}</h3>
                  <p className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-1">{tier.price}</p>
                  <p className="text-xs text-muted-foreground mb-5">{tier.priceNote}</p>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{tier.copy}</p>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {tier.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isHi ? 'text-gold' : 'text-muted-foreground'}`} />
                        <span className="text-foreground/85">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`${WA}?text=${encodeURIComponent(tier.waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleClick(tier)}
                    className={`inline-flex items-center justify-center gap-2 w-full ${isHi ? 'btn-gold' : 'btn-outline-gold'}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {tier.cta}
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXCLUSIVITY BANNER */}
        <section className="pb-20 md:pb-28 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card/60 backdrop-blur p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-wine/15 text-wine-light flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-bold mb-1.5">{t.exclusivityTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.exclusivityCopy}</p>
            </div>
            <a
              href={`${WA}?text=${encodeURIComponent(t.exclusivityCta)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('pricing_card_clicked', { tier: 'retainer', lang })}
              className="btn-outline-gold inline-flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {t.exclusivityCta}
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default Precios;
