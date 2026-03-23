import { Map, Search, Rocket } from 'lucide-react';

interface ProcessSectionProps {
  lang?: 'es' | 'en' | 'pt';
}

const ProcessSection = ({ lang = 'es' }: ProcessSectionProps) => {
  const content = {
    es: {
      title: 'Cómo trabajamos',
      subtitle: 'Nuestra metodología probada en 3 pasos para transformar tu e-commerce',
      steps: [
        {
          icon: Map,
          number: '01',
          title: 'Customer Journey completo',
          description: 'Mapeamos cada etapa del recorrido de tu cliente, identificamos fricciones y descubrimos oportunidades de crecimiento orgánico.',
          details: ['Análisis de audiencia target', 'Mapeo de intención de búsqueda', 'Identificación de gaps competitivos']
        },
        {
          icon: Search,
          number: '02',
          title: 'Auditoría SEO del sitio',
          description: 'Evaluación técnica profunda de crawlabilidad, indexación, Core Web Vitals y arquitectura de información.',
          details: ['Análisis técnico completo', 'Evaluación de arquitectura', 'Optimización de velocidad']
        },
        {
          icon: Rocket,
          number: '03',
          title: 'Implementación & medición',
          description: 'Ejecutamos optimización on-page, creamos contenidos estratégicos, mejoramos el enlazado interno y monitoreamos resultados.',
          details: ['Optimización on-page', 'Estrategia de contenidos', 'Reportes y seguimiento']
        }
      ]
    },
    en: {
      title: 'How we work',
      subtitle: 'Our proven 3-step methodology to transform your e-commerce',
      steps: [
        {
          icon: Map,
          number: '01',
          title: 'Complete Customer Journey',
          description: 'We map each stage of your customer\'s journey, identify friction points and discover organic growth opportunities.',
          details: ['Target audience analysis', 'Search intent mapping', 'Competitive gap identification']
        },
        {
          icon: Search,
          number: '02',
          title: 'Site SEO Audit',
          description: 'Deep technical evaluation of crawlability, indexation, Core Web Vitals and information architecture.',
          details: ['Complete technical analysis', 'Architecture evaluation', 'Speed optimization']
        },
        {
          icon: Rocket,
          number: '03',
          title: 'Implementation & measurement',
          description: 'We execute on-page optimization, create strategic content, improve internal linking and monitor results.',
          details: ['On-page optimization', 'Content strategy', 'Reporting and monitoring']
        }
      ]
    }
  };

  const data = content[lang];

  return (
    <section className="py-24 bg-subtle relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent"></div>
      
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

        {/* Process Steps */}
        <div className="space-y-16 lg:space-y-24">
          {data.steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 1;
            
            return (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1 text-center lg:text-left animate-fade-up">
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <span className="text-6xl font-bold text-gold/20 mr-4">
                      {step.number}
                    </span>
                    <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-3 text-foreground">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center justify-center lg:justify-start">
                        <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className="flex-1 flex justify-center">
                  <div className="glass-card p-12 w-full max-w-md hover-lift">
                    <div className="aspect-square bg-gradient-subtle rounded-3xl flex items-center justify-center">
                      <IconComponent className="w-24 h-24 text-gold" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;