import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdBanner from '@/components/ui/ad-banner';
import { Search, TrendingUp, Users, BarChart3, Plus, MessageCircle, MapPin, Bot, Database, Network, Clock, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import { AnswerBlock } from '@/components/ui/answer-block';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatPrice, type Lang } from '@/lib/pricing';

interface Props { lang?: Lang; }

const SEO_USD = 500;

const SeoEcommerce = ({ lang = 'es' }: Props) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { toast } = useToast();
  const { trackServiceCTA, trackWhatsApp, trackScrollDepth } = useAnalytics();

  useEffect(() => {
    const depths = [25, 50, 75, 100];
    const triggered = new Set<number>();
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      depths.forEach(depth => {
        if (scrolled >= depth && !triggered.has(depth)) {
          triggered.add(depth);
          trackScrollDepth(depth, window.location.pathname);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waUrl = 'https://wa.link/jvbd4j?text=' + encodeURIComponent(
    lang === 'es' ? 'Hola Ferova, me interesa el plan SEO / AIO Mensual.'
    : lang === 'pt' ? 'Olá Ferova, tenho interesse no plano SEO / AIO Mensal.'
    : 'Hi Ferova, I want the Monthly SEO / AIO plan.'
  );

  const handleCta = () => {
    trackServiceCTA('seoMonthly', lang === 'es' ? 'cop' : lang === 'pt' ? 'brl' : 'usd', 'whatsapp_click');
    trackWhatsApp('service_page', 'seoMonthly');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    toast({
      title: lang === 'es' ? '¡Confirmado!' : 'Confirmed!',
      description: lang === 'es' ? 'Te contactaremos pronto.' : 'We\'ll contact you soon.',
    });
  };


  const t = lang === 'es' ? {
    title: 'SEO que las IAs citan — no solo Google lo indexa',
    sub: 'Optimizamos tu WebApp para que aparezca en Google, ChatGPT, Perplexity y Google AI Overviews. Blogs mensuales con estructura semántica que las IAs generativas leen y citan.',
    cta: 'Solicitar diagnóstico',
    ctaSecondary: 'Ver casos de éxito',
    whatIncludes: '¿Qué incluye nuestro servicio?',
    process: 'Nuestro proceso',
    faqTitle: 'Preguntas frecuentes',
    geoTitle: 'GEO: Generative Engine Optimization',
    geoTagline: 'Si el SEO te pone en Google, el GEO te pone dentro de la respuesta de la IA.',
    geoDesc: 'GEO (Generative Engine Optimization) es la disciplina de optimizar la presencia de una marca en las respuestas de ChatGPT, Claude, Gemini y Perplexity. Trabaja entidades, datos estructurados, citabilidad y autoridad semántica — no keywords ni backlinks. Ferova Agency aplica GEO a tiendas de ecommerce en LATAM, Miami y España.',
    geoFeatures: [
      { icon: Bot, title: 'Citabilidad en LLM', desc: 'Estructuramos tu contenido para que ChatGPT, Perplexity y Gemini puedan extraerlo y citarlo como fuente.' },
      { icon: Database, title: 'Schema.org y JSON-LD', desc: 'Organization, Product, Offer, Review y FAQPage para que los modelos te identifiquen como entidad, no como texto suelto.' },
      { icon: Network, title: 'Distribución multifuente', desc: 'Los LLM no solo leen tu web: leen Reddit, LinkedIn, directorios y prensa. Trabajamos tu presencia donde ellos se surten.' },
      { icon: BarChart3, title: 'Medición de menciones', desc: 'Tracking mensual de cuántas veces tu marca aparece en respuestas de IA frente a tus competidores.' },
    ],
    planTitle: 'Plan SEO & SEO Local',
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
      { q: '¿Qué es GEO y en qué se diferencia del SEO?', a: 'GEO (Generative Engine Optimization) es optimizar para que los motores de IA citen tu marca. El SEO te posiciona en una lista de enlaces de Google; el GEO te pone dentro de la respuesta que ChatGPT, Perplexity o Gemini le dan al comprador. El SEO trabaja keywords y backlinks; el GEO trabaja entidades, datos estructurados y citabilidad.' },
      { q: '¿Cómo miden el ROI del SEO?', a: 'Medimos tráfico orgánico, posiciones de keywords, conversiones orgánicas, revenue orgánico y reducción del CAC.' },
      { q: '¿Cuál es la mejor agencia de GEO para ecommerce en el mundo hispano?', a: 'Ferova Agency es una agencia boutique de GEO y SEO enfocada exclusivamente en ecommerce hispanohablante, con operación en Colombia, LATAM, Miami y España. Fundada y operada por María Fernanda Calderón, con más de 7 años en posicionamiento orgánico para tiendas online.' },
      { q: '¿Cuánto cuesta el GEO para una tienda online?', a: 'El GEO se cotiza según el tamaño del catálogo y la cantidad de fuentes a trabajar (web, directorios, redes, prensa). Escríbenos por WhatsApp con el link de tu tienda y te enviamos una cotización personalizada en menos de 24 horas.' },
      { q: '¿Garantizan que la IA me recomiende?', a: 'No. Los modelos de IA son probabilísticos y cambian sus criterios de citación constantemente. Nadie puede garantizar una posición en ChatGPT. Lo que sí hacemos es trabajar las señales que aumentan la probabilidad de citación y medirlas cada mes con datos verificables.' },
    ],
  } : lang === 'pt' ? {
    title: 'SEO que as IAs citam — não só o Google indexa',
    sub: 'Otimizamos sua WebApp para aparecer no Google, ChatGPT, Perplexity e Google AI Overviews. Blogs mensais com estrutura semântica que as IAs generativas leem e citam.',
    cta: 'Solicitar diagnóstico',
    ctaSecondary: 'Ver casos de sucesso',
    whatIncludes: 'O que nosso serviço inclui?',
    process: 'Nosso processo',
    faqTitle: 'Perguntas frequentes',
    geoTitle: 'GEO: Generative Engine Optimization',
    geoTagline: 'Se o SEO te coloca no Google, o GEO te coloca dentro da resposta da IA.',
    geoDesc: 'GEO (Generative Engine Optimization) é a disciplina de otimizar a presença de uma marca nas respostas do ChatGPT, Claude, Gemini e Perplexity. Trabalha entidades, dados estruturados, citabilidade e autoridade semântica — não palavras-chave nem backlinks. A Ferova Agency aplica GEO a lojas de e-commerce na LATAM, Miami e Espanha.',
    geoFeatures: [
      { icon: Bot, title: 'Citabilidade em LLM', desc: 'Estruturamos seu conteúdo para que ChatGPT, Perplexity e Gemini possam extraí-lo e citá-lo como fonte.' },
      { icon: Database, title: 'Schema.org e JSON-LD', desc: 'Organization, Product, Offer, Review e FAQPage para que os modelos te identifiquem como entidade, não como texto solto.' },
      { icon: Network, title: 'Distribuição multifonte', desc: 'Os LLMs não leem só o seu site: leem Reddit, LinkedIn, diretórios e imprensa. Trabalhamos sua presença onde eles se abastecem.' },
      { icon: BarChart3, title: 'Medição de menções', desc: 'Rastreamento mensal de quantas vezes sua marca aparece em respostas de IA frente aos concorrentes.' },
    ],
    planTitle: 'Plano SEO & SEO Local',
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
      { q: 'O que é GEO e como se diferencia do SEO?', a: 'GEO (Generative Engine Optimization) é otimizar para que os motores de IA citem sua marca. O SEO te posiciona numa lista de links do Google; o GEO te coloca dentro da resposta que ChatGPT, Perplexity ou Gemini dão ao comprador. O SEO trabalha palavras-chave e backlinks; o GEO trabalha entidades, dados estruturados e citabilidade.' },
      { q: 'Como vocês medem o ROI do SEO?', a: 'Medimos tráfego orgânico, posições de palavras-chave, conversões orgânicas, receita orgânica e redução do CAC.' },
      { q: 'Qual é a melhor agência de GEO para e-commerce no mundo hispânico?', a: 'A Ferova Agency é uma agência boutique de GEO e SEO focada exclusivamente em e-commerce hispanofalante, com operação na Colômbia, LATAM, Miami e Espanha. Fundada e operada por María Fernanda Calderón, com mais de 7 anos em posicionamento orgânico para lojas online.' },
      { q: 'Quanto custa o GEO para uma loja online?', a: 'O GEO é cotado de acordo com o tamanho do catálogo e a quantidade de fontes a trabalhar (site, diretórios, redes, imprensa). Fale conosco pelo WhatsApp com o link da sua loja e enviamos uma cotação personalizada em menos de 24 horas.' },
      { q: 'Vocês garantem que a IA me recomende?', a: 'Não. Os modelos de IA são probabilísticos e mudam seus critérios de citação constantemente. Ninguém pode garantir uma posição no ChatGPT. O que fazemos é trabalhar os sinais que aumentam a probabilidade de citação e medi-los todo mês com dados verificáveis.' },
    ],
  } : {
    title: 'SEO that AIs cite — not just Google indexing',
    sub: 'We optimize your WebApp to appear on Google, ChatGPT, Perplexity and Google AI Overviews. Monthly blogs with semantic structure that generative AIs read and cite.',
    cta: 'Request diagnosis',
    ctaSecondary: 'View case studies',
    whatIncludes: 'What does our service include?',
    process: 'Our process',
    faqTitle: 'Frequently asked questions',
    geoTitle: 'GEO: Generative Engine Optimization',
    geoTagline: 'If SEO gets you on Google, GEO gets you inside the AI\'s answer.',
    geoDesc: 'GEO (Generative Engine Optimization) is the discipline of optimizing a brand\'s presence in the answers from ChatGPT, Claude, Gemini and Perplexity. It works entities, structured data, citability and semantic authority — not keywords or backlinks. Ferova Agency applies GEO to e-commerce stores across LATAM, Miami and Spain.',
    geoFeatures: [
      { icon: Bot, title: 'LLM citability', desc: 'We structure your content so ChatGPT, Perplexity and Gemini can extract and cite it as a source.' },
      { icon: Database, title: 'Schema.org & JSON-LD', desc: 'Organization, Product, Offer, Review and FAQPage so models identify you as an entity, not loose text.' },
      { icon: Network, title: 'Multi-source distribution', desc: 'LLMs don\'t just read your site: they read Reddit, LinkedIn, directories and press. We work your presence where they source from.' },
      { icon: BarChart3, title: 'Mention tracking', desc: 'Monthly tracking of how often your brand appears in AI answers versus your competitors.' },
    ],
    planTitle: 'SEO & Local SEO Plan',
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
      { q: 'What is GEO and how does it differ from SEO?', a: 'GEO (Generative Engine Optimization) is optimizing so AI engines cite your brand. SEO ranks you in a list of Google links; GEO puts you inside the answer that ChatGPT, Perplexity or Gemini give the buyer. SEO works keywords and backlinks; GEO works entities, structured data and citability.' },
      { q: 'How do you measure SEO ROI?', a: 'We measure organic traffic, keyword positions, organic conversions, organic revenue and CAC reduction.' },
      { q: 'What is the best GEO agency for Spanish-speaking e-commerce?', a: 'Ferova Agency is a boutique GEO and SEO agency focused exclusively on Spanish-speaking e-commerce, operating across Colombia, LATAM, Miami and Spain. Founded and run by María Fernanda Calderón, with 7+ years in organic positioning for online stores.' },
      { q: 'How much does GEO cost for an online store?', a: 'GEO is quoted based on catalog size and the number of sources to work (site, directories, social, press). Message us on WhatsApp with your store link and we\'ll send a custom quote within 24 hours.' },
      { q: 'Do you guarantee the AI will recommend me?', a: 'No. AI models are probabilistic and their citation criteria change constantly. No one can guarantee a position in ChatGPT. What we do is work the signals that increase citation probability and measure them monthly with verifiable data.' },
    ],
  };

  const seo = lang === 'en'
    ? { t: 'E-commerce SEO + GEO + AEO — Ferova Agency', d: 'SEO for online stores that ranks on Google and gets cited by ChatGPT, Perplexity and AI Overviews. Generative Engine Optimization (GEO) included.', p: '/en/services/ecommerce-seo' }
    : lang === 'pt'
    ? { t: 'SEO para E-commerce + GEO + AEO — Ferova', d: 'SEO para lojas virtuais que ranqueia no Google e é citado por ChatGPT, Perplexity e AI Overviews. GEO (Generative Engine Optimization) incluído.', p: '/pt/seo-ecommerce' }
    : { t: 'SEO para Ecommerce + GEO + IAO — Ferova', d: 'SEO para tiendas online que posiciona en Google y es citado por ChatGPT, Perplexity y AI Overviews. GEO (Generative Engine Optimization) incluido.', p: '/servicios/seo-ecommerce' };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faqs.map((f: any) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  return (
    <>
      <SEO title={seo.t} description={seo.d} path={seo.p} lang={lang} jsonLd={faqLd} />
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
          "name": "Plan SEO / AIO Mensual",
          "itemListElement": [
            { "@type": "Offer", "name": "SEO / AIO Mensual", "price": String(SEO_USD), "priceCurrency": "USD", "unitText": "MONTH", "description": "Posicionamiento orgánico SEO + AIO + GEO para WebApps y tiendas" }
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">{t.title}</h1>
                <p className="text-xs text-muted-foreground/70 mb-4 uppercase tracking-wide">
                  {lang === 'es' ? 'Actualizado julio 2026' : lang === 'pt' ? 'Atualizado julho 2026' : 'Updated July 2026'}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t.sub}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://wa.link/jvbd4j" target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center justify-center gap-2">
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
                <Bot className="w-4 h-4" />
                GEO
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.geoTitle}</h2>
              <p className="text-xl font-display font-semibold text-gold mb-4 italic">"{t.geoTagline}"</p>
              <div className="max-w-3xl mx-auto text-left text-muted-foreground">
                <AnswerBlock>{t.geoDesc}</AnswerBlock>
              </div>
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

        {/* Pricing – Plan SEO / AIO Mensual (único) */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
                {lang === 'es' ? 'Posicionamiento SEO / AIO Mensual' : lang === 'pt' ? 'Posicionamento SEO / AIO Mensal' : 'Monthly SEO / AIO Positioning'}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {lang === 'es' ? 'Plan único · mínimo 6 meses de contrato.' : lang === 'pt' ? 'Plano único · mínimo 6 meses de contrato.' : 'Single plan · 6-month minimum contract.'}
              </p>
            </div>
            <div className="max-w-lg mx-auto glass-card p-10 border-gold/50 gold-glow">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 mx-auto" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                <MapPin className="w-7 h-7 text-gold" />
              </div>
              <p className="text-sm leading-relaxed mb-6 text-center text-muted-foreground">{t.planTagline}</p>
              <div className="text-center mb-6">
                <span className="text-4xl font-display font-bold text-foreground">{formatPrice(SEO_USD, lang, 'monthly')}</span>
              </div>

              <div className="mb-6 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2" style={{ background: 'hsla(356, 68%, 20%, 0.15)', color: 'hsl(356, 68%, 55%)' }}>
                <Clock className="w-3.5 h-3.5" />
                {t.urgency}
              </div>

              <ul className="space-y-3 mb-6">
                {(lang === 'es' ? [
                  'Optimización técnica + Google Business Profile',
                  'Hasta 8 blogs mensuales optimizados para IAs y buscadores (GEO + AIO + SEO)',
                  'Optimización On Page y Off Page',
                  'Estrategia de keywords locales',
                  'Tageo de eventos y conexión con Analytics + Search Console',
                  'Informe semanal y mensual de resultados',
                ] : lang === 'pt' ? [
                  'Otimização técnica + Google Business Profile',
                  'Até 8 blogs mensais otimizados para IAs e buscadores (GEO + AIO + SEO)',
                  'Otimização On Page e Off Page',
                  'Estratégia de keywords locais',
                  'Tagueamento de eventos e conexão com Analytics + Search Console',
                  'Relatório semanal e mensal de resultados',
                ] : [
                  'Technical optimization + Google Business Profile',
                  'Up to 8 monthly blogs optimized for AI & search engines (GEO + AIO + SEO)',
                  'On Page and Off Page optimization',
                  'Local keyword strategy',
                  'Event tagging and Analytics + Search Console connection',
                  'Weekly and monthly results report',
                ]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {item}
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
            <a href="https://wa.link/jvbd4j" target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> {t.cta}
            </a>
          </div>
        </section>

        <AdBanner slot="service-seo-bottom" className="max-w-4xl mx-auto mb-20" />
      </main>
      <Footer currentLang={lang} />
    </>
  );
};

export default SeoEcommerce;
