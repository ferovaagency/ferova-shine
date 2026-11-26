import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Target, BarChart3, ShoppingCart, Rocket } from 'lucide-react';
import SEO from '@/components/SEO';
import { CaseGrid } from '@/components/fx/CaseGrid';
import { PORTFOLIO_CASES, portfolioUrl } from '@/data/portfolio';
import { CtaBand, FeraButton, FxLink, PageHero, Section, SectionHeading } from '@/components/fx/primitives';

interface Props { lang?: 'es' | 'en' | 'pt'; }

/**
 * Casos heredados. Ya NO se listan en la página pública (los casos son los del
 * portafolio, src/data/portfolio.ts); se conservan porque el admin
 * (AdminCases, AdminCaseEditor) y las URL antiguas de detalle los usan.
 */
export const casesData = {
  es: [
    {
      id: 'google-ads-arcos-desinfeccion', title: 'Estrategia de captación para equipos de desinfección', category: 'pauta', country: 'Colombia', icon: Target,
      challenge: 'En 2020, en plena pandemia, una empresa necesitaba comercializar arcos de desinfección para carros, camiones y personas. El desafío era generar contactos directos de clientes interesados en comprar equipos de alto valor con una inversión ajustada.',
      solution: 'Diseñamos una estrategia centrada en Google Ads con campañas de búsqueda y palabras clave transaccionales. En lugar de enviar tráfico a una web, creamos un embudo directo hacia llamadas telefónicas y mensajes de WhatsApp para acortar el ciclo de cierre.',
      results: [{ metric: 'Llamadas diarias', value: '100', period: 'promedio' }, { metric: 'Mensajes WhatsApp', value: '150/día', period: 'clientes interesados' }, { metric: 'Ingresos mensuales', value: '$225M COP', period: 'promedio' }, { metric: 'ROI', value: '224x', period: 'la inversión' }],
    },
    {
      id: 'ecommerce-cableado-estructurado', title: 'SEO técnico para un ecommerce de cableado estructurado', category: 'seo', country: 'Colombia', icon: BarChart3,
      challenge: 'E-commerce con más de 14.000 productos de partes para servidores y cableado estructurado. Los clientes buscaban por número de parte pero el sitio no aparecía en Google. Miles de errores 404 por productos eliminados afectaban la autoridad del dominio.',
      solution: 'Realizamos auditoría técnica completa, corregimos miles de errores 404, optimizamos fichas de producto por número de parte, y escalamos la indexación de todo el catálogo durante 2 años de trabajo continuo.',
      results: [{ metric: 'Posiciones #1', value: '50', period: 'referencias' }, { metric: 'Productos indexados', value: '12.486', period: 'primera página' }, { metric: 'Cotizaciones diarias', value: '10-15', period: 'constantes' }, { metric: 'Tasa de cierre', value: '93%', period: 'solicitudes' }],
    },
    {
      id: 'ecommerce-mascotas', title: 'Recuperación técnica y SEO de un ecommerce de mascotas', category: 'seo', country: 'Colombia', icon: ShoppingCart,
      challenge: 'E-commerce de mascotas que pasó de facturar $45M a solo $3M mensuales (caída del 90%). El sitio desarrollado en código puro se rompía con cada actualización de WordPress. Varias agencias recomendaron migrar a Shopify, pero el cliente quería salvar su inversión.',
      solution: 'Estabilizamos el sitio, depuramos plugins innecesarios, rediseñamos completamente con Divi, restablecimos funcionalidades críticas y lanzamos estrategia SEO posicionando "Guabi para gato" en el #1 de Google en solo 2 meses.',
      results: [{ metric: 'Ventas mensuales', value: '$3M → $10M', period: '3 meses' }, { metric: 'Producto #1 Google', value: 'Guabi gato', period: '2 meses' }, { metric: 'Estabilidad del sitio', value: '100%', period: 'sin caídas' }, { metric: 'Crecimiento', value: '+233%', period: 'en ventas' }],
    },
    {
      id: 'cliente-tecnologia-migracion-web-app', title: 'Migración de plataforma para un cliente de tecnología', category: 'webapp', country: 'Colombia', icon: Rocket,
      challenge: 'Cliente del sector tecnología con plataforma legacy en WordPress + plugins. Costos de mantenimiento mensuales superiores a $2.000 USD, caídas semanales y tiempo de carga de 8.4s que destruía la conversión.',
      solution: 'Migramos a una Web App propietaria en stack moderno (React + backend serverless). Rediseñamos la arquitectura de datos, implementamos caché en el edge y eliminamos 14 plugins innecesarios. Lanzamiento en 6 semanas sin caídas.',
      results: [{ metric: 'Costos mensuales', value: '-70%', period: 'vs WordPress' }, { metric: 'Velocidad de carga', value: '8.4s → 1.2s', period: '+180% más rápido' }, { metric: 'Conversión', value: '+42%', period: 'primeros 90 días' }, { metric: 'Uptime', value: '99.98%', period: 'sin caídas' }],
    },
  ],
  en: [
    {
      id: 'google-ads-arcos-desinfeccion', title: '100 calls & 150 daily WhatsApp messages with Google Ads', category: 'pauta', country: 'Colombia', icon: Target,
      challenge: 'In 2020, during the pandemic, a company needed to sell disinfection arches for cars, trucks and people. The challenge was generating direct leads from interested buyers of high-value equipment on a tight budget.',
      solution: 'We designed a Google Ads search campaign strategy with transactional keywords. Instead of sending traffic to a website, we created a direct funnel to phone calls and WhatsApp messages to shorten the sales cycle.',
      results: [{ metric: 'Daily calls', value: '100', period: 'average' }, { metric: 'WhatsApp messages', value: '150/day', period: 'interested clients' }, { metric: 'Monthly revenue', value: '$225M COP', period: 'average' }, { metric: 'ROI', value: '224x', period: 'the investment' }],
    },
    {
      id: 'ecommerce-cableado-estructurado', title: '15 daily quotes for a structured cabling e-commerce', category: 'seo', country: 'Colombia', icon: BarChart3,
      challenge: 'E-commerce with 14,000+ server parts and structured cabling products. Customers searched by part number but the site wasn\'t on Google. Thousands of 404 errors from deleted products hurt domain authority.',
      solution: 'We performed a full technical audit, fixed thousands of 404 errors, optimized product pages by part number, and scaled indexing of the entire catalog over 2 years of continuous work.',
      results: [{ metric: '#1 positions', value: '50', period: 'references' }, { metric: 'Indexed products', value: '12,486', period: 'first page' }, { metric: 'Daily quotes', value: '10-15', period: 'consistent' }, { metric: 'Close rate', value: '93%', period: 'requests' }],
    },
    {
      id: 'cliente-tecnologia-migracion-web-app', title: 'Web App migration: -70% costs & +180% speed', category: 'webapp', country: 'Colombia', icon: Rocket,
      challenge: 'Tech client with a legacy WordPress + plugins platform. Monthly maintenance over $2,000 USD, weekly downtime and 8.4s load time killing conversion.',
      solution: 'Migrated to a proprietary Web App on a modern stack (React + serverless backend). Redesigned data architecture, implemented edge caching and removed 14 unnecessary plugins. Launched in 6 weeks with zero downtime.',
      results: [{ metric: 'Monthly costs', value: '-70%', period: 'vs WordPress' }, { metric: 'Load time', value: '8.4s → 1.2s', period: '+180% faster' }, { metric: 'Conversion', value: '+42%', period: 'first 90 days' }, { metric: 'Uptime', value: '99.98%', period: 'no downtime' }],
    },
    {
      id: 'ecommerce-mascotas', title: 'Tripled sales for a pet e-commerce', category: 'seo', country: 'Colombia', icon: ShoppingCart,
      challenge: 'Pet e-commerce that went from $45M to just $3M monthly (90% drop). The custom-coded site broke with every WordPress update. Multiple agencies recommended migrating to Shopify, but the client wanted to save their investment.',
      solution: 'We stabilized the site, cleaned unnecessary plugins, fully redesigned with Divi, restored critical functionalities and launched an SEO strategy positioning "Guabi cat food" at #1 on Google in just 2 months.',
      results: [{ metric: 'Monthly sales', value: '$3M → $10M', period: '3 months' }, { metric: '#1 on Google', value: 'Guabi cat', period: '2 months' }, { metric: 'Site stability', value: '100%', period: 'no downtime' }, { metric: 'Growth', value: '+233%', period: 'in sales' }],
    },
  ],
  pt: [
    {
      id: 'google-ads-arcos-desinfeccion', title: '100 ligações e 150 mensagens diárias com Google Ads', category: 'pauta', country: 'Colômbia', icon: Target,
      challenge: 'Em 2020, em plena pandemia, uma empresa precisava comercializar arcos de desinfecção para carros, caminhões e pessoas. O desafio era gerar contatos diretos de clientes interessados em comprar equipamentos de alto valor com investimento ajustado.',
      solution: 'Criamos uma estratégia centrada em Google Ads com campanhas de busca e palavras-chave transacionais. Em vez de enviar tráfego para um site, criamos um funil direto para ligações telefônicas e mensagens de WhatsApp para encurtar o ciclo de vendas.',
      results: [{ metric: 'Ligações diárias', value: '100', period: 'média' }, { metric: 'Mensagens WhatsApp', value: '150/dia', period: 'clientes interessados' }, { metric: 'Receita mensal', value: '$225M COP', period: 'média' }, { metric: 'ROI', value: '224x', period: 'o investimento' }],
    },
    {
      id: 'ecommerce-cableado-estructurado', title: '15 orçamentos diários em e-commerce de cabeamento', category: 'seo', country: 'Colômbia', icon: BarChart3,
      challenge: 'E-commerce com mais de 14.000 produtos de peças para servidores e cabeamento estruturado. Os clientes buscavam por número de peça mas o site não aparecia no Google. Milhares de erros 404 por produtos removidos afetavam a autoridade do domínio.',
      solution: 'Realizamos auditoria técnica completa, corrigimos milhares de erros 404, otimizamos fichas de produto por número de peça, e escalamos a indexação de todo o catálogo durante 2 anos de trabalho contínuo.',
      results: [{ metric: 'Posições #1', value: '50', period: 'referências' }, { metric: 'Produtos indexados', value: '12.486', period: 'primeira página' }, { metric: 'Orçamentos diários', value: '10-15', period: 'constantes' }, { metric: 'Taxa de fechamento', value: '93%', period: 'solicitações' }],
    },
    {
      id: 'ecommerce-mascotas', title: 'Triplicamos vendas em e-commerce de pets', category: 'seo', country: 'Colômbia', icon: ShoppingCart,
      challenge: 'E-commerce de pets que passou de faturar $45M para apenas $3M mensais (queda de 90%). O site desenvolvido em código puro quebrava a cada atualização do WordPress. Várias agências recomendaram migrar para Shopify, mas o cliente queria salvar seu investimento.',
      solution: 'Estabilizamos o site, limpamos plugins desnecessários, redesenhamos completamente com Divi, restauramos funcionalidades críticas e lançamos estratégia SEO posicionando "Guabi para gato" no #1 do Google em apenas 2 meses.',
      results: [{ metric: 'Vendas mensais', value: '$3M → $10M', period: '3 meses' }, { metric: 'Produto #1 Google', value: 'Guabi gato', period: '2 meses' }, { metric: 'Estabilidade do site', value: '100%', period: 'sem quedas' }, { metric: 'Crescimento', value: '+233%', period: 'em vendas' }],
    },
    {
      id: 'cliente-tecnologia-migracion-web-app', title: 'Migração para Web App: -70% custos e +180% velocidade', category: 'webapp', country: 'Colômbia', icon: Rocket,
      challenge: 'Cliente do setor de tecnologia com plataforma legacy em WordPress + plugins. Custos de manutenção mensais acima de $2.000 USD, quedas semanais e tempo de carregamento de 8.4s destruindo a conversão.',
      solution: 'Migramos para uma Web App proprietária em stack moderno (React + backend serverless). Redesenhamos a arquitetura de dados, implementamos cache no edge e removemos 14 plugins desnecessários. Lançamento em 6 semanas sem quedas.',
      results: [{ metric: 'Custos mensais', value: '-70%', period: 'vs WordPress' }, { metric: 'Tempo de carga', value: '8.4s → 1.2s', period: '+180% mais rápido' }, { metric: 'Conversão', value: '+42%', period: 'primeiros 90 dias' }, { metric: 'Uptime', value: '99.98%', period: 'sem quedas' }],
    },
  ],
};

