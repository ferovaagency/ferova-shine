import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/motion';
import { motion } from 'framer-motion';

interface TestimonialsSectionProps {
  lang?: 'es' | 'en' | 'pt';
}

const TestimonialsSection = ({ lang = 'es' }: TestimonialsSectionProps) => {
  const [current, setCurrent] = useState(0);

  const content = {
    es: {
      title: 'Reseñas de nuestros clientes',
      subtitle: 'Lo que dicen en Google sobre Ferova Agency',
      badge: 'Google Reviews',
      rating: '5.0',
      reviewCount: '12 reseñas',
      testimonials: [
        {
          name: 'Carlos M.',
          date: 'Hace 2 meses',
          content: 'Ferova Agency transformó completamente nuestro SEO. En 6 meses aumentamos el tráfico orgánico en 128% y las ventas orgánicas en 95%. Su enfoque boutique y atención personalizada hacen la diferencia.',
          rating: 5,
        },
        {
          name: 'Ana R.',
          date: 'Hace 3 meses',
          content: 'El equipo de Maria Fer no solo optimizó nuestro sitio técnicamente, sino que crearon una estrategia de contenido que realmente conecta con nuestra audiencia. Los resultados hablan por sí solos.',
          rating: 5,
        },
        {
          name: 'David L.',
          date: 'Hace 1 mes',
          content: 'Pasamos de 3 a 10 millones en ventas en solo 3 meses. El rediseño del sitio y la estrategia SEO fueron clave. Totalmente recomendados.',
          rating: 5,
        },
        {
          name: 'Laura G.',
          date: 'Hace 4 meses',
          content: 'Ya no me preocupo por hackeos ni plugins. Mi tienda está segura y carga al instante. La campaña de Google Ads generó 100 llamadas diarias. Increíble.',
          rating: 5,
        },
      ],
    },
    en: {
      title: 'Client Reviews',
      subtitle: 'What they say on Google about Ferova Agency',
      badge: 'Google Reviews',
      rating: '5.0',
      reviewCount: '12 reviews',
      testimonials: [
        {
          name: 'Carlos M.',
          date: '2 months ago',
          content: 'Ferova Agency completely transformed our SEO. In 6 months we increased organic traffic by 128% and organic sales by 95%. Their boutique approach and personalized attention make the difference.',
          rating: 5,
        },
        {
          name: 'Ana R.',
          date: '3 months ago',
          content: "Maria Fer's team not only technically optimized our site, but created a content strategy that truly connects with our audience. The results speak for themselves.",
          rating: 5,
        },
        {
          name: 'David L.',
          date: '1 month ago',
          content: 'We went from 3 to 10 million in sales in just 3 months. The site redesign and SEO strategy were key. Totally recommended.',
          rating: 5,
        },
        {
          name: 'Laura G.',
          date: '4 months ago',
          content: "No more worrying about hacks or plugins. My store is secure and loads instantly. The Google Ads campaign generated 100 daily calls. Incredible.",
          rating: 5,
        },
      ],
    },
  };

  const data = content[lang];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          {/* GMB-style header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {data.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">{data.subtitle}</p>

            {/* Google Business Card */}
            <div className="glass-card p-6 inline-flex flex-col items-center gap-3 border-gold/20">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <p className="font-display font-bold text-foreground text-sm">Ferova Agency</p>
                  <p className="text-muted-foreground text-xs">{data.badge}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-display font-bold text-foreground">{data.rating}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-xs">{data.reviewCount}</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Reviews carousel */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl mx-auto relative">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8 md:p-10"
            >
              {/* Review header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-gold font-bold text-lg">
                    {data.testimonials[current].name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{data.testimonials[current].name}</p>
                  <p className="text-muted-foreground text-xs">{data.testimonials[current].date}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(data.testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-foreground leading-relaxed">
                {data.testimonials[current].content}
              </p>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrent(prev => prev === 0 ? data.testimonials.length - 1 : prev - 1)}
                className="p-2 rounded-full border border-border hover:border-gold/50 hover:text-gold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <div className="flex items-center gap-2">
                {data.testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-gold w-6' : 'bg-border'}`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrent(prev => prev === data.testimonials.length - 1 ? 0 : prev + 1)}
                className="p-2 rounded-full border border-border hover:border-gold/50 hover:text-gold transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
