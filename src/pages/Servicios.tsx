import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import ProposalModal from '@/components/ui/proposal-modal';
import { Helmet } from 'react-helmet-async';
import { StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { Search, Monitor, Target, ArrowRight, CheckCircle, Palette, Tag, GraduationCap, MessageCircle, Linkedin, Bot } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface ServiciosProps { lang?: 'es' | 'en' | 'pt'; }

type Service = {
  icon: typeof Search;
  title: string;
  description: string;
  features: string[];
  href: string;
  highlight?: boolean;
};

const Servicios = ({ lang = 'es' }: ServiciosProps) => {
  const [proposalOpen, setProposalOpen] = useState(false);
  const [proposalService, setProposalService] = useState('');

  const main: Service[] = lang === 'es' ? [
    { icon: Search, title: 'SEO + GEO + IAO para E-commerce', description: 'Posicionamiento orgánico + Geo-localización + Answer Engine Optimization. Para vender en Google, Maps y motores de IA.', features: ['Auditoría técnica SEO', 'Keyword + intención IA', 'GEO local LATAM', 'Schema y AIO', 'Content marketing', 'Reporte mensual'], href: '/servicios/seo-ecommerce', highlight: true },
    { icon: Monitor, title: 'Diseño de Web Apps y E-commerce', description: 'Web Apps de alto rendimiento. Más rápidas, más seguras y con mejor SEO que las plataformas tradicionales.', features: ['Diseño UI/UX', 'Responsive y mobile-first', 'Core Web Vitals óptimos', 'Integración pagos', 'Catálogo y carrito', 'Mantenimiento'], href: '/servicios/diseno-web' },
    { icon: Target, title: 'Pauta Digital', description: 'Campañas en Google, Meta, TikTok y LinkedIn que generan ventas reales — no solo clicks.', features: ['Google Ads & Shopping', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads', 'Remarketing', 'Reporte en tiempo real'], href: '/servicios/pauta-digital' },
    { icon: Bot, title: 'WhatsApp IA Bot', description: 'Vendedor con IA en WhatsApp que responde 24/7, califica leads y agenda ventas mientras descansas.', features: ['API oficial WhatsApp', 'IA en tu tono', 'Calificación de leads', 'Agenda automática', 'Reportes mensuales', 'Soporte continuo'], href: '/servicios/whatsapp-ia-bot', highlight: true },
  ] : lang === 'pt' ? [
    { icon: Search, title: 'SEO + GEO + IAO para E-commerce', description: 'Posicionamento orgânico + Geo-localização + Answer Engine Optimization. Para vender no Google, Maps e motores de IA.', features: ['Auditoria técnica SEO', 'Palavra-chave + intenção IA', 'GEO local LATAM', 'Schema e AIO', 'Marketing de conteúdo', 'Relatório mensal'], href: '/pt/seo-ecommerce', highlight: true },
    { icon: Monitor, title: 'Design de Web Apps e Loja Virtual', description: 'Web Apps de alto desempenho. Mais rápidas, mais seguras e com melhor SEO que as plataformas tradicionais.', features: ['Design UI/UX', 'Responsivo mobile-first', 'Core Web Vitals ótimos', 'Integração de pagamentos', 'Catálogo e carrinho', 'Manutenção'], href: '/pt/design-web' },
    { icon: Target, title: 'Tráfego Pago', description: 'Campanhas no Google, Meta, TikTok e LinkedIn que geram vendas reais — não só cliques.', features: ['Google Ads & Shopping', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads', 'Remarketing', 'Relatório em tempo real'], href: '/pt/anuncios-digitais' },
    { icon: Bot, title: 'WhatsApp IA Bot', description: 'Vendedor com IA no WhatsApp que responde 24/7, qualifica leads e agenda vendas enquanto você descansa.', features: ['API oficial WhatsApp', 'IA no seu tom', 'Qualificação de leads', 'Agenda automática', 'Relatórios mensais', 'Suporte contínuo'], href: '/pt/whatsapp-ia-bot', highlight: true },
  ] : [
    { icon: Search, title: 'SEO + GEO + AEO for E-commerce', description: 'Organic positioning + Geo-targeting + Answer Engine Optimization. Sell on Google, Maps and AI engines.', features: ['Technical SEO audit', 'Keyword + AI intent', 'Local GEO LATAM', 'Schema and AEO', 'Content marketing', 'Monthly report'], href: '/en/services/ecommerce-seo', highlight: true },
    { icon: Monitor, title: 'Web App & E-commerce Design', description: 'High-performance Web Apps. Faster, more secure and better SEO than traditional platforms.', features: ['UI/UX design', 'Responsive mobile-first', 'Optimal Core Web Vitals', 'Payment integration', 'Catalog and cart', 'Maintenance'], href: '/en/services/web-design' },
    { icon: Target, title: 'Digital Ads', description: 'Google, Meta, TikTok and LinkedIn campaigns that drive real sales — not just clicks.', features: ['Google Ads & Shopping', 'Meta Ads', 'TikTok Ads', 'LinkedIn Ads', 'Remarketing', 'Real-time report'], href: '/en/services/digital-ads' },
    { icon: Bot, title: 'WhatsApp AI Bot', description: 'AI salesperson on WhatsApp that replies 24/7, qualifies leads and books sales while you rest.', features: ['Official WhatsApp API', 'AI in your tone', 'Lead qualification', 'Auto booking', 'Monthly reports', 'Continuous support'], href: '/en/services/whatsapp-ai-bot', highlight: true },
  ];

  const tools: Service[] = lang === 'es' ? [
    { icon: Linkedin, title: 'Optimización de LinkedIn', description: 'Perfil que atrae oportunidades y clientes B2B.', features: ['Auditoría', 'Headline + About', 'SEO de keywords', 'Banner', 'Estrategia de contenido'], href: '/servicios/optimizacion-linkedin' },
    { icon: Palette, title: 'Diseño de Logos', description: 'Identidad visual profesional para tu marca.', features: ['Propuestas', 'Manual de marca', 'Archivos editables', 'Paleta', 'Tipografías'], href: '/servicios/diseno-logos' },
    { icon: Tag, title: 'Descuentos en Herramientas', description: 'SEMrush, Ahrefs, Canva Pro y más, a precio exclusivo.', features: ['SEMrush', 'Ahrefs', 'Surfer SEO', 'Envato', 'Canva Pro'], href: '/servicios/descuentos-herramientas' },
    { icon: GraduationCap, title: 'Asesorías de Marketing', description: 'Consultoría estratégica 1-a-1 para escalar tu negocio.', features: ['Diagnóstico', 'Estrategia', 'Plan de acción', 'Sesiones 1-a-1', 'Seguimiento'], href: '/servicios/asesorias-marketing' },
  ] : lang === 'pt' ? [
    { icon: Linkedin, title: 'Otimização de LinkedIn', description: 'Perfil que atrai oportunidades e clientes B2B.', features: ['Auditoria', 'Headline + Sobre', 'SEO de palavras-chave', 'Banner', 'Estratégia de conteúdo'], href: '/pt/linkedin' },
    { icon: Palette, title: 'Design de Logos', description: 'Identidade visual profissional para sua marca.', features: ['Propostas', 'Manual de marca', 'Arquivos editáveis', 'Paleta', 'Tipografias'], href: '/pt/design-logos' },
    { icon: Tag, title: 'Descontos em Ferramentas', description: 'SEMrush, Ahrefs, Canva Pro e mais, a preço exclusivo.', features: ['SEMrush', 'Ahrefs', 'Surfer SEO', 'Envato', 'Canva Pro'], href: '/pt/ferramentas' },
    { icon: GraduationCap, title: 'Consultorias de Marketing', description: 'Consultoria estratégica 1-a-1 para escalar seu negócio.', features: ['Diagnóstico', 'Estratégia', 'Plano de ação', 'Sessões 1-a-1', 'Acompanhamento'], href: '/pt/consultorias' },
  ] : [
    { icon: Linkedin, title: 'LinkedIn Optimization', description: 'Profile that attracts B2B opportunities and clients.', features: ['Audit', 'Headline + About', 'Keyword SEO', 'Banner', 'Content strategy'], href: '/en/services/linkedin-optimization' },
    { icon: Palette, title: 'Logo Design', description: 'Professional visual identity for your brand.', features: ['Proposals', 'Brand manual', 'Editable files', 'Palette', 'Typography'], href: '/en/services/logo-design' },
    { icon: Tag, title: 'Tool Discounts', description: 'SEMrush, Ahrefs, Canva Pro and more at exclusive prices.', features: ['SEMrush', 'Ahrefs', 'Surfer SEO', 'Envato', 'Canva Pro'], href: '/en/services/tool-discounts' },
    { icon: GraduationCap, title: 'Marketing Consulting', description: 'Strategic 1-on-1 consulting to scale your business.', features: ['Diagnosis', 'Strategy', 'Action plan', '1-on-1 sessions', 'Follow-up'], href: '/en/services/marketing-consulting' },
  ];

  const waUrl = 'https://wa.link/bfq71f?text=' + encodeURIComponent(
    lang === 'es' ? 'Hola Ferova, quiero agendar una asesoría.'
    : lang === 'pt' ? 'Olá Ferova, quero agendar uma consultoria.'
    : 'Hi Ferova, I would like to book a consultation.'
  );

  const renderCard = (s: Service, source: string) => (
    <div className="h-full">
      <Link
        to={s.href}
        onClick={() => trackEvent('service_card_clicked', { source, service: s.title })}
        className={`glass-card p-7 hover:border-gold/30 transition-all duration-300 group block h-full ${s.highlight ? 'ring-1 ring-gold/40' : ''}`}
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-gold/10">
          <s.icon className="w-6 h-6 text-gold" />
        </div>
        <h3 className="text-lg font-display font-bold mb-2 text-foreground">{s.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5">{s.description}</p>
        <ul className="space-y-1.5 mb-5">
          {s.features.map((f, j) => (
            <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 text-gold flex-shrink-0" /> {f}
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center gap-1 text-gold text-sm font-semibold group-hover:gap-2 transition-all">
          {lang === 'es' ? 'Ver detalles' : lang === 'pt' ? 'Ver detalhes' : 'View details'} <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
      <button
        onClick={() => { setProposalService(s.title); setProposalOpen(true); trackEvent('cta_clicked', { source, label: 'custom_proposal', service: s.title }); }}
        className="mt-3 w-full py-2 rounded-full text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:border-gold/40 transition-all"
      >
        {lang === 'es' ? 'Solicitar propuesta personalizada' : lang === 'pt' ? 'Solicitar proposta personalizada' : 'Request custom proposal'}
      </button>
    </div>
  );

  const seoTitle = lang === 'es' ? 'Servicios de marketing digital y SEO para e-commerce — Ferova Agency'
    : lang === 'pt' ? 'Serviços de marketing digital e SEO para e-commerce — Ferova Agency'
    : 'E-commerce digital marketing and SEO services — Ferova Agency';
  const seoDesc = lang === 'es' ? '4 servicios principales: SEO + GEO + IAO, Web Apps, Pauta Digital y WhatsApp IA Bot. Marketing especializado para tiendas online en LATAM.'
    : lang === 'pt' ? '4 serviços principais: SEO + GEO + IAO, Web Apps, Tráfego Pago e WhatsApp IA Bot. Marketing especializado para lojas virtuais na LATAM.'
    : 'Four main services: SEO + GEO + AEO, Web Apps, Digital Ads and WhatsApp AI Bot. Specialized marketing for online stores in LATAM.';

  return (
    <PageTransition>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <link rel="canonical" href="https://seoparaecommerce.co/servicios" />
      </Helmet>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-16 md:py-20 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {lang === 'es' ? 'Servicios principales' : lang === 'pt' ? 'Serviços principais' : 'Main services'}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {lang === 'es' ? '4 servicios diseñados para hacer crecer tu e-commerce: visibilidad, conversión, tráfico y automatización de ventas.'
                : lang === 'pt' ? '4 serviços para fazer sua loja virtual crescer: visibilidade, conversão, tráfego e automação de vendas.'
                : 'Four services designed to grow your e-commerce: visibility, conversion, traffic and sales automation.'}
            </p>
          </div>
        </section>

        {/* Main 4 services */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <StaggerContainer className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {main.map((s, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>{renderCard(s, 'servicios_main')}</ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Secondary tools */}
        <section className="py-12 md:py-20 border-t border-border/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
                {lang === 'es' ? 'Herramientas y servicios complementarios' : lang === 'pt' ? 'Ferramentas e serviços complementares' : 'Complementary tools and services'}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {lang === 'es' ? 'Refuerza tu marca, autoridad y operación digital.' : lang === 'pt' ? 'Reforce sua marca, autoridade e operação digital.' : 'Strengthen your brand, authority and digital operation.'}
              </p>
            </div>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {tools.map((s, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>{renderCard(s, 'servicios_tools')}</ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">
              {lang === 'es' ? '¿Listo para impulsar tu e-commerce?' : lang === 'pt' ? 'Pronto para impulsionar seu e-commerce?' : 'Ready to boost your e-commerce?'}
            </h2>
            <p className="text-lg max-w-xl mx-auto mb-10 text-muted-foreground">
              {lang === 'es' ? 'Escríbenos y diseñamos la estrategia perfecta para tu negocio.' : lang === 'pt' ? 'Fale conosco e criamos a estratégia perfeita para o seu negócio.' : "Contact us and we'll design the perfect strategy for your business."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waUrl}
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_button_clicked', { source: 'servicios_cta', label: 'book_consultation' })}
                className="btn-gold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                {lang === 'es' ? 'Agendar Asesoría' : lang === 'pt' ? 'Agendar Consultoria' : 'Book Consultation'}
              </a>
              <Link
                to={lang === 'es' ? '/contacto' : lang === 'pt' ? '/pt/contato' : '/en/contact'}
                onClick={() => trackEvent('cta_clicked', { source: 'servicios_cta', label: 'contact_form' })}
                className="btn-outline-gold text-center"
              >
                {lang === 'es' ? 'Formulario de contacto' : lang === 'pt' ? 'Formulário de contato' : 'Contact form'}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
      <ProposalModal open={proposalOpen} onClose={() => setProposalOpen(false)} lang={lang} defaultService={proposalService} />
    </PageTransition>
  );
};

export default Servicios;
