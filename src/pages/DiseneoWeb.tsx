import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import AdBanner from '@/components/ui/ad-banner';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatPrice, type Lang } from '@/lib/pricing';
import {
  Zap, Shield, BarChart3, Smartphone, Check, ArrowRight,
  MessageCircle, ShoppingCart, Star,
} from 'lucide-react';

interface Props { lang?: Lang; }

const DEV_WEB_USD = 1200;

const DiseneoWeb = ({ lang = 'es' }: Props) => {
  const { toast } = useToast();
  const { trackServiceCTA, trackWhatsApp, trackScrollDepth } = useAnalytics();

  useEffect(() => {
    const depths = [25, 50, 75, 100];
    const triggered = new Set<number>();
    const onScroll = () => {
      const s = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      depths.forEach(d => { if (s >= d && !triggered.has(d)) { triggered.add(d); trackScrollDepth(d, window.location.pathname); } });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const t = lang === 'es' ? {
    title: 'Desarrollo Web / E-commerce — entrega en 1 semana',
    sub: 'Una webapp con IA integrada, SEO desde la arquitectura y panel de administración. Tu máquina de ventas online lista para escalar.',
    whatIncludes: '¿Qué incluye?',
    pricingTitle: 'Inversión única',
    planName: 'Desarrollo Web / E-commerce',
    planTagline: 'Sitio profesional o tienda virtual con IA, panel admin y soporte mensual incluido el primer mes.',
    cta: 'Solicitar propuesta',
    ctaPrimary: 'Empezar proyecto',
    features: [
      { icon: Zap, title: 'Entrega en 1 semana', desc: 'Lo que con métodos tradicionales tarda 6 semanas, lo entregamos en 7 días.' },
      { icon: Shield, title: 'Código 100% tuyo', desc: 'Todo el código vive en tu GitHub. No dependes de nosotros.' },
      { icon: BarChart3, title: 'SEO desde la estructura', desc: 'Meta tags, Schema.org, URLs amigables y velocidad optimizada.' },
      { icon: Smartphone, title: 'Mobile-first siempre', desc: 'Optimizado primero para móvil, tablet y desktop.' },
    ],
    includes: [
      'Hosting 1 año + dominio incluidos',
      'Hasta 10 páginas o catálogo de hasta 300 productos',
      'Asesor IA de ventas integrado',
      'Panel admin con creación de blogs y generador de fichas',
      'Botón de WhatsApp siempre visible',
      'Formulario de contacto con notificación',
      'Tracking de Analytics y Search Console',
    ],
    process: 'Cómo entregamos en 1 semana',
    steps: [
      { n: '01', title: 'Kickoff y marca', desc: 'Reunión inicial, logo, colores y contenido.' },
      { n: '02', title: 'Estructura base', desc: 'Header, Footer, Home y rutas principales.' },
      { n: '03', title: 'Páginas y funciones', desc: 'Cada página con sus funcionalidades.' },
      { n: '04', title: 'Entrega y dominio', desc: 'Revisión final, dominio y capacitación.' },
    ],
    finalCta: '¿Listo para tu nueva web?',
    finalSub: 'Cuéntanos tu proyecto y te respondemos en menos de 24 horas.',
  } : lang === 'pt' ? {
    title: 'Desenvolvimento Web / E-commerce — entrega em 1 semana',
    sub: 'Uma webapp com IA integrada, SEO desde a arquitetura e painel de administração. Sua máquina de vendas online pronta para escalar.',
    whatIncludes: 'O que inclui?',
    pricingTitle: 'Investimento único',
    planName: 'Desenvolvimento Web / E-commerce',
    planTagline: 'Site profissional ou loja virtual com IA, painel admin e suporte mensal incluído no primeiro mês.',
    cta: 'Solicitar proposta',
    ctaPrimary: 'Iniciar projeto',
    features: [
      { icon: Zap, title: 'Entrega em 1 semana', desc: 'O que leva 6 semanas com métodos tradicionais, entregamos em 7 dias.' },
      { icon: Shield, title: 'Código 100% seu', desc: 'Todo o código no seu GitHub. Você não depende de nós.' },
      { icon: BarChart3, title: 'SEO desde a estrutura', desc: 'Meta tags, Schema.org, URLs amigáveis e velocidade otimizada.' },
      { icon: Smartphone, title: 'Mobile-first sempre', desc: 'Otimizado primeiro para mobile, tablet e desktop.' },
    ],
    includes: [
      'Hospedagem 1 ano + domínio incluídos',
      'Até 10 páginas ou catálogo de até 300 produtos',
      'Consultor IA de vendas integrado',
      'Painel admin com criação de blogs e gerador de fichas',
      'Botão de WhatsApp sempre visível',
      'Formulário de contato com notificação',
      'Tracking de Analytics e Search Console',
    ],
    process: 'Como entregamos em 1 semana',
    steps: [
      { n: '01', title: 'Kickoff e marca', desc: 'Reunião inicial, logo, cores e conteúdo.' },
      { n: '02', title: 'Estrutura base', desc: 'Header, Footer, Home e rotas principais.' },
      { n: '03', title: 'Páginas e funções', desc: 'Cada página com suas funcionalidades.' },
      { n: '04', title: 'Entrega e domínio', desc: 'Revisão final, domínio e capacitação.' },
    ],
    finalCta: 'Pronto para seu novo site?',
    finalSub: 'Conte-nos seu projeto e respondemos em menos de 24 horas.',
  } : {
    title: 'Web / E-commerce Development — 1-week delivery',
    sub: 'A webapp with integrated AI, SEO from the architecture, and admin panel. Your online sales machine ready to scale.',
    whatIncludes: 'What\'s included?',
    pricingTitle: 'One-time investment',
    planName: 'Web / E-commerce Development',
    planTagline: 'Professional site or online store with AI, admin panel and first month of support included.',
    cta: 'Request proposal',
    ctaPrimary: 'Start project',
    features: [
      { icon: Zap, title: '1-week delivery', desc: 'What takes 6 weeks traditionally, we deliver in 7 days.' },
      { icon: Shield, title: '100% your code', desc: 'All code lives in your GitHub. You\'re not locked in.' },
      { icon: BarChart3, title: 'SEO from the ground up', desc: 'Meta tags, Schema.org, friendly URLs and optimized speed.' },
      { icon: Smartphone, title: 'Always mobile-first', desc: 'Optimized first for mobile, tablet and desktop.' },
    ],
    includes: [
      '1-year hosting + domain included',
      'Up to 10 pages or catalog up to 300 products',
      'Integrated AI sales advisor',
      'Admin panel with blog creation and product sheet generator',
      'Always-visible WhatsApp button',
      'Contact form with notification',
      'Analytics and Search Console tracking',
    ],
    process: 'How we deliver in 1 week',
    steps: [
      { n: '01', title: 'Kickoff & brand', desc: 'Initial meeting, logo, colors and content.' },
      { n: '02', title: 'Base structure', desc: 'Header, Footer, Home and main routes.' },
      { n: '03', title: 'Pages & features', desc: 'Each page with its functionality.' },
      { n: '04', title: 'Delivery & domain', desc: 'Final review, domain and training.' },
    ],
    finalCta: 'Ready for your new website?',
    finalSub: 'Tell us about your project and we respond in under 24 hours.',
  };

  const waUrl = 'https://wa.me/17865787671?text=' + encodeURIComponent(
    lang === 'es' ? 'Hola Ferova, quiero información sobre Desarrollo Web / E-commerce.'
    : lang === 'pt' ? 'Olá Ferova, quero informações sobre Desenvolvimento Web / E-commerce.'
    : 'Hi Ferova, I want info on Web / E-commerce Development.'
  );

  const handleCta = () => {
    trackServiceCTA('webDevelopment', lang === 'es' ? 'cop' : lang === 'pt' ? 'brl' : 'usd', 'whatsapp_click');
    trackWhatsApp('service_page', 'webDevelopment');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    toast({
      title: lang === 'es' ? '¡Confirmado!' : lang === 'pt' ? 'Confirmado!' : 'Confirmed!',
      description: lang === 'es' ? 'Te contactaremos pronto.' : lang === 'pt' ? 'Entraremos em contato em breve.' : 'We\'ll contact you soon.',
    });
  };

   return (
    <>
      <SEO
        title={`${t.title} — Ferova Agency`}
        description={t.sub}
        path={lang === 'en' ? '/en/services/web-design' : lang === 'pt' ? '/pt/design-web' : '/servicios/diseno-web'}
        lang={lang}
      />
      <Header currentLang={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': 'https://seoparaecommerce.co/servicios/diseno-web#service',
        name: t.planName,
        provider: { '@type': 'Organization', '@id': 'https://seoparaecommerce.co/#organization', name: 'Ferova Agency' },
        description: t.planTagline,
        areaServed: ['Colombia', 'Latinoamérica', 'Estados Unidos', 'Brasil'],
        offers: { '@type': 'Offer', price: String(DEV_WEB_USD), priceCurrency: 'USD' },
      }) }} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">{t.sub}</p>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />{t.cta}
            </a>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-gold">{t.whatIncludes}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.features.map((f, i) => (
                <div key={i} className="glass-card p-8 hover:border-gold/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <f.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 text-foreground">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing — single plan */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">{t.pricingTitle}</h2>
            <div className="max-w-lg mx-auto glass-card p-10 border-gold/50 gold-glow flex flex-col">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                <ShoppingCart className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3 text-foreground">{t.planName}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t.planTagline}</p>
              <div className="mb-6">
                <span className="text-4xl font-display font-bold">{formatPrice(DEV_WEB_USD, lang)}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {t.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
              <button onClick={handleCta} className="btn-gold w-full flex items-center justify-center gap-2">
                <ArrowRight className="w-4 h-4" />{t.ctaPrimary}
              </button>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-gold">{t.process}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {t.steps.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-gold">
                    <span className="text-xl font-display font-bold text-primary-foreground">{s.n}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <Star className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{t.finalCta}</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">{t.finalSub}</p>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />{t.cta}
            </a>
          </div>
        </section>

        <AdBanner slot="service-diseno-web" className="max-w-4xl mx-auto mb-20" />
      </main>
      <Footer currentLang={lang} />
    </>
  );
};

export default DiseneoWeb;
