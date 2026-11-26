import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AdBanner from '@/components/ui/ad-banner';
import ReadingProgress from '@/components/ui/reading-progress';
import { SkeletonBlogCard } from '@/components/ui/skeleton-card';
import { Search } from 'lucide-react';
import { getSupabase } from '@/integrations/supabase/lazy';
import SEO from '@/components/SEO';
import { BLOG_SITE_ORIGINS } from '@/lib/blog-i18n';
import { SITE_ORIGIN } from '@/config/routes';
import { CtaBand, FeraButton, FxLink, PageHero, Section } from '@/components/fx/primitives';

interface Props { lang?: 'es' | 'en' | 'pt'; }

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  cover?: string;
  publishedAt?: string;
}

const staticPosts: Record<string, BlogPost[]> = {
  es: [
    { slug: 'seo-ecommerce-guia-completa-2025', title: 'SEO para E-commerce: Guía Completa 2025', excerpt: 'Aprende las estrategias más efectivas de SEO para posicionar tu tienda online en Google y aumentar tus ventas orgánicas.', author: 'Ferova Agency', date: '15 Mar 2025', readTime: '12 min', category: 'SEO' },
    { slug: 'web-apps-vs-wordpress-ecommerce', title: 'Web Apps vs WordPress: ¿Cuál es mejor para tu E-commerce?', excerpt: 'Análisis detallado comparando Web Apps modernas vs WordPress tradicional en velocidad, seguridad, SEO y conversión.', author: 'Ferova Agency', date: '10 Mar 2025', readTime: '8 min', category: 'Web Development' },
    { slug: 'core-web-vitals-ecommerce', title: 'Core Web Vitals: Cómo mejorarlos en tu tienda online', excerpt: 'Los Core Web Vitals afectan directamente tu posicionamiento en Google. Te enseñamos cómo optimizarlos paso a paso.', author: 'Ferova Agency', date: '5 Mar 2025', readTime: '10 min', category: 'Performance' },
  ],
  en: [
    { slug: 'ecommerce-seo-complete-guide-2025', title: 'E-commerce SEO: Complete Guide 2025', excerpt: 'Learn the most effective SEO strategies to rank your online store on Google and increase your organic sales.', author: 'Ferova Agency', date: 'Mar 15, 2025', readTime: '12 min', category: 'SEO' },
    { slug: 'web-apps-vs-wordpress-ecommerce', title: 'Web Apps vs WordPress: Which is better for your E-commerce?', excerpt: 'Detailed analysis comparing modern Web Apps vs traditional WordPress in speed, security, SEO and conversion.', author: 'Ferova Agency', date: 'Mar 10, 2025', readTime: '8 min', category: 'Web Development' },
    { slug: 'core-web-vitals-ecommerce', title: 'Core Web Vitals: How to improve them in your online store', excerpt: 'Core Web Vitals directly affect your Google ranking. We teach you how to optimize them step by step.', author: 'Ferova Agency', date: 'Mar 5, 2025', readTime: '10 min', category: 'Performance' },
  ],
};

const estimateReadTime = (content: string) => {
  const words = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
};

