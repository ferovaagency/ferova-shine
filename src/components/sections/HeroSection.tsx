import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import WaveSeparator from '../ui/wave-separator';
import heroBg from '@/assets/hero-bg.jpg';

interface HeroSectionProps {
  lang?: 'es' | 'en';
}

const HeroSection = ({ lang = 'es' }: HeroSectionProps) => {
  const content = {
    es: {
      headline: 'Agencia boutique de SEO para e-commerce que impulsa ventas reales',
      subheadline: 'Estrategia, contenido y técnica para crecer tráfico y revenue orgánico.',
      primaryCta: 'Agendar una llamada',
      secondaryCta: 'Ver casos de éxito',
      stats: [
        { number: '300%', label: 'Crecimiento promedio en tráfico orgánico' },
        { number: '6', label: 'Meses para ver resultados significativos' },
        { number: '50+', label: 'E-commerces transformados' }
      ]
    },
    en: {
      headline: 'Boutique SEO agency for e-commerce that drives real sales',
      subheadline: 'Strategy, content and technical expertise to grow organic traffic and revenue.',
      primaryCta: 'Schedule a call',
      secondaryCta: 'View case studies',
      stats: [
        { number: '300%', label: 'Average organic traffic growth' },
        { number: '6', label: 'Months to see significant results' },
        { number: '50+', label: 'E-commerces transformed' }
      ]
    }
  };

  const data = content[lang];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-background/80"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gold/3 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 pt-32 pb-20 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-fade-up">
            <span className="text-foreground">Agencia boutique de </span>
            <span className="text-gradient-gold">SEO para e-commerce</span>
            <span className="text-foreground"> que impulsa </span>
            <span className="text-gradient-gold">ventas reales</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-up">
            {data.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-fade-up">
            <button className="btn-gold group flex items-center space-x-3">
              <span>{data.primaryCta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <Link
              to={lang === 'es' ? '/casos-de-exito' : '/en/case-studies'}
              className="btn-outline-gold group flex items-center space-x-3"
            >
              <Play className="w-4 h-4" />
              <span>{data.secondaryCta}</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto animate-fade-up">
            {data.stats.map((stat, index) => (
              <div key={index} className="glass-card p-8 hover-lift hover-glow">
                <div className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <WaveSeparator className="bottom-0" />
    </section>
  );
};

export default HeroSection;