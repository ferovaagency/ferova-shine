import { Star, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  lang?: 'es' | 'en';
}

const TestimonialsSection = ({ lang = 'es' }: TestimonialsSectionProps) => {
  const content = {
    es: {
      title: 'Lo que dicen nuestros clientes',
      subtitle: 'Testimonios reales de e-commerces que han transformado sus resultados',
      testimonials: [
        {
          name: 'Carlos Mendoza',
          position: 'CEO, Tienda Moda Latina',
          company: 'E-commerce de moda',
          content: 'Ferova Agency transformó completamente nuestro SEO. En 6 meses aumentamos el tráfico orgánico en 128% y las ventas orgánicas en 95%. Su enfoque boutique y atención personalizada hacen la diferencia.',
          rating: 5,
          results: '+128% tráfico orgánico'
        },
        {
          name: 'Ana Rodríguez',
          position: 'Directora de Marketing',
          company: 'Belleza Natural Store',
          content: 'El equipo de Maria Fer no solo optimizó nuestro sitio técnicamente, sino que crearon una estrategia de contenido que realmente conecta con nuestra audiencia. Los resultados hablan por sí solos.',
          rating: 5,
          results: '+200% conversiones'
        }
      ]
    },
    en: {
      title: 'What our clients say',
      subtitle: 'Real testimonials from e-commerces that have transformed their results',
      testimonials: [
        {
          name: 'Carlos Mendoza',
          position: 'CEO, Latin Fashion Store',
          company: 'Fashion e-commerce',
          content: 'Ferova Agency completely transformed our SEO. In 6 months we increased organic traffic by 128% and organic sales by 95%. Their boutique approach and personalized attention make the difference.',
          rating: 5,
          results: '+128% organic traffic'
        },
        {
          name: 'Ana Rodríguez',
          position: 'Marketing Director',
          company: 'Natural Beauty Store',
          content: 'Maria Fer\'s team not only technically optimized our site, but created a content strategy that truly connects with our audience. The results speak for themselves.',
          rating: 5,
          results: '+200% conversions'
        }
      ]
    }
  };

  const data = content[lang];

  return (
    <section className="py-24 bg-subtle relative">
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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {data.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-card p-8 hover-lift hover-glow animate-fade-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-gold" />
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-foreground text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              {/* Results Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-gold text-white text-sm font-semibold rounded-full mb-6">
                {testimonial.results}
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;