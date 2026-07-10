import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProposalModal from '@/components/ui/proposal-modal';
import SEO from '@/components/SEO';
import { AnswerBlock } from '@/components/ui/answer-block';
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
    { icon: Search, title: 'SEO + GEO + IAO para E-commerce', description: 'Posicionamiento orgánico + Generative Engine Optimization + Answer Engine Optimization. Para vender en Google y ser citado por ChatGPT, Perplexity y Gemini.', features: ['Auditoría técnica SEO', 'Citabilidad en LLMs (GEO)', 'Schema y JSON-LD', 'Keyword + intención IA', 'Content marketing', 'Reporte mensual'], href: '/servicios/seo-ecommerce', highlight: true },
    { icon: Monitor, title: 'Diseño de Web Apps y E-commerce', description: 'Web Apps de alto rendimiento. Más rápidas, más seguras y con mejor SEO que las plataformas tradicionales.', features: ['Diseño UI/UX', 'Responsive y mobile-first', 'Core Web Vitals óptimos', 'Integración pagos', 'Catálogo y carrito', 'Mantenimiento'], href: '/servicios/diseno-web' },
    { icon: GraduationCap, title: 'Capacitación IA in-company', description: 'Tu equipo dominando IA aplicada a operaciones, ventas y estrategia. Programas en vivo de 4 horas.', features: ['Operaciones inteligentes', 'Ingeniería de ventas', 'Estrategia GEO/SEO', 'Hasta 15 personas', 'Workbook personalizado', 'Seguimiento 30 días'], href: '/capacitacion-ia', highlight: true },
  ] : lang === 'pt' ? [
    { icon: Search, title: 'SEO + GEO + IAO para E-commerce', description: 'Posicionamento orgânico + Generative Engine Optimization + Answer Engine Optimization. Para vender no Google e ser citado por ChatGPT, Perplexity e Gemini.', features: ['Auditoria técnica SEO', 'Citabilidade em LLMs (GEO)', 'Schema e JSON-LD', 'Palavra-chave + intenção IA', 'Marketing de conteúdo', 'Relatório mensal'], href: '/pt/seo-ecommerce', highlight: true },
    { icon: Monitor, title: 'Design de Web Apps e Loja Virtual', description: 'Web Apps de alto desempenho. Mais rápidas, mais seguras e com melhor SEO que as plataformas tradicionais.', features: ['Design UI/UX', 'Responsivo mobile-first', 'Core Web Vitals ótimos', 'Integração de pagamentos', 'Catálogo e carrinho', 'Manutenção'], href: '/pt/design-web' },
    { icon: GraduationCap, title: 'Treinamento IA in-company', description: 'Sua equipe dominando IA aplicada a operações, vendas e estratégia. Programas ao vivo de 4 horas.', features: ['Operações inteligentes', 'Engenharia de vendas', 'Estratégia GEO/SEO', 'Até 15 pessoas', 'Workbook personalizado', 'Acompanhamento 30 dias'], href: '/pt/treinamento-ia', highlight: true },
  ] : [
    { icon: Search, title: 'SEO + GEO + AEO for E-commerce', description: 'Organic positioning + Generative Engine Optimization + Answer Engine Optimization. Sell on Google and get cited by ChatGPT, Perplexity and Gemini.', features: ['Technical SEO audit', 'LLM citability (GEO)', 'Schema and JSON-LD', 'Keyword + AI intent', 'Content marketing', 'Monthly report'], href: '/en/services/ecommerce-seo', highlight: true },
    { icon: Monitor, title: 'Web App & E-commerce Design', description: 'High-performance Web Apps. Faster, more secure and better SEO than traditional platforms.', features: ['UI/UX design', 'Responsive mobile-first', 'Optimal Core Web Vitals', 'Payment integration', 'Catalog and cart', 'Maintenance'], href: '/en/services/web-design' },
    { icon: GraduationCap, title: 'In-company AI Training', description: 'Get your team fluent in AI applied to operations, sales and strategy. Live 4-hour programs.', features: ['Smart operations', 'Sales engineering', 'GEO/SEO strategy', 'Up to 15 people', 'Custom workbook', '30-day follow-up'], href: '/en/ai-training', highlight: true },
  ];

  const tools: Service[] = lang === 'es' ? [
    { icon: Linkedin, title: 'Optimización de LinkedIn', description: 'Perfil que atrae oportunidades y clientes B2B.', features: ['Auditoría', 'Headline + About', 'SEO de keywords', 'Banner', 'Estrategia de contenido'], href: '/servicios/optimizacion-linkedin' },
    { icon: MessageCircle, title: 'Contenido LinkedIn', description: '12 posts + 2 carruseles al mes con tu voz de marca.', features: ['Calendario editorial', '12 posts/mes', '2 carruseles', 'Reporte mensual', 'Estrategia B2B'], href: '/servicios/contenido-linkedin' },
    { icon: Tag, title: 'Descuentos en Herramientas', description: 'SEMrush, Ahrefs, Canva Pro y más, a precio exclusivo.', features: ['SEMrush', 'Ahrefs', 'Surfer SEO', 'Envato', 'Canva Pro'], href: '/servicios/descuentos-herramientas' },
    { icon: GraduationCap, title: 'Asesorías de Marketing', description: 'Consultoría estratégica 1-a-1 para escalar tu negocio.', features: ['Diagnóstico', 'Estrategia', 'Plan de acción', 'Sesiones 1-a-1', 'Seguimiento'], href: '/servicios/asesorias-marketing' },
  ] : lang === 'pt' ? [
    { icon: Linkedin, title: 'Otimização de LinkedIn', description: 'Perfil que atrai oportunidades e clientes B2B.', features: ['Auditoria', 'Headline + Sobre', 'SEO de palavras-chave', 'Banner', 'Estratégia de conteúdo'], href: '/pt/linkedin' },
    { icon: MessageCircle, title: 'Conteúdo LinkedIn', description: '12 posts + 2 carrosséis por mês com a voz da sua marca.', features: ['Calendário editorial', '12 posts/mês', '2 carrosséis', 'Relatório mensal', 'Estratégia B2B'], href: '/pt/conteudo-linkedin' },
    { icon: Tag, title: 'Descontos em Ferramentas', description: 'SEMrush, Ahrefs, Canva Pro e mais, a preço exclusivo.', features: ['SEMrush', 'Ahrefs', 'Surfer SEO', 'Envato', 'Canva Pro'], href: '/pt/ferramentas' },
    { icon: GraduationCap, title: 'Consultorias de Marketing', description: 'Consultoria estratégica 1-a-1 para escalar seu negócio.', features: ['Diagnóstico', 'Estratégia', 'Plano de ação', 'Sessões 1-a-1', 'Acompanhamento'], href: '/pt/consultorias' },
  ] : [
    { icon: Linkedin, title: 'LinkedIn Optimization', description: 'Profile that attracts B2B opportunities and clients.', features: ['Audit', 'Headline + About', 'Keyword SEO', 'Banner', 'Content strategy'], href: '/en/services/linkedin-optimization' },
    { icon: MessageCircle, title: 'LinkedIn Content', description: '12 posts + 2 carousels per month in your brand voice.', features: ['Editorial calendar', '12 posts/mo', '2 carousels', 'Monthly report', 'B2B strategy'], href: '/en/services/linkedin-content' },
    { icon: Tag, title: 'Tool Discounts', description: 'SEMrush, Ahrefs, Canva Pro and more at exclusive prices.', features: ['SEMrush', 'Ahrefs', 'Surfer SEO', 'Envato', 'Canva Pro'], href: '/en/services/tool-discounts' },
    { icon: GraduationCap, title: 'Marketing Consulting', description: 'Strategic 1-on-1 consulting to scale your business.', features: ['Diagnosis', 'Strategy', 'Action plan', '1-on-1 sessions', 'Follow-up'], href: '/en/services/marketing-consulting' },
  ];

  const waUrl = 'https://wa.link/jvbd4j?text=' + encodeURIComponent(
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

  const seoTitle = lang === 'es' ? 'Servicios SEO y marketing digital e-commerce — Ferova'
    : lang === 'pt' ? 'Serviços SEO e marketing digital e-commerce — Ferova'
    : 'E-commerce SEO & digital marketing services — Ferova';
  const seoDesc = lang === 'es' ? 'Servicios B2B: SEO + GEO + IAO, Web Apps, Capacitación IA y LinkedIn para fundadores que escalan en LATAM.'
    : lang === 'pt' ? 'Serviços B2B: SEO + GEO + IAO, Web Apps, Treinamento em IA e LinkedIn para fundadores que escalam na LATAM.'
    : 'B2B services: SEO + GEO + AEO, Web Apps, AI Training and LinkedIn for founders scaling in LATAM.';

  return (
    <PageTransition>
      <SEO
        title={seoTitle}
        description={seoDesc}
        path={lang === 'en' ? '/en/services' : lang === 'pt' ? '/pt/servicos' : '/servicios'}
        lang={lang}
      />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-16 md:py-20 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              {lang === 'es' ? 'Servicios principales' : lang === 'pt' ? 'Serviços principais' : 'Main services'}
            </h1>
            <div className="max-w-2xl mx-auto text-left text-muted-foreground">
              <AnswerBlock>
                {lang === 'es' ? '4 servicios diseñados para hacer crecer tu e-commerce: visibilidad, conversión, tráfico y automatización de ventas.'
                  : lang === 'pt' ? '4 serviços para fazer sua loja virtual crescer: visibilidade, conversão, tráfego e automação de vendas.'
                  : 'Four services designed to grow your e-commerce: visibility, conversion, traffic and sales automation.'}
              </AnswerBlock>
            </div>
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
      <ProposalModal open={proposalOpen} onClose={() => setProposalOpen(false)} lang={lang} defaultService={proposalService} />
    </PageTransition>
  );
};

export default Servicios;
