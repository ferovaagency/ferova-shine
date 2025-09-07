import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import WaveSeparator from '@/components/ui/wave-separator';
import { TrendingUp, ShoppingBag, Globe, Target, ArrowRight, Filter } from 'lucide-react';

interface CasosDeExitoProps {
  lang?: 'es' | 'en';
}

const CasosDeExito = ({ lang = 'es' }: CasosDeExitoProps) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const content = {
    es: {
      title: 'Casos de éxito',
      subtitle: 'Resultados reales de nuestros clientes. Conoce cómo hemos ayudado a e-commerces de Latinoamérica y Estados Unidos a crecer de forma sostenible.',
      breadcrumb: 'Casos de éxito',
      filters: [
        { id: 'all', label: 'Todos' },
        { id: 'fashion', label: 'Moda' },
        { id: 'electronics', label: 'Electrónicos' },
        { id: 'home', label: 'Hogar' },
        { id: 'beauty', label: 'Belleza' }
      ],
      cta: 'Ver caso completo',
      ctaMain: 'Quiero resultados así',
      cases: [
        {
          id: 'tienda-moda-latina',
          title: 'Tienda de moda latina',
          category: 'fashion',
          country: 'Colombia',
          challenge: 'Catálogo con 5k SKUs, contenido thin y Core Web Vitals deficientes',
          results: [
            { metric: 'Sesiones orgánicas', value: '+95%', period: '6 meses' },
            { metric: 'Revenue orgánico', value: '+128%', period: '6 meses' },
            { metric: 'Keywords Top-3', value: '32', period: 'nuevas' },
            { metric: 'LCP mejorado', value: '4.2s → 2.1s', period: 'optimización' }
          ],
          image: '/placeholder-case-fashion.jpg',
          href: '/casos-de-exito/tienda-moda-latina'
        },
        {
          id: 'electronics-usa',
          title: 'Electrónicos B2B',
          category: 'electronics',
          country: 'Estados Unidos',
          challenge: 'Competencia alta y arquitectura técnica compleja',
          results: [
            { metric: 'Tráfico orgánico', value: '+156%', period: '8 meses' },
            { metric: 'Conversión B2B', value: '+89%', period: '8 meses' },
            { metric: 'Keywords objetivo', value: '78%', period: 'top 10' },
            { metric: 'Tiempo de carga', value: '-43%', period: 'reducción' }
          ],
          image: '/placeholder-case-electronics.jpg',
          href: '/casos-de-exito/electronics-usa'
        },
        {
          id: 'home-decor-mexico',
          title: 'Decoración del hogar',
          category: 'home',
          country: 'México',
          challenge: 'Baja autoridad y competencia internacional',
          results: [
            { metric: 'Ventas online', value: '+203%', period: '10 meses' },
            { metric: 'Autoridad dominio', value: '28 → 45', period: 'DR score' },
            { metric: 'Mercados nuevos', value: '3', period: 'países' },
            { metric: 'CTR promedio', value: '+67%', period: 'mejora' }
          ],
          image: '/placeholder-case-home.jpg',
          href: '/casos-de-exito/home-decor-mexico'
        }
      ]
    },
    en: {
      title: 'Case studies',
      subtitle: 'Real results from our clients. Learn how we have helped e-commerces in Latin America and the United States grow sustainably.',
      breadcrumb: 'Case studies',
      filters: [
        { id: 'all', label: 'All' },
        { id: 'fashion', label: 'Fashion' },
        { id: 'electronics', label: 'Electronics' },
        { id: 'home', label: 'Home' },
        { id: 'beauty', label: 'Beauty' }
      ],
      cta: 'View full case',
      ctaMain: 'I want results like this',
      cases: [
        {
          id: 'latin-fashion-store',
          title: 'Latin fashion store',
          category: 'fashion',
          country: 'Colombia',
          challenge: 'Catalog with 5k SKUs, thin content and poor Core Web Vitals',
          results: [
            { metric: 'Organic sessions', value: '+95%', period: '6 months' },
            { metric: 'Organic revenue', value: '+128%', period: '6 months' },
            { metric: 'Keywords Top-3', value: '32', period: 'new' },
            { metric: 'LCP improved', value: '4.2s → 2.1s', period: 'optimization' }
          ],
          image: '/placeholder-case-fashion.jpg',
          href: '/en/case-studies/latin-fashion-store'
        },
        {
          id: 'electronics-usa',
          title: 'B2B Electronics',
          category: 'electronics',
          country: 'United States',
          challenge: 'High competition and complex technical architecture',
          results: [
            { metric: 'Organic traffic', value: '+156%', period: '8 months' },
            { metric: 'B2B conversion', value: '+89%', period: '8 months' },
            { metric: 'Target keywords', value: '78%', period: 'top 10' },
            { metric: 'Loading time', value: '-43%', period: 'reduction' }
          ],
          image: '/placeholder-case-electronics.jpg',
          href: '/en/case-studies/electronics-usa'
        },
        {
          id: 'home-decor-mexico',
          title: 'Home decoration',
          category: 'home',
          country: 'Mexico',
          challenge: 'Low authority and international competition',
          results: [
            { metric: 'Online sales', value: '+203%', period: '10 months' },
            { metric: 'Domain authority', value: '28 → 45', period: 'DR score' },
            { metric: 'New markets', value: '3', period: 'countries' },
            { metric: 'Average CTR', value: '+67%', period: 'improvement' }
          ],
          image: '/placeholder-case-home.jpg',
          href: '/en/case-studies/home-decor-mexico'
        }
      ]
    }
  };

  const data = content[lang];

  const filteredCases = selectedFilter === 'all' 
    ? data.cases 
    : data.cases.filter(case_ => case_.category === selectedFilter);

  return (
    <>
      <Header currentLang={lang} />
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <section className="pt-24 pb-8 bg-background">
          <div className="container mx-auto px-6">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link to={lang === 'es' ? '/' : '/en'} className="hover:text-gold transition-colors">
                {lang === 'es' ? 'Inicio' : 'Home'}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{data.breadcrumb}</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up">
                {data.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed animate-fade-up">
                {data.subtitle}
              </p>
            </div>
          </div>
        </section>

        <WaveSeparator className="text-surface" />

        {/* Filters and Cases */}
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 justify-center mb-16">
              {data.filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedFilter === filter.id
                      ? 'bg-gold text-gold-contrast'
                      : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Cases Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCases.map((case_, index) => (
                <div
                  key={case_.id}
                  className="glass-card p-6 hover-lift hover-glow group animate-fade-up rounded-2xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Case Image */}
                  <div className="aspect-video bg-gradient-subtle rounded-xl mb-6 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-gold" />
                    </div>
                  </div>

                  {/* Case Info */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gold font-medium">
                      {case_.country}
                    </span>
                    <span className="text-xs text-muted-foreground px-3 py-1 bg-white/5 rounded-full">
                      {data.filters.find(f => f.id === case_.category)?.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {case_.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {case_.challenge}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {case_.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="text-center">
                        <div className="text-gold font-bold text-lg">
                          {result.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {result.metric}
                        </div>
                        <div className="text-xs text-muted-foreground/70">
                          {result.period}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to={case_.href}
                    className="inline-flex items-center text-gold hover:text-gold-light font-semibold group-hover:translate-x-1 transition-all duration-200"
                  >
                    <span className="mr-2">{data.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WaveSeparator className="text-background" flip />

        {/* CTA Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {lang === 'es' 
                  ? '¿Tu e-commerce podría ser el próximo caso de éxito?' 
                  : 'Could your e-commerce be the next success story?'
                }
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {lang === 'es' 
                  ? 'Agenda una llamada estratégica y descubre cómo podemos replicar estos resultados en tu negocio.'
                  : 'Schedule a strategic call and discover how we can replicate these results in your business.'
                }
              </p>
              <button className="btn-gold">
                {data.ctaMain}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default CasosDeExito;