import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { casesData } from './CasosDeExito';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem, PageTransition } from '@/components/ui/motion';
import { motion } from 'framer-motion';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const CasoDetalle = ({ lang = 'es' }: Props) => {
  const { id } = useParams();
  const cases = casesData[lang];
  const caso = cases.find(c => c.id === id);
  const backPath = lang === 'es' ? '/casos-de-exito' : '/en/case-studies';

  if (!caso) {
    return (
      <>
        <Header currentLang={lang} />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold mb-4">{lang === 'es' ? 'Caso no encontrado' : 'Case not found'}</h1>
            <Link to={backPath} className="text-gold hover:underline">{lang === 'es' ? 'Volver' : 'Go back'}</Link>
          </div>
        </main>
        <Footer currentLang={lang} />
      </>
    );
  }

  return (
    <PageTransition>
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection>
                <Link to={backPath} className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8 text-sm">
                  <ArrowLeft className="w-4 h-4" /> {lang === 'es' ? 'Todos los casos' : 'All cases'}
                </Link>
                <span className="text-sm text-gold font-medium">{caso.country}</span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mt-2 mb-6">{caso.title}</h1>
              </AnimatedSection>

              <div className="space-y-8">
                <AnimatedSection delay={0.1}>
                  <div className="glass-card p-8">
                    <h2 className="text-xl font-display font-bold mb-4 text-gold">{lang === 'es' ? 'El reto' : 'The challenge'}</h2>
                    <p className="text-muted-foreground leading-relaxed">{caso.challenge}</p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.2}>
                  <div className="glass-card p-8">
                    <h2 className="text-xl font-display font-bold mb-4 text-gold">{lang === 'es' ? 'La solución' : 'The solution'}</h2>
                    <p className="text-muted-foreground leading-relaxed">{caso.solution}</p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.3}>
                  <div className="glass-card p-8">
                    <h2 className="text-xl font-display font-bold mb-6 text-gold">{lang === 'es' ? 'Resultados' : 'Results'}</h2>
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      {caso.results.map((r, i) => (
                        <StaggerItem key={i}>
                          <div className="text-center">
                            <div className="text-3xl font-display font-bold text-gradient-gold">{r.value}</div>
                            <div className="text-muted-foreground text-sm mt-1">{r.metric}</div>
                            <div className="text-muted-foreground/60 text-xs">{r.period}</div>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                    {/* Visual impact bars */}
                    <div className="space-y-3 pt-6 border-t border-border/40">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                        {lang === 'es' ? 'Impacto relativo' : lang === 'pt' ? 'Impacto relativo' : 'Relative impact'}
                      </p>
                      {(() => {
                        const parsed = caso.results.map((r) => {
                          const m = r.value.replace(/,/g, '').match(/-?\d+(\.\d+)?/);
                          return { metric: r.metric, num: m ? parseFloat(m[0]) : 0, value: r.value };
                        });
                        const max = Math.max(...parsed.map((p) => Math.abs(p.num)), 1);
                        return parsed.map((p, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">{p.metric}</span>
                              <span className="text-gold font-medium">{p.value}</span>
                            </div>
                            <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${Math.min(100, (Math.abs(p.num) / max) * 100)}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                                className="h-full bg-gradient-to-r from-gold/60 to-gold rounded-full"
                              />
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              <AnimatedSection delay={0.4} className="text-center mt-12">
                <h3 className="text-xl font-display font-bold mb-4">
                  {lang === 'es' ? '¿Quieres resultados similares?' : 'Want similar results?'}
                </h3>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://wa.link/bfq71f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> {lang === 'es' ? 'Agendar Asesoría' : 'Book a Consultation'}
                </motion.a>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </PageTransition>
  );
};

export default CasoDetalle;