const COPY = {
  en: {
    t: 'Case Studies — SEO and Web Development | Ferova',
    d: 'Case studies from the Ferova portfolio: Netpower IT, All For All, three Florida preschools and Caro Color. What was done, how it was measured and where each number comes from.',
    p: '/en/case-studies',
    home: 'Home', homePath: '/en', crumb: 'Case studies',
    eyebrow: 'Ferova portfolio',
    h1: 'Case studies',
    intro: 'These are the cases from the Ferova portfolio. Each one explains what was done, how it was measured and where the number comes from.',
    kicker: 'Projects',
    title: 'What was done and what changed in each project.',
    full: 'See the full portfolio',
    closeTitle: 'Tell me what your agency needs to deliver.',
    closeBody: 'Share the skill, volume, date and collaboration model, and Fera prepares scope, price and availability.',
    cta: 'Talk to Fera', contact: 'Contact', contactPath: '/en/contact',
  },
  pt: {
    t: 'Casos de Sucesso — SEO e Desenvolvimento Web | Ferova',
    d: 'Casos do portfólio da Ferova: Netpower IT, All For All, três pré-escolas da Flórida e Caro Color. O que foi feito, como foi medido e de onde vem cada número.',
    p: '/pt/casos-de-sucesso',
    home: 'Início', homePath: '/pt', crumb: 'Casos de sucesso',
    eyebrow: 'Portfólio da Ferova',
    h1: 'Casos de sucesso',
    intro: 'Estes são os casos do portfólio da Ferova. Cada um explica o que foi feito, como foi medido e de onde vem o número.',
    kicker: 'Projetos',
    title: 'O que foi feito e o que mudou em cada projeto.',
    full: 'Ver o portfólio completo',
    closeTitle: 'Conte o que sua agência precisa entregar.',
    closeBody: 'Indique habilidade, volume, data e modelo de colaboração para preparar escopo, preço e disponibilidade.',
    cta: 'Falar com a Fera', contact: 'Contato', contactPath: '/pt/contato',
  },
  es: {
    t: 'Casos de éxito de SEO y desarrollo web | Ferova',
    d: 'Casos del portafolio de Ferova: Netpower IT, All For All, tres preescolares de Florida y Caro Color. Qué se hizo, cómo se midió y de dónde sale cada cifra.',
    p: '/casos-de-exito',
    home: 'Inicio', homePath: '/', crumb: 'Casos de éxito',
    eyebrow: 'Portafolio de Ferova',
    h1: 'Casos de éxito',
    intro: 'Estos son los casos del portafolio de Ferova. Cada uno explica qué se hizo, cómo se midió y de dónde sale la cifra.',
    kicker: 'Proyectos',
    title: 'Qué se hizo y qué cambió en cada proyecto.',
    full: 'Ver el portafolio completo',
    closeTitle: 'Cotiza las horas o tareas que necesita tu agencia.',
    closeBody: 'Indica habilidad, volumen, fecha y modalidad de colaboración para preparar alcance, precio y disponibilidad.',
    cta: 'Hablar con Fera', contact: 'Contacto', contactPath: '/contacto',
  },
};

