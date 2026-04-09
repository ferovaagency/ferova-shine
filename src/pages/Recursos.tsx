import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { BookOpen, Globe, Mail, FileText, Calendar, BarChart3, Lock, ArrowRight, Download, MessageCircle, ExternalLink } from 'lucide-react';

interface Props { lang?: 'es' | 'en' | 'pt'; }

const categories = [
  { id: 'all', es: 'Todos', en: 'All' },
  { id: 'ebook', es: 'Ebooks', en: 'Ebooks', icon: BookOpen },
  { id: 'webapp', es: 'Web Apps', en: 'Web Apps', icon: Globe },
  { id: 'newsletter', es: 'Newsletters', en: 'Newsletters', icon: Mail },
  { id: 'report', es: 'Informes', en: 'Reports', icon: FileText },
  { id: 'summary', es: 'Resúmenes', en: 'Summaries', icon: BarChart3 },
  { id: 'event', es: 'Eventos', en: 'Events', icon: Calendar },
];

const resources = {
  es: [
    {
      title: 'Guía SEO para E-commerce 2025',
      desc: 'Todo lo que necesitas saber para posicionar tu tienda online en Google y ser recomendado por IAs como ChatGPT y Perplexity.',
      category: 'ebook',
      type: 'free',
      image: '📘',
      link: '#',
    },
    {
      title: 'Checklist: Web App vs WordPress',
      desc: 'Compara punto por punto y decide qué plataforma necesita tu negocio. Incluye criterios de velocidad, SEO, costo y mantenimiento.',
      category: 'ebook',
      type: 'free',
      image: '✅',
      link: '#',
    },
    {
      title: 'Plantilla de Auditoría SEO Técnica',
      desc: 'La misma plantilla que usamos en Ferova Agency para auditar sitios de nuestros clientes. Lista para usar en Google Sheets.',
      category: 'report',
      type: 'pro',
      price: { usd: 29, cop: 115000 },
      image: '📊',
      link: 'https://ferova.lemonsqueezy.com/checkout/buy/88f0cdf8-7c81-4ea2-a3c3-14f16dce0b24',
    },
    {
      title: 'Demo: Web App E-commerce',
      desc: 'Explora una Web App de tienda online completamente funcional con carga menor a 1 segundo y IA integrada.',
      category: 'webapp',
      type: 'free',
      image: '🚀',
      link: '#',
    },
    {
      title: 'Newsletter Semanal de SEO & IA',
      desc: 'Recibe cada lunes las últimas tendencias de SEO, GEO (posicionamiento en IAs) y marketing digital. Más de 500 lectores.',
      category: 'newsletter',
      type: 'free',
      image: '📬',
      link: '#',
    },
    {
      title: 'Resumen: Google Core Updates 2024-2025',
      desc: 'Impacto real en e-commerce colombiano y latinoamericano, y qué acciones tomar para cada actualización de Google.',
      category: 'summary',
      type: 'free',
      image: '🔍',
      link: '#',
    },
    {
      title: 'Masterclass: De sitio tradicional a Web App',
      desc: 'Evento grabado donde mostramos el proceso completo de migración de un sitio tradicional a una Web App de alto rendimiento paso a paso.',
      category: 'event',
      type: 'free',
      image: '🎓',
      link: '#',
    },
    {
      title: 'Kit de Estrategia Digital Completo',
      desc: 'Templates, frameworks y guías para planificar tu estrategia de SEO, pauta y contenido para los próximos 12 meses.',
      category: 'ebook',
      type: 'pro',
      price: { usd: 79, cop: 315000 },
      image: '🎯',
      link: 'https://ferova.lemonsqueezy.com/checkout/buy/88f0cdf8-7c81-4ea2-a3c3-14f16dce0b24',
    },
  ],
  en: [
    {
      title: 'E-commerce SEO Guide 2025',
      desc: 'Everything you need to know to rank your online store on Google and get recommended by AIs like ChatGPT and Perplexity.',
      category: 'ebook',
      type: 'free',
      image: '📘',
      link: '#',
    },
    {
      title: 'Checklist: Web App vs WordPress',
      desc: 'Compare point by point and decide what platform your business needs. Includes speed, SEO, cost and maintenance criteria.',
      category: 'ebook',
      type: 'free',
      image: '✅',
      link: '#',
    },
    {
      title: 'Technical SEO Audit Template',
      desc: 'The same template we use at Ferova Agency to audit our client sites. Ready to use in Google Sheets.',
      category: 'report',
      type: 'pro',
      price: { usd: 29, cop: 115000 },
      image: '📊',
      link: 'https://ferova.lemonsqueezy.com/checkout/buy/88f0cdf8-7c81-4ea2-a3c3-14f16dce0b24',
    },
    {
      title: 'Demo: E-commerce Web App',
      desc: 'Explore a fully functional online store Web App with sub-1-second load time and integrated AI.',
      category: 'webapp',
      type: 'free',
      image: '🚀',
      link: '#',
    },
    {
      title: 'Weekly SEO & AI Newsletter',
      desc: 'Get the latest SEO, GEO (AI ranking) and digital marketing trends every Monday. 500+ readers.',
      category: 'newsletter',
      type: 'free',
      image: '📬',
      link: '#',
    },
    {
      title: 'Summary: Google Core Updates 2024-2025',
      desc: 'Real impact on Colombian and Latin American e-commerce, and what actions to take for each Google update.',
      category: 'summary',
      type: 'free',
      image: '🔍',
      link: '#',
    },
    {
      title: 'Masterclass: From Traditional Site to Web App',
      desc: 'Recorded event showing the complete migration process from a traditional site to a high-performance Web App step by step.',
      category: 'event',
      type: 'free',
      image: '🎓',
      link: '#',
    },
    {
      title: 'Complete Digital Strategy Kit',
      desc: 'Templates, frameworks and guides to plan your SEO, advertising and content strategy for the next 12 months.',
      category: 'ebook',
      type: 'pro',
      price: { usd: 79, cop: 315000 },
      image: '🎯',
      link: 'https://ferova.lemonsqueezy.com/checkout/buy/88f0cdf8-7c81-4ea2-a3c3-14f16dce0b24',
    },
  ],
};

