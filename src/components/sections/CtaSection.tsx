import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WaveSeparator from '../ui/wave-separator';

interface CtaSectionProps {
  lang?: 'es' | 'en';
}

const CtaSection = ({ lang = 'es' }: CtaSectionProps) => {
  const content = {
    es: {
      title: '¿Listo para hacer crecer tu e-commerce?',
      subtitle: 'Agenda una consultoría gratuita y descubre cómo podemos impulsar tus ventas orgánicas.',
      primaryCta: 'Agendar una llamada',
      secondaryCta: 'Ver casos de éxito',
      features: [
        'Consultoría gratuita de 30 minutos',
        'Análisis preliminar de tu sitio',
        'Propuesta personalizada'
      ]
    },
    en: {
      title: 'Ready to grow your e-commerce?',
      subtitle: 'Schedule a free consultation and discover how we can boost your organic sales.',
      primaryCta: 'Schedule a call',
      secondaryCta: 'View case studies',
      features: [
        'Free 30-minute consultation',
        'Preliminary site analysis',
        'Personalized proposal'
      ]
    }
  };

  const data = content[lang];

  return (
    <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/10 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-tr from-gold/5 to-transparent"></div>
      
      {/* Wave separator at top */}
      <WaveSeparator className="top-0 transform rotate-180" color="dark" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
            {data.title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed animate-fade-up">
            {data.subtitle}
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {data.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center md:justify-start space-x-3 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0"></div>
                <span className="text-secondary-foreground">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-up">
            <button className="btn-gold group flex items-center space-x-3">
              <Phone className="w-5 h-5" />
              <span>{data.primaryCta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <Link
              to={lang === 'es' ? '/casos-de-exito' : '/en/case-studies'}
              className="text-secondary-foreground hover:text-gold font-semibold flex items-center space-x-2 transition-colors duration-200"
            >
              <span>{data.secondaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;