const Blog = ({ lang = 'es' }: Props) => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [dbPosts, setDbPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const supabase = await getSupabase();
        const { data } = await supabase
          .from('blog_posts')
          .select('slug, title, excerpt, author, category, content, created_at, published_at, cover_image')
          .eq('language', lang === 'en' ? 'en' : 'es')
          .eq('active', true)
          .in('site_origin', [...BLOG_SITE_ORIGINS])
          .lte('published_at', new Date().toISOString())
          .order('published_at', { ascending: false })
          .limit(50);

        if (data && data.length > 0) {
          setDbPosts(data.map((p) => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt || '',
            author: p.author || 'Ferova Agency',
            date: new Date(p.created_at).toLocaleDateString(lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-US' : 'es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
            readTime: estimateReadTime(p.content || ''),
            category: p.category || 'General',
            cover: p.cover_image || undefined,
            publishedAt: p.published_at || undefined,
          })));
        }
      } catch {
        // silently fail, show static posts
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [lang]);

  const allPosts = [...dbPosts, ...(staticPosts[lang] ?? staticPosts['es'])];
  const categories = [...new Set(allPosts.map((post) => post.category))];

  const filtered = allPosts.filter((post) => {
    if (category && post.category !== category) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q) || post.category.toLowerCase().includes(q);
  });

  const seo = lang === 'en'
    ? { t: 'E-commerce Blog — SEO, Web Apps & AI | Ferova Agency', d: 'Guides and strategies to grow your online store: SEO, conversion, web apps and AI for e-commerce.', p: '/en/blog' }
    : lang === 'pt'
    ? { t: 'Blog de E-commerce — SEO, Web Apps e IA | Ferova', d: 'Guias e estratégias para crescer sua loja virtual: SEO, conversão, web apps e IA para e-commerce.', p: '/pt/blog' }
    : { t: 'Blog de E-commerce — SEO, Web Apps e IA | Ferova', d: 'Guías y estrategias para hacer crecer tu tienda online: SEO, conversión, web apps e IA para e-commerce.', p: '/blog' };

  const ui = lang === 'en'
    ? { home: 'Home', homePath: '/en', intro: 'Resources, guides and strategies to master SEO and e-commerce.', search: 'Search by topic, keyword or category...', none: 'No articles found.', more: 'Read more', all: 'All', filters: 'Blog categories', closeTitle: 'Tell me what you need to solve.', closeBody: 'We start from the work. The collaboration model follows the real scope.', cta: 'Talk to Fera', secondary: 'White-label SEO for agencies', secondaryPath: '/en/white-label-seo-for-agencies' }
    : lang === 'pt'
    ? { home: 'Início', homePath: '/', intro: 'Recursos, guias e estratégias para dominar o SEO e o e-commerce.', search: 'Buscar por tema, palavra-chave ou categoria...', none: 'Nenhum artigo encontrado.', more: 'Ler mais', all: 'Todos', filters: 'Categorias do blog', closeTitle: 'Conte o que você precisa resolver.', closeBody: 'Começamos pelo trabalho. O modelo de colaboração parte do escopo real.', cta: 'Falar com a Fera', secondary: 'SEO para agências', secondaryPath: '/seo-para-agencias' }
    : { home: 'Inicio', homePath: '/', intro: 'Recursos, guías y estrategias para dominar el SEO y el e-commerce.', search: 'Buscar por tema, keyword o categoría...', none: 'No se encontraron artículos.', more: 'Leer más', all: 'Todos', filters: 'Categorías del blog', closeTitle: 'Cuéntame qué necesitas resolver.', closeBody: 'Empezamos por el trabajo. La modalidad la definimos a partir del alcance real.', cta: 'Hablar con Fera', secondary: 'SEO para agencias', secondaryPath: '/seo-para-agencias' };

  const breadcrumbs = [{ name: ui.home, path: ui.homePath }, { name: 'Blog', path: seo.p }];
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_ORIGIN}${seo.p}#blog`,
    name: seo.t,
    url: `${SITE_ORIGIN}${seo.p}`,
    inLanguage: lang,
    publisher: { '@type': 'Organization', name: 'Ferova', url: SITE_ORIGIN },
    blogPost: allPosts.slice(0, 20).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_ORIGIN}${seo.p}/${post.slug}`,
      author: { '@type': post.author === 'Ferova Agency' ? 'Organization' : 'Person', name: post.author },
      ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
      ...(post.cover ? { image: post.cover } : {}),
    })),
  };

  return (
    <div className="fx-site min-h-screen">
      <SEO title={seo.t} description={seo.d} path={seo.p} lang={lang} breadcrumbs={breadcrumbs} jsonLd={blogSchema} />
      <ReadingProgress />
      <Header currentLang={lang} />
      <main id="contenido-principal" className="pt-20">
        <PageHero eyebrow={lang === 'en' ? 'SEO · E-commerce · AI' : 'SEO · E-commerce · IA'} title="Blog" intro={ui.intro} breadcrumbs={breadcrumbs.slice(1)} lang={lang}>
          <label className="flex min-h-12 w-full max-w-md items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5">
            <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-[#d3d0e4]" />
            <span className="sr-only">{ui.search}</span>
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={ui.search} className="min-h-12 w-full bg-transparent text-white outline-none placeholder:text-[#d3d0e4]" />
          </label>
        </PageHero>

        <Section>
          {categories.length > 1 ? (
            <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={ui.filters}>
              {[null, ...categories].map((item) => (
                <button key={item ?? 'all'} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className="pill-filter">
                  {item ?? ui.all}
                </button>
              ))}
            </div>
          ) : null}

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><SkeletonBlogCard /><SkeletonBlogCard /><SkeletonBlogCard /></div>
          ) : filtered.length === 0 ? (
            <p role="status" className="fx-muted py-12 text-center">{ui.none}</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <li key={`${post.slug}-${i}`}>
                  <Link to={`${seo.p}/${post.slug}`} className="post-card group">
                    {post.cover ? (
                      <img src={post.cover} alt="" loading="lazy" width={1600} height={1000} className="aspect-[16/10] w-full object-cover" />
                    ) : (
                      <span className="post-card__cover" aria-hidden="true">{post.category}</span>
                    )}
                    <span className="flex flex-1 flex-col p-7">
                      <span className="fx-muted text-sm">{[post.category, post.date, post.readTime].join(' · ')}</span>
                      <span className="mt-2 text-xl font-semibold leading-snug" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>{post.title}</span>
                      {post.excerpt ? <span className="fx-muted mt-3 line-clamp-3 leading-relaxed">{post.excerpt}</span> : null}
                      <span className="fx-muted mt-4 text-sm">{post.author}</span>
                      <span className="mt-auto pt-5 font-semibold text-[#541014] group-hover:underline">{ui.more} →</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <AdBanner slot="blog-list-bottom" className="mt-12" />
        </Section>

        <CtaBand title={ui.closeTitle} body={ui.closeBody}>
          <FeraButton source={`blog_index_${lang}_final`}>{ui.cta}</FeraButton>
          <FxLink to={ui.secondaryPath} variant="outline">{ui.secondary}</FxLink>
        </CtaBand>
      </main>
      <Footer currentLang={lang} />
    </div>
  );
};

export default Blog;
