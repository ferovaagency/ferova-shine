import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import WaveSeparator from '@/components/ui/wave-separator';
import { Monitor, Zap, Smartphone, Search, CheckCircle, ArrowRight, Palette, Code, BarChart3 } from 'lucide-react';

interface DiseneoWebProps {
  lang?: 'es' | 'en';
}

const DiseneoWeb = ({ lang = 'es' }: DiseneoWebProps) => {
  const content = {
    es: {
      title: 'Diseño de sitios web',
      subtitle: 'Desarrollo web enfocado en conversión, velocidad y experiencia de usuario premium para e-commerce de alto rendimiento.',
      breadcrumb: 'Diseño de sitios web',
      cta: 'Cotizar diseño',
      ctaSecondary: 'Ver portfolio',
      whatIncludes: 'Qué incluye nuestro servicio',
      process: 'Nuestro proceso de diseño',
      deliverables: 'Entregables',
      features: [
        {
          icon: Palette,
          title: 'Diseño UI/UX profesional',
          description: 'Interfaces intuitivas y atractivas que convierten visitantes en clientes.'
        },
        {
          icon: Smartphone,
          title: 'Desarrollo responsive',
          description: 'Experiencia perfecta en todos los dispositivos y tamaños de pantalla.'
        },
        {
          icon: Zap,
          title: 'Core Web Vitals',
          description: 'Optimización de velocidad y rendimiento para mejor SEO y UX.'
        },
        {
          icon: Search,
          title: 'SEO-friendly',
          description: 'Estructura optimizada para motores de búsqueda desde el desarrollo.'
        }
      ],
      processSteps: [
        {
          step: '01',
          title: 'Discovery & Research',
          description: 'Análisis profundo de tu negocio, competencia y audiencia objetivo.',
          deliverables: ['Brief de proyecto', 'Investigación UX', 'Arquitectura de información']
        },
        {
          step: '02',
          title: 'Wireframes & Prototipos',
          description: 'Estructuración de contenido y flujos de usuario optimizados.',
          deliverables: ['Wireframes detallados', 'Prototipo interactivo', 'Flujos de usuario']
        },
        {
          step: '03',
          title: 'Diseño Visual',
          description: 'Creación de la identidad visual y componentes de interfaz.',
          deliverables: ['UI Kit completo', 'Diseños finales', 'Guía de estilo']
        },
        {
          step: '04',
          title: 'Desarrollo & Testing',
          description: 'Desarrollo frontend/backend y pruebas exhaustivas pre-lanzamiento.',
          deliverables: ['Sitio web completo', 'Testing QA', 'Documentación técnica']
        }
      ],
      techStack: [
        'React/Next.js',
        'TypeScript',
        'Tailwind CSS',
        'WordPress/Headless CMS',
        'Shopify/WooCommerce',
        'Vercel/Netlify'
      ],
      pricing: {
        landing: {
          title: 'Landing Page',
          price: 'Desde $2,500 USD',
          features: [
            'Diseño responsivo',
            'Optimización conversión',
            'Integración analytics',
            'Formularios contacto',
            'SEO on-page',
            '30 días soporte'
          ]
        },
        ecommerce: {
          title: 'E-commerce Completo',
          price: 'Desde $8,500 USD',
          features: [
            'Catálogo productos',
            'Carrito y checkout',
            'Pasarelas de pago',
            'Panel administración',
            'SEO avanzado',
            'Integraciones API',
            '60 días soporte'
          ]
        }
      }
    },
    en: {
      title: 'Web design',
      subtitle: 'Web development focused on conversion, speed and premium user experience for high-performance e-commerce.',
      breadcrumb: 'Web design',
      cta: 'Request quote',
      ctaSecondary: 'View portfolio',
      whatIncludes: 'What our service includes',
      process: 'Our design process',
      deliverables: 'Deliverables',
      features: [
        {
          icon: Palette,
          title: 'Professional UI/UX design',
          description: 'Intuitive and attractive interfaces that convert visitors into customers.'
        },
        {
          icon: Smartphone,
          title: 'Responsive development',
          description: 'Perfect experience across all devices and screen sizes.'
        },
        {
          icon: Zap,
          title: 'Core Web Vitals',
          description: 'Speed and performance optimization for better SEO and UX.'
        },
        {
          icon: Search,
          title: 'SEO-friendly',
          description: 'Structure optimized for search engines from development.'
        }
      ],
      processSteps: [
        {
          step: '01',
          title: 'Discovery & Research',
          description: 'Deep analysis of your business, competition and target audience.',
          deliverables: ['Project brief', 'UX research', 'Information architecture']
        },
        {
          step: '02',
          title: 'Wireframes & Prototypes',
          description: 'Content structuring and optimized user flows.',
          deliverables: ['Detailed wireframes', 'Interactive prototype', 'User flows']
        },
        {
          step: '03',
          title: 'Visual Design',
          description: 'Creation of visual identity and interface components.',
          deliverables: ['Complete UI Kit', 'Final designs', 'Style guide']
        },
        {
          step: '04',
          title: 'Development & Testing',
          description: 'Frontend/backend development and exhaustive pre-launch testing.',
          deliverables: ['Complete website', 'QA testing', 'Technical documentation']
        }
      ],
      techStack: [
        'React/Next.js',
        'TypeScript',
        'Tailwind CSS',
        'WordPress/Headless CMS',
        'Shopify/WooCommerce',
        'Vercel/Netlify'
      ],
      pricing: {
        landing: {
          title: 'Landing Page',
          price: 'From $2,500 USD',
          features: [
            'Responsive design',
            'Conversion optimization',
            'Analytics integration',
            'Contact forms',
            'On-page SEO',
            '30 days support'
          ]
        },
        ecommerce: {
          title: 'Complete E-commerce',
          price: 'From $8,500 USD',
          features: [
            'Product catalog',
            'Cart and checkout',
            'Payment gateways',
            'Admin panel',
            'Advanced SEO',
            'API integrations',
            '60 days support'
          ]
        }
      }
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
              
              <div className="animate-fade-up">
                <div className="glass-card p-8 rounded-2xl">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                      <Monitor className="w-10 h-10 text-gold-contrast" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {lang === 'es' ? 'Tecnología Stack' : 'Technology Stack'}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {data.techStack.map((tech, index) => (
                      <div key={index} className="text-center p-3 bg-white/5 rounded-lg">
                        <span className="text-sm text-foreground">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WaveSeparator className="text-surface" />

        {/* Features Section */}
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

            <div className="space-y-12">
              {data.processSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row gap-12 items-center animate-fade-up ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mr-4">
                        <span className="text-lg font-bold text-gold-contrast">{step.step}</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {step.description}
                    </p>
                    
                    <div>
                      <h4 className="text-gold font-semibold mb-3">{data.deliverables}</h4>
                      <ul className="space-y-2">
                        {step.deliverables.map((deliverable, deliverableIndex) => (
                          <li key={deliverableIndex} className="flex items-center text-sm text-foreground">
                            <CheckCircle className="w-4 h-4 text-gold mr-3 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-80 glass-card p-6 rounded-2xl">
                    <div className="aspect-video bg-gradient-subtle rounded-lg flex items-center justify-center">
                      <Code className="w-12 h-12 text-gold" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WaveSeparator className="text-surface" />

        {/* Pricing Section */}
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {lang === 'es' ? 'Planes y precios' : 'Plans and pricing'}
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {Object.entries(data.pricing).map(([key, plan]) => (
                <div key={key} className="glass-card p-8 hover-lift rounded-2xl">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {plan.title}
                    </h3>
                    <div className="text-3xl font-bold text-gold mb-4">
                      {plan.price}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-foreground">
                        <CheckCircle className="w-5 h-5 text-gold mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="btn-gold w-full">
                    {data.cta}
                  </button>
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
              {lang === 'es' ? '¿Listo para tu nuevo sitio web?' : 'Ready for your new website?'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {lang === 'es' 
                ? 'Agenda una llamada para discutir tu proyecto y recibe una cotización personalizada.'
                : 'Schedule a call to discuss your project and receive a personalized quote.'
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

export default DiseneoWeb;