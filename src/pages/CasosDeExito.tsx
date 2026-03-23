import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { Target, BarChart3, ShoppingCart, ArrowRight, MessageCircle } from 'lucide-react';

interface Props { lang?: 'es' | 'en' | 'pt'; }

export const casesData = {
  es: [
    {
      id: 'google-ads-arcos-desinfeccion', title: '100 llamadas y 150 mensajes diarios con Google Ads', category: 'pauta', country: 'Colombia', icon: Target,
      challenge: 'En 2020, en plena pandemia, una empresa necesitaba comercializar arcos de desinfección para carros, camiones y personas. El desafío era generar contactos directos de clientes interesados en comprar equipos de alto valor con una inversión ajustada.',
      solution: 'Diseñamos una estrategia centrada en Google Ads con campañas de búsqueda y palabras clave transaccionales. En lugar de enviar tráfico a una web, creamos un embudo directo hacia llamadas telefónicas y mensajes de WhatsApp para acortar el ciclo de cierre.',
      results: [{ metric: 'Llamadas diarias', value: '100', period: 'promedio' }, { metric: 'Mensajes WhatsApp', value: '150/día', period: 'clientes interesados' }, { metric: 'Ingresos mensuales', value: '$225M COP', period: 'promedio' }, { metric: 'ROI', value: '224x', period: 'la inversión' }],
    },
    {
      id: 'ecommerce-cableado-estructurado', title: '15 cotizaciones diarias en e-commerce de cableado', category: 'seo', country: 'Colombia', icon: BarChart3,
      challenge: 'E-commerce con más de 14.000 productos de partes para servidores y cableado estructurado. Los clientes buscaban por número de parte pero el sitio no aparecía en Google. Miles de errores 404 por productos eliminados afectaban la autoridad del dominio.',
      solution: 'Realizamos auditoría técnica completa, corregimos miles de errores 404, optimizamos fichas de producto por número de parte, y escalamos la indexación de todo el catálogo durante 2 años de trabajo continuo.',
      results: [{ metric: 'Posiciones #1', value: '50', period: 'referencias' }, { metric: 'Productos indexados', value: '12.486', period: 'primera página' }, { metric: 'Cotizaciones diarias', value: '10-15', period: 'constantes' }, { metric: 'Tasa de cierre', value: '93%', period: 'solicitudes' }],
    },
    {
      id: 'ecommerce-mascotas', title: 'Triplicamos ventas en e-commerce de mascotas', category: 'seo', country: 'Colombia', icon: ShoppingCart,
      challenge: 'E-commerce de mascotas que pasó de facturar $45M a solo $3M mensuales (caída del 90%). El sitio desarrollado en código puro se rompía con cada actualización de WordPress. Varias agencias recomendaron migrar a Shopify, pero el cliente quería salvar su inversión.',
      solution: 'Estabilizamos el sitio, depuramos plugins innecesarios, rediseñamos completamente con Divi, restablecimos funcionalidades críticas y lanzamos estrategia SEO posicionando "Guabi para gato" en el #1 de Google en solo 2 meses.',
      results: [{ metric: 'Ventas mensuales', value: '$3M → $10M', period: '3 meses' }, { metric: 'Producto #1 Google', value: 'Guabi gato', period: '2 meses' }, { metric: 'Estabilidad del sitio', value: '100%', period: 'sin caídas' }, { metric: 'Crecimiento', value: '+233%', period: 'en ventas' }],
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
  ],
};

const CasosDeExito = ({ lang = 'es' }: Props) => {
  const [filter, setFilter] = useState('all');
  const cases = casesData[lang] || casesData.es;
  const filters = lang === 'es'
    ? [{ id: 'all', label: 'Todos' }, { id: 'seo', label: 'SEO' }, { id: 'pauta', label: 'Pauta Digital' }]
    : lang === 'pt'
    ? [{ id: 'all', label: 'Todos' }, { id: 'seo', label: 'SEO' }, { id: 'pauta', label: 'Tráfego Pago' }]
    : [{ id: 'all', label: 'All' }, { id: 'seo', label: 'SEO' }, { id: 'pauta', label: 'Digital Ads' }];

  const filtered = filter === 'all' ? cases : cases.filter(c => c.category === filter);
  const basePath = lang === 'es' ? '/casos-de-exito' : lang === 'pt' ? '/pt/casos-de-sucesso' : '/en/case-studies';

  return (
    <PageTransition>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                {lang === 'es' ? 'Casos de Éxito Reales' : lang === 'pt' ? 'Casos de Sucesso Reais' : 'Real Case Studies'}
              </h1>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                {lang === 'es' ? 'Resultados comprobables de nuestros clientes en Colombia.' : lang === 'pt' ? 'Resultados comprováveis dos nossos clientes na Colômbia.' : 'Proven results from our clients in Colombia.'}
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="flex flex-wrap gap-3 justify-center mb-16">
                {filters.map(f => (
                  <motion.button key={f.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setFilter(f.id)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === f.id ? 'bg-gold text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground hover:border-gold/50'}`}>
                    {f.label}
                  </motion.button>
                ))}
              </div>
            </AnimatedSection>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filtered.map((c, i) => {
                const IconComp = c.icon;
                return (
                  <StaggerItem key={i}>
                    <ScaleOnHover>
                      <Link to={`${basePath}/${c.id}`} className="glass-card p-6 hover:border-gold/30 transition-all duration-300 group block h-full">
                        <div className="aspect-video rounded-xl mb-6 flex items-center justify-center bg-gold/5">
                          <IconComp className="w-12 h-12 text-gold/50" />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gold font-medium">{c.country}</span>
                          <span className="text-xs text-muted-foreground px-2 py-1 rounded-full border border-border/50">
                            {filters.find(f => f.id === c.category)?.label}
                          </span>
                        </div>
                        <h3 className="text-xl font-display font-bold mb-3 group-hover:text-gold transition-colors">{c.title}</h3>
                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">{c.challenge}</p>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {c.results.slice(0, 2).map((r, j) => (
                            <div key={j} className="text-center">
                              <div className="text-gold font-display font-bold text-lg">{r.value}</div>
                              <div className="text-muted-foreground text-xs">{r.metric}</div>
                            </div>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                          {lang === 'es' ? 'Ver caso completo' : lang === 'pt' ? 'Ver caso completo' : 'View full case'} <ArrowRight className="w-4 h-4" />
                        </span>
                      </Link>
                    </ScaleOnHover>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-surface">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                {lang === 'es' ? '¿Tu e-commerce podría ser el próximo?' : lang === 'pt' ? 'Seu e-commerce pode ser o próximo?' : 'Could your e-commerce be next?'}
              </h2>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> {lang === 'es' ? 'Agendar Asesoría' : lang === 'pt' ? 'Agendar Consultoria' : 'Book a Consultation'}
              </motion.a>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </PageTransition>
  );
};

export default CasosDeExito;
