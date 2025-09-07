import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import WaveSeparator from '@/components/ui/wave-separator';
import { Search, Monitor, Target, ArrowRight, CheckCircle } from 'lucide-react';

interface ServiciosProps {
  lang?: 'es' | 'en';
}

const Servicios = ({ lang = 'es' }: ServiciosProps) => {
  const content = {
    es: {
      title: 'Nuestros servicios',
      subtitle: 'Soluciones especializadas para hacer crecer tu e-commerce con estrategia, diseño y tecnología de vanguardia.',
      breadcrumb: 'Servicios',
      services: [
        {
          icon: Search,
          title: 'SEO para e-commerce',
          description: 'Estrategia integral de posicionamiento orgánico diseñada específicamente para tiendas online que buscan aumentar sus ventas.',
          features: [
            'Auditoría técnica SEO completa',
            'Arquitectura de información optimizada',
            'Keyword research estratégico',
            'Optimización on-page avanzada',
            'Content marketing especializado',
            'Link building de calidad',
            'SEO internacional',
            'Dashboards de rendimiento'
          ],
          cta: 'Conocer más',
          href: '/servicios/seo-ecommerce',
          price: 'Desde $2,500 USD/mes'
        },
        {
          icon: Monitor,
          title: 'Diseño de sitios web',
          description: 'Desarrollo web enfocado en conversión, velocidad y experiencia de usuario premium para e-commerce de alto rendimiento.',
          features: [
            'Diseño UI/UX profesional',
            'Desarrollo responsive',
            'Optimización Core Web Vitals',
            'Integración e-commerce',
            'Checkout optimizado',
            'Mobile-first approach',
            'Testing A/B',
            'Mantenimiento continuo'
          ],
          cta: 'Ver portfolio',
          href: '/servicios/diseno-web',
          price: 'Desde $5,000 USD'
        },
        {
          icon: Target,
          title: 'Ads / Pauta digital',
          description: 'Campañas publicitarias estratégicas en Google Ads, Shopping y redes sociales para maximizar el ROI de tu inversión publicitaria.',
          features: [
            'Google Ads & Shopping',
            'Facebook e Instagram Ads',
            'Análisis de audiencia',
            'Creatividades optimizadas',
            'Seguimiento conversiones',
            'Reportes detallados',
            'Optimización continua',
            'Escalado rentable'
          ],
          cta: 'Solicitar propuesta',
          href: '/servicios/ads',
          price: 'Desde $1,500 USD/mes + Ad spend'
        }
      ]
    },
    en: {
      title: 'Our services',
      subtitle: 'Specialized solutions to grow your e-commerce with cutting-edge strategy, design and technology.',
      breadcrumb: 'Services',
      services: [
        {
          icon: Search,
          title: 'E-commerce SEO',
          description: 'Comprehensive organic positioning strategy designed specifically for online stores looking to increase their sales.',
          features: [
            'Complete technical SEO audit',
            'Optimized information architecture',
            'Strategic keyword research',
            'Advanced on-page optimization',
            'Specialized content marketing',
            'Quality link building',
            'International SEO',
            'Performance dashboards'
          ],
          cta: 'Learn more',
          href: '/en/services/ecommerce-seo',
          price: 'From $2,500 USD/month'
        },
        {
          icon: Monitor,
          title: 'Web design',
          description: 'Web development focused on conversion, speed and premium user experience for high-performance e-commerce.',
          features: [
            'Professional UI/UX design',
            'Responsive development',
            'Core Web Vitals optimization',
            'E-commerce integration',
            'Optimized checkout',
            'Mobile-first approach',
            'A/B testing',
            'Continuous maintenance'
          ],
          cta: 'View portfolio',
          href: '/en/services/web-design',
          price: 'From $5,000 USD'
        },
        {
          icon: Target,
          title: 'Digital advertising',
          description: 'Strategic advertising campaigns on Google Ads, Shopping and social networks to maximize your advertising investment ROI.',
          features: [
            'Google Ads & Shopping',
            'Facebook & Instagram Ads',
            'Audience analysis',
            'Optimized creatives',
            'Conversion tracking',
            'Detailed reporting',
            'Continuous optimization',
            'Profitable scaling'
          ],
          cta: 'Request proposal',
          href: '/en/services/ads',
          price: 'From $1,500 USD/month + Ad spend'
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
              <span className="text-foreground">{data.breadcrumb}</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-background relative overflow-hidden">
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

        {/* Services Grid */}
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {data.services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    className="glass-card p-8 hover-lift hover-glow group animate-fade-up rounded-2xl"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-gold-contrast" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Price */}
                    <div className="text-gold font-semibold mb-6">
                      {service.price}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm text-foreground">
                          <CheckCircle className="w-4 h-4 text-gold mr-3 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      to={service.href}
                      className="inline-flex items-center text-gold hover:text-gold-light font-semibold group-hover:translate-x-1 transition-all duration-200"
                    >
                      <span className="mr-2">{service.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <WaveSeparator className="text-background" flip />

        {/* CTA Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {lang === 'es' ? '¿Listo para hacer crecer tu e-commerce?' : 'Ready to grow your e-commerce?'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {lang === 'es' 
                ? 'Agenda una llamada estratégica gratuita y descubre cómo podemos impulsar tu negocio online.'
                : 'Schedule a free strategic call and discover how we can boost your online business.'
              }
            </p>
            <button className="btn-gold">
              {lang === 'es' ? 'Agendar una llamada' : 'Schedule a call'}
            </button>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default Servicios;