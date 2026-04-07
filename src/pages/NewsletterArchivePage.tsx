import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { AnimatedSection, PageTransition } from '@/components/ui/motion';
import { Clock, ArrowRight, Lock, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface Props { lang?: 'es' | 'en' | 'pt'; }

interface Edition {
  id: string;
  edition_number: number;
  slug: string;
  title: string;
  topics: string[] | null;
  plan: string | null;
  reading_time: number | null;
  published_at: string | null;
}

const t = {
  es: { title: 'Archivo del Newsletter', sub: 'Todas las ediciones publicadas de nuestro newsletter semanal.', read: 'Leer edición', proOnly: 'Contenido completo solo para Pro', proCta: 'Suscribirme al Pro', empty: 'Aún no hay ediciones publicadas.' },
  en: { title: 'Newsletter Archive', sub: 'All published editions of our weekly newsletter.', read: 'Read edition', proOnly: 'Full content for Pro only', proCta: 'Subscribe to Pro', empty: 'No published editions yet.' },
  pt: { title: 'Arquivo do Newsletter', sub: 'Todas as edições publicadas do nosso newsletter semanal.', read: 'Ler edição', proOnly: 'Conteúdo completo apenas para Pro', proCta: 'Assinar o Pro', empty: 'Ainda não há edições publicadas.' },
};

const NewsletterArchivePage = ({ lang = 'es' }: Props) => {
  const l = t[lang] || t.es;
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('newsletter_editions')
        .select('id, edition_number, slug, title, topics, plan, reading_time, published_at')
        .eq('published', true)
        .order('edition_number', { ascending: false });
      setEditions(data || []);
      setLoading(false);
    })();
  }, []);

  const editionPath = (slug: string) => lang === 'en' ? `/en/newsletter/edition/${slug}` : `/newsletter/edicion/${slug}`;

  return (
    <PageTransition>
      <Header lang={lang} />
      <section className="dark-section relative pt-28 pb-14 md:pt-36 md:pb-18" style={{ background: 'linear-gradient(135deg, hsl(243 31% 10%), hsl(243 31% 16%))' }}>
        <div className="grid-pattern absolute inset-0 opacity-40" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Outfit', sans-serif", color: 'hsl(0 0% 95%)' }}>{l.title}</h1>
            <p style={{ color: 'hsl(0 0% 70%)' }}>{l.sub}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {loading ? (
            <div className="text-center text-muted-foreground py-20">Loading...</div>
          ) : editions.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">{l.empty}</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {editions.map(ed => (
                <div key={ed.id} className="glass-card p-6 flex flex-col" style={ed.plan === 'pro' ? { borderColor: 'hsl(45 86% 40%)' } : undefined}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'hsla(45,86%,40%,0.15)', color: 'hsl(45 86% 52%)' }}>
                      #{String(ed.edition_number).padStart(3, '0')}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ed.plan === 'pro' ? '' : 'bg-green-500/20 text-green-400'}`} style={ed.plan === 'pro' ? { background: 'hsla(45,86%,40%,0.2)', color: 'hsl(45 86% 52%)' } : undefined}>
                      {ed.plan === 'pro' ? 'Pro' : lang === 'pt' ? 'Grátis' : lang === 'en' ? 'Free' : 'Gratis'}
                    </span>
                  </div>
                  {ed.published_at && <p className="text-xs text-muted-foreground mb-2">{format(new Date(ed.published_at), 'dd MMM yyyy')}</p>}
                  <h3 className="font-bold text-sm mb-3 flex-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{ed.title}</h3>
                  {ed.topics && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {ed.topics.map((topic, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{topic}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Clock className="h-3 w-3" />{ed.reading_time || 5} min
                  </div>
                  {ed.plan === 'pro' && (
                    <p className="text-xs mb-3 flex items-center gap-1" style={{ color: 'hsl(45 86% 52%)' }}>
                      <Lock className="h-3 w-3" />{l.proOnly}
                    </p>
                  )}
                  <Link to={editionPath(ed.slug)} className="btn-outline-gold text-center text-sm py-2 px-4 mt-auto">
                    {l.read} <ArrowRight className="inline h-3 w-3 ml-1" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer lang={lang} />
      <ChatWidget />
    </PageTransition>
  );
};

export default NewsletterArchivePage;
