import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdBanner from '@/components/ui/ad-banner';
import { Search, TrendingUp, Users, BarChart3, MessageCircle, MapPin, Bot, Database, Network, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatPrice, type Lang } from '@/lib/pricing';
import {
  CheckList,
  CtaBand,
  FaqList,
  FeraButton,
  FxLink,
  IconTile,
  PageHero,
  Panel,
  ProcessSteps,
  Section,
  SectionHeading,
} from '@/components/fx/primitives';

interface Props { lang?: Lang; }

const SEO_USD = 500;

const SeoEcommerce = ({ lang = 'es' }: Props) => {
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

  const waUrl = 'https://wa.me/17866894686?text=' + encodeURIComponent(
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

  const serviceLd = {
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
  };

  const crumbName = lang === 'es' ? 'SEO para ecommerce' : lang === 'pt' ? 'SEO para e-commerce' : 'E-commerce SEO';
  const crumbs = [{ name: crumbName, path: seo.p }];
  const home = lang === 'es' ? { name: 'Inicio', path: '/' } : lang === 'pt' ? { name: 'Início', path: '/pt' } : { name: 'Home', path: '/en' };

  const planItems = lang === 'es' ? [
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
  ];

  return (
    <div className="fx-site min-h-screen">
      <SEO title={seo.t} description={seo.d} path={seo.p} lang={lang} jsonLd={[serviceLd, faqLd]} breadcrumbs={[home, ...crumbs]} />
      <Header lang={lang} />
      <main id="contenido-principal" className="pt-20">
        {/* Hero */}
        <PageHero
          align="left"
          lang={lang}
          breadcrumbs={crumbs}
          eyebrow={lang === 'es' ? 'Actualizado julio 2026' : lang === 'pt' ? 'Atualizado julho 2026' : 'Updated July 2026'}
          title={t.title}
          intro={t.sub}
        >
          <FxLink to="https://wa.me/17866894686" arrow={false}>
            <MessageCircle aria-hidden="true" /> {t.cta}
          </FxLink>
          <FxLink to={lang === 'es' ? '/casos-de-exito' : lang === 'pt' ? '/pt/casos-de-sucesso' : '/en/case-studies'} variant="outline">
            {t.ctaSecondary}
          </FxLink>
          <p className="mt-4 flex basis-full items-start gap-3 text-sm">
            <Search aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#e4c45f]" />
            <span>
              <strong>{lang === 'es' ? 'Diagnóstico gratuito' : lang === 'pt' ? 'Diagnóstico gratuito' : 'Free diagnosis'}</strong>
              <span className="fx-muted"> · {lang === 'es' ? 'Análisis inicial sin costo de tu sitio web' : lang === 'pt' ? 'Análise inicial sem custo do seu site' : 'Free initial analysis of your website'}</span>
            </span>
          </p>
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

        {/* GEO */}
        <Section tone="surface">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="eyebrow-pill mb-5 items-center gap-2">
                <Bot aria-hidden="true" className="h-4 w-4" /> GEO
              </p>
              <h2 className="text-3xl leading-tight sm:text-4xl lg:text-5xl lg:leading-[1.15]">{t.geoTitle}</h2>
              <p className="mt-6 text-xl font-semibold italic" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>"{t.geoTagline}"</p>
            </div>
            <p className="fx-muted self-end border-l-4 border-[#c0930e] pl-5 text-lg leading-relaxed">{t.geoDesc}</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.geoFeatures.map((gf) => (
              <Panel key={gf.title}>
                <IconTile icon={gf.icon} />
                <h3>{gf.title}</h3>
                <p className="fx-muted mt-3 text-sm leading-relaxed">{gf.desc}</p>
              </Panel>
            ))}
          </div>
        </Section>

        {/* Pricing – Plan SEO / AIO Mensual (único) */}
        <Section id="pricing">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
            <div>
              <SectionHeading
                title={lang === 'es' ? 'Posicionamiento SEO / AIO Mensual' : lang === 'pt' ? 'Posicionamento SEO / AIO Mensal' : 'Monthly SEO / AIO Positioning'}
              />
              <p className="fx-muted mt-5 text-lg">
                {lang === 'es' ? 'Plan único · mínimo 6 meses de contrato.' : lang === 'pt' ? 'Plano único · mínimo 6 meses de contrato.' : 'Single plan · 6-month minimum contract.'}
              </p>
            </div>
            <Panel>
              <IconTile icon={MapPin} />
              <p className="fx-muted leading-relaxed">{t.planTagline}</p>
              <p className="mt-6 text-4xl font-semibold" style={{ fontFamily: 'Poppins, system-ui, sans-serif', letterSpacing: '-0.04em' }}>
                {formatPrice(SEO_USD, lang, 'monthly')}
              </p>
              <p className="status-badge mt-5">
                <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                {t.urgency}
              </p>
              <CheckList items={planItems} className="mt-6" />
              <div className="mt-6 border-t pt-4" style={{ borderColor: 'var(--fx-border)' }}>
                <p className="fx-muted mb-2 text-xs font-semibold">{t.noInclude}</p>
                <ul className="space-y-1.5">
                  {t.planExcludes.map((ex) => (
                    <li key={ex} className="fx-muted flex items-center gap-2 text-xs">
                      <span aria-hidden="true" className="opacity-50">✕</span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
              <button type="button" onClick={handleCta} className="fx-btn mt-8 w-full">
                <MessageCircle aria-hidden="true" /> {t.planCta}
              </button>
            </Panel>
          </div>
        </Section>

        {/* Process */}
        <Section tone="surface">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <SectionHeading title={t.process} />
            <ProcessSteps steps={t.steps.map((s) => ({ title: s.title, body: s.desc }))} />
          </div>
        </Section>

        {/* FAQ */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading title={t.faqTitle} />
            <FaqList items={t.faqs.map((f) => [f.q, f.a] as [string, string])} />
          </div>
        </Section>

        <div className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
          <AdBanner slot="service-seo-bottom" />
        </div>

        {/* CTA */}
        <CtaBand
          title={lang === 'es' ? '¿Listo para dominar Google?' : lang === 'pt' ? 'Pronto para dominar o Google?' : 'Ready to dominate Google?'}
          body={lang === 'es' ? 'Solicita tu diagnóstico SEO gratuito.' : lang === 'pt' ? 'Solicite seu diagnóstico SEO gratuito.' : 'Request your free SEO diagnosis.'}
        >
          <FxLink to="https://wa.me/17866894686" arrow={false}>
            <MessageCircle aria-hidden="true" /> {t.cta}
          </FxLink>
          <FeraButton variant="outline" source="seo_ecommerce_final">
            {lang === 'es' ? 'Hablar con Fera' : lang === 'pt' ? 'Falar com a Fera' : 'Talk to Fera'}
          </FeraButton>
        </CtaBand>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default SeoEcommerce;
