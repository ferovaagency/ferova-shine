import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdBanner from '@/components/ui/ad-banner';
import { ArrowLeft, ArrowUpRight, Clock, User, Loader2 } from 'lucide-react';
import { getSupabase } from '@/integrations/supabase/lazy';
import { useAnalytics } from '@/hooks/useAnalytics';
import SEO from '@/components/SEO';
import { getPrerenderPost, isPrerendering } from '@/lib/prerender-store';
import { BLOG_I18N_COLUMNS, BLOG_SITE_ORIGINS, pickVariant, type BlogRowI18n } from '@/lib/blog-i18n';
import { extractFaq, inlineImages, splitForCta, withToc, wordCount } from '@/lib/article-landing';
import { SITE_ORIGIN } from '@/config/routes';
import { CtaBand, FxLink, openFera as openFeraChat } from '@/components/fx/primitives';

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
  const staticPostForSlug = slug ? staticPosts[lang]?.[slug] : null;
  // En el prerender, si el post no vino precargado es que no
  // existe (o no tiene versión en este idioma). Se pinta "no encontrado" con
  // noindex en vez del spinner, que salía como página sin H1 ni canonical.
  const missingAtBuild = isPrerendering() && !seeded && !staticPostForSlug;
  const [loading, setLoading] = useState(!seeded && !missingAtBuild);
  const [notFound, setNotFound] = useState(missingAtBuild);
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
      <div className="fx-site min-h-screen">
        <Header currentLang={lang} />
        <main id="contenido-principal" className="pt-20">
          <section className="page-hero on-dark grid-field">
            <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl items-center justify-center px-5 py-16 sm:px-8">
              <Loader2 aria-hidden="true" className="h-8 w-8 animate-spin text-white" />
              <span className="sr-only">{lang === 'pt' ? 'Carregando' : lang === 'en' ? 'Loading' : 'Cargando'}</span>
            </div>
          </section>
        </main>
        <Footer currentLang={lang} />
      </div>
    );
  }

  if (notFound && !staticPost) {
    return (
      <div className="fx-site min-h-screen">
        <SEO
          title={lang === 'pt' ? 'Artigo não encontrado | Ferova' : lang === 'en' ? 'Article not found | Ferova' : 'Artículo no encontrado | Ferova'}
          description={lang === 'en' ? 'This article does not exist or has moved.' : 'Este artículo no existe o cambió de dirección.'}
          path={`${blogBase}/${slug ?? ''}`}
          lang={lang}
          noindex
        />
        <Header currentLang={lang} />
        <main id="contenido-principal" className="pt-20">
          <section className="page-hero on-dark grid-field">
            <div className="mx-auto flex min-h-[50vh] w-full max-w-5xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
              <h1 className="text-4xl leading-[1.15] sm:text-5xl">
                {lang === 'pt' ? 'Artigo não encontrado' : lang === 'en' ? 'Article not found' : 'Artículo no encontrado'}
              </h1>
              <Link to={blogBase} className="fx-btn mt-8"><ArrowLeft aria-hidden="true" /> {backLabel}</Link>
            </div>
          </section>
        </main>
        <Footer currentLang={lang} />
      </div>
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
      <div className="fx-site min-h-screen">
        <SEO title={staticPost.seoTitle || `${staticPost.title} — Ferova Agency`} description={staticPost.content[0]?.slice(0, 155) || staticPost.title} path={postPath} lang={lang} type="article" jsonLd={articleLd} breadcrumbs={[{ name: 'Blog', path: blogBase }, { name: staticPost.title, path: postPath }]} />
        <Header currentLang={lang} />
        <main id="contenido-principal" className="pt-20">
          <section className="page-hero on-dark grid-field">
            <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
              <Link to={blogBase} className="fx-muted mb-6 flex w-fit items-center gap-2 text-sm hover:text-white">
                <ArrowLeft aria-hidden="true" className="h-4 w-4" /> {backLabel}
              </Link>
              <p className="eyebrow-pill mb-5">{staticPost.category}</p>
              <h1 className="max-w-4xl text-4xl leading-[1.15] sm:text-5xl">{staticPost.title}</h1>
              <p className="fx-muted mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="inline-flex items-center gap-1"><User aria-hidden="true" className="h-4 w-4" /> {staticPost.author}</span>
                <span>{staticPost.date}</span>
                <span className="inline-flex items-center gap-1"><Clock aria-hidden="true" className="h-4 w-4" /> {staticPost.readTime}</span>
              </p>
            </div>
          </section>
          <article className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <AdBanner slot="blog-post-top" className="mb-8" />
            <div className="fx-prose">
              {staticPost.content.map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  const [heading, ...rest] = paragraph.split('\n\n');
                  return (
                    <div key={i}>
                      <h2>{heading.replace('## ', '')}</h2>
                      {rest.map((p, j) => <p key={j} className="fx-muted">{p}</p>)}
                    </div>
                  );
                }
                return <p key={i} className="fx-muted">{paragraph}</p>;
              })}
            </div>
            <AdBanner slot="blog-post-bottom" className="mt-10" />
          </article>
          <CtaBand
            title={lang === 'pt' ? 'Quer resultados assim para seu e-commerce?' : lang === 'en' ? 'Want results like these for your e-commerce?' : '¿Quieres resultados así para tu e-commerce?'}
            body={lang === 'pt' ? 'Fale conosco e ajudamos a escalar sua loja virtual.' : lang === 'en' ? 'Contact us and we\'ll help you scale your online store.' : 'Escríbenos y te ayudamos a escalar tu tienda online.'}
          >
            <FxLink to="https://wa.me/17866894686">WhatsApp</FxLink>
            <FxLink to={contactPath} variant="outline">
              {lang === 'pt' ? 'Cotizar com Fera' : lang === 'en' ? 'Quote with Fera' : 'Cotizar con Fera'}
            </FxLink>
          </CtaBand>
        </main>
        <Footer currentLang={lang} />
      </div>
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
  const openFera = (source: string) =>
    openFeraChat(en ? `I read "${post.title}" and want to talk about my case.` : `Leí "${post.title}" y quiero hablar de mi caso.`, `blog_post_${source}`);
  const t = en
    ? { toc: 'In this article', sideTitle: 'Facing something similar?', sideBody: 'Tell Fera about the project and get scope and availability.', midTitle: 'Want this done for your agency’s client?', midBody: 'Describe the deliverable in two lines and Fera prepares the scope: task, hours or monthly capacity.', cta: 'Talk to Fera', closeTitle: 'Tell me what you need to solve.', closeBody: 'We start from the work. The collaboration model follows the real scope.' }
    : { toc: 'En este artículo', sideTitle: '¿Te pasa algo parecido?', sideBody: 'Cuéntale a Fera el proyecto y recibe alcance y disponibilidad.', midTitle: '¿Quieres que lo resolvamos para un cliente de tu agencia?', midBody: 'Describe la entrega en dos líneas y Fera prepara el alcance: por tarea, por horas o capacidad mensual.', cta: 'Hablar con Fera', closeTitle: 'Cuéntame qué necesitas resolver.', closeBody: 'Empezamos por el trabajo. La modalidad la definimos a partir del alcance real.' };

  return (
    <div className="fx-site min-h-screen">
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
      <main id="contenido-principal" className="pt-20">
        <section className="page-hero on-dark grid-field">
          <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
            <Link to={blogBase} className="fx-muted mb-6 flex w-fit items-center gap-2 text-sm hover:text-white">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> {backLabel}
            </Link>
            {post.category ? <p className="eyebrow-pill mb-5">{post.category}</p> : null}
            <h1 className="max-w-4xl text-4xl leading-[1.15] sm:text-5xl">{post.title}</h1>
            {post.excerpt ? <p className="fx-muted mt-6 max-w-3xl text-lg leading-relaxed">{post.excerpt}</p> : null}
            <p className="fx-muted mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
              <span className="inline-flex items-center gap-1"><User aria-hidden="true" className="h-4 w-4" /> {author}</span>
              <span>{dateStr}</span>
              <span className="inline-flex items-center gap-1"><Clock aria-hidden="true" className="h-4 w-4" /> {readTime}</span>
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <div className="min-w-0">
              {post.cover_image ? (
                <img src={post.cover_image} alt={post.title} width={1600} height={900} fetchPriority="high" className="mb-10 aspect-[16/9] w-full rounded-[1.25rem] object-cover" />
              ) : null}
              {parts ? (
                <article>
                  <div className="prose-blog article-body" dangerouslySetInnerHTML={{ __html: parts[0] }} />
                  <aside className="article-cta" aria-label={t.midTitle}>
                    <p className="text-xl font-semibold" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>{t.midTitle}</p>
                    <p className="fx-muted mt-2 leading-relaxed">{t.midBody}</p>
                    <button type="button" onClick={() => openFera('mid')} className="fx-btn mt-5">{t.cta} <ArrowUpRight aria-hidden="true" /></button>
                  </aside>
                  <div className="prose-blog article-body" dangerouslySetInnerHTML={{ __html: parts[1] }} />
                </article>
              ) : (
                <article className="prose-blog article-body" dangerouslySetInnerHTML={{ __html: tocHtml }} />
              )}
            </div>
            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              {toc.length > 1 ? (
                <nav aria-label={t.toc} className="panel-card hidden lg:block">
                  <p className="text-lg font-semibold" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>{t.toc}</p>
                  <ol className="mt-4 space-y-3 text-sm leading-snug">
                    {toc.map((item) => (
                      <li key={item.id}><a href={`#${item.id}`} className="fx-muted hover:text-[#541014] hover:underline">{item.label}</a></li>
                    ))}
                  </ol>
                </nav>
              ) : null}
              <div className="panel-card">
                <p className="text-lg font-semibold" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>{t.sideTitle}</p>
                <p className="fx-muted mt-2 text-sm leading-relaxed">{t.sideBody}</p>
                <button type="button" onClick={() => openFera('sidebar')} className="fx-btn fx-btn--sm mt-5 w-full">{t.cta} <ArrowUpRight aria-hidden="true" /></button>
              </div>
            </aside>
          </div>
        </section>

        <CtaBand title={t.closeTitle} body={t.closeBody}>
          <button type="button" onClick={() => openFera('final')} className="fx-btn">{t.cta} <ArrowUpRight aria-hidden="true" /></button>
          <FxLink to={contactPath} variant="outline">{en ? 'Contact' : 'Contacto'}</FxLink>
        </CtaBand>
      </main>
      <Footer currentLang={lang} />
    </div>
  );
};

export default BlogPost;