const CasosDeExito = ({ lang = 'es' }: Props) => {
  const c = COPY[lang] ?? COPY.es;
  const l = lang === 'en' ? 'en' : 'es';
  const crumbs = [{ name: c.home, path: c.homePath }, { name: c.crumb, path: c.p }];
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: c.h1,
    itemListElement: PORTFOLIO_CASES.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name[l],
      url: portfolioUrl(l, item.id),
    })),
  };

  return (
    <div className="fx-site min-h-screen">
      <SEO title={c.t} description={c.d} path={c.p} lang={lang} breadcrumbs={crumbs} jsonLd={itemList} />
      <Header currentLang={lang} />
      <main id="contenido-principal" className="pt-20">
        <PageHero eyebrow={c.eyebrow} title={c.h1} intro={c.intro} breadcrumbs={crumbs.slice(1)} lang={lang} />

        <Section>
          <SectionHeading eyebrow={c.kicker} title={c.title} />
          <div className="mt-12">
            <CaseGrid lang={lang} />
          </div>
          <div className="mt-12 flex justify-center">
            <FxLink to={portfolioUrl(l)} variant="outline">{c.full}</FxLink>
          </div>
        </Section>

        <CtaBand title={c.closeTitle} body={c.closeBody}>
          <FeraButton source={`case_studies_${lang}_final`}>{c.cta}</FeraButton>
          <FxLink to={c.contactPath} variant="outline">{c.contact}</FxLink>
        </CtaBand>
      </main>
      <Footer currentLang={lang} />
    </div>
  );
};

export default CasosDeExito;
