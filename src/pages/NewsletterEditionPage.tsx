import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { PageTransition } from '@/components/ui/motion';
import { Clock, Share2, ArrowLeft, ArrowRight, Lock, MessageCircle, Wrench, Lightbulb, Newspaper } from 'lucide-react';
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
  free_content: any;
  pro_content: any;
}

const t = {
  es: { reading: 'min de lectura', share: 'Compartir en LinkedIn', news: '📰 La noticia de la semana', tip: '💡 Tip de la semana', tool: '🛠 Herramienta gratuita', visit: 'Visitar', proLocked: '🔒 Contenido exclusivo Pro · $9/mes', proDesc: 'Incluye caso de estudio real, análisis profundo de Google, recurso descargable y respuesta a pregunta de suscriptor.', proCta: 'Suscribirme al Pro — $9/mes', prev: '← Edición anterior', next: 'Edición siguiente →', liked: '¿Te gustó esta edición?', subscribePro: 'Suscribirme al Pro', notFound: 'Edición no encontrada' },
  en: { reading: 'min read', share: 'Share on LinkedIn', news: '📰 News of the week', tip: '💡 Tip of the week', tool: '🛠 Free tool', visit: 'Visit', proLocked: '🔒 Exclusive Pro content · $9/mo', proDesc: 'Includes real case study, deep Google analysis, downloadable resource and subscriber Q&A.', proCta: 'Subscribe to Pro — $9/mo', prev: '← Previous edition', next: 'Next edition →', liked: 'Did you like this edition?', subscribePro: 'Subscribe to Pro', notFound: 'Edition not found' },
  pt: { reading: 'min de leitura', share: 'Compartilhar no LinkedIn', news: '📰 A notícia da semana', tip: '💡 Dica da semana', tool: '🛠 Ferramenta gratuita', visit: 'Visitar', proLocked: '🔒 Conteúdo exclusivo Pro · $9/mês', proDesc: 'Inclui caso de estudo real, análise profunda do Google, recurso para download e resposta a pergunta de assinante.', proCta: 'Assinar o Pro — $9/mês', prev: '← Edição anterior', next: 'Edição seguinte →', liked: 'Gostou desta edição?', subscribePro: 'Assinar o Pro', notFound: 'Edição não encontrada' },
};

