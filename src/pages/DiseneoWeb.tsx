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
  const [currency, setCurrency] = useState<'usd' | 'cop'>('usd');
  const { toast } = useToast();

  const handleCta = (key: 'webEconomico' | 'webPro' | 'webEcommerce') => {
    const link = getPaymentLink(key, currency);
    window.open(link, '_blank', 'noopener,noreferrer');
    toast({
      title: lang === 'es' ? '¡Confirmado!' : 'Confirmed!',
      description: lang === 'es' ? '¡Plan seleccionado! Te contactaremos pronto.' : 'Plan selected! We\'ll contact you soon.',
    });
  };

  const formatPrice = (usd: number, cop: number, isMonthly = false) => {
    const val = currency === 'cop'
      ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(cop)
      : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd);
    return val;
  };

  const t = lang === 'es' ? {
    title: 'Diseño Web & Webapps',
    sub: 'Sitios web y webapps profesionales construidos en Lovable + Supabase. Entrega en 1 semana. Código 100% tuyo en GitHub.',
    whatIncludes: '¿Qué incluye nuestro servicio?',
    pricingTitle: 'Planes de Diseño Web',
    pricingNote: 'Todos los planes incluyen dominio de tu elección. El precio de construcción es un pago único.',
    noInclude: 'No incluye:',
    monthly: '/mes',
    oneTime: 'construcción',
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
        name: 'Plan Económico',
        tagline: 'Ideal para emprendedores y negocios nuevos que necesitan presencia digital profesional rápidamente.',
        buildUSD: 499, buildCOP: 1600000,
        monthlyUSD: 0, monthlyCOP: 0,
        yearlyUSD: 499, yearlyCOP: 1600000,
        billingNote: lang === 'es' ? '+ comisión sobre ventas generadas' : '+ commission on sales generated',
        popular: false,
        includes: [
          'Landing page profesional (Home + secciones)',
          'Diseño de marca aplicado (colores, fuentes, logo)',
          'Botón de WhatsApp siempre visible',
          'Formulario de contacto con notificación',
          'SEO básico: meta tags, H1-H4, URLs amigables',
          'Responsive mobile-first',
          'Hosting incluido via Lovable o Vercel',
          'Entrega en 1 semana',
        ],
        excludes: ['Tienda virtual / carrito de compras', 'Panel de administración', 'Bot de IA', 'Blog con SEO'],
        cta: lang === 'es' ? 'Empezar proyecto' : 'Start project',
      },
      {
        key: 'webPro' as const,
        icon: Rocket,
        name: 'Plan Pro',
        tagline: 'Para negocios en crecimiento que necesitan más páginas, blog, panel de administración y funcionalidades avanzadas.',
        buildUSD: 749, buildCOP: 2500000,
        monthlyUSD: 59, monthlyCOP: 200000,
        yearlyUSD: 749, yearlyCOP: 2500000,
        billingNote: lang === 'es' ? '+ $59 USD / $200.000 COP por mes' : '+ $59 USD / $200,000 COP/month',
        popular: true,
        includes: [
          'Todo el Plan Económico +',
          'Hasta 8 páginas (Servicios, Nosotros, Blog, Contacto...)',
          'Bot de IA básico (responde preguntas frecuentes)',
          'Blog con SEO y meta tags dinámicos',
          'Formularios avanzados (cotizaciones, registros)',
          'Panel de administración de contenido',
          'Integración Supabase (base de datos para leads)',
          'Soporte mensual: hasta 4 horas de ajustes',
        ],
        excludes: ['Tienda virtual / pasarela de pagos', 'Generador de fichas con IA', 'Carga masiva de productos'],
        cta: lang === 'es' ? 'Elegir Plan Pro' : 'Choose Pro Plan',
      },
      {
        key: 'webEcommerce' as const,
        icon: ShoppingCart,
        name: 'Ecommerce Full',
        tagline: 'Tienda virtual completa con carrito, pagos, bot de IA vendedor y panel de administración para gestionar todo.',
        buildUSD: 990, buildCOP: 3120000,
        monthlyUSD: 119, monthlyCOP: 400000,
        yearlyUSD: 990, yearlyCOP: 3120000,
        billingNote: lang === 'es' ? '+ $119 USD / $400.000 COP por mes' : '+ $119 USD / $400,000 COP/month',
        popular: false,
        includes: [
          'Todo el Plan Pro +',
          'Tienda virtual completa (catálogo, carrito, checkout)',
          'Pasarela de pagos (Wompi / Stripe / MercadoPago)',
          'Bot de IA avanzado (asesor de ventas con cotizaciones)',
          'Generador de fichas de producto con IA',
          'Panel admin completo (productos, pedidos, clientes)',
          'SEO avanzado: Schema.org, sitemap dinámico',
          'Soporte mensual: hasta 8 horas de ajustes',
        ],
        excludes: ['Presupuesto de pauta publicitaria', 'Producción de video', 'Gestión de contenido orgánico'],
        cta: lang === 'es' ? 'Quiero mi tienda' : 'I want my store',
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
    title: 'Desenvolvimento Web & Webapps',
    sub: 'Sites e webapps profissionais construídos em Lovable + Supabase. Entrega em 1 semana. Código 100% seu no GitHub.',
    whatIncludes: 'O que nosso serviço inclui?',
    pricingTitle: 'Planos de Desenvolvimento Web',
    pricingNote: 'Todos os planos incluem domínio de sua escolha. O preço de construção é um pagamento único.',
    noInclude: 'Não inclui:', monthly: '/mês', oneTime: 'construção',
    features: [
      { icon: Zap, title: 'Entrega em 1 semana', desc: 'O que no WordPress leva 6 semanas, entregamos em 7 dias com nosso processo otimizado.' },
      { icon: Shield, title: 'Código 100% seu', desc: 'Todo o código fica no seu GitHub. Você não depende de nós para o futuro.' },
      { icon: BarChart3, title: 'SEO desde a estrutura', desc: 'Meta tags, Schema.org, URLs amigáveis e velocidade de carga otimizada desde o início.' },
      { icon: Smartphone, title: 'Mobile-first sempre', desc: 'Todas as webapps são otimizadas primeiro para mobile, tablet e desktop.' },
    ],
    plans: [
      { key: 'webEconomico' as const, icon: Globe, name: 'Plano Econômico', tagline: 'Ideal para empreendedores e novos negócios que precisam de presença digital profissional rapidamente.', buildUSD: 499, buildCOP: 1600000, monthlyUSD: 0, monthlyCOP: 0, yearlyUSD: 499, yearlyCOP: 1600000, billingNote: '+ comissão sobre vendas geradas', popular: false, includes: ['Landing page profissional (Home + seções)', 'Design de marca aplicado (cores, fontes, logo)', 'Botão de WhatsApp sempre visível', 'Formulário de contato com notificação', 'SEO básico: meta tags, H1-H4, URLs amigáveis', 'Responsivo mobile-first', 'Hospedagem incluída via Lovable ou Vercel', 'Entrega em 1 semana'], excludes: ['Loja virtual / carrinho de compras', 'Painel de administração', 'Bot de IA', 'Blog com SEO'], cta: 'Iniciar projeto' },
      { key: 'webPro' as const, icon: Rocket, name: 'Plano Pro', tagline: 'Para negócios em crescimento que precisam de mais páginas, blog, painel admin e funcionalidades avançadas.', buildUSD: 749, buildCOP: 2500000, monthlyUSD: 59, monthlyCOP: 200000, yearlyUSD: 749, yearlyCOP: 2500000, billingNote: '+ $59 USD / $200.000 COP por mês', popular: true, includes: ['Tudo do Plano Econômico +', 'Até 8 páginas (Serviços, Sobre, Blog, Contato...)', 'Bot de IA básico (responde perguntas frequentes)', 'Blog com SEO e meta tags dinâmicos', 'Formulários avançados (cotações, registros)', 'Painel de administração de conteúdo', 'Integração Supabase (banco de dados para leads)', 'Suporte mensal: até 4 horas de ajustes'], excludes: ['Loja virtual / gateway de pagamento', 'Gerador de fichas com IA', 'Upload massivo de produtos'], cta: 'Escolher Plano Pro' },
      { key: 'webEcommerce' as const, icon: ShoppingCart, name: 'Ecommerce Full', tagline: 'Loja virtual completa com carrinho, pagamentos, bot de IA vendedor e painel admin para gerenciar tudo.', buildUSD: 990, buildCOP: 3120000, monthlyUSD: 119, monthlyCOP: 400000, yearlyUSD: 990, yearlyCOP: 3120000, billingNote: '+ $119 USD / $400.000 COP por mês', popular: false, includes: ['Tudo do Plano Pro +', 'Loja virtual completa (catálogo, carrinho, checkout)', 'Gateway de pagamento (Wompi / Stripe / MercadoPago)', 'Bot de IA avançado (consultor de vendas com cotações)', 'Gerador de fichas de produto com IA', 'Painel admin completo (produtos, pedidos, clientes)', 'SEO avançado: Schema.org, sitemap dinâmico', 'Suporte mensal: até 8 horas de ajustes'], excludes: ['Orçamento de anúncios pagos', 'Produção de vídeo', 'Gestão de conteúdo orgânico'], cta: 'Quero minha loja' },
    ],
    process: 'Como entregamos em 1 semana',
    steps: [
      { n: '01', title: 'Kickoff e marca', desc: 'Reunião inicial, coletamos logo, cores e conteúdo.' },
      { n: '02', title: 'Estrutura base', desc: 'Construímos Header, Footer, Home e rotas principais.' },
      { n: '03', title: 'Páginas e funções', desc: 'Desenvolvemos cada página com suas funcionalidades.' },
      { n: '04', title: 'Entrega e domínio', desc: 'Revisão final, conexão do domínio e capacitação básica.' },
    ],
  } : {
    sub: 'Professional websites and webapps built on Lovable + Supabase. 1-week delivery. 100% your code on GitHub.',
    whatIncludes: 'What does our service include?',
    pricingTitle: 'Web Design Plans',
    pricingNote: 'All plans include your domain of choice. The build price is a one-time payment.',
    noInclude: 'Does not include:',
    monthly: '/mo',
    oneTime: 'build',
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
        name: 'Starter Plan',
        tagline: 'Ideal for entrepreneurs and new businesses that need professional digital presence quickly.',
        buildUSD: 499, buildCOP: 1600000,
        monthlyUSD: 0, monthlyCOP: 0,
        yearlyUSD: 499, yearlyCOP: 1600000,
        billingNote: '+ commission on generated sales',
        popular: false,
        includes: [
          'Professional landing page (Home + sections)',
          'Brand design applied (colors, fonts, logo)',
          'Always-visible WhatsApp button',
          'Contact form with notification',
          'Basic SEO: meta tags, H1-H4, friendly URLs',
          'Responsive mobile-first',
          'Hosting included via Lovable or Vercel',
          '1-week delivery',
        ],
        excludes: ['Online store / shopping cart', 'Admin panel', 'AI bot', 'SEO blog'],
        cta: 'Start project',
      },
      {
        key: 'webPro' as const,
        icon: Rocket,
        name: 'Pro Plan',
        tagline: 'For growing businesses that need more pages, a blog, admin panel and advanced features.',
        buildUSD: 749, buildCOP: 2500000,
        monthlyUSD: 59, monthlyCOP: 200000,
        yearlyUSD: 749, yearlyCOP: 2500000,
        billingNote: '+ $59 USD / $200,000 COP/month',
        popular: true,
        includes: [
          'Everything in Starter +',
          'Up to 8 pages (Services, About, Blog, Contact...)',
          'Basic AI bot (answers FAQs)',
          'Blog with SEO and dynamic meta tags',
          'Advanced forms (quotes, registrations)',
          'Content admin panel',
          'Supabase integration (lead database)',
          'Monthly support: up to 4 hours of adjustments',
        ],
        excludes: ['Online store / payment gateway', 'AI product sheet generator', 'Bulk product upload'],
        cta: 'Choose Pro Plan',
      },
      {
        key: 'webEcommerce' as const,
        icon: ShoppingCart,
        name: 'Full Ecommerce',
        tagline: 'Complete online store with cart, payments, AI sales bot and admin panel to manage everything.',
        buildUSD: 990, buildCOP: 3120000,
        monthlyUSD: 119, monthlyCOP: 400000,
        yearlyUSD: 990, yearlyCOP: 3120000,
        billingNote: '+ $119 USD / $400,000 COP/month',
        popular: false,
        includes: [
          'Everything in Pro +',
          'Complete online store (catalog, cart, checkout)',
          'Payment gateway (Wompi / Stripe / MercadoPago)',
          'Advanced AI bot (sales advisor with quotes)',
          'AI product sheet generator',
          'Full admin panel (products, orders, customers)',
          'Advanced SEO: Schema.org, dynamic sitemap',
          'Monthly support: up to 8 hours of adjustments',
        ],
        excludes: ['Ad spend budget', 'Video production', 'Organic content management'],
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
      <main className="pt-20">

        {/* Hero */}
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">{t.sub}</p>
            <a href="https://wa.me/17865787671?text=Hola%20Ferova%2C%20quiero%20información%20sobre%20diseño%20web" target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {lang === 'es' ? 'Solicitar propuesta' : 'Request proposal'}
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
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">{t.pricingTitle}</h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">{t.pricingNote}</p>

            {/* Currency toggle */}
            <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-border w-fit mx-auto mb-14">
              <button onClick={() => setCurrency('usd')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>USD</button>
              <button onClick={() => setCurrency('cop')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>COP</button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {t.plans.map((plan, i) => {
                const IconComp = plan.icon;
                return (
                  <div key={i} className={`glass-card p-8 relative flex flex-col transition-all duration-300 ${plan.popular ? 'border-gold/50 gold-glow' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-gold text-primary-foreground whitespace-nowrap">
                        {lang === 'es' ? 'Más elegido' : 'Most popular'}
                      </div>
                    )}

                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                      <IconComp className="w-7 h-7 text-gold" />
                    </div>

                    <h3 className="text-xl font-display font-bold mb-3">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.tagline}</p>

                    {/* Price */}
                    <div className="mb-2">
                      <span className="text-3xl font-display font-bold">
                        {currency === 'cop'
                          ? new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(plan.buildCOP)
                          : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(plan.buildUSD)}
                      </span>
                      <span className="text-muted-foreground text-sm ml-1">{t.oneTime}</span>
                    </div>
                    {plan.monthlyUSD > 0 && (
                      <p className="text-gold text-sm font-semibold mb-6">{plan.billingNote}</p>
                    )}
                    {plan.monthlyUSD === 0 && (
                      <p className="text-muted-foreground text-xs mb-6">{plan.billingNote}</p>
                    )}

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
              {lang === 'es' ? '¿Listo para tu nueva web?' : 'Ready for your new website?'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              {lang === 'es'
                ? 'Cuéntanos tu proyecto y te respondemos con una propuesta en menos de 24 horas.'
                : 'Tell us about your project and we\'ll respond with a proposal in less than 24 hours.'}
            </p>
            <a href="https://wa.me/17865787671?text=Hola%20Ferova%2C%20quiero%20una%20propuesta%20de%20diseño%20web" target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {lang === 'es' ? 'Solicitar propuesta gratis' : 'Request free proposal'}
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
