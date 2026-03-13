import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { Search, TrendingUp, Users, BarChart3, Plus, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface Props { lang?: 'es' | 'en'; }

const SeoEcommerce = ({ lang = 'es' }: Props) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const t = lang === 'es' ? {
    title: 'SEO para E-commerce',
    sub: 'Estrategia integral de posicionamiento orgánico diseñada específicamente para tiendas online que buscan aumentar sus ventas de forma sostenible.',
    cta: 'Solicitar diagnóstico',
    ctaSecondary: 'Ver casos de éxito',
    whatIncludes: 'Qué incluye nuestro servicio',
    process: 'Nuestro proceso',
    faqTitle: 'Preguntas frecuentes',
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
      { q: '¿Cómo miden el ROI del SEO?', a: 'Medimos tráfico orgánico, posiciones de keywords, conversiones orgánicas, revenue orgánico y reducción del CAC.' },
      { q: '¿Trabajamos con todas las plataformas?', a: 'Sí, Shopify, WooCommerce, Magento, PrestaShop, Vtex, Tiendanube y desarrollos a medida.' },
    ],
  } : {
    title: 'E-commerce SEO',
    sub: 'Comprehensive organic positioning strategy designed specifically for online stores looking to increase their sales sustainably.',
    cta: 'Request diagnosis',
    ctaSecondary: 'View case studies',
    whatIncludes: 'What our service includes',
    process: 'Our process',
    faqTitle: 'Frequently asked questions',
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
      { q: 'How do you measure SEO ROI?', a: 'We measure organic traffic, keyword positions, organic conversions, organic revenue and CAC reduction.' },
      { q: 'Do you work with all platforms?', a: 'Yes, Shopify, WooCommerce, Magento, PrestaShop, Vtex, Tiendanube and custom developments.' },
    ],
  };

  return (
    <>
      <Header currentLang={lang} />
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
                  <Link to={lang === 'es' ? '/casos-de-exito' : '/en/case-studies'} className="btn-outline-gold text-center">{t.ctaSecondary}</Link>
                </div>
              </div>
              <div className="glass-card p-8 text-center gold-glow">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, hsl(45 86% 40%), hsl(45 86% 52%))' }}>
                  <Search className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">{lang === 'es' ? 'Diagnóstico gratuito' : 'Free diagnosis'}</h3>
                <p className="text-muted-foreground">{lang === 'es' ? 'Análisis inicial sin costo de tu sitio web' : 'Free initial analysis of your website'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 md:py-28" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">{t.whatIncludes}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.features.map((f, i) => (
                <div key={i} className="glass-card p-6 hover:border-gold/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'hsla(45, 86%, 40%, 0.1)' }}>
                    <f.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
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
                    <span className="text-2xl font-display font-bold text-primary-foreground">{s.n}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-28" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-16">{t.faqTitle}</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {t.faqs.map((faq, i) => (
                <div key={i} className="glass-card overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 text-left flex items-center justify-between hover:bg-gold/5 transition-colors">
                    <h3 className="text-lg font-display font-semibold pr-4">{faq.q}</h3>
                    <Plus className={`w-5 h-5 text-gold transition-transform duration-200 flex-shrink-0 ${openFaq === i ? 'rotate-45' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6"><p className="text-muted-foreground leading-relaxed">{faq.a}</p></div>
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
              {lang === 'es' ? '¿Listo para dominar Google?' : 'Ready to dominate Google?'}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              {lang === 'es' ? 'Solicita tu diagnóstico SEO gratuito.' : 'Request your free SEO diagnosis.'}
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
