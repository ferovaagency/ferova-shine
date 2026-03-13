import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import AdBanner from '@/components/ui/ad-banner';
import { ArrowLeft, Clock, User, MessageCircle } from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const postsContent: Record<string, Record<string, { title: string; author: string; date: string; readTime: string; category: string; content: string[] }>> = {
  es: {
    'seo-ecommerce-guia-completa-2025': {
      title: 'SEO para E-commerce: Guía Completa 2025',
      author: 'Ferova Agency', date: '15 Mar 2025', readTime: '12 min', category: 'SEO',
      content: [
        'El SEO para e-commerce es una de las estrategias más rentables para aumentar las ventas de tu tienda online. A diferencia de la publicidad pagada, el tráfico orgánico tiene un costo de adquisición que disminuye con el tiempo.',
        'En esta guía, cubriremos las estrategias clave que implementamos en Ferova Agency para posicionar tiendas online en las primeras posiciones de Google.',
        '## Arquitectura del sitio\n\nUna buena arquitectura de sitio es fundamental para el SEO de e-commerce. Debes asegurarte de que Google pueda rastrear e indexar todas tus páginas de producto de manera eficiente. Utiliza una estructura de categorías clara y lógica, con URLs amigables.',
        '## Optimización de fichas de producto\n\nCada ficha de producto es una oportunidad de posicionamiento. Incluye títulos únicos con la keyword principal, meta descriptions persuasivas, descripciones detalladas y únicas, y datos estructurados de producto (Schema.org).',
        '## Content marketing para e-commerce\n\nEl contenido informativo es clave para atraer tráfico top-of-funnel. Crea guías de compra, comparativas, y artículos educativos que posicionen tu marca como autoridad en tu nicho.',
        '## Core Web Vitals\n\nGoogle premia los sitios rápidos y con buena experiencia de usuario. Las Web Apps modernas tienen una ventaja significativa sobre WordPress en este aspecto, con tiempos de carga inferiores a 1 segundo.',
      ],
    },
    'web-apps-vs-wordpress-ecommerce': {
      title: 'Web Apps vs WordPress: ¿Cuál es mejor para tu E-commerce?',
      author: 'Ferova Agency', date: '10 Mar 2025', readTime: '8 min', category: 'Web Development',
      content: [
        'La elección de la plataforma correcta puede hacer o deshacer tu negocio online. En este artículo comparamos las Web Apps modernas (como las que desarrollamos en Ferova) con WordPress tradicional.',
        '## Velocidad de carga\n\nLas Web Apps cargan en menos de 1 segundo, mientras que un WordPress típico tarda entre 3-8 segundos. Esta diferencia impacta directamente en las conversiones: cada segundo de retraso reduce las conversiones en un 7%.',
        '## Seguridad\n\nWordPress es el CMS más hackeado del mundo, con el 90% de los ataques dirigidos a plugins vulnerables. Las Web Apps tienen una arquitectura inherentemente más segura, sin plugins de terceros que comprometan tu sitio.',
        '## SEO técnico\n\nLas Web Apps permiten optimización a nivel de código, algo imposible con WordPress sin modificar el core. Estructura de datos, renderizado, lazy loading y Core Web Vitals se optimizan nativamente.',
        '## Escalabilidad\n\nWordPress se ralentiza con el tráfico y los productos. Las Web Apps escalan automáticamente, manteniendo el rendimiento sin importar cuántos visitantes o productos tengas.',
      ],
    },
    'core-web-vitals-ecommerce': {
      title: 'Core Web Vitals: Cómo mejorarlos en tu tienda online',
      author: 'Ferova Agency', date: '5 Mar 2025', readTime: '10 min', category: 'Performance',
      content: [
        'Los Core Web Vitals son métricas de experiencia de usuario que Google utiliza como factor de ranking. Para las tiendas online, tener buenos Core Web Vitals es crucial para el posicionamiento y las conversiones.',
        '## LCP (Largest Contentful Paint)\n\nEl LCP mide cuánto tarda en renderizarse el elemento más grande visible. Para e-commerce, esto suele ser la imagen principal del producto. Optimiza imágenes con WebP, usa lazy loading y prioriza el contenido above-the-fold.',
        '## FID / INP (Interaction to Next Paint)\n\nMide la interactividad de tu sitio. Minimiza el JavaScript de terceros, optimiza event handlers y usa code splitting para reducir el bundle inicial.',
        '## CLS (Cumulative Layout Shift)\n\nMide la estabilidad visual. Define dimensiones de imágenes, usa font-display: swap y evita contenido dinámico que desplace elementos visibles.',
        '## La ventaja de las Web Apps\n\nLas Web Apps modernas superan consistentemente a WordPress en Core Web Vitals. En Ferova, garantizamos que tu sitio apruebe los Core Web Vitals desde el primer día.',
      ],
    },
  },
  en: {
    'ecommerce-seo-complete-guide-2025': {
      title: 'E-commerce SEO: Complete Guide 2025',
      author: 'Ferova Agency', date: 'Mar 15, 2025', readTime: '12 min', category: 'SEO',
      content: [
        'E-commerce SEO is one of the most profitable strategies to increase your online store sales. Unlike paid advertising, organic traffic has a decreasing acquisition cost over time.',
        'In this guide, we will cover the key strategies we implement at Ferova Agency to rank online stores at the top of Google.',
        '## Site architecture\n\nGood site architecture is fundamental for e-commerce SEO. Make sure Google can crawl and index all your product pages efficiently. Use a clear and logical category structure with friendly URLs.',
        '## Product page optimization\n\nEach product page is a ranking opportunity. Include unique titles with the main keyword, persuasive meta descriptions, detailed and unique descriptions, and product structured data (Schema.org).',
        '## Content marketing for e-commerce\n\nInformational content is key to attracting top-of-funnel traffic. Create buying guides, comparisons, and educational articles that position your brand as an authority in your niche.',
      ],
    },
    'web-apps-vs-wordpress-ecommerce': {
      title: 'Web Apps vs WordPress: Which is better for your E-commerce?',
      author: 'Ferova Agency', date: 'Mar 10, 2025', readTime: '8 min', category: 'Web Development',
      content: [
        'Choosing the right platform can make or break your online business. In this article we compare modern Web Apps (like those we develop at Ferova) with traditional WordPress.',
        '## Loading speed\n\nWeb Apps load in under 1 second, while a typical WordPress site takes 3-8 seconds. This difference directly impacts conversions: every second of delay reduces conversions by 7%.',
        '## Security\n\nWordPress is the most hacked CMS in the world, with 90% of attacks targeting vulnerable plugins. Web Apps have an inherently more secure architecture, without third-party plugins compromising your site.',
      ],
    },
    'core-web-vitals-ecommerce': {
      title: 'Core Web Vitals: How to improve them in your online store',
      author: 'Ferova Agency', date: 'Mar 5, 2025', readTime: '10 min', category: 'Performance',
      content: [
        'Core Web Vitals are user experience metrics that Google uses as a ranking factor. For online stores, having good Core Web Vitals is crucial for positioning and conversions.',
        '## LCP (Largest Contentful Paint)\n\nLCP measures how long the largest visible element takes to render. For e-commerce, this is usually the main product image. Optimize images with WebP, use lazy loading and prioritize above-the-fold content.',
        '## The Web Apps advantage\n\nModern Web Apps consistently outperform WordPress in Core Web Vitals. At Ferova, we guarantee your site passes Core Web Vitals from day one.',
      ],
    },
  },
};

