import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import { AnimatedSection, StaggerContainer, StaggerItem, ScaleOnHover, PageTransition } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import {
  BookOpen, Globe, Mail, FileText, Calendar, BarChart3,
  Lock, ArrowRight, Download, MessageCircle, ExternalLink
} from 'lucide-react';

interface Props { lang?: 'es' | 'en'; }

const categories = [
  { id: 'all', es: 'Todos', en: 'All' },
  { id: 'ebook', es: 'Ebooks', en: 'Ebooks', icon: BookOpen },
  { id: 'webapp', es: 'Web Apps de Ejemplo', en: 'Example Web Apps', icon: Globe },
  { id: 'newsletter', es: 'Newsletters', en: 'Newsletters', icon: Mail },
  { id: 'report', es: 'Informes', en: 'Reports', icon: FileText },
  { id: 'summary', es: 'Resúmenes', en: 'Summaries', icon: BarChart3 },
  { id: 'event', es: 'Eventos', en: 'Events', icon: Calendar },
];

const resources = {
  es: [
    { title: 'Guía SEO para E-commerce 2025', desc: 'Todo lo que necesitas saber para posicionar tu tienda online en Google.', category: 'ebook', type: 'free', image: '📘' },
    { title: 'Checklist: Web App vs WordPress', desc: 'Compara punto por punto y decide qué necesita tu negocio.', category: 'ebook', type: 'free', image: '✅' },
    { title: 'Plantilla de Auditoría SEO Técnica', desc: 'La misma plantilla que usamos en Ferova para auditar sitios de nuestros clientes.', category: 'report', type: 'pro', price: { usd: 29, cop: 115000 }, image: '📊' },
    { title: 'Demo: Web App E-commerce', desc: 'Explora una Web App de tienda online completamente funcional con carga < 1s.', category: 'webapp', type: 'free', image: '🚀' },
    { title: 'Newsletter Semanal de SEO', desc: 'Recibe cada lunes las últimas tendencias, actualizaciones de Google y tips accionables.', category: 'newsletter', type: 'free', image: '📬' },
    { title: 'Informe: Estado del E-commerce LATAM 2025', desc: 'Datos exclusivos sobre tendencias, comportamiento de compra y oportunidades.', category: 'report', type: 'pro', price: { usd: 49, cop: 195000 }, image: '📈' },
    { title: 'Resumen: Google Core Updates 2024-2025', desc: 'Impacto real en e-commerce y qué acciones tomar para cada actualización.', category: 'summary', type: 'free', image: '🔍' },
    { title: 'Masterclass: De WordPress a Web App', desc: 'Evento en vivo donde mostramos el proceso de migración paso a paso.', category: 'event', type: 'free', image: '🎓' },
    { title: 'Kit de Estrategia Digital Completo', desc: 'Templates, frameworks y guías para planificar tu estrategia digital 360°.', category: 'ebook', type: 'pro', price: { usd: 79, cop: 315000 }, image: '🎯' },
  ],
  en: [
    { title: 'E-commerce SEO Guide 2025', desc: 'Everything you need to know to rank your online store on Google.', category: 'ebook', type: 'free', image: '📘' },
    { title: 'Checklist: Web App vs WordPress', desc: 'Compare point by point and decide what your business needs.', category: 'ebook', type: 'free', image: '✅' },
    { title: 'Technical SEO Audit Template', desc: 'The same template we use at Ferova to audit our client sites.', category: 'report', type: 'pro', price: { usd: 29, cop: 115000 }, image: '📊' },
    { title: 'Demo: E-commerce Web App', desc: 'Explore a fully functional online store Web App with < 1s load time.', category: 'webapp', type: 'free', image: '🚀' },
    { title: 'Weekly SEO Newsletter', desc: 'Get the latest trends, Google updates and actionable tips every Monday.', category: 'newsletter', type: 'free', image: '📬' },
    { title: 'Report: State of LATAM E-commerce 2025', desc: 'Exclusive data on trends, purchasing behavior and opportunities.', category: 'report', type: 'pro', price: { usd: 49, cop: 195000 }, image: '📈' },
    { title: 'Summary: Google Core Updates 2024-2025', desc: 'Real impact on e-commerce and what actions to take for each update.', category: 'summary', type: 'free', image: '🔍' },
    { title: 'Masterclass: From WordPress to Web App', desc: 'Live event where we show the migration process step by step.', category: 'event', type: 'free', image: '🎓' },
    { title: 'Complete Digital Strategy Kit', desc: 'Templates, frameworks and guides to plan your 360° digital strategy.', category: 'ebook', type: 'pro', price: { usd: 79, cop: 315000 }, image: '🎯' },
  ],
};

