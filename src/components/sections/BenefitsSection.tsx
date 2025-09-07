import { Target, TrendingUp, Settings, FileText } from 'lucide-react';

interface BenefitsSectionProps {
  lang?: 'es' | 'en';
}

const BenefitsSection = ({ lang = 'es' }: BenefitsSectionProps) => {
  const content = {
    es: {
      title: '¿Por qué elegir Ferova Agency?',
      subtitle: 'Resultados medibles que impactan directamente en el crecimiento de tu negocio',
      benefits: [
        {
          icon: Target,
          title: 'Tráfico calificado',
          description: 'Atraemos visitantes que realmente están listos para comprar en tu tienda online.'
        },
        {
          icon: TrendingUp,
          title: 'Conversión orgánica',
          description: 'Optimizamos cada punto de contacto para maximizar las ventas desde búsquedas orgánicas.'
        },
        {
          icon: Settings,
          title: 'SEO técnico robusto',
          description: 'Estructura sólida que escala con tu crecimiento y mejora la experiencia del usuario.'
        },
        {
          icon: FileText,
          title: 'Contenido que posiciona',
          description: 'Estrategia editorial que conecta con tu audiencia y domina los resultados de búsqueda.'
        }
      ]
    },
    en: {
      title: 'Why choose Ferova Agency?',
      subtitle: 'Measurable results that directly impact your business growth',
      benefits: [
        {
          icon: Target,
          title: 'Qualified traffic',
          description: 'We attract visitors who are genuinely ready to purchase from your online store.'
        },
        {
          icon: TrendingUp,
          title: 'Organic conversion',
          description: 'We optimize every touchpoint to maximize sales from organic searches.'
        },
        {
          icon: Settings,
          title: 'Robust technical SEO',
          description: 'Solid structure that scales with your growth and improves user experience.'
        },
        {
          icon: FileText,
          title: 'Content that ranks',
          description: 'Editorial strategy that connects with your audience and dominates search results.'
        }
      ]
    }
  };

  const data = content[lang];

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up">
            {data.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up">
            {data.subtitle}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 text-center hover-lift hover-glow group animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;