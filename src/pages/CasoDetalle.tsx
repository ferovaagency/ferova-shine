import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEO from '@/components/SEO';
import { casesData } from './CasosDeExito';
import { AlertTriangle, ArrowLeft, MessageCircle } from 'lucide-react';
import { AnimatedSection, StaggerContainer, StaggerItem, PageTransition } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { caseCms, type CaseResultHighlight } from '@/integrations/supabase/cms-types';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const CasoDetalle = ({ lang = 'es' }: Props) => {
  const { id } = useParams();
  const [dynamicCase, setDynamicCase] = useState<{ slug: string; client_public_name: string | null; sector: string; country: string | null; summary: string; challenge: string; diagnosis: string; intervention: string; learnings: string; limitations: string | null; result_highlights: CaseResultHighlight[] } | null>(null);
  const [cmsChecked, setCmsChecked] = useState(lang !== 'es');
  const cases = casesData[lang];
  const caso = cases.find(c => c.id === id);
  const backPath = lang === 'es' ? '/casos-de-exito' : '/en/case-studies';

  useEffect(() => {
    if (lang !== 'es' || !id) return;
    void (async () => {
      const { data } = await caseCms.from('case_studies').select('slug,client_public_name,sector,country,summary,challenge,diagnosis,intervention,learnings,limitations,result_highlights').eq('slug', id).eq('status', 'published').maybeSingle();
      setDynamicCase(data as typeof dynamicCase);
      setCmsChecked(true);
    })();
  }, [id, lang]);

  if (!cmsChecked) return <><Header currentLang={lang} /><main className="flex min-h-screen items-center justify-center pt-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" /></main><Footer currentLang={lang} /></>;

  if (dynamicCase) {
    const title = dynamicCase.client_public_name || `Caso de ${dynamicCase.sector}`;
    return <PageTransition><SEO title={`${title} — Ferova Agency`} description={dynamicCase.summary.slice(0, 155)} path={`/casos-de-exito/${dynamicCase.slug}`} lang="es" type="article" /><Header currentLang="es" /><main className="pt-20"><article className="py-16 md:py-24"><div className="container mx-auto max-w-4xl px-4 md:px-6"><Link to={backPath} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"><ArrowLeft className="h-4 w-4" /> Todos los casos</Link><p className="mt-10 text-sm font-semibold text-gold">{dynamicCase.sector}{dynamicCase.country ? ` · ${dynamicCase.country}` : ''}</p><h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">{title}</h1><p className="mt-6 text-xl leading-8 text-muted-foreground">{dynamicCase.summary}</p>
      {dynamicCase.result_highlights.length > 0 && <section className="mt-12"><h2 className="font-display text-2xl font-bold">Resultados</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{dynamicCase.result_highlights.map((result) => <div key={`${result.label}-${result.value}`} className="glass-card p-6"><strong className="block text-3xl text-gold">{result.value}</strong><span className="mt-2 block font-medium">{result.label}</span>{result.context && <p className="mt-2 text-xs leading-5 text-muted-foreground">{result.context}</p>}</div>)}</div></section>}
      <div className="mt-12 space-y-5">{[["El reto", dynamicCase.challenge], ["Diagnóstico", dynamicCase.diagnosis], ["Intervención", dynamicCase.intervention], ["Aprendizajes", dynamicCase.learnings]].map(([heading, body]) => <section key={heading} className="glass-card p-7"><h2 className="font-display text-xl font-bold text-gold">{heading}</h2><p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">{body}</p></section>)}{dynamicCase.limitations && <section className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-7"><h2 className="font-semibold">Alcance y limitaciones</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{dynamicCase.limitations}</p></section>}</div></div></article></main><Footer currentLang="es" /></PageTransition>;
  }

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

  const detailPath = lang === 'en' ? `/en/case-studies/${caso.id}` : lang === 'pt' ? `/pt/casos-de-sucesso/${caso.id}` : `/casos-de-exito/${caso.id}`;
  const seoDesc = (caso.challenge || '').slice(0, 155);
  const metricsPendingEvidence = lang === 'es';

  return (
    <PageTransition>
      <SEO
        title={`${caso.title} — Ferova Agency`}
        description={seoDesc}
        path={detailPath}
        lang={lang}
        type="article"
      />
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
                    {metricsPendingEvidence ? (
                      <div className="rounded-xl border border-amber-300/50 bg-amber-50 p-5 text-amber-950">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                          <div>
                            <h3 className="font-semibold">Métricas en validación documental</h3>
                            <p className="mt-2 text-sm leading-6">Las cifras históricas de este caso no se muestran hasta reconciliar fuente, fecha de corte, definición y permiso de publicación. La narrativa permanece disponible como contexto del trabajo realizado.</p>
                          </div>
                        </div>
                      </div>
                    ) : <>
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
                        {lang === 'pt' ? 'Impacto relativo' : 'Relative impact'}
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
                    </>}
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
                  href="https://wa.me/17865787671"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> {lang === 'es' ? 'Solicitar cotización' : 'Request a quote'}
                </motion.a>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </PageTransition>
  );
};

export default CasoDetalle;
