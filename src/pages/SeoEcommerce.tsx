import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import WaveSeparator from '@/components/ui/wave-separator';
import { Search, TrendingUp, Users, BarChart3, CheckCircle, Plus } from 'lucide-react';
import { useState } from 'react';

interface SeoEcommerceProps {
  lang?: 'es' | 'en';
}

const SeoEcommerce = ({ lang = 'es' }: SeoEcommerceProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const content = {
    es: {
      title: 'SEO para e-commerce',
      subtitle: 'Estrategia integral de posicionamiento orgánico diseñada específicamente para tiendas online que buscan aumentar sus ventas de forma sostenible.',
      breadcrumb: 'SEO para e-commerce',
      cta: 'Solicitar diagnóstico',
      ctaSecondary: 'Ver casos de éxito',
      whatIncludes: 'Qué incluye nuestro servicio',
      process: 'Nuestro proceso',
      faqTitle: 'Preguntas frecuentes',
      features: [
        {
          icon: Search,
          title: 'Auditoría técnica completa',
          description: 'Análisis profundo de crawlabilidad, indexación, Core Web Vitals y arquitectura del sitio.'
        },
        {
          icon: TrendingUp,
          title: 'Keyword research estratégico',
          description: 'Investigación exhaustiva de palabras clave con potencial comercial y análisis de competencia.'
        },
        {
          icon: Users,
          title: 'Optimización on-page',
          description: 'Optimización de títulos, meta descriptions, URLs, contenido y estructura interna.'
        },
        {
          icon: BarChart3,
          title: 'Link building especializado',
          description: 'Estrategia de construcción de enlaces de calidad específica para e-commerce.'
        }
      ],
      processSteps: [
        {
          step: '01',
          title: 'Diagnóstico inicial',
          description: 'Auditoría completa del sitio, análisis de competencia y definición de objetivos SMART.'
        },
        {
          step: '02',
          title: 'Estrategia personalizada',
          description: 'Creación de roadmap SEO específico basado en los hallazgos y objetivos del negocio.'
        },
        {
          step: '03',
          title: 'Implementación',
          description: 'Ejecución de optimizaciones técnicas, contenido y construcción de enlaces.'
        },
        {
          step: '04',
          title: 'Monitoreo y ajustes',
          description: 'Seguimiento continuo del rendimiento y optimización basada en datos.'
        }
      ],
      faqs: [
        {
          question: '¿Cuánto tiempo toma ver resultados en SEO?',
          answer: 'Los primeros resultados visibles suelen aparecer entre 3-6 meses, dependiendo de la competitividad del nicho y el estado inicial del sitio. Los resultados significativos se consolidan entre 6-12 meses.'
        },
        {
          question: '¿Qué diferencia el SEO para e-commerce del SEO tradicional?',
          answer: 'El SEO para e-commerce requiere estrategias específicas como optimización de fichas de producto, gestión de inventario, SEO para filtros y facetas, optimización del checkout, y manejo de contenido duplicado común en tiendas online.'
        },
        {
          question: '¿Cómo miden el ROI del SEO?',
          answer: 'Medimos el ROI a través de métricas específicas como tráfico orgánico, posiciones de keywords comerciales, conversiones orgánicas, revenue orgánico y reducción del costo de adquisición de clientes.'
        },
        {
          question: '¿Trabajamos con todas las plataformas de e-commerce?',
          answer: 'Sí, trabajamos con las principales plataformas como Shopify, WooCommerce, Magento, PrestaShop, Vtex, Tiendanube, y desarrollos a medida. Cada plataforma tiene sus particularidades SEO que conocemos en profundidad.'
        }
      ]
    },
    en: {
      title: 'E-commerce SEO',
      subtitle: 'Comprehensive organic positioning strategy designed specifically for online stores looking to increase their sales sustainably.',
      breadcrumb: 'E-commerce SEO',
      cta: 'Request diagnosis',
      ctaSecondary: 'View case studies',
      whatIncludes: 'What our service includes',
      process: 'Our process',
      faqTitle: 'Frequently asked questions',
      features: [
        {
          icon: Search,
          title: 'Complete technical audit',
          description: 'Deep analysis of crawlability, indexation, Core Web Vitals and site architecture.'
        },
        {
          icon: TrendingUp,
          title: 'Strategic keyword research',
          description: 'Comprehensive keyword research with commercial potential and competitive analysis.'
        },
        {
          icon: Users,
          title: 'On-page optimization',
          description: 'Optimization of titles, meta descriptions, URLs, content and internal structure.'
        },
        {
          icon: BarChart3,
          title: 'Specialized link building',
          description: 'Quality link building strategy specific to e-commerce.'
        }
      ],
      processSteps: [
        {
          step: '01',
          title: 'Initial diagnosis',
          description: 'Complete site audit, competitive analysis and SMART objectives definition.'
        },
        {
          step: '02',
          title: 'Personalized strategy',
          description: 'Creation of specific SEO roadmap based on findings and business objectives.'
        },
        {
          step: '03',
          title: 'Implementation',
          description: 'Execution of technical optimizations, content and link building.'
        },
        {
          step: '04',
          title: 'Monitoring and adjustments',
          description: 'Continuous performance tracking and data-based optimization.'
        }
      ],
      faqs: [
        {
          question: 'How long does it take to see SEO results?',
          answer: 'The first visible results usually appear between 3-6 months, depending on niche competitiveness and initial site state. Significant results are consolidated between 6-12 months.'
        },
        {
          question: 'What differentiates e-commerce SEO from traditional SEO?',
          answer: 'E-commerce SEO requires specific strategies such as product page optimization, inventory management, SEO for filters and facets, checkout optimization, and duplicate content handling common in online stores.'
        },
        {
          question: 'How do you measure SEO ROI?',
          answer: 'We measure ROI through specific metrics such as organic traffic, commercial keyword positions, organic conversions, organic revenue and customer acquisition cost reduction.'
        },
        {
          question: 'Do you work with all e-commerce platforms?',
          answer: 'Yes, we work with major platforms like Shopify, WooCommerce, Magento, PrestaShop, Vtex, Tiendanube, and custom developments. Each platform has its SEO particularities that we know in depth.'
        }
      ]
    }
  };

  const data = content[lang];

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
              <Link to={lang === 'es' ? '/servicios' : '/en/services'} className="hover:text-gold transition-colors">
                {lang === 'es' ? 'Servicios' : 'Services'}
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
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  {data.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                  {data.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-gold">
                    {data.cta}
                  </button>
                  <Link to={lang === 'es' ? '/casos-de-exito' : '/en/case-studies'} className="btn-outline-gold">
                    {data.ctaSecondary}
                  </Link>
                </div>
              </div>
              
              <div className="animate-fade-up relative">
                <div className="glass-card p-8 rounded-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 text-gold-contrast" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {lang === 'es' ? 'Diagnóstico gratuito' : 'Free diagnosis'}
                    </h3>
                    <p className="text-muted-foreground">
                      {lang === 'es' 
                        ? 'Análisis inicial sin costo de tu sitio web'
                        : 'Free initial analysis of your website'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WaveSeparator className="text-surface" />

        {/* What Includes Section */}
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {data.whatIncludes}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="glass-card p-6 hover-lift group animate-fade-up rounded-2xl"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-gold-contrast" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <WaveSeparator className="text-background" flip />

        {/* Process Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {data.process}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.processSteps.map((step, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-gold-contrast">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WaveSeparator className="text-surface" />

        {/* FAQ Section */}
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {data.faqTitle}
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {data.faqs.map((faq, index) => (
                <div key={index} className="glass-card rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                    <Plus 
                      className={`w-5 h-5 text-gold transition-transform duration-200 flex-shrink-0 ${
                        openFaq === index ? 'rotate-45' : ''
                      }`} 
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <WaveSeparator className="text-background" flip />

        {/* CTA Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {lang === 'es' ? '¿Listo para dominar Google?' : 'Ready to dominate Google?'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {lang === 'es' 
                ? 'Solicita tu diagnóstico SEO gratuito y descubre el potencial oculto de tu e-commerce.'
                : 'Request your free SEO diagnosis and discover the hidden potential of your e-commerce.'
              }
            </p>
            <button className="btn-gold">
              {data.cta}
            </button>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default SeoEcommerce;