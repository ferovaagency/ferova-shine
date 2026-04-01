import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { ArrowLeft, Clock, User, MessageCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Props { lang?: 'es' | 'en' | 'pt'; }

interface PostData {
  title: string;
  author: string;
  category: string;
  content: string;
  created_at: string;
  meta_title: string | null;
  meta_description: string | null;
}

const staticPosts: Record<string, Record<string, { title: string; author: string; date: string; readTime: string; category: string; content: string[] }>> = {
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
      author: 'Ferova Agency', date: 'Mar 10, 2025', readTime: '8 min', category: 'Web Development',
      content: [
        'Choosing the right platform can make or break your online business.',
        '## Loading speed\n\nWeb Apps load in under 1 second, while a typical WordPress site takes 3-8 seconds.',
        '## Security\n\nWordPress is the most hacked CMS in the world. Web Apps have an inherently more secure architecture.',
      ],
    },
    'core-web-vitals-ecommerce': {
      title: 'Core Web Vitals: How to improve them in your online store',
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
  const [dbPost, setDbPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const staticPost = slug ? staticPosts[lang]?.[slug] : null;

  const blogBase = lang === 'pt' ? '/pt/blog' : lang === 'en' ? '/en/blog' : '/blog';
  const contactPath = lang === 'pt' ? '/pt/contato' : lang === 'en' ? '/en/contact' : '/contacto';
  const backLabel = lang === 'pt' ? 'Voltar ao blog' : lang === 'en' ? 'Back to blog' : 'Volver al blog';

  useEffect(() => {
    if (staticPost || !slug) {
      setLoading(false);
      if (!staticPost && !slug) setNotFound(true);
      return;
    }

    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('title, author, category, content, created_at, meta_title, meta_description')
          .eq('slug', slug)
          .eq('active', true)
          .lte('published_at', new Date().toISOString())
          .maybeSingle();

        if (error || !data) {
          setNotFound(true);
        } else {
          setDbPost(data);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, staticPost]);

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
    return (
      <>
        <Header currentLang={lang} />
        <main className="pt-20">
          <article className="py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-3xl mx-auto">
                <Link to={blogBase} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 text-sm">
                  <ArrowLeft className="w-4 h-4" /> {backLabel}
                </Link>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs px-3 py-1 rounded-full font-medium bg-primary/10 text-primary">{staticPost.category}</span>
                  <span className="text-muted-foreground text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {staticPost.readTime}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">{staticPost.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-12 pb-8 border-b border-border/30">
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> {staticPost.author}</span>
                  <span>{staticPost.date}</span>
                </div>
                <AdBanner slot="blog-post-top" className="mb-10" />
                <div className="prose prose-invert max-w-none space-y-6">
                  {staticPost.content.map((paragraph, i) => {
                    if (paragraph.startsWith('## ')) {
                      const [heading, ...rest] = paragraph.split('\n\n');
                      return (
                        <div key={i}>
                          <h2 className="text-xl font-display font-bold mt-10 mb-4 text-foreground">{heading.replace('## ', '')}</h2>
                          {rest.map((p, j) => <p key={j} className="text-muted-foreground leading-relaxed mb-4">{p}</p>)}
                        </div>
                      );
                    }
                    return <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>;
                  })}
                </div>
                <AdBanner slot="blog-post-bottom" className="mt-12" />
                <CtaBlock lang={lang} contactPath={contactPath} />
              </div>
            </div>
          </article>
        </main>
        <Footer currentLang={lang} />
        <ChatWidget lang={lang} />
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

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        <article className="py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto" style={{ maxWidth: '720px' }}>
              <Link to={blogBase} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 text-sm">
                <ArrowLeft className="w-4 h-4" /> {backLabel}
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs px-3 py-1 rounded-full font-medium bg-primary/10 text-primary">{post.category || 'General'}</span>
                <span className="text-muted-foreground text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {readTime}</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 leading-tight">{post.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm mb-8 pb-6 border-b border-border/30">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author || 'Maria Calderon'}</span>
                <span>{dateStr}</span>
              </div>
              <AdBanner slot="blog-post-top" className="mb-8" />
              <article
                className="blog-content prose prose-sm max-w-none text-foreground dark:prose-invert"
                style={{ lineHeight: '1.6' }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              <AdBanner slot="blog-post-bottom" className="mt-10" />
              <CtaBlock lang={lang} contactPath={contactPath} />
            </div>
          </div>
        </article>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
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
      <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center justify-center gap-2">
        <MessageCircle className="w-5 h-5" /> WhatsApp
      </a>
      <Link to={contactPath} className="btn-outline-gold text-center">
        {lang === 'pt' ? 'Formulário' : lang === 'en' ? 'Contact form' : 'Formulario'}
      </Link>
    </div>
  </div>
);

export default BlogPost;