// Herramientas de afiliados reales
const toolsData = {
  es: [
    {
      name: 'Divi',
      desc: 'El constructor visual de WordPress más poderoso. Crea sitios profesionales sin código con IA integrada. Usado por millones de diseñadores.',
      badge: 'Constructor Web',
      emoji: '🎨',
      link: 'https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=81483',
      color: 'text-blue-400',
    },
    {
      name: 'Hostgator',
      desc: 'Hosting con servidores en Colombia, dominio gratis y planes con IA. La opción más confiable para sitios y tiendas en Colombia.',
      badge: 'Hosting Colombia',
      emoji: '🚀',
      link: 'https://www.hostgator.la/7531.html',
      color: 'text-orange-400',
    },
    {
      name: 'Brevo',
      desc: 'Email marketing, SMS y automatización con IA. La alternativa más completa y económica a Mailchimp para el mercado hispanohablante.',
      badge: 'Email Marketing',
      emoji: '📧',
      link: '#',
      color: 'text-green-400',
    },
    {
      name: 'Timelines.ai',
      desc: 'Gestión profesional de WhatsApp Business con CRM, automatización, inbox compartido y mensajería masiva. Ideal para equipos de ventas.',
      badge: 'WhatsApp CRM',
      emoji: '💬',
      link: 'https://timelines.ai/?red=ferova',
      color: 'text-teal-400',
    },
  ],
  en: [
    {
      name: 'Divi',
      desc: 'The most powerful WordPress visual builder. Create professional websites without code with built-in AI. Used by millions of designers.',
      badge: 'Web Builder',
      emoji: '🎨',
      link: 'https://www.elegantthemes.com/affiliates/idevaffiliate.php?id=81483',
      color: 'text-blue-400',
    },
    {
      name: 'Hostgator',
      desc: 'Hosting with servers in Colombia, free domain and AI-powered plans. The most reliable option for sites and stores in Colombia.',
      badge: 'Hosting Colombia',
      emoji: '🚀',
      link: 'https://www.hostgator.la/7531.html',
      color: 'text-orange-400',
    },
    {
      name: 'Brevo',
      desc: 'Email marketing, SMS and automation with AI. The most complete and affordable alternative to Mailchimp for the Spanish-speaking market.',
      badge: 'Email Marketing',
      emoji: '📧',
      link: '#',
      color: 'text-green-400',
    },
    {
      name: 'Timelines.ai',
      desc: 'Professional WhatsApp Business management with CRM, automation, shared inbox and bulk messaging. Ideal for sales teams.',
      badge: 'WhatsApp CRM',
      emoji: '💬',
      link: 'https://timelines.ai/?red=ferova',
      color: 'text-teal-400',
    },
  ],
};

