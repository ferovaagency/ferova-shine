import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { useState } from 'react';
import { getPaymentLink } from '@/lib/payment-links';
import { useToast } from '@/hooks/use-toast';
import {
  Zap, Shield, BarChart3, Smartphone, Check, X, ArrowRight,
  MessageCircle, Globe, ShoppingCart, Rocket, Star
} from 'lucide-react';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const DiseneoWeb = ({ lang = 'es' }: Props) => {
  const [currency, setCurrency] = useState<'usd' | 'cop' | 'brl'>('usd');
  const { toast } = useToast();

  const handleCta = (key: 'webEconomico' | 'webServicios' | 'webEcommerceFull') => {
    const link = getPaymentLink(key, currency);
    window.open(link, '_blank', 'noopener,noreferrer');
    toast({
      title: lang === 'es' ? '¡Confirmado!' : lang === 'pt' ? 'Confirmado!' : 'Confirmed!',
      description: lang === 'es' ? '¡Plan seleccionado! Te contactaremos pronto.' : lang === 'pt' ? 'Plano selecionado! Entraremos em contato em breve.' : 'Plan selected! We\'ll contact you soon.',
    });
  };

  const formatPrice = (usd: number, cop: number, brl: number) => {
    if (currency === 'cop') return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(cop);
    if (currency === 'brl') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(brl);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd);
  };

  const t = lang === 'es' ? {
    title: 'Webapps que trabajan por ti — entrega en 1 semana',
    sub: 'No es un sitio web bonito. Es una máquina de ventas con IA integrada, SEO desde la arquitectura y panel de administración para que tú controles todo sin depender de nosotros.',
    whatIncludes: '¿Qué incluye nuestro servicio?',
    pricingTitle: 'Planes de Diseño Web',
    noInclude: 'No incluye:',
    monthly: '/mes',
    yearly: '/año',
    build: 'construcción',
    features: [
      { icon: Zap, title: 'Entrega en 1 semana', desc: 'Lo que en WordPress tarda 6 semanas, lo entregamos en 7 días con nuestro proceso optimizado.' },
      { icon: Shield, title: 'Código 100% tuyo', desc: 'Todo el código vive en tu GitHub. No dependes de nosotros para el futuro.' },
      { icon: BarChart3, title: 'SEO desde la estructura', desc: 'Meta tags, Schema.org, URLs amigables y velocidad de carga optimizada desde el inicio.' },
      { icon: Smartphone, title: 'Mobile-first siempre', desc: 'Todas las webapps están optimizadas primero para móvil, tablet y desktop.' },
    ],
    plans: [
      {
        key: 'webEconomico' as const,
        icon: Globe,
        name: 'Web Económica',
        tagline: 'Sitios web en Lovable con IA integrada, entrega en 1 semana.',
        priceLabel: { usd: 599, cop: 1800000, brl: 2990 },
        billingType: 'yearly' as const,
        monthlyPrice: null,
        popular: false,
        includes: [
          'Dominio incluido',
          'Hosting incluido',
          '5 páginas (Inicio / Servicios o Tienda / Nosotros / Contacto)',
          'Botón de WhatsApp siempre visible',
          'Formulario de contacto con notificación',
          'Asesor comercial IA integrado',
        ],
        excludes: ['Panel de administrador', 'Blog', 'Más de 5 páginas', 'Soporte mensual'],
        cta: 'Empezar proyecto',
      },
      {
        key: 'webServicios' as const,
        icon: Rocket,
        name: 'WebApp Servicios',
        tagline: 'Web consultiva con funciones avanzadas, IA y panel de administrador.',
        priceLabel: { usd: 899, cop: 2800000, brl: 4490 },
        billingType: 'build' as const,
        monthlyPrice: { usd: 65, cop: 200000, brl: 320 },
        popular: true,
        includes: [
          'Hosting 1 año incluido',
          '5 páginas principales + hasta 5 páginas de servicios',
          'Botón de WhatsApp siempre visible',
          'Formulario de contacto con notificación',
          'Asesor IA integrado',
          'Panel admin con creación de blogs',
          'Soporte mensual (actualizaciones, cambios de info, soporte técnico)',
        ],
        excludes: ['Tienda virtual', 'Más de 10 páginas', 'Cambios de estructura completa'],
        cta: 'Elegir WebApp Servicios',
      },
      {
        key: 'webEcommerceFull' as const,
        icon: ShoppingCart,
        name: 'WebApp E-Commerce',
        tagline: 'Tienda virtual completa con IA maximizada para conversión.',
        priceLabel: { usd: 1490, cop: 4200000, brl: 7490 },
        billingType: 'build' as const,
        monthlyPrice: { usd: 119, cop: 400000, brl: 570 },
        popular: false,
        includes: [
          'Hosting 1 año incluido',
          '5 páginas principales, hasta 300 productos',
          'Filtros / categorías / marcas / carrito / checkout / pasarela de pago',
          'Botón de WhatsApp siempre visible',
          'Formulario de contacto con notificación',
          'Asesor IA para ventas',
          'Panel admin avanzado con IA (pedidos, estados, base de datos, generador fichas producto, generador blogs)',
          'Soporte mensual (actualizaciones, cambios info, hasta 100 productos/mes, soporte técnico)',
        ],
        excludes: ['Cambios de estructura completa'],
        cta: 'Quiero mi tienda',
      },
    ],
    process: 'Cómo entregamos en 1 semana',
    steps: [
      { n: '01', title: 'Kickoff y marca', desc: 'Reunión inicial, recopilamos logo, colores y contenido.' },
      { n: '02', title: 'Estructura base', desc: 'Construimos Header, Footer, Home y rutas principales.' },
      { n: '03', title: 'Páginas y funciones', desc: 'Desarrollamos cada página con sus funcionalidades.' },
      { n: '04', title: 'Entrega y dominio', desc: 'Revisión final, conexión del dominio y capacitación básica.' },
    ],
  } : lang === 'pt' ? {
    title: 'Webapps que trabalham por você — entrega em 1 semana',
    sub: 'Não é um site bonito. É uma máquina de vendas com IA integrada, SEO desde a arquitetura e painel de administração para você controlar tudo sem depender de nós.',
    whatIncludes: 'O que nosso serviço inclui?',
    pricingTitle: 'Planos de Desenvolvimento Web',
    noInclude: 'Não inclui:',
    monthly: '/mês',
    yearly: '/ano',
    build: 'construção',
    features: [
      { icon: Zap, title: 'Entrega em 1 semana', desc: 'O que no WordPress leva 6 semanas, entregamos em 7 dias com nosso processo otimizado.' },
      { icon: Shield, title: 'Código 100% seu', desc: 'Todo o código fica no seu GitHub. Você não depende de nós para o futuro.' },
      { icon: BarChart3, title: 'SEO desde a estrutura', desc: 'Meta tags, Schema.org, URLs amigáveis e velocidade de carga otimizada desde o início.' },
      { icon: Smartphone, title: 'Mobile-first sempre', desc: 'Todas as webapps são otimizadas primeiro para mobile, tablet e desktop.' },
    ],
    plans: [
      {
        key: 'webEconomico' as const,
        icon: Globe,
        name: 'Web Econômica',
        tagline: 'Sites em Lovable com IA integrada, entrega em 1 semana.',
        priceLabel: { usd: 599, cop: 1800000, brl: 2990 },
        billingType: 'yearly' as const,
        monthlyPrice: null,
        popular: false,
        includes: [
          'Domínio incluído',
          'Hospedagem incluída',
          '5 páginas (Início / Serviços ou Loja / Sobre / Contato)',
          'Botão de WhatsApp sempre visível',
          'Formulário de contato com notificação',
          'Consultor comercial IA integrado',
        ],
        excludes: ['Painel de administrador', 'Blog', 'Mais de 5 páginas', 'Suporte mensal'],
        cta: 'Iniciar projeto',
      },
      {
        key: 'webServicios' as const,
        icon: Rocket,
        name: 'WebApp Serviços',
        tagline: 'Site consultivo com funções avançadas, IA e painel admin.',
        priceLabel: { usd: 899, cop: 2800000, brl: 4490 },
        billingType: 'build' as const,
        monthlyPrice: { usd: 65, cop: 200000, brl: 320 },
        popular: true,
        includes: [
          'Hospedagem 1 ano incluída',
          '5 páginas principais + até 5 páginas de serviços',
          'Botão de WhatsApp sempre visível',
          'Formulário de contato com notificação',
          'Consultor IA integrado',
          'Painel admin com criação de blogs',
          'Suporte mensal (atualizações, mudanças de info, suporte técnico)',
        ],
        excludes: ['Loja virtual', 'Mais de 10 páginas', 'Mudanças de estrutura completa'],
        cta: 'Escolher WebApp Serviços',
      },
      {
        key: 'webEcommerceFull' as const,
        icon: ShoppingCart,
        name: 'WebApp E-Commerce',
        tagline: 'Loja virtual completa com IA maximizada para conversão.',
        priceLabel: { usd: 1490, cop: 4200000, brl: 7490 },
        billingType: 'build' as const,
        monthlyPrice: { usd: 119, cop: 400000, brl: 570 },
        popular: false,
        includes: [
          'Hospedagem 1 ano incluída',
          '5 páginas principais, até 300 produtos',
          'Filtros / categorias / marcas / carrinho / checkout / gateway de pagamento',
          'Botão de WhatsApp sempre visível',
          'Formulário de contato com notificação',
          'Consultor IA para vendas',
          'Painel admin avançado com IA (pedidos, status, banco de dados, gerador fichas produto, gerador blogs)',
          'Suporte mensal (atualizações, mudanças info, até 100 produtos/mês, suporte técnico)',
        ],
        excludes: ['Mudanças de estrutura completa'],
        cta: 'Quero minha loja',
      },
    ],
    process: 'Como entregamos em 1 semana',
    steps: [
      { n: '01', title: 'Kickoff e marca', desc: 'Reunião inicial, coletamos logo, cores e conteúdo.' },
      { n: '02', title: 'Estrutura base', desc: 'Construímos Header, Footer, Home e rotas principais.' },
      { n: '03', title: 'Páginas e funções', desc: 'Desenvolvemos cada página com suas funcionalidades.' },
      { n: '04', title: 'Entrega e domínio', desc: 'Revisão final, conexão do domínio e capacitação básica.' },
    ],
  } : {
    title: 'Webapps that work for you — 1-week delivery',
    sub: 'It\'s not just a pretty website. It\'s a sales machine with integrated AI, SEO from the architecture, and an admin panel so you control everything without depending on us.',
    whatIncludes: 'What does our service include?',
    pricingTitle: 'Web Design Plans',
    noInclude: 'Does not include:',
    monthly: '/mo',
    yearly: '/yr',
    build: 'build',
    features: [
      { icon: Zap, title: '1-week delivery', desc: 'What takes 6 weeks in WordPress, we deliver in 7 days with our optimized process.' },
      { icon: Shield, title: '100% your code', desc: 'All code lives in your GitHub. You\'re not dependent on us for the future.' },
      { icon: BarChart3, title: 'SEO from the ground up', desc: 'Meta tags, Schema.org, friendly URLs and optimized load speed from day one.' },
      { icon: Smartphone, title: 'Always mobile-first', desc: 'All webapps are optimized first for mobile, tablet and desktop.' },
    ],
    plans: [
      {
        key: 'webEconomico' as const,
        icon: Globe,
        name: 'Starter Web',
        tagline: 'Websites built on Lovable with integrated AI, delivered in 1 week.',
        priceLabel: { usd: 599, cop: 1800000, brl: 2990 },
        billingType: 'yearly' as const,
        monthlyPrice: null,
        popular: false,
        includes: [
          'Domain included',
          'Hosting included',
          '5 pages (Home / Services or Store / About / Contact)',
          'Always-visible WhatsApp button',
          'Contact form with notification',
          'Integrated AI sales advisor',
        ],
        excludes: ['Admin panel', 'Blog', 'More than 5 pages', 'Monthly support'],
        cta: 'Start project',
      },
      {
        key: 'webServicios' as const,
        icon: Rocket,
        name: 'Services WebApp',
        tagline: 'Consultative website with advanced features, AI and admin panel.',
        priceLabel: { usd: 899, cop: 2800000, brl: 4490 },
        billingType: 'build' as const,
        monthlyPrice: { usd: 65, cop: 200000, brl: 320 },
        popular: true,
        includes: [
          '1-year hosting included',
          '5 main pages + up to 5 service pages',
          'Always-visible WhatsApp button',
          'Contact form with notification',
          'Integrated AI advisor',
          'Admin panel with blog creation',
          'Monthly support (updates, info changes, tech support)',
        ],
        excludes: ['Online store', 'More than 10 pages', 'Full structural changes'],
        cta: 'Choose Services WebApp',
      },
      {
        key: 'webEcommerceFull' as const,
        icon: ShoppingCart,
        name: 'E-Commerce WebApp',
        tagline: 'Complete online store with AI maximized for conversion.',
        priceLabel: { usd: 1490, cop: 4200000, brl: 7490 },
        billingType: 'build' as const,
        monthlyPrice: { usd: 119, cop: 400000, brl: 570 },
        popular: false,
        includes: [
          '1-year hosting included',
          '5 main pages, up to 300 products',
          'Filters / categories / brands / cart / checkout / payment gateway',
          'Always-visible WhatsApp button',
          'Contact form with notification',
          'AI sales advisor',
          'Advanced admin panel with AI (orders, statuses, database, product sheet generator, blog generator)',
          'Monthly support (updates, info changes, up to 100 products/mo, tech support)',
        ],
        excludes: ['Full structural changes'],
        cta: 'I want my store',
      },
    ],
    process: 'How we deliver in 1 week',
    steps: [
      { n: '01', title: 'Kickoff & brand', desc: 'Initial meeting, we collect logo, colors and content.' },
      { n: '02', title: 'Base structure', desc: 'We build Header, Footer, Home and main routes.' },
      { n: '03', title: 'Pages & features', desc: 'We develop each page with its functionalities.' },
      { n: '04', title: 'Delivery & domain', desc: 'Final review, domain connection and basic training.' },
    ],
  };

  return (
    <>
      <Header currentLang={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://seoparaecommerce.co/servicios/diseno-web#service",
        "name": "Desarrollo de WebApps para E-commerce",
        "provider": { "@type": "Organization", "@id": "https://seoparaecommerce.co/#organization", "name": "Ferova Agency" },
        "description": "Construimos webapps de e-commerce con React, Supabase y IA integrada. Entrega en 1 semana. Incluye panel admin, asesor IA de ventas y SEO técnico.",
        "areaServed": ["Colombia", "Latinoamérica", "Estados Unidos"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Planes de WebApp",
          "itemListElement": [
            { "@type": "Offer", "name": "Web Económica", "price": "1800000", "priceCurrency": "COP", "description": "Sitio web profesional con IA integrada, entrega en 1 semana" },
            { "@type": "Offer", "name": "WebApp Servicios", "price": "2800000", "priceCurrency": "COP", "description": "WebApp consultiva con panel admin y asesor IA" },
            { "@type": "Offer", "name": "WebApp E-Commerce", "price": "4200000", "priceCurrency": "COP", "description": "Tienda virtual completa con IA de ventas y generador de fichas" }
          ]
        }
      }) }} />

        {/* Hero */}
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">{t.sub}</p>
            <a href="https://wa.me/17865787671?text=Hola%20Ferova%2C%20quiero%20información%20sobre%20diseño%20web" target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {lang === 'es' ? 'Solicitar propuesta' : lang === 'pt' ? 'Solicitar proposta' : 'Request proposal'}
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

        {/* Pricing */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-10">{t.pricingTitle}</h2>

            {/* Currency toggle */}
            <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-border w-fit mx-auto mb-14">
              <button onClick={() => setCurrency('usd')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>USD</button>
              <button onClick={() => setCurrency('cop')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>COP</button>
              <button onClick={() => setCurrency('brl')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'brl' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>BRL</button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {t.plans.map((plan, i) => {
                const IconComp = plan.icon;
                return (
                  <div key={i} className={`glass-card p-8 relative flex flex-col transition-all duration-300 ${plan.popular ? 'border-gold/50 gold-glow' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-gold text-primary-foreground whitespace-nowrap">
                        {lang === 'es' ? 'Más elegido' : lang === 'pt' ? 'Mais escolhido' : 'Most popular'}
                      </div>
                    )}

                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                      <IconComp className="w-7 h-7 text-gold" />
                    </div>

                    <h3 className="text-xl font-display font-bold mb-3 text-foreground">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.tagline}</p>

                    {/* Price */}
                    <div className="mb-2">
                      <span className="text-3xl font-display font-bold">
                        {formatPrice(plan.priceLabel.usd, plan.priceLabel.cop, plan.priceLabel.brl)}
                      </span>
                      <span className="text-muted-foreground text-sm ml-1">
                        {plan.billingType === 'yearly' ? t.yearly : t.build}
                      </span>
                    </div>
                    {plan.monthlyPrice && (
                      <p className="text-gold text-sm font-semibold mb-6">
                        + {formatPrice(plan.monthlyPrice.usd, plan.monthlyPrice.cop, plan.monthlyPrice.brl)}{t.monthly}
                      </p>
                    )}
                    {!plan.monthlyPrice && <div className="mb-6" />}

                    {/* Includes */}
                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.includes.map((item, ii) => (
                        <li key={ii} className="flex items-start gap-3 text-sm text-foreground">
                          <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Excludes */}
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
                      className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${plan.popular ? 'btn-gold !px-0' : 'border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground'}`}
                    >
                      <ArrowRight className="w-4 h-4" /> {plan.cta}
                    </button>
                  </div>
                );
              })}
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

        {/* CTA */}
        <section className="py-20 md:py-28 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <Star className="w-12 h-12 text-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              {lang === 'es' ? '¿Listo para tu nueva web?' : lang === 'pt' ? 'Pronto para seu novo site?' : 'Ready for your new website?'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              {lang === 'es'
                ? 'Cuéntanos tu proyecto y te respondemos con una propuesta en menos de 24 horas.'
                : lang === 'pt' ? 'Conte-nos seu projeto e responderemos com uma proposta em menos de 24 horas.'
                : 'Tell us about your project and we\'ll respond with a proposal in less than 24 hours.'}
            </p>
            <a href="https://wa.me/17865787671?text=Hola%20Ferova%2C%20quiero%20una%20propuesta%20de%20diseño%20web" target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {lang === 'es' ? 'Solicitar propuesta gratis' : lang === 'pt' ? 'Solicitar proposta grátis' : 'Request free proposal'}
            </a>
          </div>
        </section>

        <AdBanner slot="service-diseno-web" className="max-w-4xl mx-auto mb-20" />
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default DiseneoWeb;
