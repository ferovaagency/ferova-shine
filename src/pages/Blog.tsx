import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import ReadingProgress from '@/components/ui/reading-progress';
import { SkeletonBlogCard } from '@/components/ui/skeleton-card';
import { Clock, ArrowRight, User } from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const blogPosts = {
  es: [
    {
      slug: 'seo-ecommerce-guia-completa-2025',
      title: 'SEO para E-commerce: Guía Completa 2025',
      excerpt: 'Aprende las estrategias más efectivas de SEO para posicionar tu tienda online en Google y aumentar tus ventas orgánicas.',
      author: 'Ferova Agency',
      date: '15 Mar 2025',
      readTime: '12 min',
      category: 'SEO',
    },
    {
      slug: 'web-apps-vs-wordpress-ecommerce',
      title: 'Web Apps vs WordPress: ¿Cuál es mejor para tu E-commerce?',
      excerpt: 'Análisis detallado comparando Web Apps modernas vs WordPress tradicional en velocidad, seguridad, SEO y conversión.',
      author: 'Ferova Agency',
      date: '10 Mar 2025',
      readTime: '8 min',
      category: 'Web Development',
    },
    {
      slug: 'core-web-vitals-ecommerce',
      title: 'Core Web Vitals: Cómo mejorarlos en tu tienda online',
      excerpt: 'Los Core Web Vitals afectan directamente tu posicionamiento en Google. Te enseñamos cómo optimizarlos paso a paso.',
      author: 'Ferova Agency',
      date: '5 Mar 2025',
      readTime: '10 min',
      category: 'Performance',
    },
  ],
  en: [
    {
      slug: 'ecommerce-seo-complete-guide-2025',
      title: 'E-commerce SEO: Complete Guide 2025',
      excerpt: 'Learn the most effective SEO strategies to rank your online store on Google and increase your organic sales.',
      author: 'Ferova Agency',
      date: 'Mar 15, 2025',
      readTime: '12 min',
      category: 'SEO',
    },
    {
      slug: 'web-apps-vs-wordpress-ecommerce',
      title: 'Web Apps vs WordPress: Which is better for your E-commerce?',
      excerpt: 'Detailed analysis comparing modern Web Apps vs traditional WordPress in speed, security, SEO and conversion.',
      author: 'Ferova Agency',
      date: 'Mar 10, 2025',
      readTime: '8 min',
      category: 'Web Development',
    },
    {
      slug: 'core-web-vitals-ecommerce',
      title: 'Core Web Vitals: How to improve them in your online store',
      excerpt: 'Core Web Vitals directly affect your Google ranking. We teach you how to optimize them step by step.',
      author: 'Ferova Agency',
      date: 'Mar 5, 2025',
      readTime: '10 min',
      category: 'Performance',
    },
  ],
};

const Blog = ({ lang = 'es' }: Props) => {
  const posts = blogPosts[lang];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ReadingProgress />
      <Header currentLang={lang} />
      <main className="pt-20">
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">Blog</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {lang === 'es' ? 'Recursos, guías y estrategias para dominar el SEO y el e-commerce.' : 'Resources, guides and strategies to master SEO and e-commerce.'}
            </p>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {posts.map((post, i) => (
                <Link
                  key={i}
                  to={`${lang === 'es' ? '/blog' : '/en/blog'}/${post.slug}`}
                  className="glass-card p-6 md:p-8 block hover:border-gold/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'hsla(45, 86%, 40%, 0.1)', color: 'hsl(45, 86%, 40%)' }}>
                      {post.category}
                    </span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-display font-bold mb-3 text-foreground group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <User className="w-3 h-3" /> {post.author} · {post.date}
                    </div>
                    <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                      {lang === 'es' ? 'Leer más' : 'Read more'} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}

              <AdBanner slot="blog-list-bottom" className="mt-8" />
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default Blog;
