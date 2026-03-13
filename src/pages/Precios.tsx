import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { Link } from 'react-router-dom';
import { Check, Zap, Building2, ShoppingCart, Crown, ArrowRight, MessageCircle } from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const plans = {
  es: [
    { name: 'Express SaaS', icon: Zap, desc: 'Ideal para emprendedores que quieren una Web App rápida y lista.', monthly: { cop: 450000, usd: 115 }, annual: { cop: 4320000, usd: 1104 }, features: ['Web App de 5 páginas', 'Diseño responsive', 'SEO básico on-page', 'Hosting incluido', 'SSL incluido', 'Soporte por email'], cta: 'Empezar ahora', popular: false },
    { name: 'Business Pro', icon: Building2, desc: 'Para negocios que necesitan más funcionalidades y personalización.', monthly: { cop: 850000, usd: 215 }, annual: { cop: 8160000, usd: 2064 }, features: ['Web App hasta 15 páginas', 'Diseño personalizado', 'SEO avanzado', 'Blog integrado', 'Formularios avanzados', 'Analytics & reporting', 'Soporte prioritario'], cta: 'Empezar ahora', popular: true },
    { name: 'Full Commerce', icon: ShoppingCart, desc: 'E-commerce completo con todas las integraciones necesarias.', monthly: { cop: 1500000, usd: 380 }, annual: { cop: 14400000, usd: 3648 }, features: ['Tienda online completa', 'Pasarelas de pago', 'Inventario y pedidos', 'SEO para e-commerce', 'Email marketing setup', 'Integraciones API', 'Soporte 24/7', 'Capacitación incluida'], cta: 'Empezar ahora', popular: false },
    { name: 'Elite Custom', icon: Crown, desc: 'Proyecto a medida con arquitectura y estrategia personalizada.', monthly: { cop: null, usd: null }, annual: { cop: null, usd: null }, features: ['Arquitectura a medida', 'Diseño exclusivo UX/UI', 'Desarrollo full-stack', 'Estrategia SEO integral', 'Integraciones enterprise', 'Project manager dedicado', 'SLA garantizado', 'Consultoría estratégica'], cta: 'Contactar', popular: false },
  ],
  en: [
    { name: 'Express SaaS', icon: Zap, desc: 'Ideal for entrepreneurs who want a fast, ready-to-go Web App.', monthly: { cop: 450000, usd: 115 }, annual: { cop: 4320000, usd: 1104 }, features: ['5-page Web App', 'Responsive design', 'Basic on-page SEO', 'Hosting included', 'SSL included', 'Email support'], cta: 'Get started', popular: false },
    { name: 'Business Pro', icon: Building2, desc: 'For businesses needing more features and customization.', monthly: { cop: 850000, usd: 215 }, annual: { cop: 8160000, usd: 2064 }, features: ['Up to 15-page Web App', 'Custom design', 'Advanced SEO', 'Integrated blog', 'Advanced forms', 'Analytics & reporting', 'Priority support'], cta: 'Get started', popular: true },
    { name: 'Full Commerce', icon: ShoppingCart, desc: 'Complete e-commerce with all necessary integrations.', monthly: { cop: 1500000, usd: 380 }, annual: { cop: 14400000, usd: 3648 }, features: ['Complete online store', 'Payment gateways', 'Inventory & orders', 'E-commerce SEO', 'Email marketing setup', 'API integrations', '24/7 support', 'Training included'], cta: 'Get started', popular: false },
    { name: 'Elite Custom', icon: Crown, desc: 'Tailored project with custom architecture and strategy.', monthly: { cop: null, usd: null }, annual: { cop: null, usd: null }, features: ['Custom architecture', 'Exclusive UX/UI design', 'Full-stack development', 'Comprehensive SEO strategy', 'Enterprise integrations', 'Dedicated project manager', 'Guaranteed SLA', 'Strategic consulting'], cta: 'Contact us', popular: false },
  ],
};

