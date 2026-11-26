import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import AdBanner from '@/components/ui/ad-banner';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatPrice, type Lang } from '@/lib/pricing';
import {
  Zap, Shield, BarChart3, Smartphone, ArrowRight,
  MessageCircle, ShoppingCart,
} from 'lucide-react';
import { CheckList, CtaBand, FeraButton, IconTile, PageHero, Panel, ProcessSteps, Section, SectionHeading } from '@/components/fx/primitives';

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

  const waUrl = 'https://wa.me/17866894686?text=' + encodeURIComponent(
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

  const path = lang === 'en' ? '/en/services/web-design' : lang === 'pt' ? '/pt/design-web' : '/servicios/diseno-web';
  const home = lang === 'en' ? { name: 'Home', path: '/en' } : lang === 'pt' ? { name: 'Início', path: '/pt' } : { name: 'Inicio', path: '/' };
  const crumbs = [{ name: t.planName, path }];
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://seoparaecommerce.co/servicios/diseno-web#service',
    name: t.planName,
    provider: { '@type': 'Organization', '@id': 'https://seoparaecommerce.co/#organization', name: 'Ferova Agency' },
    description: t.planTagline,
    areaServed: ['Colombia', 'Latinoamérica', 'Estados Unidos', 'Brasil'],
    offers: { '@type': 'Offer', price: String(DEV_WEB_USD), priceCurrency: 'USD' },
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
        <PageHero eyebrow={t.planName} title={t.title} intro={t.sub} breadcrumbs={crumbs} lang={lang}>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="fx-btn">
            <MessageCircle aria-hidden="true" />{t.cta}
          </a>
        </PageHero>

        {/* Features */}
        <Section>
          <SectionHeading title={t.whatIncludes} />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {t.features.map((f) => (
              <Panel key={f.title}>
                <IconTile icon={f.icon} />
                <h3>{f.title}</h3>
                <p className="fx-muted mt-3 text-sm leading-relaxed">{f.desc}</p>
              </Panel>
            ))}
          </div>
        </Section>

        {/* Pricing — single plan */}
        <Section tone="surface">
          <div className="text-center">
            <h2 className="text-3xl leading-tight sm:text-4xl lg:text-5xl">{t.pricingTitle}</h2>
          </div>
          <div className="fx-light mx-auto mt-12 flex max-w-lg flex-col rounded-[1.25rem] border-t-[3px] border-[#541014] bg-white p-8 shadow-[0_24px_60px_rgb(47_45_86/13%)] sm:p-10">
            <span className="icon-tile !mb-6 !bg-[#f6f5fb]"><ShoppingCart aria-hidden="true" strokeWidth={1.5} /></span>
            <h3 className="text-2xl">{t.planName}</h3>
            <p className="fx-muted mt-3 text-sm leading-relaxed">{t.planTagline}</p>
            <p className="mt-6 text-4xl font-semibold tabular-nums" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>{formatPrice(DEV_WEB_USD, lang)}</p>
            <CheckList className="mt-6 flex-1" items={t.includes} />
            <button type="button" onClick={handleCta} className="fx-btn mt-8 w-full">
              {t.ctaPrimary}<ArrowRight aria-hidden="true" />
            </button>
          </div>
        </Section>

        {/* Process */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading title={t.process} />
            <ProcessSteps steps={t.steps.map((s) => ({ title: s.title, body: s.desc }))} />
          </div>
          <AdBanner slot="service-diseno-web" className="mx-auto mt-16 max-w-4xl" />
        </Section>

        {/* Final CTA */}
        <CtaBand title={t.finalCta} body={t.finalSub}>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="fx-btn">
            <MessageCircle aria-hidden="true" />{t.cta}
          </a>
          <FeraButton variant="outline" source="service_web_design" prompt={t.planName}>
            {lang === 'en' ? 'Talk to Fera' : lang === 'pt' ? 'Falar com a Fera' : 'Hablar con Fera'}
          </FeraButton>
        </CtaBand>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default DiseneoWeb;
