import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { Search, TrendingUp, Users, BarChart3, Plus, MessageCircle, MapPin, Globe2, Navigation, Target, Clock, Check } from 'lucide-react';
import { useState } from 'react';
import { getPaymentLink } from '@/lib/payment-links';
import { useToast } from '@/hooks/use-toast';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const SeoEcommerce = ({ lang = 'es' }: Props) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currency, setCurrency] = useState<'usd' | 'cop' | 'brl'>('usd');
  const { toast } = useToast();

  const handleCta = () => {
    const link = getPaymentLink('seoGeoLocal', currency);
    window.open(link, '_blank', 'noopener,noreferrer');
    toast({
      title: lang === 'es' ? '¡Confirmado!' : 'Confirmed!',
      description: lang === 'es'
        ? '¡Plan confirmado! En Ferova Agency estamos listos para empezar.'
        : 'Plan confirmed! At Ferova Agency we are ready to start.',
    });
  };

  const formatPrice = (usd: number, cop: number, brl: number) => {
    if (currency === 'cop') return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(cop);
    if (currency === 'brl') return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(brl);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usd);
  };

  const t = lang === 'es' ? {
    title: 'SEO que las IAs citan — no solo Google lo indexa',
    sub: 'Optimizamos tu WebApp para que aparezca en Google, ChatGPT, Perplexity y Google AI Overviews. Blogs mensuales con estructura semántica que las IAs generativas leen y citan.',
    cta: 'Solicitar diagnóstico',
    ctaSecondary: 'Ver casos de éxito',
    whatIncludes: '¿Qué incluye nuestro servicio?',
    process: 'Nuestro proceso',
    faqTitle: 'Preguntas frecuentes',
    geoTitle: 'GEO: Optimización Geográfica',
    geoTagline: 'No solo te posicionamos en buscadores, te ponemos en el mapa del mundo real.',
    geoDesc: 'Ferova Agency no solo hace SEO tradicional. Implementamos GEO (Geographical Optimization), la optimización para motores de respuesta y búsquedas geolocalizadas, asegurando que tu negocio aparezca en mapas y consultas de intención local inmediata.',
    geoFeatures: [
      { icon: MapPin, title: 'Google Business Profile', desc: 'Optimización completa de tu perfil para aparecer en el Map Pack y búsquedas "cerca de mí".' },
      { icon: Globe2, title: 'Motores de respuesta', desc: 'Posicionamiento en asistentes de voz, snippets destacados y motores de IA conversacional.' },
      { icon: Navigation, title: 'Búsquedas geolocalizadas', desc: 'Estrategia de keywords con intención local para captar tráfico de alta conversión.' },
      { icon: Target, title: 'Intención local inmediata', desc: 'Captamos usuarios que buscan soluciones ahora mismo en tu zona geográfica.' },
    ],
    planTitle: 'Plan SEO & GEO Local',
    planTagline: 'Si no estás en el mapa, no existes. Ferova Agency convierte tu perfil de Google en una máquina de atraer clientes.',
    planCta: 'Iniciar Optimización',
    planIncludes: [
      'Optimización de Google Business Profile',
      'Estrategia de 5 keywords locales',
      'Auditoría de visibilidad local',
    ],
    planExcludes: ['Pauta publicitaria (Ads)', 'Creación de contenido para redes', 'Diseño web'],
    noInclude: 'No incluye:',
    urgency: 'Solo 3 cupos disponibles por mes para garantizar resultados.',
    monthly: '/mes',
    features: [
      { icon: Search, title: 'Auditoría técnica completa', desc: 'Análisis profundo de crawlabilidad, indexación, Core Web Vitals y arquitectura del sitio.' },
      { icon: TrendingUp, title: 'Keyword research estratégico', desc: 'Investigación exhaustiva de palabras clave con potencial comercial.' },
      { icon: Users, title: 'Optimización on-page', desc: 'Optimización de títulos, meta descriptions, URLs y estructura interna.' },
      { icon: BarChart3, title: 'Link building especializado', desc: 'Estrategia de construcción de enlaces de calidad específica para e-commerce.' },
    ],
    steps: [
      { n: '01', title: 'Diagnóstico inicial', desc: 'Auditoría completa y definición de objetivos SMART.' },
      { n: '02', title: 'Estrategia personalizada', desc: 'Roadmap SEO específico basado en hallazgos y objetivos.' },
      { n: '03', title: 'Implementación', desc: 'Optimizaciones técnicas, contenido y link building.' },
      { n: '04', title: 'Monitoreo y ajustes', desc: 'Seguimiento continuo y optimización basada en datos.' },
    ],
    faqs: [
      { q: '¿Cuánto tiempo toma ver resultados en SEO?', a: 'Los primeros resultados visibles suelen aparecer entre 3-6 meses. Los resultados significativos se consolidan entre 6-12 meses.' },
      { q: '¿Qué diferencia el SEO para e-commerce del SEO tradicional?', a: 'Requiere estrategias específicas como optimización de fichas de producto, gestión de contenido duplicado, SEO para filtros y facetas.' },
      { q: '¿Qué es GEO y en qué se diferencia del SEO?', a: 'GEO (Geographical Optimization) se enfoca en posicionar tu negocio en búsquedas geolocalizadas, mapas y motores de respuesta con intención local inmediata.' },
      { q: '¿Cómo miden el ROI del SEO?', a: 'Medimos tráfico orgánico, posiciones de keywords, conversiones orgánicas, revenue orgánico y reducción del CAC.' },
    ],
  } : lang === 'pt' ? {
    title: 'SEO que as IAs citam — não só o Google indexa',
    sub: 'Otimizamos sua WebApp para aparecer no Google, ChatGPT, Perplexity e Google AI Overviews. Blogs mensais com estrutura semântica que as IAs generativas leem e citam.',
    cta: 'Solicitar diagnóstico',
    ctaSecondary: 'Ver casos de sucesso',
    whatIncludes: 'O que nosso serviço inclui?',
    process: 'Nosso processo',
    faqTitle: 'Perguntas frequentes',
    geoTitle: 'GEO: Otimização Geográfica',
    geoTagline: 'Não apenas te posicionamos em buscadores, te colocamos no mapa do mundo real.',
    geoDesc: 'A Ferova Agency não faz apenas SEO tradicional. Implementamos GEO (Geographical Optimization), a otimização para motores de resposta e buscas geolocalizadas, garantindo que seu negócio apareça em mapas e consultas de intenção local imediata.',
    geoFeatures: [
      { icon: MapPin, title: 'Google Business Profile', desc: 'Otimização completa do seu perfil para aparecer no Map Pack e buscas "perto de mim".' },
      { icon: Globe2, title: 'Motores de resposta', desc: 'Posicionamento em assistentes de voz, snippets destacados e motores de IA conversacional.' },
      { icon: Navigation, title: 'Buscas geolocalizadas', desc: 'Estratégia de palavras-chave com intenção local para captar tráfego de alta conversão.' },
      { icon: Target, title: 'Intenção local imediata', desc: 'Captamos usuários que buscam soluções agora mesmo na sua região geográfica.' },
    ],
    planTitle: 'Plano SEO & GEO Local',
    planTagline: 'Se você não está no mapa, você não existe. A Ferova Agency transforma seu perfil do Google em uma máquina de atrair clientes.',
    planCta: 'Iniciar Otimização',
    planIncludes: [
      'Otimização do Google Business Profile',
      'Estratégia de 5 palavras-chave locais',
      'Auditoria de visibilidade local',
    ],
    planExcludes: ['Anúncios pagos (Ads)', 'Criação de conteúdo para redes', 'Desenvolvimento web'],
    noInclude: 'Não inclui:',
    urgency: 'Apenas 3 vagas disponíveis por mês para garantir resultados.',
    monthly: '/mês',
    features: [
      { icon: Search, title: 'Auditoria técnica completa', desc: 'Análise profunda de rastreabilidade, indexação, Core Web Vitals e arquitetura do site.' },
      { icon: TrendingUp, title: 'Pesquisa estratégica de palavras-chave', desc: 'Pesquisa exaustiva de palavras-chave com potencial comercial.' },
      { icon: Users, title: 'Otimização on-page', desc: 'Otimização de títulos, meta descriptions, URLs e estrutura interna.' },
      { icon: BarChart3, title: 'Link building especializado', desc: 'Estratégia de construção de links de qualidade específica para e-commerce.' },
    ],
    steps: [
      { n: '01', title: 'Diagnóstico inicial', desc: 'Auditoria completa e definição de objetivos SMART.' },
      { n: '02', title: 'Estratégia personalizada', desc: 'Roadmap SEO específico baseado em descobertas e objetivos.' },
      { n: '03', title: 'Implementação', desc: 'Otimizações técnicas, conteúdo e link building.' },
      { n: '04', title: 'Monitoramento e ajustes', desc: 'Acompanhamento contínuo e otimização baseada em dados.' },
    ],
    faqs: [
      { q: 'Quanto tempo leva para ver resultados em SEO?', a: 'Os primeiros resultados visíveis costumam aparecer entre 3-6 meses. Os resultados significativos se consolidam entre 6-12 meses.' },
      { q: 'O que diferencia o SEO para e-commerce do SEO tradicional?', a: 'Requer estratégias específicas como otimização de fichas de produto, gestão de conteúdo duplicado, SEO para filtros e facetas.' },
      { q: 'O que é GEO e como se diferencia do SEO?', a: 'GEO (Geographical Optimization) se foca em posicionar seu negócio em buscas geolocalizadas, mapas e motores de resposta com intenção local imediata.' },
      { q: 'Como vocês medem o ROI do SEO?', a: 'Medimos tráfego orgânico, posições de palavras-chave, conversões orgânicas, receita orgânica e redução do CAC.' },
    ],
  } : {
    title: 'SEO that AIs cite — not just Google indexing',
    sub: 'We optimize your WebApp to appear on Google, ChatGPT, Perplexity and Google AI Overviews. Monthly blogs with semantic structure that generative AIs read and cite.',
    cta: 'Request diagnosis',
    ctaSecondary: 'View case studies',
    whatIncludes: 'What does our service include?',
    process: 'Our process',
    faqTitle: 'Frequently asked questions',
    geoTitle: 'GEO: Geographical Optimization',
    geoTagline: 'We don\'t just rank you on search engines, we put you on the real-world map.',
    geoDesc: 'Ferova Agency goes beyond traditional SEO. We implement GEO (Geographical Optimization) — optimization for answer engines and geolocated searches, ensuring your business appears on maps and immediate local intent queries.',
    geoFeatures: [
      { icon: MapPin, title: 'Google Business Profile', desc: 'Complete optimization to appear in the Map Pack and "near me" searches.' },
      { icon: Globe2, title: 'Answer engines', desc: 'Positioning in voice assistants, featured snippets and conversational AI engines.' },
      { icon: Navigation, title: 'Geolocated searches', desc: 'Local intent keyword strategy to capture high-conversion traffic.' },
      { icon: Target, title: 'Immediate local intent', desc: 'We capture users searching for solutions right now in your geographic area.' },
    ],
    planTitle: 'SEO & GEO Local Plan',
    planTagline: 'If you\'re not on the map, you don\'t exist. Ferova Agency turns your Google profile into a client-attracting machine.',
    planCta: 'Start Optimization',
    planIncludes: [
      'Google Business Profile optimization',
      '5 local keyword strategy',
      'Local visibility audit',
    ],
    planExcludes: ['Ad spend (Ads)', 'Social media content', 'Web design'],
    noInclude: 'Does not include:',
    urgency: 'Only 3 spots available per month to guarantee results.',
    monthly: '/mo',
    features: [
      { icon: Search, title: 'Complete technical audit', desc: 'Deep analysis of crawlability, indexation, Core Web Vitals and site architecture.' },
      { icon: TrendingUp, title: 'Strategic keyword research', desc: 'Comprehensive keyword research with commercial potential.' },
      { icon: Users, title: 'On-page optimization', desc: 'Optimization of titles, meta descriptions, URLs and internal structure.' },
      { icon: BarChart3, title: 'Specialized link building', desc: 'Quality link building strategy specific to e-commerce.' },
    ],
    steps: [
      { n: '01', title: 'Initial diagnosis', desc: 'Complete audit and SMART objectives definition.' },
      { n: '02', title: 'Personalized strategy', desc: 'Specific SEO roadmap based on findings and objectives.' },
      { n: '03', title: 'Implementation', desc: 'Technical optimizations, content and link building.' },
      { n: '04', title: 'Monitoring and adjustments', desc: 'Continuous tracking and data-based optimization.' },
    ],
    faqs: [
      { q: 'How long does it take to see SEO results?', a: 'First visible results usually appear between 3-6 months. Significant results consolidate between 6-12 months.' },
      { q: 'What differentiates e-commerce SEO?', a: 'It requires specific strategies such as product page optimization, duplicate content management, SEO for filters and facets.' },
      { q: 'What is GEO and how does it differ from SEO?', a: 'GEO (Geographical Optimization) focuses on positioning your business in geolocated searches, maps and answer engines with immediate local intent.' },
      { q: 'How do you measure SEO ROI?', a: 'We measure organic traffic, keyword positions, organic conversions, organic revenue and CAC reduction.' },
    ],
  };

  return (
    <>
      <Header currentLang={lang} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": "https://seoparaecommerce.co/servicios/seo-ecommerce#service",
        "name": "SEO para E-commerce y AIO",
        "provider": { "@type": "Organization", "@id": "https://seoparaecommerce.co/#organization", "name": "Ferova Agency" },
        "description": "Optimizamos webapps para Google, ChatGPT, Perplexity y AI Overviews. Blogs con estructura semántica que las IAs generativas leen y citan.",
        "areaServed": ["Colombia", "Latinoamérica", "Estados Unidos"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Planes SEO",
          "itemListElement": [
            { "@type": "Offer", "name": "SEO WebApps", "price": "600000", "priceCurrency": "COP", "unitText": "MONTH", "description": "Posicionamiento orgánico completo para WebApps" },
            { "@type": "Offer", "name": "SEO Sitios Tradicionales", "price": "800000", "priceCurrency": "COP", "unitText": "MONTH", "description": "SEO profesional para sitios web tradicionales y otros CMS" },
            { "@type": "Offer", "name": "SEO & GEO Local", "price": "600000", "priceCurrency": "COP", "unitText": "MONTH", "description": "Optimización geográfica para Google Maps y búsquedas locales" }
          ]
        }
      }) }} />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t.sub}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> {t.cta}
                  </a>
                  <Link to={lang === 'es' ? '/casos-de-exito' : lang === 'pt' ? '/pt/casos-de-sucesso' : '/en/case-studies'} className="btn-outline-gold text-center">{t.ctaSecondary}</Link>
                </div>
              </div>
              <div className="glass-card p-8 text-center gold-glow">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, hsl(45 86% 40%), hsl(45 86% 52%))' }}>
                  <Search className="w-10 h-10 text-primary-foreground" />
                </div>
              <h3 className="text-xl font-display font-bold mb-2">{lang === 'es' ? 'Diagnóstico gratuito' : lang === 'pt' ? 'Diagnóstico gratuito' : 'Free diagnosis'}</h3>
                <p className="text-muted-foreground">{lang === 'es' ? 'Análisis inicial sin costo de tu sitio web' : lang === 'pt' ? 'Análise inicial sem custo do seu site' : 'Free initial analysis of your website'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-gold">{t.whatIncludes}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.features.map((f, i) => (
                <div key={i} className="glass-card p-6 hover:border-gold/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <f.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-3 text-foreground">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GEO Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, hsla(45, 86%, 40%, 0.04), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium mb-6">
                <Globe2 className="w-4 h-4" />
                GEO
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.geoTitle}</h2>
              <p className="text-xl font-display font-semibold text-gold mb-4 italic">"{t.geoTagline}"</p>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">{t.geoDesc}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {t.geoFeatures.map((gf, i) => (
                <div key={i} className="glass-card p-6 text-center hover:border-gold/30 transition-all">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <gf.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2 text-foreground">{gf.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{gf.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing – SEO & GEO Local */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">{t.planTitle}</h2>
              <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-border w-fit mx-auto">
                <button onClick={() => setCurrency('usd')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>USD</button>
                <button onClick={() => setCurrency('cop')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>COP</button>
                <button onClick={() => setCurrency('brl')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'brl' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>BRL</button>
              </div>
            </div>
            <div className="max-w-lg mx-auto glass-card p-10 border-gold/30 gold-glow">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                <MapPin className="w-7 h-7 text-gold" />
              </div>
              <p className="text-sm leading-relaxed mb-6 text-center text-muted-foreground">{t.planTagline}</p>
              <div className="text-center mb-6">
                <span className="text-4xl font-display font-bold text-foreground">{formatPrice(150, 600000, 790)}</span>
                <span className="text-sm ml-1 text-muted-foreground">{t.monthly}</span>
              </div>

              {/* Urgency */}
              <div className="mb-6 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2" style={{ background: 'hsla(356, 68%, 20%, 0.15)', color: 'hsl(356, 68%, 55%)' }}>
                <Clock className="w-3.5 h-3.5" />
                {t.urgency}
              </div>

              <ul className="space-y-3 mb-6">
                {t.planIncludes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mb-8 pt-4 border-t border-border">
                <p className="text-xs font-semibold mb-2 text-muted-foreground">{t.noInclude}</p>
                <ul className="space-y-1.5">
                  {t.planExcludes.map((ex, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="opacity-50">✕</span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={handleCta} className="btn-gold w-full flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> {t.planCta}
              </button>
            </div>
          </div>
        </section>

        {/* SEO Plans */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
              {lang === 'es' ? 'Planes SEO Mensuales' : lang === 'pt' ? 'Planos SEO Mensais' : 'Monthly SEO Plans'}
            </h2>
            <p className="text-muted-foreground text-center max-w-xl mx-auto mb-4">
              {lang === 'es' ? 'Mínimo 6 meses de contrato.' : lang === 'pt' ? 'Mínimo 6 meses de contrato.' : 'Minimum 6-month contract.'}
            </p>

            <div className="flex items-center justify-center gap-1 p-1 rounded-full border border-border w-fit mx-auto mb-14">
              <button onClick={() => setCurrency('usd')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>USD</button>
              <button onClick={() => setCurrency('cop')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>COP</button>
              <button onClick={() => setCurrency('brl')} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${currency === 'brl' ? 'bg-gold text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>BRL</button>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Plan SEO WebApps */}
              <div className="glass-card p-8 flex flex-col border-gold/50 gold-glow relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold bg-gold text-primary-foreground whitespace-nowrap">
                  {lang === 'es' ? 'Recomendado' : lang === 'pt' ? 'Recomendado' : 'Recommended'}
                </div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                  <TrendingUp className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">
                  {lang === 'es' ? 'SEO WebApps' : lang === 'pt' ? 'SEO WebApps' : 'SEO WebApps'}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-display font-bold">{formatPrice(199, 600000, 990)}</span>
                  <span className="text-muted-foreground text-sm ml-1">{lang === 'es' ? '/mes' : lang === 'pt' ? '/mês' : '/mo'}</span>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  {(lang === 'es' ? [
                    'Optimización técnica del sitio',
                    'Hasta 8 blogs mensuales optimizados para IAs y buscadores (GEO + SEO)',
                    'Optimización On Page y Off Page',
                    'Análisis de tráfico orgánico y comportamiento de usuarios',
                    'Tageo de eventos en Analytics',
                    'Conexión con Search Console',
                    'Informe semanal y mensual de resultados',
                  ] : lang === 'pt' ? [
                    'Otimização técnica do site',
                    'Até 8 blogs mensais otimizados para IAs e buscadores (GEO + SEO)',
                    'Otimização On Page e Off Page',
                    'Análise de tráfego orgânico e comportamento de usuários',
                    'Tagueamento de eventos no Analytics',
                    'Conexão com Search Console',
                    'Relatório semanal e mensal de resultados',
                  ] : [
                    'Technical site optimization',
                    'Up to 8 monthly blogs optimized for AI & search engines (GEO + SEO)',
                    'On Page and Off Page optimization',
                    'Organic traffic and user behavior analysis',
                    'Analytics event tagging',
                    'Search Console connection',
                    'Weekly and monthly results report',
                  ]).map((item, ii) => (
                    <li key={ii} className="flex items-start gap-3 text-sm text-foreground">
                      <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => { const link = getPaymentLink('seoWebapps', currency); window.open(link, '_blank', 'noopener,noreferrer'); }}
                  className="btn-gold w-full flex items-center justify-center gap-2 !px-0"
                >
                  <MessageCircle className="w-4 h-4" /> {lang === 'es' ? 'Iniciar SEO' : lang === 'pt' ? 'Iniciar SEO' : 'Start SEO'}
                </button>
              </div>

              {/* Plan SEO CMS */}
              <div className="glass-card p-8 flex flex-col">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                  <Globe2 className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">
                  {lang === 'es' ? 'SEO Sitios Tradicionales' : lang === 'pt' ? 'SEO Sites Tradicionais' : 'SEO Traditional Sites'}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-display font-bold">{formatPrice(249, 800000, 1290)}</span>
                  <span className="text-muted-foreground text-sm ml-1">{lang === 'es' ? '/mes' : lang === 'pt' ? '/mês' : '/mo'}</span>
                </div>
                <ul className="space-y-3 mb-6 flex-1">
                  {(lang === 'es' ? [
                    'Todo lo del plan SEO WebApps',
                    'Adaptado para sitios web tradicionales y otros CMS',
                    'Optimización de plugins y velocidad',
                    'Gestión técnica de actualizaciones',
                  ] : lang === 'pt' ? [
                    'Tudo do plano SEO WebApps',
                    'Adaptado para sites tradicionais e outros CMS',
                    'Otimização de plugins e velocidade',
                    'Gestão técnica de atualizações',
                  ] : [
                    'Everything in SEO WebApps plan',
                    'Adapted for traditional websites and other CMS',
                    'Plugin and speed optimization',
                    'Technical update management',
                  ]).map((item, ii) => (
                    <li key={ii} className="flex items-start gap-3 text-sm text-foreground">
                      <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => { const link = getPaymentLink('seoCms', currency); window.open(link, '_blank', 'noopener,noreferrer'); }}
                  className="w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground"
                >
                  <MessageCircle className="w-4 h-4" /> {lang === 'es' ? 'Iniciar SEO Sitios' : lang === 'pt' ? 'Iniciar SEO Sites' : 'Start Traditional SEO'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">{t.process}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* FAQ */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16 text-gold">{t.faqTitle}</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {t.faqs.map((faq, i) => (
                <div key={i} className="glass-card overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 text-left flex items-center justify-between hover:bg-gold/5 transition-colors">
                    <h3 className="text-lg font-display font-semibold pr-4 text-foreground">{faq.q}</h3>
                    <Plus className={`w-5 h-5 text-gold transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6"><p className="leading-relaxed text-muted-foreground">{faq.a}</p></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              {lang === 'es' ? '¿Listo para dominar Google?' : lang === 'pt' ? 'Pronto para dominar o Google?' : 'Ready to dominate Google?'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {lang === 'es' ? 'Solicita tu diagnóstico SEO gratuito.' : lang === 'pt' ? 'Solicite seu diagnóstico SEO gratuito.' : 'Request your free SEO diagnosis.'}
            </p>
            <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> {t.cta}
            </a>
          </div>
        </section>

        <AdBanner slot="service-seo-bottom" className="max-w-4xl mx-auto mb-20" />
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default SeoEcommerce;