const Recursos = ({ lang = 'es' }: Props) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currency, setCurrency] = useState<'usd' | 'cop'>('usd');
  const [emailInput, setEmailInput] = useState('');

  const t = lang === 'es' ? {
    title: 'Biblioteca de Ferova',
    sub: 'Recursos gratuitos y premium para dominar el marketing digital y el e-commerce.',
    free: 'Gratis',
    pro: 'Pro',
    download: 'Descargar gratis',
    buy: 'Comprar ahora',
    subscribe: 'Suscribirme',
    emailPlaceholder: 'Tu correo electrónico',
    newsletterTitle: '¿Quieres recibir recursos exclusivos?',
    newsletterSub: 'Suscríbete a nuestra newsletter y recibe contenido de valor cada semana.',
    ctaTitle: '¿Necesitas una estrategia personalizada?',
    ctaSub: 'Nuestros expertos pueden ayudarte a crear un plan a medida.',
    ctaBtn: 'Escríbenos por WhatsApp',
  } : {
    title: 'Ferova Library',
    sub: 'Free and premium resources to master digital marketing and e-commerce.',
    free: 'Free',
    pro: 'Pro',
    download: 'Download free',
    buy: 'Buy now',
    subscribe: 'Subscribe',
    emailPlaceholder: 'Your email address',
    newsletterTitle: 'Want exclusive resources?',
    newsletterSub: 'Subscribe to our newsletter and receive valuable content every week.',
    ctaTitle: 'Need a personalized strategy?',
    ctaSub: 'Our experts can help you create a custom plan.',
    ctaBtn: 'Message us on WhatsApp',
  };

  const filteredResources = resources[lang].filter(
    r => activeCategory === 'all' || r.category === activeCategory
  );

  const formatPrice = (price?: { usd: number; cop: number }) => {
    if (!price) return '';
    if (currency === 'cop') return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price.cop);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price.usd);
  };

  const handleFreeDownload = (resourceTitle: string) => {
    // TODO: Connect to Brevo API - capture email for free resource
    alert(lang === 'es' ? `Para descargar "${resourceTitle}", ingresa tu email en el formulario de newsletter.` : `To download "${resourceTitle}", enter your email in the newsletter form.`);
  };

  const handleProPurchase = (resourceTitle: string) => {
    // TODO: Connect to Lemon Squeezy with Product/Variant IDs
    // Replace with actual Lemon Squeezy checkout URL
    window.open('https://ferova.lemonsqueezy.com/checkout?product_id=REPLACE_WITH_ID', '_blank');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Brevo API
    alert(lang === 'es' ? '¡Suscripción exitosa!' : 'Subscription successful!');
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

            {/* Currency Toggle */}
            <AnimatedSection delay={0.1}>
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-1 p-1 rounded-full border border-border">
                  <button onClick={() => setCurrency('usd')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'usd' ? 'bg-wine/20 text-wine-light' : 'text-muted-foreground'}`}>USD</button>
                  <button onClick={() => setCurrency('cop')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currency === 'cop' ? 'bg-wine/20 text-wine-light' : 'text-muted-foreground'}`}>COP</button>
                </div>
              </div>
            </AnimatedSection>

            {/* Category Filter */}
            <AnimatedSection delay={0.2}>
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map(cat => (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${activeCategory === cat.id ? 'bg-gold text-primary-foreground border-gold' : 'border-border text-muted-foreground hover:border-gold/50 hover:text-foreground'}`}
                  >
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
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => r.type === 'pro' ? handleProPurchase(r.title) : handleFreeDownload(r.title)}
                        className={`w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${r.type === 'pro' ? 'btn-gold !px-0' : 'border border-gold/50 text-gold hover:bg-gold/10'}`}
                      >
                        {r.type === 'pro' ? (
                          <><ExternalLink className="w-4 h-4" /> {t.buy}</>
                        ) : (
                          <><Download className="w-4 h-4" /> {t.download}</>
                        )}
                      </motion.button>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 md:py-28 dark-section" style={{ background: 'hsl(243, 28%, 14%)' }}>
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedSection>
              <div className="max-w-2xl mx-auto text-center">
                <Mail className="w-12 h-12 mx-auto mb-6 text-gold" />
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">{t.newsletterTitle}</h2>
                <p className="text-lg mb-8 text-muted-foreground">{t.newsletterSub}</p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    className="flex-grow px-5 py-3 rounded-full text-sm focus:outline-none focus:ring-2 transition-all border"
                    style={{
                      background: 'hsla(243, 28%, 18%, 0.8)',
                      borderColor: 'hsla(243, 20%, 30%, 0.5)',
                      color: 'hsl(0, 0%, 95%)',
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="btn-gold !px-8 !py-3 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {t.subscribe}
                  </motion.button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Single clean CTA merged with newsletter */}
      </main>
      <Footer currentLang={lang} />
      <ChatWidget lang={lang} />
    </PageTransition>
  );
};

export default Recursos;
