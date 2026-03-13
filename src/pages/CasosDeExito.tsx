import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

export const casesData = {
  es: [
    {
      id: 'tienda-moda-latina',
      title: 'Tienda de moda latina',
      category: 'fashion',
      country: 'Colombia',
      challenge: 'Catálogo con 5k SKUs, contenido thin y Core Web Vitals deficientes.',
      solution: 'Migración a Web App, reestructuración de arquitectura SEO y optimización de fichas de producto con contenido único.',
      results: [
        { metric: 'Sesiones orgánicas', value: '+95%', period: '6 meses' },
        { metric: 'Revenue orgánico', value: '+128%', period: '6 meses' },
        { metric: 'Keywords Top-3', value: '32', period: 'nuevas' },
        { metric: 'LCP mejorado', value: '4.2s → 2.1s', period: 'optimización' },
      ],
    },
    {
      id: 'electronics-usa',
      title: 'Electrónicos B2B',
      category: 'electronics',
      country: 'Estados Unidos',
      challenge: 'Competencia alta y arquitectura técnica compleja.',
      solution: 'Estrategia de contenido B2B, link building sectorial y optimización técnica avanzada.',
      results: [
        { metric: 'Tráfico orgánico', value: '+156%', period: '8 meses' },
        { metric: 'Conversión B2B', value: '+89%', period: '8 meses' },
        { metric: 'Keywords objetivo', value: '78%', period: 'top 10' },
        { metric: 'Tiempo de carga', value: '-43%', period: 'reducción' },
      ],
    },
    {
      id: 'home-decor-mexico',
      title: 'Decoración del hogar',
      category: 'home',
      country: 'México',
      challenge: 'Baja autoridad y competencia internacional.',
      solution: 'SEO internacional, content marketing en español y link building regional.',
      results: [
        { metric: 'Ventas online', value: '+203%', period: '10 meses' },
        { metric: 'Autoridad dominio', value: '28 → 45', period: 'DR score' },
        { metric: 'Mercados nuevos', value: '3', period: 'países' },
        { metric: 'CTR promedio', value: '+67%', period: 'mejora' },
      ],
    },
  ],
  en: [
    {
      id: 'latin-fashion-store',
      title: 'Latin fashion store',
      category: 'fashion',
      country: 'Colombia',
      challenge: 'Catalog with 5k SKUs, thin content and poor Core Web Vitals.',
      solution: 'Migration to Web App, SEO architecture restructuring and product page optimization with unique content.',
      results: [
        { metric: 'Organic sessions', value: '+95%', period: '6 months' },
        { metric: 'Organic revenue', value: '+128%', period: '6 months' },
        { metric: 'Keywords Top-3', value: '32', period: 'new' },
        { metric: 'LCP improved', value: '4.2s → 2.1s', period: 'optimization' },
      ],
    },
    {
      id: 'electronics-usa',
      title: 'B2B Electronics',
      category: 'electronics',
      country: 'United States',
      challenge: 'High competition and complex technical architecture.',
      solution: 'B2B content strategy, sectoral link building and advanced technical optimization.',
      results: [
        { metric: 'Organic traffic', value: '+156%', period: '8 months' },
        { metric: 'B2B conversion', value: '+89%', period: '8 months' },
        { metric: 'Target keywords', value: '78%', period: 'top 10' },
        { metric: 'Loading time', value: '-43%', period: 'reduction' },
      ],
    },
    {
      id: 'home-decor-mexico',
      title: 'Home decoration',
      category: 'home',
      country: 'Mexico',
      challenge: 'Low authority and international competition.',
      solution: 'International SEO, Spanish content marketing and regional link building.',
      results: [
        { metric: 'Online sales', value: '+203%', period: '10 months' },
        { metric: 'Domain authority', value: '28 → 45', period: 'DR score' },
        { metric: 'New markets', value: '3', period: 'countries' },
        { metric: 'Average CTR', value: '+67%', period: 'improvement' },
      ],
    },
  ],
};

const CasosDeExito = ({ lang = 'es' }: Props) => {
  const [filter, setFilter] = useState('all');
  const cases = casesData[lang];
  const filters = lang === 'es'
    ? [{ id: 'all', label: 'Todos' }, { id: 'fashion', label: 'Moda' }, { id: 'electronics', label: 'Electrónicos' }, { id: 'home', label: 'Hogar' }]
    : [{ id: 'all', label: 'All' }, { id: 'fashion', label: 'Fashion' }, { id: 'electronics', label: 'Electronics' }, { id: 'home', label: 'Home' }];

  const filtered = filter === 'all' ? cases : cases.filter(c => c.category === filter);
  const basePath = lang === 'es' ? '/casos-de-exito' : '/en/case-studies';

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {lang === 'es' ? 'Casos de Éxito' : 'Case Studies'}
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {lang === 'es' ? 'Resultados reales de nuestros clientes.' : 'Real results from our clients.'}
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-wrap gap-3 justify-center mb-16">
              {filters.map(f => (
                <button key={f.id} onClick={() => setFilter(f.id)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === f.id ? 'bg-gold text-primary-foreground' : 'border border-border text-muted-foreground hover:text-foreground hover:border-gold/50'}`}>
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filtered.map((c, i) => (
                <Link key={i} to={`${basePath}/${c.id}`} className="glass-card p-6 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 group block">
                  <div className="aspect-video rounded-xl mb-6 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, hsla(45, 86%, 40%, 0.15), hsla(29, 38%, 30%, 0.1))' }}>
                    <ShoppingBag className="w-12 h-12 text-gold/50" />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gold font-medium">{c.country}</span>
                    <span className="text-xs text-muted-foreground px-2 py-1 rounded-full border border-border/50">
                      {filters.find(f => f.id === c.category)?.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 group-hover:text-gold transition-colors">{c.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{c.challenge}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {c.results.slice(0, 2).map((r, j) => (
                      <div key={j} className="text-center">
                        <div className="text-gold font-display font-bold text-lg">{r.value}</div>
                        <div className="text-muted-foreground text-xs">{r.metric}</div>
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                    {lang === 'es' ? 'Ver caso' : 'View case'} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              {lang === 'es' ? '¿Tu e-commerce podría ser el próximo?' : 'Could your e-commerce be next?'}
            </h2>
            <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> {lang === 'es' ? 'Quiero resultados así' : 'I want results like these'}
            </a>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default CasosDeExito;
