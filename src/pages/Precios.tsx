import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Check, MessageCircle } from 'lucide-react';
import {
  formatPrice,
  type Currency,
  type Plan,
  WEB_APPS_PLANS,
  SEO_PLANS,
  WHATSAPP_PLANS,
} from '@/data/pricing';
import { trackEvent } from '@/lib/analytics';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const WA = 'https://wa.link/hbrsxy';

function detectDefaultCurrency(lang: 'es' | 'en' | 'pt'): Currency {
  if (typeof navigator === 'undefined') {
    return lang === 'es' ? 'COP' : lang === 'pt' ? 'BRL' : 'USD';
  }
  const locale = navigator.language || 'en-US';
  if (locale.startsWith('es-CO') || locale.includes('-CO')) return 'COP';
  if (locale.startsWith('pt-BR') || locale.includes('-BR')) return 'BRL';
  if (
    locale.startsWith('es-ES') ||
    /-(ES|FR|DE|IT|PT|NL|BE|AT|IE|FI|GR|LU)$/i.test(locale)
  ) return 'EUR';
  return lang === 'es' ? 'COP' : lang === 'pt' ? 'BRL' : 'USD';
}

function PricingTable({
  title, subtitle, plans, currency, bg = '',
}: { title: string; subtitle: string; plans: Plan[]; currency: Currency; bg?: string }) {
  const single = plans.length === 1;
  return (
    <section className={`py-16 ${bg}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className={`grid grid-cols-1 ${single ? 'max-w-md mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-2xl border-2 flex flex-col bg-card ${
                plan.highlighted
                  ? 'border-gold shadow-xl md:scale-[1.03]'
                  : 'border-border'
              }`}
            >
              {plan.highlighted && (
                <span className="self-start px-3 py-1 rounded-full bg-gold text-slate-950 text-xs font-bold uppercase mb-4">
                  Más popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">
                  {formatPrice(plan.priceUsd, currency)}
                </span>
                <span className="text-muted-foreground text-sm ml-2">{plan.period}</span>
                {currency !== 'USD' && (
                  <p className="text-xs text-muted-foreground mt-1">
                    (equivalente a ~{formatPrice(plan.priceUsd, 'USD')})
                  </p>
                )}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <Check className="text-gold shrink-0 w-4 h-4 mt-0.5" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`${WA}?text=${encodeURIComponent(`Hola, quiero información sobre el plan ${plan.name}`)}`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackEvent('pricing_card_clicked', { plan: plan.name, currency, source: 'pricing_table' })}
              >
                <Button className={`w-full ${plan.highlighted ? 'bg-gold hover:bg-gold/90 text-slate-950' : ''}`} variant={plan.highlighted ? 'default' : 'outline'}>
                  {plan.cta}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Precios = ({ lang = 'es' }: Props) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    setCurrency(detectDefaultCurrency(lang));
  }, [lang]);

  const changeCurrency = (c: Currency) => {
    setCurrency(c);
    trackEvent('cta_clicked', { source: 'pricing_currency', label: c });
  };

  return (
    <>
      <Helmet>
        <title>Precios claros, sin sorpresas — Ferova Agency</title>
        <meta name="description" content="Precios en USD, COP, BRL y EUR para Web Apps, SEO + GEO + IAO y WhatsApp IA Bot. Sin contratos forzados ni letras chiquitas." />
        <link rel="canonical" href={lang === 'en' ? 'https://seoforecommerces.co/pricing' : lang === 'pt' ? 'https://seoparaecommerce.co/pt/precos' : 'https://seoparaecommerce.co/precios'} />
        <meta property="og:title" content="Precios claros, sin sorpresas — Ferova Agency" />
        <meta property="og:description" content="Precios en USD, COP, BRL y EUR para Web Apps, SEO + GEO + IAO y WhatsApp IA Bot." />
        <meta property="og:url" content={lang === 'en' ? 'https://seoforecommerces.co/pricing' : lang === 'pt' ? 'https://seoparaecommerce.co/pt/precos' : 'https://seoparaecommerce.co/precios'} />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: '¿Hay contrato de permanencia?', acceptedAnswer: { '@type': 'Answer', text: 'No. Todos los planes son mes a mes. Cancela cuando quieras.' } },
            { '@type': 'Question', name: '¿La asesoría inicial se descuenta?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. El costo de la asesoría inicial se descuenta del primer mes del servicio que contrates.' } },
            { '@type': 'Question', name: '¿Qué métodos de pago aceptan?', acceptedAnswer: { '@type': 'Answer', text: 'Coordinamos por WhatsApp el método más conveniente: transferencia, Wompi, MercadoPago, PayPal o Stripe.' } },
            { '@type': 'Question', name: '¿Puedo cambiar de plan?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Subes o bajas de plan en cualquier momento sin penalización.' } },
            { '@type': 'Question', name: '¿Los precios incluyen impuestos?', acceptedAnswer: { '@type': 'Answer', text: 'Los precios mostrados son base. Se aplica IVA o impuesto local según tu país.' } },
          ],
        })}</script>
      </Helmet>
      <Header currentLang={lang} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-slate-950 to-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <p className="text-sm uppercase tracking-widest text-gold mb-3">Precios</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Precios claros, sin sorpresas
            </h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              Elige el servicio, ve el precio en tu moneda y empieza. Sin contratos forzados ni letras chiquitas.
            </p>

            <div className="mt-8 inline-flex bg-white/10 rounded-full p-1">
              {(['USD', 'COP', 'BRL', 'EUR'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => changeCurrency(c)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    currency === c ? 'bg-gold text-slate-950' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        <PricingTable
          title="Web Apps Ecommerce con IA"
          subtitle="Tu tienda online moderna con todas las herramientas para vender"
          plans={WEB_APPS_PLANS}
          currency={currency}
        />

        <PricingTable
          title="SEO + GEO + IAO"
          subtitle="Te encuentran en Google, ChatGPT, Claude, Perplexity y Gemini"
          plans={SEO_PLANS}
          currency={currency}
          bg="bg-muted/40"
        />

        <PricingTable
          title="WhatsApp IA Bot"
          subtitle="Asesor automático 24/7 con tu información"
          plans={WHATSAPP_PLANS}
          currency={currency}
        />

        {/* Herramientas */}
        <section className="py-16 bg-muted/40">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Herramientas con descuentos exclusivos</h2>
            <p className="text-muted-foreground mb-8">
              El acceso a las herramientas es gratis. Solo pagas el descuento que negociamos directamente con el proveedor.
            </p>
            <Link to={lang === 'pt' ? '/pt/recursos' : lang === 'en' ? '/en/resources' : '/recursos'}>
              <Button size="lg">Ver herramientas y descuentos</Button>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {[
                { q: '¿Hay contrato de permanencia?', a: 'No. Todos los planes son mes a mes. Cancela cuando quieras.' },
                { q: '¿La asesoría inicial se descuenta?', a: 'Sí. El costo de la asesoría inicial se descuenta del primer mes del servicio que contrates.' },
                { q: '¿Qué métodos de pago aceptan?', a: 'Coordinamos por WhatsApp el método más conveniente según tu país: transferencia, Wompi, MercadoPago, PayPal o Stripe.' },
                { q: '¿Puedo cambiar de plan?', a: 'Sí. Subes o bajas de plan en cualquier momento sin penalización.' },
                { q: '¿Los precios incluyen impuestos?', a: 'Los precios mostrados son base. Se aplica IVA o impuesto local según tu país.' },
              ].map((f, i) => (
                <div key={i} className="border border-border rounded-xl p-5 bg-card">
                  <h3 className="font-bold text-foreground mb-2">{f.q}</h3>
                  <p className="text-sm text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-16 bg-gold text-slate-950">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">¿Tienes dudas sobre qué plan elegir?</h2>
            <p className="text-lg mb-8">Hablemos por WhatsApp y te ayudo a elegir el mejor plan para tu negocio.</p>
            <a
              href={`${WA}?text=${encodeURIComponent('Hola, necesito ayuda para elegir un plan')}`}
              target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_button_clicked', { source: 'pricing_final_cta' })}
            >
              <Button size="lg" className="bg-slate-950 text-white hover:bg-slate-800 gap-2">
                <MessageCircle className="w-5 h-5" /> Hablar con asesor
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </>
  );
};

export default Precios;
