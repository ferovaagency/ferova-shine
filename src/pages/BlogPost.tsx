import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdBanner from '@/components/ui/ad-banner';
import { ArrowLeft, Clock, User, MessageCircle, Loader2 } from 'lucide-react';
import { getSupabase } from '@/integrations/supabase/lazy';
import { useAnalytics } from '@/hooks/useAnalytics';
import SEO from '@/components/SEO';
import { getPrerenderPost } from '@/lib/prerender-store';
import { BLOG_I18N_COLUMNS, BLOG_SITE_ORIGINS, pickVariant, type BlogRowI18n } from '@/lib/blog-i18n';
import { extractFaq, inlineImages, splitForCta, withToc, wordCount } from '@/lib/article-landing';
import { SITE_ORIGIN } from '@/config/routes';

interface Props { lang?: 'es' | 'en' | 'pt'; }

interface PostData {
  title: string;
  author: string;
  category: string;
  content: string;
  created_at: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt?: string | null;
  cover_image?: string | null;
  keyword?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  /** Rutas hermanas del mismo artículo (mismo slug, otra traducción). */
  alternates?: Partial<Record<'es' | 'en', string>>;
}

const staticPosts: Record<string, Record<string, { title: string; seoTitle?: string; author: string; date: string; readTime: string; category: string; content: string[] }>> = {
  es: {
    'seo-ecommerce-guia-completa-2025': {
      title: 'SEO para E-commerce: Guía Completa 2025',
      author: 'Ferova Agency', date: '15 Mar 2025', readTime: '12 min', category: 'SEO',
      content: [
        'El SEO para e-commerce es una de las estrategias más rentables para aumentar las ventas de tu tienda online. A diferencia de la publicidad pagada, el tráfico orgánico tiene un costo de adquisición que disminuye con el tiempo.',
        'En esta guía, cubriremos las estrategias clave que implementamos en Ferova Agency para posicionar tiendas online en las primeras posiciones de Google.',
        '## Arquitectura del sitio\n\nUna buena arquitectura de sitio es fundamental para el SEO de e-commerce. Debes asegurarte de que Google pueda rastrear e indexar todas tus páginas de producto de manera eficiente.',
        '## Optimización de fichas de producto\n\nCada ficha de producto es una oportunidad de posicionamiento. Incluye títulos únicos con la keyword principal, meta descriptions persuasivas, descripciones detalladas y datos estructurados.',
        '## Content marketing para e-commerce\n\nEl contenido informativo es clave para atraer tráfico top-of-funnel. Crea guías de compra, comparativas y artículos educativos que posicionen tu marca como autoridad.',
        '## Core Web Vitals\n\nGoogle premia los sitios rápidos y con buena experiencia de usuario. Las Web Apps modernas tienen una ventaja significativa sobre WordPress en este aspecto.',
      ],
    },
    'web-apps-vs-wordpress-ecommerce': {
      title: 'Web Apps vs WordPress: ¿Cuál es mejor para tu E-commerce?',
      seoTitle: 'Web Apps vs WordPress para E-commerce — Ferova',
      author: 'Ferova Agency', date: '10 Mar 2025', readTime: '8 min', category: 'Web Development',
      content: [
        'La elección de la plataforma correcta puede hacer o deshacer tu negocio online. En este artículo comparamos las Web Apps modernas con WordPress tradicional.',
        '## Velocidad de carga\n\nLas Web Apps cargan en menos de 1 segundo, mientras que un WordPress típico tarda entre 3-8 segundos.',
        '## Seguridad\n\nWordPress es el CMS más hackeado del mundo. Las Web Apps tienen una arquitectura inherentemente más segura.',
        '## SEO técnico\n\nLas Web Apps permiten optimización a nivel de código, algo imposible con WordPress sin modificar el core.',
        '## Escalabilidad\n\nWordPress se ralentiza con el tráfico. Las Web Apps escalan automáticamente.',
      ],
    },
    'core-web-vitals-ecommerce': {
      title: 'Core Web Vitals: Cómo mejorarlos en tu tienda online',
      seoTitle: 'Core Web Vitals para tu tienda online — Ferova',
      author: 'Ferova Agency', date: '5 Mar 2025', readTime: '10 min', category: 'Performance',
      content: [
        'Los Core Web Vitals son métricas de experiencia de usuario que Google utiliza como factor de ranking.',
        '## LCP (Largest Contentful Paint)\n\nEl LCP mide cuánto tarda en renderizarse el elemento más grande visible. Optimiza imágenes con WebP y usa lazy loading.',
        '## FID / INP\n\nMide la interactividad de tu sitio. Minimiza el JavaScript de terceros y usa code splitting.',
        '## CLS (Cumulative Layout Shift)\n\nMide la estabilidad visual. Define dimensiones de imágenes y usa font-display: swap.',
        '## La ventaja de las Web Apps\n\nLas Web Apps modernas superan consistentemente a WordPress en Core Web Vitals.',
      ],
    },
  },
  en: {
    'ecommerce-seo-complete-guide-2025': {
      title: 'E-commerce SEO: Complete Guide 2025',
      author: 'Ferova Agency', date: 'Mar 15, 2025', readTime: '12 min', category: 'SEO',
      content: [
        'E-commerce SEO is one of the most profitable strategies to increase your online store sales.',
        'In this guide, we cover the key strategies we implement at Ferova Agency to rank online stores at the top of Google.',
        '## Site architecture\n\nGood site architecture is fundamental for e-commerce SEO.',
        '## Product page optimization\n\nEach product page is a ranking opportunity.',
        '## Content marketing for e-commerce\n\nInformational content is key to attracting top-of-funnel traffic.',
      ],
    },
    'web-apps-vs-wordpress-ecommerce': {
      title: 'Web Apps vs WordPress: Which is better for your E-commerce?',
      seoTitle: 'Web Apps vs WordPress for E-commerce — Ferova',
      author: 'Ferova Agency', date: 'Mar 10, 2025', readTime: '8 min', category: 'Web Development',
      content: [
        'Choosing the right platform can make or break your online business.',
        '## Loading speed\n\nWeb Apps load in under 1 second, while a typical WordPress site takes 3-8 seconds.',
        '## Security\n\nWordPress is the most hacked CMS in the world. Web Apps have an inherently more secure architecture.',
      ],
    },
    'core-web-vitals-ecommerce': {
      title: 'Core Web Vitals: How to improve them in your online store',
      seoTitle: 'Core Web Vitals for your online store — Ferova',
      author: 'Ferova Agency', date: 'Mar 5, 2025', readTime: '10 min', category: 'Performance',
      content: [
        'Core Web Vitals are user experience metrics that Google uses as a ranking factor.',
        '## LCP (Largest Contentful Paint)\n\nLCP measures how long the largest visible element takes to render.',
        '## The Web Apps advantage\n\nModern Web Apps consistently outperform WordPress in Core Web Vitals.',
      ],
    },
  },
};