const NewsletterEditionPage = ({ lang = 'es' }: Props) => {
  const l = t[lang] || t.es;
  const { slug } = useParams<{ slug: string }>();
  const [edition, setEdition] = useState<Edition | null>(null);
  const [prevSlug, setPrevSlug] = useState<string | null>(null);
  const [nextSlug, setNextSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from('newsletter_editions')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();
      setEdition(data as Edition | null);

      if (data) {
        const { data: prev } = await supabase.from('newsletter_editions').select('slug').eq('published', true).eq('edition_number', data.edition_number - 1).maybeSingle();
        const { data: next } = await supabase.from('newsletter_editions').select('slug').eq('published', true).eq('edition_number', data.edition_number + 1).maybeSingle();
        setPrevSlug(prev?.slug || null);
        setNextSlug(next?.slug || null);
      }
      setLoading(false);
    })();
  }, [slug]);

  const editionPath = (s: string) => lang === 'en' ? `/en/newsletter/edition/${s}` : `/newsletter/edicion/${s}`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const linkedInShare = `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const waProMsg = encodeURIComponent('Hola, quiero suscribirme al newsletter PRO de SEO para Ecommerce a $9/mes');

  if (loading) return (<PageTransition><Header lang={lang} /><div className="pt-32 pb-20 text-center text-muted-foreground">Loading...</div><Footer lang={lang} /></PageTransition>);
  if (!edition) return (<PageTransition><Header lang={lang} /><div className="pt-32 pb-20 text-center text-muted-foreground">{l.notFound}</div><Footer lang={lang} /></PageTransition>);

  const fc = edition.free_content || {};
  const pc = edition.pro_content || {};

  return (
    <PageTransition>
      <Header lang={lang} />
      <article className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-[720px]" style={{ lineHeight: 1.6 }}>
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'hsla(45,86%,40%,0.15)', color: 'hsl(45 86% 52%)' }}>
                Edición #{String(edition.edition_number).padStart(3, '0')} · {edition.published_at ? format(new Date(edition.published_at), 'dd MMM yyyy') : ''}
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${edition.plan === 'pro' ? '' : 'bg-green-500/20 text-green-400'}`} style={edition.plan === 'pro' ? { background: 'hsla(45,86%,40%,0.2)', color: 'hsl(45 86% 52%)' } : undefined}>
                {edition.plan === 'pro' ? 'Pro' : 'Free'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>{edition.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {edition.reading_time || 5} {l.reading}</span>
              <a href={linkedInShare} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground transition-colors">
                <Share2 className="h-4 w-4" /> {l.share}
              </a>
            </div>
          </div>

          {/* Free content */}
          {fc.news && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <Newspaper className="h-5 w-5" style={{ color: 'hsl(45 86% 52%)' }} />{l.news}
              </h2>
              <p className="text-muted-foreground">{fc.news}</p>
            </section>
          )}

          <div className="w-full h-px my-8" style={{ background: 'linear-gradient(90deg, transparent, hsl(45 86% 40%), transparent)' }} />

          {fc.tip && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <Lightbulb className="h-5 w-5" style={{ color: 'hsl(45 86% 52%)' }} />{l.tip}
              </h2>
              <div className="rounded-xl p-5" style={{ borderLeft: '4px solid hsl(45 86% 40%)', background: 'hsla(45,86%,40%,0.05)' }}>
                <p className="text-muted-foreground">{fc.tip}</p>
              </div>
            </section>
          )}

          {fc.tool && (
            <section className="mb-10">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <Wrench className="h-5 w-5" style={{ color: 'hsl(45 86% 52%)' }} />{l.tool}
              </h2>
              <div className="glass-card p-5">
                <p className="font-semibold mb-1">{fc.tool.name}</p>
                <p className="text-sm text-muted-foreground mb-3">{fc.tool.desc}</p>
                {fc.tool.url && <a href={fc.tool.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold" style={{ color: 'hsl(45 86% 52%)' }}>{l.visit} →</a>}
              </div>
            </section>
          )}

          {/* Pro locked block */}
          {edition.plan === 'pro' && pc && (
            <section className="my-12">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="p-6" style={{ filter: 'blur(4px)', pointerEvents: 'none' }}>
                  <p className="text-muted-foreground">{pc.case_study || pc.analysis || 'Contenido exclusivo para suscriptores Pro con análisis profundo, caso de estudio real y recursos descargables.'}</p>
                  <p className="text-muted-foreground mt-4">{pc.analysis || ''}</p>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 rounded-2xl" style={{ background: 'hsla(243, 31%, 10%, 0.85)', backdropFilter: 'blur(4px)' }}>
                  <p className="text-lg font-bold mb-2" style={{ color: 'hsl(45 86% 52%)' }}>{l.proLocked}</p>
                  <p className="text-sm text-muted-foreground mb-6 max-w-sm">{l.proDesc}</p>
                  <a href={`https://wa.me/17865787671?text=${waProMsg}`} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm">
                    <MessageCircle className="inline h-4 w-4 mr-2 -mt-0.5" />{l.proCta}
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* Navigation */}
          <div className="border-t border-border pt-8 mt-12">
            <div className="flex justify-between items-center mb-8">
              {prevSlug ? <Link to={editionPath(prevSlug)} className="text-sm text-muted-foreground hover:text-foreground transition-colors"><ArrowLeft className="inline h-4 w-4 mr-1" />{l.prev}</Link> : <span />}
              {nextSlug ? <Link to={editionPath(nextSlug)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.next}<ArrowRight className="inline h-4 w-4 ml-1" /></Link> : <span />}
            </div>
            <div className="glass-card p-6 text-center">
              <p className="font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>{l.liked}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={`https://wa.me/17865787671?text=${waProMsg}`} target="_blank" rel="noopener noreferrer" className="btn-gold text-sm">
                  <MessageCircle className="inline h-4 w-4 mr-2 -mt-0.5" />{l.subscribePro}
                </a>
                <a href={linkedInShare} target="_blank" rel="noopener noreferrer" className="btn-outline-gold text-sm">
                  <Share2 className="inline h-4 w-4 mr-2 -mt-0.5" />{l.share}
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
      <Footer lang={lang} />
      <ChatWidget />
    </PageTransition>
  );
};

export default NewsletterEditionPage;
