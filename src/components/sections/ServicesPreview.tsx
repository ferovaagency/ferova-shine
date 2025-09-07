import { ArrowRight, Search, Monitor, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServicesPreviewProps {
  lang?: 'es' | 'en';
}

const ServicesPreview = ({ lang = 'es' }: ServicesPreviewProps) => {
  const content = {
    es: {
      title: 'Nuestros servicios',
      subtitle: 'Soluciones integrales para hacer crecer tu e-commerce',
      cta: 'Ver todos los servicios',
      services: [
        {
          icon: Search,
          title: 'SEO para e-commerce',
          description: 'Estrategia completa de posicionamiento orgánico diseñada específicamente para tiendas online.',
          features: ['Auditoría técnica completa', 'Optimización de arquitectura', 'Contenido estratégico', 'Link building especializado'],
          href: '/servicios/seo-ecommerce'
        },
        {
          icon: Monitor,
          title: 'Diseño de sitios web',
          description: 'Desarrollo web enfocado en conversión, velocidad y experiencia de usuario premium.',
          features: ['Diseño UI/UX profesional', 'Desarrollo responsive', 'Optimización Core Web Vitals', 'Integración e-commerce'],
          href: '/servicios/diseno-web'
        },
        {
          icon: Target,
          title: 'Ads / Pauta digital',
          description: 'Campañas publicitarias estratégicas en Google Ads, Shopping y redes sociales.',
          features: ['Google Ads & Shopping', 'Social Media Ads', 'Análisis de audiencia', 'Reportes detallados'],
          href: '/servicios/ads'
        }
      ]
    },
    en: {
      title: 'Our services',
      subtitle: 'Comprehensive solutions to grow your e-commerce',
      cta: 'View all services',
      services: [
        {
          icon: Search,
          title: 'E-commerce SEO',
          description: 'Complete organic positioning strategy designed specifically for online stores.',
          features: ['Complete technical audit', 'Architecture optimization', 'Strategic content', 'Specialized link building'],
          href: '/en/services/ecommerce-seo'
        },
        {
          icon: Monitor,
          title: 'Web design',
          description: 'Web development focused on conversion, speed and premium user experience.',
          features: ['Professional UI/UX design', 'Responsive development', 'Core Web Vitals optimization', 'E-commerce integration'],
          href: '/en/services/web-design'
        },
        {
          icon: Target,
          title: 'Digital advertising',
          description: 'Strategic advertising campaigns on Google Ads, Shopping and social networks.',
          features: ['Google Ads & Shopping', 'Social Media Ads', 'Audience analysis', 'Detailed reporting'],
          href: '/en/services/ads'
        }
      ]
    }
  };

  const data = content[lang];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up">
            {data.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up">
            {data.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {data.services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 hover-lift hover-glow group animate-fade-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-foreground">
                      <div className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={service.href}
                  className="inline-flex items-center text-gold hover:text-gold-dark font-semibold group-hover:translate-x-1 transition-all duration-200"
                >
                  <span className="mr-2">Saber más</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Section CTA */}
        <div className="text-center animate-fade-up">
          <Link
            to={lang === 'es' ? '/servicios' : '/en/services'}
            className="btn-outline-gold"
          >
            {data.cta}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;