const estimateReadTime = (text: string) => {
  const words = text.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
};

const BlogPost = ({ lang = 'es' }: Props) => {
  const { slug } = useParams();
  // En build, el prerender ya dejó el post cargado (src/prerender-content.ts).
  // En el navegador esto es siempre null y el flujo es el de siempre.
  const seeded = getPrerenderPost(lang, slug);
  const [dbPost, setDbPost] = useState<PostData | null>(seeded);
  const [loading, setLoading] = useState(!seeded);
  const [notFound, setNotFound] = useState(false);
  const { trackBlogRead } = useAnalytics();

  const staticPost = slug ? staticPosts[lang]?.[slug] : null;

  const blogBase = lang === 'pt' ? '/pt/blog' : lang === 'en' ? '/en/blog' : '/blog';
  const contactPath = lang === 'pt' ? '/pt/contato' : lang === 'en' ? '/en/contact' : '/contacto';
  const backLabel = lang === 'pt' ? 'Voltar ao blog' : lang === 'en' ? 'Back to blog' : 'Volver al blog';

  useEffect(() => {
    if (seeded) return;
    if (staticPost || !slug) {
      setLoading(false);
      if (!staticPost && !slug) setNotFound(true);
      return;
    }

    const fetchPost = async () => {
      try {
        // ⚠️ NO se filtra por `language`: hay UNA fila por artículo (language='es')
        // y las traducciones viven en columnas _en / _pt de esa misma fila. El
        // filtro anterior (`language='en'`) no encontraba nada nunca, así que
        // /en/blog/:slug mostraba "Article not found" al montar React.
        const supabase = await getSupabase();
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`slug, language, author, category, created_at, cover_image, keyword, published_at, updated_at, ${BLOG_I18N_COLUMNS}`)
          .eq('slug', slug)
          .eq('active', true)
          .in('site_origin', [...BLOG_SITE_ORIGINS])
          .lte('published_at', new Date().toISOString())
          .limit(1);

        const row = data?.[0] as (BlogRowI18n & { author: string; category: string; created_at: string; cover_image: string | null; keyword: string | null; published_at: string | null; updated_at: string | null }) | undefined;
        const variant = row ? pickVariant(row, lang === 'en' ? 'en' : 'es') : null;

        if (error || !variant) {
          setNotFound(true);
        } else {
          const hasEn = Boolean(pickVariant(row!, 'en'));
          setDbPost({
            title: variant.title,
            author: row!.author,
            category: row!.category,
            content: variant.content,
            created_at: row!.created_at,
            meta_title: variant.meta_title,
            meta_description: variant.meta_description,
            excerpt: variant.excerpt,
            cover_image: row!.cover_image,
            keyword: row!.keyword,
            published_at: row!.published_at,
            updated_at: row!.updated_at,
            alternates: hasEn
              ? { es: `/blog/${slug}`, en: `/en/blog/${slug}` }
              : { es: `/blog/${slug}` },
          });
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, staticPost, lang, seeded]);

  // Track blog read
  useEffect(() => {
    const title = dbPost?.title || staticPost?.title;
    const s = slug || '';
    if (title) trackBlogRead(title, s);
  }, [dbPost, staticPost, slug]);

  // Update meta tags for DB posts
  useEffect(() => {
    if (dbPost?.meta_title) document.title = dbPost.meta_title;
    if (dbPost?.meta_description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute('name', 'description'); document.head.appendChild(meta); }
      meta.setAttribute('content', dbPost.meta_description);
    }
  }, [dbPost]);

  if (loading) {
    return (
      <>
        <Header currentLang={lang} />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer currentLang={lang} />
      </>
    );
  }

  if (notFound && !staticPost) {
    return (
      <>
        <Header currentLang={lang} />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold mb-4">
              {lang === 'pt' ? 'Artigo não encontrado' : lang === 'en' ? 'Article not found' : 'Artículo no encontrado'}
            </h1>
            <Link to={blogBase} className="text-primary hover:underline">{backLabel}</Link>
          </div>
        </main>
        <Footer currentLang={lang} />
      </>
    );
  }

  // Render static post
  if (staticPost) {
    const postPath = `${blogBase}/${slug}`;
    const articleLd = {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: staticPost.title, author: { '@type': 'Person', name: staticPost.author || 'Maria Calderon' },
      datePublished: staticPost.date,
    };
    return (
      <>
        <SEO title={staticPost.seoTitle || `${staticPost.title} — Ferova Agency`} description={staticPost.content[0]?.slice(0, 155) || staticPost.title} path={postPath} lang={lang} type="article" jsonLd={articleLd} />
        <Header currentLang={lang} />
        <main className="pt-20">
          <article className="py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-6">
              <div className="mx-auto" style={{ maxWidth: '720px' }}>
                <Link to={blogBase} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm">
                  <ArrowLeft className="w-4 h-4" /> {backLabel}
                </Link>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-3 py-1 rounded-full font-medium bg-primary/10 text-primary">{staticPost.category}</span>
                  <span className="text-muted-foreground text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {staticPost.readTime}</span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 leading-tight">{staticPost.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-8 pb-6 border-b border-border/30">
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> {staticPost.author}</span>
                  <span>{staticPost.date}</span>
                </div>
                <AdBanner slot="blog-post-top" className="mb-8" />
                <div className="blog-content space-y-4" style={{ lineHeight: '1.6' }}>
                  {staticPost.content.map((paragraph, i) => {
                    if (paragraph.startsWith('## ')) {
                      const [heading, ...rest] = paragraph.split('\n\n');
                      return (
                        <div key={i}>
                          <h2 className="text-xl font-display font-bold mt-8 mb-3 text-foreground">{heading.replace('## ', '')}</h2>
                          {rest.map((p, j) => <p key={j} className="text-muted-foreground mb-3">{p}</p>)}
                        </div>
                      );
                    }
                    return <p key={i} className="text-muted-foreground">{paragraph}</p>;
                  })}
                </div>
                <AdBanner slot="blog-post-bottom" className="mt-10" />
                <CtaBlock lang={lang} contactPath={contactPath} />
              </div>
            </div>
          </article>
        </main>
        <Footer currentLang={lang} />
      </>
    );
  }

  // Render DB post
  const post = dbPost!;
  const readTime = estimateReadTime(post.content);
  const dateStr = new Date(post.created_at).toLocaleDateString(
    lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-US' : 'es-ES',
    { day: 'numeric', month: 'short', year: 'numeric' }
  );

  const postPath = `${blogBase}/${slug}`;
  // Mantiene el título entre 30 y 60 caracteres, incluyendo la marca
  const buildSeoTitle = (raw: string) => {
    const brand = ' — Ferova Agency';
    const full = `${raw}${brand}`;
    if (full.length <= 60) return full;
    const short = ' — Ferova';
    const max = 60 - short.length;
    const trimmed = raw.length <= max ? raw : `${raw.slice(0, max - 1).replace(/[\s,;:–-]+$/, '')}…`;
    return `${trimmed}${short}`;
  };
  const seoTitle = post.meta_title || buildSeoTitle(post.title);
  const seoDesc = post.meta_description || post.content.replace(/<[^>]*>/g, ' ').slice(0, 155);
  // El artículo es una landing (CLAUDE.md §3): héroe, portada, índice, llamada a
  // Fera a mitad del texto, cierre vino y schemas completos.
  const en = lang === 'en';
  const url = `${SITE_ORIGIN}${postPath}`;
  const blogUrl = `${SITE_ORIGIN}${blogBase}`;
  const { html: tocHtml, toc } = withToc(post.content);
  const parts = splitForCta(tocHtml);
  const faq = extractFaq(post.content);
  const author = post.author || 'María Fer Calderón';
  const published = post.published_at || post.created_at;
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: seoDesc,
    inLanguage: lang,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: [
      ...(post.cover_image ? [{ '@type': 'ImageObject', url: post.cover_image, caption: post.title }] : []),
      ...inlineImages(post.content).map((src) => ({ '@type': 'ImageObject', url: src })),
    ],
    author: { '@type': 'Person', name: author, url: `${SITE_ORIGIN}${en ? '/en/about-me' : '/sobre-nosotros'}` },
    publisher: { '@type': 'Organization', name: 'Ferova', url: SITE_ORIGIN },
    isPartOf: { '@type': 'Blog', '@id': `${blogUrl}#blog`, url: blogUrl },
    wordCount: wordCount(post.content),
    datePublished: published,
    dateModified: post.updated_at || published,
    ...(post.keyword ? { keywords: post.keyword } : {}),
    ...(post.category ? { articleSection: post.category } : {}),
  };
  const faqLd = faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null;
  const openFera = () =>
    window.dispatchEvent(new CustomEvent('open-fera-quote', { detail: { prompt: en ? `I read "${post.title}" and want to talk about my case.` : `Leí "${post.title}" y quiero hablar de mi caso.` } }));
  const t = en
    ? { toc: 'In this article', sideTitle: 'Facing something similar?', sideBody: 'Tell Fera about the project and get scope and availability.', midTitle: 'Want this done for your agency’s client?', midBody: 'Describe the deliverable in two lines and Fera prepares the scope: task, hours or monthly capacity.', cta: 'Talk to Fera', closeTitle: 'Tell me what you need to solve.', closeBody: 'We start from the work. The collaboration model follows the real scope.' }
    : { toc: 'En este artículo', sideTitle: '¿Te pasa algo parecido?', sideBody: 'Cuéntale a Fera el proyecto y recibe alcance y disponibilidad.', midTitle: '¿Quieres que lo resolvamos para un cliente de tu agencia?', midBody: 'Describe la entrega en dos líneas y Fera prepara el alcance: por tarea, por horas o capacidad mensual.', cta: 'Hablar con Fera', closeTitle: 'Cuéntame qué necesitas resolver.', closeBody: 'Empezamos por el trabajo. La modalidad la definimos a partir del alcance real.' };

  return (
    <div className="seo-brand min-h-screen bg-white">
      <SEO
        title={seoTitle}
        description={seoDesc}
        path={postPath}
        lang={lang}
        type="article"
        image={post.cover_image || undefined}
        jsonLd={faqLd ? [articleLd, faqLd] : [articleLd]}
        alternates={post.alternates}
        breadcrumbs={[{ name: 'Blog', path: blogBase }, { name: post.title, path: postPath }]}
      />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-14 md:py-20">
          <div className="container relative z-[1] mx-auto max-w-6xl px-4 md:px-6">
            <Link to={blogBase} className="mb-6 flex w-fit items-center gap-2 text-sm text-white/80 hover:text-white">
              <ArrowLeft className="h-4 w-4" /> {backLabel}
            </Link>
            {post.category ? <p className="seo-kicker mb-5">{post.category}</p> : null}
            <h1 className="max-w-4xl text-4xl leading-[1.12] md:text-5xl">{post.title}</h1>
            {post.excerpt ? <p className="mt-6 max-w-3xl text-lg leading-relaxed">{post.excerpt}</p> : null}
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span className="inline-flex items-center gap-1"><User className="h-4 w-4" /> {author}</span>
              <span>{dateStr}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {readTime}</span>
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div className="min-w-0">
              {post.cover_image ? (
                <img src={post.cover_image} alt={post.title} width={1600} height={900} className="mb-10 aspect-[16/9] w-full rounded-[1.25rem] object-cover" />
              ) : null}
              {parts ? (
                <article>
                  <div className="prose-blog article-body" dangerouslySetInnerHTML={{ __html: parts[0] }} />
                  <aside className="article-cta" aria-label={t.midTitle}>
                    <p className="font-display text-xl font-semibold">{t.midTitle}</p>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{t.midBody}</p>
                    <button type="button" onClick={openFera} className="personal-button mt-5">{t.cta} →</button>
                  </aside>
                  <div className="prose-blog article-body" dangerouslySetInnerHTML={{ __html: parts[1] }} />
                </article>
              ) : (
                <article className="prose-blog article-body" dangerouslySetInnerHTML={{ __html: tocHtml }} />
              )}
            </div>
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              {toc.length > 1 ? (
                <nav aria-label={t.toc} className="hidden rounded-[1.25rem] bg-[var(--fx-surface)] p-7 lg:block">
                  <p className="font-display text-lg font-semibold">{t.toc}</p>
                  <ol className="mt-4 space-y-3 text-sm leading-snug">
                    {toc.map((item) => (
                      <li key={item.id}><a href={`#${item.id}`} className="text-muted-foreground hover:text-[var(--fx-wine)]">{item.label}</a></li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <div className="rounded-[1.25rem] bg-[var(--fx-surface)] p-7">
                <p className="font-display text-lg font-semibold">{t.sideTitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.sideBody}</p>
                <button type="button" onClick={openFera} className="personal-button mt-5 w-full">{t.cta}</button>
              </div>
            </aside>
          </div>
        </section>

        <section className="personal-contact">
          <div className="personal-shell personal-contact-inner">
            <div>
              <h2>{t.closeTitle}</h2>
              <p>{t.closeBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={openFera} className="personal-button"><MessageCircle aria-hidden="true" /> {t.cta}</button>
              <Link to={contactPath} className="personal-link text-white">{en ? 'Contact' : 'Contacto'}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </div>
  );
};

const CtaBlock = ({ lang, contactPath }: { lang: string; contactPath: string }) => (
  <div className="glass-card p-8 mt-12 text-center gold-glow">
    <h3 className="text-xl font-display font-bold mb-4">
      {lang === 'pt' ? 'Quer resultados assim para seu e-commerce?' : lang === 'en' ? 'Want results like these for your e-commerce?' : '¿Quieres resultados así para tu e-commerce?'}
    </h3>
    <p className="text-muted-foreground mb-6">
      {lang === 'pt' ? 'Fale conosco e ajudamos a escalar sua loja virtual.' : lang === 'en' ? 'Contact us and we\'ll help you scale your online store.' : 'Escríbenos y te ayudamos a escalar tu tienda online.'}
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="https://wa.me/17866894686" target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center justify-center gap-2">
        <MessageCircle className="w-5 h-5" /> WhatsApp
      </a>
      <Link to={contactPath} className="btn-outline-gold text-center">
        {lang === 'pt' ? 'Cotizar com Fera' : lang === 'en' ? 'Quote with Fera' : 'Cotizar con Fera'}
      </Link>
    </div>
  </div>
);

export default BlogPost;