const Recursos = ({ lang = 'es' }: Props) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currency, setCurrency] = useState<'usd' | 'cop'>('usd');
  const [emailInput, setEmailInput] = useState('');

  const t = lang === 'es' ? {
    title: 'Biblioteca de Ferova',
    sub: 'Recursos gratuitos y premium para dominar el marketing digital, SEO y e-commerce.',
    toolsTitle: 'Herramientas que usamos y recomendamos',
    toolsSub: 'Al contratarlas por nuestro link de afiliado nos ayudas a seguir creando contenido gratuito — sin costo adicional para ti.',
    free: 'Gratis', pro: 'Pro', download: 'Descargar gratis', buy: 'Comprar ahora',
    subscribe: 'Suscribirme', emailPlaceholder: 'Tu correo electrónico',
    newsletterTitle: '¿Quieres recibir recursos exclusivos?',
    newsletterSub: 'Suscríbete y recibe contenido de valor cada semana.',
    ctaBtn: 'Escríbenos por WhatsApp',
    getDiscount: 'Ver descuento →',
  } : {
    title: 'Ferova Library',
    sub: 'Free and premium resources to master digital marketing, SEO and e-commerce.',
    toolsTitle: 'Tools we use and recommend',
    toolsSub: 'By purchasing through our affiliate link you help us keep creating free content — at no extra cost to you.',
    free: 'Free', pro: 'Pro', download: 'Download free', buy: 'Buy now',
    subscribe: 'Subscribe', emailPlaceholder: 'Your email address',
    newsletterTitle: 'Want exclusive resources?',
    newsletterSub: 'Subscribe and receive valuable content every week.',
    ctaBtn: 'Message us on WhatsApp',
    getDiscount: 'Get discount →',
  };

  const filteredResources = resources[lang].filter(
    r => activeCategory === 'all' || r.category === activeCategory
  );

  const formatPrice = (price?: { usd: number; cop: number }) => {
    if (!price) return '';
    if (currency === 'cop') return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price.cop);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price.usd);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(lang === 'es' ? '¡Gracias! Te enviamos el recurso pronto.' : 'Thanks! We\'ll send you the resource soon.');
    setEmailInput('');
  };

  return (
    <PageTransition>
      <Header currentLang={lang} />
      <main className="pt-20">

        {/* Hero */}
        <section className="py-20 md:py-28 text-center relative grid-pattern">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, hsla(45, 86%, 40%, 0.06), transparent 60%)' }} />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">{t.title}</h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">{t.sub}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-1 p-1 rounded-full border border-border">
                  <button onClick={() => setCurrency('usd')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-gold text-black' : 'text-muted-foreground'}`}>USD</button>
                  <button onClick={() => setCurrency('cop')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-gold text-black' : 'text-muted-foreground'}`}>COP</button>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map(cat => (
                  <motion.button key={cat.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === cat.id ? 'bg-gold text-primary-foreground border-gold' : 'border-border text-muted-foreground hover:border-gold/50 hover:text-foreground'}`}>
                    {lang === 'es' ? cat.es : cat.en}
                  </motion.button>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filteredResources.map((r, i) => (
                <StaggerItem key={i}>
                  <ScaleOnHover>
                    <div className="glass-card p-6 h-full flex flex-col hover:border-gold/30 transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-4xl">{r.image}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${r.type === 'pro' ? 'bg-gold/20 text-gold' : 'bg-green-500/20 text-green-400'}`}>
                          {r.type === 'pro' && <Lock className="w-3 h-3 inline mr-1" />}
                          {r.type === 'pro' ? t.pro : t.free}
                        </span>
                      </div>
                      <h3 className="text-lg font-display font-semibold text-foreground mb-2">{r.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{r.desc}</p>
                      {r.type === 'pro' && r.price && (
                        <p className="text-gold font-display font-bold text-xl mb-4">{formatPrice(r.price)}</p>
                      )}
                      <motion.a
                        href={r.link}
                        target={r.link !== '#' ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        className={`w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${r.type === 'pro' ? 'btn-gold !px-0' : 'border border-gold/50 text-gold hover:bg-gold/10'}`}
                      >
                        {r.type === 'pro' ? (<><ExternalLink className="w-4 h-4" /> {t.buy}</>) : (<><Download className="w-4 h-4" /> {t.download}</>)}
                      </motion.a>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Herramientas */}
        <section className="py-20 md:py-28 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{t.toolsTitle}</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">{t.toolsSub}</p>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {toolsData[lang].map((tool) => (
                <div key={tool.name} className="glass-card p-6 flex flex-col hover:border-gold/30 transition-all duration-300">
                  <div className="text-4xl mb-3">{tool.emoji}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-bold text-lg ${tool.color}`}>{tool.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tool.badge}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{tool.desc}</p>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full border border-gold/50 text-gold hover:bg-gold/10 text-sm font-semibold text-center transition flex items-center justify-center gap-1"
                  >
                    {t.getDiscount} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center">
                <Mail className="w-12 h-12 mx-auto mb-6 text-gold" />
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">{t.newsletterTitle}</h2>
                <p className="text-lg mb-8 text-muted-foreground">{t.newsletterSub}</p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input type="email" required placeholder={t.emailPlaceholder} value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    className="flex-grow px-5 py-3 rounded-full text-sm focus:outline-none focus:ring-2 transition-all border"
                    style={{ background: 'hsla(243, 28%, 18%, 0.8)', borderColor: 'hsla(243, 20%, 30%, 0.5)', color: 'hsl(0, 0%, 95%)' }}
                  />
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="btn-gold !px-8 !py-3 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" /> {t.subscribe}
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </section>

      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </PageTransition>
  );
};

export default Recursos;