const Precios = ({ lang = 'es' }: Props) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [currency, setCurrency] = useState<'cop' | 'usd'>('usd');

  const t = lang === 'es' ? {
    title: 'Planes y Precios', sub: 'Elige el plan perfecto para tu negocio.', monthly: 'Mensual', annual: 'Anual', save: 'Ahorra 20%', mo: '/mes', yr: '/año', custom: 'Personalizado', popular: 'Más popular',
    faq: 'Preguntas frecuentes', faqs: [
      { q: '¿Puedo cambiar de plan?', a: 'Sí, puedes actualizar o cambiar tu plan en cualquier momento.' },
      { q: '¿Qué incluye el hosting?', a: 'Hosting en servidores de alta velocidad con CDN global, SSL y backups automáticos.' },
      { q: '¿Ofrecen reembolsos?', a: 'Sí, ofrecemos garantía de devolución de 30 días.' },
    ],
  } : {
    title: 'Plans & Pricing', sub: 'Choose the perfect plan for your business.', monthly: 'Monthly', annual: 'Annual', save: 'Save 20%', mo: '/mo', yr: '/yr', custom: 'Custom', popular: 'Most popular',
    faq: 'FAQ', faqs: [
      { q: 'Can I change my plan?', a: 'Yes, you can upgrade or change your plan at any time.' },
      { q: 'What does hosting include?', a: 'High-speed servers with global CDN, SSL, and automatic backups.' },
      { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee.' },
    ],
  };

  const currentPlans = plans[lang];
  const formatPrice = (amount: number | null) => {
    if (amount === null) return t.custom;
    if (currency === 'cop') return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">{t.sub}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <div className="flex items-center gap-3 p-1 rounded-full border border-border">
                <button onClick={() => setIsAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${!isAnnual ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{t.monthly}</button>
                <button onClick={() => setIsAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${isAnnual ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  {t.annual}
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'hsla(356, 68%, 20%, 0.3)', color: 'hsl(356, 68%, 35%)' }}>{t.save}</span>
                </button>
              </div>
              <div className="flex items-center gap-1 p-1 rounded-full border border-border">
                <button onClick={() => setCurrency('usd')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-wine/20 text-wine-light' : 'text-muted-foreground'}`}>USD</button>
                <button onClick={() => setCurrency('cop')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-wine/20 text-wine-light' : 'text-muted-foreground'}`}>COP</button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {currentPlans.map((plan, i) => {
                const price = isAnnual ? plan.annual[currency] : plan.monthly[currency];
                return (
                  <div key={i} className={`glass-card p-8 text-left relative transition-all duration-300 hover:-translate-y-1 ${plan.popular ? 'border-gold/50 gold-glow' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-gold text-primary-foreground">{t.popular}</div>
                    )}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                      <plan.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{plan.desc}</p>
                    <div className="mb-6">
                      {price !== null ? (
                        <><span className="text-3xl font-display font-bold text-foreground">{formatPrice(price)}</span><span className="text-muted-foreground text-sm">{isAnnual ? t.yr : t.mo}</span></>
                      ) : (
                        <span className="text-3xl font-display font-bold text-gradient-gold">{t.custom}</span>
                      )}
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />{f}</li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 ${plan.popular ? 'btn-gold !px-0' : 'border border-border text-foreground hover:border-gold/50 hover:text-gold'}`}
                      onClick={() => {
                        if (price === null) {
                          window.open('https://wa.me/17865787671?text=Hola%20Ferova%2C%20quiero%20info%20sobre%20el%20plan%20Elite%20Custom.', '_blank');
                        }
                        // TODO: Connect to Lemon Squeezy
                      }}
                    >{plan.cta}</button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">{t.faq}</h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {t.faqs.map((faq, i) => (
                <details key={i} className="glass-card p-6 group">
                  <summary className="font-display font-semibold cursor-pointer list-none flex items-center justify-between text-foreground">
                    {faq.q}
                    <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">{faq.a}</p>
                </details>
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

export default Precios;
