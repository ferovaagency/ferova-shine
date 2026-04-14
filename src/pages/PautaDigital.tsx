import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { Link } from 'react-router-dom';
import { Target, BarChart3, Users, Megaphone, Check, ArrowRight, MessageCircle, Minus } from 'lucide-react';
import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const PautaDigital = ({ lang = 'es' }: Props) => {
  const [currency, setCurrency] = useState<'cop' | 'usd'>('cop');
  const { trackCurrencyChange } = useAnalytics();

  const plans = [
    {
      name: lang === 'es' ? 'Esencial' : 'Essential',
      priceCOP: '$1.800.000',
      priceUSD: '$450',
      period: lang === 'es' ? '/mes' : '/mo',
      rangeCOP: '$2.000.000 – $3.000.000',
      rangeUSD: '$500 – $750',
      rangeLabel: lang === 'es' ? 'presupuesto de pauta sugerido' : 'suggested ad spend',
      highlight: false,
      badge: null,
      paymentLink: '#',
      contract: lang === 'es' ? 'Contrato mínimo: 3 meses' : 'Minimum contract: 3 months',
      features: [
        { text: lang === 'es' ? 'Gestión de campañas en Meta Ads (Instagram + Facebook) y TikTok Ads' : 'Meta Ads (Instagram + Facebook) & TikTok Ads management', included: true },
        { text: lang === 'es' ? 'Hasta 3 campañas activas al mes' : 'Up to 3 active campaigns/month', included: true },
        { text: lang === 'es' ? 'Segmentación a consumidores de sushi, cocina asiática y alimentación saludable' : 'Targeted audience segmentation', included: true },
        { text: lang === 'es' ? '4 creativos publicitarios al mes' : '4 ad creatives/month', included: true },
        { text: lang === 'es' ? 'Optimización semanal de campañas' : 'Weekly campaign optimization', included: true },
        { text: lang === 'es' ? '1 reunión de seguimiento mensual' : '1 monthly follow-up meeting', included: true },
        { text: lang === 'es' ? 'Reporte mensual de resultados' : 'Monthly results report', included: true },
        { text: lang === 'es' ? 'Presupuesto de pauta' : 'Ad spend budget', included: false },
        { text: lang === 'es' ? 'Producción de video profesional' : 'Professional video production', included: false },
        { text: lang === 'es' ? 'Gestión de contenido orgánico' : 'Organic content management', included: false },
        { text: lang === 'es' ? 'Estrategia B2B para chefs y restaurantes' : 'B2B strategy for chefs & restaurants', included: false },
      ],
    },
    {
      name: lang === 'es' ? 'Estratégico 360°' : 'Strategic 360°',
      priceCOP: 'Mes 1: $4.050.000 / Mes 2+: $3.450.000',
      priceUSD: 'Mo 1: $1.012 / Mo 2+: $862',
      period: lang === 'es' ? '/mes' : '/mo',
      rangeCOP: '$4.000.000 – $8.000.000',
      rangeUSD: '$1.000 – $2.000',
      rangeLabel: lang === 'es' ? 'presupuesto de pauta sugerido' : 'suggested ad spend',
      highlight: true,
      badge: lang === 'es' ? 'Más elegido' : 'Most popular',
      paymentLink: '#',
      contract: lang === 'es' ? 'Contrato mínimo: 3 meses' : 'Minimum contract: 3 months',
      features: [
        { text: lang === 'es' ? 'Todo el Plan Esencial (Meta + TikTok) — $1.800.000/mes' : 'Everything in Essential (Meta + TikTok)', included: true },
        { text: lang === 'es' ? 'Plan LinkedIn B2B para chefs y restaurantes — $1.800.000/mes' : 'LinkedIn B2B plan for chefs & restaurants', included: true },
        { text: lang === 'es' ? 'Optimización de 2 perfiles LinkedIn del equipo comercial — $150.000 único' : 'LinkedIn profile optimization for 2 commercial team members — one-time fee', included: true },
        { text: lang === 'es' ? 'Estrategia diferenciada B2C + B2B desde el arranque' : 'Differentiated B2C + B2B strategy from day one', included: true },
        { text: lang === 'es' ? 'Presupuesto de pauta' : 'Ad spend budget', included: false },
        { text: lang === 'es' ? 'Producción de video profesional' : 'Professional video production', included: false },
        { text: lang === 'es' ? 'Gestión de contenido orgánico' : 'Organic content management', included: false },
      ],
    },
    {
      name: lang === 'es' ? 'Premium Full Service' : 'Premium Full Service',
      priceCOP: 'Mes 1: $6.000.000 / Mes 2+: $5.250.000',
      priceUSD: 'Mo 1: $1.500 / Mo 2+: $1.312',
      period: lang === 'es' ? '/mes' : '/mo',
      rangeCOP: '$6.000.000 – $14.000.000',
      rangeUSD: '$1.500 – $3.500',
      rangeLabel: lang === 'es' ? 'presupuesto de pauta sugerido' : 'suggested ad spend',
      highlight: false,
      badge: null,
      paymentLink: '#',
      contract: lang === 'es' ? 'Contrato mínimo: 3 meses' : 'Minimum contract: 3 months',
      features: [
        { text: lang === 'es' ? 'Plan Crecimiento B2C (Meta + TikTok, 6 campañas, 8 creativos, A/B) — $2.850.000/mes' : 'B2C Growth plan (Meta + TikTok, 6 campaigns, 8 creatives, A/B)', included: true },
        { text: lang === 'es' ? 'Plan LinkedIn B2B — $1.800.000/mes' : 'LinkedIn B2B plan', included: true },
        { text: lang === 'es' ? 'Google Ads + Landing Page con asesor de IA — Mes 1: $2.250.000 / Mes 2+: $1.650.000' : 'Google Ads + AI advisor Landing Page', included: true },
        { text: lang === 'es' ? 'Optimización de 2 perfiles LinkedIn — $150.000 único' : '2 LinkedIn profile optimizations — one-time fee', included: true },
        { text: lang === 'es' ? 'Presencia simultánea en Meta, TikTok, LinkedIn y Google' : 'Simultaneous presence on Meta, TikTok, LinkedIn & Google', included: true },
        { text: lang === 'es' ? 'Presupuesto de pauta' : 'Ad spend budget', included: false },
        { text: lang === 'es' ? 'Producción de video profesional' : 'Professional video production', included: false },
        { text: lang === 'es' ? 'Gestión de contenido orgánico' : 'Organic content management', included: false },
      ],
    },
  ];

  const features = [
    { icon: Target, title: lang === 'es' ? 'Google Ads & Shopping' : 'Google Ads & Shopping', desc: lang === 'es' ? 'Campañas de búsqueda, display y shopping optimizadas para conversión.' : 'Search, display and shopping campaigns optimized for conversion.' },
    { icon: Users, title: 'Social Media Ads', desc: lang === 'es' ? 'Facebook, Instagram, TikTok y LinkedIn Ads con segmentación avanzada.' : 'Facebook, Instagram, TikTok and LinkedIn Ads with advanced targeting.' },
    { icon: BarChart3, title: 'Remarketing', desc: lang === 'es' ? 'Recupera visitantes que no convirtieron con estrategias de retargeting inteligente.' : 'Recover non-converting visitors with smart retargeting strategies.' },
    { icon: Megaphone, title: lang === 'es' ? 'Reporting en tiempo real' : 'Real-time reporting', desc: lang === 'es' ? 'Dashboards con métricas clave para tomar decisiones basadas en datos.' : 'Dashboards with key metrics for data-driven decisions.' },
  ];

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {lang === 'es' ? 'Pauta Digital' : 'Digital Advertising'}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              {lang === 'es'
                ? 'Campañas publicitarias en Google, Meta, TikTok y LinkedIn diseñadas para maximizar tu ROI y generar ventas reales.'
                : 'Ad campaigns on Google, Meta, TikTok and LinkedIn designed to maximize your ROI and drive real sales.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {lang === 'es' ? 'Solicitar propuesta' : 'Request proposal'}
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((f, i) => (
                <div key={i} className="glass-card p-8 hover:border-gold/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <f.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planes */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {lang === 'es' ? 'Elige tu plan de pauta' : 'Choose your advertising plan'}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                {lang === 'es'
                  ? 'El presupuesto de pauta va directamente a las plataformas (Meta, TikTok, Google, LinkedIn). No está incluido en el precio del plan.'
                  : 'Ad spend goes directly to the platforms (Meta, TikTok, Google, LinkedIn). Not included in the plan price.'}
              </p>
              {/* Currency toggle */}
              <div className="inline-flex items-center gap-1 p-1 rounded-full border border-border mb-8">
                <button onClick={() => setCurrency('cop')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-black' : 'text-muted-foreground'}`}>COP</button>
                <button onClick={() => setCurrency('usd')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-black' : 'text-muted-foreground'}`}>USD</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div key={plan.name} className={`relative rounded-2xl border p-6 flex flex-col glass-card ${plan.highlight ? 'border-gold shadow-xl shadow-gold/10' : 'border-border'}`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-black text-xs font-bold whitespace-nowrap">
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="text-xl font-display font-bold mb-3 text-foreground">{plan.name}</h3>
                  <div className="mb-2">
                    <p className="text-gold font-bold text-lg leading-tight">
                      {currency === 'cop' ? plan.priceCOP : plan.priceUSD}
                      <span className="text-sm text-muted-foreground font-normal"> {plan.period}</span>
                    </p>
                  </div>
                  <div className="mb-5 p-3 rounded-xl bg-muted/30 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{lang === 'es' ? 'Pauta sugerida: ' : 'Suggested ad spend: '}</span>
                    {currency === 'cop' ? plan.rangeCOP : plan.rangeUSD} {plan.rangeLabel}
                  </div>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className={`flex items-start gap-2 text-sm ${f.included ? '' : 'text-muted-foreground/50'}`}>
                        {f.included
                          ? <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                          : <Minus className="w-4 h-4 mt-0.5 shrink-0" />}
                        <span>{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground mb-4">{plan.contract}</p>
                  <a
                    href="https://wa.me/17865787671?text=Hola%20Ferova%2C%20quiero%20información%20sobre%20el%20plan%20de%20pauta%20digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl font-semibold text-sm text-center flex items-center justify-center gap-2 transition ${plan.highlight ? 'btn-gold' : 'border border-gold/50 text-gold hover:bg-gold/10'}`}
                  >
                    {lang === 'es' ? 'Elegir este plan' : 'Choose this plan'} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default PautaDigital;