const BlogPost = ({ lang = 'es' }: Props) => {
  const { slug } = useParams();
  const post = slug ? postsContent[lang]?.[slug] : null;

  if (!post) {
    return (
      <>
        <Header currentLang={lang} />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-display font-bold mb-4">
              {lang === 'es' ? 'Artículo no encontrado' : 'Article not found'}
            </h1>
            <Link to={lang === 'es' ? '/blog' : '/en/blog'} className="text-gold hover:underline">
              {lang === 'es' ? 'Volver al blog' : 'Back to blog'}
            </Link>
          </div>
        </main>
        <Footer currentLang={lang} />
      </>
    );
  }

  return (
    <>
      <Header currentLang={lang} />
      <main className="pt-20">
        <article className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <Link to={lang === 'es' ? '/blog' : '/en/blog'} className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8 text-sm">
                <ArrowLeft className="w-4 h-4" /> {lang === 'es' ? 'Volver al blog' : 'Back to blog'}
              </Link>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: 'hsla(45, 86%, 40%, 0.1)', color: 'hsl(45, 86%, 40%)' }}>
                  {post.category}
                </span>
                <span className="text-muted-foreground text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">{post.title}</h1>

              <div className="flex items-center gap-4 text-muted-foreground text-sm mb-12 pb-8 border-b border-border/30">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                <span>{post.date}</span>
              </div>

              <AdBanner slot="blog-post-top" className="mb-10" />

              <div className="prose prose-invert max-w-none space-y-6">
                {post.content.map((paragraph, i) => {
                  if (paragraph.startsWith('## ')) {
                    const [heading, ...rest] = paragraph.split('\n\n');
                    return (
                      <div key={i}>
                        <h2 className="text-2xl font-display font-bold mt-10 mb-4 text-foreground">{heading.replace('## ', '')}</h2>
                        {rest.map((p, j) => (
                          <p key={j} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
                        ))}
                      </div>
                    );
                  }
                  return <p key={i} className="text-muted-foreground leading-relaxed">{paragraph}</p>;
                })}
              </div>

              <AdBanner slot="blog-post-bottom" className="mt-12" />

              {/* CTA */}
              <div className="glass-card p-8 mt-12 text-center gold-glow">
                <h3 className="text-2xl font-display font-bold mb-4">
                  {lang === 'es' ? '¿Quieres resultados así para tu e-commerce?' : 'Want results like these for your e-commerce?'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {lang === 'es' ? 'Escríbenos y te ayudamos a escalar tu tienda online.' : 'Contact us and we\'ll help you scale your online store.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://wa.me/17865787671" target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> WhatsApp
                  </a>
                  <Link to={lang === 'es' ? '/contacto' : '/en/contact'} className="btn-outline-gold text-center">
                    {lang === 'es' ? 'Formulario' : 'Contact form'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </>
  );
};

export default BlogPost;
